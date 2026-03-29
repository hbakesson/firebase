"use client";

import { useState } from "react";
import { Users, MoreVertical, Edit2, CheckCircle2, PlayCircle } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { updateProject } from "@/lib/actions";
import EditProjectModal from "./EditProjectModal";

interface Project {
  id: string;
  name: string;
  code: string;
  description: string | null;
  status: string;
  progress: number;
  updatedAt: Date;
  teamId: string | null;
  team: { id: string; name: string } | null;
}

interface Team {
  id: string;
  name: string;
}

export default function ProjectList({ initialProjects, teams }: { initialProjects: Project[]; teams: Team[] }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [dropdownId, setDropdownId] = useState<string | null>(null);

  const toggleStatus = async (project: Project) => {
    const nextStatus = project.status === "ACTIVE" ? "COMPLETED" : "ACTIVE";
    await updateProject(project.id, { status: nextStatus });
  };

  return (
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
          {initialProjects.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                No projects found. Use the form above to add an initiative.
              </td>
            </tr>
          ) : (
            initialProjects.map((project) => (
              <tr key={project.id} style={{ borderBottom: '1px solid var(--card-border)' }} className="hover:bg-white/[0.02] transition-colors">
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
                    <button 
                      onClick={() => toggleStatus(project)} 
                      className="secondary btn-sm"
                      title={project.status === 'ACTIVE' ? "Mark as Completed" : "Mark as Active"}
                    >
                      {project.status === 'ACTIVE' ? <CheckCircle2 size={16} /> : <PlayCircle size={16} />}
                    </button>
                    <button 
                      onClick={() => setSelectedProject(project)} 
                      className="btn-sm"
                      style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}
                    >
                      <Edit2 size={16} /> Manage
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {selectedProject && (
        <EditProjectModal 
          project={selectedProject} 
          teams={teams}
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </div>
  );
}
