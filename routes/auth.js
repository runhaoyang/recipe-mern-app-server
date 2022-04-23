const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Users = require("../models/Users");
require("dotenv").config();

// @route GET /auth
// @desc  Get a specific user's details
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await Users.findById(req.user.id);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST /auth
// @desc Login a user and get token
// @access Public
router.post("/", async (req, res) => {
  // Check for existence of username or password
  const user = await Users.findOne({ username: req.body.username });
  if (!user) {
    res.status(400).send("Username or password does not match");
  } else {
    try {
      const match = bcrypt.compareSync(req.body.password, user.password);
      if (!match) {
        return res.status(400).send("Username or password does not match");
      } else {
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
      }
    } catch (err) {
      res.status(500).send("User or password does not match");
    }
  }
});

module.exports = router;
