const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const sql = require("mssql");
const cors = require("cors");
const assert = require("assert");
const secretKey = "mysecretkey";

app.use(cors());
app.use(express.json());

// middleware console log where does the user route to
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

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

// shop page
app.get("/api/shop", async (req, res) => {
  const request = new sql.Request();

  sql.query("SELECT model_name, model_image FROM models", (error, result) => {
    if (error) {
      console.error("Error executing SELECT:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(result.recordset);
    }
  });
});

// this endpoint only get the model name and model image
// stockList page
app.get("/api/model", async (req, res) => {
  const request = new sql.Request();
  request.input("model_name", sql.VarChar, req.query.model_name);

  request.query(
    "SELECT * FROM models WHERE model_name = @model_name",
    (err, result) => {
      if (err) {
        console.error("Error executing SELECT:", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.status(200).json(result.recordset[0]);
        console.log(res.status);
      }
    }
  );
});

// stockList page
app.get("/api/model/stockDetails", async (req, res) => {
  try {
    const request = new sql.Request();
    const types = {
      model_id: sql.Int,
      storage: sql.VarChar,
      grade: sql.VarChar,
      colour: sql.VarChar,
      origin: sql.VarChar
    }

    const cond = [];
    for (const [key, value] of Object.entries(req.query)) {
      if (value !== "") {
        request.input(key, types[key], value)
        cond.push(`${key} = @${key}`)
      }
    }
    const condStr = cond.join(" AND ");
    const result = await request.query(`
    SELECT item_id, origin, storage, grade, quantity, colour, price, seller_id \
    FROM items WHERE ${condStr} \
    ORDER BY \
    CASE WHEN price IS NULL THEN 1 ELSE 0 END, \
    price, published_time DESC`);
    
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error("Error :", error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

// moreDetails page
app.get("/api/model/moreDetails", (req, res) => {
  const request = new sql.Request();
  request.input("item_id", sql.Int, req.query.item_id);
  request.query(
    "SELECT origin, storage, grade, quantity, colour, price, description, seller_id FROM items WHERE item_id=@item_id",
    (err, result) => {
      if (err) {
        console.error("Error executing SELECT:", err);
        res.status(500).json({ error: "Internal server error" });
      } else if (result.recordset[0] === undefined) {
        console.log("test");
        res.status(404).json({ error: "Not found in the server" });
      } else {
        res.status(200).json(result.recordset[0]);
      }
    }
  );
});


app.get("/api/filter-options", async (req, res) => {
  try {
    const request = new sql.Request();
    request.input("model_id", sql.Int, req.query.modelId);
    const storages = (
      await request.query("SELECT DISTINCT storage FROM items WHERE model_id = @model_id")
    ).recordset.map((data) => data.storage);
    const grades = (
      await request.query("SELECT DISTINCT grade FROM items WHERE model_id = @model_id")
    ).recordset.map((data) => data.grade);
    const colours = (
      await request.query("SELECT DISTINCT colour FROM items WHERE model_id = @model_id")
    ).recordset.map((data) => data.colour);
    const origins = (
      await request.query("SELECT DISTINCT origin FROM items WHERE model_id = @model_id")
    ).recordset.map((data) => data.origin);
    res.status(200).json({ storages: storages, grades: grades, colours: colours, origins: origins});

  } catch (error) {
    console.error(error)
  }
 });

app.get("/api/upload-options", async (req, res) => {
  const request = new sql.Request();

  const models = (
    await request.query("SELECT model_id, model_name FROM models")
  ).recordset;
  const sellers = (await request.query("SELECT id, company_name FROM sellers"))
    .recordset;
  res.status(200).json({ models: models, sellers: sellers });
});

// upload page
app.post("/api/upload", async (req, res) => {
  try {
    const {
      model,
      seller,
      origin,
      capacity,
      grade,
      colour,
      price,
      quantity,
      description,
    } = req.body;

    const request = new sql.Request();
    request.input("model", sql.Int, model);
    request.input("seller", sql.Int, seller);
    request.input("origin", sql.VarChar, origin);
    request.input("capacity", sql.Int, capacity);
    request.input("grade", sql.VarChar, grade);
    request.input("colour", sql.VarChar, colour);
    request.input("price", sql.Decimal, price);
    request.input("quantity", sql.Int, quantity);
    request.input("description", sql.Text, description);
    request.query(
      `INSERT INTO items (model_id, seller_id, origin, storage, grade, colour, price, quantity, description) \
    VALUES (@model, @seller, @origin, @capacity, @grade, @colour, @price, @quantity, @description)`,
      (err, result) => {
        if (err) {
          console.error("Error executing INSERT:", err);
          res.status(500).json({ error: "Internal server error" });
        } else {
          res.status(200).end();
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error: "Failed to upload" });
  }
});

app.listen(3001, async () => {
  console.log("Server is running on http://localhost:3005");
});
