const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;

app.use(
  cors({
    origin: "*",
  })
);
app.get("/details", (req, res) => res.send("In the details page."));

app.listen(process.env.PORT || port, () =>
  console.log(`Example app listening at ${port}`)
);
