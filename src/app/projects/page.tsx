import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { 
  Briefcase
} from "lucide-react";
import ProjectFilters from "@/components/ProjectFilters";
import ProjectManagement from "@/components/ProjectManagement";
import CreateProjectForm from "@/components/CreateProjectForm";

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
      ...(q ? {
        OR: [
          { name: { contains: q, mode: 'insensitive' } },
          { code: { contains: q, mode: 'insensitive' } }
        ]
      } : {}),
      ...(team ? { teams: { some: { id: team } } } : {}),
      ...(status ? { status: status } : {}),
    },
    include: { teams: true },
    orderBy: { updatedAt: 'desc' }
  });

  const teams = await prisma.team.findMany({
    where: { organizationId: session.user.organizationId, isActive: true }
  });

  return (
    <div className="space-y-6">
      <div className="header-row">
        <div>
          <h2 className="text-3xl font-extrabold flex items-center gap-3">
            <Briefcase size={32} className="text-indigo-400" />
            Project Inventory
          </h2>
          <p style={{ color: "var(--text-muted)" }}>Manage active initiatives and track cross-team project status.</p>
        </div>
        
        <CreateProjectForm teams={teams} />
      </div>

      <ProjectFilters teams={teams} />

      <ProjectManagement initialProjects={projects} teams={teams} />
    </div>
  );
}
