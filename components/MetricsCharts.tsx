
import React, { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { History, Zap } from 'lucide-react';

interface MetricsChartsProps {
  history: any[];
}

const MetricsCharts: React.FC<MetricsChartsProps> = ({ history }) => {
  const [viewMode, setViewMode] = useState<'live' | 'history'>('live');

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-end gap-2">
         <button 
          onClick={() => setViewMode('live')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'live' ? 'bg-[#ff5f00] text-black shadow-lg shadow-[#ff5f00]/20' : 'bg-zinc-900 text-zinc-500 hover:text-white border border-white/5'}`}
         >
           <Zap size={14} /> Live Stream
         </button>
         <button 
          onClick={() => setViewMode('history')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'history' ? 'bg-[#ff5f00] text-black shadow-lg shadow-[#ff5f00]/20' : 'bg-zinc-900 text-zinc-500 hover:text-white border border-white/5'}`}
         >
           <History size={14} /> 24h History
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#121212] border border-[#1a1a1a] rounded-xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-8">
             <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Processor Frequency (%)</h4>
             <div className="px-2 py-0.5 bg-[#ff5f00]/10 text-[#ff5f00] text-[9px] font-bold rounded border border-[#ff5f00]/20">
               {viewMode === 'live' ? 'Real-time' : 'Sampled'}
             </div>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={history}>
                <defs>
                  <linearGradient id="cpuGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff5f00" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ff5f00" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" vertical={false} />
                <XAxis dataKey="time" hide />
                <YAxis domain={[0, 100]} stroke="#3f3f3f" fontSize={11} fontWeight="bold" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#090909', border: '1px solid #1a1a1a', borderRadius: '8px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.5)' }}
                  itemStyle={{ color: '#ff5f00' }}
                  cursor={{ stroke: '#ff5f00', strokeWidth: 1 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="cpu" 
                  stroke="#ff5f00" 
                  fillOpacity={1} 
                  fill="url(#cpuGradient)" 
                  strokeWidth={3}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#121212] border border-[#1a1a1a] rounded-xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-8">
             <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">DRAM Utilization (MB)</h4>
             <div className="px-2 py-0.5 bg-blue-500/10 text-blue-500 text-[9px] font-bold rounded border border-blue-500/20">Stable</div>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={history}>
                <defs>
                  <linearGradient id="ramGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" vertical={false} />
                <XAxis dataKey="time" hide />
                <YAxis stroke="#3f3f3f" fontSize={11} fontWeight="bold" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#090909', border: '1px solid #1a1a1a', borderRadius: '8px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.5)' }}
                  itemStyle={{ color: '#3b82f6' }}
                  cursor={{ stroke: '#3b82f6', strokeWidth: 1 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="ram" 
                  stroke="#3b82f6" 
                  fillOpacity={1} 
                  fill="url(#ramGradient)" 
                  strokeWidth={3}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsCharts;
