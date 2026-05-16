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

import { upsertAllocation, upsertActual } from '@/lib/actions';

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialAllocations: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialActuals: any[]; 
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
    <div className="flex flex-col justify-center h-full py-0.5">
      <div className="font-bold text-[0.7rem] leading-tight truncate text-white uppercase tracking-wider">
        {row.teamName}
      </div>
      <div className="text-[0.65rem] text-slate-400 truncate italic">
        {row.projectName}
      </div>
    </div>
  );
};

export function BulkPlanningGrid({ initialProjects, initialAllocations, initialActuals, initialPeriods, initialTeams, offset = 0 }: BulkPlanningGridProps) {
  const router = useRouter();
  const gridRef = useRef<AgGridReact>(null);
  const [search, setSearch] = useState('');
  const [selectedTeamFilter, setSelectedTeamFilter] = useState<string>('all');
  const [, startTransition] = useTransition();
  
  const [allocations, setAllocations] = useState<Record<string, number>>(() => 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialAllocations.reduce((acc: Record<string, number>, curr: any) => ({
      ...acc,
      [`${curr.projectId}-${curr.periodId}-${curr.teamId}`]: curr.plannedHours
    }), {})
  );

  const [actualsMap, setActualsMap] = useState<Record<string, number>>(() =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialActuals.reduce((acc: Record<string, number>, curr: any) => ({
      ...acc,
      [`${curr.projectId}-${curr.periodId}-${curr.teamId}`]: curr.plannedHours || curr.actualHours || 0
    }), {} as Record<string, number>)
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

  // --- Grid Event Handlers ---
  const onCellValueChanged = useCallback((event: CellValueChangedEvent) => {
    const row = event.data as FlatAllocationRow;
    const field = event.colDef.field; 
    if (!field) return;

    const [periodId, type] = field.split(':');
    const val = parseInt(event.newValue, 10) || 0;
    
    const key = `${row.projectId}-${periodId}-${row.teamId}`;
    setSavingStatus('saving');
    
    if (type === 'planned') {
      setAllocations(prev => ({ ...prev, [key]: val }));
      startTransition(async () => {
        try {
          await upsertAllocation({ teamId: row.teamId, projectId: row.projectId, periodId, plannedHours: val });
          setSavingStatus('saved');
          setTimeout(() => setSavingStatus('idle'), 2000);
        } catch { setSavingStatus('error'); }
      });
    } else {
      setActualsMap(prev => ({ ...prev, [key]: val }));
      startTransition(async () => {
        try {
          await upsertActual({ teamId: row.teamId, projectId: row.projectId, periodId, actualHours: val });
          setSavingStatus('saved');
          setTimeout(() => setSavingStatus('idle'), 2000);
        } catch { setSavingStatus('error'); }
      });
    }
  }, [startTransition]);

  // --- AG Grid Column Definitions ---
  const columnDefs = useMemo<(ColDef | ColGroupDef)[]>(() => {
    const grouped: Record<string, typeof initialPeriods> = {};
    initialPeriods.forEach(p => {
      const month = new Date(p.startDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      if (!grouped[month]) grouped[month] = [];
      grouped[month].push(p);
    });

    const dynamicCols = Object.entries(grouped).map(([month, periods]): ColGroupDef => ({
      headerName: month,
      headerClass: 'ag-header-month-group',
      children: periods.map((p): ColGroupDef => {
        const day = new Date(p.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        return {
          headerName: `${day}${p.isLocked ? ' 🔒' : ''}`,
          headerClass: 'ag-header-period-group',
          children: [
            {
              headerName: 'P',
              field: `${p.id}:planned`,
              width: 45,
              editable: !p.isLocked,
              cellClass: 'ag-cell-planned',
              valueGetter: (params: ValueGetterParams) => {
                const row = params.data as FlatAllocationRow;
                return allocations[`${row.projectId}-${p.id}-${row.teamId}`] || 0;
              }
            },
            {
              headerName: 'A',
              field: `${p.id}:actual`,
              width: 45,
              editable: true,
              cellClass: 'ag-cell-actual',
              cellClassRules: {
                'ag-cell-actual-over': (params) => {
                  const val = parseInt(params.value, 10) || 0;
                  const row = params.data as FlatAllocationRow;
                  const planned = allocations[`${row.projectId}-${p.id}-${row.teamId}`] || 0;
                  return val > planned && planned > 0;
                }
              },
              valueGetter: (params: ValueGetterParams) => {
                const row = params.data as FlatAllocationRow;
                return actualsMap[`${row.projectId}-${p.id}-${row.teamId}`] || 0;
              }
            }
          ]
        };
      })
    }));

    return [
      {
        headerName: 'Allocation Target',
        pinned: 'left',
        width: 180,
        cellRenderer: IdentityCellRenderer,
        lockPinned: true,
        suppressMovable: true,
      },
      ...dynamicCols,
      {
        headerName: 'Total',
        width: 70,
        pinned: 'right',
        headerClass: 'ag-header-total',
        cellClass: 'ag-cell-total',
        valueGetter: (params: ValueGetterParams) => {
          const row = params.data as FlatAllocationRow;
          const plan = initialPeriods.reduce((acc, per) => acc + (allocations[`${row.projectId}-${per.id}-${row.teamId}`] || 0), 0);
          const act = initialPeriods.reduce((acc, per) => acc + (actualsMap[`${row.projectId}-${per.id}-${row.teamId}`] || 0), 0);
          return `${plan}/${act}`;
        },
      }
    ];
  }, [allocations, actualsMap, initialPeriods]);

  return (
    <div className="flex flex-col gap-3">
      {/* --- Controls Bar: Spreadsheet Style --- */}
      <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
            <LayoutGrid size={16} className="text-indigo-400" />
            <span className="text-[0.65rem] font-bold text-indigo-300 uppercase tracking-widest">Global Allocation Matrix</span>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedTeamFilter}
              onChange={e => setSelectedTeamFilter(e.target.value)}
              className="bg-slate-800 text-white font-medium border border-white/10 rounded-lg px-3 py-1.5 text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all cursor-pointer appearance-none pr-8"
              style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2394a3b8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.8rem top 50%', backgroundSize: '0.5rem auto' }}
            >
              <option value="all">Filter: All Teams</option>
              {initialTeams?.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>

          <div className="relative group">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={14} />
            <input
              type="text"
              placeholder="Search matrix..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-slate-800/50 border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all w-56 text-white placeholder:text-slate-600"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-slate-800/50 border border-white/5">
          {savingStatus === 'saving' && (
            <div className="flex items-center gap-2 text-yellow-500 text-[0.65rem] font-bold">
              <Save size={12} className="animate-spin" /> SYNCING
            </div>
          )}
          {savingStatus === 'saved' && (
            <div className="flex items-center gap-2 text-emerald-500 text-[0.65rem] font-bold">
              <CheckCircle2 size={12} /> COMMITTED
            </div>
          )}
          {savingStatus === 'error' && (
            <div className="flex items-center gap-2 text-rose-500 text-[0.65rem] font-bold">
              <AlertCircle size={12} /> SYNC ERROR
            </div>
          )}
          {savingStatus === 'idle' && (
            <div className="flex items-center gap-2 text-slate-500 text-[0.65rem] font-bold">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" /> READY
            </div>
          )}
        </div>
      </div>

      {/* --- AG Grid Container --- */}
      <div 
        className="ag-theme-quartz-dark ag-grid-excel rounded-xl overflow-hidden border border-white/10 shadow-2xl"
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
          // Excel Behaviors
          singleClickEdit={true}
          stopEditingWhenCellsLoseFocus={true}
          undoRedoCellEditing={true}
          undoRedoCellEditingLimit={20}
          
          onCellValueChanged={onCellValueChanged}
          headerHeight={28}
          groupHeaderHeight={28}
          rowHeight={36}
        />
      </div>

      {/* --- Footer Pagination --- */}
      <div className="flex justify-center">
        <div className="flex items-center gap-1 bg-slate-800/80 border border-white/10 rounded-full p-1 shadow-lg backdrop-blur-sm">
          <button
            onClick={() => router.push(`?offset=${offset - 8}`)}
            className="p-1.5 hover:bg-white/10 rounded-full text-slate-500 hover:text-white transition-all"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="px-4 text-[0.6rem] font-black tracking-[0.2em] text-slate-500 uppercase">
            Window Offset: {offset}w
          </div>
          <button
            onClick={() => router.push(`?offset=${offset + 8}`)}
            className="p-1.5 hover:bg-white/10 rounded-full text-slate-500 hover:text-white transition-all"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <style jsx global>{`
        .ag-grid-excel {
          --ag-background-color: #020617;
          --ag-header-background-color: #0f172a;
          --ag-header-foreground-color: #64748b;
          --ag-foreground-color: #94a3b8;
          --ag-border-color: rgba(255, 255, 255, 0.05);
          --ag-secondary-border-color: rgba(255, 255, 255, 0.02);
          --ag-row-hover-color: rgba(99, 102, 241, 0.05);
          --ag-selected-row-background-color: rgba(99, 102, 241, 0.1);
          --ag-input-focus-border-color: #6366f1;
          --ag-font-size: 11px;
          --ag-font-family: 'JetBrains Mono', 'Fira Code', monospace;
        }

        .ag-header-month-group {
          font-weight: 900 !important;
          color: #818cf8 !important;
          font-size: 9px !important;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          border-bottom: 1px solid rgba(129, 140, 248, 0.2) !important;
        }

        .ag-header-period-group {
          font-size: 9px !important;
          color: #475569 !important;
        }

        .ag-cell-planned {
          color: #a5b4fc !important;
          font-weight: 600 !important;
          text-align: center !important;
          background: rgba(99, 102, 241, 0.02);
          border-right: 1px solid rgba(255, 255, 255, 0.02) !important;
        }

        .ag-cell-actual {
          color: #64748b !important;
          text-align: center !important;
          border-right: 1px solid rgba(255, 255, 255, 0.05) !important;
        }

        .ag-cell-actual-over {
          color: #f59e0b !important;
          font-weight: 900 !important;
          background: rgba(245, 158, 11, 0.05) !important;
        }

        .ag-cell-total {
          background: rgba(15, 23, 42, 0.5);
          font-weight: 900;
          font-size: 10px;
          color: #818cf8;
          font-family: 'JetBrains Mono', monospace;
        }

        .ag-theme-quartz-dark .ag-header-cell-label {
          justify-content: center;
        }

        /* Excel-like inputs */
        .ag-theme-quartz-dark .ag-cell-inline-editing {
          background: #1e1b4b !important;
          padding: 0 !important;
          border: 1px solid #6366f1 !important;
          box-shadow: 0 0 15px rgba(99, 102, 241, 0.3);
        }

        .ag-theme-quartz-dark .ag-cell-inline-editing input {
          color: #fff !important;
          text-align: center !important;
          font-weight: 900 !important;
        }

        /* Hide column separators */
        .ag-theme-quartz-dark .ag-header-cell::after, 
        .ag-theme-quartz-dark .ag-header-group-cell::after {
          display: none !important;
        }
      `}</style>
    </div>
  );
}
