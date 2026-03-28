import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { getOrCreateWeeklyPeriods } from "@/lib/actions";
import { BulkPlanningGrid } from "@/components/BulkPlanningGrid";
import { Zap } from "lucide-react";

export default async function BulkPlanningPage() {
  const session = await auth();
  if (!session?.user?.organizationId) {
    redirect("/login");
  }

  const orgId = session.user.organizationId;

  // 1. Ensure/Fetch Weekly Periods (9-week rolling window)
  const periods = await getOrCreateWeeklyPeriods();
  const periodIds = periods.map(p => p.id);

  // 2. Fetch Active Projects for the Org
  const projects = await prisma.project.findMany({
    where: { 
      organizationId: orgId,
      status: "ACTIVE" 
    },
    orderBy: { name: 'asc' }
  });

  const projectIds = projects.map((p: { id: string }) => p.id);

  // 3. Fetch Existing Allocations for these Projects/Periods
  const allocations = await prisma.budgetAllocation.findMany({
    where: {
      projectId: { in: projectIds },
      periodId: { in: periodIds }
    }
  });

  return (
    <main>
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
        />
      </div>
    </main>
  );
}
