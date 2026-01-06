
import React from 'react';
import { Users, Plus, Shield, Search, MoreHorizontal, Mail, ShieldAlert, Key, Edit3 } from 'lucide-react';
import { User } from '../types';

interface AdminUserManagerProps {
  users: User[];
}

const AdminUserManager: React.FC<AdminUserManagerProps> = ({ users = [] }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#1a1a1a] pb-8">
        <div>
          <h2 className="text-3xl font-black tracking-tighter uppercase">User Management</h2>
          <p className="text-xs text-zinc-500 font-bold tracking-widest uppercase">Global identity and role delegation</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-[#ff5f00] transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Filter by name or email..." 
              className="bg-black border border-[#1a1a1a] rounded-xl py-2.5 pl-11 pr-6 text-sm text-white focus:outline-none focus:border-[#ff5f00]/30 transition-all font-medium md:w-64"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-[#ff5f00] text-black font-black uppercase tracking-[0.1em] text-xs rounded-xl hover:bg-[#ff7a29] transition-all shadow-xl shadow-[#ff5f00]/20 active:scale-95">
            <Plus size={16} strokeWidth={3} /> Create User
          </button>
        </div>
      </div>

      <div className="bg-[#121212] border border-[#1a1a1a] rounded-3xl overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#0c0c0c] text-zinc-600 text-[10px] uppercase font-black tracking-[0.2em] border-b border-[#1a1a1a]">
            <tr>
              <th className="px-8 py-5">Full Identity</th>
              <th className="px-8 py-5 text-center">Security (2FA)</th>
              <th className="px-8 py-5 text-center">Instance Fleet</th>
              <th className="px-8 py-5">Last Access</th>
              <th className="px-8 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1a1a1a]">
            {users.length > 0 ? users.map((user) => (
              <tr key={user.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-white/5 flex items-center justify-center overflow-hidden">
                      <img src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${user.username}`} alt="User" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-black text-white group-hover:text-[#ff5f00] transition-colors">{user.username}</span>
                        <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${
                          user.role === 'admin' ? 'bg-[#ff5f00]/10 text-[#ff5f00] border border-[#ff5f00]/20' : 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                        }`}>
                          {user.role}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1 text-zinc-600 text-xs">
                        <Mail size={12} />
                        <span className="font-medium">{user.email}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 text-center">
                  <div className="flex justify-center">
                    {user.twoFactorEnabled ? (
                      <div className="flex items-center gap-2 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                        <Shield size={10} className="text-emerald-500" />
                        <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Active</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 px-2.5 py-1 bg-rose-500/10 border border-rose-500/20 rounded-full">
                        <ShieldAlert size={10} className="text-rose-500" />
                        <span className="text-[9px] font-black text-rose-500 uppercase tracking-widest">Disabled</span>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-8 py-6 text-center">
                  <span className="text-sm font-black font-mono text-zinc-400">{user.serverCount}</span>
                </td>
                <td className="px-8 py-6">
                  <span className="text-xs font-bold text-zinc-600">{user.lastLogin}</span>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2.5 bg-zinc-900 border border-white/5 hover:border-[#ff5f00]/40 rounded-xl text-zinc-500 hover:text-[#ff5f00] transition-all" title="Edit Permissions">
                      <Edit3 size={16} />
                    </button>
                    <button className="p-2.5 bg-zinc-900 border border-white/5 hover:border-blue-500/40 rounded-xl text-zinc-500 hover:text-blue-500 transition-all" title="Reset Secret Key">
                      <Key size={16} />
                    </button>
                    <button className="p-2.5 bg-rose-900/10 border border-rose-500/20 hover:bg-rose-500 rounded-xl text-rose-500 hover:text-black transition-all">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} className="px-8 py-20 text-center opacity-40">
                   <Users size={48} className="mx-auto mb-4 text-zinc-700" />
                   <p className="text-sm font-bold uppercase tracking-widest">No identity records found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0c0c0c] border border-[#1a1a1a] p-6 rounded-2xl border-l-4 border-l-[#ff5f00]">
           <h4 className="text-[10px] font-black uppercase text-[#ff5f00] tracking-widest mb-2">Total Managed Users</h4>
           <p className="text-3xl font-black font-mono">1,402</p>
        </div>
        <div className="bg-[#0c0c0c] border border-[#1a1a1a] p-6 rounded-2xl border-l-4 border-l-blue-500">
           <h4 className="text-[10px] font-black uppercase text-blue-500 tracking-widest mb-2">Admin Accounts</h4>
           <p className="text-3xl font-black font-mono">14</p>
        </div>
        <div className="bg-[#0c0c0c] border border-[#1a1a1a] p-6 rounded-2xl border-l-4 border-l-emerald-500">
           <h4 className="text-[10px] font-black uppercase text-emerald-500 tracking-widest mb-2">2FA Adoption</h4>
           <p className="text-3xl font-black font-mono">92%</p>
        </div>
      </div>
    </div>
  );
};

export default AdminUserManager;
