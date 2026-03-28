import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import PlanningGrid from "@/components/PlanningGrid";
import { 
  Calendar, 
  ChevronLeft, 
  LayoutGrid
} from "lucide-react";
import Link from "next/link";
import { createYearPeriods } from "@/lib/actions";

export default async function PlanningPage({
  params,
}: {
  params: Promise<{ teamId: string }>;
}) {
  const session = await auth();
  if (!session?.user?.organizationId) redirect("/login");

  const { teamId } = await params;

  const team = await prisma.team.findUnique({
    where: { id: teamId, organizationId: session.user.organizationId },
  });

  if (!team) notFound();

  // Fetch data for the grid
  const [projects, periods, allocations] = await Promise.all([
    // Get projects assigned to this team OR unassigned projects (to allow team uptake)
    prisma.project.findMany({
      where: { 
        organizationId: session.user.organizationId,
        OR: [
          { teamId: teamId },
          { teamId: null }
        ],
        status: { in: ["PLANNED", "ACTIVE"] }
      },
      orderBy: { name: 'asc' }
    }),
    prisma.period.findMany({
      where: { organizationId: session.user.organizationId },
      orderBy: { startDate: 'asc' }
    }),
    prisma.budgetAllocation.findMany({
      where: { teamId: teamId }
    })
  ]);

  return (
    <div className="space-y-8">
      <div className="header-row">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Link href="/teams" className="secondary btn-sm" style={{ padding: '0.25rem 0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem', textDecoration: 'none' }}>
              <ChevronLeft size={14} /> Back to Teams
            </Link>
          </div>
          <h2 className="text-3xl font-extrabold flex items-center gap-3">
            <LayoutGrid size={32} className="text-indigo-400" />
            Capacity Planning: {team.name}
          </h2>
          <p style={{ color: "var(--text-muted)" }}>Allocate project hours across specific budgeting periods.</p>
        </div>

        {periods.length === 0 && (
          <form action={async () => {
            "use server";
            await createYearPeriods(new Date().getFullYear());
          }}>
            <button type="submit" className="btn-sm" style={{ background: 'var(--primary)', color: 'white' }}>
              <Calendar size={16} /> Auto-Generate 2024 Periods
            </button>
          </form>
        )}
      </div>

      <div className="card" style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.1)' }}>
        <PlanningGrid 
          teamId={teamId}
          initialProjects={projects}
          initialPeriods={periods}
          initialAllocations={allocations}
        />
      </div>
    </div>
  );
}
