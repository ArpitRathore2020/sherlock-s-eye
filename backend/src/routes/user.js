const express = require("express");
const router = express.Router();
require("dotenv").config();

const { login, signup, verification } = require("../controllers/auth");
const { auth } = require("../middlewares/Auth");

router.post("/login", login);
router.post("/signup", signup);
router.post("/verifyEmail", verification);

// Test Authentication
router.get("/get", auth, (req, res) => {
  console.log("At /get");
  return res.json({
    message: "Authentication Test successful",
    success: true,
  });
});

module.exports = router;
