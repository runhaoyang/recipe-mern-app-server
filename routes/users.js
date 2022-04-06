const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(cors());

// @route GET /users
// @desc Get all users from the Users schema
// @access Public
router.get("/", async (req, res) => {
  const user = await Users.find({});
  res.send(user);
});

// @route POST /users
// @desc Register a user
// @access Public
router.post("/", async (req, res) => {
  // Check to see if username already exists in the database
  const usernameExists = await Users.findOne({ username: req.body.username });
  if (!usernameExists) {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);
      const user = new Users({
        username: req.body.username,
        password: hashedPassword,
      });
      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      res.status(500).json({ message: err });
    }
  } else {
    res.status(400).send("User already exists");
  }
});

// @route GET /users/recipes
// @desc Get current user's recipes
// @access Public
router.post("/recipes", async (req, res) => {
  Users.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      res.status(500).json({ message: err });
      console.log(err);
    }
    res.status(200).json(user);
  });
});

module.exports = router;
