import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { createProject } from "@/lib/actions";
import { 
  Briefcase, 
  Plus
} from "lucide-react";
import ProjectList from "@/components/ProjectList";

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

      <ProjectList initialProjects={projects} teams={teams} />
    </div>
  );
}
