import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { createTeam, updateTeam } from "@/lib/actions";
import Link from "next/link";
import { 
  Users, 
  Plus, 
  MapPin, 
  ShieldCheck, 
  Building2,
  ChevronRight
} from "lucide-react";

export default async function TeamsPage() {
  const session = await auth();
  if (!session?.user?.organizationId) redirect("/login");

  const teams = await prisma.team.findMany({
    where: { organizationId: session.user.organizationId },
    include: { parentTeam: true },
    orderBy: { name: 'asc' }
  });

  return (
    <div className="space-y-8">
      <div className="header-row">
        <div>
          <h2 className="text-3xl font-extrabold flex items-center gap-3">
            <Users size={32} className="text-indigo-400" />
            Team Management
          </h2>
          <p style={{ color: "var(--text-muted)" }}>Manage your organizational structure and departmental hierarchy.</p>
        </div>
        
        <form action={async (formData: FormData) => {
          "use server";
          const name = formData.get("name") as string;
          const code = formData.get("code") as string;
          const parentTeamId = formData.get("parentTeamId") as string || undefined;
          await createTeam({ name, code, parentTeamId });
        }}>
          <div className="card" style={{ padding: '1rem', marginTop: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Plus size={18} className="text-indigo-400" />
            <input name="name" placeholder="Team Name" className="btn-sm" required style={{ flex: 1 }} />
            <input name="code" placeholder="Code (e.g. DEV)" className="btn-sm" required style={{ width: '120px' }} />
            <select name="parentTeamId" className="btn-sm" style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--card-border)', borderRadius: '0.25rem', padding: '0.4rem' }}>
              <option value="">No Parent</option>
              {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
            <button type="submit" className="btn-sm">Create Team</button>
          </div>
        </form>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--card-border)' }}>
              <th style={{ padding: '1.25rem' }}>Team Name</th>
              <th>Code</th>
              <th>Hierarchy</th>
              <th>Status</th>
              <th>Created</th>
              <th style={{ textAlign: 'right', paddingRight: '1.25rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teams.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                  No teams found. Create your first team above.
                </td>
              </tr>
            ) : (
              teams.map((team) => (
                <tr key={team.id} style={{ borderBottom: '1px solid var(--card-border)', transition: 'background 0.2s' }}>
                  <td style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: team.isActive ? '#4ade80' : '#94a3b8' }} />
                    <span style={{ fontWeight: 600 }}>{team.name}</span>
                  </td>
                  <td><code className="sku">{team.code}</code></td>
                  <td>
                    {team.parentTeam ? (
                      <span className="user-badge" style={{ fontSize: '0.8rem' }}>
                        {team.parentTeam.name} <ChevronRight size={12} /> {team.name}
                      </span>
                    ) : (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Root Level</span>
                    )}
                  </td>
                  <td>
                    <span className={`role-tag ${team.isActive ? 'role-admin' : 'role-staff'}`}>
                      {team.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                    {new Date(team.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ textAlign: 'right', paddingRight: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                      <Link href={`/planning/${team.id}`} className="btn-sm" style={{ textDecoration: 'none', background: 'var(--primary)', color: 'white' }}>
                        Plan Capacity
                      </Link>
                      <form action={async () => {
                        "use server";
                        await updateTeam(team.id, { isActive: !team.isActive });
                      }}>
                        <button type="submit" className="secondary btn-sm">
                          {team.isActive ? "Deactivate" : "Activate"}
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
