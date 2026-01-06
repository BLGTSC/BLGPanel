
import React from 'react';
import { Box, Plus, MoreVertical, Wifi, WifiOff, Cpu, Database, HardDrive, MapPin, Activity, Clock } from 'lucide-react';
import { Node } from '../types';

interface NodeManagerProps {
  nodes: Node[];
}

const NodeManager: React.FC<NodeManagerProps> = ({ nodes }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between border-b border-[#1a1a1a] pb-6">
        <div>
          <h2 className="text-3xl font-black tracking-tighter uppercase">Cluster Topology</h2>
          <p className="text-xs text-zinc-500 font-bold tracking-widest uppercase">Admin Infrastructure Dashboard</p>
        </div>
        <div className="flex gap-4">
          <div className="px-4 py-2 bg-[#121212] border border-white/5 rounded-xl hidden md:flex items-center gap-3">
             <Activity size={16} className="text-[#ff5f00]" />
             <div className="flex flex-col">
               <span className="text-[8px] font-black text-zinc-600 uppercase">Cluster Efficiency</span>
               <span className="text-xs font-black font-mono">82.4%</span>
             </div>
          </div>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-[#ff5f00] text-black font-black uppercase tracking-[0.1em] text-xs rounded-xl hover:bg-[#ff7a29] transition-all shadow-xl shadow-[#ff5f00]/20">
            <Plus size={16} strokeWidth={3} /> Provision Node
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {nodes.map((node) => (
          <div key={node.id} className="bg-[#121212] border border-[#1a1a1a] rounded-3xl p-8 hover:border-[#ff5f00]/40 transition-all group relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-32 h-32 blur-[80px] -mr-16 -mt-16 opacity-10 transition-opacity group-hover:opacity-20 ${node.status === 'online' ? 'bg-[#ff5f00]' : 'bg-rose-500'}`} />
            
            <div className="flex justify-between items-start mb-10 relative z-10">
              <div className="flex items-center gap-5">
                <div className={`w-14 h-14 rounded-2xl bg-black border border-white/5 flex items-center justify-center ${node.status === 'online' ? 'text-[#ff5f00]' : 'text-zinc-800'}`}>
                  {node.status === 'online' ? <Wifi size={28} /> : <WifiOff size={28} />}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-black text-white tracking-tight">{node.name}</h3>
                    <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${node.status === 'online' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'}`}>
                      <div className={`w-1 h-1 rounded-full ${node.status === 'online' ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                      {node.status}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-[11px] font-mono text-zinc-500 font-bold tracking-tight">{node.ip}:{node.port}</span>
                    <div className="flex items-center gap-1.5 text-zinc-600">
                      <MapPin size={10} />
                      <span className="text-[10px] font-black uppercase tracking-widest">{node.location}</span>
                    </div>
                  </div>
                </div>
              </div>
              <button className="p-2.5 hover:bg-zinc-800 rounded-xl text-zinc-600 hover:text-white transition-all">
                <MoreVertical size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 relative z-10">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-zinc-600">
                  <span className="flex items-center gap-2"><Cpu size={12} className="text-[#ff5f00]" /> Host CPU Occupancy</span>
                  <span className="text-[#ff5f00] font-mono text-sm">{node.load}%</span>
                </div>
                <div className="h-2 bg-black rounded-full overflow-hidden border border-white/5 p-0.5">
                  <div 
                    className="h-full bg-gradient-to-r from-[#ff5f00]/50 to-[#ff5f00] rounded-full transition-all duration-1000"
                    style={{ width: `${node.load}%` }}
                  />
                </div>
                <div className="flex justify-between text-[8px] font-black text-zinc-800 uppercase tracking-widest">
                  <span>Threads: {node.totalCpuCores * 2}</span>
                  <span>Cores: {node.totalCpuCores}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-zinc-600">
                  <span className="flex items-center gap-2"><Database size={12} className="text-blue-500" /> Host Memory Depth</span>
                  <span className="text-blue-500 font-mono text-sm">{node.usedRamGb.toFixed(1)} / {node.totalRamGb} GB</span>
                </div>
                <div className="h-2 bg-black rounded-full overflow-hidden border border-white/5 p-0.5">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500/50 to-blue-500 rounded-full transition-all duration-1000"
                    style={{ width: `${(node.usedRamGb / node.totalRamGb) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[8px] font-black text-zinc-800 uppercase tracking-widest">
                  <span>Free: {(node.totalRamGb - node.usedRamGb).toFixed(1)} GB</span>
                  <span>Total: {node.totalRamGb} GB</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-white/5 relative z-10">
              <div className="flex items-center gap-6">
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest mb-1">Disk Storage</span>
                  <div className="flex items-center gap-2 text-xs font-black font-mono">
                    <HardDrive size={12} className="text-emerald-500" />
                    {node.disk}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest mb-1">Host Uptime</span>
                  <div className="flex items-center gap-2 text-xs font-black font-mono">
                    <Clock size={12} className="text-zinc-500" />
                    {node.uptime}
                  </div>
                </div>
              </div>
              <div className="px-4 py-2 bg-black rounded-xl border border-white/5 text-[9px] font-black text-[#ff5f00] uppercase tracking-widest group-hover:border-[#ff5f00]/30 transition-all">
                Wings v2.4.1 Connected
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NodeManager;
