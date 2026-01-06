
import React from 'react';
import { Calendar, Plus, Play, ToggleLeft, ToggleRight, Trash2, Clock, ListChecks } from 'lucide-react';
import { Schedule } from '../types';

interface ScheduleManagerProps {
  schedules?: Schedule[];
}

const ScheduleManager: React.FC<ScheduleManagerProps> = ({ schedules = [] }) => {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-black tracking-tighter uppercase">Automation Schedules</h3>
          <p className="text-xs text-zinc-500 font-bold tracking-widest uppercase">Cron Jobs & Periodic Actions</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-[#ff5f00] text-black font-black uppercase tracking-[0.1em] text-xs rounded-xl hover:bg-[#ff7a29] transition-all">
          <Plus size={16} strokeWidth={3} /> Create Schedule
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {schedules.length > 0 ? schedules.map((schedule) => (
          <div key={schedule.id} className="bg-[#121212] border border-[#1a1a1a] rounded-2xl p-8 hover:border-[#ff5f00]/30 transition-all group overflow-hidden relative">
            <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">
              <div className="flex items-center gap-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${schedule.isActive ? 'bg-[#ff5f00]/10 border-[#ff5f00]/20 text-[#ff5f00]' : 'bg-zinc-950 border-white/5 text-zinc-700'}`}>
                  <Calendar size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white group-hover:text-[#ff5f00] transition-colors">{schedule.name}</h4>
                  <div className="flex items-center gap-4 mt-1.5">
                    <div className="flex items-center gap-1.5 text-zinc-500 text-xs font-mono">
                      <Clock size={14} className="text-[#ff5f00]" />
                      {schedule.cron}
                    </div>
                    <div className="w-1 h-1 rounded-full bg-zinc-800" />
                    <span className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">
                      Last Run: {schedule.lastRunAt || 'Never'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 border-l border-white/5 pl-6">
                <div className="flex flex-col items-end">
                   <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">Status</p>
                   <button className="flex items-center gap-2 transition-colors">
                     {schedule.isActive ? (
                       <span className="text-xs font-bold text-emerald-500 flex items-center gap-2">Active <ToggleRight className="text-[#ff5f00]" /></span>
                     ) : (
                       <span className="text-xs font-bold text-zinc-600 flex items-center gap-2">Inactive <ToggleLeft /></span>
                     )}
                   </button>
                </div>
                <div className="w-px h-10 bg-zinc-900 mx-2" />
                <div className="flex items-center gap-2">
                  <button className="p-3 bg-zinc-950 border border-white/5 text-zinc-500 hover:text-white rounded-xl transition-all" title="Trigger Now">
                    <Play size={18} fill="currentColor" />
                  </button>
                  <button className="p-3 bg-rose-900/10 border border-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-black rounded-xl transition-all">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
              <div className="flex items-center gap-2 mb-4">
                 <ListChecks size={14} className="text-[#ff5f00]" />
                 <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Sequential Task Chain</span>
              </div>
              <div className="flex flex-wrap gap-4">
                {schedule.tasks.map((task, idx) => (
                  <div key={task.id} className="flex items-center">
                    <div className="px-4 py-2 bg-black border border-white/5 rounded-xl flex items-center gap-3">
                      <span className="text-[10px] font-black text-[#ff5f00] font-mono">{idx + 1}</span>
                      <span className="text-xs font-bold uppercase tracking-widest text-zinc-300">{task.action}</span>
                    </div>
                    {idx < schedule.tasks.length - 1 && (
                      <div className="w-6 h-px bg-zinc-800 mx-1" />
                    )}
                  </div>
                ))}
                <button className="px-3 py-2 bg-zinc-900 border border-dashed border-zinc-700 hover:border-[#ff5f00] text-zinc-600 hover:text-[#ff5f00] rounded-xl text-[10px] font-black uppercase transition-all">
                  + Task
                </button>
              </div>
            </div>
          </div>
        )) : (
          <div className="bg-[#121212] border border-dashed border-[#1a1a1a] rounded-2xl p-20 text-center opacity-40">
            <Calendar size={48} className="mx-auto mb-4 text-zinc-700" />
            <p className="text-sm font-bold uppercase tracking-widest">No automated sequences configured</p>
          </div>
        )}
      </div>

      <div className="bg-[#0c0c0c] border border-l-4 border-l-blue-500 border-[#1a1a1a] p-6 rounded-2xl">
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-2 flex items-center gap-2">
           Execution Core
        </h4>
        <p className="text-xs text-zinc-500 leading-relaxed">
          Schedules utilize <span className="text-zinc-200">Systemd Timer emulation</span> on the Wings node. 
          Task chains are executed atomically. If a task fails, the chain is halted to prevent state corruption.
        </p>
      </div>
    </div>
  );
};

export default ScheduleManager;
