const mongoose = require("mongoose");

const trendingSchema = new mongoose.Schema(
  {
    postID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    score: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const trending = mongoose.model("Trending", trendingSchema);
