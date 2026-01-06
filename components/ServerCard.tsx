
import React from 'react';
import { Play, Square, RotateCw, Globe, Copy, MoreHorizontal, Activity } from 'lucide-react';
import { GameServer, ServerStatus } from '../types';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';

interface ServerCardProps {
  server: GameServer;
  onClick: (id: string) => void;
  onAction: (e: React.MouseEvent, id: string, action: string) => void;
}

const ServerCard: React.FC<ServerCardProps> = ({ server, onClick, onAction }) => {
  const statusColors = {
    [ServerStatus.ONLINE]: 'bg-[#ff5f00] shadow-[#ff5f00]/50',
    [ServerStatus.OFFLINE]: 'bg-zinc-700 shadow-zinc-700/50',
    [ServerStatus.STARTING]: 'bg-[#ff5f00] shadow-[#ff5f00]/50 animate-pulse',
    [ServerStatus.STOPPING]: 'bg-rose-500 shadow-rose-500/50'
  };

  const sparklineData = (server.stats?.cpu || []).map((val, i) => ({ val, i }));

  const copyIp = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`${server.ip}:${server.port}`);
  };

  return (
    <div 
      onClick={() => onClick(server.id)}
      className="group relative bg-[#121212] border border-[#1a1a1a] rounded-xl p-5 hover:border-[#ff5f00]/40 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-2 h-2 rounded-full shadow-sm ${statusColors[server.status]}`} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">{server.status}</span>
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-[#ff5f00] transition-colors truncate">{server.name}</h3>
          <button 
            onClick={copyIp}
            className="text-[11px] text-zinc-500 hover:text-white flex items-center gap-2 mt-1.5 font-mono transition-colors"
          >
            <Globe size={12} className="text-zinc-600" />
            {server.ip}:{server.port}
            <Copy size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={(e) => onAction(e, server.id, 'start')}
            className="w-9 h-9 bg-zinc-950 border border-white/5 text-zinc-500 hover:text-[#ff5f00] hover:border-[#ff5f00]/30 rounded-lg flex items-center justify-center transition-all"
          >
            <Play size={14} fill="currentColor" />
          </button>
          <button 
            onClick={(e) => onAction(e, server.id, 'stop')}
            className="w-9 h-9 bg-zinc-950 border border-white/5 text-zinc-500 hover:text-rose-500 hover:border-rose-500/30 rounded-lg flex items-center justify-center transition-all"
          >
            <Square size={14} fill="currentColor" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="bg-black/20 p-3 rounded-lg border border-white/5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[9px] text-zinc-500 uppercase font-black tracking-widest">CPU LOAD</span>
            <span className="font-mono text-[10px] text-[#ff5f00] font-bold">
              {server.status === ServerStatus.ONLINE ? `${server.stats.cpu[server.stats.cpu.length - 1]}%` : '0%'}
            </span>
          </div>
          <div className="h-8 w-full opacity-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineData}>
                <YAxis domain={[0, 100]} hide />
                <Line 
                  type="monotone" 
                  dataKey="val" 
                  stroke={server.status === ServerStatus.ONLINE ? "#ff5f00" : "#27272a"} 
                  strokeWidth={2} 
                  dot={false} 
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-black/20 p-3 rounded-lg border border-white/5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[9px] text-zinc-500 uppercase font-black tracking-widest">MEMORY</span>
            <span className="font-mono text-[10px] text-[#ff5f00] font-bold">
              {server.status === ServerStatus.ONLINE ? `${(server.stats.ram / 1024).toFixed(1)}G` : '0G'}
            </span>
          </div>
          <div className="h-1 bg-zinc-800 rounded-full mt-3 overflow-hidden">
            <div 
              className="h-full bg-[#ff5f00] shadow-[0_0_8px_rgba(255,95,0,0.5)] rounded-full transition-all duration-700" 
              style={{ width: server.status === ServerStatus.ONLINE ? `${(server.stats.ram / server.stats.maxRam) * 100}%` : '0%' }}
            />
          </div>
          <p className="text-[8px] text-zinc-600 font-bold uppercase tracking-widest mt-2 text-right">
             Limit: {(server.stats.maxRam / 1024).toFixed(1)} GB
          </p>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
        <div className="flex items-center gap-2">
           <div className="w-5 h-5 bg-zinc-900 rounded border border-white/5 flex items-center justify-center">
             <Activity size={10} className="text-zinc-500" />
           </div>
           <span className="text-[9px] text-zinc-500 font-black uppercase tracking-widest">{server.game}</span>
        </div>
        <div className="font-mono text-[10px] text-zinc-700">#INST-{server.id.substring(0, 4)}</div>
      </div>
    </div>
  );
};

export default ServerCard;
