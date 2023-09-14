const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const sql = require("mssql");
const cors = require("cors");
const sharp = require("sharp");
const fs = require("fs");

const multer = require("multer")
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images")
  },
  filename: (req, file, cb) => {
    console.log(`file: ${file}`)
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({storage: storage})

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
  }
};

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorisation;
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

// app.get("/api/upload-model", (req, res) => {
//   try {
//     const imageDirectory = "c:/SQL_items_img/model_images/Mac/"
//     fs.readdir(imageDirectory, async (err, files) => {
//       if (err) {
//         console.error('Error reading image directory:', err);
//       } else {
//         let i = 34;
//         files.sort((a, b) => {
//           return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
//         });
//         for (const file of files) {
//           const imagePath = path.join(imageDirectory, file);
//           const compressedImageBuffer = await sharp(imagePath)
//           .flatten({ background: "white" })
//           .toFormat("webp")
//           .toBuffer();

//           // Insert image into the database
//           const request = new sql.Request();
//           request.input('image', sql.VarBinary(sql.MAX), compressedImageBuffer);
//           request.input('model_name', sql.VarChar, file.substring(0, file.length - 4))
//           console.log(i)
//           console.log(file)
//           request.input('model_id', sql.Int, i)
//           try {
//             await request.query(`
//               UPDATE models
//               SET model_image = @image, model_name = @model_name
//               WHERE model_id = @model_id;
//             `);
//             i = i+1;
//             console.log('Compression success')
//           } catch (error) {
//             console.error(error)
//           }
//         };
//       }
//     });
//   } catch (error) {
//     console.error(error)
//   }
// })

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
    let result = (
      await request.query(`
        SELECT item_id, origin, storage, grade, quantity, colour, price, seller_id \
        FROM items WHERE ${condStr} \
        ORDER BY \
        CASE WHEN price IS NULL THEN 1 ELSE 0 END, \
        price, published_time DESC`)
    ).recordset;

    if (req.query.quantity) {
      let cumulativeSum = 0;
      let i = 0;
      while (cumulativeSum < req.query.quantity && i < result.length) {
        cumulativeSum += result[i].quantity;
        i++;
      }
      result = result.slice(0, i);
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
    const itemInfo = (await request.query(`
      SELECT origin, storage, grade, quantity, colour, price, description, seller_id, image_data
      FROM items
      LEFT JOIN items_images
      ON items.item_id = items_images.item_id
      LEFT JOIN images
      ON items_images.image_id = images.image_id
      WHERE items.item_id=@item_id`
    ));
    console.log(itemInfo)

    res.status(200).json(itemInfo.recordset[0]);
  } catch (e) {
    console.error("Error in moreDetails", e);
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

app.get("/api/upload-options", verifyToken, async (req, res) => {
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

app.post("/api/upload", [verifyToken, upload.single("image")], async (req, res) => {
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
      if (value !== "" && key !== "images") {
        console.log(key)
        request.input(key, types[key], value);
        params.push(key);
        cond.push(`@${key}`);
      }
    }

    const paramsStr = params.join(", ");
    const condStr = cond.join(", ");
    const itemId = (await request.query(`
      INSERT INTO items (${paramsStr}) VALUES (${condStr});
      SELECT SCOPE_IDENTITY() AS itemId;
    `)).recordset[0].itemId;

    const image = req.file;

    if (image != undefined) {
      const compressedImageBuffer = await sharp(image.path)
      .flatten({ background: "white" })
      .toFormat("webp")
      .toBuffer();

      request.input('image_data', sql.VarBinary(sql.MAX), compressedImageBuffer);
      
      const imageId = (await request.query(`
        INSERT INTO images (image_data) VALUES (@image_data);
        SELECT SCOPE_IDENTITY() AS imageId;
      `)).recordset[0].imageId;

      request.input('item_id', sql.Int, itemId)
      request.input('image_id', sql.Int, imageId)

      await request.query(`
        INSERT INTO items_images (item_id, image_id) VALUES (@item_id, @image_id);
      `)

      fs.unlink(image.path, (err) => {
        if (err) {
          throw new Error(err)
        }
      })
    }

    res.status(200).end();
    
  } catch (error) {
    console.error("Error in Upload:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// app.post("/api/signup", async (req, res) => {
//   try {
//     const {
//       fName,
//       lName,
//       email,
//       password,
//       country,
//       city,
//       state,
//       address,
//       chkTerm,
//     } = req.body;

//     // Hash the email and the password
//     const hashedEmail = await bcrypt.hash(email, 10);
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Request
//     const request = new sql.Request();
//     request.input("fName", sql.VarChar, fName);
//     request.input("lName", sql.VarChar, lName);
//     request.input("email", sql.VarChar, email);
//     request.input("hashedPassword", sql.VarChar, hashedPassword);
//     request.input("country", sql.VarChar, country);
//     request.input("city", sql.VarChar, city);
//     request.input("state", sql.VarChar, state);
//     request.input("address", sql.VarChar, address);
//     request.input("chkTerm", sql.TinyInt, chkTerm);
//     request.input("hashedEmail", sql.VarChar, hashedEmail);
//     await request.query(`INSERT INTO users (first_name, last_name, email, password, country, city, state, address, chk_term, hash) 
//     VALUES (@fName, @lName, @email, @hashedPassword, @country, @city, @state, @address, @chkTerm, @hashedEmail)`);

//     // Generate token
//     const token = jwt.sign({ email, hashedPassword }, secretKey);
//     res.status(200).json({ token: token });
//   } catch (error) {
//     console.error("Error inserting user:", error);
//     res.status(500).json({ error: "Failed to register user" });
//   }
// });

app.post("/api/admin/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Request
    const request = new sql.Request();
    request.input('email', sql.VarChar, email);
    const response = (await request.query('SELECT is_admin, password FROM admin WHERE email = @email')).recordset[0];
    if (response.length !== 0  && response.is_admin && bcrypt.compare(password, response.password)) {
      // Generate a JWT token
      const token = jwt.sign({ email, password }, secretKey);
      res.status(200).json({ token: token });
    } else {
      res.status(404).json({ error: 'Incorrect email or password.' });
    }
  } catch (error) {
    console.error("Error in Sign In:", error);
    res.status(500).json({ error: "Failed to Sign In" });
  }

  // Scenarios
  // 1. There is no one with that username
  // 2. There is someone with that username
  // 2a. The password matches that in the database
  // 2b. The password does not match
});

app.delete("/api/admin/delete/:itemId", verifyToken, async (req, res) => {
  try {
    const itemId = req.params.itemId
    
    // Request
    const request = new sql.Request();
    request.input('item_id', sql.Int, itemId);
    const response = (await request.query(`
      DELETE FROM items 
      WHERE item_id = @item_id;
    `));
    if (response.rowsAffected[0] === 1) {
      res.status(200).send()
    } else {
      throw new Error("No. of delete rows not equal 1")
    }
  } catch (error) {
    console.error("Error in Deletion:", error);
    res.status(500).json({ error: "Failed to Delete" });
  }

  // Scenarios
  // 1. There is no one with that username
  // 2. There is someone with that username
  // 2a. The password matches that in the database
  // 2b. The password does not match
});
app.listen(3001, async () => {
  console.log("Server is running on http://localhost:3001");
});
