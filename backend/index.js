const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const sql = require("mssql");
const cors = require("cors");
const assert = require("assert");
const sharp = require("sharp");

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

app.get("/api/upload-model", async (req, res) => {
  try {
    const compressedImageBuffer = await sharp("c:/SQL_items_img/model_images/iPhone/iPhone_6.jpg")
      .flatten({ background: "white" })
      .toFormat("webp")
      // .jpeg({ quality: 10 }) // You can adjust the quality as needed
      .toBuffer();
    const request = new sql.Request();
    request.input('image', sql.VarBinary(sql.MAX), compressedImageBuffer);
    await request.query(`
      UPDATE models
      SET model_image = @image
      WHERE model_id = 1;
    `);
    console.log('ok??')
  } catch (error) {
    console.error(error)
  }
})

app.get("/api/shop", async (req, res) => {
  try {
    const request = new sql.Request();
    const result = await sql.query(
      "SELECT model_name, model_image FROM models"
    );
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error("Error in Shop: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// this endpoint only get the model name and model image
// stockList page
app.get("/api/model", async (req, res) => {
  try {
    const request = new sql.Request();
    request.input("model_name", sql.VarChar, req.query.model_name);
    const result = await request.query(
      "SELECT * FROM models WHERE model_name = @model_name"
    );
    res.status(200).json(result.recordset[0]);
  } catch (error) {
    console.error("Error in Model:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/model/stockDetails", async (req, res) => {
  try {
    const request = new sql.Request();
    const types = {
      model_id: sql.Int,
      storage: sql.Int,
      grade: sql.VarChar,
      colour: sql.VarChar,
      origin: sql.VarChar,
    };

    const cond = [];
    for (const [key, value] of Object.entries(req.query)) {
      if (value !== "" && key !== "quantity") {
        request.input(key, types[key], value);
        cond.push(`${key} = @${key}`);
      }
    }
    const condStr = cond.join(" AND ");
    let result = (await request.query(`
    SELECT item_id, origin, storage, grade, quantity, colour, price, seller_id \
    FROM items WHERE ${condStr} \
    ORDER BY \
    CASE WHEN price IS NULL THEN 1 ELSE 0 END, \
    price, published_time DESC`)).recordset;

    if (req.query.quantity) {
      let cumulativeSum = 0
      let i = 0;
      while (cumulativeSum < req.query.quantity && i < result.length) {
        cumulativeSum += result[i].quantity
        i++;
      }
      result = result.slice(0, i)
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Error in stockDetails:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

app.get("/api/model/moreDetails", async (req, res) => {
  try {
    const request = new sql.Request();
    request.input("item_id", sql.Int, req.query.item_id);

    // first query
    const itemlInfo = await request.query(
      "SELECT origin, storage, grade, quantity, colour, price, description, seller_id FROM items WHERE item_id=@item_id"
    );

    // second query
    const itemImg = await request.query(
      "SELECT image_data FROM stockLogImg WHERE item_id=@item_id"
    );
    res.status(200).json({
      itemInfo: itemlInfo.recordset[0],
      itemImg: itemImg.recordset,
    });
  } catch (e) {
    console.error("Error in moreDetials", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/filter-options", async (req, res) => {
  try {
    const request = new sql.Request();
    request.input("model_id", sql.Int, req.query.modelId);
    const storages = (
      await request.query(
        "SELECT DISTINCT storage FROM items WHERE model_id = @model_id"
      )
    ).recordset.map((data) => data.storage);
    const grades = (
      await request.query(
        "SELECT DISTINCT grade FROM items WHERE model_id = @model_id"
      )
    ).recordset.map((data) => data.grade);
    const colours = (
      await request.query(
        "SELECT DISTINCT colour FROM items WHERE model_id = @model_id"
      )
    ).recordset.map((data) => data.colour);
    const origins = (
      await request.query(
        "SELECT DISTINCT origin FROM items WHERE model_id = @model_id"
      )
    ).recordset.map((data) => data.origin);
    res.status(200).json({
      storages: storages,
      grades: grades,
      colours: colours,
      origins: origins,
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("/api/upload-options", async (req, res) => {
  try {
    const request = new sql.Request();

    const models = (
      await request.query("SELECT model_id, model_name FROM models")
    ).recordset;
    const sellers = (
      await request.query("SELECT id, company_name FROM sellers")
    ).recordset;
    res.status(200).json({ models: models, sellers: sellers });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/upload", async (req, res) => {
  try {
    const request = new sql.Request();
    const types = {
      model_id: sql.Int,
      seller_id: sql.Int,
      origin: sql.VarChar,
      storage: sql.Int,
      colour: sql.VarChar,
      price: sql.Decimal,
      grade: sql.VarChar,
      quantity: sql.Int,
      description: sql.Text,
    };

    const params = [];
    const cond = [];
    for (const [key, value] of Object.entries(req.body)) {
      if (value !== "") {
        request.input(key, types[key], value);
        params.push(key);
        cond.push(`@${key}`);
      }
    }

    const paramsStr = params.join(", ");
    const condStr = cond.join(", ");
    await request.query(`INSERT INTO items (${paramsStr}) VALUES (${condStr})`);

    res.status(200).end();
  } catch (error) {
    console.error("Error in Upload:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3001, async () => {
  console.log("Server is running on http://localhost:3005");
});
