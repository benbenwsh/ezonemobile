const express = require("express");
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const sql = require('mssql');
const cors = require('cors');
const assert = require('assert');
const elasticsearch = require('elasticsearch');
const secretKey = 'mysecretkey';

// set up Elasticsearch client
var elasticClient = new elasticsearch.Client({
  host: 'localhost:9200',
})

app.use(cors());
app.use(express.json());

const config = {
  server: "HKGVSWDEVWEB01",
  port: 1433,
  database: "fotama",
  user: "fotama-user",
  password: "Fotama123!",
  options: {
    trustServerCertificate: true,
  },
};

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = decoded;
    next();
  });
}

sql.connect(config, (err) => {
  if (err) {
    console.error("Error connecting to SQL Server:", err);
  } else {
    console.log("Connected to SQL Server");
  }
});

const mapping = {
  properties: {
    item_id: {type: 'integer'},
    model: {type: 'text'},
    memory: {type: 'text'},
    version: {type: 'text'},
    grade: {type: 'text'},
    colour: {type: 'text'},
    description: {type: 'text'}
  }
};
async function createIndices() {
  try {
    await elasticClient.indices.create({index: 'items', body: {
      mappings: mapping
    }})
  } catch (error) {
    console.error(error.message)
  }
}

async function indexExists() {
  try {
    elasticClient.indices.exists({index: 'items'})
  } catch (error) {
    console.error(error.message)
  }
}

async function bulkIndexing(){
  try {
    const request = new sql.Request();
    const items = await request.query('SELECT item_id, model, memory, version, grade, colour, description FROM items');
    const body = items.recordset.reduce((acc, item) => {
      acc.push({ index: { _index: 'items'} });
      acc.push(item);
      return acc;
    }, []);

    await elasticClient.bulk({
        index: 'items',
        body: body
    });
  } catch (error) {
    console.error(error.message);
  }
}

async function deleteAllIndices() {
  const { body } = await elasticClient.indices.delete({
    index: 'items'
  });
}

async function search(query){
  return new Promise((resolve, reject) => {
    elasticClient.search({ index: 'items', body: {
      query: {
        multi_match: {
          query: query,
          fields: ['model', 'memory', 'version^2', 'grade', 'colour', 'description']
        }
      }
    }}, function(err, resp) {
      if (err) {
        reject(err);
      } else {
        const data = resp.hits.hits.map((item) => item._source.item_id);
        console.log(query)
        console.log('AHHHH')
        console.log(data);
        resolve(data);
      }
    });
  })
}

app.get('/api/data', async (req, res) => {
  // await deleteAllIndices();
  // await createIndices();
  // await bulkIndexing();

  const query = req.query.query;
  const request = new sql.Request();
  // Simplify this
  if (query != '') {
    console.log('query' + query)
    const itemIds = await search(query);
    request.input('item_ids', sql.VarChar, itemIds.join(', '));
    request.query(`SELECT items.*, images.image_data \
    FROM items 
    CROSS APPLY (SELECT  TOP 1 images.image_data FROM images WHERE items.item_id = images.item_id) images \
    WHERE item_id IN (SELECT value FROM STRING_SPLIT(@item_ids, \',\'))`, (error, result) => {
      if (error) {
        console.error('Error executing SELECT:', error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        // Make this more efficient
        const sortedResults = result.recordset.sort((a, b) => itemIds.indexOf(a.item_id) - itemIds.indexOf(b.item_id));
        res.status(200).json(sortedResults);
      }
    })

  } else {
    sql.query("SELECT items.*, images.image_data FROM items CROSS APPLY (SELECT  TOP 1 images.image_data FROM images WHERE items.item_id = images.item_id) images", (error, result) => {
      if (error) {
        console.error('Error executing SELECT:', error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.status(200).json(result.recordset);
      }
    });
  }
});

app.post("/api/signup", async (req, res) => {
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
      chkTerm,
    } = req.body;

    // Hash the email and the password
    const hashedEmail = await bcrypt.hash(email, 10);
    const hashedPassword = await bcrypt.hash(password, 10);

    // Request
    const request = new sql.Request();
    request.input("fName", sql.VarChar, fName);
    request.input("lName", sql.VarChar, lName);
    request.input("email", sql.VarChar, email);
    request.input("hashedPassword", sql.VarChar, hashedPassword);
    request.input("country", sql.VarChar, country);
    request.input("city", sql.VarChar, city);
    request.input("state", sql.VarChar, state);
    request.input("address", sql.VarChar, address);
    request.input("chkTerm", sql.TinyInt, chkTerm);
    request.input("hashedEmail", sql.VarChar, hashedEmail);
    await request.query(`INSERT INTO users (first_name, last_name, email, password, country, city, state, address, chk_term, hash) 
    VALUES (@fName, @lName, @email, @hashedPassword, @country, @city, @state, @address, @chkTerm, @hashedEmail)`);

    // Generate token
    const token = jwt.sign({ email, hashedPassword }, secretKey);
    res.status(200).json({ token: token });
  } catch (error) {
    console.error("Error inserting user:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let correctPassword;

    // Request
    const request = new sql.Request();
    request.input('email', sql.VarChar, email);
    request.query('SELECT password FROM users WHERE email = @email', (err, result) => {
      if (result.length !== 0 && bcrypt.compare(password, result.recordset[0].password)) {
        // Generate a JWT token
        const token = jwt.sign({ email, correctPassword }, secretKey);
        res.status(200).json({ token: token });
      } else {
        res.status(404).json({ error: 'Incorrect email or password.' });
      }
    /api/d});
  } catch (error) {
    console.error("Error inserting user:", error);
    res.status(500).json({ error: "Failed to register user" });
  }

  // Scenarios
  // 1. There is no one with that username
  // 2. There is someone with that username
  // 2a. The password matches that in the database
  // 2b. The password does not match
});

// SELECT items.*, image_data FROM images INNER JOIN items ON (images.item_id = items.item_id)

app.get("/api/item", (req, res) => {
  sql.query(
    `SELECT items.*, image_data FROM images INNER JOIN items ON (images.item_id = items.item_id) WHERE items.item_id = ${req.query.item_id}`,
    (error, result) => {
      if (error) {
        console.error("Error executing SELECT:", error);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.status(200).json(result);
      }
    }
  );
});

app.listen(3001, async () => {
  console.log("Server is running on http://localhost:3001");
  await deleteAllIndices();
  await createIndices();
  await bulkIndexing();
});
