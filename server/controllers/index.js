"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
// Import all the routes
var catBreedsController = require('./catBreeds');
// Use the routes
router.use('/catBreeds', catBreedsController);
module.exports = router;
