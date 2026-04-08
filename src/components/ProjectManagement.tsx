"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  Users, 
  Edit2, 
  Save, 
  Trash2, 
  AlertTriangle,
  ChevronRight,
  Plus,
  Briefcase
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import { updateProject, deleteProject } from "@/lib/actions";

interface Project {
  id: string;
  name: string;
  code: string;
  description: string | null;
  status: string;
  progress: number;
  updatedAt: Date;
  teams: { id: string; name: string }[];
}

interface Team {
  id: string;
  name: string;
}

/**
 * ─── Sub-Component: Project Detail Workspace ─────────────────────────────────
 * Using the 'key' pattern to reset internal state when selection changes.
 */
function ProjectDetail({ project, teams, onUpdate }: { project: Project, teams: Team[], onUpdate: () => void }) {
  const [formData, setFormData] = useState({
    name: project.name,
    code: project.code,
    description: project.description || "",
    status: project.status,
    progress: project.progress,
    teamIds: project.teams?.map(t => t.id) || []
  });

  const [isPending, setIsPending] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSave = async () => {
    setIsPending(true);
    const result = await updateProject(project.id, formData);
    setIsPending(false);
    
    if (result?.error) {
      alert(`System Conflict: ${result.error}`);
    } else {
      alert("Project architecture synchronized.");
      onUpdate();
    }
  };

  const handleDelete = async () => {
    setIsPending(true);
    const result = await deleteProject(project.id);
    setIsPending(false);
    
    if (result?.error) {
      alert(`Purge Interrupted: ${result.error}`);
    } else {
      alert("Project decommissioned successfully.");
      onUpdate();
    }
  };

  const toggleTeam = (teamId: string) => {
    setFormData(prev => ({
      ...prev,
      teamIds: prev.teamIds.includes(teamId)
        ? prev.teamIds.filter(id => id !== teamId)
        : [...prev.teamIds, teamId]
    }));
  };

  return (
    <div className="flex-1 min-w-0 bg-white/[0.03] border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl backdrop-blur-3xl animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Header with Generated Graphic */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image 
          src="/Users/hbakesson/.gemini/antigravity/brain/eb76f46a-8eb0-4f3b-907d-43ad92740783/modern_project_dashboard_graphics_1775678772185.png"
          alt="Project Analytics Visualization"
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
        
        <div className="absolute bottom-8 left-10 right-10 flex justify-between items-end">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-indigo-500 text-white text-[10px] font-black rounded-lg uppercase tracking-tighter shadow-lg shadow-indigo-500/40">
                Live Initiative
              </span>
              <span className="text-white/40 text-[10px] font-mono tracking-widest">{project.id}</span>
            </div>
            <h2 className="text-4xl font-black text-white tracking-tight leading-none">{project.name}</h2>
            <div className="flex items-center gap-4 text-white/40 text-[10px] font-bold uppercase tracking-widest">
              <span className="flex items-center gap-1.5"><Briefcase size={12} className="text-indigo-400" /> {project.code}</span>
              <span className="w-1 h-1 bg-white/20 rounded-full" />
              <span>Refactored: {formatDate(project.updatedAt)}</span>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2">
             <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Completion Node</div>
             <div className="text-5xl font-black text-indigo-400 font-mono tracking-tighter">{project.progress}%</div>
          </div>
        </div>
      </div>

      {/* Workspace Area */}
      <div className="flex-1 overflow-y-auto p-10 space-y-12 scrollbar-hide">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          
          {/* Left Block: Core Meta */}
          <div className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.1em] ml-1">Identity Specifications</label>
              <div className="grid grid-cols-1 gap-4">
                <div className="form-group flex-1">
                  <label className="text-xs opacity-60">Project Name</label>
                  <input 
                    className="w-full bg-white/[0.03] border-white/10 focus:border-indigo-500/50"
                    value={formData.name} 
                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="form-group flex-1">
                  <label className="text-xs opacity-60">System Code</label>
                  <input 
                    className="w-full font-mono bg-white/[0.03] border-white/10 focus:border-indigo-500/50"
                    value={formData.code} 
                    onChange={e => setFormData(prev => ({ ...prev, code: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.1em] ml-1">Status & Velocity</label>
              <div className="grid grid-cols-1 gap-4">
                <div className="form-group">
                  <label className="text-xs opacity-60">Current Status</label>
                  <select 
                    value={formData.status}
                    onChange={e => setFormData(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full p-3.5 bg-black/40 rounded-xl border border-white/10 text-white outline-none focus:border-indigo-500 transition-all cursor-pointer"
                  >
                    <option value="PLANNED">Planned</option>
                    <option value="ACTIVE">Active</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="text-xs opacity-60">Execution Progress ({formData.progress}%)</label>
                  <div className="flex items-center gap-6 bg-white/[0.03] p-4 rounded-xl border border-white/5">
                    <input 
                      type="range"
                      className="flex-1 accent-indigo-500 h-1.5"
                      value={formData.progress}
                      onChange={e => setFormData(prev => ({ ...prev, progress: parseInt(e.target.value) }))}
                    />
                    <span className="text-lg font-black text-indigo-400 font-mono">{formData.progress}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Block: Architecture & Description */}
          <div className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.1em] ml-1">Team Architecture</label>
              <div className="form-group">
                <label className="text-xs opacity-60">Assigned Collaborative Units</label>
                <div className="flex flex-wrap gap-2.5 p-5 bg-black/40 rounded-2xl border border-white/10 min-h-[140px]">
                  {teams.map(t => {
                    const isSelected = formData.teamIds.includes(t.id);
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => toggleTeam(t.id)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                          isSelected 
                            ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300 shadow-lg shadow-indigo-500/10' 
                            : 'bg-white/5 border-white/5 text-white/40 hover:bg-white/10'
                        }`}
                      >
                        <Users size={14} />
                        {t.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.1em] ml-1">Strategic Description</label>
              <textarea 
                className="w-full h-[140px] bg-black/40 border-white/10 rounded-2xl p-5 text-sm focus:border-indigo-500/50 resize-none transition-all"
                placeholder="Detail high-level objectives and technical roadmap..."
                value={formData.description}
                onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Command Bar */}
      <div className="p-8 bg-black/40 border-t border-white/5 flex items-center justify-between backdrop-blur-xl">
        {!showDeleteConfirm ? (
          <button 
            onClick={() => setShowDeleteConfirm(true)} 
            className="flex items-center gap-2.5 px-6 py-3.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-500 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95"
          >
            <Trash2 size={16} /> Delete Initiative
          </button>
        ) : (
          <div className="flex items-center gap-3 p-2 bg-red-500/10 border border-red-500/20 rounded-2xl animate-in zoom-in-95">
            <div className="flex items-center gap-2 px-3 text-red-400">
              <AlertTriangle size={16} />
              <span className="text-[10px] font-black uppercase tracking-tight">System Purge?</span>
            </div>
            <button 
              onClick={handleDelete}
              disabled={isPending}
              className="px-6 py-2 bg-red-600 text-white text-xs font-black rounded-xl hover:bg-red-500 transition-all shadow-lg shadow-red-600/20"
            >
              CONFIRM
            </button>
            <button 
              onClick={() => setShowDeleteConfirm(false)}
              className="px-6 py-2 bg-white/10 text-xs font-bold rounded-xl hover:bg-white/20 transition-all"
            >
              BACK
            </button>
          </div>
        )}

        <div className="flex items-center gap-4">
          <button 
            onClick={() => {
              setFormData({
                name: project.name,
                code: project.code,
                description: project.description || "",
                status: project.status,
                progress: project.progress,
                teamIds: project.teams?.map(t => t.id) || []
              });
            }}
            className="px-8 py-3.5 bg-white/5 border border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest text-white/60 hover:bg-white/10 transition-all"
          >
            Discard
          </button>
          <button 
            onClick={handleSave} 
            disabled={isPending}
            className="flex items-center gap-3 px-10 py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:grayscale rounded-2xl font-black text-xs uppercase tracking-[0.1em] text-white transition-all shadow-2xl shadow-indigo-600/40 active:scale-[0.98]"
          >
            {isPending ? "Syncing..." : <>Save Evolution <Save size={18} /></>}
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * ─── Main Management Workbench ──────────────────────────────────────────────
 */
export default function ProjectManagement({ 
  initialProjects, 
  teams 
}: { 
  initialProjects: Project[]; 
  teams: Team[];
}) {
  const [selectedProjectIdState, setSelectedProjectId] = useState<string | null>(initialProjects[0]?.id || null);

  // Derived selection: Fallback to first project if the current selection is missing from props
  const selectedProjectId = initialProjects.some(p => p.id === selectedProjectIdState)
    ? selectedProjectIdState
    : (initialProjects[0]?.id || null);

  const selectedProject = initialProjects.find(p => p.id === selectedProjectId);

  const handleSelect = (p: Project) => {
    setSelectedProjectId(p.id);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 mt-4">
      {/* MASTER LIST */}
      <div className="w-full lg:w-[350px] space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest">Project Inventory</h3>
          <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-white/60">{initialProjects.length} Total</span>
        </div>
        
        <div className="flex flex-col gap-3">
          {initialProjects.map(p => (
            <div 
              key={p.id}
              onClick={() => handleSelect(p)}
              className={`group cursor-pointer p-4 rounded-2xl border transition-all duration-300 ${
                selectedProjectId === p.id 
                  ? 'bg-indigo-500/10 border-indigo-500/40 shadow-xl shadow-indigo-500/5 ring-1 ring-indigo-500/20' 
                  : 'bg-white/[0.03] border-white/5 hover:bg-white/[0.06] hover:border-white/10'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex flex-col gap-0.5">
                  <span className={`text-sm font-bold truncate max-w-[200px] ${selectedProjectId === p.id ? 'text-indigo-300' : 'text-white'}`}>
                    {p.name}
                  </span>
                  <span className="text-[10px] font-mono opacity-50">{p.code}</span>
                </div>
                <button className={`p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity ${selectedProjectId === p.id ? 'bg-indigo-500 text-white opacity-100' : 'bg-white/10 text-white/60'}`}>
                  <Edit2 size={12} />
                </button>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-black/40 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)] transition-all duration-1000" 
                    style={{ width: `${p.progress}%` }}
                  />
                </div>
                <span className="text-[10px] font-bold text-white/60">{p.progress}%</span>
              </div>
            </div>
          ))}

          {initialProjects.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 bg-white/[0.02] border border-dashed border-white/10 rounded-3xl">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                <Plus size={24} className="text-white/20" />
              </div>
              <p className="text-sm font-bold text-white/20">No active initiatives found</p>
            </div>
          )}
        </div>
      </div>

      {/* DETAIL WORKSPACE */}
      {selectedProject ? (
        <ProjectDetail 
          key={selectedProject.id}
          project={selectedProject} 
          teams={teams}
          onUpdate={() => {
            // refresh happens via revalidatePath, 
            // the prop initialProjects will change.
          }}
        />
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-20 bg-white/[0.02] border border-white/5 rounded-[2.5rem] border-dashed">
          <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 animate-pulse">
            <ChevronRight size={40} className="text-white/10" />
          </div>
          <h3 className="text-xl font-black text-white/20 uppercase tracking-widest">Select an Initiative</h3>
          <p className="text-white/10 text-sm mt-2">Initialize the detail workbench by choosing a project from the inventory.</p>
        </div>
      )}
    </div>
  );
}
