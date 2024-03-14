const Post = require("../models/post.model");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

exports.addPost = async (req, res, next) => {
  try {
    const { title, content, category, fileType } = req.body;
    const type = fileType.split("/")[1];
    // Read the image file from the specified location
    const imageStream = fs.createReadStream(
      `/Users/Rathore/Github/sherlock-s-eye/backend/src/uploads/images/temp.${type}`
    );

    // Upload the image stream to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream((error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
      imageStream.pipe(stream);
    });

    const newPost = new Post({
      userID: req.id,
      title: title,
      content: content,
      media: result.secure_url,
      category: category,
      upVote: [],
      downVote: [],
    });
    await newPost
      .save()
      .then(() => {
        console.log(result.secure_url);
        return res
          .status(201)
          .json({ message: "Post created successfully", post: newPost });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({
          success: false,
        });
      });
  } catch (err) {
    // Handle any errors
    console.error(err);
    res.status(500).json({ message: "Failed to create post" });
  }
};

exports.upVote = async (req, res, next) => {
  try {
    const { postId } = req.body;
    const userId = req.user._id;

    // Check if the user has already upvoted the post
    const post = await Post.findById(postId);
    const isUpvoted = post.upVote.includes(userId);

    // Remove the upvote if the user has already upvoted
    if (isUpvoted) {
      post.upVote.pull(userId);
    } else {
      // Check if the user has already downvoted the post and remove the downvote
      const isDownvoted = post.downVote.includes(userId);
      if (isDownvoted) {
        post.downVote.pull(userId);
      }
      // Add the upvote
      post.upVote.push(userId);
    }

    await post.save();

    return res.status(200).json({
      message: "Upvote updated successfully",
      upVotes: post.upVote.length,
      downVotes: post.downVote.length,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to update upvote" });
  }
};

exports.downVote = async (req, res, next) => {
  try {
    const { postId } = req.body;
    const userId = req.user._id;

    // Check if the user has already downvoted the post
    const post = await Post.findById(postId);
    const isDownvoted = post.downVote.includes(userId);

    // Remove the downvote if the user has already downvoted
    if (isDownvoted) {
      post.downVote.pull(userId);
    } else {
      // Check if the user has already upvoted the post and remove the upvote
      const isUpvoted = post.upVote.includes(userId);
      if (isUpvoted) {
        post.upVote.pull(userId);
      }
      // Add the downvote
      post.downVote.push(userId);
    }

    await post.save();

    return res.status(200).json({
      message: "Downvote updated successfully",
      upVotes: post.upVote.length,
      downVotes: post.downVote.length,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to update downvote" });
  }
};
