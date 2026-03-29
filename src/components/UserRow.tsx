"use client";

import { useState, useTransition } from "react";
import { Mail, CheckCircle2, Trash2, ShieldAlert } from "lucide-react";
import { updateUserRole, removeUser } from "@/lib/actions";

interface User {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
}

export default function UserRow({ user, currentUserId }: { user: User; currentUserId: string }) {
  const [isPending, startTransition] = useTransition();
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRoleChange = (newRole: string) => {
    startTransition(async () => {
      await updateUserRole(user.id, newRole);
    });
  };

  const handleRemove = () => {
    startTransition(async () => {
      await removeUser(user.id);
      setIsRemoving(false);
    });
  };

  const isSelf = user.id === currentUserId;

  return (
    <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
      <td>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ 
            width: '32px', 
            height: '32px', 
            borderRadius: '50%', 
            background: 'linear-gradient(45deg, #6366f1, #c084fc)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.8rem',
            fontWeight: 700,
            color: 'white'
          }}>
            {user.name?.[0] || user.email?.[0].toUpperCase()}
          </div>
          <span style={{ fontWeight: 600 }}>{user.name || "Unnamed User"} {isSelf && "(You)"}</span>
        </div>
      </td>
      <td>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
          <Mail size={14} />
          {user.email}
        </div>
      </td>
      <td>
        <select 
          value={user.role} 
          onChange={(e) => handleRoleChange(e.target.value)}
          disabled={isPending || isSelf}
          className={`role-tag role-${user.role === 'admin' ? 'admin' : 'staff'}`}
          style={{ 
            border: 'none', 
            cursor: isSelf ? 'not-allowed' : 'pointer',
            padding: '2px 8px',
            fontSize: '0.75rem',
            background: 'transparent'
          }}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </td>
      <td>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success)', fontSize: '0.875rem' }}>
          <CheckCircle2 size={14} />
          Active
        </div>
      </td>
      <td style={{ textAlign: 'right' }}>
        {!isRemoving ? (
          <button 
            onClick={() => setIsRemoving(true)}
            className="secondary btn-sm" 
            style={{ color: '#ef4444' }}
            disabled={isSelf}
          >
            <Trash2 size={16} />
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', alignItems: 'center' }}>
            <ShieldAlert size={14} className="text-red-500" />
            <button onClick={handleRemove} className="btn-sm bg-red-600 text-white" disabled={isPending}>Confirm</button>
            <button onClick={() => setIsRemoving(false)} className="btn-sm secondary">Cancel</button>
          </div>
        )}
      </td>
    </tr>
  );
}
