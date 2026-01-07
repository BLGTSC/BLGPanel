
import React, { useState } from 'react';
import { Calculator, Zap, Cpu, HardDrive } from 'lucide-react';

const ResourceCalculator: React.FC = () => {
  const [ram, setRam] = useState(8);
  const [cpu, setCpu] = useState(4);
  const [disk, setDisk] = useState(100);

  const calculatePrice = () => {
    return (ram * 1.8 + cpu * 2.5 + disk * 0.08).toFixed(2);
  };

  return (
    <div className="bg-[#121212] border border-[#1a1a1a] rounded-xl p-6 shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
         <Calculator size={80} className="text-[#ff5f00]" />
      </div>

      <div className="flex items-center gap-3 mb-8 relative z-10">
        <div className="w-8 h-8 rounded-lg bg-[#ff5f00]/10 flex items-center justify-center border border-[#ff5f00]/20">
          <Calculator className="text-[#ff5f00]" size={16} />
        </div>
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white">Resource Estimator</h3>
      </div>

      <div className="space-y-8 relative z-10">
        <div className="space-y-4">
          <div className="flex justify-between text-[10px] font-black text-zinc-500 uppercase tracking-widest">
            <span className="flex items-center gap-2"><Zap size={12} className="text-[#ff5f00]" /> Dynamic RAM</span>
            <span className="text-[#ff5f00] font-mono text-xs">{ram} GB</span>
          </div>
          <input 
            type="range" min="1" max="128" value={ram} 
            onChange={(e) => setRam(parseInt(e.target.value))}
            className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#ff5f00]"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between text-[10px] font-black text-zinc-500 uppercase tracking-widest">
            <span className="flex items-center gap-2"><Cpu size={12} className="text-[#ff5f00]" /> Virtual Cores</span>
            <span className="text-[#ff5f00] font-mono text-xs">{cpu} Threads</span>
          </div>
          <input 
            type="range" min="1" max="32" value={cpu} 
            onChange={(e) => setCpu(parseInt(e.target.value))}
            className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#ff5f00]"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between text-[10px] font-black text-zinc-500 uppercase tracking-widest">
            <span className="flex items-center gap-2"><HardDrive size={12} className="text-[#ff5f00]" /> NVMe Storage</span>
            <span className="text-[#ff5f00] font-mono text-xs">{disk} GB</span>
          </div>
          <input 
            type="range" min="10" max="1000" step="10" value={disk} 
            onChange={(e) => setDisk(parseInt(e.target.value))}
            className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#ff5f00]"
          />
        </div>

        <div className="pt-6 border-t border-white/5 mt-4 flex items-center justify-between">
          <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Est. Monthly Rate</div>
          <div className="text-3xl font-black font-mono text-white tracking-tighter">
            <span className="text-sm text-zinc-600 font-bold mr-1">$</span>{calculatePrice()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceCalculator;
