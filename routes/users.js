const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());

router.get("/", async (req, res) => {
  const user = await Users.find({});
  res.send(user);
});

// User registration
router.post("/", async (req, res) => {
  const saltPassword = await bcrypt.genSalt(10);
  const securedPassword = await bcrypt.hash(req.body.password, saltPassword);
  const user = new Users({
    username: req.body.username,
    password: securedPassword,
  });
  // Check to see if username already exists in the database
  const usernameExists = await Users.findOne({ username: req.body.username });
  if (!usernameExists) {
    try {
      const savedUser = await user.save();
      res.json(savedUser);
    } catch (err) {
      res.json({ message: err });
    }
  } else {
    res.json("Username already exists");
  }
});

module.exports = router;
