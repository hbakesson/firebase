"use client";

import { useState } from "react";
import {
  Users,
  Save,
  Trash2,
  AlertTriangle,
  Plus,
  FolderOpen,
  CheckCircle,
  Clock,
  Archive,
  Circle,
} from "lucide-react";
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

const STATUS_CONFIG: Record<string, { label: string; icon: React.ReactNode; color: string; bg: string }> = {
  PLANNED:   { label: "Planned",   icon: <Clock size={13} />,       color: "text-amber-400",  bg: "bg-amber-400/10 border-amber-400/30" },
  ACTIVE:    { label: "Active",    icon: <Circle size={13} className="fill-current" />, color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/30" },
  COMPLETED: { label: "Completed", icon: <CheckCircle size={13} />, color: "text-blue-400",   bg: "bg-blue-400/10 border-blue-400/30" },
  ARCHIVED:  { label: "Archived",  icon: <Archive size={13} />,     color: "text-white/30",   bg: "bg-white/5 border-white/10" },
};

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.PLANNED;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${cfg.bg} ${cfg.color}`}>
      {cfg.icon} {cfg.label}
    </span>
  );
}

// ─── Detail Panel ────────────────────────────────────────────────────────────

function ProjectDetail({
  project,
  teams,
}: {
  project: Project;
  teams: Team[];
}) {
  const [formData, setFormData] = useState({
    name: project.name,
    code: project.code,
    description: project.description || "",
    status: project.status,
    progress: project.progress,
    teamIds: project.teams?.map((t) => t.id) || [],
  });

  const [isPending, setIsPending] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const handleSave = async () => {
    setIsPending(true);
    setFeedback(null);
    const result = await updateProject(project.id, formData);
    setIsPending(false);
    if (result?.error) {
      setFeedback({ type: "error", msg: result.error });
    } else {
      setFeedback({ type: "success", msg: "Changes saved." });
    }
  };

  const handleDelete = async () => {
    setIsPending(true);
    const result = await deleteProject(project.id);
    setIsPending(false);
    if (result?.error) {
      setFeedback({ type: "error", msg: result.error });
      setShowDeleteConfirm(false);
    }
    // On success, page will revalidate and project will disappear from list
  };

  const toggleTeam = (teamId: string) => {
    setFormData((prev) => ({
      ...prev,
      teamIds: prev.teamIds.includes(teamId)
        ? prev.teamIds.filter((id) => id !== teamId)
        : [...prev.teamIds, teamId],
    }));
  };

  const isDirty =
    formData.name !== project.name ||
    formData.code !== project.code ||
    formData.description !== (project.description || "") ||
    formData.status !== project.status ||
    formData.progress !== project.progress ||
    JSON.stringify(formData.teamIds.sort()) !== JSON.stringify(project.teams.map((t) => t.id).sort());

  return (
    <div className="flex-1 min-w-0 flex flex-col bg-white/[0.03] border border-white/8 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between px-6 py-5 border-b border-white/8 flex-shrink-0">
        <div>
          <h2 className="text-xl font-bold text-white leading-tight">{project.name}</h2>
          <p className="text-sm text-white/40 mt-0.5 font-mono">{project.code}</p>
        </div>
        <StatusBadge status={project.status} />
      </div>

      {/* Feedback banner */}
      {feedback && (
        <div
          className={`mx-6 mt-4 flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium border ${
            feedback.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
              : "bg-red-500/10 border-red-500/30 text-red-400"
          }`}
        >
          {feedback.type === "success" ? <CheckCircle size={15} /> : <AlertTriangle size={15} />}
          {feedback.msg}
        </div>
      )}

      {/* Form Body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Row 1: Name + Code */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-white/50">Project Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
              className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/20 focus:outline-none focus:border-indigo-500/60 transition-colors"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-white/50">Project Code</label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => setFormData((p) => ({ ...p, code: e.target.value }))}
              className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white font-mono placeholder-white/20 focus:outline-none focus:border-indigo-500/60 transition-colors"
            />
          </div>
        </div>

        {/* Row 2: Status + Progress */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-white/50">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData((p) => ({ ...p, status: e.target.value }))}
              className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500/60 transition-colors cursor-pointer"
            >
              <option value="PLANNED">Planned</option>
              <option value="ACTIVE">Active</option>
              <option value="COMPLETED">Completed</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-white/50">
              Progress — <span className="text-indigo-400 font-semibold">{formData.progress}%</span>
            </label>
            <div className="flex items-center gap-3 px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl">
              <input
                type="range"
                min={0}
                max={100}
                value={formData.progress}
                onChange={(e) => setFormData((p) => ({ ...p, progress: parseInt(e.target.value) }))}
                className="flex-1 accent-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-white/50">Description</label>
          <textarea
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
            placeholder="What is this project about?"
            className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/20 focus:outline-none focus:border-indigo-500/60 transition-colors resize-none"
          />
        </div>

        {/* Teams */}
        {teams.length > 0 && (
          <div className="space-y-2">
            <label className="block text-xs font-medium text-white/50">Assigned Teams</label>
            <div className="flex flex-wrap gap-2">
              {teams.map((t) => {
                const selected = formData.teamIds.includes(t.id);
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => toggleTeam(t.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      selected
                        ? "bg-indigo-500/20 border-indigo-500/50 text-indigo-300"
                        : "bg-white/5 border-white/10 text-white/40 hover:text-white/70 hover:border-white/20"
                    }`}
                  >
                    <Users size={12} />
                    {t.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-white/8 bg-white/[0.02] flex-shrink-0">
        {/* Delete */}
        {!showDeleteConfirm ? (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="flex items-center gap-2 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg text-sm font-medium transition-all"
          >
            <Trash2 size={15} /> Delete
          </button>
        ) : (
          <div className="flex items-center gap-2 px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-xl">
            <AlertTriangle size={14} className="text-red-400" />
            <span className="text-xs text-red-300 font-medium">Delete this project?</span>
            <button
              onClick={handleDelete}
              disabled={isPending}
              className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white text-xs font-semibold rounded-lg transition-all disabled:opacity-50 ml-1"
            >
              {isPending ? "Deleting…" : "Yes, delete"}
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="px-3 py-1 bg-white/10 hover:bg-white/20 text-xs font-medium rounded-lg transition-all"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Save / Discard */}
        <div className="flex items-center gap-2">
          {isDirty && (
            <button
              onClick={() =>
                setFormData({
                  name: project.name,
                  code: project.code,
                  description: project.description || "",
                  status: project.status,
                  progress: project.progress,
                  teamIds: project.teams?.map((t) => t.id) || [],
                })
              }
              className="px-4 py-2 text-sm text-white/40 hover:text-white/70 transition-colors"
            >
              Discard
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={isPending || !isDirty}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-all"
          >
            <Save size={15} />
            {isPending ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function ProjectManagement({
  initialProjects,
  teams,
}: {
  initialProjects: Project[];
  teams: Team[];
}) {
  const [selectedIdState, setSelectedId] = useState<string | null>(
    initialProjects[0]?.id || null
  );

  const selectedId = initialProjects.some((p) => p.id === selectedIdState)
    ? selectedIdState
    : initialProjects[0]?.id || null;

  const selectedProject = initialProjects.find((p) => p.id === selectedId);

  return (
    <div className="flex flex-col lg:flex-row gap-4 mt-2" style={{ height: "calc(100vh - 260px)", minHeight: "600px" }}>
      {/* ── Left: Project List ─────────────────────────────── */}
      <div className="w-full lg:w-72 flex flex-col gap-2 flex-shrink-0 overflow-y-auto pr-1">
        {initialProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 bg-white/[0.02] border border-dashed border-white/10 rounded-2xl text-center px-6">
            <FolderOpen size={28} className="text-white/20 mb-2" />
            <p className="text-sm text-white/30">No projects yet.</p>
            <p className="text-xs text-white/20 mt-1">Use the form above to create one.</p>
          </div>
        ) : (
          initialProjects.map((p) => {
            const isActive = selectedId === p.id;
            const cfg = STATUS_CONFIG[p.status] ?? STATUS_CONFIG.PLANNED;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedId(p.id)}
                className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all ${
                  isActive
                    ? "bg-indigo-500/10 border-indigo-500/40 ring-1 ring-indigo-500/20"
                    : "bg-white/[0.03] border-white/8 hover:bg-white/[0.06] hover:border-white/15"
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className={`text-sm font-semibold leading-snug ${isActive ? "text-indigo-200" : "text-white"}`}>
                    {p.name}
                  </span>
                  <span className={`flex items-center gap-1 text-[11px] font-medium flex-shrink-0 ${cfg.color}`}>
                    {cfg.icon}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full transition-all"
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                  <span className="text-[11px] text-white/40 font-medium w-8 text-right">{p.progress}%</span>
                </div>
                <p className="text-[11px] text-white/30 font-mono mt-1">{p.code}</p>
              </button>
            );
          })
        )}
      </div>

      {/* ── Right: Detail Panel ────────────────────────────── */}
      {selectedProject ? (
        <ProjectDetail
          key={selectedProject.id}
          project={selectedProject}
          teams={teams}
        />
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center bg-white/[0.02] border border-dashed border-white/10 rounded-2xl text-center px-6">
          <FolderOpen size={36} className="text-white/15 mb-3" />
          <p className="text-sm text-white/30 font-medium">Select a project to view details</p>
        </div>
      )}
    </div>
  );
}
