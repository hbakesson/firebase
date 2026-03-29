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
  teamId?: string;
}

// --- Specialized Compact Editable Cell ---
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CompactEditableCell = ({ getValue, row, column, table }: CellContext<BulkProject, any>) => {
  const initialValue = getValue() as number;
  const [value, setValue] = useState<string | number>(initialValue);

  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
  };

  return (
    <input
      value={value}
      onChange={e => setValue(e.target.value)}
      onBlur={onBlur}
      type="number"
      step="0.5"
      min="0"
      style={{
        width: '100%',
        background: 'transparent',
        border: 'none',
        color: 'var(--text-main)',
        fontSize: '0.7rem',
        textAlign: 'center',
        padding: '0.2rem',
        outline: 'none',
        borderRadius: '2px',
        transition: 'background 0.2s',
      }}
      className="hover:bg-white/5 focus:bg-white/10"
    />
  );
};

interface BulkPlanningGridProps {
  initialProjects: Project[];
  initialAllocations: Allocation[];
  initialPeriods: Period[];
}

export function BulkPlanningGrid({ initialProjects, initialAllocations, initialPeriods }: BulkPlanningGridProps) {
  const [search, setSearch] = useState('');
  const [, startTransition] = useTransition();
  const [allocations, setAllocations] = useState<Record<string, number>>(() => 
    initialAllocations.reduce((acc, curr) => ({
      ...acc,
      [`${curr.projectId}-${curr.periodId}`]: curr.plannedHours
    }), {})
  );

  const [savingStatus, setSavingStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  // --- Filtered Data ---
  const filteredData = useMemo(() => {
    if (!search) return initialProjects;
    return initialProjects.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase()) || 
      p.code.toLowerCase().includes(search.toLowerCase())
    );
  }, [initialProjects, search]);

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
        <div style={{ textAlign: 'center', lineHeight: 1.1 }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 700 }}>{per.label.split(' (')[0]}</div>
          <div style={{ fontSize: '0.55rem', color: 'var(--text-muted)', fontWeight: 400 }}>{per.label.split(' (')[1]?.replace(')', '')}</div>
        </div>
      ),
      accessorFn: (row: BulkProject) => allocations[`${row.id}-${per.id}`] ?? 0,
      cell: CompactEditableCell,
      size: 70,
    })),
    {
      id: "total",
      header: "Σ",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: CellContext<BulkProject, any>) => {
        const total = initialPeriods.reduce((acc, per) => acc + (allocations[`${row.id}-${per.id}`] || 0), 0);
        return (
          <div style={{ textAlign: 'center', fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-light)' }}>
            {total}
          </div>
        );
      },
      size: 60,
    }
  ], [allocations, initialPeriods]);

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
        const key = `${prj.id}-${columnId}`;
        
        setAllocations(prev => ({ ...prev, [key]: val }));
        setSavingStatus('saving');

        startTransition(async () => {
          try {
            await upsertAllocation({
              teamId: prj.teamId || "bulk-global",
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
      <div className="p-3 border-b border-white/5 flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs focus:ring-1 focus:ring-primary outline-none transition-all"
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
                      background: cell.column.id === 'project' ? 'rgba(20,20,30,0.95)' : 'transparent',
                      zIndex: cell.column.id === 'project' ? 10 : 1,
                      backdropFilter: 'blur(10px)'
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
