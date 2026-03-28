"use client";

import { useState, useTransition, useMemo, useEffect } from "react";
import { upsertAllocation } from "@/lib/actions";
import { 
  Save, 
  AlertCircle, 
  Loader2,
  CalendarDays,
  CheckCircle2
} from "lucide-react";

interface Project {
  id: string;
  name: string;
  code: string;
}

interface Period {
  id: string;
  label: string;
}

interface Allocation {
  projectId: string;
  periodId: string;
  plannedHours: number;
}

export default function PlanningGrid({
  teamId,
  initialProjects,
  initialPeriods,
  initialAllocations,
}: {
  teamId: string;
  initialProjects: any[];
  initialPeriods: any[];
  initialAllocations: any[];
}) {
  const [isPending, startTransition] = useTransition();
  const [allocations, setAllocations] = useState<Record<string, number>>(
    initialAllocations.reduce((acc, curr) => ({
      ...acc,
      [`${curr.projectId}-${curr.periodId}`]: curr.plannedHours
    }), {})
  );

  const [savingStatus, setSavingStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const handleUpdate = (projectId: string, periodId: string, value: string) => {
    const val = parseFloat(value) || 0;
    const key = `${projectId}-${periodId}`;
    
    setAllocations(prev => ({ ...prev, [key]: val }));
    setSavingStatus('saving');

    startTransition(async () => {
      try {
        await upsertAllocation({
          teamId,
          projectId,
          periodId,
          plannedHours: val,
        });
        setSavingStatus('saved');
        setTimeout(() => setSavingStatus('idle'), 2000);
      } catch (e) {
        setSavingStatus('error');
      }
    });
  };

  // Horizontal totals (Project Total)
  const projectTotals = useMemo(() => {
    const totals: Record<string, number> = {};
    initialProjects.forEach(prj => {
      totals[prj.id] = initialPeriods.reduce((acc, per) => 
        acc + (allocations[`${prj.id}-${per.id}`] || 0), 0
      );
    });
    return totals;
  }, [allocations, initialProjects, initialPeriods]);

  // Vertical totals (Period Total - Team Capacity Used)
  const periodTotals = useMemo(() => {
    const totals: Record<string, number> = {};
    initialPeriods.forEach(per => {
      totals[per.id] = initialProjects.reduce((acc, prj) => 
        acc + (allocations[`${prj.id}-${per.id}`] || 0), 0
      );
    });
    return totals;
  }, [allocations, initialProjects, initialPeriods]);

  if (initialPeriods.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
        <CalendarDays size={48} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
        <p>No budgeting periods found. Generate them above to start planning.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
          Capacity Allocation
          {savingStatus === 'saving' && <Loader2 size={14} className="animate-spin text-indigo-400" />}
          {savingStatus === 'saved' && <CheckCircle2 size={14} className="text-green-500" />}
          {savingStatus === 'error' && <AlertCircle size={14} className="text-red-500" />}
        </h3>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          Changes are auto-saved in real-time.
        </div>
      </div>

      <div style={{ overflowX: 'auto', borderRadius: '0.5rem', border: '1px solid var(--card-border)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', borderSpacing: 0 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--card-border)', background: 'rgba(255,255,255,0.02)' }}>
              <th style={{ padding: '1rem', textAlign: 'left', minWidth: '200px', position: 'sticky', left: 0, background: 'var(--bg-primary)', zIndex: 10 }}>Project Name</th>
              {initialPeriods.map(p => (
                <th key={p.id} style={{ padding: '1rem', minWidth: '100px', textAlign: 'center', borderLeft: '1px solid var(--card-border)' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>{p.label.split(' ')[0]}</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 400 }}>{p.label.split(' ')[1]}</div>
                </th>
              ))}
              <th style={{ padding: '1rem', minWidth: '120px', textAlign: 'center', borderLeft: '2px solid var(--card-border)', background: 'rgba(255,255,255,0.03)' }}>Project Total</th>
            </tr>
          </thead>
          <tbody>
            {initialProjects.map(prj => (
              <tr key={prj.id} style={{ borderBottom: '1px solid var(--card-border)', transition: 'background 0.2s' }} className="hover:bg-white/[0.02]">
                <td style={{ padding: '0.75rem 1rem', position: 'sticky', left: 0, background: 'var(--bg-primary)', zIndex: 10 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{prj.name}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{prj.code}</div>
                </td>
                {initialPeriods.map(per => {
                  const key = `${prj.id}-${per.id}`;
                  const val = allocations[key] || "";
                  return (
                    <td key={per.id} style={{ padding: 0, borderLeft: '1px solid var(--card-border)' }}>
                      <input 
                        type="number"
                        value={val}
                        placeholder="0"
                        onChange={(e) => handleUpdate(prj.id, per.id, e.target.value)}
                        style={{
                          width: '100%',
                          height: '100%',
                          padding: '1rem 0.5rem',
                          textAlign: 'center',
                          border: 'none',
                          background: 'transparent',
                          color: val ? 'white' : 'rgba(255,255,255,0.2)',
                          fontSize: '0.9rem',
                          fontWeight: val ? 600 : 400,
                          transition: 'background 0.2s'
                        }}
                      />
                    </td>
                  );
                })}
                <td style={{ textAlign: 'center', fontWeight: 800, borderLeft: '2px solid var(--card-border)', background: 'rgba(255,255,255,0.03)' }}>
                  {projectTotals[prj.id] || 0}h
                </td>
              </tr>
            ))}
            {/* Totals Row */}
            <tr style={{ background: 'rgba(99, 102, 241, 0.1)', fontWeight: 800 }}>
              <td style={{ padding: '1rem', textAlign: 'right', position: 'sticky', left: 0, background: 'var(--bg-primary)', zIndex: 10, borderTop: '2px solid var(--card-border)' }}>Period Capacity:</td>
              {initialPeriods.map(per => (
                <td key={per.id} style={{ textAlign: 'center', padding: '1rem', borderTop: '2px solid var(--card-border)', borderLeft: '1px solid var(--card-border)' }}>
                  {periodTotals[per.id] || 0}h
                </td>
              ))}
              <td style={{ textAlign: 'center', padding: '1rem', borderTop: '2px solid var(--card-border)', borderLeft: '2px solid var(--card-border)', background: 'rgba(99, 102, 241, 0.2)' }}>
                {Object.values(projectTotals).reduce((a, b) => a + b, 0)}h
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
