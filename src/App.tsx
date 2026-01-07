import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({ cpu: '0', ram: '0', uptime: '0 ore' });
  const [terminalOutput, setTerminalOutput] = useState('Consola pregatita...\n');
  const [command, setCommand] = useState('');
  const socketRef = useRef(null);
  const apiUrl = `http://${window.location.hostname}:3001`;

  useEffect(() => {
    const i = setInterval(async () => {
      try {
        const res = await fetch(`${apiUrl}/api/stats`);
        if (res.ok) setStats(await res.json());
      } catch (e) {}
    }, 3000);
    
    if (!socketRef.current) {
      socketRef.current = io(apiUrl);
      socketRef.current.on('output', (data) => setTerminalOutput(prev => prev + data));
    }
    return () => clearInterval(i);
  }, []);

  const sendCommand = (e) => {
    e.preventDefault();
    if (socketRef.current && command.trim()) {
      socketRef.current.emit('input', command + '\n');
      setCommand('');
    }
  };

  const navItem = (id, icon, label) => (
    <div 
      onClick={() => setActiveTab(id)}
      style={{
        padding: '14px 20px',
        margin: '5px 0',
        cursor: 'pointer',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        transition: 'all 0.3s',
        background: activeTab === id ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
        color: activeTab === id ? '#3b82f6' : '#94a3b8',
        fontWeight: activeTab === id ? '600' : '400'
      }}
    >
      <span>{icon}</span> {label}
    </div>
  );

  return (
    <div style={{ display: 'flex', background: '#020617', color: '#f8fafc', minHeight: '100vh', fontFamily: '"Inter", sans-serif' }}>
      <div style={{ width: '280px', background: '#0f172a', padding: '30px 20px', borderRight: '1px solid #1e293b', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '24px', fontWeight: '800', color: '#3b82f6', marginBottom: '40px', paddingLeft: '10px' }}>
          BLG<span style={{color:'#fff'}}>PANEL</span>
        </div>
        <div style={{ flex: 1 }}>
          {navItem('dashboard', '📊', 'Dashboard')}
          {navItem('terminal', '🖥️', 'Terminal SSH')}
          {navItem('files', '📂', 'Manager Fisiere')}
        </div>
        <button style={{ padding: '12px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}>Iesire</button>
      </div>

      <div style={{ flex: 1, padding: '50px', overflowY: 'auto' }}>
        {activeTab === 'dashboard' ? (
          <div>
            <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>Salut, Admin! 👋</h1>
            <p style={{ color: '#94a3b8', marginBottom: '40px' }}>Starea curenta a serverului tau.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px' }}>
              {[
                { label: 'Utilizare CPU', val: stats.cpu + '%', color: '#3b82f6' },
                { label: 'Memorie RAM', val: stats.ram + '%', color: '#8b5cf6' },
                { label: 'Timp de funcționare', val: stats.uptime, color: '#10b981' }
              ].map((card, i) => (
                <div key={i} style={{ background: '#0f172a', padding: '30px', borderRadius: '24px', border: '1px solid #1e293b' }}>
                  <div style={{ color: '#94a3b8', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>{card.label}</div>
                  <div style={{ fontSize: '36px', fontWeight: '800', marginTop: '15px', color: card.color }}>{card.val}</div>
                  <div style={{ width: '100%', height: '6px', background: '#1e293b', borderRadius: '10px', marginTop: '20px', overflow: 'hidden' }}>
                    <div style={{ width: card.val.includes('%') ? card.val : '100%', height: '100%', background: card.color }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ height: '85vh', display: 'flex', flexDirection: 'column' }}>
            <h1 style={{ marginBottom: '30px' }}>{activeTab === 'terminal' ? 'Consola Server' : 'Manager Fisiere'}</h1>
            <div style={{ flex: 1, background: '#000', padding: '25px', borderRadius: '20px', border: '1px solid #1e293b', color: '#10b981', overflowY: 'auto' }}>
              <pre>{terminalOutput}</pre>
            </div>
            {activeTab === 'terminal' && (
              <form onSubmit={sendCommand} style={{ marginTop: '20px' }}>
                <input value={command} onChange={(e) => setCommand(e.target.value)} style={{ width: '100%', background: '#0f172a', border: '1px solid #1e293b', padding: '18px', color: 'white', borderRadius: '15px' }} placeholder="Introdu comanda..." />
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
export default App;
