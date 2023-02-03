// Avoids typescript from making the modules global
export {};

const express = require('express');
const router = express.Router();

// Import all the routes
const catBreedsController = require('./catBreeds');

// Use the routes
router.use('/catBreeds', catBreedsController);

module.exports = router;
