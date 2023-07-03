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
// Import dependencies
const express = require("express");
const bcrypt = require("bcrypt");
const Comment = require("../models/comment");
const User = require("../models/user");
const { authenticateToken } = require("../middlewares/authentication");
// Create router
const router = express.Router();
// @route   Get /api/comments
// @access  Public
// @desc    Get a list of all comments
router.get("/", authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield Comment.find().populate("user", "username");
        const commentsWithTime = comments.map((comment) => {
            return Object.assign(Object.assign({}, comment._doc), { time: comment._id.getTimestamp() });
        });
        res.json(commentsWithTime.reverse());
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
    }
}));
// @route   Get /api/comments/:id
// @access  Public
// @desc    Get a comment, not implemented yet
router.get("/:id", getComment, (req, res) => {
    res.json(res.comment);
});
// @route   POST /api/comments
// @access  Private
// @desc    POST a comment
router.post("/", authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.findById(req.body.id);
    delete user._doc["password"];
    delete user._doc["__v"];
    const comment = new Comment({
        user: user._id,
        comment: req.body.comment,
    });
    try {
        const newComment = yield comment.save();
        delete newComment._doc["__v"];
        res.status(201).json(Object.assign(Object.assign({}, newComment._doc), { user }));
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ message: err.message });
        }
    }
}));
// @route   DELETE /api/comments/:id
// @access  Private
// @desc    Delete a comment
router.delete("/:id", getComment, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield res.comment.remove();
        res.json({ message: "Deleted comment" });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
    }
}));
// Middleware function to get comment by id
function getComment(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let comment;
        try {
            yield Comment.findById(req.params.id);
            if (comment == null) {
                return res.status(400).json({ message: "Cannot find comment" });
            }
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(500).json({ message: err.message });
            }
        }
        res.comment = comment;
        next();
    });
}
module.exports = router;
