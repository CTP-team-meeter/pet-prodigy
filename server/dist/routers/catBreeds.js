"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// getBreed is a middleware function that gets a cat breed by id
const getBreed = require('../middlewares/catBreed').getBreed;
const createBreed = require('../middlewares/catBreed').createBreed;
// Import dependencies
const express = require('express');
const bcrypt = require('bcrypt');
const CatBreed = require('../models/catBreed');
const catBreedController = require('../controllers/catBreed');
// Create router
const router = express.Router();
// @route   Get /api/catBreeds
// @access  Public
// @desc    Get a list of all cats
router.get('/', catBreedController.catbreed_list);
// @route   Get /api/catBreeds/:id
// @access  Public
// @desc    Get a cat breed, not implemented yet
router.get('/:id', getBreed, (req, res) => {
    res.json(res.breed);
});
// POST cat breed
router.post('/');
// Delete cat breed
router.delete('/:id', getBreed, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield res.breed.remove();
        res.json({ message: 'Deleted cat breed' });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
    }
}));
// Middleware function to get cat breed by id
function authenticateCatBreed(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let breed;
        try {
            breed = yield CatBreed.findOne({ name: req.body.name });
            if (breed == null) {
                return res.status(400).json({ message: 'Cannot find cat breed' });
            }
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(500).json({ message: err.message });
            }
        }
        try {
            if (yield bcrypt.compare(req.body.password, breed.password)) {
                res.breed = breed;
                next();
            }
            else {
                res.status(401).json({ message: 'Not allowed' });
            }
        }
        catch (err) {
            if (err instanceof Error) {
                res.status(500).json({ message: err.message });
            }
        }
    });
}
module.exports = router;
