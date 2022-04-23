const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const usersRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const recipeRoute = require("./routes/recipes");
const submittedRecipesRoute = require("./routes/submittedRecipes");
const app = express();
const path = require("path");
const port = 5000;

app.use(express.json({ extended: false }));
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Import routes
app.use("/users", usersRoute);
app.use("/auth", authRoute);
app.use("/recipes", recipeRoute);
app.use("/submittedRecipes", submittedRecipesRoute);

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

app.listen(process.env.PORT || 5000, () =>
  console.log(`App listening on port ${port}!`)
);
