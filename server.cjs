const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Statisici Live (CPU/RAM)
app.get('/api/stats', (req, res) => {
  exec("top -bn1 | grep 'Cpu(s)' | awk '{print $2}'", (err, cpu) => {
    exec("free | grep Mem | awk '{print $3/$2 * 100.0}'", (err, ram) => {
      res.json({
        cpu: parseFloat(cpu || 0).toFixed(1),
        ram: parseFloat(ram || 0).toFixed(1),
        uptime: (process.uptime() / 3600).toFixed(1) + " ore"
      });
    });
  });
});

// Manager Fisiere - Citire director
app.get('/api/files', (req, res) => {
  const dir = req.query.path || '/var/www/BLGPanel';
  fs.readdir(dir, { withFileTypes: true }, (err, files) => {
    if (err) return res.status(500).json(err);
    res.json(files.map(f => ({ name: f.name, isDir: f.isDirectory() })));
  });
});

// Terminal SSH via Socket.io
io.on('connection', (socket) => {
  socket.on('input', (cmd) => {
    exec(cmd, (err, stdout, stderr) => {
      socket.emit('output', stdout || stderr || "\n");
    });
  });
});

server.listen(3001, () => console.log('Backend activ pe portul 3001'));
