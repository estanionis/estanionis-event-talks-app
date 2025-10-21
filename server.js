const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// API endpoint to get the talks data
app.get('/api/talks', (req, res) => {
  fs.readFile(path.join(__dirname, 'talks.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading talks data');
      return;
    }
    res.json(JSON.parse(data));
  });
});

// Serve the main index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
