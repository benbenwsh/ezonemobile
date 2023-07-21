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

app.get("/api/shop", async (req, res) => {
  const request = new sql.Request();
  // Simplify this

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
      }
    }
  );
});

app.get("/api/model/stockDetails", async (req, res) => {
  const request = new sql.Request();
  request.input("model_id", sql.VarChar, req.query.model_id);

  request.query(
    "SELECT version, memory, grade, quantity, colour, price, seller_id FROM items WHERE items.model_id = @model_id",
    (err, result) => {
      if (err) {
        console.error("Error executing SELECT:", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.status(200).json(result.recordset);
      }
    }
  );

  // try {
  //   const modelId = req.query.modelId;
  //   const request = new sql.Request();

  //   // Simplify this?
  //   request.input("model_id", sql.Int, modelId);
  //   const cond = ["models.model_id = @model_id"];
  //   if (req.query.memory) {
  //     request.input("memory", sql.VarChar, req.query.memory);
  //     cond.push("memory = @memory");
  //   }
  //   if (req.query.grade) {
  //     request.input("grade", sql.VarChar, req.query.grade);
  //     cond.push("grade = @grade");
  //   }
  //   if (req.query.colour) {
  //     request.input("colour", sql.VarChar, req.query.colour);
  //     cond.push("colour = @colour");
  //   }

  //   const condStr = cond.join(" AND ");

  //   const result = await request.query(`
  //     SELECT item_id, model_name, version, memory, grade, quantity, colour, price, model_image \
  //     FROM models INNER JOIN items ON (models.model_id = items.model_id) \
  //     WHERE ${condStr} \
  //     ORDER BY items.price, items.published_time DESC`);
  //   res.status(200).json(result.recordset);
  // } catch (error) {
  //   console.error("Error :", error);
  //   res.status(500).json({ error: "Failed to register user" });
  // }
});

app.get("/api/model/modelDetails", (req, res) => {});

app.get("/api/upload-options", async (req, res) => {
  const request = new sql.Request();

  const models = (
    await request.query("SELECT model_id, model_name FROM models")
  ).recordset;
  const sellers = (await request.query("SELECT id, company_name FROM sellers"))
    .recordset;
  res.status(200).json({ models: models, sellers: sellers });
});

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
      `INSERT INTO items (model_id, seller_id, version, memory, grade, colour, price, quantity, description) \
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
})

app.listen(3001, async () => {
  console.log("Server is running on http://localhost:3001");
});
