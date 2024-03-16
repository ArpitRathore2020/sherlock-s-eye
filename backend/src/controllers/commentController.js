const Comment = require("../models/comment.model");

// Add a new comment
exports.addComment = async (req, res) => {
  try {
    const { postId, content } = req.body;
    console.log(`${postId} <<<`);
    const newComment = new Comment({
      postId,
      content,
      author: req.user.id,
    });
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    console.error("Failed to add comment: ", error);
    res.status(500).json({ message: "Failed to add comment" });
  }
};

// Get comments for a post
exports.getComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ postId }).populate("author", "name");
    console.log(` ${comments}`);
    res.status(200).json(comments);
  } catch (error) {
    console.error("Failed to get comments: ", error);
    res.status(500).json({ message: "Failed to get comments" });
  }
};
