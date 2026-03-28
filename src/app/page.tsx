import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { 
  Users, 
  Briefcase, 
  Target, 
  TrendingUp,
  LayoutDashboard,
  ExternalLink
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.organizationId) redirect("/login");

  const orgId = session.user.organizationId;

  // Fetch summary stats
  const [teamCount, projectCount, activeProjects] = await Promise.all([
    prisma.team.count({ where: { organizationId: orgId } }),
    prisma.project.count({ where: { organizationId: orgId } }),
    prisma.project.count({ where: { organizationId: orgId, status: "ACTIVE" } }),
  ]);

  const recentLogs = await prisma.auditLog.findMany({
    where: { userId: session.user.id! },
    take: 5,
    orderBy: { timestamp: 'desc' }
  });

  return (
    <div className="space-y-8">
      <div className="header-row">
        <div>
          <h2 className="text-3xl font-extrabold flex items-center gap-3">
            <LayoutDashboard size={32} className="text-indigo-400" />
            Organizational Dashboard
          </h2>
          <p style={{ color: "var(--text-muted)" }}>Overview of your team's current capacity and project status.</p>
        </div>
      </div>

      <div className="form-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Users className="text-indigo-400" size={24} />
            <TrendingUp size={16} className="text-green-400" />
          </div>
          <div style={{ marginTop: '1rem' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>{teamCount}</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Total Teams</div>
          </div>
        </div>

        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Briefcase className="text-indigo-400" size={24} />
            <span className="role-tag role-admin">Projects</span>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>{projectCount}</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Managed Initiatives</div>
          </div>
        </div>

        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Target className="text-indigo-400" size={24} />
            <span className="role-tag role-staff">Live</span>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>{activeProjects}</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Active Cycles</div>
          </div>
        </div>

        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <TrendingUp className="text-indigo-400" size={24} />
          </div>
          <div style={{ marginTop: '1rem' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>{Math.round((activeProjects / (projectCount || 1)) * 100)}%</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Delivery Focus</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontWeight: 700 }}>Quick Navigation</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <Link href="/teams" className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'none', background: 'rgba(255,255,255,0.03)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Users size={20} className="text-indigo-400" />
                <span style={{ fontWeight: 600 }}>Manage Teams</span>
              </div>
              <ExternalLink size={16} />
            </Link>
            <Link href="/projects" className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'none', background: 'rgba(255,255,255,0.03)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Briefcase size={20} className="text-indigo-400" />
                <span style={{ fontWeight: 600 }}>Project Inventory</span>
              </div>
              <ExternalLink size={16} />
            </Link>
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontWeight: 700, marginBottom: '1.5rem' }}>Recent Activity</h3>
          <div className="space-y-4">
            {recentLogs.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>No recent activity found.</p>
            ) : (
              recentLogs.map((log) => (
                <div key={log.id} style={{ fontSize: '0.875rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 600 }}>{log.action} {log.entityType}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{new Date(log.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{log.projectName}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
