'use client';

import React from 'react';
import { Search, Plus, Calendar, UserPlus, Info } from 'lucide-react';

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

interface PlanningSidebarProps {
  items: WaitingListItem[];
  onAssign: (item: WaitingListItem) => void;
}

export function PlanningSidebar({ items, onAssign }: PlanningSidebarProps) {
  const [isOpen, setIsOpen] = React.useState(true);

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 bg-white border border-slate-200 border-r-0 p-3 rounded-l-2xl shadow-xl hover:bg-slate-50 transition-all z-40 group"
      >
        <div className="flex flex-col items-center gap-2">
          <Calendar size={18} className="text-indigo-600" />
          <span className="[writing-mode:vertical-lr] text-[0.65rem] font-black uppercase tracking-widest text-slate-400 group-hover:text-indigo-600 transition-colors">Waiting List</span>
          {items.length > 0 && (
            <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              {items.length}
            </span>
          )}
        </div>
      </button>
    );
  }

  return (
    <aside className="w-80 bg-white border-l border-slate-200 flex flex-col h-full shadow-2xl z-40 animate-in slide-in-from-right duration-300">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div>
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
            Waiting List
            <span className="bg-slate-200 text-slate-600 text-[10px] px-2 py-0.5 rounded-full">{items.length}</span>
          </h2>
          <p className="text-[0.65rem] text-slate-400 font-bold uppercase tracking-wider mt-1">Unassigned Backlog</p>
        </div>
        <button 
          onClick={() => setIsOpen(false)}
          className="text-slate-300 hover:text-slate-600 transition-colors p-1"
        >
          <Plus size={20} className="rotate-45" />
        </button>
      </div>

      <div className="p-4 bg-white">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={14} />
          <input 
            type="text" 
            placeholder="Search backlog..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-slate-400 font-medium"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-6 text-center opacity-40">
            <div className="p-4 bg-slate-50 rounded-full mb-4">
              <Info size={24} className="text-slate-400" />
            </div>
            <p className="text-[0.65rem] font-black text-slate-900 uppercase tracking-widest">All tasks assigned</p>
            <p className="text-[0.65rem] text-slate-400 font-bold mt-1">Your backlog is clear.</p>
          </div>
        ) : (
          items.map((item) => (
            <div 
              key={item.id}
              className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-100 transition-all group relative cursor-default overflow-hidden"
            >
              {/* Status Indicator */}
              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-400" />
              
              <div className="flex justify-between items-start mb-2">
                <span className="text-[0.6rem] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {item.projectName}
                </span>
                <span className="text-[0.65rem] font-extrabold text-slate-900 bg-slate-50 px-2 py-1 rounded-lg">
                  {item.hours}h
                </span>
              </div>
              
              <h4 className="text-[0.7rem] font-bold text-slate-700 mb-1">{item.teamName}</h4>
              <p className="text-[0.6rem] text-slate-400 font-medium flex items-center gap-1">
                <Calendar size={10} />
                {item.periodLabel}
              </p>

              <div className="mt-4 flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                <button 
                  onClick={() => onAssign(item)}
                  className="flex-1 bg-slate-900 text-white text-[0.6rem] font-black uppercase py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-600 transition-colors"
                >
                  <UserPlus size={12} />
                  Assign Now
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t border-slate-100 bg-slate-50/30">
        <button className="w-full bg-white border border-slate-200 text-slate-600 text-[0.65rem] font-black uppercase py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-50 transition-all">
          <Plus size={14} className="text-slate-400" />
          Create New Task
        </button>
      </div>
    </aside>
  );
}
