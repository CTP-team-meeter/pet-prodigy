// Avoids typescript from making global modules
export {};

const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comment: { type: String, required: true },
  replies: [String]
});

module.exports = mongoose.model("Comment", commentSchema);
