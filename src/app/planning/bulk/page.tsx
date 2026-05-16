import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { getOrCreateWeeklyPeriods } from "@/lib/actions";
import { BulkPlanningGrid } from "@/components/BulkPlanningGrid";
import { Zap } from "lucide-react";

type Props = {
  searchParams: Promise<{ offset?: string }>
}

export default async function BulkPlanningPage({ searchParams }: Props) {
  const session = await auth();
  if (!session?.user?.organizationId) {
    redirect("/login");
  }

  const orgId = session.user.organizationId;

  const { offset } = await searchParams;
  const parsedOffset = parseInt(offset || "0", 10) || 0;

  // 1. Ensure/Fetch Weekly Periods (8-week rolling window via offset)
  const periods = await getOrCreateWeeklyPeriods(parsedOffset);
  const periodIds = periods.map(p => p.id);

  // 2. Fetch Active Projects for the Org
  const projects = await prisma.project.findMany({
    where: { 
      organizationId: orgId,
      status: "ACTIVE" 
    },
    include: {
      teams: true
    },
    orderBy: { name: 'asc' }
  });

  const projectIds = projects.map((p: { id: string }) => p.id);

  // 3. Fetch Existing Allocations for these Projects/Periods
  const allocations = await prisma.allocation.findMany({
    where: {
      projectId: { in: projectIds },
      periodId: { in: periodIds }
    }
  });

  // 4. Fetch Users for capacity context
  const users = await prisma.user.findMany({
    where: { organizationId: orgId },
    orderBy: { name: 'asc' }
  });

  // 5. Fetch Teams to populate the filter dropdown
  const teams = await prisma.team.findMany({
    where: {
      organizationId: orgId
    },
    orderBy: { name: 'asc' }
  });

  return (
    <main className="bg-slate-50 min-h-screen p-8">
      <header className="page-header" style={{ marginBottom: '1.5rem' }}>
        <div className="header-content">
          <h1 className="page-title flex items-center gap-3">
            <Zap size={28} className="text-yellow-400 fill-yellow-400" />
            Bulk Capacity Mode
          </h1>
          <p className="page-description">
            High-performance tactical planning for all active organizational projects.
          </p>
        </div>
      </header>

      <div className="grid-layout">
        <BulkPlanningGrid 
          initialProjects={projects}
          initialPeriods={periods}
          initialAllocations={allocations}
          initialTeams={teams}
          initialUsers={users}
          offset={parsedOffset}
        />
      </div>
    </main>
  );
}
