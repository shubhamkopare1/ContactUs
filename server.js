const express = require("express");
require('dotenv').config();
const cors = require("cors");


const { connectDB } = require("./config/db.js");
const contactRoutes = require("./routes/contactRoutes.js");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1/contact", contactRoutes);


connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`✌ server is running on port : ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MONGODB Connection Failed !!", error);
  });
