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
  Layers
} from "lucide-react";

export default async function ReportsPage() {
  const session = await auth();
  if (!session?.user?.organizationId) redirect("/login");

  const orgId = session.user.organizationId;

  // 1. Fetch Comparison Data (Planned vs Actual per Project)
  const projects = await prisma.project.findMany({
    where: { organizationId: orgId },
    include: {
      allocations: true,
      actualAllocations: true,
      team: true
    }
  });

  const comparisonData = projects.map(p => {
    const planned = p.allocations.reduce((acc, curr) => acc + curr.plannedHours, 0);
    const actual = p.actualAllocations.reduce((acc, curr) => acc + curr.actualHours, 0);
    return {
      name: p.name,
      planned,
      actual,
    };
  }).filter(d => d.planned > 0 || d.actual > 0);

  // 2. Fetch Team Breakdown (Total Hours per Team)
  const teams = await prisma.team.findMany({
    where: { organizationId: orgId },
    include: {
      allocations: true
    }
  });

  const teamBreakdown = teams.map(t => ({
    name: t.name,
    value: t.allocations.reduce((acc, curr) => acc + curr.plannedHours, 0)
  })).filter(t => t.value > 0);

  // 3. Overall Organization Stats
  const totalPlanned = comparisonData.reduce((acc, curr) => acc + curr.planned, 0);
  const totalActual = comparisonData.reduce((acc, curr) => acc + curr.actual, 0);
  const variance = totalActual - totalPlanned;

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
          <button onClick={() => window.print()} className="secondary btn-sm">Export PDF</button>
        </div>
      </div>

      <div className="form-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className="card shadow-glass" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <Layers className="text-indigo-400" size={24} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800 }}>{totalPlanned}h</div>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Organization Forecast</div>
        </div>

        <div className="card shadow-glass" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <Target className="text-indigo-400" size={24} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800 }}>{totalActual}h</div>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Total Hours Logged</div>
        </div>

        <div className="card shadow-glass" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <TrendingUp className="text-indigo-400" size={24} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: variance > 0 ? '#ef4444' : '#4ade80' }}>
            {variance > 0 ? '+' : ''}{variance}h
          </div>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Organization Variance</div>
        </div>

        <div className="card shadow-glass" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <Users className="text-indigo-400" size={24} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800 }}>{Math.round((totalActual / (totalPlanned || 1)) * 100)}%</div>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Resource Accuracy</div>
        </div>
      </div>

      <ReportCharts 
        comparisonData={comparisonData} 
        teamBreakdown={teamBreakdown} 
      />
    </div>
  );
}
