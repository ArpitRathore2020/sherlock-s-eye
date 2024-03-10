const express = require("express");
const router = express.Router();
require("../../../frontend/node_modules/dotenv/lib/main").config();

const { login, signup } = require("../controllers/auth");
const { auth } = require("../middlewares/Auth");

router.post("/login", login);
router.post("/signup", signup);

// Test Authentication
router.post("/get", auth, (req, res) => {
  return res.json({
    message: "Authentication Test successful",
    success: true,
  });
});

module.exports = router;
