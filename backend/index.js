const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const sql = require('mssql');
const cors = require('cors');
const assert = require('assert');
const elasticsearch = require('elasticsearch');
const secretKey = 'mysecretkey';

// // set up Elasticsearch client
// const esClient = new Client({ node: 'http://10.100.1.205:9200' });
var elasticClient = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
})

app.use(cors());
app.use(express.json());

const config = {
  server: 'HKGVSWDEVWEB01',
  port: 1433,
  database: 'fotama',
  user: 'fotama-user',
  password: 'Fotama123!',
  options: {
    trustServerCertificate: true
  }
};

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = decoded;
    next();
  });
}

sql.connect(config, err => {
  if (err) {
    console.error('Error connecting to SQL Server:', err);
  } else {
    console.log('Connected to SQL Server');
  }
});

async function bulkIndexing(req, res, indexName, docType, payload){
  const items = await sql.query('SELECT * FROM items');
  const body = items.recordset.reduce((acc, item) => {
    acc.push({ index: { _index: 'items'} });
    acc.push(product);
    return acc;
  }, []);
  await elasticClient.bulk({
      index: 'items',
      body: body
  });
}


app.get('/api/data', async (req, res) => {
  // create Elasticsearch index
  await elasticClient.indices.create({
    index: 'items',
  }).then(function (resp) {
	        console.log('YAYYYY');
	        // res.status(200)
	        // return res.json(resp)
	    }, function (err) {
	        console.log(err.message);
	        // res.status(500)
	        // return res.json(err)
	    });

  console.log( 'nihao')

  elasticClient.indices.exists({
	        index: 'items'
	    }).then(function (resp) {
	        console.log(resp);
	        // res.status(200);
	        // return res.json(resp)
	    }, function (err) {
	        console.log(err.message);
	        // res.status(500)
	        // return res.json(err)
	    });
    
  initMapping(req, res, 1, 'text', {} );
  // console.log('hi')
  // // const searchKeywords = searchDoc.nouns().data().map((noun) => noun.normal);
  // sql.query('SELECT * FROM items', (error, result) => {
  //   if (error) {
  //     console.error('Error executing SELECT:', error);
  //     res.status(500).json({ error: 'Internal server error' });
  //   } else {
  //     res.json(result);
  //   }
  // });
});

app.post('/api/signup', async (req, res) => {
  try {
    const {
      fName,
      lName,
      email,
      password,
      country,
      city,
      state,
      address,
      chkTerm
    } = req.body;

    // Hash the email and the password
    const hashedEmail = await bcrypt.hash(email, 10)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Request
    const request = new sql.Request();
    request.input('fName', sql.VarChar, fName);
    request.input('lName', sql.VarChar, lName);
    request.input('email', sql.VarChar, email);
    request.input('hashedPassword', sql.VarChar, hashedPassword);
    request.input('country', sql.VarChar, country);
    request.input('city', sql.VarChar, city);
    request.input('state', sql.VarChar, state);
    request.input('address', sql.VarChar, address);
    request.input('chkTerm', sql.TinyInt, chkTerm);
    request.input('hashedEmail', sql.VarChar, hashedEmail);
    await request.query(`INSERT INTO users (first_name, last_name, email, password, country, city, state, address, chk_term, hash) 
    VALUES (@fName, @lName, @email, @hashedPassword, @country, @city, @state, @address, @chkTerm, @hashedEmail)`);

    // Generate token
    const token = jwt.sign({ email, hashedPassword }, secretKey);
    res.status(200).json({ token: token });
  } catch (error) {
      console.error('Error inserting user:', error);
      res.status(500).json({ error: 'Failed to register user' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    let correctPassword;
    
    // Request
    const request = new sql.Request();
    request.input('email', sql.VarChar, email);
    await request.query('SELECT password FROM users WHERE email = @email', (err, result) => {
      if (result.length !== 0 && bcrypt.compare(password, result.recordset[0].password)) {
        // Generate a JWT token
        const token = jwt.sign({ email, correctPassword }, secretKey);
        res.status(200).json({ token: token });
      } else {
        res.status(404).json({ error: 'Incorrect email or password.' });
      }
    })

  } catch (error) {
    console.error('Error inserting user:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
        
  // Scenarios
  // 1. There is no one with that username
  // 2. There is someone with that username
  // 2a. The password matches that in the database
  // 2b. The password does not match
});

app.get('/api/item', (req, res) => {
  console.log('Error executing SELECT:')
  sql.query(`SELECT * FROM items WHERE id = ${req.query.id}`, (error, result) => {
    if (error) {
      console.error('Error executing SELECT:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json(result);
    }
  });
});

app.listen(3005, () => {
  console.log('Server is running on http://localhost:3001');
});
