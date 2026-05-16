'use client';

import React, { useMemo, useState, useRef, useEffect } from 'react';
import { Search, LayoutGrid, Calendar, Target, Info, ChevronRight, ChevronDown, Users, User, Briefcase, Shield } from 'lucide-react';
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
 * Identity Cell Renderer: Handles hierarchy indentation and icons with Scoro Availability Rings
 */
const IdentityCellRenderer = (params: ICellRendererParams & { context: { userUtilization: Record<string, number> } }) => {
  const row = params.data as HierarchicalRow;
  if (!row) return null;

  const Icon = row.type === 'project' ? Briefcase : row.type === 'team' ? Users : row.type === 'role' ? Shield : User;
  const iconColor = row.type === 'project' ? 'text-indigo-600' : row.type === 'team' ? 'text-emerald-600' : row.type === 'role' ? 'text-amber-600' : 'text-slate-500';
  const bgClass = row.type === 'project' ? 'bg-indigo-50' : row.type === 'team' ? 'bg-emerald-50' : row.type === 'role' ? 'bg-amber-50' : 'bg-slate-100';
  const textColor = row.type === 'project' ? 'text-slate-900 font-extrabold' : row.type === 'team' ? 'text-slate-700 font-bold' : row.type === 'role' ? 'text-slate-800 font-black' : 'text-slate-600';

  // Availability Ring Logic (for Users)
  const util = row.type === 'user' ? (params.context?.userUtilization?.[row.userId!] || 0) : 0;
  const strokeDash = Math.min(100, util) * 0.44; 

  return (
    <div className="flex items-center h-full gap-3" style={{ paddingLeft: `${row.indent * 16}px` }}>
      <div className="relative flex-shrink-0 group/avatar">
        {row.type === 'user' && (
          <svg className="absolute -inset-1 w-[calc(100%+8px)] h-[calc(100%+8px)] -rotate-90 pointer-events-none">
            <circle cx="50%" cy="50%" r="45%" fill="none" stroke="#e2e8f0" strokeWidth="2" />
            <circle
              cx="50%" cy="50%" r="45%" fill="none"
              stroke={util > 100 ? '#f43f5e' : '#6366f1'}
              strokeWidth="2" strokeDasharray="44" strokeDashoffset={44 - strokeDash}
              className="transition-all duration-700 ease-out"
            />
          </svg>
        )}
        
        <div className={`p-1.5 rounded-lg relative z-10 ${bgClass}`}>
          <Icon className={iconColor} size={14} />
        </div>

        {row.type === 'user' && (
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[0.6rem] px-2 py-1 rounded opacity-0 group-hover/avatar:opacity-100 transition-opacity whitespace-nowrap z-50">
            {Math.round(util)}% Utilized
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center leading-tight overflow-hidden">
        <span className={`text-[0.7rem] uppercase tracking-tight truncate ${textColor}`}>
          {row.name}
        </span>
        {row.type !== 'user' && row.code && (
          <span className="text-[0.55rem] text-slate-400 font-mono font-bold tracking-wider">{row.code}</span>
        )}
      </div>
    </div>
  );
};

export function ProjectPlanningGrid({ projects, teams, users, roles, allocations, periods }: { projects: (Project & { teams: Team[] })[]; teams: Team[]; users: User[]; roles: Role[]; allocations: Allocation[]; periods: Period[] }) {
  const gridRef = useRef<AgGridReact>(null);
  const [search, setSearch] = useState('');
  const [rows, setRows] = useState<HierarchicalRow[]>([]);

  // --- 1. Hierarchy Engine: Builds Project > Team > Role > User tree ---
  useEffect(() => {
    const newRows: HierarchicalRow[] = [];
    
    projects.forEach(project => {
      newRows.push({
        id: `p-${project.id}`,
        type: 'project',
        name: project.name,
        code: project.code,
        projectId: project.id,
        indent: 0
      });

      project.teams.forEach(team => {
        newRows.push({
          id: `p-${project.id}-t-${team.id}`,
          type: 'team',
          name: team.name,
          code: team.code,
          projectId: project.id,
          teamId: team.id,
          indent: 1
        });

        // Add Role Placeholders assigned to this project/team
        const projectTeamRoles = roles.filter(r => 
          allocations.some(a => a.projectId === project.id && a.teamId === team.id && a.roleId === r.id)
        );

        projectTeamRoles.forEach(role => {
          newRows.push({
            id: `p-${project.id}-t-${team.id}-r-${role.id}`,
            type: 'role',
            name: role.name,
            projectId: project.id,
            teamId: team.id,
            roleId: role.id,
            indent: 2
          });
        });

        // Add Users
        users.forEach(user => {
          newRows.push({
            id: `p-${project.id}-t-${team.id}-u-${user.id}`,
            type: 'user',
            name: user.name || user.email || 'Unknown',
            projectId: project.id,
            teamId: team.id,
            userId: user.id,
            indent: 3
          });
        });
      });
    });
    setRows(newRows);
  }, [projects, teams, users, roles, allocations]);

  // --- 2. Map Allocations for rapid lookup ---
  const allocationMap = useMemo(() => {
    const map: Record<string, { req: number; alloc: number; act: number; type: string }> = {};
    allocations.forEach(a => {
      const key = `${a.projectId}-${a.teamId}-${a.userId || 'team'}-${a.periodId}`;
      map[key] = {
        req: a.requestedHours,
        alloc: a.allocatedHours,
        act: a.actualHours,
        type: a.type || 'WORK'
      };
    });
    return map;
  }, [allocations]);

  // --- 3. Compute Aggregate User Utilization for Rings ---
  const userUtilization = useMemo(() => {
    const map: Record<string, number> = {};
    users.forEach(user => {
      const totalCapacity = user.capacityPerDay * 5 * periods.length;
      
      let totalAllocated = 0;
      allocations.forEach(a => {
        if (a.userId === user.id && periods.some(p => p.id === a.periodId)) {
          // Only count WORK or PIPELINE towards utilization, not TIME_OFF
          if (a.type !== 'TIME_OFF') {
            totalAllocated += a.allocatedHours;
          }
        }
      });

      map[user.id] = totalCapacity > 0 ? (totalAllocated / totalCapacity) * 100 : 0;
    });
    return map;
  }, [users, allocations, periods]);

  // --- 4. Capacity Cell Renderer: Shows Requested, Allocated, and Actual buckets ---
  const CapacityCellRenderer = (params: ICellRendererParams) => {
    const row = params.data as HierarchicalRow;
    const periodId = params.colDef.field;
    if (!row || !periodId) return null;

    const key = `${row.projectId}-${row.teamId || 'team'}-${row.userId || 'team'}-${periodId}`;
    const val = allocationMap[key] || { req: 0, alloc: 0, act: 0, type: 'WORK' };

    // Scoro Visual Logic: Utilization vs Capacity
    const isUser = row.type === 'user';
    const user = users.find(u => u.id === row.userId);
    const capacity = isUser && user ? user.capacityPerDay * 5 : 40; 
    
    const utilization = (val.alloc / capacity) * 100;
    const isFull = utilization >= 95 && utilization <= 105;

    // Colors based on Scoro research
    let statusClass = 'text-slate-200';
    let bgClass = 'bg-transparent';
    let dotClass = '';

    if (val.type === 'TIME_OFF') {
      statusClass = 'text-amber-700 font-black';
      bgClass = 'bg-amber-100/50';
    } else if (val.alloc > 0) {
      if (utilization > 100) {
        statusClass = 'text-rose-700 font-black';
        bgClass = 'bg-rose-50/50';
        dotClass = 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]';
      } else if (isFull) {
        statusClass = 'text-indigo-700 font-black';
        bgClass = 'bg-indigo-50/50';
      } else {
        statusClass = 'text-emerald-700 font-black';
        bgClass = 'bg-emerald-50/50';
      }
    }

    return (
      <div className={`flex flex-col items-center justify-center h-full w-full py-1 leading-none group border-r border-slate-50 relative transition-all duration-200 ${bgClass}`}>
        {/* Requested (Top) - Scoro uses this for tentative/pipeline if needed */}
        <div className="text-[0.6rem] text-slate-300 font-black mb-0.5 transition-colors group-hover:text-slate-400">
          {val.req > 0 ? val.req : ''}
        </div>
        
        {/* Allocated (Main) */}
        <div className={`text-[0.95rem] tracking-tighter capacity-value transition-transform group-hover:scale-110 ${statusClass}`}>
          {val.alloc || '0'}
        </div>
        
        {/* Actual (Bottom) */}
        <div className="text-[0.6rem] text-slate-400/60 font-bold mt-0.5">
          {val.act > 0 ? val.act : ''}
        </div>

        {/* Status Dot (Burnout / Overbooked indicator) */}
        {utilization > 100 && (
          <div className={`absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full ${dotClass}`} title="Over Capacity (Burnout Risk)" />
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
          context={{ userUtilization }}
          onCellContextMenu={(params) => {
            params.event?.preventDefault();
            // Simple logic to trigger a distribution or fill
            const field = params.colDef.field;
            const row = params.data as HierarchicalRow;
            if (!field || !row || row.type !== 'user') return;

            const action = window.confirm(`Plan Time for ${row.name}?\n\n[OK] to Distribute 40h over next 4 weeks\n[Cancel] to skip`);
            if (action) {
              // Logic for "Distribute"
              const currentPeriodIdx = periods.findIndex(p => p.id === field);
              if (currentPeriodIdx === -1) return;
              
              const targetPeriods = periods.slice(currentPeriodIdx, currentPeriodIdx + 4);
              const hoursPerPeriod = 40 / targetPeriods.length;

              targetPeriods.forEach(p => {
                const key = `${row.projectId}-${row.teamId}-${row.userId}-${p.id}`;
                const current = allocationMap[key] || { req: 0, alloc: 0, act: 0 };
                handleValueChange(p.id, row, { ...current, alloc: hoursPerPeriod });
              });
            }
          }}
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
