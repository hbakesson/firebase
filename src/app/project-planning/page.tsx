import { prisma } from '@/lib/prisma';
import { ProjectPlanningContainer } from "@/components/ProjectPlanningContainer";
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Capacity Planning | Hierarchical View',
  description: 'Enterprise-grade 3-level hierarchical resource planning (Project > Team > Individual).',
};

export default async function ProjectPlanningPage() {
  const session = await auth();

  if (!session?.user?.organizationId) {
    redirect('/login');
  }

  const orgId = session.user.organizationId as string;

  // 1. Fetch all Projects
  const projects = await prisma.project.findMany({
    where: { organizationId: orgId, status: { in: ["ACTIVE", "PLANNED"] } },
    include: { teams: true },
    orderBy: { name: 'asc' },
  });

  // 2. Fetch all Teams
  const allTeams = await prisma.team.findMany({
    where: { organizationId: orgId },
    orderBy: { name: 'asc' },
  });

  // 3. Fetch all Users
  const users = await prisma.user.findMany({
    where: { organizationId: orgId },
    orderBy: { name: 'asc' },
  });

  // 4. Fetch all Roles
  const roles = await prisma.role.findMany({
    where: { organizationId: orgId },
    orderBy: { name: 'asc' },
  });

  // 5. Fetch all Active Periods
  const periods = await prisma.period.findMany({
    where: { organizationId: orgId },
    orderBy: { startDate: 'asc' },
    take: 6, // View next 6 periods
  });

  // 6. Fetch Allocations for these periods
  const periodIds = periods.map(p => p.id);
  const allocations = await prisma.allocation.findMany({
    where: { 
      periodId: { in: periodIds }
    }
  });

  // 7. Calculate Waiting List Items (unassigned allocations)
  const waitingListItems = allocations
    .filter(a => !a.userId && !a.roleId && a.requestedHours > 0)
    .map(a => ({
      id: a.id,
      projectName: projects.find(p => p.id === a.projectId)?.name || "Unknown Project",
      teamName: allTeams.find(t => t.id === a.teamId)?.name || "Unknown Team",
      hours: a.requestedHours,
      periodLabel: periods.find(p => p.id === a.periodId)?.label || "Unknown Period",
      projectId: a.projectId,
      teamId: a.teamId,
      periodId: a.periodId,
    }));

  return (
    <ProjectPlanningContainer 
      projects={projects}
      teams={allTeams}
      users={users}
      roles={roles}
      allocations={allocations}
      periods={periods}
      waitingListItems={waitingListItems}
    />
  );
}
