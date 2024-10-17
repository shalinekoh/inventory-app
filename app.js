require("dotenv").config();

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("HI");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
