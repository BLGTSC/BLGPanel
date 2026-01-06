
import React from 'react';
import { Settings, Info, Server, Cpu, Box } from 'lucide-react';
import { PterodactylEgg } from '../types';

interface EggConfigurationProps {
  egg?: PterodactylEgg;
  envValues?: Record<string, string>;
  serverMemory: number;
  onValueChange: (variable: string, value: string) => void;
  onSave: () => void;
}

const EggConfiguration: React.FC<EggConfigurationProps> = ({ 
  egg, 
  envValues, 
  serverMemory,
  onValueChange, 
  onSave 
}) => {
  if (!egg) {
    return (
      <div className="bg-[#121212] border border-[#1a1a1a] rounded-2xl p-10 text-center opacity-50">
        <Box size={48} className="mx-auto mb-4 text-zinc-700" />
        <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm">No configuration egg assigned to this instance</p>
      </div>
    );
  }

  // Helper to replace placeholders in the startup command for preview
  const getProcessedStartup = () => {
    let cmd = egg.startup_command;
    cmd = cmd.replace('{{SERVER_MEMORY}}', serverMemory.toString());
    egg.variables.forEach(v => {
      const val = envValues?.[v.env_variable] || v.default_value;
      cmd = cmd.replace(`{{${v.env_variable}}}`, val);
    });
    return cmd;
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="bg-[#121212] border border-[#1a1a1a] rounded-2xl p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#ff5f00]" />
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-black tracking-tighter uppercase mb-1">Engine Parameters</h3>
            <p className="text-xs text-zinc-500 font-bold tracking-widest uppercase">Configuration based on: {egg.name}</p>
          </div>
          <div className="px-4 py-2 bg-zinc-950 border border-white/5 rounded-xl flex items-center gap-3">
             <Cpu size={16} className="text-[#ff5f00]" />
             <span className="text-[10px] font-mono font-bold text-zinc-400">{egg.docker_image}</span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-black border border-[#1a1a1a] rounded-xl">
            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-3 block">Real-time Startup Preview</label>
            <code className="text-[13px] font-mono text-[#ff5f00] leading-relaxed break-all">
              {getProcessedStartup()}
            </code>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {egg.variables.map((v) => (
              <div key={v.env_variable} className="space-y-3 group">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.15em] flex items-center gap-2">
                    {v.name}
                    {v.rules.includes('required') && <span className="text-[#ff5f00]">*</span>}
                  </label>
                  <div className="relative">
                    <Info size={12} className="text-zinc-700 cursor-help hover:text-[#ff5f00] transition-colors peer" />
                    <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-zinc-900 border border-[#1a1a1a] rounded-lg text-[10px] text-zinc-400 opacity-0 pointer-events-none peer-hover:opacity-100 transition-opacity z-50 shadow-2xl">
                      {v.description}
                    </div>
                  </div>
                </div>
                <input 
                  type="text"
                  value={envValues?.[v.env_variable] || ''}
                  placeholder={v.default_value}
                  disabled={!v.user_editable}
                  onChange={(e) => onValueChange(v.env_variable, e.target.value)}
                  className="w-full bg-black border border-[#1a1a1a] rounded-xl p-4 text-sm font-bold text-zinc-200 outline-none focus:border-[#ff5f00]/40 transition-all disabled:opacity-30"
                />
                <p className="text-[9px] text-zinc-700 font-mono font-bold uppercase tracking-tighter">Env: {v.env_variable}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex justify-end gap-4">
          <button 
            onClick={onSave}
            className="px-10 py-4 bg-[#ff5f00] text-black font-black uppercase tracking-[0.2em] text-xs rounded-xl hover:bg-[#ff7a29] transition-all shadow-xl shadow-[#ff5f00]/20 active:scale-95"
          >
            Commit Changes
          </button>
        </div>
      </div>

      <div className="bg-[#0c0c0c] border border-[#1a1a1a] rounded-2xl p-8 border-l-4 border-l-blue-500 shadow-xl">
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-4 flex items-center gap-2">
          <Server size={14} /> Deployment Layer
        </h4>
        <p className="text-xs text-zinc-500 leading-relaxed font-medium">
          Settings are pushed to the <span className="text-zinc-200">Wings Daemon</span> via gRPC. 
          Containers will be automatically rebuilt upon restart to apply modified environment maps.
        </p>
      </div>
    </div>
  );
};

export default EggConfiguration;
