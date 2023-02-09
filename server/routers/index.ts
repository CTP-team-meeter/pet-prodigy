// Avoids typescript from making the modules global
export {};

const express = require("express");
const router = express.Router();

// Import all the routes
const catBreedsRouter = require("./catBreeds");
const authRoter = require("./auth");

// Use the routes
router.use("/catBreeds", catBreedsRouter);
router.use("/", authRoter);

module.exports = router;
