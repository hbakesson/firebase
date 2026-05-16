'use client';

import React, { useMemo, useState, useRef } from 'react';
import { Search, LayoutGrid, Calendar, Target, Info, ChevronRight, ChevronDown, Users, User, Briefcase } from 'lucide-react';
import { AgGridReact } from 'ag-grid-react';
import { 
  ColDef, 
  ColGroupDef, 
  ValueGetterParams,
  ICellRendererParams,
  ModuleRegistry,
  AllCommunityModule,
  CellValueChangedEvent
} from 'ag-grid-community';
import { upsertAllocation } from '@/lib/actions';

ModuleRegistry.registerModules([AllCommunityModule]);

// Import AG Grid styles
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

interface Project {
  id: string;
  name: string;
  code: string;
  teams: Team[];
}

interface Team {
  id: string;
  name: string;
  code: string;
}

interface User {
  id: string;
  name: string;
  email: string | null;
  capacityPerDay: number;
}

interface Allocation {
  projectId: string;
  teamId: string;
  userId: string | null;
  periodId: string;
  requestedHours: number;
  allocatedHours: number;
  actualHours: number;
}

interface Period {
  id: string;
  startDate: string | Date;
  endDate: string | Date;
  label: string;
}

interface ProjectPlanningGridProps {
  projects: Project[];
  teams: Team[];
  users: User[];
  allocations: Allocation[];
  periods: Period[];
}

interface HierarchicalRow {
  id: string;
  type: 'project' | 'team' | 'user';
  name: string;
  code?: string;
  projectId: string;
  teamId?: string;
  userId?: string;
  indent: number;
  isExpanded?: boolean;
}

/**
 * Identity Cell Renderer: Handles hierarchy indentation and icons
 */
const IdentityCellRenderer = (params: ICellRendererParams) => {
  const row = params.data as HierarchicalRow;
  if (!row) return null;

  const Icon = row.type === 'project' ? Briefcase : row.type === 'team' ? Users : User;
  const iconColor = row.type === 'project' ? 'text-indigo-600' : row.type === 'team' ? 'text-emerald-600' : 'text-slate-500';
  const textColor = row.type === 'project' ? 'text-slate-900 font-extrabold' : row.type === 'team' ? 'text-slate-700 font-bold' : 'text-slate-600';

  return (
    <div className="flex items-center h-full gap-3" style={{ paddingLeft: `${row.indent * 20}px` }}>
      <div className={`p-1.5 rounded-lg ${row.type === 'project' ? 'bg-indigo-50' : row.type === 'team' ? 'bg-emerald-50' : 'bg-slate-100'}`}>
        <Icon className={iconColor} size={14} />
      </div>
      <div className="flex flex-col justify-center leading-tight overflow-hidden">
        <span className={`text-[0.75rem] uppercase tracking-tight truncate ${textColor}`}>
          {row.name}
        </span>
        {row.code && (
          <span className="text-[0.6rem] text-slate-400 font-mono font-bold tracking-wider">{row.code}</span>
        )}
      </div>
    </div>
  );
};



export function ProjectPlanningGrid({ projects, teams, users, allocations, periods }: ProjectPlanningGridProps) {
  const gridRef = useRef<AgGridReact>(null);
  const [search, setSearch] = useState('');

  // --- 1. Flatten Data to 3-level Hierarchy ---
  const rowData = useMemo(() => {
    const rows: HierarchicalRow[] = [];
    
    projects.forEach(project => {
      // Level 1: Project
      rows.push({
        id: `p-${project.id}`,
        type: 'project',
        name: project.name,
        code: project.code,
        projectId: project.id,
        indent: 0
      });

      // Level 2: Teams assigned to this project
      project.teams.forEach(team => {
        rows.push({
          id: `p-${project.id}-t-${team.id}`,
          type: 'team',
          name: team.name,
          code: team.code,
          projectId: project.id,
          teamId: team.id,
          indent: 1
        });

        // Level 3: Users (simplified: all users show under each team for now, or you could filter by membership)
        // For the demo, we'll show a few resources per team to keep it clean
        users.slice(0, 3).forEach(user => {
          rows.push({
            id: `p-${project.id}-t-${team.id}-u-${user.id}`,
            type: 'user',
            name: user.name || user.email?.split('@')[0] || 'Unknown',
            projectId: project.id,
            teamId: team.id,
            userId: user.id,
            indent: 2
          });
        });
      });
    });

    return rows;
  }, [projects, users]);

  // --- 2. Map Allocations for rapid lookup ---
  const allocationMap = useMemo(() => {
    const map: Record<string, { req: number; alloc: number; act: number }> = {};
    allocations.forEach(a => {
      const key = `${a.projectId}-${a.teamId}-${a.userId || 'team'}-${a.periodId}`;
      map[key] = {
        req: a.requestedHours,
        alloc: a.allocatedHours,
        act: a.actualHours
      };
    });
    return map;
  }, [allocations]);

  // --- Capacity Cell Renderer: Shows Requested, Allocated, and Actual buckets ---
  const CapacityCellRenderer = (params: ICellRendererParams) => {
    const row = params.data as HierarchicalRow;
    const periodId = params.colDef.field;
    if (!row || !periodId) return null;

    const key = `${row.projectId}-${row.teamId || 'team'}-${row.userId || 'team'}-${periodId}`;
    const val = allocationMap[key] || { req: 0, alloc: 0, act: 0 };

    const hasAlloc = val.alloc > 0;
    const isOver = val.alloc > val.req && val.req > 0;

    return (
      <div className="flex flex-col items-center justify-center h-full w-full py-1 leading-none group border-r border-slate-50">
        <div className="text-[0.6rem] text-slate-300 font-black mb-0.5 transition-colors group-hover:text-slate-400">
          {val.req > 0 ? val.req : ''}
        </div>
        <div className={`text-[0.9rem] font-black tracking-tighter capacity-value ${hasAlloc ? (isOver ? 'text-rose-600' : 'text-indigo-600') : 'text-slate-200'}`}>
          {val.alloc || '0'}
        </div>
        <div className="text-[0.6rem] text-emerald-600/60 font-black mt-0.5">
          {val.act > 0 ? val.act : ''}
        </div>
        {isOver && (
          <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-rose-500 rounded-full shadow-[0_0_8px_rgba(244,63,94,0.4)]" title="Over Requested" />
        )}
      </div>
    );
  };

  // --- Column Definitions with Grouping ---
  const columnDefs = useMemo<(ColDef | ColGroupDef)[]>(() => {
    const baseCols: (ColDef | ColGroupDef)[] = [
      {
        headerName: 'Capacity Entity',
        field: 'name',
        pinned: 'left',
        width: 280,
        cellRenderer: IdentityCellRenderer,
        lockPinned: true,
        suppressMovable: true,
        headerClass: 'ag-header-main-entity'
      }
    ];

    // Group periods by Month/Year
    const groups: Record<string, Period[]> = {};
    periods.forEach(p => {
      const d = new Date(p.startDate);
      const groupKey = d.toLocaleString('default', { month: 'long', year: 'numeric' });
      if (!groups[groupKey]) groups[groupKey] = [];
      groups[groupKey].push(p);
    });

    // Create group definitions
    const periodGroups = Object.entries(groups).map(([groupName, groupPeriods]) => ({
      headerName: groupName,
      headerClass: 'ag-header-month-group',
      children: groupPeriods.map(period => ({
        headerName: period.label,
        field: period.id,
        width: 80,
        editable: (params: any) => params.data.type !== 'project',
        cellRenderer: CapacityCellRenderer,
        cellClass: 'ag-cell-capacity',
        headerClass: 'ag-header-period',
        valueGetter: (params: ValueGetterParams) => {
          const row = params.data as HierarchicalRow;
          const key = `${row.projectId}-${row.teamId || 'team'}-${row.userId || 'team'}-${period.id}`;
          return allocationMap[key]?.alloc || 0;
        },
        valueSetter: (params) => {
          const row = params.data as HierarchicalRow;
          const val = parseFloat(params.newValue);
          if (isNaN(val)) return false;
          
          upsertAllocation({
            projectId: row.projectId,
            teamId: row.teamId || '',
            userId: row.userId,
            periodId: period.id,
            allocatedHours: val
          });
          return true;
        }
      }))
    }));

    return [...baseCols, ...periodGroups];
  }, [periods, allocationMap]);

  // --- 5. Filtering ---
  const filteredRows = useMemo(() => {
    if (!search) return rowData;
    const s = search.toLowerCase();
    return rowData.filter(r => r.name.toLowerCase().includes(s));
  }, [rowData, search]);

  return (
    <div className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-500">
      {/* Control Bar */}
      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <h1 className="text-xl font-black text-slate-900 tracking-tighter flex items-center gap-2 uppercase">
              <Target className="text-indigo-600" size={24} />
              Hierarchical Capacity Planning
            </h1>
            <p className="text-[0.6rem] text-slate-400 font-bold uppercase tracking-[0.2em] mt-0.5">
              3-Level Hierarchy • Project &gt; Team &gt; Individual
            </p>
          </div>

          <div className="h-8 w-px bg-slate-200" />

          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={16} />
            <input
              type="text"
              placeholder="Filter roadmap..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all w-64 text-slate-900 placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end mr-4">
             <span className="text-[0.55rem] font-black text-slate-400 uppercase tracking-widest">Cell Legend</span>
             <div className="flex gap-3 mt-1">
                <span className="text-[0.6rem] font-bold text-slate-400"><span className="text-slate-300 mr-0.5">R:</span>REQ</span>
                <span className="text-[0.6rem] font-bold text-indigo-600">ALLOC</span>
                <span className="text-[0.6rem] font-bold text-emerald-600"><span className="text-emerald-300 mr-0.5">A:</span>ACT</span>
             </div>
          </div>
          <div className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-[0.7rem] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all cursor-pointer shadow-md shadow-indigo-500/20 active:scale-95">
            Publish Changes
          </div>
        </div>
      </div>

      {/* AG Grid Container */}
      <div 
        className="ag-theme-quartz ag-grid-hierarchy rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-white"
        style={{ height: 'calc(100vh - 250px)', width: '100%' }}
      >
        <AgGridReact
          ref={gridRef}
          theme="legacy"
          rowData={filteredRows}
          columnDefs={columnDefs}
          defaultColDef={{
            resizable: true,
            sortable: false,
            filter: false,
            suppressHeaderMenuButton: true,
          }}
          headerHeight={32}
          groupHeaderHeight={40}
          rowHeight={64}
          suppressMovableColumns={true}
          onGridReady={(params) => {
            params.api.sizeColumnsToFit();
          }}
          singleClickEdit={true}
        />
      </div>

      <style jsx global>{`
        .ag-grid-hierarchy {
          --ag-background-color: #ffffff;
          --ag-header-background-color: #f8fafc;
          --ag-header-foreground-color: #475569;
          --ag-foreground-color: #1e293b;
          --ag-border-color: #f1f5f9;
          --ag-row-hover-color: #f1f5f9;
          --ag-selected-row-background-color: #eef2ff;
          --ag-font-size: 13px;
          --ag-font-family: 'Inter', system-ui, sans-serif;
        }

        .ag-header-month-group {
          background: #f1f5f9 !important;
          border-bottom: 1px solid #e2e8f0 !important;
          border-left: 1px solid #e2e8f0 !important;
          font-weight: 800 !important;
          color: #0f172a !important;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 10px !important;
          text-align: center;
        }

        .ag-header-main-entity {
          font-weight: 800 !important;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-size: 11px !important;
          color: #1e293b !important;
          background: #f8fafc !important;
        }

        .ag-header-period {
          font-size: 10px !important;
          font-weight: 800 !important;
          color: #64748b !important;
          border-left: 1px solid #f1f5f9 !important;
          background: #ffffff !important;
        }

        .ag-cell {
          display: flex !important;
          align-items: center !important;
          border-bottom: 1px solid #f1f5f9 !important;
        }

        .ag-cell-capacity {
          padding: 0 !important;
          background: white;
          transition: background 0.2s;
        }

        .ag-cell-capacity:hover {
          background: #f8fafc !important;
        }

        .ag-cell-inline-editing {
          background: #ffffff !important;
          border: 2px solid #6366f1 !important;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
          z-index: 100;
          font-weight: 800 !important;
          color: #4f46e5 !important;
          text-align: center;
        }

        .ag-pinned-left-header {
          border-right: 1px solid #e2e8f0 !important;
        }

        .ag-pinned-left-cols-container {
          border-right: 1px solid #e2e8f0 !important;
          background: #fcfcfd !important;
        }

        /* Mono for numbers only */
        .capacity-value {
          font-family: 'JetBrains Mono', monospace;
        }

        /* Project Row Styling */
        .ag-row-level-0 {
          background-color: #fcfcfd !important;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
}
