"use client";

import { useState, useTransition } from "react";
import { X, Briefcase, Plus, Check } from "lucide-react";
import { updateTeam } from "@/lib/actions";

interface Project {
  id: string;
  name: string;
  code: string;
}

interface Team {
  id: string;
  name: string;
  projects?: { id: string; name: string }[];
}

export default function ManageTeamProjectsModal({ 
  team, 
  allProjects,
  onClose 
}: { 
  team: Team; 
  allProjects: Project[];
  onClose: () => void;
}) {
  const [selectedIds, setSelectedIds] = useState<string[]>(
    team.projects?.map(p => p.id) || []
  );
  const [isPending, startTransition] = useTransition();

  const toggleProject = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    startTransition(async () => {
      await updateTeam(team.id, { projectIds: selectedIds });
      onClose();
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="icon-box" style={{ background: 'var(--primary-light)', padding: '0.5rem', borderRadius: '0.5rem' }}>
              <Briefcase size={20} className="text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Manage Projects</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Select which projects are assigned to <strong className="text-white">{team.name}</strong></p>
            </div>
          </div>
          <button onClick={onClose} className="secondary btn-sm" style={{ padding: '0.5rem' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Project Inventory ({allProjects.length})
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', 
            gap: '0.75rem', 
            maxHeight: '400px', 
            overflowY: 'auto',
            paddingRight: '0.5rem'
          }}>
            {allProjects.map(project => {
              const isActive = selectedIds.includes(project.id);
              return (
                <div 
                  key={project.id}
                  onClick={() => toggleProject(project.id)}
                  style={{
                    padding: '0.75rem',
                    borderRadius: '0.75rem',
                    border: `1px solid ${isActive ? 'var(--primary)' : 'var(--card-border)'}`,
                    background: isActive ? 'rgba(99, 102, 241, 0.05)' : 'rgba(255, 255, 255, 0.02)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s ease'
                  }}
                  className="hover:bg-white/[0.05]"
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem', color: isActive ? 'white' : 'inherit' }}>{project.name}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{project.code}</div>
                  </div>
                  {isActive ? (
                    <div style={{ background: 'var(--primary)', borderRadius: '50%', padding: '2px' }}>
                      <Check size={14} className="text-white" />
                    </div>
                  ) : (
                    <Plus size={16} style={{ color: 'var(--text-muted)' }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', borderTop: '1px solid var(--card-border)', paddingTop: '1.5rem' }}>
          <button onClick={onClose} className="secondary">Cancel</button>
          <button 
            onClick={handleSave} 
            disabled={isPending}
            style={{ 
              background: 'var(--primary)', 
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            {isPending ? "Updating..." : "Save Assignments"}
          </button>
        </div>
      </div>
    </div>
  );
}
