import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AuditLogInspector from "@/components/AuditLogInspector";
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  ArrowLeft,
  Calendar,
  Layers,
  Activity
} from "lucide-react";
import Link from "next/link";

export default async function AuditPage({ searchParams }: { searchParams: Promise<{ entityType?: string; action?: string }> }) {
  const session = await auth();
  if (!session?.user?.organizationId) redirect("/login");

  const { entityType, action } = await searchParams;
  const orgId = session.user.organizationId;

  const logs = await prisma.auditLog.findMany({
    where: {
      organizationId: orgId,
      ...(entityType ? { entityType } : {}),
      ...(action ? { action } : {}),
    },
    orderBy: { timestamp: "desc" },
    take: 100,
  });

  return (
    <div className="space-y-8">
      <div className="header-row">
        <div>
          <h2 className="text-3xl font-extrabold flex items-center gap-3">
            <ShieldCheck size={32} className="text-indigo-400" />
            Admin Audit Trail
          </h2>
          <p style={{ color: "var(--text-muted)" }}>Searchable history of every administrative mutation in your organization.</p>
        </div>
        
        <Link href="/" className="secondary btn-sm flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
      </div>

      <div className="card shadow-glass" style={{ padding: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
          <Filter size={18} className="text-indigo-400" />
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Link 
              href="/audit" 
              className={`role-tag ${!entityType && !action ? 'role-admin' : 'secondary'}`}
              style={{ padding: '0.4rem 1rem' }}
            >
              All Activity
            </Link>
            <Link 
              href="/audit?entityType=Project" 
              className={`role-tag ${entityType === 'Project' ? 'role-admin' : 'secondary'}`}
              style={{ padding: '0.4rem 1rem' }}
            >
              Projects
            </Link>
            <Link 
              href="/audit?entityType=Team" 
              className={`role-tag ${entityType === 'Team' ? 'role-admin' : 'secondary'}`}
              style={{ padding: '0.4rem 1rem' }}
            >
              Teams
            </Link>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="user-badge" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--card-border)' }}>
            <Search size={14} />
            <span style={{ fontSize: '0.875rem' }}>Search by Project Code...</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: '2rem' }}>
        <AuditLogInspector logs={logs} />

        <div className="space-y-6">
          <div className="card shadow-glass" style={{ padding: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Activity size={18} className="text-indigo-400" /> Stats
            </h3>
            <div className="space-y-4">
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Organization Logs</span>
                <span style={{ fontWeight: 700 }}>{logs.length}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Created This Week</span>
                <span style={{ fontWeight: 700 }}>{logs.filter(l => l.action === 'CREATE').length}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Critical Mutations</span>
                <span style={{ fontWeight: 700, color: '#ef4444' }}>{logs.filter(l => l.action === 'DELETE').length}</span>
              </div>
            </div>
          </div>

          <div className="card shadow-glass" style={{ padding: '1.15rem' }}>
             <h3 style={{ marginBottom: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Layers size={18} className="text-indigo-400" /> Retention
             </h3>
             <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
               Your audit history is retained forever in the premium enterprise tier. You can export these logs via CSV soon.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
