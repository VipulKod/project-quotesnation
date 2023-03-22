// server.js
const express = require("express");
const path = require("path");
var cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
require("dotenv").config();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "./build")));

// API route handler
app.get("/api/hello", (req, res) => {
  res.send("Hello from the API!");
});

// Handle other routes by serving the index.html file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "./build/index.html"));
});

// Connecting to DB
const dbUrl = process.env.DB_URL;
mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// Start the server
const port = process.env.PORT || 4200;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
