'use client';

import React, { useMemo, useState, useTransition } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  CellContext,
  RowData,
} from '@tanstack/react-table';
import { upsertAllocation } from '@/lib/actions';
import { Project, Period, Allocation } from '@/lib/mockData';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

interface BulkProject {
  id: string;
  name: string;
  code: string;
  teams?: { id: string; name: string }[];
}

// --- Specialized Compact Editable Cell (MEMOIZED) ---
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CompactEditableCell = React.memo(({ getValue, row, column, table }: CellContext<BulkProject, number>) => {
  const initialValue = getValue() as number;
  const [value, setValue] = useState<string | number>(initialValue);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isDisabled = (column.columnDef as any).meta?.isLocked;

  // Sync internal value if global state changes externally (e.g. from total recalculation or Undo)
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = () => {
    if (value !== initialValue) {
      table.options.meta?.updateData(row.index, column.id, value);
    }
  };

  return (
    <input
      value={value}
      onChange={e => setValue(e.target.value)}
      onBlur={onBlur}
      disabled={isDisabled}
      type="number"
      step="0.5"
      min="0"
      style={{
        width: '100%',
        background: isDisabled ? 'rgba(255,255,255,0.02)' : 'transparent',
        border: 'none',
        color: isDisabled ? 'var(--text-muted)' : 'var(--text-main)',
        fontSize: '0.7rem',
        textAlign: 'center',
        padding: '0.2rem',
        outline: 'none',
        borderRadius: '2px',
        transition: 'background 0.2s',
        cursor: isDisabled ? 'not-allowed' : 'text',
      }}
      className={isDisabled ? "" : "hover:bg-white/5 focus:bg-white/10"}
    />
  );
});

CompactEditableCell.displayName = "CompactEditableCell";

interface BulkPlanningGridProps {
  initialProjects: Project[];
  initialAllocations: Allocation[];
  initialPeriods: Period[];
  initialTeams: { id: string; name: string }[];
}

export function BulkPlanningGrid({ initialProjects, initialAllocations, initialPeriods, initialTeams }: BulkPlanningGridProps) {
  const [search, setSearch] = useState('');
  const [selectedTeamId, setSelectedTeamId] = useState<string>('all');
  const [, startTransition] = useTransition();
  const [allocations, setAllocations] = useState<Record<string, number>>(() => 
    initialAllocations.reduce((acc, curr) => ({
      ...acc,
      [`${curr.projectId}-${curr.periodId}-${curr.teamId}`]: curr.plannedHours
    }), {})
  );

  const [savingStatus, setSavingStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  // --- Filtered Data ---
  const filteredData = useMemo(() => {
    let result = initialProjects;
    
    if (selectedTeamId !== 'all') {
      result = result.filter(p => p.teams?.some(t => t.id === selectedTeamId));
    }
    
    if (search) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) || 
        p.code.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    return result;
  }, [initialProjects, search, selectedTeamId]);

  // --- Column Definitions ---
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns = useMemo<ColumnDef<BulkProject, any>[]>(() => [
    {
      id: "project",
      header: "Project",
      accessorFn: (row) => row,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ getValue }: CellContext<BulkProject, any>) => {
        const prj = getValue() as BulkProject;
        return (
          <div style={{ padding: '0.25rem 0.5rem', minWidth: '180px' }}>
            <div style={{ fontWeight: 600, fontSize: '0.75rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {prj.name}
            </div>
            <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>{prj.code}</div>
          </div>
        );
      },
      size: 200,
    },
    ...initialPeriods.map(per => ({
      id: per.id,
      header: () => (
        <div style={{ textAlign: 'center', lineHeight: 1.1, position: 'relative' }}>
          {per.isLocked && (
            <div style={{ position: 'absolute', top: '-8px', right: '-4px', fontSize: '0.6rem', color: '#f59e0b' }}>🔒</div>
          )}
          <div style={{ fontSize: '0.65rem', fontWeight: 700 }}>{per.label.split(' (')[0]}</div>
          <div style={{ fontSize: '0.55rem', color: 'var(--text-muted)', fontWeight: 400 }}>{per.label.split(' (')[1]?.replace(')', '')}</div>
        </div>
      ),
      accessorFn: (row: BulkProject) => {
        if (selectedTeamId !== 'all') {
          return allocations[`${row.id}-${per.id}-${selectedTeamId}`] ?? 0;
        }
        // Sum across all teams for this project/period
        return (row.teams || []).reduce((sum, t) => sum + (allocations[`${row.id}-${per.id}-${t.id}`] || 0), 0);
      },
      cell: CompactEditableCell,
      size: 70,
      meta: { isLocked: per.isLocked }
    })),
    {
      id: "total",
      header: "Σ",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: CellContext<BulkProject, any>) => {
        const total = initialPeriods.reduce((acc, per) => {
          if (selectedTeamId !== 'all') {
            return acc + (allocations[`${row.original.id}-${per.id}-${selectedTeamId}`] || 0);
          }
          const prjTeams = row.original.teams || [];
          const projectPeriodSum = prjTeams.reduce((sum, t) => sum + (allocations[`${row.original.id}-${per.id}-${t.id}`] || 0), 0);
          return acc + projectPeriodSum;
        }, 0);
        return (
          <div style={{ textAlign: 'center', fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-light)' }}>
            {total}
          </div>
        );
      },
      size: 60,
    }
  ], [allocations, initialPeriods, selectedTeamId]); // Only recompute columns if allocations change

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id,
    meta: {
      updateData: (rowIndex: number, columnId: string, value: unknown) => {
        const prj = filteredData[rowIndex];
        const val = parseFloat(value as string) || 0;
        const isMultiTeam = prj.teams && prj.teams.length > 1;
        const targetTeamId = selectedTeamId !== "all" 
          ? selectedTeamId 
          : (prj.teams?.[0]?.id || "bulk-global");

        if (selectedTeamId === "all" && isMultiTeam) {
          alert(`Note: This project (${prj.code}) is assigned to multiple teams. Your change will be attributed to ${prj.teams?.[0]?.name}. Select a specific team for precise control.`);
        }
        
        const key = `${prj.id}-${columnId}-${targetTeamId}`;
        setAllocations(prev => ({ ...prev, [key]: val }));
        setSavingStatus('saving');

        startTransition(async () => {
          try {
            await upsertAllocation({
              teamId: selectedTeamId !== "all" ? selectedTeamId : (prj.teams?.[0]?.id || "bulk-global"),
              projectId: prj.id,
              periodId: columnId,
              plannedHours: val,
            });
            setSavingStatus('saved');
            setTimeout(() => setSavingStatus('idle'), 2000);
          } catch {
            setSavingStatus('error');
          }
        });
      }
    }
  });

  return (
    <div className="bg-[#14141e] border border-white/5 rounded-xl overflow-hidden shadow-2xl">
      <div className="py-3 px-2 border-b border-white/5 flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md flex items-center gap-3">
          <div className="flex items-center gap-8">
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Team</span>
            <select
              value={selectedTeamId}
              onChange={e => setSelectedTeamId(e.target.value)}
              className="flex-1 bg-[#e2e8f0] text-[#0f172a] font-medium border-0 rounded-lg px-3 py-1.5 text-xs focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none cursor-pointer"
              style={{ minWidth: '150px', backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23334155%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.7rem top 50%', backgroundSize: '0.65rem auto' }}
            >
              <option value="all" className="bg-white text-slate-900">All Teams</option>
              {initialTeams?.map(t => (
                <option key={t.id} value={t.id} className="bg-white text-slate-900">
                  {t.name}
                </option>
              ))}
            </select>
          </div>
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs focus:ring-1 focus:ring-primary outline-none transition-all"
            style={{ width: '100%' }}
          />
        </div>
        
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          fontSize: '0.65rem',
          color: savingStatus === 'error' ? '#ef4444' : (savingStatus === 'saved' ? '#10b981' : 'var(--text-muted)')
        }}>
          {savingStatus === 'saving' && <div className="animate-pulse">Saving...</div>}
          {savingStatus === 'saved' && <span>Changes saved</span>}
          {savingStatus === 'error' && <span>Save failed</span>}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th 
                    key={header.id}
                    style={{ 
                      padding: '0.5rem', 
                      background: 'rgba(255,255,255,0.02)', 
                      textAlign: 'left', 
                      fontSize: '0.6rem', 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.05em', 
                      color: 'var(--text-muted)',
                      borderBottom: '1px solid var(--card-border)',
                      borderRight: '1px solid var(--card-border)',
                      position: header.id === 'project' ? 'sticky' : 'static',
                      left: 0,
                      zIndex: header.id === 'project' ? 20 : 1,
                    }}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-white/[0.02] transition-colors border-b border-white/5">
                {row.getVisibleCells().map(cell => (
                  <td 
                    key={cell.id}
                    style={{ 
                      padding: 0, 
                      borderRight: '1px solid var(--card-border)',
                      position: cell.column.id === 'project' ? 'sticky' : 'static',
                      left: 0,
                      background: cell.column.id === 'project' ? 'rgba(23, 23, 33, 1)' : 'transparent',
                      zIndex: cell.column.id === 'project' ? 10 : 1,
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: '0.75rem', fontSize: '0.6rem', color: 'var(--text-muted)', display: 'flex', gap: '1rem', padding: '0.75rem' }}>
        <span>* Editing updates globally across all teams assigned to project</span>
        <span>* Only ACTIVE projects shown</span>
      </div>
    </div>
  );
}
