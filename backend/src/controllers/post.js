const Post = require("../models/post.model");
const User = require("../models/user.model");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const Sentiment = require("sentiment");

exports.addPost = async (req, res, next) => {
  try {
    const { title, content, category, fileType } = req.body;
    const type = fileType.split("/")[1];
    // Read the image file from the specified location
    const imageStream = fs.createReadStream(
      `/Users/Rathore/Github/sherlock-s-eye/backend/src/uploads/images/temp.${type}`
    );

    const sentiment = new Sentiment();
    const score = sentiment.analyze(content).score;

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

    const user = await User.findById({ _id: req.id });

    const newPost = new Post({
      userID: req.id,
      name: user.name,
      title: title,
      content: content,
      media: result.secure_url,
      category: category,
      upVote: [],
      downVote: [],
      sentiment: score,
    });
    // saving new post in the database
    await newPost
      .save()
      .then(() => {
        // console.log(result.secure_url);
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

exports.getTopCategories = async (req, res, next) => {
  try {
    const posts = await Post.find().populate("upVote").populate("downVote");

    // Calculate the score for each post
    const postsWithScore = posts.map((post) => {
      const upVotes = post.upVote.length;
      const downVotes = post.downVote.length;
      const score = upVotes - downVotes;

      return { ...post.toObject(), score };
    });

    // Sort the posts based on the score
    const sortedPosts = postsWithScore.sort((a, b) => b.score - a.score);

    // Get the top 5 best performing categories
    const categories = {};
    const uniqueCategories = new Set();

    sortedPosts.forEach((post) => {
      if (uniqueCategories.size < 5 && !uniqueCategories.has(post.category)) {
        const category = post.category;
        if (!categories[category]) {
          categories[category] = [];
        }
        categories[category].push({
          postId: post._id,
          title: post.title,
          upVotes: post.upVote.length,
        });
        uniqueCategories.add(category);
      }
    });

    // Sort the categories based on their scores
    const sortedCategories = Object.keys(categories).sort((a, b) => {
      const scoreA = sortedPosts.find((post) => post.category === a).score;
      const scoreB = sortedPosts.find((post) => post.category === b).score;
      return scoreB - scoreA;
    });

    // Create a new object with sorted categories
    const sortedCategoriesObj = {};
    sortedCategories.forEach((category) => {
      sortedCategoriesObj[category] = categories[category];
    });

    res.status(200).json(sortedCategoriesObj);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get top categories" });
  }
};
