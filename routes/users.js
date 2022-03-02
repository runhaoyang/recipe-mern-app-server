const express = require("express");
const router = express.Router();
const Users = require("../models/Users");

router.get("/", async (req, res) => {
  const user = await Users.find({});
  res.send(user);
});

router.post("/", (req, res) => {
  const user = new Users({
    username: req.body.username,
    password: req.body.password,
  });
  user
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});

module.exports = router;
