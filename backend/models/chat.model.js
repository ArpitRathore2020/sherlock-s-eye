const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    person1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    person2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    message: [{ type: Object }], // Each object in this array will have 3 members: (timestamp, message, direction)
  },
  {
    timestamps: true,
  }
);

export const chat = mongoose.model("Chat", chatSchema);
