require("dotenv").config();

const userRouter = require("./routes/user");

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 8001;

mongoose.connect(process.env.MONGODB_URL).then((e) => {
  console.log("db connected");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));

app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(PORT, () => {
  console.log(`express server running on PORT: ${PORT}`);
});
