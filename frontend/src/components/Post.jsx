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
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Comment from "./Comment";
import { toast } from "react-hot-toast";
import CardFlip from "react-card-flip";

function Post({
  name,
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
  const [isFlipped, setIsFlipped] = useState(false);

  const cookie = new Cookies();
  const navigate = useNavigate();
  const obj = jwtDecode(cookie.get("jwt_auth"));
  const USER_ID = obj.id;
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
    <CardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <div className="bg-black hover:bg-slate-950 rounded-lg p-5 m-4 text-white border border-gray-600">
        {/* Front of the card */}
        <div className="flex items-center">
          <img
            className="rounded-full mr-2"
            src="https://winaero.com/blog/wp-content/uploads/2019/09/Chrome-Incognito-Mode-Icon-256.png"
            alt="userprofile"
            width={30}
            height={30}
          ></img>
          <span className="font-bold">{name}</span>
          <div className="flex-grow">{sentimentTag}</div>
          <button
            onClick={() => {
              // adding a check so that a user does not send a text to itself
              if (USER_ID == author) {
                toast.error("You cannot text yourself");
                return;
              }
              axios
                .post(`${BASE_URL}/api/v1/putChats`, {
                  data: {
                    sender: USER_ID,
                    reciever: author,
                    message: "Hello",
                  },
                })
                .then(() => {
                  navigate("/home/messages", {
                    state: {
                      reciever: "random",
                      recieverId: author,
                    },
                  });
                })
                .catch((e) => {
                  console.log(e);
                });
            }}
            className="bg-blue-900 px-3 py-1 rounded-md hover:bg-blue-500"
          >
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
            className="block mx-auto w-full h-auto rounded-md max-w-[400px]"
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
              onClick={() => {
                setIsFlipped(true);
              }}
            >
              <FontAwesomeIcon icon={faCommentAlt} /> Comments
            </button>
          </div>
        </div>
      </div>
      <div
        className="bg-black hover:bg-slate-950 rounded-lg p-5 m-4 text-white border border-gray-600"
        style={{ overflowY: "auto" }}
      >
        {/* Back of the card */}
        <div
          className="mt-4"
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <div style={{ flex: "none" }}>
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
            <button
              className="mt-2 ml-2 bg-blue-900 text-white px-3 py-1 rounded-md hover:bg-blue-500"
              onClick={() => setIsFlipped(false)}
            >
              Go back
            </button>
          </div>
          <div
            className="mt-4"
            style={{ maxHeight: "300px", overflowY: "auto", flex: "1" }}
          >
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
        </div>
      </div>
    </CardFlip>
  );
}

export default Post;
