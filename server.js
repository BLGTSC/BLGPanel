const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

const rootPath = '/var/www/BLGPanel';

app.get('/api/files', (req, res) => {
  fs.readdir(rootPath, (err, files) => {
    if (err) return res.status(500).json([]);
    const list = files.map(f => ({
      name: f,
      isDirectory: fs.lstatSync(path.join(rootPath, f)).isDirectory()
    }));
    res.json(list);
  });
});

app.get('/api/files/read', (req, res) => {
  const filePath = path.join(rootPath, req.query.name);
  if (fs.existsSync(filePath)) {
    res.send(fs.readFileSync(filePath, 'utf8'));
  } else {
    res.status(404).send('File not found');
  }
});

app.post('/api/files/save', (req, res) => {
  const filePath = path.join(rootPath, req.body.name);
  fs.writeFileSync(filePath, req.body.content);
  res.send('Saved');
});

app.listen(3001, () => console.log('API on 3001'));
