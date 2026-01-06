
import React from 'react';
import { Users, Plus, Shield, ShieldAlert, Trash2, Mail } from 'lucide-react';
import { SubUser, Permission } from '../types';

interface SubUserManagerProps {
  users?: SubUser[];
}

const ALL_PERMISSIONS: { id: Permission; label: string }[] = [
  { id: 'view-console', label: 'Console Stream' },
  { id: 'send-commands', label: 'Input Terminal' },
  { id: 'edit-files', label: 'File Manager' },
  { id: 'restart-server', label: 'Process Control' },
  { id: 'manage-backups', label: 'Snapshot Control' },
  { id: 'manage-databases', label: 'SQL Control' },
];

const SubUserManager: React.FC<SubUserManagerProps> = ({ users = [] }) => {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-black tracking-tighter uppercase">Sub-User Delegation</h3>
          <p className="text-xs text-zinc-500 font-bold tracking-widest uppercase">RBAC access control</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-[#ff5f00] text-black font-black uppercase tracking-[0.1em] text-xs rounded-xl hover:bg-[#ff7a29] transition-all">
          <Plus size={16} strokeWidth={3} /> Invite User
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {users.length > 0 ? users.map((user) => (
          <div key={user.id} className="bg-[#121212] border border-[#1a1a1a] rounded-2xl p-8 hover:border-[#ff5f00]/30 transition-all group">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-zinc-950 border border-white/5 rounded-2xl flex items-center justify-center overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${user.email}`} alt="User" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h4 className="text-xl font-bold text-white">{user.email}</h4>
                    <span className="text-[9px] font-black uppercase bg-[#ff5f00]/10 text-[#ff5f00] px-2 py-0.5 rounded border border-[#ff5f00]/20">Active Access</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-xs text-zinc-600 font-medium">
                    <Mail size={14} />
                    <span>Invite accepted 14 days ago</span>
                  </div>
                </div>
              </div>
              <button className="px-5 py-2.5 bg-rose-900/10 border border-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-black font-bold text-xs uppercase tracking-widest rounded-xl transition-all">
                Revoke Session
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {ALL_PERMISSIONS.map((p) => {
                const hasPerm = user.permissions.includes(p.id);
                return (
                  <div key={p.id} className={`p-3 rounded-xl border text-center transition-all ${
                    hasPerm ? 'bg-[#ff5f00]/5 border-[#ff5f00]/20' : 'bg-black/40 border-white/5 opacity-40'
                  }`}>
                    {hasPerm ? <Shield size={14} className="text-[#ff5f00] mx-auto mb-2" /> : <ShieldAlert size={14} className="text-zinc-800 mx-auto mb-2" />}
                    <p className={`text-[9px] font-black uppercase tracking-widest ${hasPerm ? 'text-[#ff5f00]' : 'text-zinc-600'}`}>{p.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )) : (
          <div className="bg-[#121212] border border-dashed border-[#1a1a1a] rounded-2xl p-20 text-center opacity-40">
            <Users size={48} className="mx-auto mb-4 text-zinc-700" />
            <p className="text-sm font-bold uppercase tracking-widest">No sub-users delegated to this instance</p>
          </div>
        )}
      </div>

      <div className="bg-[#0c0c0c] border border-l-4 border-l-rose-500 border-[#1a1a1a] p-6 rounded-2xl">
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-500 mb-4 flex items-center gap-2">
          <ShieldAlert size={14} /> Security Notice
        </h4>
        <p className="text-xs text-zinc-500 leading-relaxed font-medium">
          Delegated users can only access the views allowed by their permission spectrum. 
          <span className="text-zinc-200"> Console Input</span> is particularly sensitive and should only be granted to trusted operators.
        </p>
      </div>
    </div>
  );
};

export default SubUserManager;
