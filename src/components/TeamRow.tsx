"use client";

import { useState, useTransition } from "react";
import { ChevronRight, Edit2, CheckCircle2, X } from "lucide-react";
import { updateTeam, deleteTeam } from "@/lib/actions";

interface Team {
  id: string;
  name: string;
  code: string;
  isActive: boolean;
  parentTeamId?: string | null;
  parentTeam?: { id: string; name: string } | null;
}

export default function TeamRow({ team, parentOptions }: { team: Team; parentOptions: { id: string; name: string }[] }) {
  const [isPending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(team.name);
  const [editParentId, setEditParentId] = useState(team.parentTeamId || "");

  const handleUpdate = () => {
    startTransition(async () => {
      await updateTeam(team.id, { 
        name: editName, 
        parentTeamId: editParentId === "" ? undefined : editParentId 
      });
      setIsEditing(false);
    });
  };

  const handleToggleStatus = () => {
    startTransition(async () => {
      await updateTeam(team.id, { isActive: !team.isActive });
    });
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete ${team.name}?`)) {
      startTransition(async () => {
        await deleteTeam(team.id);
      });
    }
  };

  return (
    <tr key={team.id} style={{ borderBottom: '1px solid var(--card-border)', transition: 'background 0.2s' }} className="hover:bg-white/[0.02]">
      <td style={{ padding: '1.25rem' }}>
        {isEditing ? (
          <input 
            value={editName} 
            onChange={(e) => setEditName(e.target.value)}
            className="btn-sm" 
            style={{ width: '100%', background: 'rgba(255,255,255,0.05)' }}
          />
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: team.isActive ? '#4ade80' : '#94a3b8' }} />
            <span style={{ fontWeight: 600 }}>{team.name}</span>
          </div>
        )}
      </td>
      <td><code className="sku">{team.code}</code></td>
      <td>
        {isEditing ? (
          <select 
            value={editParentId} 
            onChange={(e) => setEditParentId(e.target.value)}
            className="btn-sm"
            style={{ width: '100%', background: 'rgba(255,255,255,0.05)' }}
          >
            <option value="">No Parent (Root)</option>
            {parentOptions.filter(opt => opt.id !== team.id).map(opt => (
              <option key={opt.id} value={opt.id}>{opt.name}</option>
            ))}
          </select>
        ) : (
          team.parentTeam ? (
            <span className="user-badge" style={{ fontSize: '0.8rem' }}>
              {team.parentTeam.name} <ChevronRight size={12} /> {team.name}
            </span>
          ) : (
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Root Level</span>
          )
        )}
      </td>
      <td>
        <span className={`role-tag ${team.isActive ? 'role-admin' : 'role-staff'}`}>
          {team.isActive ? "Active" : "Inactive"}
        </span>
      </td>
      <td style={{ textAlign: 'right', paddingRight: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
          {isEditing ? (
            <>
              <button onClick={handleUpdate} disabled={isPending} className="btn-sm" style={{ background: 'var(--success)', color: 'white' }}>
                <CheckCircle2 size={16} />
              </button>
              <button onClick={() => setIsEditing(false)} className="secondary btn-sm">
                <X size={16} />
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setIsEditing(true)} className="secondary btn-sm" title="Edit Structure">
                <Edit2 size={16} />
              </button>
              <button onClick={handleToggleStatus} disabled={isPending} className="secondary btn-sm">
                {team.isActive ? "Deactivate" : "Activate"}
              </button>
              <button onClick={handleDelete} className="secondary btn-sm" style={{ color: '#ef4444' }}>
                Delete
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}
