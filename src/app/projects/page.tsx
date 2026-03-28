import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { createProject, updateProject } from "@/lib/actions";
import { 
  Briefcase, 
  Plus, 
  Users
} from "lucide-react";
import { formatDate } from "@/lib/utils";

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; team?: string; status?: string }>;
}) {
  const session = await auth();
  if (!session?.user?.organizationId) redirect("/login");

  const { q, team, status } = await searchParams;

  const projects = await prisma.project.findMany({
    where: {
      organizationId: session.user.organizationId,
      ...(q ? { name: { contains: q, mode: 'insensitive' } } : {}),
      ...(team ? { teamId: team } : {}),
      ...(status ? { status: status } : {}),
    },
    include: { team: true },
    orderBy: { updatedAt: 'desc' }
  });

  const teams = await prisma.team.findMany({
    where: { organizationId: session.user.organizationId, isActive: true }
  });

  return (
    <div className="space-y-8">
      <div className="header-row">
        <div>
          <h2 className="text-3xl font-extrabold flex items-center gap-3">
            <Briefcase size={32} className="text-indigo-400" />
            Project Inventory
          </h2>
          <p style={{ color: "var(--text-muted)" }}>Manage active initiatives and track cross-team project status.</p>
        </div>
        
        <form action={async (formData: FormData) => {
          "use server";
          const name = formData.get("name") as string;
          const code = formData.get("code") as string;
          const teamId = formData.get("teamId") as string || undefined;
          const description = formData.get("description") as string;
          await createProject({ name, code, teamId, description });
        }}>
          <div className="card" style={{ padding: '1rem', marginTop: '1rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: '1rem', flex: 1 }}>
              <input name="name" placeholder="Project Name" className="btn-sm" required style={{ flex: 2 }} />
              <input name="code" placeholder="Code (e.g. PRJ001)" className="btn-sm" required style={{ flex: 1 }} />
              <select name="teamId" className="btn-sm" style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--card-border)', borderRadius: '0.25rem', padding: '0.4rem' }}>
                <option value="">No Team Assigned</option>
                {teams.map((t: (typeof teams)[0]) => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
            <button type="submit" className="btn-sm">
              <Plus size={16} /> Create Project
            </button>
          </div>
        </form>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--card-border)' }}>
              <th style={{ padding: '1.25rem' }}>Project Details</th>
              <th>Status</th>
              <th>Assigned Team</th>
              <th>Progress</th>
              <th style={{ textAlign: 'right', paddingRight: '1.25rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                  No projects found. Use the form above to add an initiative.
                </td>
              </tr>
            ) : (
              projects.map((project: (typeof projects)[0]) => (
                <tr key={project.id} style={{ borderBottom: '1px solid var(--card-border)' }}>
                  <td style={{ padding: '1.25rem' }}>
                    <div style={{ fontWeight: 600 }}>{project.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Code: <code className="sku">{project.code}</code> • Last updated {formatDate(project.updatedAt)}
                    </div>
                  </td>
                  <td>
                    <span className={`role-tag role-${project.status.toLowerCase()}`}>
                      {project.status}
                    </span>
                  </td>
                  <td>
                    {project.team ? (
                      <div className="user-badge" style={{ gap: '0.5rem' }}>
                        <Users size={14} /> {project.team.name}
                      </div>
                    ) : (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Unassigned</span>
                    )}
                  </td>
                  <td style={{ width: '150px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: `${project.progress}%`, height: '100%', background: 'var(--primary)' }} />
                      </div>
                      <span style={{ fontSize: '0.75rem' }}>{project.progress}%</span>
                    </div>
                  </td>
                  <td style={{ textAlign: 'right', paddingRight: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                      <form action={async () => {
                        "use server";
                        const nextStatus = project.status === "ACTIVE" ? "COMPLETED" : "ACTIVE";
                        await updateProject(project.id, { status: nextStatus });
                      }}>
                        <button type="submit" className="secondary btn-sm">
                          Toggle Status
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
