// Avoids typescript from making the modules global
export {};

const express = require("express");
const router = express.Router();

// Import all the routes
const catBreedsRouter = require("./catBreeds");
const dogBreedsRouter = require("./dogBreeds");
const commentsRouter = require("./comments");
const authRoter = require("./auth");

// Use the routes
router.use("/catBreeds", catBreedsRouter);
router.use("/dogBreeds", dogBreedsRouter);
router.use("/comments", commentsRouter);
router.use("/", authRoter);

module.exports = router;
