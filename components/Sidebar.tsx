
import React from 'react';
import { 
  LayoutGrid, 
  Folder, 
  Database as DbIcon, 
  Calendar, 
  Users, 
  Settings, 
  Terminal,
  Server,
  Activity,
  Box,
  LogOut,
  ShieldCheck,
  Archive,
  Globe,
  UserCheck,
  Clock
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: any) => void;
  selectedServer: boolean;
  userRole?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange, selectedServer, userRole }) => {
  const mainItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'nodes', label: 'System Nodes', icon: Box },
    { id: 'billing', label: 'Financials', icon: DbIcon },
  ];

  if (userRole === 'admin') {
    mainItems.push({ id: 'admin-users', label: 'Manage Users', icon: UserCheck });
  }

  const serverItems = [
    { id: 'console', label: 'Console', icon: Terminal },
    { id: 'files', label: 'Files', icon: Folder },
    { id: 'databases', label: 'Databases', icon: DbIcon },
    { id: 'network', label: 'Networking', icon: Globe },
    { id: 'schedules', label: 'Schedules', icon: Clock },
    { id: 'backups', label: 'Backups', icon: Archive },
    { id: 'metrics', label: 'Analytics', icon: Activity },
    { id: 'users', label: 'Sub-users', icon: Users },
    { id: 'settings', label: 'Parameters', icon: Settings },
  ];

  return (
    <div className="w-64 bg-[#0c0c0c] border-r border-[#1a1a1a] flex flex-col h-full sticky top-0 overflow-y-auto">
      <div className="p-6 flex items-center gap-3">
        <div className="w-9 h-9 bg-[#ff5f00] rounded-lg flex items-center justify-center shadow-lg shadow-[#ff5f00]/20">
          <Server className="text-black w-6 h-6" />
        </div>
        <h1 className="text-xl font-black tracking-tighter text-white">BLG<span className="text-[#ff5f00]">PANEL</span></h1>
      </div>

      <nav className="flex-1 px-4 space-y-8 mt-4">
        <div>
          <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] px-2 mb-4">Core</p>
          <ul className="space-y-1">
            {mainItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    activeView === item.id 
                    ? 'bg-[#ff5f00]/10 text-[#ff5f00]' 
                    : 'text-zinc-500 hover:text-zinc-100 hover:bg-[#121212]'
                  }`}
                >
                  <item.icon size={18} strokeWidth={activeView === item.id ? 2.5 : 2} />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {selectedServer && (
          <div>
            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] px-2 mb-4">Instance Fleet</p>
            <ul className="space-y-1">
              {serverItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onViewChange(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                      activeView === item.id 
                      ? 'bg-[#ff5f00]/10 text-[#ff5f00]' 
                      : 'text-zinc-500 hover:text-zinc-100 hover:bg-[#121212]'
                    }`}
                  >
                    <item.icon size={18} strokeWidth={activeView === item.id ? 2.5 : 2} />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      <div className="p-4 border-t border-[#1a1a1a]">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-[#121212] border border-white/5">
          <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-white/10 flex items-center justify-center overflow-hidden">
            <img src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=alex_stark`} alt="Avatar" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold truncate">alex_stark</p>
            <p className="text-[10px] text-[#ff5f00] font-mono tracking-wider uppercase">{userRole} Session</p>
          </div>
          <button 
            onClick={() => onViewChange('logout')}
            className="text-zinc-600 hover:text-rose-500 transition-colors"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
