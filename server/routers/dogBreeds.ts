// Avoids typescript from making global modules
export {};

// getBreed is a middleware function that gets a dog breed by id
const getBreed = require('../middlewares/dogBreed').getBreed;
const createBreed = require('../middlewares/dogBreed').createBreed;

// Import dependencies
const express = require('express');
const bcrypt = require('bcrypt');

const DogBreed = require('../models/dogBreed');
const dogBreedController = require('../controllers/dogBreed');
// Create router
const router = express.Router();

// @route   Get /api/dogBreeds
// @access  Public
// @desc    Get a list of all dogs
router.get('/', dogBreedController.dogbreed_list);

// @route   Get /api/dogBreeds/:id
// @access  Public
// @desc    Get a dog breed, not implemented yet
router.get('/:id', getBreed, (req: any, res: any) => {
  res.json(res.breed);
});

// POST dog breed
router.post('/');

// Delete dog breed
router.delete('/:id', getBreed, async (req: any, res: any) => {
  try {
    await res.breed.remove();
    res.json({ message: 'Deleted dog   breed' });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    }
  }
});

// Middleware function to get dog breed by id
async function authenticateDogBreed(req: any, res: any, next: any) {
  let breed: any;
  try {
    breed = await DogBreed.findOne({ name: req.body.name });
    if (breed == null) {
      return res.status(400).json({ message: 'Cannot find dog breed' });
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
