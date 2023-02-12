// Avoids typescript from making global modules
export {};

// getBreed is a middleware function that gets a cat breed by id
const getBreed = require('../middlewares/catBreed').getBreed;
const createBreed = require('../middlewares/catBreed').createBreed;

// Import dependencies
const express = require('express');
const bcrypt = require('bcrypt');

const CatBreed = require('../models/catBreed');
const catBreadController = require('../controllers/catBreed');
// Create router
const router = express.Router();

// @route   Get /api/catBreeds
// @access  Public
// @desc    Get a list of all cats
router.get('/', catBreadController.catbreed_list);

// @route   Get /api/catBreeds/:id
// @access  Public
// @desc    Get a cat breed, not implemented yet
router.get('/:id', getBreed, (req: any, res: any) => {
  res.json(res.breed);
});

// POST cat breed
router.post('/');

// Delete cat breed
router.delete('/:id', getBreed, async (req: any, res: any) => {
  try {
    await res.breed.remove();
    res.json({ message: 'Deleted cat breed' });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    }
  }
});

// Middleware function to get cat breed by id
async function authenticateCatBreed(req: any, res: any, next: any) {
  let breed: any;
  try {
    breed = await CatBreed.findOne({ name: req.body.name });
    if (breed == null) {
      return res.status(400).json({ message: 'Cannot find cat breed' });
    }
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ message: err.message });
    }
  }

  try {
    if (await bcrypt.compare(req.body.password, breed.password)) {
      res.breed = breed;
      next();
    } else {
      res.status(401).json({ message: 'Not allowed' });
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = router;
