"use client";

import { useState } from "react";
import { UserPlus, X, Mail, Shield } from "lucide-react";

export default function InviteUserModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");

  if (!isOpen) {
    return (
      <button className="primary" onClick={() => setIsOpen(true)}>
        <UserPlus size={18} />
        Invite New User
      </button>
    );
  }

  return (
    <>
      <button className="primary" onClick={() => setIsOpen(true)}>
        <UserPlus size={18} />
        Invite New User
      </button>

      <div className="modal-overlay" style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: '1rem'
      }}>
        <div className="card" style={{ maxWidth: '450px', width: '100%', position: 'relative' }}>
          <button 
            onClick={() => setIsOpen(false)}
            style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', border: 'none', color: 'var(--text-muted)' }}
          >
            <X size={20} />
          </button>

          <h2 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <UserPlus className="text-primary" />
            Invite Teammate
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
            Send an invitation email to join your organization.
          </p>

          <form className="login-form" onSubmit={(e) => { e.preventDefault(); alert('Invitation sent (Mock)'); setIsOpen(false); }}>
            <div className="form-group">
              <label>Email Address</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com" 
                  required 
                  style={{ width: '100%', paddingLeft: '2.5rem' }}
                />
                <Mail size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              </div>
            </div>

            <div className="form-group">
              <label>Assign Role</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <button 
                  type="button"
                  className={role === 'user' ? 'primary btn-sm' : 'secondary btn-sm'}
                  onClick={() => setRole('user')}
                  style={{ justifyContent: 'center' }}
                >
                  User
                </button>
                <button 
                  type="button"
                  className={role === 'admin' ? 'primary btn-sm' : 'secondary btn-sm'}
                  onClick={() => setRole('admin')}
                  style={{ justifyContent: 'center' }}
                >
                  Admin
                </button>
              </div>
            </div>

            <div style={{ 
              marginTop: '1rem', 
              padding: '1rem', 
              background: 'rgba(99, 102, 241, 0.05)', 
              borderRadius: '0.5rem',
              display: 'flex',
              gap: '0.75rem',
              border: '1px solid rgba(99, 102, 241, 0.1)'
            }}>
              <Shield size={20} style={{ color: 'var(--primary)', flexShrink: 0 }} />
              <div style={{ fontSize: '0.75rem' }}>
                <strong>Role Permissions</strong>
                <p style={{ color: 'var(--text-muted)' }}>
                  {role === 'admin' 
                    ? "Admins can manage organization settings, billing, and all users." 
                    : "Users can manage projects, teams, and view all reports."}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button type="button" className="secondary" style={{ flex: 1 }} onClick={() => setIsOpen(false)}>
                Cancel
              </button>
              <button type="submit" className="primary" style={{ flex: 2 }}>
                Send Invitation
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
