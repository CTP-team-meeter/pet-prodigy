// Avoids typescript from making global modules
export {};

// Import dependencies
const express = require('express');
const bcrypt = require('bcrypt');

const Comment = require('../models/comment');

// Create router
const router = express.Router();

// @route   Get /api/comments
// @access  Public
// @desc    Get a list of all comments
router.get('/', async (req: any, res: any) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    }
  }
});

// @route   Get /api/comments/:id
// @access  Public
// @desc    Get a comment, not implemented yet
router.get('/:id', getComment, (req: any, res: any) => {
  res.json(res.comment);
});

// POST comment
router.post('/', async (req: any, res: any) => {
  const comment = new Comment({
    username: req.body.username,
    comment: req.body.comment,
  });
  try {
    const newComment = await comment.save();
    res.status(201).json(newComment);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    }
  }
});

// Delete comment
router.delete('/:id', getComment, async (req: any, res: any) => {
  try {
    await res.comment.remove();
    res.json({ message: 'Deleted comment' });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    }
  }
});

// Middleware function to get comment by id
async function getComment(req: any, res: any, next: any) {
  let comment;
  try {
    await Comment.findById(req.params.id);
    if (comment == null) {
      return res.status(400).json({ message: 'Cannot find comment' });
    }
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ message: err.message });
    }
  }

  res.comment = comment;
  next();
}

module.exports = router;
