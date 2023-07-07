const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql2');
const cors = require('cors');
const assert = require('assert')

app.use(cors());
app.use(express.json()); 

const connection = mysql.createConnection({
  host: '172.16.1.2',
  user: 'fotama',
  password: 'fotama',
  database: 'test',
});

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

app.post('/api/signup', (req, res) => {
  const { firstName, lastName, email, password, country, city, state, address } = req.body;
  connection.query(
    'INSERT INTO users (first_name, last_name, email, password, country, city, state, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [firstName, lastName, email, password, country, city, state, address],
    (error, results) => {
      if (error) {
        console.error('Error inserting user:', error);
        res.status(500).json({ error: 'Failed to register user' });
      } else {
        res.status(200).json({ message: 'User registered successfully' });
      }
    }
  );
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  connection.query(
    'SELECT password FROM users WHERE email = ?', 
    [email],
    (error, result) => {
      if (error) {
        console.error('Error executing SELECT:', error);
        res.status(500).json({ error: 'Internal server error' });

      } else {
        if (result.length !== 0 && result[0].password === password) {
          res.status(200).json({ message: 'Login successful' });

        } else {
          res.status(404).json({ error: 'Incorrect email or password.' });
        }
        // Scenarios
        // 1. There is no one with that username
        // 2. There is someone with that username
        // 2a. The password matches that in the database
        // 2b. The password does not match
      }
  });
});

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});