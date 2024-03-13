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
