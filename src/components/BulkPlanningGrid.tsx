"use client";

import { useState, useTransition, useMemo, useEffect } from "react";
import { 
  useReactTable, 
  getCoreRowModel, 
  flexRender, 
  ColumnDef 
} from "@tanstack/react-table";
import { upsertAllocation } from "@/lib/actions";
import { 
  Zap,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Search
} from "lucide-react";

const CompactEditableCell = ({ 
  value: initialValue, 
  row, 
  column, 
  table 
}: any) => {
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
      placeholder="-"
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
      className="compact-input"
      style={{
        width: '100%',
        padding: '0.4rem 0.25rem',
        textAlign: 'center',
        border: 'none',
        background: 'transparent',
        color: value ? 'white' : 'rgba(255,255,255,0.15)',
        fontSize: '0.8rem',
        outline: 'none',
        transition: 'all 0.1s'
      }}
    />
  );
};

export default function BulkPlanningGrid({
  initialProjects,
  initialPeriods,
  initialAllocations,
}: {
  initialProjects: any[];
  initialPeriods: any[];
  initialAllocations: any[];
}) {
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState("");
  const [data, setData] = useState(() => initialProjects);
  const [allocations, setAllocations] = useState<Record<string, number>>(() =>
    initialAllocations.reduce((acc, curr) => ({
      ...acc,
      [`${curr.projectId}-${curr.periodId}`]: curr.plannedHours
    }), {})
  );

  const [savingStatus, setSavingStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const filteredData = useMemo(() => {
    if (!search) return data;
    return data.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase()) || 
      p.code.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  const columns = useMemo<ColumnDef<any>[]>(() => [
    {
      id: "project",
      header: "Project",
      accessorFn: (row) => row,
      cell: ({ getValue }: any) => {
        const prj = getValue();
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
      accessorFn: (row: any) => allocations[`${row.id}-${per.id}`],
      cell: CompactEditableCell,
      size: 70,
    })),
    {
      id: "total",
      header: "Σ",
      accessorFn: (row) => initialPeriods.reduce((acc, per) => acc + (allocations[`${row.id}-${per.id}`] || 0), 0),
      cell: ({ getValue }: any) => (
        <div style={{ textAlign: 'center', fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-light)' }}>
          {getValue()}
        </div>
      ),
      size: 60,
    }
  ], [allocations, initialPeriods]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex: number, columnId: string, value: any) => {
        const prj = filteredData[rowIndex];
        const val = parseFloat(value) || 0;
        const key = `${prj.id}-${columnId}`;
        
        setAllocations(prev => ({ ...prev, [key]: val }));
        setSavingStatus('saving');

        startTransition(async () => {
          try {
            await upsertAllocation({
              teamId: prj.teamId || "bulk-global", // Handle global projects
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

  return (
    <div className="glass-panel" style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="icon-badge primary">
            <Zap size={16} />
          </div>
          <div>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>Bulk Weekly Planning</h2>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Today + 8 Weeks rolling window</div>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
           <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filter projects..."
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid var(--card-border)',
                  borderRadius: '2rem',
                  padding: '0.4rem 1rem 0.4rem 2.25rem',
                  fontSize: '0.75rem',
                  color: 'white',
                  width: '200px'
                }}
              />
           </div>
           <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: '80px' }}>
              {savingStatus === 'saving' && <Loader2 size={14} className="animate-spin text-indigo-400" />}
              {savingStatus === 'saved' && <CheckCircle2 size={14} className="text-green-500" />}
              {savingStatus === 'error' && <AlertCircle size={14} className="text-red-500" />}
              <span style={{ fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', opacity: 0.6 }}>
                {savingStatus === 'idle' ? 'Ready' : savingStatus}
              </span>
           </div>
        </div>
      </div>

      <div style={{ overflowX: 'auto', borderRadius: '0.5rem', border: '1px solid var(--card-border)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} style={{ background: 'rgba(255,255,255,0.03)' }}>
                {headerGroup.headers.map(header => (
                  <th 
                    key={header.id} 
                    style={{ 
                      padding: '0.5rem', 
                      textAlign: header.id === 'project' ? 'left' : 'center',
                      borderBottom: '1px solid var(--card-border)',
                      borderRight: '1px solid var(--card-border)',
                      position: header.id === 'project' ? 'sticky' : 'static',
                      left: 0,
                      background: header.id === 'project' ? 'rgba(20,20,30,0.95)' : 'transparent',
                      zIndex: header.id === 'project' ? 10 : 1,
                      backdropFilter: 'blur(10px)'
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
              <tr key={row.id} className="hover:bg-white/[0.03]" style={{ borderBottom: '1px solid var(--card-border)' }}>
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
      <div style={{ marginTop: '0.75rem', fontSize: '0.6rem', color: 'var(--text-muted)', display: 'flex', gap: '1rem' }}>
        <span>* Editing updates globally across all teams assigned to project</span>
        <span>* Only ACTIVE projects shown</span>
      </div>
    </div>
  );
}
