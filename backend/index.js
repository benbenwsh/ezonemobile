const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const cors = require('cors');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'fotama',
  database: 'test',
});

app.use(cors());

app.get('/api/data', (req, res) => {
  connection.query("SELECT * FROM item", (error, result) => {
    if (error) {
      console.error('Error executing SELECT:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(result);
    }
  });
});

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});