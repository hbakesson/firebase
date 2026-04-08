"use client";

import { useState } from "react";
import { Plus, AlertCircle } from "lucide-react";
import { createProject } from "@/lib/actions";

interface Team {
  id: string;
  name: string;
}

export default function CreateProjectForm({ teams }: { teams: Team[] }) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    setError(null);
    
    try {
      const name = formData.get("name") as string;
      const code = formData.get("code") as string;
      const teamId = formData.get("teamId") as string;
      const teamIds = teamId ? [teamId] : undefined;
      const description = formData.get("description") as string;

      const result = await createProject({ name, code, teamIds, description });
      
      if (result?.error) {
        setError(result.error);
      } else {
        // Form will be reset naturally on revalidation or we can clear it
        (document.getElementById("create-project-form") as HTMLFormElement)?.reset();
      }
    } catch (err: any) {
      setError("Critical system failure. Connectivity disrupted.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="space-y-4">
      <form id="create-project-form" action={handleSubmit}>
        <div className="card" style={{ 
          padding: '0.75rem 1rem', 
          display: 'flex', 
          gap: '0.75rem', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          margin: 0, 
          background: 'rgba(99, 102, 241, 0.05)', 
          borderColor: 'rgba(99, 102, 241, 0.2)',
          borderRadius: '1.25rem'
        }}>
          <div style={{ display: 'flex', gap: '0.75rem', flex: 1 }}>
            <input 
              name="name" 
              placeholder="Project Name" 
              className="px-4 py-2 bg-black/20 border border-white/10 rounded-xl text-sm focus:border-indigo-500/50 transition-all outline-none" 
              required 
              style={{ flex: 2 }} 
            />
            <input 
              name="code" 
              placeholder="Code (e.g. PRJ001)" 
              className="px-4 py-2 bg-black/20 border border-white/10 rounded-xl text-sm focus:border-indigo-500/50 transition-all outline-none" 
              required 
              style={{ flex: 1 }} 
            />
            <select 
              name="teamId" 
              className="px-4 py-2 bg-black/20 border border-white/10 rounded-xl text-sm focus:border-indigo-500/50 transition-all outline-none"
              style={{ minWidth: '150px' }}
            >
              <option value="">No Team Assigned</option>
              {teams.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>
          <button 
            type="submit" 
            disabled={isPending}
            className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:scale-[0.98]"
          >
            {isPending ? (
              <span className="flex items-center gap-2">Initiating...</span>
            ) : (
              <><Plus size={16} /> Create Project</>
            )}
          </button>
        </div>
      </form>
      
      {error && (
        <div className="flex items-center gap-3 px-4 py-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs font-bold animate-in fade-in slide-in-from-top-2">
          <AlertCircle size={16} />
          {error}
        </div>
      )}
    </div>
  );
}
