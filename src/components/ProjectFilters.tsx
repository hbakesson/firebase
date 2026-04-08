"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, X, Filter } from "lucide-react";

interface Team {
  id: string;
  name: string;
}

export default function ProjectFilters({ teams }: { teams: Team[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const q = searchParams.get("q") || "";
  const teamId = searchParams.get("team") || "";
  const status = searchParams.get("status") || "";

  const updateFilters = (newFilters: { q?: string; team?: string; status?: string }) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (newFilters.q !== undefined) {
      if (newFilters.q) params.set("q", newFilters.q);
      else params.delete("q");
    }
    
    if (newFilters.team !== undefined) {
      if (newFilters.team) params.set("team", newFilters.team);
      else params.delete("team");
    }
    
    if (newFilters.status !== undefined) {
      if (newFilters.status) params.set("status", newFilters.status);
      else params.delete("status");
    }
    
    router.push(`/projects?${params.toString()}`);
  };

  const showAll = () => {
    router.push("/projects");
  };

  const hasFilters = q || teamId || status;

  return (
    <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-white/5 rounded-xl border border-white/10 shadow-glass">
      <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-widest">
        <Filter size={14} />
        Filters
      </div>

      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={16} />
        <input
          type="text"
          placeholder="Search by name or code..."
          value={q}
          onChange={(e) => updateFilters({ q: e.target.value })}
          className="w-full pl-10 pr-4 py-2 bg-black/20 border border-white/10 rounded-lg text-sm focus:border-indigo-500/50 outline-none transition-all"
        />
      </div>

      <select
        value={teamId}
        onChange={(e) => updateFilters({ team: e.target.value })}
        className="px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-sm focus:border-indigo-500/50 outline-none transition-all appearance-none cursor-pointer min-w-[150px]"
        style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%236366f1%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem top 50%', backgroundSize: '0.65rem auto', paddingRight: '2.5rem' }}
      >
        <option value="">All Teams</option>
        {teams.map(t => (
          <option key={t.id} value={t.id}>{t.name}</option>
        ))}
      </select>

      <select
        value={status}
        onChange={(e) => updateFilters({ status: e.target.value })}
        className="px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-sm focus:border-indigo-500/50 outline-none transition-all appearance-none cursor-pointer min-w-[130px]"
        style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%236366f1%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem top 50%', backgroundSize: '0.65rem auto', paddingRight: '2.5rem' }}
      >
        <option value="">All Statuses</option>
        <option value="ACTIVE">Active</option>
        <option value="PLANNED">Planned</option>
        <option value="COMPLETED">Completed</option>
        <option value="ARCHIVED">Archived</option>
      </select>

      {hasFilters && (
        <button
          onClick={showAll}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg shadow-lg hover:shadow-indigo-500/20 active:scale-95 transition-all"
        >
          <X size={16} />
          Show All
        </button>
      )}
    </div>
  );
}
