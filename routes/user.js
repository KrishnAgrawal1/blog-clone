const express = require("express");
const User = require("../modles/user");
const { JsonWebTokenError } = require("jsonwebtoken");

const router = express.Router();

router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  await User.create({ username, email, password });
  return res.redirect("/");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    res.render("signin", { error: "Incorrect email or password" });
  }
});

module.exports = router;
