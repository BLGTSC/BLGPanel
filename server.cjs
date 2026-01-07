const express = require('express');
const { exec, spawn } = require('child_process');
const http = require('http');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Obiect pentru a stoca procesele active
let activeProcesses = {};
let servers = {
  "survival": { name: "Survival Vanilla", status: "OFFLINE", cpu: 0, mem: 0 },
  "lobby": { name: "Lobby Primary", status: "OFFLINE", cpu: 0, mem: 0 }
};

app.get('/api/servers', (req, res) => res.json(servers));

app.post('/api/command', (req, res) => {
  const { id, action } = req.body;
  
  if (action === 'start' && servers[id].status === "OFFLINE") {
    // Aici pornești procesul real (exemplu: un script sau java)
    // activeProcesses[id] = spawn('java', ['-Xmx1G', '-jar', 'server.jar'], { cwd: '/cale/catre/server' });
    
    servers[id].status = "ONLINE";
    servers[id].cpu = 15; // Simulat pana la integrarea 'pidusage'
  } else if (action === 'stop') {
    // if (activeProcesses[id]) activeProcesses[id].kill();
    servers[id].status = "OFFLINE";
    servers[id].cpu = 0;
  }
  
  res.json(servers[id]);
});

const server = http.createServer(app);
server.listen(3001, () => console.log('Nexus Backend Pro activ'));
