const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
    },
    upVote: {
      type: Number,
    },
    downVote: {
      type: Number,
    },
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

export const Post = mongoose.model("Post", postSchema);
