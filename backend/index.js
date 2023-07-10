const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql2');
// const sql = require('mssql');
const cors = require('cors');
const assert = require('assert');

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

// the validation rule
// checking the first name and last name
const isNameValid = (fName, lName) => {
  return (
    fName.length > 1 &&
    fName.length < 50 &&
    lName.length > 1 &&
    lName.length < 50
  );
};

// checking the email and the verify email if the same
const isEmailValid = (email, verifyEmail) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email) && email === verifyEmail;
};

// checking the password
const isPasswordValid = (password) => {
  return password.length >= 8 && password.length <= 128;
};

// checking the if selected valid country
const isCountryValid = (country) => {
  console.log(country !== 'Country');
  return country !== 'Country';
};

// city, state and address are same validation rule
const isAddressValid = (city, state, address) => {
  return (
    city.length >= 1 &&
    city.length <= 128 &&
    state.length >= 1 &&
    state.length <= 128 &&
    address.length >= 1 &&
    address.length <= 128
  );
};

const isTermChecked = (chkTerm) => {
  return chkTerm;
};

const isDisabled = !(
  isNameValid(formValues.fName, formValues.lName) &&
  isEmailValid(formValues.email, formValues.verifyEmail) &&
  isPasswordValid(formValues.password) &&
  isCountryValid(country) &&
  isAddressValid(formValues.city, formValues.state, formValues.address) &&
  isTermChecked(chkTerm)
);

app.post('/api/signup', (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    country,
    city,
    state,
    address,
  } = req.body;

  // Server-side validation
  if (isDisabled) {
    res.status(404).json({ error: 'Invalid Registration' });
  }

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

  // Server-side validation
  // (Should not happen)
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (
    !(emailPattern.test(email) && email.length >= 1 && email.length <= 254) ||
    !(password.length >= 8 && password.length <= 128)
  ) {
    res.status(404).json({ error: 'Invalid email or password' });
  }

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
});

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
