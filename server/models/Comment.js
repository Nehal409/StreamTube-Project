const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
  {
    // Which user is ccommenting
    userId: {
      type: String,
      required: true,
    },
    // On which video we are commenting
    videoId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comment', CommentSchema);
