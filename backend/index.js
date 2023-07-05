const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});