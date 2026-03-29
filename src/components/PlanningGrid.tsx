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

// --- Specialized Editable Cell Component ---
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EditableCell = ({ getValue, row, column, table }: CellContext<Project, any>) => {
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
        fontSize: '0.85rem',
        textAlign: 'center',
        padding: '0.4rem',
        outline: 'none',
        borderRadius: '4px',
        transition: 'background 0.2s',
      }}
      className="hover:bg-white/5 focus:bg-white/10"
    />
  );
};

interface PlanningGridProps {
  teamId: string;
  initialProjects: Project[];
  initialAllocations: Allocation[];
  initialPeriods: Period[];
}

export function PlanningGrid({ teamId, initialProjects, initialAllocations, initialPeriods }: PlanningGridProps) {
  const [, startTransition] = useTransition();
  const [allocations, setAllocations] = useState<Record<string, number>>(() => 
    initialAllocations.reduce((acc, curr) => ({
      ...acc,
      [`${curr.projectId}-${curr.periodId}`]: curr.plannedHours
    }), {})
  );

  const [savingStatus, setSavingStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  // --- Dynamic Column Definitions ---
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns = useMemo<ColumnDef<Project, any>[]>(() => [
    {
      id: "projectInfo",
      header: "Project Detail",
      accessorFn: (row) => row,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ getValue }: CellContext<Project, any>) => {
        const prj = getValue() as Project;
        return (
          <div style={{ padding: '0.5rem 1rem', minWidth: '220px' }}>
            <div style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.9rem' }}>{prj.name}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{prj.code}</div>
          </div>
        );
      },
      size: 250,
    },
    ...initialPeriods.map(per => ({
      id: per.id,
      header: per.label,
      accessorFn: (row: Project) => allocations[`${row.id}-${per.id}`] ?? 0,
      cell: EditableCell,
      size: 100,
    })),
    {
      id: "total",
      header: "Total",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: CellContext<Project, any>) => {
        const total = initialPeriods.reduce((acc, per) => acc + (allocations[`${row.id}-${per.id}`] || 0), 0);
        return (
          <div style={{ textAlign: 'center', fontWeight: 700, color: 'var(--primary-light)', fontSize: '0.9rem' }}>
            {total}
          </div>
        );
      },
      size: 100,
    }
  ], [allocations, initialPeriods]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: initialProjects,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id,
    meta: {
      updateData: (rowIndex: number, columnId: string, value: unknown) => {
        const prj = initialProjects[rowIndex];
        const val = parseFloat(value as string) || 0;
        const key = `${prj.id}-${columnId}`;
        
        setAllocations(prev => ({ ...prev, [key]: val }));
        setSavingStatus('saving');

        startTransition(async () => {
          try {
            await upsertAllocation({
              teamId,
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
    <div className="bg-[#14141e] border border-white/5 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
      <div className="p-4 border-b border-white/5 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white/70 uppercase letter-spacing-wider">Project Capacity Planning</h3>
        <div style={{ 
          fontSize: '0.75rem', 
          color: savingStatus === 'error' ? '#ef4444' : (savingStatus === 'saved' ? '#10b981' : 'var(--text-muted)')
        }}>
          {savingStatus === 'saving' && <span className="animate-pulse">Saving changes...</span>}
          {savingStatus === 'saved' && <span>✓ All changes saved</span>}
          {savingStatus === 'error' && <span>⚠ Error saving changes</span>}
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
                      padding: '1rem', 
                      background: 'rgba(255,255,255,0.02)', 
                      textAlign: 'left', 
                      fontSize: '0.7rem', 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.1em', 
                      color: 'var(--text-muted)',
                      borderBottom: '1px solid var(--card-border)'
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
                  <td key={cell.id} style={{ padding: 0 }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
