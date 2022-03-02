const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const userModel = require("./models");
require("dotenv").config();

const app = express();
const port = 5000;

app.use(cors());

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/details", async (req, res) => {
  const user = await userModel.find({});
  res.send(user);
});

app.listen(process.env.PORT || 5000), () =>
  console.log(`Hello world app listening on port ${port}!`)
);
