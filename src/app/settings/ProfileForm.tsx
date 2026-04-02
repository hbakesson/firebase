"use client";

import { useTransition, useState } from "react";
import { updateMyProfile } from "@/lib/actions";
import { Save, CheckCircle, AlertCircle } from "lucide-react";

export default function ProfileForm({ initialName, email }: { initialName: string; email: string }) {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<{ type: "success" | "error" | null, message?: string }>({ type: null });

  function handleSubmit(formData: FormData) {
    setStatus({ type: null });
    startTransition(async () => {
      try {
        const result = await updateMyProfile(formData);
        if (result?.error) {
          setStatus({ type: "error", message: result.error });
        } else {
          setStatus({ type: "success", message: "Profile updated successfully" });
          setTimeout(() => setStatus({ type: null }), 3000);
        }
      } catch {
        setStatus({ type: "error", message: "Failed to update profile" });
      }
    });
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      
      {status.type === "success" && (
        <div style={{ padding: '0.75rem', borderRadius: '8px', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', color: '#4ade80', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
          <CheckCircle size={16} />
          {status.message}
        </div>
      )}
      {status.type === "error" && (
        <div style={{ padding: '0.75rem', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#f87171', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
          <AlertCircle size={16} />
          {status.message}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          defaultValue={initialName} 
          required 
          disabled={isPending}
          className="w-full"
          style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface-sunken)', color: 'var(--text-main)' }}
        />
      </div>
      <div className="form-group">
        <label>Email Address</label>
        <input 
          type="email" 
          value={email} 
          disabled 
          title="Email cannot be changed"
          className="w-full"
          style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface-sunken)', color: 'var(--text-main)', opacity: 0.6 }} 
        />
      </div>
      
      <div style={{ paddingTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
        <button 
          type="submit" 
          className="btn-primary" 
          disabled={isPending}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Save size={16} />
          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
