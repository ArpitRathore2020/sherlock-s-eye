import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../constants/helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faCommentAlt,
} from "@fortawesome/free-solid-svg-icons";
import Cookies from "universal-cookie";
import Comment from "./Comment";
import { toast } from "react-hot-toast";

function Post({
  content,
  author,
  image,
  title,
  id,
  initialUpVotes,
  initialDownVotes,
  sentiment,
}) {
  const [upVotes, setUpVotes] = useState(initialUpVotes);
  const [downVotes, setDownVotes] = useState(initialDownVotes);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const cookie = new Cookies();
  axios.defaults.headers.common["Authorization"] = `Bearer ${cookie.get(
    "jwt_auth"
  )}`;

  useEffect(() => {
    fetchComments();
    console.log(comments);
  }, []);

  async function fetchComments() {
    try {
      const response = await axios.get(`${BASE_URL}/comments/${id}`);
      const normalizedComments = response.data.map((comment) => {
        return {
          _id: comment._id || null,
          author: comment.author || null,
          content: comment.content,
          createdAt: comment.createdAt,
        };
      });
      setComments(normalizedComments);
    } catch (error) {
      console.error("Failed to fetch comments: ", error);
    }
  }

  async function handleUpVote() {
    try {
      const response = await axios.post(`${BASE_URL}/upVote`, { postId: id });
      setUpVotes(response.data.upVotes);
      setDownVotes(response.data.downVotes);
    } catch (error) {
      console.error("Failed to upvote post: ", error);
    }
  }

  async function handleDownVote() {
    try {
      const response = await axios.post(`${BASE_URL}/downVote`, { postId: id });
      setUpVotes(response.data.upVotes);
      setDownVotes(response.data.downVotes);
    } catch (error) {
      console.error("Failed to downvote post: ", error);
    }
  }

  async function handleAddComment() {
    try {
      const response = await axios.post(`${BASE_URL}/addComment`, {
        postId: id,
        content: newComment,
      });
      setNewComment("");
      toast.success("Comment added successfully");
      setShowComments(true); // Show comments immediately after adding a new comment
      fetchComments(); // Fetch comments again to update the list
    } catch (error) {
      console.error("Failed to add comment: ", error);
      toast.error("Failed to add comment");
    }
  }

  let sentimentTag = null;
  if (sentiment > 0) {
    sentimentTag = (
      <div className="bg-green-700 text-white px-2 py-1 rounded mr-2">
        Positive
      </div>
    );
  } else if (sentiment < 0) {
    sentimentTag = (
      <div className="bg-red-700 text-white px-2 py-1 rounded mr-2">
        Negative
      </div>
    );
  }

  return (
    <div className="bg-gray-800 hover:bg-gray-700 rounded-md p-5 m-4 text-white">
      <div className="flex items-center">
        <img
          className="rounded-full mr-2"
          src="https://picsum.photos/200"
          alt="userprofile"
          width={30}
          height={30}
        ></img>
        <span className="font-bold">{author}</span>
        <div className="flex-grow"></div>
        {sentimentTag}
        <button className="bg-blue-900 px-3 py-1 rounded-md hover:bg-blue-500">
          <i>send message</i>
        </button>
      </div>
      <div className="mt-2">
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <div className="mt-2">
        <img
          src={image}
          alt="media"
          className="w-full h-auto rounded-md max-w-[400px]"
        />
      </div>
      <div className="mt-2">{content}</div>
      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center">
          <button
            className="text-gray-400 hover:text-gray-200"
            onClick={handleUpVote}
          >
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
          <span className="mx-2">{upVotes}</span>
          <button
            className="text-gray-400 hover:text-gray-200"
            onClick={handleDownVote}
          >
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
          <span className="mx-2">{downVotes}</span>
        </div>
        <div>
          <button
            className="text-gray-400 hover:text-gray-200"
            onClick={() => setShowComments(!showComments)}
          >
            <FontAwesomeIcon icon={faCommentAlt} /> Comments
          </button>
        </div>
      </div>
      <div className="mt-4">
        <textarea
          className="w-full p-2 rounded-md border border-gray-600 bg-gray-600"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button
          className="mt-2 bg-blue-900 text-white px-3 py-1 rounded-md hover:bg-blue-500"
          onClick={() => {
            handleAddComment();
            fetchComments();
          }}
        >
          Add Comment
        </button>
        {showComments && (
          <div className="mt-4">
            {comments &&
              comments
                .slice(0)
                .reverse()
                .map((comment) => (
                  <Comment
                    key={comment._id}
                    content={comment.content}
                    author={comment.author}
                    timestamp={comment.createdAt}
                  />
                ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Post;
