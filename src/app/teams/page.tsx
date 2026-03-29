import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { createTeam } from "@/lib/actions";
import { 
  Users, 
  Plus
} from "lucide-react";
import { sanitize } from "@/lib/utils";
import TeamRow from "@/components/TeamRow";

export default async function TeamsPage() {
  const session = await auth();
  if (!session?.user?.organizationId) redirect("/login");

  const orgId = session.user.organizationId;

  // 1. Fetch main teams list with parent inclusion (for the table)
  const rawTeams = await prisma.team.findMany({
    where: { organizationId: orgId },
    include: { parentTeam: true },
    orderBy: { name: 'asc' }
  });

  // 2. Sanitize and prepare options
  const teams = sanitize(rawTeams);
  const parentOptions = teams.map((t: { id: string; name: string }) => ({ id: t.id, name: t.name }));

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
          const parentTeamId = (formData.get("parentTeamId") as string) || undefined;
          await createTeam({ name, code, parentTeamId });
        }}>
          <div className="card" style={{ padding: '1rem', marginTop: '1rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <Plus size={18} className="text-indigo-400" />
            <input name="name" placeholder="Team Name" className="btn-sm" required style={{ flex: 1 }} />
            <input name="code" placeholder="Code (e.g. DEV)" className="btn-sm" required style={{ width: '120px' }} />
            <select name="parentTeamId" className="btn-sm" style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--card-border)', borderRadius: '0.25rem', padding: '0.4rem' }}>
              <option value="">No Parent</option>
              {parentOptions.map((t: { id: string; name: string }) => <option key={t.id} value={t.id}>{t.name}</option>)}
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
              <th style={{ textAlign: 'right', paddingRight: '1.25rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teams.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                  No teams found. Create your first team above.
                </td>
              </tr>
            ) : (
              teams.map((team: { id: string; name: string; code: string; isActive: boolean; parentTeam: { id: string; name: string } | null }) => (
                <TeamRow key={team.id} team={team} parentOptions={parentOptions} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
