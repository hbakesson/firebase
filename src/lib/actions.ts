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

export async function updateTeam(id: string, data: Partial<{ name: string; code: string; parentTeamId: string; isActive: boolean; projectIds: string[] }>) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const { projectIds, ...restData } = data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateData: any = { ...restData };

  if (projectIds && Array.isArray(projectIds)) {
    updateData.projects = {
      set: projectIds.map((pid: string) => ({ id: pid }))
    };
  }

  const previous = await prisma.team.findUnique({ where: { id } });
  const team = await prisma.team.update({
    where: { id },
    data: updateData,
  });

  await prisma.auditLog.create({
    data: {
      organizationId: session.user.organizationId!,
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
  revalidatePath("/projects");
  revalidatePath("/dashboard");
  return null;
}

// ─── Project Actions ────────────────────────────────────────────────────────

export async function createProject(data: { name: string; code: string; description?: string; teamIds?: string[] }) {
  const session = await auth();
  if (!session?.user?.organizationId) throw new Error("Unauthorized");

  const project = await prisma.project.create({
    data: {
      name: data.name,
      code: data.code,
      description: data.description,
      teams: data.teamIds && data.teamIds.length > 0 ? {
        connect: data.teamIds.map(id => ({ id }))
      } : undefined,
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

  const { teamIds, ...restData } = data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateData: any = { ...restData };
  
  if (teamIds && Array.isArray(teamIds)) {
    updateData.teams = {
      set: teamIds.map((id: string) => ({ id }))
    };
  } else if (data.hasOwnProperty('teamIds') && (teamIds === null || (Array.isArray(teamIds) && teamIds.length === 0))) {
    updateData.teams = { set: [] };
  }

  const previous = await prisma.project.findUnique({ where: { id } });
  const project = await prisma.project.update({
    where: { id },
    data: updateData,
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

  const lockedData = await prisma.budgetAllocation.findFirst({
    where: { projectId: id, period: { isLocked: true } }
  }) || await prisma.actualAllocation.findFirst({
    where: { projectId: id, period: { isLocked: true } }
  });

  if (lockedData) {
    throw new Error("Cannot delete project containing data in locked fiscal periods. Please unlock the periods first.");
  }

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

  const period = await prisma.period.findUnique({ where: { id: data.periodId } });
  if (period?.isLocked) throw new Error("This period is locked for fiscal governance. Modifications are disabled.");

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

interface ImportRow {
  projectCode: string;
  periodId: string;
  hours: number;
  teamCode?: string;
}

export async function importActuals(rows: ImportRow[]) {
  const session = await auth();
  if (!session?.user?.organizationId) throw new Error("Unauthorized");

  const orgId = session.user.organizationId;
  const results = [];

  for (const row of rows) {
    const period = await prisma.period.findUnique({ where: { id: row.periodId } });
    if (period?.isLocked) continue;

    const project = await prisma.project.findFirst({
      where: { code: row.projectCode, organizationId: orgId },
      include: { teams: true }
    });
    
    if (!project || project.teams.length === 0) continue;

    let targetTeam = project.teams[0];
    let attributionWarning = false;

    if (row.teamCode) {
      const foundTeam = project.teams.find((t: { id: string; name: string; code: string; organizationId: string }) => t.code === row.teamCode);
      if (foundTeam) {
        targetTeam = foundTeam;
      } else {
        attributionWarning = true;
      }
    } else if (project.teams.length > 1) {
      attributionWarning = true;
    }

    const teamId = targetTeam.id;

    const allocation = await prisma.actualAllocation.upsert({
      where: {
        teamId_projectId_periodId: {
          teamId,
          projectId: project.id,
          periodId: row.periodId,
        },
      },
      update: { actualHours: row.hours },
      create: {
        teamId,
        projectId: project.id,
        periodId: row.periodId,
        actualHours: row.hours,
      },
    });

    if (attributionWarning) {
      await prisma.auditLog.create({
        data: {
          organizationId: orgId,
          action: "IMPORT_WARNING",
          entityType: "ActualAllocation",
          entityId: allocation.id,
          projectName: project.name,
          userId: session.user.id!,
          userEmail: session.user.email!,
          newValue: `Ambiguous attribution for project ${project.code}. Defaulted to team ${targetTeam.code}.`,
        },
      });
    }

    results.push(allocation);
  }

  revalidatePath("/reports");
  return null;
}

export async function upsertActual(data: { teamId: string; projectId: string; periodId: string; actualHours: number }) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const period = await prisma.period.findUnique({ where: { id: data.periodId } });
  if (period?.isLocked) throw new Error("This period is locked for fiscal governance. Modifications are disabled.");

  const actual = await prisma.actualAllocation.upsert({
    where: {
      teamId_projectId_periodId: {
        teamId: data.teamId,
        projectId: data.projectId,
        periodId: data.periodId,
      },
    },
    update: { actualHours: data.actualHours },
    create: {
      teamId: data.teamId,
      projectId: data.projectId,
      periodId: data.periodId,
      actualHours: data.actualHours,
    },
  });

  await prisma.auditLog.create({
    data: {
      organizationId: session.user.organizationId,
      action: "UPDATE",
      entityType: "ActualAllocation",
      entityId: actual.id,
      projectName: "Grid Actual Update",
      userId: session.user.id!,
      userEmail: session.user.email!,
      newValue: `Actual: ${data.actualHours}`,
    },
  });

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

export async function updateUserRole(userId: string, role: string) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "admin") throw new Error("Unauthorized");

  const previous = await prisma.user.findUnique({ where: { id: userId } });
  const user = await prisma.user.update({
    where: { id: userId },
    data: { role },
  });

  await prisma.auditLog.create({
    data: {
      organizationId: session.user.organizationId,
      action: "ROLE_CHANGE",
      entityType: "User",
      projectName: user.email || user.name || "Unknown User",
      userId: session.user.id!,
      userEmail: session.user.email!,
      previousValue: previous?.role,
      newValue: role,
    },
  });

  revalidatePath("/users");
  return null;
}

export async function removeUser(userId: string) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "admin") throw new Error("Unauthorized");

  const user = await prisma.user.update({
    where: { id: userId },
    data: { organizationId: null },
  });

  await prisma.auditLog.create({
    data: {
      organizationId: session.user.organizationId,
      action: "REMOVE",
      entityType: "User",
      projectName: user.email || user.name || "Removed User",
      userId: session.user.id!,
      userEmail: session.user.email!,
      previousValue: "Associated",
      newValue: "Disconnected",
    },
  });

  revalidatePath("/users");
  return null;
}

// ─── Governance Actions ──────────────────────────────────────────────────────

export async function togglePeriodLock(id: string, isLocked: boolean) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "admin") throw new Error("Unauthorized");

  const period = await prisma.period.update({
    where: { id },
    data: { isLocked },
  });

  await prisma.auditLog.create({
    data: {
      organizationId: session.user.organizationId,
      action: "LOCK_CHANGE",
      entityType: "Period",
      projectName: period.label,
      userId: session.user.id!,
      userEmail: session.user.email!,
      newValue: isLocked ? "LOCKED" : "UNLOCKED",
    },
  });

  revalidatePath("/reports");
  revalidatePath("/planning/bulk");
  return null;
}

export async function deleteTeam(teamId: string) {
  const session = await auth();
  if (session?.user?.role !== "admin") throw new Error("Unauthorized");

  const team = await prisma.team.findUnique({ 
    where: { id: teamId },
    include: { allocations: true, actualAllocations: true }
  });

  if (!team) throw new Error("Team not found");

  const lockedData = await prisma.budgetAllocation.findFirst({
    where: { teamId: teamId, period: { isLocked: true } }
  }) || await prisma.actualAllocation.findFirst({
    where: { teamId: teamId, period: { isLocked: true } }
  });

  if (lockedData) {
    throw new Error("Cannot delete team with records in locked fiscal periods. Please unlock the periods first.");
  }

  await prisma.team.delete({
    where: { id: teamId },
  });

  await prisma.auditLog.create({
    data: {
      organizationId: session.user.organizationId!,
      action: "DELETE",
      entityType: "Team",
      projectName: team.name,
      userId: session.user.id!,
      userEmail: session.user.email!,
      previousValue: JSON.stringify(team),
    },
  });

  revalidatePath("/teams");
  return { success: true };
}

export async function inviteUser(data: { email: string; role: string }) {
  const session = await auth();
  if (session?.user?.role !== "admin") throw new Error("Unauthorized");

  const user = await prisma.user.upsert({
    where: { email: data.email },
    update: { role: data.role },
    create: {
      email: data.email,
      role: data.role,
      organizationId: session.user.organizationId!,
    },
  });

  await prisma.auditLog.create({
    data: {
      organizationId: session.user.organizationId!,
      action: "INVITE",
      entityType: "User",
      projectName: data.email,
      userId: session.user.id!,
      userEmail: session.user.email!,
      newValue: JSON.stringify(user),
    },
  });

  revalidatePath("/users");
  return { success: true };
}

export async function updateMyProfile(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const name = formData.get("name") as string;
  if (!name || name.trim() === "") return { error: "Name is required" };

  const previous = await prisma.user.findUnique({ where: { id: session.user.id } });
  
  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: { name: name.trim() },
  });

  if (session.user.organizationId) {
    await prisma.auditLog.create({
      data: {
        organizationId: session.user.organizationId,
        action: "UPDATE",
        entityType: "User",
        projectName: user.email || user.name || "Self Profile Update",
        userId: session.user.id,
        userEmail: session.user.email!,
        previousValue: previous?.name || "",
        newValue: user.name || "",
      },
    });
  }

  revalidatePath("/settings");
  revalidatePath("/");
  return { success: true };
}

export async function updateOrganization(data: { name?: string; fiscalYearStartMonth?: number; defaultCurrency?: string }) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "admin") throw new Error("Unauthorized");
  if (!session.user.organizationId) throw new Error("No organization associated");

  const orgId = session.user.organizationId;
  const previous = await prisma.organization.findUnique({ where: { id: orgId } });

  const updated = await prisma.organization.update({
    where: { id: orgId },
    data
  });

  await prisma.auditLog.create({
    data: {
      organizationId: orgId,
      action: "UPDATE",
      entityType: "Organization",
      projectName: updated.name,
      userId: session.user.id,
      userEmail: session.user.email!,
      previousValue: JSON.stringify(previous),
      newValue: JSON.stringify(updated),
    },
  });

  revalidatePath("/settings");
  revalidatePath("/settings/organization");
  return { success: true };
}
