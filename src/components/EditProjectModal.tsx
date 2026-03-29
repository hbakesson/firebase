"use client";

import { useState, useTransition } from "react";
import { updateProject, deleteProject } from "@/lib/actions";
import { X, Save, Trash2, AlertTriangle } from "lucide-react";

interface Project {
  id: string;
  name: string;
  code: string;
  description: string | null;
  status: string;
  progress: number;
  teamId: string | null;
}

interface Team {
  id: string;
  name: string;
}

export default function EditProjectModal({ 
  project, 
  teams, 
  onClose 
}: { 
  project: Project; 
  teams: Team[]; 
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    name: project.name,
    code: project.code,
    description: project.description || "",
    status: project.status,
    progress: project.progress,
    teamId: project.teamId || ""
  });
  const [isPending, startTransition] = useTransition();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSave = () => {
    startTransition(async () => {
      await updateProject(project.id, {
        ...formData,
        teamId: formData.teamId || null
      });
      onClose();
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      await deleteProject(project.id);
      onClose();
    });
  };

  return (
    <div style={{ 
      position: 'fixed', 
      inset: 0, 
      background: 'rgba(0,0,0,0.8)', 
      backdropFilter: 'blur(12px)',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div className="card shadow-glass" style={{ maxWidth: '600px', width: '100%', padding: '2rem', background: 'var(--card-bg)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h3 className="text-2xl font-bold">Edit Initiative</h3>
          <button onClick={onClose} className="secondary" style={{ padding: '0.4rem' }}>
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="space-y-1">
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>PROJECT NAME</label>
              <input 
                className="btn-sm w-full" 
                value={formData.name} 
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="space-y-1">
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>PROJECT CODE</label>
              <input 
                className="btn-sm w-full" 
                value={formData.code} 
                onChange={e => setFormData(prev => ({ ...prev, code: e.target.value }))}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1rem' }}>
            <div className="space-y-1">
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>STATUS</label>
              <select 
                className="btn-sm w-full"
                value={formData.status}
                onChange={e => setFormData(prev => ({ ...prev, status: e.target.value }))}
                style={{ background: 'rgba(0,0,0,0.2)', color: 'white', borderRadius: '0.5rem', border: '1px solid var(--card-border)' }}
              >
                <option value="PLANNED">Planned</option>
                <option value="ACTIVE">Active</option>
                <option value="COMPLETED">Completed</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>
            <div className="space-y-1">
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>PROGRESS ({formData.progress}%)</label>
              <input 
                type="range"
                className="w-full"
                value={formData.progress}
                onChange={e => setFormData(prev => ({ ...prev, progress: parseInt(e.target.value) }))}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>ASSIGNED TEAM</label>
            <select 
              className="btn-sm w-full"
              value={formData.teamId}
              onChange={e => setFormData(prev => ({ ...prev, teamId: e.target.value }))}
              style={{ background: 'rgba(0,0,0,0.2)', color: 'white', borderRadius: '0.5rem', border: '1px solid var(--card-border)' }}
            >
              <option value="">Unassigned</option>
              {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>

          <div className="space-y-1">
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>DESCRIPTION</label>
            <textarea 
              className="btn-sm w-full" 
              rows={3}
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              style={{ padding: '0.75rem', minHeight: '100px' }}
            />
          </div>
        </div>

        <div style={{ 
          marginTop: '2rem', 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '1.5rem',
          borderTop: '1px solid var(--card-border)'
        }}>
          {!showDeleteConfirm ? (
            <button 
              onClick={() => setShowDeleteConfirm(true)} 
              className="btn-sm" 
              style={{ background: 'transparent', color: '#ef4444', border: '1px solid #ef4444' }}
            >
              <Trash2 size={16} /> Delete
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <AlertTriangle size={16} className="text-red-500" />
              <button 
                onClick={handleDelete}
                className="btn-sm bg-red-600 text-white"
                disabled={isPending}
              >
                Confirm Delete
              </button>
              <button onClick={() => setShowDeleteConfirm(false)} className="btn-sm secondary">Cancel</button>
            </div>
          )}

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={onClose} className="secondary btn-sm">Cancel</button>
            <button 
              onClick={handleSave} 
              className="btn-sm bg-indigo-600 text-white"
              disabled={isPending}
              style={{ minWidth: '120px' }}
            >
              {isPending ? "Saving..." : <><Save size={16} /> Save Changes</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
