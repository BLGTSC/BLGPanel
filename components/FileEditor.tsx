
import React, { useState } from 'react';
import { Save, X, Code, FileText, Settings2, Info } from 'lucide-react';

interface FileEditorProps {
  fileName: string;
  initialContent: string;
  onSave: (content: string) => void;
  onClose: () => void;
}

const FileEditor: React.FC<FileEditorProps> = ({ fileName, initialContent, onSave, onClose }) => {
  const [content, setContent] = useState(initialContent);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      onSave(content);
      setIsSaving(false);
    }, 600);
  };

  const lines = content.split('\n');

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="w-full max-w-6xl h-full max-h-[90vh] bg-[#0c0c0c] border border-[#1a1a1a] rounded-3xl flex flex-col shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#ff5f00]" />
        
        <div className="px-8 py-5 border-b border-[#1a1a1a] bg-[#0c0c0c] flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-[#ff5f00]/10 rounded-xl flex items-center justify-center border border-[#ff5f00]/20">
                <Code className="text-[#ff5f00]" size={20} />
             </div>
             <div>
               <h3 className="text-lg font-black text-white tracking-tight flex items-center gap-3">
                 {fileName}
                 <span className="text-[9px] font-black bg-zinc-900 text-zinc-500 px-2 py-0.5 rounded uppercase">Modified</span>
               </h3>
               <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Encrypted IO Stream</p>
             </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#ff5f00] text-black font-black uppercase tracking-[0.1em] text-xs rounded-xl hover:bg-[#ff7a29] transition-all disabled:opacity-50"
            >
              {isSaving ? <Settings2 size={16} className="animate-spin" /> : <Save size={16} />}
              Commit To Disk
            </button>
            <button 
              onClick={onClose}
              className="p-2.5 bg-zinc-900 border border-white/5 text-zinc-500 hover:text-white rounded-xl transition-all"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden relative">
          <div className="w-16 bg-[#090909] border-r border-[#1a1a1a] flex flex-col items-center py-6 select-none font-mono text-[12px] text-zinc-800 leading-[1.6]">
            {lines.map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-1 bg-transparent p-6 font-mono text-[13px] text-zinc-300 leading-[1.6] outline-none resize-none selection:bg-[#ff5f00]/30 selection:text-white"
            spellCheck={false}
          />
        </div>

        <div className="px-8 py-4 border-t border-[#1a1a1a] bg-[#090909] flex items-center justify-between">
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2 text-[10px] font-black text-zinc-600 uppercase tracking-widest">
               <FileText size={12} /> Line count: {lines.length}
             </div>
             <div className="flex items-center gap-2 text-[10px] font-black text-zinc-600 uppercase tracking-widest">
               <Info size={12} /> UTF-8 Encoding
             </div>
          </div>
          <div className="text-[10px] font-black text-[#ff5f00] uppercase tracking-[0.2em] animate-pulse">
            Connection Secured via gRPC
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileEditor;
