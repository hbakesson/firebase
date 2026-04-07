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
import { upsertAllocation, upsertActual } from '@/lib/actions';
import { Project, Period, Allocation } from '@/lib/mockData';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
    updateActuals?: (rowIndex: number, columnId: string, value: unknown) => void;
    allocations?: Record<string, number>;
    actualsMap?: Record<string, number>;
    selectedTeamId?: string;
  }
}

interface BulkProject {
  id: string;
  name: string;
  code: string;
  teams?: { id: string; name: string }[];
}

/**
 * Sub-column Cell: Planned (Editable)
 */
const PlannedCell = React.memo(({ getValue, row, column, table }: CellContext<BulkProject, number>) => {
  const plannedValue = getValue();
  const [localValue, setLocalValue] = useState<string | number>(plannedValue);
  
  // The column ID for sub-columns usually looks like "periodId-planned"
  const periodId = column.id.split('-')[0];
  const isLocked = (column.columnDef as ColumnDef<BulkProject, number> & { meta: { isLocked?: boolean } }).meta?.isLocked;

  React.useEffect(() => {
    setLocalValue(plannedValue);
  }, [plannedValue]);

  const onBlur = () => {
    const intVal = parseInt(localValue.toString(), 10) || 0;
    if (intVal !== plannedValue) {
      table.options.meta?.updateData(row.index, periodId, intVal);
    }
  };

  return (
    <div style={{ padding: '0.1rem' }}>
      <input
        value={localValue}
        onChange={e => setLocalValue(e.target.value.replace(/[^0-9]/g, ''))}
        onBlur={onBlur}
        disabled={isLocked}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        style={{
          width: '100%',
          background: 'transparent',
          border: 'none',
          color: isLocked ? 'var(--text-muted)' : 'var(--primary-light)',
          fontSize: '0.65rem',
          textAlign: 'center',
          outline: 'none',
          cursor: isLocked ? 'not-allowed' : 'text',
          fontWeight: 600,
        }}
        className={isLocked ? "" : "hover:bg-white/5 focus:bg-white/10 rounded px-1 transition-all"}
      />
    </div>
  );
});

/**
 * Sub-column Cell: Actual (Editable)
 */
const ActualCell = React.memo(({ getValue, row, column, table }: CellContext<BulkProject, number>) => {
  const actualValue = getValue();
  const [localValue, setLocalValue] = useState<string | number>(actualValue);
  const meta = table.options.meta;
  const allocations = meta?.allocations;
  const periodId = column.id.split('-')[0];
  const selectedTeamId = meta?.selectedTeamId;

  React.useEffect(() => {
    setLocalValue(actualValue);
  }, [actualValue]);

  // Find corresponding planned value for health indicator
  const plannedValue = useMemo(() => {
    if (selectedTeamId !== 'all') {
      return allocations?.[`${row.original.id}-${periodId}-${selectedTeamId}`] || 0;
    }
    return (row.original.teams || []).reduce((sum: number, t: { id: string }) => sum + (allocations?.[`${row.original.id}-${periodId}-${t.id}`] || 0), 0);
  }, [allocations, row.original.id, row.original.teams, periodId, selectedTeamId]);

  const numericLocal = parseInt(localValue.toString(), 10) || 0;
  const isOverPlan = numericLocal > plannedValue && plannedValue > 0;

  const onBlur = () => {
    if (numericLocal !== actualValue) {
      table.options.meta?.updateActuals?.(row.index, periodId, numericLocal);
    }
  };

  return (
    <div style={{ padding: '0.1rem' }}>
      <input
        value={localValue}
        onChange={e => setLocalValue(e.target.value.replace(/[^0-9]/g, ''))}
        onBlur={onBlur}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        style={{
          width: '100%',
          background: isOverPlan ? 'rgba(245, 158, 11, 0.05)' : 'transparent',
          border: 'none',
          color: isOverPlan ? '#fbbf24' : 'var(--text-muted)',
          fontSize: '0.65rem',
          textAlign: 'center',
          outline: 'none',
          cursor: 'text',
          fontWeight: isOverPlan ? 700 : 500,
        }}
        className="hover:bg-white/5 focus:bg-white/10 rounded px-1 transition-all"
      />
    </div>
  );
});

PlannedCell.displayName = "PlannedCell";
ActualCell.displayName = "ActualCell";

interface BulkPlanningGridProps {
  initialProjects: Project[];
  initialAllocations: Allocation[];
  initialActuals: Allocation[]; // Repurposing Allocation interface as actuals follow same ID structure
  initialPeriods: Period[];
  initialTeams: { id: string; name: string }[];
}

export type BulkViewMode = 'PLANNED' | 'ACTUAL' | 'COMPARE';

export function BulkPlanningGrid({ initialProjects, initialAllocations, initialActuals, initialPeriods, initialTeams }: BulkPlanningGridProps) {
  const [search, setSearch] = useState('');
  const [selectedTeamId, setSelectedTeamId] = useState<string>('all');
  const [, startTransition] = useTransition();
  
  const [allocations, setAllocations] = useState<Record<string, number>>(() => 
    initialAllocations.reduce((acc, curr) => ({
      ...acc,
      [`${curr.projectId}-${curr.periodId}-${curr.teamId}`]: curr.plannedHours
    }), {})
  );

  const [actualsMap, setActualsMap] = useState<Record<string, number>>(() =>
    initialActuals.reduce((acc, curr: Allocation) => ({
      ...acc,
      [`${curr.projectId}-${curr.periodId}-${curr.teamId}`]: curr.plannedHours || (curr as unknown as { actualHours: number }).actualHours || 0
    }), {} as Record<string, number>)
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
      columns: [
        {
          id: `${per.id}-planned`,
          header: () => <div style={{ fontSize: '0.55rem', textAlign: 'center', color: 'var(--primary-light)', fontWeight: 800 }}>P</div>,
          accessorFn: (row: BulkProject) => {
            if (selectedTeamId !== 'all') {
              return allocations[`${row.id}-${per.id}-${selectedTeamId}`] ?? 0;
            }
            return (row.teams || []).reduce((sum, t) => sum + (allocations[`${row.id}-${per.id}-${t.id}`] || 0), 0);
          },
          cell: PlannedCell,
          size: 40,
          meta: { isLocked: per.isLocked }
        },
        {
          id: `${per.id}-actual`,
          header: () => <div style={{ fontSize: '0.55rem', textAlign: 'center', color: 'var(--text-muted)', fontWeight: 800 }}>A</div>,
          accessorFn: (row: BulkProject) => {
            if (selectedTeamId !== 'all') {
              return actualsMap[`${row.id}-${per.id}-${selectedTeamId}`] || 0;
            }
            return (row.teams || []).reduce((sum, t) => sum + (actualsMap[`${row.id}-${per.id}-${t.id}`] || 0), 0);
          },
          cell: ActualCell,
          size: 40,
        }
      ]
    })),
    {
      id: "total",
      header: "Σ",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: CellContext<BulkProject, any>) => {
        const totalPlanned = initialPeriods.reduce((acc, per) => {
          if (selectedTeamId !== 'all') {
            return acc + (allocations[`${row.original.id}-${per.id}-${selectedTeamId}`] || 0);
          }
          return acc + (row.original.teams || []).reduce((sum, t) => sum + (allocations[`${row.original.id}-${per.id}-${t.id}`] || 0), 0);
        }, 0);

        const totalActual = initialPeriods.reduce((acc, per) => {
          if (selectedTeamId !== 'all') {
            return acc + (actualsMap[`${row.original.id}-${per.id}-${selectedTeamId}`] || 0);
          }
          return acc + (row.original.teams || []).reduce((sum, t) => sum + (actualsMap[`${row.original.id}-${per.id}-${t.id}`] || 0), 0);
        }, 0);

        return (
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: totalActual > totalPlanned && totalPlanned > 0 ? '#fbbf24' : 'var(--primary-light)' }}>
              {totalPlanned}
            </div>
            <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              {totalActual}
            </div>
          </div>
        );
      },
      size: 60,
    }
  ], [allocations, actualsMap, initialPeriods, selectedTeamId]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id,
    meta: {
      allocations, // Pass allocations for totals and health checks
      actualsMap,
      selectedTeamId,
      updateData: (rowIndex: number, columnId: string, value: unknown) => {
        const prj = filteredData[rowIndex];
        const val = parseInt(value as string, 10) || 0;
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
      },
      updateActuals: (rowIndex: number, columnId: string, value: unknown) => {
        const prj = filteredData[rowIndex];
        const val = parseInt(value as string, 10) || 0;
        const isMultiTeam = prj.teams && prj.teams.length > 1;
        const targetTeamId = selectedTeamId !== "all"
          ? selectedTeamId
          : (prj.teams?.[0]?.id || "bulk-global");

        if (selectedTeamId === "all" && isMultiTeam) {
          alert(`Note: This project (${prj.code}) is assigned to multiple teams. Actual hours will be attributed to ${prj.teams?.[0]?.name}. Select a specific team for precise control.`);
        }

        const key = `${prj.id}-${columnId}-${targetTeamId}`;
        setActualsMap(prev => ({ ...prev, [key]: val }));
        setSavingStatus('saving');

        startTransition(async () => {
          try {
            await upsertActual({
              teamId: targetTeamId,
              projectId: prj.id,
              periodId: columnId,
              actualHours: val,
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
        <div className="relative flex-1 flex items-center gap-6">
          <div className="flex items-center gap-3">
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Team</span>
            <select
              value={selectedTeamId}
              onChange={e => setSelectedTeamId(e.target.value)}
              className="bg-[#e2e8f0] text-[#0f172a] font-semibold border-0 rounded-lg px-3 py-1.5 text-[0.65rem] focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none cursor-pointer"
              style={{ minWidth: '120px', backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23334155%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.6rem top 50%', backgroundSize: '0.6rem auto', paddingRight: '1.5rem' }}
            >
              <option value="all" className="bg-white text-slate-900">All Teams</option>
              {initialTeams?.map(t => (
                <option key={t.id} value={t.id} className="bg-white text-slate-900">
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 max-w-xs">
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs focus:ring-1 focus:ring-primary outline-none transition-all"
            />
          </div>
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
                    colSpan={header.colSpan}
                    style={{ 
                      padding: header.depth === 0 ? '0.5rem' : '0.1rem 0.5rem', 
                      background: 'rgba(255,255,255,0.02)', 
                      textAlign: header.subHeaders.length > 0 ? 'center' : 'left', 
                      fontSize: header.depth === 0 ? '0.65rem' : '0.55rem', 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.05em', 
                      color: 'var(--text-muted)',
                      borderBottom: '1px solid var(--card-border)',
                      borderRight: '1px solid var(--card-border)',
                      position: header.column.id === 'project' ? 'sticky' : 'static',
                      left: 0,
                      zIndex: header.column.id === 'project' ? 20 : 1,
                    }}
                  >
                    {!header.isPlaceholder && flexRender(header.column.columnDef.header, header.getContext())}
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
      <div style={{ marginTop: '0.75rem', fontSize: '0.6rem', color: 'var(--text-muted)', display: 'flex', gap: '1.5rem', padding: '0.75rem' }}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <span>Planned Effort</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-white/20" />
          <span>Reported Actuals</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#fbbf24] font-bold">!</span>
          <span>Alert: Actuals exceed plan</span>
        </div>
        <div className="ml-auto opacity-50 italic">
          * Editing updates {selectedTeamId === 'all' ? 'primary team allocation' : `allocation for ${initialTeams?.find(t => t.id === selectedTeamId)?.name}`}
        </div>
      </div>
    </div>
  );
}
