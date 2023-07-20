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
  request.query("SELECT model_name, model_image FROM models", (error, result) => {
    if (error) {
      console.error("Error executing SELECT:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      console.log(result)
      res.status(200).json(result.recordset);
    }
  })
});


app.get("/api/model", async (req, res) => {
  try {

    const modelId = req.query.modelId
    const request = new sql.Request();

    // Simplify this?
    request.input("model_id", sql.Int, modelId);
    const cond = ["model_id = @modelId"];
    if (req.query.memory) {
      request.input("memory", sql.VarChar, req.query.memory);
      cond.push("memory = @memory")
    }
    if (req.query.grade) {
      request.input("grade", sql.VarChar, req.query.grade);
      cond.push("grade = @grade")
    }
    if (req.query.colour) {
      request.input("colour", sql.VarChar, req.query.colour);
      cond.push("colour = @colour")
    }
    if (req.query.quantity) {
      request.input("quantity", sql.VarChar, req.query.quantity);
      cond.push("quantity = @quantity")
    }

    const condStr = cond.join(" AND ");

    await request.query(`SELECT item_id, memory, grade, quantity, colour, price FROM items WHERE ${condStr}`)
  } catch (error) {
    console.error("Error inserting user:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

app.listen(3001, async () => {
  console.log("Server is running on http://localhost:3001");
});
