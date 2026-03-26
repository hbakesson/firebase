import { useRouter, useSearchParams } from "next/navigation";
import { deleteProject, updateProgress } from "./actions";

type Project = {
  id: string;
  name: string;
  description: string | null;
  status: string;
  priority: number;
  progress: number;
  createdAt: Date;
};

export default function ProjectList({ initialProjects }: { initialProjects: Project[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams?.get("q") || "";
  const statusFilter = searchParams?.get("status") || "ALL";

  const updateFilters = (q?: string, status?: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    if (q !== undefined) {
      if (q) params.set("q", q);
      else params.delete("q");
    }
    if (status !== undefined) {
      if (status && status !== "ALL") params.set("status", status);
      else params.delete("status");
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <section>
      <div className="search-bar" style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <div style={{ flex: 1, position: "relative" }}>
          <span className="search-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </span>
          <input 
            type="text" 
            placeholder="Search projects..." 
            value={search}
            onChange={(e) => updateFilters(e.target.value, undefined)}
            style={{ paddingLeft: "2.5rem" }}
          />
        </div>
        <select 
          value={statusFilter} 
          onChange={(e) => updateFilters(undefined, e.target.value)}
          className="secondary"
          style={{ width: "auto", margin: 0 }}
        >
          <option value="ALL">All Status</option>
          <option value="PLANNED">Planned</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
          <option value="ON_HOLD">On Hold</option>
        </select>
      </div>

      <div className="card" style={{ padding: "0" }}>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Project</th>
                <th>Status</th>
                <th>Progress</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {initialProjects.length > 0 ? (
                initialProjects.map(project => (
                  <tr key={project.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{project.name}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                        Started {new Date(project.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge status-${project.status.toLowerCase()}`}>
                        {project.status.replace("_", " ")}
                      </span>
                    </td>
                    <td>
                      <div className="progress-container">
                        <div className="progress-bar" style={{ width: `${project.progress}%` }}></div>
                        <span className="progress-text">{project.progress}%</span>
                      </div>
                    </td>
                    <td>
                      <div className="actions" style={{ justifyContent: "flex-end" }}>
                        <button className="secondary" title="Decrease Progress" onClick={() => updateProgress(project.id, Math.max(0, project.progress - 10))}>-10%</button>
                        <button className="secondary" title="Increase Progress" onClick={() => updateProgress(project.id, Math.min(100, project.progress + 10))}>+10%</button>
                        <button className="danger" title="Delete Project" onClick={() => {
                          if (confirm("Delete this project?")) deleteProject(project.id);
                        }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="empty-state">
                    {search || statusFilter !== "ALL" ? "No projects match your filters." : "No projects found."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
