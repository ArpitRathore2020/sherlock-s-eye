const mongoose = require("mongoose");
const userChat = require("../models/chat.model");
const user = require("../models/user.model");

// controller to put the chats in the database
exports.postChat = async (req, res) => {
  // console.log("here");
  // console.log(req.body.data);
  const senderId = new mongoose.Types.ObjectId(req.body.data.sender);
  const receiverId = new mongoose.Types.ObjectId(req.body.data.reciever);
  const message = req.body.data.message;
  // console.log(senderId);
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
    if (result.modifiedCount == 0) {
      // console.log(result);
      // if not found so creating a chat
      result = await userChat.create({
        person1: senderId,
        person2: receiverId,
        messages: [
          {
            message: message,
            direction: [
              {
                from: senderId,
                to: receiverId,
              },
            ],
          },
        ],
      });
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

// controller to get all the chats of a user
exports.getChats = async (req, res) => {
  // user needs to send userId and this will return all the chats of that particular user
  // with the direction of the chats
  const userId = new mongoose.Types.ObjectId(req.body.data.user);

  // converting string to objectId
  try {
    const chats = await user.findOne({
      _id: userId,
    });
    // populating the array with actual chats
    let populated = await chats.populate({
      path: "conversation",
      model: "Chat",
      populate: [
        {
          path: "person1",
          model: "User",
        },
        {
          path: "person2",
          model: "User",
        },
      ],
    });
    // console.log(populated);

    // we need to do slight changes in populated
    // since we do not want to send all the data (including password) in the frontend
    const modified = populated.conversation;

    for (let i = 0; i < modified.length; i++) {
      modified[i].person1 = {
        _id: modified[i].person1._id,
        name: modified[i].person1.name,
      };
      modified[i].person2 = {
        _id: modified[i].person2._id,
        name: modified[i].person2.name,
      };
    }
    // the array is now modified (was using map before but for some reason it is not working as expected)

    return res.status(202).json({
      response: modified,
    });
  } catch (e) {
    console.log(`error occured ${e}`);
    return res.status(411).json({
      status: "unsucessfull",
      message: `error occured ${e}`,
    });
  }
};

// module.exports = { chat };
