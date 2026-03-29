"use client";

import { useState, useTransition } from "react";
import { Lock, Unlock, ShieldCheck } from "lucide-react";
import { togglePeriodLock } from "@/lib/actions";

interface Period {
  id: string;
  label: string;
  isLocked: boolean;
}

export default function PeriodLockToggle({ period }: { period: Period }) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      await togglePeriodLock(period.id, !period.isLocked);
    });
  };

  return (
    <div key={period.id} style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      padding: '0.75rem 1rem',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '0.5rem',
      border: '1px solid var(--card-border)',
      marginBottom: '0.5rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {period.isLocked ? <Lock size={16} className="text-red-400" /> : <Unlock size={16} className="text-green-400" />}
        <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{period.label}</span>
      </div>
      
      <button 
        onClick={handleToggle}
        disabled={isPending}
        className={`btn-sm ${period.isLocked ? 'secondary' : 'bg-indigo-600 text-white'}`}
        style={{ fontSize: '0.7rem' }}
      >
        {isPending ? "Updating..." : (period.isLocked ? "Unlock Period" : "Lock Period")}
      </button>
    </div>
  );
}
