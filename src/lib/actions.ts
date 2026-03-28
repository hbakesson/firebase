"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

// ─── Team Actions ───────────────────────────────────────────────────────────

export async function createTeam(data: { name: string; code: string; parentTeamId?: string }) {
  const session = await auth();
  if (!session?.user?.organizationId) throw new Error("Unauthorized");

  const team = await prisma.team.create({
    data: {
      ...data,
      organizationId: session.user.organizationId,
    },
  });

  await prisma.auditLog.create({
    data: {
      action: "CREATE",
      entityType: "Team",
      entityId: team.id,
      projectName: team.name, // Using name as project name fallback for now
      userId: session.user.id!,
      userEmail: session.user.email!,
      newValue: JSON.stringify(team),
    },
  });

  revalidatePath("/teams");
  return team;
}

export async function updateTeam(id: string, data: Partial<{ name: string; code: string; parentTeamId: string; isActive: boolean }>) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const previous = await prisma.team.findUnique({ where: { id } });
  const team = await prisma.team.update({
    where: { id },
    data,
  });

  await prisma.auditLog.create({
    data: {
      action: "UPDATE",
      entityType: "Team",
      entityId: team.id,
      projectName: team.name,
      userId: session.user.id!,
      userEmail: session.user.email!,
      previousValue: JSON.stringify(previous),
      newValue: JSON.stringify(team),
    },
  });

  revalidatePath("/teams");
  return team;
}

// ─── Project Actions ────────────────────────────────────────────────────────

export async function createProject(data: { name: string; code: string; description?: string; teamId?: string }) {
  const session = await auth();
  if (!session?.user?.organizationId) throw new Error("Unauthorized");

  const project = await prisma.project.create({
    data: {
      ...data,
      organizationId: session.user.organizationId,
      createdBy: session.user.id!,
    },
  });

  await prisma.auditLog.create({
    data: {
      action: "CREATE",
      entityType: "Project",
      entityId: project.id,
      projectName: project.name,
      userId: session.user.id!,
      userEmail: session.user.email!,
      newValue: JSON.stringify(project),
    },
  });

  revalidatePath("/projects");
  return project;
}

export async function updateProject(id: string, data: any) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const previous = await prisma.project.findUnique({ where: { id } });
  const project = await prisma.project.update({
    where: { id },
    data,
  });

  await prisma.auditLog.create({
    data: {
      action: "UPDATE",
      entityType: "Project",
      entityId: project.id,
      projectName: project.name,
      userId: session.user.id!,
      userEmail: session.user.email!,
      previousValue: JSON.stringify(previous),
      newValue: JSON.stringify(project),
    },
  });

  revalidatePath("/projects");
  revalidatePath("/dashboard");
  return project;
}

export async function deleteProject(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const project = await prisma.project.delete({
    where: { id },
  });

  await prisma.auditLog.create({
    data: {
      action: "DELETE",
      entityType: "Project",
      entityId: project.id,
      projectName: project.name,
      userId: session.user.id!,
      userEmail: session.user.email!,
      previousValue: JSON.stringify(project),
    },
  });

  revalidatePath("/projects");
  revalidatePath("/dashboard");
  return project;
}
