
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ServerCard from './components/ServerCard';
import Terminal from './components/Terminal';
import MetricsCharts from './components/MetricsCharts';
import FileManager from './components/FileManager';
import ResourceCalculator from './components/ResourceCalculator';
import EggConfiguration from './components/EggConfiguration';
import NodeManager from './components/NodeManager';
import DatabaseManager from './components/DatabaseManager';
import BackupManager from './components/BackupManager';
import SubUserManager from './components/SubUserManager';
import NetworkManager from './components/NetworkManager';
import AdminUserManager from './components/AdminUserManager';
import ScheduleManager from './components/ScheduleManager';
import Login from './components/Login';
import { MOCK_SERVERS, MOCK_NODES, MOCK_USERS } from './constants';
import { GameServer, ServerStatus, LogEntry, FileEntry, Node, User } from './types';
/* Added X icon to imports */
import { Search, Bell, ShieldCheck, Cpu, HardDrive, Database, Zap, Plus, RefreshCw, Square, Play, Activity, AlertCircle, Loader2, X } from 'lucide-react';

const MOCK_FILES: FileEntry[] = [
  { name: 'configuration', size: '', modified: '42m ago', isDirectory: true },
  { name: 'system_logs', size: '', modified: '2m ago', isDirectory: true },
  { name: 'blg_config.json', size: '14.2 KB', modified: '1d ago', isDirectory: false },
  { name: 'access_tokens.db', size: '2.4 MB', modified: '5h ago', isDirectory: false },
  { name: 'whitelist.yml', size: '0.8 KB', modified: '14h ago', isDirectory: false },
  { name: 'engine_core.jar', size: '124 MB', modified: '1mo ago', isDirectory: false },
  { name: 'launch_params.sh', size: '1.2 KB', modified: '2w ago', isDirectory: false },
];

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [servers, setServers] = useState<GameServer[]>(MOCK_SERVERS);
  const [nodes, setNodes] = useState<Node[]>(MOCK_NODES);
  const [adminUsers, setAdminUsers] = useState<User[]>(MOCK_USERS);
  const [selectedServerId, setSelectedServerId] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<string>('dashboard');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [metricsHistory, setMetricsHistory] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const selectedServer = servers.find(s => s.id === selectedServerId);

  useEffect(() => {
    if (!isLoggedIn) return;
    const interval = setInterval(() => {
      setMetricsHistory(prev => {
        const newData = {
          time: new Date().toLocaleTimeString(),
          cpu: Math.floor(Math.random() * 40) + 15,
          ram: Math.floor(Math.random() * 300) + 4200,
        };
        const updated = [...prev, newData].slice(-25);
        return updated;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, [isLoggedIn]);

  const handleLogin = (email: string) => {
    const user = MOCK_USERS.find(u => u.email === email) || MOCK_USERS[0];
    setCurrentUser(user);
    setIsLoggedIn(true);
    setActiveView('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setSelectedServerId(null);
    setActiveView('dashboard');
  };

  const handleViewChange = (view: string) => {
    if (view === 'logout') {
      handleLogout();
    } else {
      // If switching to global views, clear selected server
      if (['dashboard', 'nodes', 'billing', 'admin-users'].includes(view)) {
        setSelectedServerId(null);
      }
      setActiveView(view);
    }
  };

  const handleServerAction = (e: React.MouseEvent | null, id: string, action: string) => {
    if (e) e.stopPropagation();
    
    const targetServer = servers.find(s => s.id === id);
    if (targetServer?.status === ServerStatus.INSTALLING) {
       setError("Runtime installation in progress. Manual override locked.");
       return;
    }

    setServers(prev => prev.map(s => {
      if (s.id === id) {
        if (action === 'start') return { ...s, status: ServerStatus.ONLINE };
        if (action === 'stop') return { ...s, status: ServerStatus.OFFLINE };
        if (action === 'restart') return { ...s, status: ServerStatus.STARTING };
      }
      return s;
    }));

    if (id === selectedServerId) {
       const timestamp = new Date().toLocaleTimeString().split(' ')[0];
       setLogs(prev => [...prev, { timestamp, message: `CMD: CONTAINER_${action.toUpperCase()}_SIGNAL_SENT`, type: 'command' }]);
    }
  };

  const handleSendCommand = (cmd: string) => {
    const timestamp = new Date().toLocaleTimeString().split(' ')[0];
    setLogs(prev => [...prev, { timestamp, message: cmd, type: 'command' }]);
    setTimeout(() => {
      setLogs(prev => [...prev, { timestamp, message: `STDOUT: Process response recorded. Check runtime logs for details.`, type: 'info' }]);
    }, 300);
  };

  /* Defined renderErrorState function to fix missing name error */
  const renderErrorState = () => (
    <div className="bg-rose-900/20 border border-rose-500/30 rounded-2xl p-6 flex items-center justify-between animate-in slide-in-from-top-4">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-rose-500/20 rounded-xl flex items-center justify-center text-rose-500">
          <AlertCircle size={24} />
        </div>
        <div>
          <h4 className="text-xs font-black uppercase tracking-widest text-rose-500 mb-1">System Exception</h4>
          <p className="text-sm font-bold text-zinc-300">{error}</p>
        </div>
      </div>
      <button 
        onClick={() => setError(null)}
        className="p-2 hover:bg-rose-500/10 rounded-lg text-rose-500 transition-all"
      >
        <X size={20} />
      </button>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Active Nodes', value: `${nodes.filter(n => n.status === 'online').length} / ${nodes.length}`, icon: Zap, color: 'text-[#ff5f00]' },
          { label: 'Cluster Load', value: '18.4%', icon: Cpu, color: 'text-zinc-100' },
          { label: 'Shared RAM', value: '312 GB', icon: Database, color: 'text-zinc-100' },
          { label: 'Core Uptime', value: '99.99%', icon: HardDrive, color: 'text-emerald-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-[#121212] border border-[#1a1a1a] p-6 rounded-2xl flex items-center gap-6 relative overflow-hidden group hover:border-[#ff5f00]/30 transition-all">
            <div className={`w-14 h-14 rounded-2xl bg-black border border-white/5 flex items-center justify-center ${stat.color} shadow-inner group-hover:scale-110 transition-transform`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.2em] mb-1">{stat.label}</p>
              <p className="text-3xl font-black font-mono tracking-tight">{stat.value}</p>
            </div>
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-[#ff5f00]/2 blur-3xl rounded-full" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
          <div className="flex items-center justify-between border-b border-[#1a1a1a] pb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-3xl font-black tracking-tighter uppercase italic">Instance Fleet</h2>
              <div className="h-4 w-px bg-zinc-800" />
              <span className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em]">Deployment Scan Active</span>
            </div>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-[#ff5f00] text-black font-black uppercase tracking-[0.1em] text-xs rounded-xl hover:bg-[#ff7a29] transition-all shadow-xl shadow-[#ff5f00]/20 active:scale-95">
              <Plus size={16} strokeWidth={3} /> Provision Server
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {servers.map(server => (
              <ServerCard 
                key={server.id} 
                server={server} 
                onClick={(id) => { setSelectedServerId(id); setActiveView('console'); }}
                onAction={handleServerAction}
              />
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-10">
          <ResourceCalculator />
          <div className="bg-[#0c0c0c] border border-[#1a1a1a] rounded-3xl p-8 relative overflow-hidden shadow-2xl">
             <div className="absolute -right-6 -bottom-6 w-40 h-40 bg-[#ff5f00]/5 blur-3xl rounded-full" />
             <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
               <Activity size={16} className="text-[#ff5f00]" /> Operational Status
             </h4>
             <div className="space-y-6 relative z-10">
                <div className="flex justify-between items-center group">
                  <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Master API</span>
                  <span className="flex items-center gap-2 text-xs text-emerald-500 font-black">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/> 
                    ONLINE
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Auth Server</span>
                  <span className="text-xs font-mono font-bold text-zinc-300">STABLE</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Wings gRPC</span>
                  <span className="text-xs font-mono font-bold text-[#ff5f00]">CONNECTED</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderServerView = () => {
    if (!selectedServer) return <div className="p-20 text-center opacity-30 text-sm font-black uppercase tracking-widest">Select an instance to begin session</div>;
    return (
      <div className="space-y-10 animate-in slide-in-from-bottom-8 duration-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#1a1a1a] pb-8">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => { setSelectedServerId(null); setActiveView('dashboard'); }}
              className="w-11 h-11 bg-[#121212] border border-white/5 hover:bg-[#ff5f00] text-zinc-500 hover:text-black rounded-xl flex items-center justify-center transition-all group active:scale-95"
            >
              <span className="text-2xl font-black group-hover:scale-110 transition-transform">←</span>
            </button>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-4xl font-black tracking-tighter uppercase italic">{selectedServer.name}</h2>
                <div className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                  selectedServer.status === ServerStatus.ONLINE ? 'bg-[#ff5f00]/10 text-[#ff5f00] border-[#ff5f00]/30' : 
                  selectedServer.status === ServerStatus.INSTALLING ? 'bg-blue-500/10 text-blue-500 border-blue-500/30' :
                  'bg-zinc-800/10 text-zinc-500 border-white/10'
                }`}>
                  {selectedServer.status}
                </div>
              </div>
              <div className="flex items-center gap-4 text-zinc-600 text-[10px] font-black uppercase tracking-widest">
                <span className="flex items-center gap-1.5 text-[#ff5f00]"><ShieldCheck size={12} /> SECURED</span>
                <span>{selectedServer.ip}:{selectedServer.port}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
             <button 
               onClick={() => handleServerAction(null, selectedServer.id, 'start')}
               disabled={selectedServer.status === ServerStatus.ONLINE || selectedServer.status === ServerStatus.INSTALLING}
               className="flex items-center gap-3 px-6 py-3 bg-[#ff5f00] text-black font-black uppercase tracking-widest text-[11px] rounded-xl hover:bg-[#ff7a29] transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-xl shadow-[#ff5f00]/20 active:scale-95"
             >
               <Play size={16} fill="currentColor" /> Start
             </button>
             <button 
               onClick={() => handleServerAction(null, selectedServer.id, 'restart')}
               disabled={selectedServer.status === ServerStatus.INSTALLING}
               className="flex items-center gap-3 px-6 py-3 bg-zinc-900 border border-white/5 text-zinc-100 font-black uppercase tracking-widest text-[11px] rounded-xl hover:bg-zinc-800 transition-all active:scale-95 disabled:opacity-30"
             >
               <RefreshCw size={16} /> Restart
             </button>
             <button 
               onClick={() => handleServerAction(null, selectedServer.id, 'stop')}
               disabled={selectedServer.status === ServerStatus.OFFLINE || selectedServer.status === ServerStatus.INSTALLING}
               className="flex items-center gap-3 px-6 py-3 bg-rose-900/10 border border-rose-500/20 text-rose-500 font-black uppercase tracking-widest text-[11px] rounded-xl hover:bg-rose-900/40 transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
             >
               <Square size={16} fill="currentColor" /> Stop
             </button>
          </div>
        </div>

        {selectedServer.status === ServerStatus.INSTALLING ? (
          <div className="flex flex-col items-center justify-center p-32 bg-[#121212] border border-[#1a1a1a] rounded-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />
            <Loader2 size={80} className="text-blue-500 animate-spin mb-10 opacity-80" />
            <h2 className="text-4xl font-black uppercase tracking-tighter text-white mb-3 italic">Runtime Assembly</h2>
            <p className="text-zinc-500 text-xs font-black uppercase tracking-[0.4em]">Initializing isolated Docker environment...</p>
          </div>
        ) : (
          <>
            {activeView === 'console' && (
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                <div className="xl:col-span-8 h-[750px]">
                  <Terminal logs={logs} onCommand={handleSendCommand} onClear={() => setLogs([])} />
                </div>
                <div className="xl:col-span-4 space-y-8">
                  <div className="bg-[#121212] border border-[#1a1a1a] rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                       <Activity size={80} className="text-[#ff5f00]" />
                    </div>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-8 flex items-center gap-3 relative z-10">
                      <Activity size={16} className="text-[#ff5f00]" /> Node Utilization
                    </h3>
                    <div className="space-y-8 relative z-10">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                          <span className="text-zinc-500">Host CPU Threading</span>
                          <span className="text-[#ff5f00] font-mono">{selectedServer.status === ServerStatus.ONLINE ? '24.8%' : '0%'}</span>
                        </div>
                        <div className="h-1.5 bg-black rounded-full overflow-hidden border border-white/5 p-0.5">
                          <div 
                            className="h-full bg-gradient-to-r from-[#ff5f00]/50 to-[#ff5f00] rounded-full transition-all duration-1000" 
                            style={{ width: selectedServer.status === ServerStatus.ONLINE ? '24.8%' : '0%' }} 
                          />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                          <span className="text-zinc-500">Host Memory Pool</span>
                          <span className="text-blue-500 font-mono">{selectedServer.status === ServerStatus.ONLINE ? '4.1G / 8G' : '0G / 8G'}</span>
                        </div>
                        <div className="h-1.5 bg-black rounded-full overflow-hidden border border-white/5 p-0.5">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500/50 to-blue-500 rounded-full transition-all duration-1000" 
                            style={{ width: selectedServer.status === ServerStatus.ONLINE ? '51%' : '0%' }} 
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#0c0c0c] border border-l-4 border-l-[#ff5f00] border-[#1a1a1a] p-8 rounded-2xl">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ff5f00] mb-4">Encrypted Identity</h3>
                    <p className="text-xs text-zinc-700 leading-relaxed font-bold font-mono break-all opacity-80">
                      blg_sha256_{selectedServer.id.repeat(4)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeView === 'metrics' && <MetricsCharts history={metricsHistory} />}
            {activeView === 'files' && <FileManager files={MOCK_FILES} />}
            {activeView === 'databases' && <DatabaseManager databases={selectedServer.databases} />}
            {activeView === 'network' && <NetworkManager allocations={selectedServer.allocations} />}
            {activeView === 'schedules' && <ScheduleManager schedules={selectedServer.schedules} />}
            {activeView === 'backups' && <BackupManager backups={selectedServer.backups} />}
            {activeView === 'users' && <SubUserManager users={selectedServer.subusers} />}
            {activeView === 'settings' && (
              <EggConfiguration 
                egg={selectedServer.egg}
                envValues={selectedServer.env_values}
                serverMemory={selectedServer.stats.maxRam}
                onValueChange={() => {}} 
                onSave={() => {}} 
              />
            )}
          </>
        )}
      </div>
    );
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex min-h-screen bg-[#090909] text-zinc-100 selection:bg-[#ff5f00] selection:text-black font-inter">
      <Sidebar 
        activeView={activeView} 
        onViewChange={handleViewChange} 
        selectedServer={!!selectedServerId} 
        userRole={currentUser?.role} 
      />
      <main className="flex-1 flex flex-col">
        <header className="h-20 border-b border-[#1a1a1a] flex items-center justify-between px-10 bg-[#090909]/80 backdrop-blur-xl sticky top-0 z-50">
          <div className="relative w-[450px] hidden md:block group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-[#ff5f00] transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search fleet infrastructure..." 
              className="w-full bg-black border border-[#1a1a1a] rounded-xl py-3 pl-12 pr-6 text-sm focus:outline-none focus:border-[#ff5f00]/30 transition-all placeholder:text-zinc-800 font-bold uppercase tracking-widest text-[10px]"
            />
          </div>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 px-5 py-2 bg-[#121212] border border-white/5 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-[#ff5f00] shadow-[0_0_12px_rgba(255,95,0,0.8)] animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Global Protection Active</span>
            </div>
            <div className="h-10 w-px bg-zinc-900" />
            <div className="flex items-center gap-5 group cursor-pointer">
              <div className="flex flex-col items-end">
                <p className="text-xs font-black text-white group-hover:text-[#ff5f00] transition-colors">{currentUser?.username}</p>
                <p className="text-[9px] font-black text-[#ff5f00] uppercase tracking-widest">{currentUser?.role}</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-[#121212] border border-white/5 p-1 transition-all group-hover:border-[#ff5f00]/50 group-hover:scale-105 overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${currentUser?.username}`} alt="Profile" className="w-full h-full rounded-lg" />
              </div>
            </div>
          </div>
        </header>

        <div className="p-10 max-w-[1700px] mx-auto w-full">
          {error ? (
            <div className="mb-10">
              {renderErrorState()}
            </div>
          ) : null}
          
          {activeView === 'dashboard' && renderDashboard()}
          {activeView === 'nodes' && <NodeManager nodes={nodes} />}
          {activeView === 'admin-users' && <AdminUserManager users={adminUsers} />}
          {!['dashboard', 'nodes', 'admin-users', 'billing'].includes(activeView) && renderServerView()}
        </div>
      </main>
    </div>
  );
};

export default App;
