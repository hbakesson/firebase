"use client";

import { useState, useTransition, useMemo, useEffect, ReactNode } from "react";
import { 
  useReactTable, 
  getCoreRowModel, 
  flexRender, 
  ColumnDef,
  Row
} from "@tanstack/react-table";
import { upsertAllocation } from "@/lib/actions";
import { 
  Save, 
  AlertCircle, 
  Loader2,
  CalendarDays,
  CheckCircle2,
  Table as TableIcon
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

// --- Specialized Editable Cell ---
const EditableCell = ({ 
  value: initialValue, 
  row, 
  column, 
  table 
}: { 
  value: any; 
  row: any; 
  column: any; 
  table: any 
}) => {
  const [value, setValue] = useState(initialValue);

  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <input 
      type="number"
      value={value ?? ""}
      placeholder="0"
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
      style={{
        width: '100%',
        height: '100%',
        padding: '1rem 0.5rem',
        textAlign: 'center',
        border: 'none',
        background: 'transparent',
        color: value ? 'white' : 'rgba(255,255,255,0.2)',
        fontSize: '0.9rem',
        fontWeight: value ? 600 : 400,
        transition: 'background 0.2s'
      }}
    />
  );
};

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
  const [data, setData] = useState(() => initialProjects);
  const [allocations, setAllocations] = useState<Record<string, number>>(() =>
    initialAllocations.reduce((acc, curr) => ({
      ...acc,
      [`${curr.projectId}-${curr.periodId}`]: curr.plannedHours
    }), {})
  );

  const [savingStatus, setSavingStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  // --- Dynamic Column Definitions ---
  const columns = useMemo<ColumnDef<any>[]>(() => [
    {
      id: "projectInfo",
      header: "Project Detail",
      accessorFn: (row) => row,
      cell: ({ getValue }: any) => {
        const prj = getValue();
        return (
          <div style={{ padding: '0.75rem 1rem' }}>
            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{prj.name}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{prj.code}</div>
          </div>
        );
      },
      size: 250,
    },
    ...initialPeriods.map(per => ({
      id: per.id,
      header: () => (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>{per.label.split(' ')[0]}</div>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 400 }}>{per.label.split(' ')[1]}</div>
        </div>
      ),
      accessorFn: (row: any) => allocations[`${row.id}-${per.id}`],
      cell: EditableCell,
      size: 100,
    })),
    {
      id: "projectTotal",
      header: "Project Total",
      accessorFn: (row) => initialPeriods.reduce((acc, per) => acc + (allocations[`${row.id}-${per.id}`] || 0), 0),
      cell: ({ getValue }: any) => (
        <div style={{ textAlign: 'center', fontWeight: 800, color: 'var(--primary-light)' }}>
          {getValue()}h
        </div>
      ),
      size: 120,
    }
  ], [allocations, initialPeriods]);

  // --- React Table Instance ---
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex: number, columnId: string, value: any) => {
        const prj = data[rowIndex];
        const val = parseFloat(value) || 0;
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
          } catch (e) {
            setSavingStatus('error');
          }
        });
      }
    }
  });

  // Capacity Totals Footer row Calculation
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
          <TableIcon size={16} className="text-indigo-400" />
          TanStack Capacity Grid
          {savingStatus === 'saving' && <Loader2 size={14} className="animate-spin text-indigo-400" />}
          {savingStatus === 'saved' && <CheckCircle2 size={14} className="text-green-500" />}
          {savingStatus === 'error' && <AlertCircle size={14} className="text-red-500" />}
        </h3>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          Optimized bulk-editing using TanStack Table v8.
        </div>
      </div>

      <div style={{ overflowX: 'auto', borderRadius: '0.5rem', border: '1px solid var(--card-border)', background: 'rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} style={{ borderBottom: '1px solid var(--card-border)', background: 'rgba(255,255,255,0.02)' }}>
                {headerGroup.headers.map(header => (
                  <th 
                    key={header.id} 
                    style={{ 
                      padding: '1rem', 
                      minWidth: header.id === 'projectInfo' ? '250px' : '100px',
                      textAlign: header.id === 'projectInfo' ? 'left' : 'center',
                      borderLeft: header.id === 'projectInfo' ? 'none' : '1px solid var(--card-border)',
                      position: header.id === 'projectInfo' ? 'sticky' : 'static',
                      left: 0,
                      background: header.id === 'projectInfo' ? 'var(--bg-primary)' : 'transparent',
                      zIndex: header.id === 'projectInfo' ? 10 : 1
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
              <tr key={row.id} style={{ borderBottom: '1px solid var(--card-border)' }} className="hover:bg-white/[0.02]">
                {row.getVisibleCells().map(cell => (
                  <td 
                    key={cell.id} 
                    style={{ 
                      padding: 0, 
                      borderLeft: cell.column.id === 'projectInfo' ? 'none' : '1px solid var(--card-border)',
                      position: cell.column.id === 'projectInfo' ? 'sticky' : 'static',
                      left: 0,
                      background: cell.column.id === 'projectInfo' ? 'var(--bg-primary)' : 'transparent',
                      zIndex: cell.column.id === 'projectInfo' ? 10 : 1
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
            {/* Summary Totals Row */}
            <tr style={{ background: 'rgba(99, 102, 241, 0.1)', fontWeight: 800 }}>
              <td style={{ padding: '1rem', textAlign: 'right', position: 'sticky', left: 0, background: 'var(--bg-primary)', zIndex: 10, borderTop: '2px solid var(--card-border)' }}>Period Capacity:</td>
              {initialPeriods.map(per => (
                <td key={per.id} style={{ textAlign: 'center', padding: '1rem', borderTop: '2px solid var(--card-border)', borderLeft: '1px solid var(--card-border)' }}>
                  {periodTotals[per.id] || 0}h
                </td>
              ))}
              <td style={{ textAlign: 'center', padding: '1rem', borderTop: '2px solid var(--card-border)', borderLeft: '1px solid var(--card-border)', background: 'rgba(99, 102, 241, 0.2)' }}>
                {Object.values(periodTotals).reduce((a, b) => a + b, 0)}h
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
