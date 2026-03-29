"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { sanitize } from "@/lib/utils";

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
      organizationId: session.user.organizationId,
      action: "CREATE",
      entityType: "Team",
      projectName: team.name, // Using projectName field for Team name as per schema
      userId: session.user.id!,
      userEmail: session.user.email!,
      newValue: JSON.stringify(sanitize(team)),
    },
  });

  revalidatePath("/teams");
  return null; // Return nothing to avoid serialization issues
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
      organizationId: session.user.organizationId,
      action: "UPDATE",
      entityType: "Team",
      projectName: team.name,
      userId: session.user.id!,
      userEmail: session.user.email!,
      previousValue: JSON.stringify(sanitize(previous)),
      newValue: JSON.stringify(sanitize(team)),
    },
  });

  revalidatePath("/teams");
  return null;
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
      organizationId: session.user.organizationId,
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
  return null;
}

export async function updateProject(id: string, data: Record<string, unknown>) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const previous = await prisma.project.findUnique({ where: { id } });
  const project = await prisma.project.update({
    where: { id },
    data,
  });

  await prisma.auditLog.create({
    data: {
      organizationId: session.user.organizationId,
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
  return null;
}

export async function deleteProject(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const project = await prisma.project.delete({
    where: { id },
  });

  await prisma.auditLog.create({
    data: {
      organizationId: session.user.organizationId,
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
  return null;
}

// ─── Planning Actions ────────────────────────────────────────────────────────

export async function createYearPeriods(year: number) {
  const session = await auth();
  if (!session?.user?.organizationId) throw new Error("Unauthorized");

  const result = await prisma.period.createMany({ 
    data: Array.from({ length: 12 }, (_, month) => {
      const startDate = new Date(year, month, 1);
      const endDate = new Date(year, month + 1, 0);
      return {
        organizationId: session.user.organizationId!,
        type: "MONTH",
        startDate,
        endDate,
        label: startDate.toLocaleString('default', { month: 'long', year: 'numeric' }),
      };
    })
  });

  revalidatePath("/");
  return sanitize(result) as typeof result;
}

export async function upsertAllocation(data: { teamId: string; projectId: string; periodId: string; plannedHours: number }) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const allocation = await prisma.budgetAllocation.upsert({
    where: {
      teamId_projectId_periodId: {
        teamId: data.teamId,
        projectId: data.projectId,
        periodId: data.periodId,
      },
    },
    update: { plannedHours: data.plannedHours },
    create: data,
  });

  await prisma.auditLog.create({
    data: {
      organizationId: session.user.organizationId,
      action: "UPDATE",
      entityType: "BudgetAllocation",
      entityId: allocation.id,
      projectName: "Grid Update",
      userId: session.user.id!,
      userEmail: session.user.email!,
      newValue: `Planned: ${data.plannedHours}`,
    },
  });

  return null;
}

export async function getOrCreateWeeklyPeriods() {
  const session = await auth();
  if (!session?.user?.organizationId) throw new Error("Unauthorized");

  const results = await Promise.all(
    Array.from({ length: 9 }).map((_, i) => {
      const today = new Date();
      const diff = today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1);
      const monday = new Date(today.setDate(diff));
      monday.setHours(0, 0, 0, 0);
      
      const startDate = new Date(monday);
      startDate.setDate(monday.getDate() + (i * 7));
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);
      endDate.setHours(23, 59, 59, 999);

      return prisma.period.upsert({
        where: {
          organizationId_type_startDate_endDate: {
            organizationId: session.user.organizationId!,
            type: "WEEK",
            startDate,
            endDate
          }
        },
        update: {},
        create: {
          organizationId: session.user.organizationId!,
          type: "WEEK",
          startDate,
          endDate,
          label: `Week ${i === 0 ? "Current" : `+${i}`} (${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})`,
        }
      });
    })
  );

  return sanitize(results) as typeof results;
}

export async function importActuals(rows: { projectCode: string; periodId: string; hours: number }[]) {
  const session = await auth();
  if (!session?.user?.organizationId) throw new Error("Unauthorized");

  const orgId = session.user.organizationId;
  const results = [];

  for (const row of rows) {
    const project = await prisma.project.findFirst({
      where: { code: row.projectCode, organizationId: orgId }
    });
    if (!project || !project.teamId) continue;

    const allocation = await prisma.actualAllocation.upsert({
      where: {
        teamId_projectId_periodId: {
          teamId: project.teamId,
          projectId: project.id,
          periodId: row.periodId,
        },
      },
      update: { actualHours: row.hours },
      create: {
        teamId: project.teamId,
        projectId: project.id,
        periodId: row.periodId,
        actualHours: row.hours,
      },
    });
    results.push(allocation);
  }

  revalidatePath("/reports");
  return null;
}

// ─── User Actions ────────────────────────────────────────────────────────────

export async function getUsers() {
  const session = await auth();
  if (!session?.user?.organizationId) throw new Error("Unauthorized");

  const users = await prisma.user.findMany({
    where: { organizationId: session.user.organizationId },
    orderBy: { name: 'asc' },
  });

  return sanitize(users);
}
