'use client';

import React from 'react';
import { ProjectPlanningGrid } from './ProjectPlanningGrid';
import { PlanningSidebar } from './PlanningSidebar';

interface WaitingListItem {
  id: string;
  projectName: string;
  teamName: string;
  hours: number;
  periodLabel: string;
  projectId: string;
  teamId: string;
  periodId: string;
}

interface ProjectPlanningContainerProps {
  projects: any[];
  teams: any[];
  users: any[];
  roles: any[];
  allocations: any[];
  periods: any[];
  waitingListItems: WaitingListItem[];
}

export function ProjectPlanningContainer({
  projects,
  teams,
  users,
  roles,
  allocations,
  periods,
  waitingListItems
}: ProjectPlanningContainerProps) {
  return (
    <div className="flex h-full overflow-hidden bg-slate-50">
      <main className="flex-1 flex flex-col p-6 gap-6 overflow-hidden">
        <header className="flex-shrink-0">
          <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase">Hierarchical Capacity</h1>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Tactical Resource Alignment</p>
        </header>

        <section className="flex-1 overflow-hidden bg-white rounded-3xl border border-slate-200 shadow-sm relative">
          <ProjectPlanningGrid 
            projects={projects}
            teams={teams}
            users={users}
            roles={roles}
            allocations={allocations}
            periods={periods}
          />
        </section>
        
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm flex-shrink-0">
          <h3 className="text-[0.6rem] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Architecture Compliance</h3>
          <p className="text-[0.6rem] text-slate-500 font-medium leading-relaxed">
            Unifying 3-level hierarchy (Project &gt; Team &gt; Individual) with high-density heatmap and waiting list logic.
          </p>
        </div>
      </main>

      <PlanningSidebar 
        items={waitingListItems}
        onAssign={(item) => {
          console.log("Assigning item from container:", item);
          // In the future, this can trigger a state change or modal in the grid
        }}
      />
    </div>
  );
}
