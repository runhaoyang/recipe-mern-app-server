const router = express.Router();

router.get("/", async (req, res) => {
  const user = await userModel.find({});
  res.send(user);
});

router.post("/", (req, res) => {
  const user = new userModel({
    username: req.body.username,
    password: req.body.password,
  });
  user
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});

module.exports = router;
