// Avoids typescript from making the modules global
export {};

const router = require("express").Router();
const { signup, login, check_login } = require("../controllers/auth");
const User = require("../models/user");
const {
  generateAccessToken,
  authenticateToken,
} = require("../middlewares/authentication");

router.post("/signup", signup);

router.post("/login", login);

router.get("/login", check_login);
module.exports = router;
