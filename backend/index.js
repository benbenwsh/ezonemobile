const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql2');
// const sql = require('mssql');
const cors = require('cors');
const assert = require('assert');
const crypto = require('crypto');

const validationRules = require('../frontend/src/validation-rules');

app.use(cors());
app.use(express.json());

// const config = {
//   user: 'your_username',
//   password: 'your_password',
//   server: 'your_server_address',
//   database: 'your_database_name',
//   options: {
//     encrypt: true // if using Azure SQL Server
//   }
// };

// sql.connect(config, err => {
//   if (err) {
//     console.error('Error connecting to SQL Server:', err);
//   } else {
//     console.log('Connected to SQL Server');
//     // Perform database operations
//   }
// });

// const connection = new sql.Request();
// const query = 'SELECT * FROM your_table';

// connection.query(query, (err, result) => {
//   if (err) {
//     console.error('Error executing query:', err);
//   } else {
//     console.log('Query result:', result);
//     // Process the result
//   }
// });

const connection = mysql.createConnection({
  host: '172.16.1.2',
  // host: '127.0.0.1',
  user: 'fotama',
  password: 'fotama',
  database: 'test',
});

app.get('/api/data', (req, res) => {
  connection.query('SELECT * FROM item', (error, result) => {
    if (error) {
      console.error('Error executing SELECT:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(result);
    }
  });
});

function hashEmail(email) {
  const hashedEmail = crypto
    .createHash('sha256')
    .update(email.toLowerCase().trim())
    .digest('hex');
  
  return hashedEmail;
}

app.post('/api/signup', (req, res) => {
  const {
    fName,
    lName,
    email,
    password,
    country,
    city,
    state,
    address,
    chkTerm,
  } = req.body;
  // Server-side validation
  const validatedEmail = email.toLowerCase();
  
  const isValid = (
    validationRules.isNameValid(fName, lName) &&
    validationRules.isEmailValid(validatedEmail) &&
    validationRules.isPasswordValid(password) &&
    validationRules.isCountryValid(country) &&
    validationRules.isAddressValid(city, state, address) &&
    validationRules.isTermChecked(chkTerm)
  );
  if (!isValid) {
    res.status(404).json({ error: 'Invalid Registration' });
  } else {
    connection.query(
      `
      INSERT INTO users (first_name, last_name, email, password, country, city, state, address, chk_term, hash) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
      `,
      [fName, lName, validatedEmail, password, country, city, state, address, chkTerm, hashEmail(validatedEmail)],
      (error, results) => {
        if (error) {
          console.error('Error inserting user:', error);
          res.status(500).json({ error: 'Failed to register user' });
        } else {
          res.status(200).json({ message: 'User registered successfully' });
        }
      }
    );
  }
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Server-side validation
  // (Should not happen)
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (
    !(emailPattern.test(email) && email.length >= 1 && email.length <= 254) ||
    !(password.length >= 8 && password.length <= 128)
  ) {
    res.status(404).json({ error: 'Invalid email or password' });
  } else {
    connection.query(
      'SELECT password FROM users WHERE email = ?',
      [email],
      (error, result) => {
        if (error) {
          console.error('Error executing SELECT:', error);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          // Check if
          if (result.length !== 0 && result[0].password === password) {
            res.status(200).json({ message: 'Login successful' });
          } else {
            res.status(404).json({ error: 'Incorrect email or password.' });
          }
        }
      }
    );
  }
});

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
