const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;

const Users = [
  {
    id: 1002,
    username: "decode",
    age: 30,
  },
  {
    id: 1003,
    username: "otherUser",
    age: 41,
  },
];

app.use(
  cors({
    origin: "*",
  })
);
app.get("/details", (req, res) => res.send(Users));

app.listen(process.env.PORT || port, () =>
  console.log(`Example app listening at ${port}`)
);
