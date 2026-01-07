import React from 'react';

const Sidebar = () => {
  return (
    <div style={{ width: '250px', background: '#111', height: '100vh', padding: '20px', borderRight: '1px solid #333' }}>
      <h2 style={{ color: '#3b82f6', marginBottom: '30px' }}>BLGPanel</h2>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div style={{ color: '#3b82f6', cursor: 'pointer', padding: '10px', background: '#1a1a1a', borderRadius: '4px' }}>📊 Dashboard</div>
        <div style={{ color: '#888', cursor: 'pointer', padding: '10px' }}>🖥️ Server Management</div>
        <div style={{ color: '#888', cursor: 'pointer', padding: '10px' }}>📁 File Manager</div>
        <div style={{ color: '#888', cursor: 'pointer', padding: '10px' }}>⚙️ Settings</div>
      </nav>
    </div>
  );
};

export default Sidebar;
