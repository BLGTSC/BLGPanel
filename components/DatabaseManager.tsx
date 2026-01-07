
import React from 'react';
import { Database as DbIcon, Plus, Copy, Trash2, Key, Info } from 'lucide-react';
import { Database } from '../types';

interface DatabaseManagerProps {
  databases?: Database[];
}

const DatabaseManager: React.FC<DatabaseManagerProps> = ({ databases = [] }) => {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-black tracking-tighter uppercase">Managed Databases</h3>
          <p className="text-xs text-zinc-500 font-bold tracking-widest uppercase">Instance SQL Storage</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-[#ff5f00] text-black font-black uppercase tracking-[0.1em] text-xs rounded-xl hover:bg-[#ff7a29] transition-all">
          <Plus size={16} strokeWidth={3} /> Create Database
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {databases.length > 0 ? databases.map((db) => (
          <div key={db.id} className="bg-[#121212] border border-[#1a1a1a] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-[#ff5f00]/30 transition-all group">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 rounded-xl bg-black border border-white/5 flex items-center justify-center text-[#ff5f00]">
                <DbIcon size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white group-hover:text-[#ff5f00] transition-colors">{db.name}</h4>
                <p className="text-xs font-mono text-zinc-500">{db.host}:{db.port}</p>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="text-center">
                <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">Username</p>
                <div className="flex items-center gap-2 bg-black px-3 py-1 rounded border border-white/5 font-mono text-xs text-zinc-300">
                  {db.username}
                  <Copy size={12} className="text-zinc-700 hover:text-white cursor-pointer" />
                </div>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">Connections</p>
                <p className="text-sm font-black font-mono text-[#ff5f00]">{db.connections}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-3 bg-zinc-950 border border-white/5 text-zinc-500 hover:text-white rounded-xl transition-all" title="Rotation Secret">
                <Key size={16} />
              </button>
              <button className="p-3 bg-rose-900/10 border border-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-black rounded-xl transition-all">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        )) : (
          <div className="bg-[#121212] border border-dashed border-[#1a1a1a] rounded-2xl p-20 text-center opacity-40">
            <DbIcon size={48} className="mx-auto mb-4 text-zinc-700" />
            <p className="text-sm font-bold uppercase tracking-widest">No databases allocated to this instance</p>
          </div>
        )}
      </div>

      <div className="bg-[#0c0c0c] border border-l-4 border-l-amber-500 border-[#1a1a1a] p-6 rounded-2xl flex gap-4">
        <Info className="text-amber-500 shrink-0" />
        <p className="text-xs text-zinc-500 leading-relaxed">
          Databases are created on the node's local <span className="text-zinc-200">MariaDB/MySQL</span> service. 
          Use the details above to connect from your game engine or external management tools like HeidiSQL.
        </p>
      </div>
    </div>
  );
};

export default DatabaseManager;
