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
      organizationId: session.user.organizationId,
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
      organizationId: session.user.organizationId,
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
  return project;
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
  return project;
}

// ─── Planning Actions ────────────────────────────────────────────────────────

export async function createYearPeriods(year: number) {
  const session = await auth();
  if (!session?.user?.organizationId) throw new Error("Unauthorized");

  const orgId = session.user.organizationId;
  const periods = [];

  for (let month = 0; month < 12; month++) {
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    const label = startDate.toLocaleString('default', { month: 'long', year: 'numeric' });

    periods.push({
      organizationId: orgId,
      type: "MONTH",
      startDate,
      endDate,
      label,
    });
  }

  const result = await prisma.period.createMany({ data: periods });

  await prisma.auditLog.create({
    data: {
      organizationId: session.user.organizationId,
      action: "CREATE",
      entityType: "Period",
      entityId: "BATCH",
      projectName: `Batch Periods ${year}`,
      userId: session.user.id!,
      userEmail: session.user.email!,
    },
  });

  revalidatePath("/");
  return result;
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

  return allocation;
}

export async function getOrCreateWeeklyPeriods() {
  const session = await auth();
  if (!session?.user?.organizationId) throw new Error("Unauthorized");

  const orgId = session.user.organizationId;
  const periods = [];
  
  // Calculate current Monday
  const today = new Date();
  const day = today.getDay();
  const diff = today.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(today.setDate(diff));
  monday.setHours(0, 0, 0, 0);

  for (let i = 0; i < 9; i++) {
    const startDate = new Date(monday);
    startDate.setDate(monday.getDate() + (i * 7));
    
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    endDate.setHours(23, 59, 59, 999);

    const weekNum = i === 0 ? "Current" : `+${i}`;
    const label = `Week ${weekNum} (${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})`;

    periods.push({
      organizationId: orgId,
      type: "WEEK",
      startDate,
      endDate,
      label,
    });
  }

  // Use a transaction to find/upsert each week for the organization
  const results = await Promise.all(periods.map(p => 
    prisma.period.upsert({
      where: {
        organizationId_type_startDate_endDate: {
          organizationId: orgId,
          type: "WEEK",
          startDate: p.startDate,
          endDate: p.endDate
        }
      },
      update: { label: p.label },
      create: p
    })
  ));

  return results;
}

export async function importActuals(rows: { projectCode: string; periodId: string; hours: number }[]) {
  const session = await auth();
  if (!session?.user?.organizationId) throw new Error("Unauthorized");

  const orgId = session.user.organizationId;
  const results = [];

  for (const row of rows) {
    // Find project by code within the organization
    const project = await prisma.project.findFirst({
      where: { code: row.projectCode, organizationId: orgId }
    });

    if (!project) continue;

    // We need a teamId for the allocation. 
    // If the project is already assigned to a team, use that.
    // Otherwise, we might need to skip or handle logically.
    if (!project.teamId) continue;

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

  await prisma.auditLog.create({
    data: {
      organizationId: session.user.organizationId,
      action: "CREATE",
      entityType: "ActualAllocation",
      entityId: "BATCH_IMPORT",
      projectName: `Imported ${results.length} actuals`,
      userId: session.user.id!,
      userEmail: session.user.email!,
    },
  });

  revalidatePath("/reports");
  return results;
}
