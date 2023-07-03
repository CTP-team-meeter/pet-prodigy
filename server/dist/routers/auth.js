"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router = require("express").Router();
const { signup, login, check_login } = require("../controllers/auth");
// @route   Post /api/signup
// @access  Public
// @desc    Sign up
router.post("/signup", signup);
// @route   Post /api/login
// @access  Public
// @desc    Login
router.post("/login", login);
router.get("/login", check_login);
module.exports = router;
