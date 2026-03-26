"use client";

import { useState } from "react";
import { deleteProject, updateProject } from "./actions";

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
  const [search, setSearch] = useState("");

  const filteredProjects = initialProjects.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    (p.status.toLowerCase().includes(search.toLowerCase()))
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED": return "var(--success)";
      case "IN_PROGRESS": return "var(--primary)";
      case "ON_HOLD": return "var(--warning)";
      default: return "var(--text-muted)";
    }
  };

  return (
    <section>
      <div className="search-bar">
        <span className="search-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </span>
        <input 
          type="text" 
          placeholder="Search projects..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="card" style={{ padding: "0" }}>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Project</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Progress</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.length > 0 ? (
                filteredProjects.map(project => (
                  <tr key={project.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{project.name}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {project.description || "No description"}
                      </div>
                    </td>
                    <td>
                      <span className="sku" style={{ backgroundColor: getStatusColor(project.status), color: "white", padding: "2px 8px", borderRadius: "12px", fontSize: "0.7rem" }}>
                        {project.status.replace("_", " ")}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "2px" }}>
                        {[...Array(5)].map((_, i) => (
                          <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: i < project.priority ? "var(--primary)" : "var(--border)" }} />
                        ))}
                      </div>
                    </td>
                    <td style={{ minWidth: "120px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ flex: 1, height: "6px", backgroundColor: "var(--border)", borderRadius: "3px", overflow: "hidden" }}>
                          <div style={{ width: `${project.progress}%`, height: "100%", backgroundColor: "var(--success)" }} />
                        </div>
                        <span style={{ fontSize: "0.8rem", width: "35px" }}>{project.progress}%</span>
                      </div>
                    </td>
                    <td>
                      <div className="actions" style={{ justifyContent: "flex-end" }}>
                        <button className="secondary" onClick={() => updateProject(project.id, { progress: Math.min(100, project.progress + 10) })}>+</button>
                        <button className="danger" onClick={() => {
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
                  <td colSpan={5} className="empty-state">
                    {search ? "No projects match your search." : "No projects found. Start by creating one above."}
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
