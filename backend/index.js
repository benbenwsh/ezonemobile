const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql2');
const cors = require('cors');

app.use(cors());

const connection = mysql.createConnection({
  host: '172.16.1.2',
  user: 'fotama',
  password: 'fotama',
  database: 'test',
});

// // Code for Testing
// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL:', err);
//     return;
//   }
//   console.log('Connected to MySQL server');
// });

// connection.query('SELECT * FROM item', (err, results) => {
//   if (err) {
//     console.error('Error executing query:', err);
//     return;
//   }
//   console.log('Query results:', results);
// });

// connection.end((err) => {
//   if (err) {
//     console.error('Error closing connection:', err);
//     return;
//   }
//   console.log('Connection closed');
// });


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