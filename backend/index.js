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
  if (query != "") {
    console.log("query" + query);
    const itemIds = await search(query);
    request.input("item_ids", sql.VarChar, itemIds.join(", "));
    request.query(
      `SELECT items.*, images.image_data \
    FROM items 
    CROSS APPLY (SELECT  TOP 1 images.image_data FROM images WHERE items.item_id = images.item_id) images \
    WHERE item_id IN (SELECT value FROM STRING_SPLIT(@item_ids, \',\'))`,
      (error, result) => {
        if (error) {
          console.error("Error executing SELECT:", error);
          res.status(500).json({ error: "Internal server error" });
        } else {
          // Make this more efficient
          const sortedResults = result.recordset.sort(
            (a, b) => itemIds.indexOf(a.item_id) - itemIds.indexOf(b.item_id)
          );
          res.status(200).json(sortedResults);
        }
      }
    );
  } else {
    sql.query("SELECT model_name, model_image FROM models", (error, result) => {
      if (error) {
        console.error("Error executing SELECT:", error);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.status(200).json(result.recordset);
      }
    });
  }
});

app.get("/api/model", async (req, res) => {
  const request = new sql.Request();
  request.input("model_name", sql.VarChar, req.query.model_name);

  request.query(
    "SELECT model_name, model_image FROM models WHERE model_name = @model_name",
    (err, result) => {
      if (err) {
        console.error("Error executing SELECT:", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.status(200).json(result.recordset[0]);
      }
    }
  );
  try {
    const modelId = req.query.modelId;
    const request = new sql.Request();

    // Simplify this?
    request.input("model_id", sql.Int, modelId);
    const cond = ["model_id = @modelId"];
    if (req.query.memory) {
      request.input("memory", sql.VarChar, req.query.memory);
      cond.push("memory = @memory");
    }
    if (req.query.grade) {
      request.input("grade", sql.VarChar, req.query.grade);
      cond.push("grade = @grade");
    }
    if (req.query.colour) {
      request.input("colour", sql.VarChar, req.query.colour);
      cond.push("colour = @colour");
    }

    const condStr = cond.join(" AND ");

    const result = await request.query(
      `SELECT item_id, memory, grade, quantity, colour, price published_date FROM items WHERE ${condStr} ORDER BY price, published_date DESC`
    );

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error("Error inserting user:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

app.listen(3005, async () => {
  console.log("Server is running on http://localhost:3005");
});
