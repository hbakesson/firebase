"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Users, 
  Edit2, 
  CheckCircle2, 
  PlayCircle, 
  Briefcase, 
  Save, 
  Trash2, 
  AlertTriangle,
  ChevronRight,
  Plus
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

export default function ProjectManagement({ 
  initialProjects, 
  teams 
}: { 
  initialProjects: Project[]; 
  teams: Team[];
}) {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(initialProjects[0]?.id || null);
  const selectedProject = initialProjects.find(p => p.id === selectedProjectId);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    status: "",
    progress: 0,
    teamIds: [] as string[]
  });

  const [isPending, setIsPending] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Sync selection if projects list changes and current selection is missing
  useEffect(() => {
    if (selectedProjectId && !initialProjects.some(p => p.id === selectedProjectId)) {
      setSelectedProjectId(initialProjects[0]?.id || null);
    }
  }, [initialProjects, selectedProjectId]);

  // Sync form data when selection changes
  useEffect(() => {
    if (selectedProject) {
      setFormData({
        name: selectedProject.name,
        code: selectedProject.code,
        description: selectedProject.description || "",
        status: selectedProject.status,
        progress: selectedProject.progress,
        teamIds: selectedProject.teams?.map(t => t.id) || []
      });
    }
  }, [selectedProjectId, selectedProject]);

  const handleSelect = (p: Project) => {
    setSelectedProjectId(p.id);
    setFormData({
      name: p.name,
      code: p.code,
      description: p.description || "",
      status: p.status,
      progress: p.progress,
      teamIds: p.teams?.map(t => t.id) || []
    });
    setShowDeleteConfirm(false);
  };

  const handleSave = async () => {
    if (!selectedProjectId) return;
    setIsPending(true);
    const result = await updateProject(selectedProjectId, formData);
    setIsPending(false);
    
    if (result?.error) {
      alert(`System Conflict: ${result.error}`);
    } else {
      alert("Project architecture synchronized.");
    }
  };

  const handleDelete = async () => {
    if (!selectedProjectId) return;
    setIsPending(true);
    const result = await deleteProject(selectedProjectId);
    setIsPending(false);
    
    if (result?.error) {
      alert(`Purge Interrupted: ${result.error}`);
    } else {
      alert("Project decommissioned successfully.");
      setSelectedProjectId(initialProjects.find(p => p.id !== selectedProjectId)?.id || null);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 mt-4">
      {/* ─── Column 1: MASTER LIST ────────────────────────────────────────── */}
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
        </div>
      </div>

      {/* ─── Column 2: MAIN DETAIL/EDIT VIEW ─────────────────────────────── */}
      <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 shadow-2xl flex flex-col gap-10 min-h-[800px]">
        {!selectedProject ? (
          <div className="flex flex-col items-center justify-center flex-1 text-white/20 gap-6">
            <div className="p-8 rounded-full bg-white/[0.02] border border-white/5">
              <Briefcase size={64} className="opacity-10" />
            </div>
            <p className="text-lg font-medium tracking-tight">Select an initiative to begin management</p>
          </div>
        ) : (
          <>
            {/* Header Section with Graphic */}
            <div className="relative h-[300px] rounded-3xl overflow-hidden border border-white/10 shadow-3xl group">
              <Image 
                src="/Users/hbakesson/.gemini/antigravity/brain/eb76f46a-8eb0-4f3b-907d-43ad92740783/modern_project_dashboard_graphics_1775678772185.png"
                alt="Project Illustration"
                fill
                className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                 <div className="flex items-end justify-between gap-4">
                    <div className="space-y-2">
                       <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">Initiative Detail</span>
                       <h2 className="text-4xl font-black tracking-tighter text-white">{formData.name}</h2>
                       <div className="flex items-center gap-3 text-white/40 font-medium text-xs">
                         <span className="font-mono">{formData.code}</span>
                         <span className="w-1 h-1 rounded-full bg-white/20" />
                         <span>Updated {formatDate(selectedProject.updatedAt)}</span>
                       </div>
                    </div>
                    <div className="flex items-center gap-3 bg-black/60 backdrop-blur-xl px-5 py-2.5 rounded-2xl border border-white/10 shadow-2xl">
                       <div className={`w-2.5 h-2.5 rounded-full shadow-[0_0_10px_currentColor] animate-pulse ${formData.status === 'ACTIVE' ? 'text-green-500 bg-green-500' : 'text-amber-500 bg-amber-500'}`} />
                       <span className="text-xs font-black uppercase tracking-widest text-white">{formData.status}</span>
                    </div>
                 </div>
              </div>
            </div>

            {/* Editing Form Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.1em] ml-1">Core Identity</label>
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
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                teamIds: isSelected 
                                  ? prev.teamIds.filter(id => id !== t.id)
                                  : [...prev.teamIds, t.id]
                              }))
                            }}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                              isSelected 
                                ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300 shadow-lg shadow-indigo-500/10' 
                                : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10'
                            }`}
                          >
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
                    className="w-full h-[180px] p-5 bg-white/[0.03] rounded-2xl border border-white/10 text-white outline-none focus:border-indigo-500 transition-all resize-none text-sm leading-relaxed"
                    value={formData.description}
                    onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe the technical scope and strategic value..."
                  />
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between pt-8 border-t border-white/5 mt-auto">
              {!showDeleteConfirm ? (
                <button 
                  onClick={() => setShowDeleteConfirm(true)} 
                  disabled={!selectedProjectId}
                  className="flex items-center gap-2.5 px-6 py-3.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-500 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95"
                >
                  <Trash2 size={16} /> Delete Initiative
                </button>
              ) : (
                <div className="flex items-center gap-3 p-2 bg-red-500/10 border border-red-500/20 rounded-2xl">
                  <div className="flex items-center gap-2 px-3 text-red-400">
                    <AlertTriangle size={16} />
                    <span className="text-[10px] font-black uppercase tracking-tight">System Purge?</span>
                  </div>
                  <button 
                    onClick={handleDelete}
                    disabled={isPending}
                    className="px-6 py-2 bg-red-600 text-white text-xs font-black rounded-xl hover:bg-red-500 transition-all"
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
                  onClick={() => handleSelect(selectedProject)}
                  className="px-8 py-3.5 bg-white/5 border border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest text-white/60 hover:bg-white/10 transition-all"
                >
                  Discard
                </button>
                <button 
                  onClick={handleSave} 
                  disabled={isPending || !selectedProjectId}
                  className="flex items-center gap-3 px-10 py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:grayscale rounded-2xl font-black text-xs uppercase tracking-[0.1em] text-white transition-all shadow-2xl shadow-indigo-600/40 active:scale-[0.98]"
                >
                  {isPending ? "Syncing..." : <>Save Evolution <Save size={18} /></>}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
