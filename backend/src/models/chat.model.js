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
    messages: [
      {
        message: {
          type: String,
        },
        direction: [
          {
            from: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
            },
            to: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
            },
          },
        ],
      },
    ], // Each object in this array will have 3 members: (timestamp, message, direction)
    // direction is an array of 2 size of type [senderRef, recieverRef]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Chat", chatSchema);
