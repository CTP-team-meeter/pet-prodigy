// Avoids typescript error: Cannot redeclare block-scoped variable.
export {};

// Import dependencies
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

// Create router
const router = express.Router();

// GET users listing
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    }
  }
});

// GET user by id
router.get('/:id', getUser, (req, res) => {
  res.json(res.user);
});

// POST user
router.post('/', async (req, res) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  User.find({ username: req.body.username }, (err, docs) => {
    if (docs.length) {
      res.status(400).json({ message: 'Username already exists' });
    }
  });

  const user = new User({
    username: req.body.username,
    password: hashedPassword,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    }
  }
});

// Patch user
router.patch('/:id', getUser, (req, res) => {
  if (req.body.username != null) {
    res.user.username = req.body.username;
  }
  if (req.body.password != null) {
    res.user.password = req.body.password;
  }

  try {
    const updatedUser = res.user.save();
    res.json(updatedUser);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    }
  }
});

// Delete user
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: 'Deleted user' });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    }
  }
});

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user' });
    }
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ message: err.message });
    }
  }

  res.user = user;
  next();
}

module.exports = router;
