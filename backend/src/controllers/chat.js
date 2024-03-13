const mongoose = require("mongoose");
const userChat = require("../models/chat.model");
const user = require("../models/user.model");

exports.chat = async (req, res) => {
  const senderId = new mongoose.Types.ObjectId(req.body.sender);
  const receiverId = new mongoose.Types.ObjectId(req.body.receiver);
  const message = req.body.message;
  console.log(senderId);
  try {
    // trying to update chat
    let result = await userChat.updateOne(
      {
        // either user1 can be reciever or user2, similar for sender as well
        $or: [
          {
            person1: senderId,
            person2: receiverId,
          },
          {
            person1: receiverId,
            person2: senderId,
          },
        ],
      },
      {
        $push: {
          messages: {
            message: message,
            direction: [
              {
                from: senderId,
                to: receiverId,
              },
            ],
          },
        },
      }
    );
    if (result) {
      console.log("here");
      // if not found so creating a chat
      result = await userChat.create({
        person1: senderId,
        person2: receiverId,
        messages: [
          {
            messagex: message,
            direction: [senderId, receiverId],
          },
        ],
      });
      console.log("result");
      console.log("result");
      // updating sender's conversation (pushing chat to sender's conversation)
      await user.updateOne(
        {
          _id: senderId,
        },
        {
          $push: {
            conversation: result._id,
          },
        }
      );
      // updating reciever's conversation (pushing chat to reviever's conversation)
      await user.updateOne(
        {
          _id: receiverId,
        },
        {
          $push: {
            conversation: result._id,
          },
        }
      );
      return res.status(202).json({
        status: "succcess",
        message: "chat created sucessfully",
      });
    }
    return res.status(202).json({
      status: "succcess",
      message: "chat updated sucessfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(411).json({
      message: `some error occured ${e}`,
    });
  }
};

// module.exports = { chat };
