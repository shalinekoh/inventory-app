require("dotenv").config();
const path = require("path");

const express = require("express");

const categoryRouter = require("./routes/categoryRouter");
const itemRouter = require("./routes/itemRouter");

const app = express();
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use("/item", itemRouter);
app.use("/category", categoryRouter);
app.use("/", (req, res) => res.render("dashboardView"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
