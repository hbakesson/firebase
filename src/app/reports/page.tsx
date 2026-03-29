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

export default async function ReportsPage() {
  const session = await auth();
  if (!session?.user?.organizationId) redirect("/login");

  const orgId = session.user.organizationId;
  const isAdmin = session.user.role === "admin";

  // Fetch Comparison Data, Teams, etc... (keep existing logic)
  const projects = await prisma.project.findMany({
    where: { organizationId: orgId },
    include: { allocations: true, actualAllocations: true, team: true }
  });

  const comparisonData = projects.map((p: any) => {
    const planned = p.allocations.reduce((acc: number, curr: any) => acc + (curr.plannedHours || 0), 0);
    const actual = p.actualAllocations.reduce((acc: number, curr: any) => acc + (curr.actualHours || 0), 0);
    return { name: p.name, planned, actual };
  }).filter((d: any) => d.planned > 0 || d.actual > 0);

  const teams = await prisma.team.findMany({
    where: { organizationId: orgId },
    include: { allocations: true }
  });

  const teamBreakdown = teams.map((t: any) => ({
    name: t.name,
    value: t.allocations.reduce((acc: number, curr: any) => acc + (curr.plannedHours || 0), 0)
  })).filter((t: any) => t.value > 0);

  const totalPlanned = comparisonData.reduce((acc: number, curr: any) => acc + curr.planned, 0);
  const totalActual = comparisonData.reduce((acc: number, curr: any) => acc + curr.actual, 0);
  const variance = totalActual - totalPlanned;

  // New: Fetch recent periods for Governance
  const recentPeriods = await prisma.period.findMany({
    where: { organizationId: orgId },
    orderBy: { startDate: 'desc' },
    take: 6
  });

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
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div className="card" style={{ padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Calendar size={18} className="text-indigo-400" />
            <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Active Cycle: Q1 2024</span>
          </div>
          <button className="secondary btn-sm">Export PDF</button>
        </div>
      </div>

      <div className="form-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className="card shadow-glass" style={{ padding: '1.5rem' }}>
          <Layers className="text-indigo-400" size={24} style={{ marginBottom: '1rem' }} />
          <div style={{ fontSize: '2rem', fontWeight: 800 }}>{totalPlanned}h</div>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Organization Forecast</div>
        </div>
        <div className="card shadow-glass" style={{ padding: '1.5rem' }}>
          <Target className="text-indigo-400" size={24} style={{ marginBottom: '1rem' }} />
          <div style={{ fontSize: '2rem', fontWeight: 800 }}>{totalActual}h</div>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Total Hours Logged</div>
        </div>
        <div className="card shadow-glass" style={{ padding: '1.5rem' }}>
          <TrendingUp className="text-indigo-400" size={24} style={{ marginBottom: '1rem' }} />
          <div style={{ fontSize: '2rem', fontWeight: 800, color: variance > 0 ? '#ef4444' : '#4ade80' }}>
            {variance > 0 ? '+' : ''}{variance}h
          </div>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Organization Variance</div>
        </div>
        <div className="card shadow-glass" style={{ padding: '1.5rem' }}>
          <Users className="text-indigo-400" size={24} style={{ marginBottom: '1rem' }} />
          <div style={{ fontSize: '2rem', fontWeight: 800 }}>{Math.round((totalActual / (totalPlanned || 1)) * 100)}%</div>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Resource Accuracy</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
        <ReportCharts 
          comparisonData={comparisonData} 
          teamBreakdown={teamBreakdown} 
        />
        
        <div className="card" style={{ height: 'fit-content' }}>
          <h3 className="text-lg font-bold flex items-center gap-2" style={{ marginBottom: '1.5rem' }}>
            <ShieldCheck size={20} className="text-indigo-400" />
            Cycle Management
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Lock fiscal periods to prevent unauthorized data modifications.
          </p>
          
          <div className="space-y-2">
            {recentPeriods.map((p: any) => (
              <PeriodLockToggle key={p.id} period={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
