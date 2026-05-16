"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

// ─── Types ──────────────────────────────────────────────────────────────────

export type Project = {
  id: string;
  name: string;
  description: string | null;
  status: string;
  priority: number;
  progress: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
};

// ─── Helpers ────────────────────────────────────────────────────────────────

async function writeAuditLog(entry: {
  action: "CREATE" | "UPDATE" | "DELETE";
  projectId: string;
  projectName: string;
  previousValue?: string;
  newValue?: string;
}) {
  const session = await auth();
  if (!session?.user?.id) return;

  await prisma.auditLog.create({
    data: {
      ...entry,
      userId: session.user.id,
      userEmail: session.user.email ?? "unknown",
    },
  });
}

// ─── Server Actions ──────────────────────────────────────────────────────────

export async function getProjects(search?: string, status?: string): Promise<Project[]> {
  return await prisma.project.findMany({
    where: {
      AND: [
        search ? {
          OR: [
            { name: { contains: search } },
            { description: { contains: search } },
          ],
        } : {},
        status && status !== "ALL" ? { status } : {},
      ],
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function addProject(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not authenticated" };

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const status = formData.get("status") as string || "PLANNED";
  const priority = parseInt(formData.get("priority") as string) || 1;

  if (!name) return { error: "Name is required" };

  try {
    const project = await prisma.project.create({
      data: {
        name,
        description: description || null,
        status,
        priority: Math.min(5, Math.max(1, priority)),
        createdBy: session.user.id,
      },
    });

    await writeAuditLog({
      action: "CREATE",
      projectId: project.id,
      projectName: name,
      newValue: JSON.stringify({ status, priority }),
    });

    revalidatePath("/");
    return { success: true };
  } catch (error: unknown) {
    if (error && typeof error === "object" && "code" in error && error.code === "P2002") {
      return { error: "Project name must be unique" };
    }
    return { error: "Failed to create project" };
  }
}

export async function deleteProject(id: string) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    return { error: "Only admins can delete projects." };
  }

  try {
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) return { error: "Project not found" };

    await prisma.project.delete({ where: { id } });

    await writeAuditLog({
      action: "DELETE",
      projectId: id,
      projectName: project.name,
    });

    revalidatePath("/");
    return { success: true };
  } catch {
    return { error: "Failed to delete project" };
  }
}

export async function updateProgress(id: string, progress: number) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not authenticated" };

  try {
    const current = await prisma.project.findUnique({ where: { id } });
    if (!current) return { error: "Project not found" };

    const next = Math.min(100, Math.max(0, progress));

    await prisma.project.update({
      where: { id },
      data: {
        progress: next,
      },
    });

    await writeAuditLog({
      action: "UPDATE",
      projectId: id,
      projectName: current.name,
      previousValue: JSON.stringify({ progress: current.progress }),
      newValue: JSON.stringify({ progress: next }),
    });

    revalidatePath("/");
    return { success: true };
  } catch {
    return { error: "Failed to update progress" };
  }
}

export async function updateAllocation(data: {
  projectId: string;
  teamId: string;
  userId?: string;
  roleId?: string;
  periodId: string;
  requestedHours?: number;
  allocatedHours?: number;
  actualHours?: number;
}) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not authenticated" };

  try {
    const { projectId, teamId, userId, roleId, periodId, ...hours } = data;
    
    // Convert undefined to undefined (don't update) or use existing values
    // Prisma's upsert handles this well if we only pass fields that are present
    const updateData: any = {};
    if (hours.requestedHours !== undefined) updateData.requestedHours = hours.requestedHours;
    if (hours.allocatedHours !== undefined) updateData.allocatedHours = hours.allocatedHours;
    if (hours.actualHours !== undefined) updateData.actualHours = hours.actualHours;

    await prisma.allocation.upsert({
      where: {
        projectId_teamId_userId_roleId_periodId: {
          projectId,
          teamId,
          userId: (userId || null) as any,
          roleId: (roleId || null) as any,
          periodId,
        }
      },
      create: {
        projectId,
        teamId,
        userId: userId || null,
        periodId,
        requestedHours: hours.requestedHours || 0,
        allocatedHours: hours.allocatedHours || 0,
        actualHours: hours.actualHours || 0,
      },
      update: updateData
    });

    revalidatePath("/project-planning");
    revalidatePath("/planning/bulk");
    return { success: true };
  } catch (error) {
    console.error("Failed to update allocation:", error);
    return { error: "Failed to update allocation" };
  }
}
