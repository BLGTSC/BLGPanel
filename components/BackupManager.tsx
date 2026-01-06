
import React from 'react';
import { Archive, Plus, Download, Trash2, Shield, RefreshCw } from 'lucide-react';
import { Backup } from '../types';

interface BackupManagerProps {
  backups?: Backup[];
}

const BackupManager: React.FC<BackupManagerProps> = ({ backups = [] }) => {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-black tracking-tighter uppercase">Instance Backups</h3>
          <p className="text-xs text-zinc-500 font-bold tracking-widest uppercase">Secure snapshot storage</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-[#ff5f00] text-black font-black uppercase tracking-[0.1em] text-xs rounded-xl hover:bg-[#ff7a29] transition-all">
          <Plus size={16} strokeWidth={3} /> Create Backup
        </button>
      </div>

      <div className="bg-[#121212] border border-[#1a1a1a] rounded-2xl overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#0c0c0c] text-zinc-600 text-[10px] uppercase font-black tracking-[0.2em] border-b border-[#1a1a1a]">
            <tr>
              <th className="px-6 py-4">Snapshot Name</th>
              <th className="px-6 py-4">Size</th>
              <th className="px-6 py-4">Verification Hash</th>
              <th className="px-6 py-4">Timestamp</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1a1a1a]">
            {backups.length > 0 ? backups.map((backup) => (
              <tr key={backup.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-[#ff5f00]/10 border border-[#ff5f00]/20 rounded-lg text-[#ff5f00]">
                      <Archive size={18} />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-zinc-200 group-hover:text-[#ff5f00] transition-colors">{backup.name}</span>
                      <div className="flex items-center gap-1.5 mt-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span className="text-[9px] text-zinc-600 font-black uppercase">Verified</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-[11px] text-zinc-500 font-mono font-bold">
                  {backup.size}
                </td>
                <td className="px-6 py-5">
                   <div className="flex items-center gap-2 px-2 py-0.5 bg-zinc-900 border border-white/5 rounded w-fit">
                      <Shield size={10} className="text-zinc-700" />
                      <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-tighter truncate max-w-[80px]">{backup.checksum}</span>
                   </div>
                </td>
                <td className="px-6 py-5 text-[11px] text-zinc-500 font-medium">
                  {backup.createdAt}
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-emerald-500 transition-colors" title="Restore Snapshot"><RefreshCw size={16} /></button>
                    <button className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-white transition-colors"><Download size={16} /></button>
                    <button className="p-2 hover:bg-rose-500/10 rounded-lg text-rose-500 transition-colors"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} className="px-6 py-20 text-center opacity-40">
                   <Archive size={48} className="mx-auto mb-4 text-zinc-700" />
                   <p className="text-sm font-bold uppercase tracking-widest">No snapshots found for this container</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-[#0c0c0c] border border-l-4 border-l-[#ff5f00] border-[#1a1a1a] p-6 rounded-2xl">
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ff5f00] mb-4">Storage Logic</h4>
        <p className="text-xs text-zinc-500 leading-relaxed font-medium">
          Backups are compressed using <span className="text-zinc-200">tar.gz</span> and uploaded to an encrypted <span className="text-zinc-200">S3 compatible bucket</span>. 
          Restoring will wipe current local data and re-extract the selected snapshot.
        </p>
      </div>
    </div>
  );
};

export default BackupManager;
