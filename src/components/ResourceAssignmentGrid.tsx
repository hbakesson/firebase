'use client';

import React, { useMemo, useState, useRef } from 'react';
import { Search, UserPlus, Calendar as CalendarIcon, Briefcase } from 'lucide-react';
import { AgGridReact } from 'ag-grid-react';
import { 
  ColDef, 
  ColGroupDef, 
  ValueGetterParams,
  ICellRendererParams,
  CellValueChangedEvent,
  ModuleRegistry,
  AllCommunityModule
} from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

interface Project {
  id: string;
  name: string;
  code: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface ResourceAssignmentGridProps {
  projects: Project[];
  users: User[];
}

interface AssignmentRow {
  id: string;
  projectId: string;
  projectName: string;
  projectCode: string;
  userId: string;
  userName: string;
}

const IdentityCellRenderer = (params: ICellRendererParams) => {
  const row = params.data as AssignmentRow;
  if (!row) return null;
  return (
    <div className="flex flex-col justify-center h-full py-1">
      <div className="font-black text-[0.7rem] leading-tight text-white uppercase truncate">
        {row.projectName}
      </div>
      <div className="text-[0.65rem] text-indigo-400 font-bold flex items-center gap-1">
        <UserPlus size={10} /> {row.userName}
      </div>
    </div>
  );
};

export function ResourceAssignmentGrid({ projects, users }: ResourceAssignmentGridProps) {
  const gridRef = useRef<AgGridReact>(null);
  const [search, setSearch] = useState('');
  
  // Local state for assignments (demo purposes, would normally sync to DB)
  const [assignments, setAssignments] = useState<Record<string, number>>({});

  // --- Generate 40 Days ---
  const timeline = useMemo(() => {
    const days: Date[] = [];
    const current = new Date();
    // Start from today
    for (let i = 0; i < 40; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return days;
  }, []);

  // --- Flat Data: Project + User Combinations ---
  const rowData = useMemo(() => {
    const rows: AssignmentRow[] = [];
    // Cycle through projects and users to fill exactly 10 rows
    for (let i = 0; i < 10; i++) {
      const project = projects[i % projects.length];
      const user = users[i % users.length];
      
      if (project && user) {
        rows.push({
          id: `${project.id}-${user.id}-${i}`,
          projectId: project.id,
          projectName: project.name,
          projectCode: project.code,
          userId: user.id,
          userName: user.name || user.email.split('@')[0],
        });
      }
    }
    return rows;
  }, [projects, users]);

  // --- Filtered Data ---
  const filteredData = useMemo(() => {
    if (!search) return rowData;
    const s = search.toLowerCase();
    return rowData.filter(r => 
      r.projectName.toLowerCase().includes(s) || 
      r.userName.toLowerCase().includes(s)
    );
  }, [rowData, search]);

  const onCellValueChanged = (event: CellValueChangedEvent) => {
    const row = event.data as AssignmentRow;
    const field = event.colDef.field;
    if (!field) return;
    
    const key = `${row.id}-${field}`;
    const val = parseFloat(event.newValue) || 0;
    setAssignments(prev => ({ ...prev, [key]: val }));
    console.log(`Saved: Project ${row.projectName}, User ${row.userName}, Date ${field}, Hours ${val}`);
  };

  // --- AG Grid Column Definitions ---
  const columnDefs = useMemo<(ColDef | ColGroupDef)[]>(() => {
    const monthGroups: Record<string, ColGroupDef> = {};

    timeline.forEach(day => {
      const monthLabel = day.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      const dayLabel = day.toLocaleDateString('en-US', { weekday: 'short' }).charAt(0);
      const dayNum = day.getDate();
      const dateKey = day.toISOString().split('T')[0];

      if (!monthGroups[monthLabel]) {
        monthGroups[monthLabel] = {
          headerName: monthLabel,
          headerClass: 'ag-header-month-group-assign',
          children: []
        };
      }

      (monthGroups[monthLabel].children as ColDef[]).push({
        headerName: `${dayLabel}\n${dayNum}`,
        field: dateKey,
        width: 35,
        editable: true,
        cellClass: 'ag-cell-assign',
        headerClass: 'ag-header-day-assign',
        valueGetter: (params: ValueGetterParams) => {
          const row = params.data as AssignmentRow;
          return assignments[`${row.id}-${dateKey}`] || 0;
        },
        cellClassRules: {
          'ag-cell-assigned': (params) => Number(params.value) > 0,
          'ag-cell-weekend-assign': (params) => {
            const d = new Date(params.colDef.field!);
            return d.getDay() === 0 || d.getDay() === 6;
          }
        }
      });
    });

    return [
      {
        headerName: 'Project Resource',
        pinned: 'left',
        width: 200,
        cellRenderer: IdentityCellRenderer,
        lockPinned: true,
        suppressMovable: true,
        headerClass: 'ag-header-assign-main'
      },
      ...Object.values(monthGroups)
    ];
  }, [timeline, assignments]);

  return (
    <div className="flex flex-col gap-3 mt-8 animate-in slide-in-from-bottom duration-700">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
            <Briefcase className="text-emerald-400" size={18} />
          </div>
          <div>
            <h2 className="text-sm font-black text-white uppercase tracking-widest">Detailed Resource Assignment</h2>
            <p className="text-[0.6rem] text-slate-500 font-bold uppercase tracking-[0.1em]">Daily Individual Allocations • 40 Day Window</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-600" size={14} />
            <input
              type="text"
              placeholder="Search assignments..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-slate-900 border border-white/5 rounded-lg pl-8 pr-3 py-1.5 text-xs focus:ring-1 focus:ring-emerald-500 outline-none w-48 text-white placeholder:text-slate-700"
            />
          </div>
          <div className="flex items-center gap-2 text-[0.6rem] font-black text-emerald-400 bg-emerald-500/5 px-3 py-1.5 rounded-lg border border-emerald-500/10 uppercase">
             <CalendarIcon size={12} /> 40 Days Visible
          </div>
        </div>
      </div>

      <div 
        className="ag-theme-quartz-dark ag-grid-resource rounded-xl overflow-hidden border border-white/10"
        style={{ height: '500px', width: '100%' }}
      >
        <AgGridReact
          ref={gridRef}
          theme="legacy"
          rowData={filteredData}
          columnDefs={columnDefs}
          defaultColDef={{
            resizable: false,
            sortable: true,
            filter: false,
            suppressHeaderMenuButton: true,
          }}
          singleClickEdit={true}
          stopEditingWhenCellsLoseFocus={true}
          onCellValueChanged={onCellValueChanged}
          headerHeight={32}
          groupHeaderHeight={28}
          rowHeight={40}
        />
      </div>

      <style jsx global>{`
        .ag-grid-resource {
          --ag-background-color: #020617;
          --ag-header-background-color: #0f172a;
          --ag-header-foreground-color: #475569;
          --ag-foreground-color: #94a3b8;
          --ag-border-color: rgba(255, 255, 255, 0.03);
          --ag-row-hover-color: rgba(16, 185, 129, 0.05);
          --ag-selected-row-background-color: rgba(16, 185, 129, 0.1);
          --ag-font-size: 10px;
          --ag-font-family: 'JetBrains Mono', monospace;
        }

        .ag-header-month-group-assign {
          font-weight: 900 !important;
          color: #10b981 !important;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          background: rgba(16, 185, 129, 0.05) !important;
          font-size: 9px !important;
        }

        .ag-header-day-assign {
          font-size: 8px !important;
          white-space: pre-line !important;
          line-height: 1.1 !important;
          text-align: center !important;
        }

        .ag-cell-assign {
          display: flex;
          align-items: center;
          justify-content: center;
          border-right: 1px solid rgba(255, 255, 255, 0.02) !important;
          color: #334155;
          font-size: 9px;
        }

        .ag-cell-assigned {
          color: #10b981 !important;
          font-weight: 900 !important;
          background: rgba(16, 185, 129, 0.05);
        }

        .ag-cell-weekend-assign {
          background: rgba(0, 0, 0, 0.2);
          opacity: 0.4;
        }

        .ag-header-assign-main {
          background: #0f172a !important;
          font-weight: 900 !important;
          text-transform: uppercase;
        }

        .ag-theme-quartz-dark .ag-cell-inline-editing {
          background: #064e3b !important;
          border: 1px solid #10b981 !important;
        }
      `}</style>
    </div>
  );
}
