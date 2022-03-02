const express = require("express");
const app = express();
const port = 5000;

app.get("/details", (req, res) => res.send("In the details page."));

app.listen(process.env.PORT || port, () =>
  console.log(`Example app listening at ${port}`)
);
