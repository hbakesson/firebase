'use client';

import React, { useMemo, useState, useTransition, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Search, Users, Save, AlertCircle, CheckCircle2, LayoutGrid } from 'lucide-react';
import { AgGridReact } from 'ag-grid-react';
import { 
  ColDef, 
  ColGroupDef, 
  CellValueChangedEvent,
  ValueGetterParams,
  ICellRendererParams,
  ModuleRegistry,
  AllCommunityModule
} from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

// Import AG Grid styles
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

import { upsertAllocation } from '@/lib/actions';

interface BulkProject {
  id: string;
  name: string;
  code: string;
  teams?: { id: string; name: string; parentTeamId?: string | null }[];
}

interface BulkTeam {
  id: string;
  name: string;
  parentTeamId?: string | null;
}

interface BulkPeriod {
  id: string;
  label: string;
  startDate: string | Date;
  endDate: string | Date;
  isLocked?: boolean;
}

// Flat row structure for Excel-like view
interface FlatAllocationRow {
  id: string; // unique combo key: teamId-projectId
  teamId: string;
  teamName: string;
  projectId: string;
  projectName: string;
  projectCode: string;
}

interface BulkPlanningGridProps {
  initialProjects: BulkProject[];
  initialAllocations: {
    projectId: string;
    teamId: string;
    periodId: string;
    requestedHours: number;
    allocatedHours: number;
    actualHours: number;
  }[];
  initialPeriods: BulkPeriod[];
  initialTeams: BulkTeam[];
  offset?: number;
}

/**
 * Custom Cell Renderer for Project/Team Identifiers
 */
const IdentityCellRenderer = (params: ICellRendererParams) => {
  const row = params.data as FlatAllocationRow;
  if (!row) return null;
  return (
    <div className="flex items-center h-full gap-3 py-1">
      <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center border border-indigo-100">
        <Users size={14} className="text-indigo-600" />
      </div>
      <div className="flex flex-col justify-center leading-tight overflow-hidden">
        <span className="text-[0.7rem] uppercase tracking-wider font-extrabold text-slate-900 truncate">
          {row.teamName}
        </span>
        <span className="text-[0.6rem] text-slate-400 font-medium truncate italic">
          {row.projectName}
        </span>
      </div>
    </div>
  );
};



export function BulkPlanningGrid({ initialProjects, initialAllocations, initialPeriods, initialTeams, offset = 0 }: BulkPlanningGridProps) {
  const router = useRouter();
  const gridRef = useRef<AgGridReact>(null);
  const [search, setSearch] = useState('');
  const [selectedTeamFilter, setSelectedTeamFilter] = useState<string>('all');
  const [, startTransition] = useTransition();
  
  // Single map for all buckets
  const [allocationMap, setAllocationMap] = useState<Record<string, { req: number; alloc: number; act: number }>>(() => 
    initialAllocations.reduce((acc, curr) => ({
      ...acc,
      [`${curr.projectId}-${curr.periodId}-${curr.teamId}`]: {
        req: curr.requestedHours || 0,
        alloc: curr.allocatedHours || 0,
        act: curr.actualHours || 0
      }
    }), {})
  );

  const [savingStatus, setSavingStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  // --- Flatten Data: Team + Project Combinations ---
  const flatData = useMemo(() => {
    const rows: FlatAllocationRow[] = [];
    initialTeams.forEach(team => {
      // Find projects assigned to this team
      const relatedProjects = initialProjects.filter(p => p.teams?.some(t => t.id === team.id));
      relatedProjects.forEach(project => {
        rows.push({
          id: `${team.id}-${project.id}`,
          teamId: team.id,
          teamName: team.name,
          projectId: project.id,
          projectName: project.name,
          projectCode: project.code
        });
      });
    });
    return rows;
  }, [initialTeams, initialProjects]);

  // --- Filtered Data ---
  const rowData = useMemo(() => {
    let result = flatData;
    if (selectedTeamFilter !== 'all') {
      result = result.filter(r => r.teamId === selectedTeamFilter);
    }
    if (search) {
      const s = search.toLowerCase();
      result = result.filter(r => 
        r.projectName.toLowerCase().includes(s) || 
        r.teamName.toLowerCase().includes(s) ||
        r.projectCode.toLowerCase().includes(s)
      );
    }
    return result;
  }, [flatData, search, selectedTeamFilter]);

  // --- Capacity Cell Renderer: Shows Requested, Allocated, and Actual buckets ---
  const CapacityCellRenderer = (params: ICellRendererParams) => {
    const row = params.data as FlatAllocationRow;
    const periodId = params.colDef.field;
    if (!row || !periodId) return null;

    const data = allocationMap[`${row.projectId}-${periodId}-${row.teamId}`] || { req: 0, alloc: 0, act: 0 };
    const hasAlloc = data.alloc > 0;
    const isOver = data.alloc > data.req && data.req > 0;

    return (
      <div className="flex flex-col items-center justify-center h-full w-full py-1 leading-none group border-r border-slate-50 relative">
        <div className="text-[0.55rem] text-slate-300 font-black mb-0.5 transition-colors group-hover:text-slate-400">
          {data.req > 0 ? data.req : ''}
        </div>
        <div className={`text-[0.85rem] font-black tracking-tighter ${hasAlloc ? (isOver ? 'text-rose-600' : 'text-indigo-600') : 'text-slate-200'}`}>
          {data.alloc || '0'}
        </div>
        <div className="text-[0.55rem] text-emerald-600/60 font-black mt-0.5">
          {data.act > 0 ? data.act : ''}
        </div>
        {isOver && (
          <div className="absolute top-1 right-1 w-1 h-1 bg-rose-500 rounded-full" title="Over Requested" />
        )}
      </div>
    );
  };

  // --- AG Grid Column Definitions ---
  const columnDefs = useMemo<(ColDef | ColGroupDef)[]>(() => {
    const grouped: Record<string, typeof initialPeriods> = {};
    initialPeriods.forEach(p => {
      const month = new Date(p.startDate).toLocaleDateString('default', { month: 'long', year: 'numeric' });
      if (!grouped[month]) grouped[month] = [];
      grouped[month].push(p);
    });

    const dynamicCols = Object.entries(grouped).map(([month, periods]): ColGroupDef => ({
      headerName: month,
      headerClass: 'ag-header-month-group',
      children: periods.map((p): ColDef => {
        const day = new Date(p.startDate).toLocaleDateString('default', { month: 'short', day: 'numeric' });
        return {
          headerName: `${day}${p.isLocked ? ' 🔒' : ''}`,
          field: p.id,
          width: 80,
          editable: !p.isLocked,
          cellRenderer: CapacityCellRenderer,
          cellClass: 'ag-cell-capacity',
          headerClass: 'ag-header-period',
          valueGetter: (params: ValueGetterParams) => {
            const row = params.data as FlatAllocationRow;
            return allocationMap[`${row.projectId}-${p.id}-${row.teamId}`]?.alloc || 0;
          },
          valueSetter: (params) => {
            const row = params.data as FlatAllocationRow;
            const val = parseFloat(params.newValue);
            if (isNaN(val)) return false;
            
            const key = `${row.projectId}-${p.id}-${row.teamId}`;
            const current = allocationMap[key] || { req: 0, alloc: 0, act: 0 };
            setAllocationMap(prev => ({
              ...prev,
              [key]: { ...current, alloc: val }
            }));
            
            startTransition(async () => {
              try {
                await upsertAllocation({ 
                  teamId: row.teamId, 
                  projectId: row.projectId, 
                  periodId: p.id, 
                  allocatedHours: val 
                });
                setSavingStatus('saved');
                setTimeout(() => setSavingStatus('idle'), 2000);
              } catch { setSavingStatus('error'); }
            });
            return true;
          }
        };
      })
    }));

    return [
      {
        headerName: 'Allocation Target',
        pinned: 'left',
        width: 240,
        cellRenderer: IdentityCellRenderer,
        lockPinned: true,
        suppressMovable: true,
        headerClass: 'ag-header-main-entity'
      },
      ...dynamicCols,
      {
        headerName: 'Total',
        width: 90,
        pinned: 'right',
        headerClass: 'ag-header-total',
        cellClass: 'ag-cell-total',
        valueGetter: (params: ValueGetterParams) => {
          const row = params.data as FlatAllocationRow;
          let plan = 0;
          let act = 0;
          initialPeriods.forEach(per => {
            const data = allocationMap[`${row.projectId}-${per.id}-${row.teamId}`];
            if (data) {
              plan += data.alloc;
              act += data.act;
            }
          });
          return `${plan} / ${act}`;
        },
      }
    ];
  }, [allocationMap, initialPeriods]);

  return (
    <div className="flex flex-col gap-3">
      {/* --- Controls Bar: Vienna Style --- */}
      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-3 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 rounded-lg border border-indigo-100">
            <LayoutGrid size={16} className="text-indigo-600" />
            <span className="text-[0.65rem] font-bold text-indigo-900 uppercase tracking-widest">Global Allocation Matrix</span>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedTeamFilter}
              onChange={e => setSelectedTeamFilter(e.target.value)}
              className="bg-slate-50 text-slate-900 font-bold border border-slate-200 rounded-lg px-3 py-1.5 text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all cursor-pointer appearance-none pr-8"
              style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2364748b%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.8rem top 50%', backgroundSize: '0.5rem auto' }}
            >
              <option value="all">Filter: All Teams</option>
              {initialTeams?.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>

          <div className="relative group">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={14} />
            <input
              type="text"
              placeholder="Search matrix..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all w-56 text-slate-900 placeholder:text-slate-400 font-medium"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100">
          {savingStatus === 'saving' && (
            <div className="flex items-center gap-2 text-indigo-600 text-[0.65rem] font-bold">
              <Save size={12} className="animate-spin" /> SYNCING
            </div>
          )}
          {savingStatus === 'saved' && (
            <div className="flex items-center gap-2 text-emerald-600 text-[0.65rem] font-bold">
              <CheckCircle2 size={12} /> COMMITTED
            </div>
          )}
          {savingStatus === 'error' && (
            <div className="flex items-center gap-2 text-rose-600 text-[0.65rem] font-bold">
              <AlertCircle size={12} /> SYNC ERROR
            </div>
          )}
          {savingStatus === 'idle' && (
            <div className="flex items-center gap-2 text-slate-400 text-[0.65rem] font-bold">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> SYSTEM READY
            </div>
          )}
        </div>
      </div>

      {/* --- AG Grid Container --- */}
      <div 
        className="ag-theme-quartz ag-grid-excel rounded-xl overflow-hidden border border-slate-200 shadow-sm"
        style={{ height: 'calc(100vh - 280px)', width: '100%' }}
      >
        <AgGridReact
          ref={gridRef}
          theme="legacy"
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={{
            resizable: true,
            sortable: true,
            filter: false,
            suppressHeaderMenuButton: true,
          }}
          singleClickEdit={true}
          stopEditingWhenCellsLoseFocus={true}
          undoRedoCellEditing={true}
          undoRedoCellEditingLimit={20}
          headerHeight={32}
          groupHeaderHeight={36}
          rowHeight={64}
        />
      </div>

      {/* --- Footer Pagination --- */}
      <div className="flex justify-center">
        <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-full p-1 shadow-sm">
          <button
            onClick={() => router.push(`?offset=${offset - 8}`)}
            className="p-1.5 hover:bg-slate-50 rounded-full text-slate-400 hover:text-indigo-600 transition-all"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="px-4 text-[0.65rem] font-black tracking-[0.2em] text-slate-500 uppercase">
            Offset: {offset}w
          </div>
          <button
            onClick={() => router.push(`?offset=${offset + 8}`)}
            className="p-1.5 hover:bg-slate-50 rounded-full text-slate-400 hover:text-indigo-600 transition-all"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <style jsx global>{`
        .ag-grid-excel {
          --ag-background-color: #ffffff;
          --ag-header-background-color: #f8fafc;
          --ag-header-foreground-color: #475569;
          --ag-foreground-color: #1e293b;
          --ag-border-color: #f1f5f9;
          --ag-secondary-border-color: #f8fafc;
          --ag-row-hover-color: #f1f5f9;
          --ag-selected-row-background-color: #eef2ff;
          --ag-input-focus-border-color: #6366f1;
          --ag-font-size: 12px;
          --ag-font-family: 'Inter', system-ui, sans-serif;
        }

        .ag-header-month-group {
          font-weight: 800 !important;
          color: #1e293b !important;
          font-size: 10px !important;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          background: #f1f5f9 !important;
          border-bottom: 1px solid #e2e8f0 !important;
        }

        .ag-header-period-group {
          font-size: 10px !important;
          font-weight: 700 !important;
          color: #64748b !important;
        }

        .ag-header-main-entity {
          font-weight: 800 !important;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-size: 11px !important;
          color: #1e293b !important;
        }

        .ag-cell-planned {
          color: #4f46e5 !important;
          font-weight: 700 !important;
          text-align: center !important;
          background: #f5f3ff !important;
          border-right: 1px solid #ddd6fe !important;
        }

        .ag-cell-actual {
          color: #64748b !important;
          text-align: center !important;
          border-right: 1px solid #f1f5f9 !important;
          font-weight: 500;
        }

        .ag-cell-actual-over {
          color: #e11d48 !important;
          font-weight: 900 !important;
          background: #fff1f2 !important;
        }

        .ag-cell-total {
          background: #f8fafc;
          font-weight: 800;
          font-size: 11px;
          color: #4338ca;
        }

        .ag-header-p { color: #4f46e5 !important; font-weight: 900 !important; }
        .ag-header-a { color: #64748b !important; font-weight: 900 !important; }

        .ag-theme-quartz .ag-header-cell-label {
          justify-content: center;
        }

        .ag-theme-quartz .ag-cell-inline-editing {
          background: #ffffff !important;
          padding: 0 !important;
          border: 2px solid #6366f1 !important;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        .ag-theme-quartz .ag-cell-inline-editing input {
          color: #1e1b4b !important;
          text-align: center !important;
          font-weight: 800 !important;
        }
      `}</style>
    </div>
  );
}
