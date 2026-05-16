import { prisma } from '@/lib/prisma';
import { ProjectPlanningGrid } from '@/components/ProjectPlanningGrid';
import { ResourceAssignmentGrid } from '@/components/ResourceAssignmentGrid';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Project Planning | Matrix View',
  description: 'Team-centric resource allocation and project planning matrix.',
};

export default async function ProjectPlanningPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  const orgId = session.user.organizationId as string;

  // 1. Fetch data for Team Grid
  const teams = await prisma.team.findMany({
    where: { organizationId: orgId },
    orderBy: { name: 'asc' },
  });

  const allocations = await prisma.budgetAllocation.findMany({
    where: { team: { organizationId: orgId } },
  });

  const periods = await prisma.period.findMany({
    where: { organizationId: orgId },
    orderBy: { startDate: 'asc' },
  });

  // 2. Fetch data for Assignment Grid (New)
  const projects = await prisma.project.findMany({
    where: { organizationId: orgId },
    take: 10, // Requirement: 10 rows
    orderBy: { name: 'asc' },
  });

  const users = await prisma.user.findMany({
    where: { organizationId: orgId },
    orderBy: { name: 'asc' },
  });

  return (
    <div className="p-6 flex flex-col gap-8 bg-[#020617] min-h-screen">
      {/* View 1: High Level Team Load */}
      <section>
        <ProjectPlanningGrid 
          teams={teams}
          allocations={allocations}
          periods={periods}
        />
      </section>

      {/* View 2: Granular Resource Assignment */}
      <section>
        <ResourceAssignmentGrid 
          projects={projects}
          users={users}
        />
      </section>
    </div>
  );
}
