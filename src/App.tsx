import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({ cpu: '0', ram: '0', uptime: '0 ore' });
  const [terminalOutput, setTerminalOutput] = useState('Consola pregatita...\n');
  const [command, setCommand] = useState('');
  const [files, setFiles] = useState([]);
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

    if (activeTab === 'files') {
      fetch(`${apiUrl}/api/files`).then(r => r.json()).then(setFiles);
    }

    return () => clearInterval(i);
  }, [activeTab]);

  const sendCommand = (e) => {
    e.preventDefault();
    if (socketRef.current && command.trim()) {
      setTerminalOutput(prev => prev + "$ " + command + "\n");
      socketRef.current.emit('input', command);
      setCommand('');
    }
  };

  const navItem = (id, icon, label) => (
    <div onClick={() => setActiveTab(id)} style={{ padding: '14px 20px', margin: '5px 0', cursor: 'pointer', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', transition: '0.3s', background: activeTab === id ? 'rgba(59, 130, 246, 0.1)' : 'transparent', color: activeTab === id ? '#3b82f6' : '#94a3b8' }}>
      <span>{icon}</span> {label}
    </div>
  );

  return (
    <div style={{ display: 'flex', background: '#020617', color: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <div style={{ width: '260px', background: '#0f172a', padding: '30px 20px', borderRight: '1px solid #1e293b' }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#3b82f6', marginBottom: '40px' }}>BLGPANEL</div>
        {navItem('dashboard', '📊', 'Dashboard')}
        {navItem('terminal', '🖥️', 'Terminal SSH')}
        {navItem('files', '📂', 'Manager Fisiere')}
      </div>

      <div style={{ flex: 1, padding: '50px' }}>
        {activeTab === 'dashboard' ? (
          <div>
            <h1>Starea serverului</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              <div style={{ background: '#0f172a', padding: '25px', borderRadius: '20px' }}>
                <p>CPU</p><h2>{stats.cpu}%</h2>
              </div>
              <div style={{ background: '#0f172a', padding: '25px', borderRadius: '20px' }}>
                <p>RAM</p><h2>{stats.ram}%</h2>
              </div>
              <div style={{ background: '#0f172a', padding: '25px', borderRadius: '20px' }}>
                <p>UPTIME</p><h2>{stats.uptime}</h2>
              </div>
            </div>
          </div>
        ) : activeTab === 'terminal' ? (
          <div style={{ height: '80vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, background: '#000', padding: '20px', borderRadius: '15px', color: '#10b981', overflowY: 'auto', fontFamily: 'monospace' }}>
              <pre>{terminalOutput}</pre>
            </div>
            <form onSubmit={sendCommand} style={{ marginTop: '15px' }}>
              <input value={command} onChange={(e) => setCommand(e.target.value)} style={{ width: '100%', background: '#0f172a', border: '1px solid #1e293b', padding: '15px', color: 'white', borderRadius: '10px' }} placeholder="Scrie comanda..." />
            </form>
          </div>
        ) : (
          <div>
            <h1>Fisiere Proiect</h1>
            <div style={{ background: '#0f172a', borderRadius: '15px', padding: '20px' }}>
              {files.map(f => (
                <div key={f.name} style={{ padding: '10px', borderBottom: '1px solid #1e293b' }}>
                  {f.isDir ? '📁' : '📄'} {f.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default App;
