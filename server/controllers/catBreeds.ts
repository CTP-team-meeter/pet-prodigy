// Avoids typescript from making global modules
export {};

// Import dependencies
const express = require('express');
const bcrypt = require('bcrypt');

const CatBreed = require('../models/catBreed');

// Create router
const router = express.Router();

// GET cat breeds listing
router.get('/', async (req: any, res: any) => {
  try {
    const breeds = await CatBreed.find();
    res.json(breeds);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    }
  }
});

// GET cat breed by id
router.get('/:id', getBreed, (req: any, res: any) => {
  res.json(res.breed);
});

// POST cat breed
router.post('/', async (req: any, res: any) => {
  try {
    const catBreed = new CatBreed({
      name: req.body.name,
      imageURL: req.body.imageURL,
      origin: req.body.origin,
      life_span: req.body.life_span,
      temperament: req.body.temperament,
      wikipedia_url: req.body.wikipedia_url,
      weight: req.body.weight,
      height: req.body.height,
      adaptability: req.body.adaptability,
      affection_level: req.body.affection_level,
      child_friendly: req.body.child_friendly,
      grooming: req.body.grooming,
      intelligence: req.body.intelligence,
      health_issues: req.body.health_issues,
      social_needs: req.body.social_needs,
      stranger_friendly: req.body.stranger_friendly,
      vocalisation: req.body.vocalisation,
      energy_level: req.body.energy_level,
      description: req.body.description,
    });

    const newBreed = await catBreed.save();
    res.status(201).json(newBreed);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    }
  }
});

// Patch cat breed
router.patch('/:id', getBreed, (req: any, res: any) => {
  if (req.body.name != null) {
    res.catBreed.name = req.body.name;
    res.catBreed.origin = req.body.origin;
    res.catBreed.life_span = req.body.life_span;
    res.catBreed.temperament = req.body.temperament;
    (res.catBreed.wikipedia_url = req.body.wikipedia_url),
      (res.catBreed.weight = req.body.weight),
      (res.catBreed.height = req.body.height),
      (res.catBreed.adaptability = req.body.adaptability),
      (res.catBreed.affection_level = req.body.affection_level),
      (res.catBreed.child_friendly = req.body.child_friendly),
      (res.catBreed.grooming = req.body.grooming),
      (res.catBreed.intelligence = req.body.intelligence),
      (res.catBreed.health_issues = req.body.health_issues),
      (res.catBreed.social_needs = req.body.social_needs),
      (res.catBreed.stranger_friendly = req.body.stranger_friendly),
      (res.catBreed.vocalisation = req.body.vocalisation),
      (res.catBreed.energy_level = req.body.energy_level),
      (res.catBreed.description = req.body.description);
  }

  try {
    const updatedBreed = res.catBreed.save();
    res.json(updatedBreed);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    }
  }
});

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

async function getBreed(req: any, res: any, next: any) {
  let breed: any;
  try {
    breed = await CatBreed.findById(req.params.id);
    if (breed == null) {
      return res.status(404).json({ message: 'Cannot find breed' });
    }
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ message: err.message });
    }
  }

  res.name = breed;
  next();
}

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
