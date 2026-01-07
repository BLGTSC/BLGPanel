import React, { useState, useEffect } from 'react';

function App() {
  const [servers, setServers] = useState({});
  const apiUrl = `http://${window.location.hostname}:3001`;

  const fetchServers = () => {
    fetch(`${apiUrl}/api/servers`).then(res => res.json()).then(setServers);
  };

  useEffect(() => {
    fetchServers();
    const interval = setInterval(fetchServers, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleAction = (id, action) => {
    fetch(`${apiUrl}/api/command`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, action })
    }).then(fetchServers);
  };

  const ServerCard = ({ id, data }) => (
    <div style={{ background: '#111', border: '1px solid #222', borderRadius: '12px', padding: '20px', width: '300px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
        <div>
          <div style={{ color: data.status === "ONLINE" ? "#ff6600" : "#666", fontSize: '10px', fontWeight: 'bold' }}>● {data.status}</div>
          <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{data.name}</div>
        </div>
        <div style={{ display: 'flex', gap: '5px' }}>
          <button onClick={() => handleAction(id, 'start')} style={{ background: '#222', cursor: 'pointer', color: 'white', padding: '5px 10px', borderRadius: '5px' }}>▶</button>
          <button onClick={() => handleAction(id, 'stop')} style={{ background: '#222', cursor: 'pointer', color: 'white', padding: '5px 10px', borderRadius: '5px' }}>■</button>
        </div>
      </div>
      <div>
        <div style={{ fontSize: '10px', color: '#555' }}>CPU LOAD <span style={{color:'#ff6600'}}>{data.cpu}%</span></div>
        <div style={{ height: '4px', background: '#222', marginTop: '5px', borderRadius: '2px' }}>
          <div style={{ width: data.cpu+'%', height: '100%', background: '#ff6600' }}></div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', background: '#000', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <div style={{ width: '240px', background: '#080808', padding: '20px', borderRight: '1px solid #111' }}>
        <div style={{ color: '#ff6600', fontWeight: 'bold', fontSize: '20px', marginBottom: '40px' }}>BLGPANEL</div>
        <div style={{ padding: '10px', color: '#ff6600', background: 'rgba(255,64,0,0.1)', borderRadius: '8px' }}>Dashboard</div>
      </div>
      <div style={{ flex: 1, padding: '40px' }}>
        <div style={{ display: 'flex', gap: '20px' }}>
          {Object.entries(servers).map(([id, data]) => (
            <ServerCard key={id} id={id} data={data} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default App;
