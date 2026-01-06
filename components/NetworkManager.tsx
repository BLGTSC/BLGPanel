
import React from 'react';
import { Globe, Plus, Trash2, ShieldCheck, Star, MoreHorizontal, Settings2 } from 'lucide-react';
import { Allocation } from '../types';

interface NetworkManagerProps {
  allocations?: Allocation[];
}

const NetworkManager: React.FC<NetworkManagerProps> = ({ allocations = [] }) => {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-black tracking-tighter uppercase">Network Management</h3>
          <p className="text-xs text-zinc-500 font-bold tracking-widest uppercase">Port assignment & Traffic routing</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-[#ff5f00] text-black font-black uppercase tracking-[0.1em] text-xs rounded-xl hover:bg-[#ff7a29] transition-all">
          <Plus size={16} strokeWidth={3} /> Assign Port
        </button>
      </div>

      <div className="bg-[#121212] border border-[#1a1a1a] rounded-2xl overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#0c0c0c] text-zinc-600 text-[10px] uppercase font-black tracking-[0.2em] border-b border-[#1a1a1a]">
            <tr>
              <th className="px-6 py-4">IP Address</th>
              <th className="px-6 py-4">Port</th>
              <th className="px-6 py-4">Assignment Alias</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1a1a1a]">
            {allocations.length > 0 ? allocations.map((allocation) => (
              <tr key={allocation.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <Globe size={14} className="text-zinc-600" />
                    <span className="text-sm font-mono text-zinc-300">{allocation.ip}</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="text-sm font-black font-mono text-[#ff5f00]">{allocation.port}</span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-zinc-400 group-hover:text-white transition-colors">{allocation.alias || 'No Alias'}</span>
                    {allocation.isPrimary && (
                      <div className="flex items-center gap-1.5 mt-1">
                        <Star size={10} className="text-amber-500 fill-current" />
                        <span className="text-[9px] text-amber-500 font-black uppercase tracking-widest">Primary Port</span>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-5">
                   <div className="flex items-center gap-2 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded w-fit">
                      <ShieldCheck size={10} className="text-emerald-500" />
                      <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-tighter">Active</span>
                   </div>
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-white transition-colors" title="Set as Primary"><Star size={16} /></button>
                    <button className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-white transition-colors" title="Edit Alias"><Settings2 size={16} /></button>
                    <button 
                      disabled={allocation.isPrimary}
                      className={`p-2 rounded-lg transition-colors ${allocation.isPrimary ? 'opacity-20 cursor-not-allowed' : 'hover:bg-rose-500/10 text-rose-500'}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} className="px-6 py-20 text-center opacity-40">
                   <Globe size={48} className="mx-auto mb-4 text-zinc-700" />
                   <p className="text-sm font-bold uppercase tracking-widest">No allocations mapped to this container</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-[#0c0c0c] border border-l-4 border-l-[#ff5f00] border-[#1a1a1a] p-6 rounded-2xl">
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ff5f00] mb-4">Networking Logic</h4>
        <p className="text-xs text-zinc-500 leading-relaxed font-medium">
          Traffic on the above ports is automatically scrubbed via <span className="text-zinc-200">BGP Flowspec</span> and routed into your isolated Docker network. 
          The <span className="text-zinc-200">Primary Port</span> is used for standard service identification.
        </p>
      </div>
    </div>
  );
};

export default NetworkManager;
