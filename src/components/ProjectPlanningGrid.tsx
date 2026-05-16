'use client';

import React, { useMemo, useState, useRef } from 'react';
import { Search, LayoutGrid, Calendar, Target, Info } from 'lucide-react';
import { AgGridReact } from 'ag-grid-react';
import { 
  ColDef, 
  ColGroupDef, 
  ValueGetterParams,
  ICellRendererParams,
  ModuleRegistry,
  AllCommunityModule
} from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

// Import AG Grid styles
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

interface Team {
  id: string;
  name: string;
  code: string;
}

interface Allocation {
  teamId: string;
  projectId: string;
  periodId: string;
  plannedHours: number;
}

interface Period {
  id: string;
  startDate: string | Date;
  endDate: string | Date;
  label: string;
}

interface ProjectPlanningGridProps {
  teams: Team[];
  allocations: Allocation[];
  periods: Period[];
}

/**
 * Custom Cell Renderer for Teams
 */
const TeamCellRenderer = (params: ICellRendererParams) => {
  const row = params.data as Team;
  if (!row) return null;
  return (
    <div className="flex flex-col justify-center h-full py-1">
      <div className="font-black text-[0.7rem] leading-tight text-white uppercase tracking-tighter">
        {row.name}
      </div>
      <div className="text-[0.6rem] text-indigo-400 font-mono">
        CODE: {row.code}
      </div>
    </div>
  );
};

export function ProjectPlanningGrid({ teams, allocations, periods }: ProjectPlanningGridProps) {
  const gridRef = useRef<AgGridReact>(null);
  const [search, setSearch] = useState('');

  // --- Process Timeline ---
  // We want to create "Day" columns even though data is weekly.
  // We'll use the periods to define the bounds.
  const timeline = useMemo(() => {
    if (!periods.length) return [];
    
    // Sort periods by start date
    const sorted = [...periods].sort((a, b) => 
      new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );

    const firstDate = new Date(sorted[0].startDate);
    const lastDate = new Date(sorted[sorted.length - 1].endDate);
    
    const days: Date[] = [];
    const current = new Date(firstDate);
    while (current <= lastDate) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return days;
  }, [periods]);

  // --- Map Allocations for easy lookup ---
  const allocationMap = useMemo(() => {
    const map: Record<string, number> = {};
    allocations.forEach(a => {
      const key = `${a.teamId}-${a.periodId}`;
      map[key] = (map[key] || 0) + a.plannedHours;
    });
    return map;
  }, [allocations]);

  // --- AG Grid Column Definitions ---
  const columnDefs = useMemo<(ColDef | ColGroupDef)[]>(() => {
    const monthGroups: Record<string, ColGroupDef> = {};

    timeline.forEach(day => {
      const monthLabel = day.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      const weekNum = Math.ceil(day.getDate() / 7);
      const weekLabel = `Week ${weekNum}`;
      const dayLabel = day.toLocaleDateString('en-US', { weekday: 'short' }).charAt(0);
      const dateKey = day.toISOString().split('T')[0];

      // Find which period this day belongs to
      const period = periods.find(p => {
        const start = new Date(p.startDate);
        const end = new Date(p.endDate);
        return day >= start && day <= end;
      });

      if (!monthGroups[monthLabel]) {
        monthGroups[monthLabel] = {
          headerName: monthLabel,
          headerClass: 'ag-header-month-group',
          children: []
        };
      }

      // Check if week group exists in this month
      let weekGroup = (monthGroups[monthLabel].children as ColGroupDef[]).find(c => c.headerName === weekLabel);
      if (!weekGroup) {
        weekGroup = {
          headerName: weekLabel,
          headerClass: 'ag-header-week-group',
          children: []
        };
        (monthGroups[monthLabel].children as ColGroupDef[]).push(weekGroup);
      }

      (weekGroup.children as ColDef[]).push({
        headerName: `${dayLabel}\n${day.getDate()}`,
        field: dateKey,
        width: 35,
        cellClass: 'ag-cell-daily',
        headerClass: 'ag-header-day',
        valueGetter: (params: ValueGetterParams) => {
          if (!period) return 0;
          const row = params.data as Team;
          const weeklyTotal = allocationMap[`${row.id}-${period.id}`] || 0;
          // Distribute across 5 working days (simplified)
          const isWeekend = day.getDay() === 0 || day.getDay() === 6;
          return isWeekend ? 0 : (weeklyTotal / 5).toFixed(1);
        },
        cellClassRules: {
          'ag-cell-has-value': 'params.value > 0',
          'ag-cell-weekend': (params) => {
            const d = new Date(params.colDef.field!);
            return d.getDay() === 0 || d.getDay() === 6;
          }
        }
      });
    });

    return [
      {
        headerName: 'Team Entity',
        pinned: 'left',
        width: 160,
        cellRenderer: TeamCellRenderer,
        lockPinned: true,
        suppressMovable: true,
        headerClass: 'ag-header-team-main'
      },
      ...Object.values(monthGroups)
    ];
  }, [timeline, periods, allocationMap]);

  // --- Filtering ---
  const filteredRows = useMemo(() => {
    if (!search) return teams;
    const s = search.toLowerCase();
    return teams.filter(t => t.name.toLowerCase().includes(s) || t.code.toLowerCase().includes(s));
  }, [teams, search]);

  return (
    <div className="flex flex-col gap-4 animate-in fade-in duration-500">
      {/* --- Control Bar --- */}
      <div className="flex items-center justify-between bg-slate-900/50 border border-white/5 rounded-2xl p-4 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <h1 className="text-xl font-black text-white tracking-tighter flex items-center gap-2 uppercase">
              <Target className="text-indigo-500" size={24} />
              Project Planning
            </h1>
            <p className="text-[0.6rem] text-slate-500 font-bold uppercase tracking-[0.2em] mt-0.5">
              Team Resource Allocation Matrix
            </p>
          </div>

          <div className="h-8 w-px bg-white/10" />

          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={16} />
            <input
              type="text"
              placeholder="Search teams..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-black/20 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-indigo-500 outline-none transition-all w-64 text-white placeholder:text-slate-600"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-xl">
            <Calendar size={14} className="text-indigo-400" />
            <span className="text-[0.65rem] font-black text-indigo-300 uppercase tracking-widest">
              Daily Distribution View
            </span>
          </div>
          <div className="flex items-center gap-2 bg-slate-800 border border-white/5 px-4 py-2 rounded-xl text-slate-400 text-[0.65rem] font-bold">
            <Info size={14} />
            READ ONLY
          </div>
        </div>
      </div>

      {/* --- AG Grid --- */}
      <div 
        className="ag-theme-quartz-dark ag-grid-planning rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        style={{ height: 'calc(100vh - 200px)', width: '100%' }}
      >
        <AgGridReact
          ref={gridRef}
          theme="legacy"
          rowData={filteredRows}
          columnDefs={columnDefs}
          defaultColDef={{
            resizable: false,
            sortable: true,
            filter: false,
            suppressHeaderMenuButton: true,
          }}
          headerHeight={32}
          groupHeaderHeight={32}
          rowHeight={48}
          suppressMovableColumns={true}
        />
      </div>

      <style jsx global>{`
        .ag-grid-planning {
          --ag-background-color: #020617;
          --ag-header-background-color: #0f172a;
          --ag-header-foreground-color: #64748b;
          --ag-foreground-color: #94a3b8;
          --ag-border-color: rgba(255, 255, 255, 0.03);
          --ag-row-hover-color: rgba(99, 102, 241, 0.08);
          --ag-selected-row-background-color: rgba(99, 102, 241, 0.15);
          --ag-font-size: 10px;
          --ag-font-family: 'JetBrains Mono', monospace;
        }

        .ag-header-month-group {
          font-weight: 900 !important;
          color: #818cf8 !important;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          background: rgba(99, 102, 241, 0.05) !important;
        }

        .ag-header-week-group {
          font-size: 8px !important;
          color: #475569 !important;
          background: transparent !important;
        }

        .ag-header-day {
          font-size: 8px !important;
          white-space: pre-line !important;
          line-height: 1.2 !important;
          text-align: center !important;
        }

        .ag-cell-daily {
          display: flex;
          align-items: center;
          justify-content: center;
          border-right: 1px solid rgba(255, 255, 255, 0.02) !important;
          font-family: 'JetBrains Mono', monospace;
          color: #334155;
          font-size: 9px;
        }

        .ag-cell-has-value {
          color: #818cf8 !important;
          font-weight: 900 !important;
          background: rgba(99, 102, 241, 0.03);
        }

        .ag-cell-weekend {
          background: rgba(0, 0, 0, 0.2);
          opacity: 0.5;
        }

        .ag-header-team-main {
          background: #0f172a !important;
          font-weight: 900 !important;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .ag-theme-quartz-dark .ag-header-cell-label {
          justify-content: center;
        }

        .ag-theme-quartz-dark .ag-pinned-left-header {
          border-right: 2px solid rgba(99, 102, 241, 0.3) !important;
        }

        .ag-theme-quartz-dark .ag-pinned-left-cols-container {
          border-right: 2px solid rgba(99, 102, 241, 0.3) !important;
          background: #020617 !important;
        }
      `}</style>
    </div>
  );
}
