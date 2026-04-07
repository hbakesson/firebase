import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ReportCharts from "@/components/ReportCharts";
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Users,
  Calendar,
  Layers,
  ShieldCheck
} from "lucide-react";
import PeriodLockToggle from "@/components/PeriodLockToggle";

export default async function ReportsPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ periodId?: string }> 
}) {
  const session = await auth();
  if (!session?.user?.organizationId) redirect("/login");

  const { periodId: selectedPeriodId } = await searchParams;
  const orgId = session.user.organizationId;

  // 1. Fetch All Relevant Context
  const allPeriods = await prisma.period.findMany({
    where: { organizationId: orgId },
    orderBy: { startDate: 'desc' }
  });

  const latestPeriod = allPeriods[0];
  const activePeriodId = selectedPeriodId || latestPeriod?.id;
  const activePeriod = allPeriods.find((p: { id: string; label: string; isLocked: boolean; endDate: Date }) => p.id === activePeriodId);

  // 2. Fetch Aggregates for Active Period
  const projects = await prisma.project.findMany({
    where: { organizationId: orgId },
    include: { 
      allocations: { where: { periodId: activePeriodId } }, 
      actualAllocations: { where: { periodId: activePeriodId } },
      teams: true 
    }
  });

  interface ProjectWithData {
    name: string;
    allocations: { plannedHours: number | null }[];
    actualAllocations: { actualHours: number | null }[];
    teams: { name: string }[];
  }

  const comparisonData = (projects as unknown as ProjectWithData[]).map((p: ProjectWithData) => {
    const planned = p.allocations.reduce((acc: number, curr: { plannedHours: number | null }) => acc + (curr.plannedHours || 0), 0);
    const actual = p.actualAllocations.reduce((acc: number, curr: { actualHours: number | null }) => acc + (curr.actualHours || 0), 0);
    return { 
      name: p.name, 
      planned, 
      actual,
      teams: p.teams.map((t: { name: string }) => t.name)
    };
  }).filter((d: { planned: number; actual: number }) => d.planned > 0 || d.actual > 0);

  // 3. Historical Trend (Last 6 Periods)
  const trendPeriods = [...allPeriods].slice(0, 6).reverse();
  const trendData = await Promise.all(trendPeriods.map(async (p: { id: string; label: string }) => {
    const budgetAgg = await prisma.budgetAllocation.aggregate({
      where: { periodId: p.id },
      _sum: { plannedHours: true }
    });
    
    // Correction: ActualAllocation uses actualHours
    const actualSum = await prisma.actualAllocation.aggregate({
      where: { periodId: p.id },
      _sum: { actualHours: true }
    });

    return {
      period: p.label.split(' (')[0],
      planned: budgetAgg._sum.plannedHours || 0,
      actual: actualSum._sum.actualHours || 0
    };
  }));

  // 4. Governance Scorecard Metrics
  const now = new Date();
  const atRiskPeriods = allPeriods.filter((p: { isLocked: boolean; endDate: Date }) => !p.isLocked && p.endDate < now);

  const totalPlanned = comparisonData.reduce((acc: number, curr: { planned: number }) => acc + curr.planned, 0);
  const totalActual = comparisonData.reduce((acc: number, curr: { actual: number }) => acc + curr.actual, 0);
  const variance = totalActual - totalPlanned;

  const teamBreakdownData = await prisma.team.findMany({
    where: { organizationId: orgId },
    include: { 
      allocations: { where: { periodId: activePeriodId } } 
    }
  });

  const teamBreakdown = teamBreakdownData.map((t: { name: string; allocations: { plannedHours: number | null }[] }) => ({
    name: t.name,
    value: t.allocations.reduce((acc: number, curr: { plannedHours: number | null }) => acc + (curr.plannedHours || 0), 0)
  })).filter((t: { value: number }) => t.value > 0);

  return (
    <div className="space-y-8">
      <div className="header-row">
        <div>
          <h2 className="text-3xl font-extrabold flex items-center gap-3">
            <BarChart3 size={32} className="text-indigo-400" />
            Executive Reports
          </h2>
          <p style={{ color: "var(--text-muted)" }}>Variance analysis and performance trends across your organization.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div className="card" style={{ padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Calendar size={18} className="text-indigo-400" />
            <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>
              Viewing: {activePeriod?.label || "None Selected"}
            </span>
          </div>
          {/* Export PDF Button */}
          <button className="secondary btn-sm">Export PDF</button>
        </div>
      </div>

      <div className="form-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className="card shadow-glass" style={{ padding: '1.5rem' }}>
          <Layers className="text-indigo-400" size={24} style={{ marginBottom: '1rem' }} />
          <div style={{ fontSize: '2rem', fontWeight: 800 }}>{totalPlanned}h</div>
          <div style={{ fontSize: '0.875rem', color: "var(--text-muted)" }}>Forecast ({activePeriod?.label.split(' (')[0]})</div>
        </div>
        <div className="card shadow-glass" style={{ padding: '1.5rem' }}>
          <Target className="text-indigo-400" size={24} style={{ marginBottom: '1rem' }} />
          <div style={{ fontSize: '2rem', fontWeight: 800 }}>{totalActual}h</div>
          <div style={{ fontSize: '0.875rem', color: "var(--text-muted)" }}>Logged Actuals</div>
        </div>
        <div className="card shadow-glass" style={{ padding: '1.5rem' }}>
          <TrendingUp className="text-indigo-400" size={24} style={{ marginBottom: '1rem' }} />
          <div style={{ fontSize: '2rem', fontWeight: 800, color: variance > 0 ? '#ef4444' : '#4ade80' }}>
            {variance > 0 ? '+' : ''}{variance}h
          </div>
          <div style={{ fontSize: '0.875rem', color: "var(--text-muted)" }}>Total Variance</div>
        </div>
        <div className="card shadow-glass" style={{ padding: '1.5rem' }}>
          <Users className="text-indigo-400" size={24} style={{ marginBottom: '1rem' }} />
          <div style={{ fontSize: '2rem', fontWeight: 800 }}>{Math.round((totalActual / (totalPlanned || 1)) * 100)}%</div>
          <div style={{ fontSize: '0.875rem', color: "var(--text-muted)" }}>Usage Accuracy</div>
        </div>
      </div>

      {/* Governance Risk Alert */}
      {atRiskPeriods.length > 0 && (
        <div className="card" style={{ borderLeft: '4px solid #f59e0b', background: 'rgba(245, 158, 11, 0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ background: '#f59e0b', color: 'black', padding: '0.5rem', borderRadius: '50%' }}>
              <ShieldCheck size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700 }}>Governance Compliance Alert</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                {atRiskPeriods.length} past period(s) are currently UNLOCKED. This increases the risk of unauthorized historical modifications.
              </div>
            </div>
          </div>
          <button className="btn-sm" style={{ background: 'var(--accent)', color: 'white' }}>
            Review Security
          </button>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
        <ReportCharts 
          comparisonData={comparisonData} 
          teamBreakdown={teamBreakdown} 
          trendData={trendData}
        />
        
        <div className="card" style={{ height: 'fit-content' }}>
          <h3 className="text-lg font-bold flex items-center gap-2" style={{ marginBottom: '1.5rem' }}>
            <Calendar size={20} className="text-indigo-400" />
            Period Filter
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Select a specific cycle to analyze.
          </p>
          
          <div className="space-y-2">
            {allPeriods.map((p) => (
              <a 
                key={p.id} 
                href={`/reports?periodId=${p.id}`}
                className={`card-sm flex items-center justify-between hover:border-indigo-500 transition-colors ${activePeriodId === p.id ? 'border-indigo-500 bg-indigo-500/5' : ''}`}
                style={{ padding: '0.75rem', textDecoration: 'none' }}
              >
                <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{p.label}</div>
                {p.isLocked ? <ShieldCheck size={14} className="text-green-400" /> : <div style={{ height: 14, width: 14, border: '1px solid var(--card-border)', borderRadius: '50%' }} />}
              </a>
            ))}
          </div>

          <hr style={{ margin: '1.5rem 0', borderColor: 'var(--card-border)' }} />

          <h3 className="text-lg font-bold flex items-center gap-2" style={{ marginBottom: '1.5rem' }}>
            <ShieldCheck size={20} className="text-indigo-400" />
            Cycle Management
          </h3>
          <div className="space-y-2">
            {allPeriods.slice(0, 3).map((p) => (
              <PeriodLockToggle key={p.id} period={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
