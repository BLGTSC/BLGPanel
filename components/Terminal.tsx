
import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, Send, Copy, Trash2, Cpu } from 'lucide-react';
import { LogEntry } from '../types';

interface TerminalProps {
  logs: LogEntry[];
  onCommand: (cmd: string) => void;
  onClear: () => void;
}

const Terminal: React.FC<TerminalProps> = ({ logs, onCommand, onClear }) => {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onCommand(input.trim());
      setInput('');
    }
  };

  const getTypeColor = (type: LogEntry['type']) => {
    switch (type) {
      case 'error': return 'text-rose-500';
      case 'warn': return 'text-amber-500';
      case 'command': return 'text-[#ff5f00] font-bold';
      default: return 'text-zinc-400';
    }
  };

  return (
    <div className="flex flex-col h-full min-h-[500px] bg-black border border-[#1a1a1a] rounded-xl overflow-hidden shadow-2xl">
      <div className="px-5 py-3 border-b border-[#1a1a1a] bg-[#0c0c0c] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#ff5f00] shadow-[0_0_8px_rgba(255,95,0,0.6)] animate-pulse" />
          <span className="text-xs font-black tracking-[0.1em] text-zinc-400 uppercase flex items-center gap-2">
            <TerminalIcon size={14} className="text-[#ff5f00]" />
            Live Instance Terminal
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1.5 hover:bg-zinc-800 rounded transition-colors text-zinc-600 hover:text-zinc-300" title="Copy History">
            <Copy size={14} />
          </button>
          <button onClick={onClear} className="p-1.5 hover:bg-zinc-800 rounded transition-colors text-zinc-600 hover:text-rose-500" title="Flush Console">
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 font-mono text-[13px] leading-relaxed space-y-1.5 selection:bg-[#ff5f00]/30 selection:text-white custom-scrollbar"
      >
        {logs.map((log, i) => (
          <div key={i} className="flex gap-4 group">
            <span className="text-zinc-700 select-none shrink-0 font-medium">[{log.timestamp}]</span>
            <span className={getTypeColor(log.type)}>
              {log.type === 'command' && <span className="text-zinc-600 mr-2">user@blgpanel:~$</span>}
              {log.message}
            </span>
          </div>
        ))}
        {logs.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center opacity-20 select-none space-y-4">
            <div className="w-16 h-16 bg-[#1a1a1a] rounded-full flex items-center justify-center border border-white/5">
              <Cpu size={32} className="text-[#ff5f00]" />
            </div>
            <p className="text-sm font-bold uppercase tracking-widest">Waiting for process feed...</p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 bg-[#0c0c0c] border-t border-[#1a1a1a] flex items-center gap-4">
        <div className="flex items-center gap-3 text-[#ff5f00] font-mono text-sm shrink-0 font-black">
          <span className="text-zinc-700">user@blgpanel:~$</span>
        </div>
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Execute container command..."
          className="flex-1 bg-transparent border-none outline-none font-mono text-sm text-zinc-100 placeholder-zinc-800"
          autoFocus
        />
        <button 
          type="submit"
          className="px-4 py-1.5 bg-[#ff5f00] text-black text-[11px] font-black uppercase tracking-widest rounded-md hover:bg-[#ff7a29] transition-all shadow-lg shadow-[#ff5f00]/10"
        >
          Execute
        </button>
      </form>
    </div>
  );
};

export default Terminal;
