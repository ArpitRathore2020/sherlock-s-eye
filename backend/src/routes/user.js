const express = require("express");
const router = express.Router();

require("../../../frontend/node_modules/dotenv/lib/main").config();
require("dotenv").config();


const { login, signup, verification } = require("../controllers/auth");
const { auth } = require("../middlewares/Auth");
const { chat } = require("../controllers/chat");

router.post("/login", login);
router.post("/signup", signup);

router.post("/api/v1/chats", chat);

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
