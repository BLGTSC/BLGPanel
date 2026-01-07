const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { exec } = require('child_process');
const fs = require('fs');
const cors = require('cors');
const os = require('os');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

app.get('/api/stats', (req, res) => {
  res.json({
    cpu: (os.loadavg()[0] * 10).toFixed(1),
    ram: ((os.totalmem() - os.freemem()) / os.totalmem() * 100).toFixed(1),
    uptime: (os.uptime() / 3600).toFixed(1) + " ore",
    os: os.type()
  });
});

server.listen(3001, '0.0.0.0', () => console.log('SERVER ACTIV PE 3001'));
