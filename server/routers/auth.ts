// Avoids typescript from making the modules global
export {};

const router = require("express").Router();
const { signup } = require("../controllers/auth");
const User = require("../models/user");
const {
  generateAccessToken,
  authenticateToken,
} = require("../middlewares/authentication");

router.post("/signup", signup);

module.exports = router;
