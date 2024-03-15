const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    media: {
      type: String, // holds URL of the media in String format
    },
    sentiment: {
      type: Number,
      default: 0,
    },
    upVote: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    downVote: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    category: {
      type: String,
      enum: ["observation", "report", "suggestion", "other"], // New fields to be added
    },
    commentID: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    score: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
