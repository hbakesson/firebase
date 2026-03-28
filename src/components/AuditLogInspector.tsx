"use client";

import { useState } from "react";
import { 
  History, 
  User, 
  Calendar, 
  ArrowRight,
  X
} from "lucide-react";

interface AuditLog {
  id: string;
  action: string;
  entityType: string;
  projectName: string;
  previousValue: string | null;
  newValue: string | null;
  userEmail: string;
  timestamp: Date;
}

export default function AuditLogInspector({ logs }: { logs: AuditLog[] }) {
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  const parseJSON = (str: string | null) => {
    if (!str) return null;
    try {
      return JSON.parse(str);
    } catch {
      return str;
    }
  };

  return (
    <div className="space-y-4">
      {logs.map((log) => (
        <div 
          key={log.id} 
          className="card shadow-glass" 
          style={{ 
            padding: '1rem 1.5rem', 
            cursor: 'pointer',
            borderLeft: `4px solid ${
              log.action === 'CREATE' ? '#4ade80' : 
              log.action === 'DELETE' ? '#ef4444' : '#6366f1'
            }`
          }}
          onClick={() => setSelectedLog(log)}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div className={`role-tag ${
                log.action === 'CREATE' ? 'role-staff' : 
                log.action === 'DELETE' ? 'role-admin' : 'secondary'
              }`} style={{ minWidth: '80px', textAlign: 'center' }}>
                {log.action}
              </div>
              <div>
                <div style={{ fontWeight: 700 }}>{log.projectName}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <User size={12} /> {log.userEmail}
                </div>
              </div>
            </div>
            
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{log.entityType}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'flex-end' }}>
                <Calendar size={12} /> {new Date(log.timestamp).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      ))}

      {selectedLog && (
        <div style={{ 
          position: 'fixed', 
          inset: 0, 
          background: 'rgba(0,0,0,0.8)', 
          backdropFilter: 'blur(8px)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        }}>
          <div className="card shadow-glass" style={{ maxWidth: '800px', width: '100%', maxHeight: '90vh', overflow: 'auto', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <History size={24} className="text-indigo-400" />
                Change Details
              </h3>
              <button onClick={() => setSelectedLog(null)} className="secondary" style={{ padding: '0.5rem' }}>
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div>
                  <h4 style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.5rem' }}>Previous Value</h4>
                  <pre style={{ 
                    background: 'rgba(0,0,0,0.2)', 
                    padding: '1rem', 
                    borderRadius: '0.5rem', 
                    fontSize: '0.8rem', 
                    whiteSpace: 'pre-wrap',
                    minHeight: '200px',
                    border: '1px solid rgba(255,255,255,0.05)'
                  }}>
                    {JSON.stringify(parseJSON(selectedLog.previousValue), null, 2) || "None"}
                  </pre>
                </div>
                <div>
                  <h4 style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.5rem' }}>New Value</h4>
                  <pre style={{ 
                    background: 'rgba(0,0,0,0.2)', 
                    padding: '1rem', 
                    borderRadius: '0.5rem', 
                    fontSize: '0.8rem', 
                    whiteSpace: 'pre-wrap',
                    minHeight: '200px',
                    border: '1px solid rgba(255,255,255,0.05)'
                  }}>
                    {JSON.stringify(parseJSON(selectedLog.newValue), null, 2) || "None"}
                  </pre>
                </div>
              </div>

              <div className="card shadow-glass" style={{ padding: '1rem', background: 'rgba(99, 102, 241, 0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Action:</span>
                  <span style={{ fontWeight: 700 }}>{selectedLog.action}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Timestamp:</span>
                  <span>{new Date(selectedLog.timestamp).toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Authorized By:</span>
                  <span style={{ fontWeight: 600 }}>{selectedLog.userEmail}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
