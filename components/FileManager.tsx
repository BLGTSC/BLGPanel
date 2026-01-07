
import React, { useState } from 'react';
import { Folder, File, Search, Upload, Plus, Trash2, Edit2, Download, Shield } from 'lucide-react';
import { FileEntry } from '../types';
import FileEditor from './FileEditor';

interface FileManagerProps {
  files: FileEntry[];
}

const FileManager: React.FC<FileManagerProps> = ({ files }) => {
  const [editingFile, setEditingFile] = useState<string | null>(null);

  const handleEdit = (name: string) => {
    setEditingFile(name);
  };

  return (
    <>
      <div className="bg-[#121212] border border-[#1a1a1a] rounded-xl overflow-hidden flex flex-col h-[700px] shadow-2xl animate-in fade-in duration-500">
        <div className="p-5 border-b border-[#1a1a1a] bg-[#0c0c0c] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-zinc-950 rounded-lg flex items-center justify-center border border-white/5">
              <Folder size={20} className="text-[#ff5f00]" />
            </div>
            <div className="flex flex-col">
               <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Container Root</span>
               <div className="flex items-center gap-1.5 text-xs font-bold">
                 <span className="text-zinc-500 hover:text-white cursor-pointer transition-colors">home</span>
                 <span className="text-zinc-800">/</span>
                 <span className="text-[#ff5f00] border-b border-[#ff5f00]/30">container_4421</span>
               </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-700" size={14} />
              <input 
                type="text" 
                placeholder="Filter file entries..."
                className="pl-9 pr-4 py-2 bg-black border border-[#1a1a1a] rounded-lg text-sm focus:border-[#ff5f00]/50 outline-none w-full md:w-64 font-mono transition-all"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-zinc-950 border border-[#1a1a1a] hover:border-zinc-700 text-zinc-400 hover:text-white rounded-lg text-xs font-bold transition-all">
              <Upload size={14} /> Upload
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#ff5f00] text-black text-xs font-black uppercase tracking-widest rounded-lg hover:bg-[#ff7a29] transition-all">
              <Plus size={14} strokeWidth={3} /> New
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-[#0c0c0c] text-zinc-600 text-[10px] uppercase font-black tracking-[0.2em] border-b border-[#1a1a1a] z-10">
              <tr>
                <th className="px-6 py-4 font-black">Entity Name</th>
                <th className="px-6 py-4 font-black">Size</th>
                <th className="px-6 py-4 font-black">Permissions</th>
                <th className="px-6 py-4 font-black">Last Modification</th>
                <th className="px-6 py-4 font-black text-right">Context</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a1a1a]">
              {files.map((file, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${file.isDirectory ? 'bg-amber-500/10 text-amber-500' : 'bg-blue-500/10 text-blue-500'} border border-white/5`}>
                        {file.isDirectory ? <Folder size={18} fill="currentColor" fillOpacity={0.2} /> : <File size={18} fill="currentColor" fillOpacity={0.2} />}
                      </div>
                      <span className="text-sm font-bold text-zinc-300 group-hover:text-[#ff5f00] cursor-pointer transition-colors truncate max-w-[200px]">{file.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[11px] text-zinc-500 font-mono font-bold">
                    {file.isDirectory ? '<DIR>' : file.size}
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex items-center gap-2 px-2 py-0.5 bg-zinc-900 border border-white/5 rounded w-fit">
                        <Shield size={10} className="text-zinc-600" />
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-tighter">755_ROOT</span>
                     </div>
                  </td>
                  <td className="px-6 py-4 text-[11px] text-zinc-500 font-medium">
                    {file.modified}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {!file.isDirectory && (
                        <button 
                          onClick={() => handleEdit(file.name)}
                          className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-white transition-colors"
                        >
                          <Edit2 size={14} />
                        </button>
                      )}
                      <button className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-white transition-colors"><Download size={14} /></button>
                      <button className="p-2 hover:bg-rose-500/10 rounded-lg text-rose-500 transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editingFile && (
        <FileEditor 
          fileName={editingFile}
          initialContent={`# Configuration for ${editingFile}\n# Automatically generated by BLGPanel Core\n\nversion: "1.21"\nserver_name: "Survival Instance"\nmax_players: 50\n\n# Advanced Logic Mapping\nenable_proxy: true\nproxy_address: 192.168.1.100`}
          onSave={(content) => {
            console.log('Saved:', content);
            setEditingFile(null);
          }}
          onClose={() => setEditingFile(null)}
        />
      )}
    </>
  );
};

export default FileManager;
