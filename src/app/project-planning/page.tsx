import { prisma } from '@/lib/prisma';
import { ProjectPlanningGrid } from '@/components/ProjectPlanningGrid';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Capacity Planning | Hierarchical View',
  description: 'Enterprise-grade 3-level hierarchical resource planning (Project > Team > Individual).',
};

export default async function ProjectPlanningPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  const orgId = session.user.organizationId as string;

  // 1. Fetch Projects with their assigned Teams
  const projects = await prisma.project.findMany({
    where: { organizationId: orgId },
    include: {
      teams: true,
    },
    orderBy: { name: 'asc' },
  });

  // 2. Fetch all Teams in the organization (to map resources)
  const allTeams = await prisma.team.findMany({
    where: { organizationId: orgId },
    orderBy: { name: 'asc' },
  });

  // 3. Fetch all Users (to show as individual resources)
  const users = await prisma.user.findMany({
    where: { organizationId: orgId },
    orderBy: { name: 'asc' },
  });

  // 4. Fetch all Allocations (Requested, Allocated, Actual)
  const allocations = await prisma.allocation.findMany({
    where: { project: { organizationId: orgId } },
  });

  // 5. Fetch Periods (Timeline)
  const periods = await prisma.period.findMany({
    where: { organizationId: orgId },
    orderBy: { startDate: 'asc' },
  });

  return (
    <div className="p-6 flex flex-col gap-8 bg-slate-50 min-h-screen">
      <section className="flex-1">
        <ProjectPlanningGrid 
          projects={projects}
          teams={allTeams}
          users={users}
          allocations={allocations}
          periods={periods}
        />
      </section>
      
      <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
        <h3 className="text-[0.6rem] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Architecture Compliance Note</h3>
        <p className="text-[0.65rem] text-slate-500 font-medium leading-relaxed">
          This grid implements the 3-level hierarchy (Project &gt; Team &gt; Individual) and the Triple-Bucket cell logic 
          (Requested, Allocated, Actual) as defined in <strong>architecture.md</strong>.
        </p>
      </div>
    </div>
  );
}
