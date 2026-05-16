import { prisma } from '@/lib/prisma';
import { ProjectPlanningGrid } from '@/components/ProjectPlanningGrid';
import { PlanningSidebar } from '@/components/PlanningSidebar';
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

  // 2. Fetch all Teams in the organization
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

  // 5. Fetch all Allocations
  const allocations = await prisma.allocation.findMany({
    where: { project: { organizationId: orgId } },
    include: {
      project: true,
      team: true,
      period: true
    }
  });

  // 6. Fetch Periods
  const periods = await prisma.period.findMany({
    where: { organizationId: orgId },
    orderBy: { startDate: 'asc' },
  });

  // 7. Extract Waiting List Items (Allocations where userId AND roleId are NULL)
  const waitingListItems = allocations
    .filter(a => a.userId === null && a.roleId === null)
    .map(a => ({
      id: a.id,
      projectName: a.project.name,
      teamName: a.team.name,
      hours: a.requestedHours,
      periodLabel: a.period.label,
      projectId: a.projectId,
      teamId: a.teamId,
      periodId: a.periodId
    }));

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <main className="flex-1 flex flex-col p-6 gap-6 overflow-hidden">
        <header className="flex-shrink-0">
          <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase">Hierarchical Capacity</h1>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Tactical Resource Alignment</p>
        </header>

        <section className="flex-1 overflow-hidden bg-white rounded-3xl border border-slate-200 shadow-sm relative">
          <ProjectPlanningGrid 
            projects={projects}
            teams={allTeams}
            users={users}
            roles={roles}
            allocations={allocations}
            periods={periods}
          />
        </section>
        
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm flex-shrink-0">
          <h3 className="text-[0.6rem] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Architecture Compliance</h3>
          <p className="text-[0.6rem] text-slate-500 font-medium leading-relaxed">
            Unifying 3-level hierarchy (Project &gt; Team &gt; Individual) with Scoro-inspired heatmap and waiting list logic.
          </p>
        </div>
      </main>

      <PlanningSidebar 
        items={waitingListItems}
        onAssign={(item) => {
          console.log("Assigning item:", item);
        }}
      />
    </div>
  );
}
