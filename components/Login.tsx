
import React, { useState } from 'react';
import { Lock, Mail, ShieldCheck, ArrowRight, Loader2, Server, Zap } from 'lucide-react';

interface LoginProps {
  onLogin: (email: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tfa, setTfa] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1200);
  };

  const handleTfaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin(email || 'admin@blgpanel.io');
    }, 800);
  };

  const quickLogin = (role: 'admin' | 'user') => {
    setLoading(true);
    setTimeout(() => {
      onLogin(role === 'admin' ? 'alex@blgpanel.io' : 'dev@blgpanel.io');
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#090909] flex flex-col items-center justify-center p-6 selection:bg-[#ff5f00] selection:text-black">
      {/* Background patterns */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#ff5f00]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="mb-12 flex flex-col items-center animate-in fade-in slide-in-from-top-4 duration-1000 relative z-10">
        <div className="w-16 h-16 bg-[#ff5f00] rounded-2xl flex items-center justify-center shadow-2xl shadow-[#ff5f00]/30 mb-6">
          <Server className="text-black w-10 h-10" />
        </div>
        <h1 className="text-4xl font-black tracking-tighter text-white">BLG<span className="text-[#ff5f00]">PANEL</span></h1>
        <p className="text-zinc-600 font-bold uppercase tracking-[0.3em] text-[10px] mt-2">Industrial Container Orchestration</p>
      </div>

      <div className="w-full max-w-md bg-[#121212] border border-[#1a1a1a] rounded-3xl p-10 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-700 z-10">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#ff5f00]" />
        
        {step === 1 ? (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-black text-white tracking-tight uppercase italic">Access Terminal</h2>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-1">Encrypted Session Required</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Identity Endpoint</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-[#ff5f00] transition-colors" size={18} />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="root@blgpanel.io"
                    className="w-full bg-black border border-[#1a1a1a] rounded-xl py-4 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-[#ff5f00]/40 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Master Key</label>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-[#ff5f00] transition-colors" size={18} />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-black border border-[#1a1a1a] rounded-xl py-4 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-[#ff5f00]/40 transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#ff5f00] text-black font-black uppercase tracking-[0.2em] py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-[#ff7a29] transition-all shadow-xl shadow-[#ff5f00]/10 disabled:opacity-50 active:scale-95"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : (
                <>Initialize Auth <ArrowRight size={18} /></>
              )}
            </button>

            <div className="pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
               <button 
                type="button"
                onClick={() => quickLogin('admin')}
                className="py-3 px-4 bg-zinc-900 border border-white/5 rounded-xl text-[9px] font-black uppercase tracking-widest text-zinc-400 hover:text-white hover:border-[#ff5f00]/50 transition-all flex items-center justify-center gap-2"
               >
                 <ShieldCheck size={14} className="text-[#ff5f00]" /> Demo Admin
               </button>
               <button 
                type="button"
                onClick={() => quickLogin('user')}
                className="py-3 px-4 bg-zinc-900 border border-white/5 rounded-xl text-[9px] font-black uppercase tracking-widest text-zinc-400 hover:text-white hover:border-blue-500/50 transition-all flex items-center justify-center gap-2"
               >
                 <Zap size={14} className="text-blue-500" /> Demo User
               </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleTfaSubmit} className="space-y-8 animate-in slide-in-from-right-8 duration-500">
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-500/20">
                <ShieldCheck className="text-amber-500" size={24} />
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight uppercase">2FA Challenge</h2>
              <p className="text-zinc-500 text-xs font-bold uppercase mt-1">Enter your verification token</p>
            </div>

            <div className="space-y-4">
              <input 
                type="text" 
                value={tfa}
                onChange={(e) => setTfa(e.target.value)}
                maxLength={6}
                placeholder="000 000"
                className="w-full bg-black border border-[#1a1a1a] rounded-xl py-5 text-center text-3xl font-black tracking-[0.5em] text-[#ff5f00] focus:outline-none focus:border-[#ff5f00]/40 transition-all font-mono"
                autoFocus
              />
              <p className="text-center text-[9px] text-zinc-700 font-black uppercase tracking-[0.3em]">Hardware key signature required</p>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-white text-black font-black uppercase tracking-[0.2em] py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-zinc-200 transition-all shadow-xl disabled:opacity-50 active:scale-95"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : (
                <>Finalize Handshake <ArrowRight size={18} /></>
              )}
            </button>
          </form>
        )}
      </div>

      <div className="mt-12 flex items-center gap-8 animate-in fade-in duration-1000 delay-500 z-10">
        <div className="flex flex-col items-center">
           <span className="text-[10px] font-black text-zinc-800 uppercase tracking-widest">Protocol</span>
           <span className="text-xs font-bold text-zinc-600">AES-256-GCM</span>
        </div>
        <div className="w-px h-8 bg-zinc-900" />
        <div className="flex flex-col items-center">
           <span className="text-[10px] font-black text-zinc-800 uppercase tracking-widest">Status</span>
           <span className="text-xs font-bold text-emerald-500">All Nodes Secure</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
