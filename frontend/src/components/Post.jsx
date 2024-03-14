import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faCommentAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import axios from "axios";
import AddLeads from "./AddLead";
import PostModal from "./PostModal";
import { BASE_URL } from "../constants/helper";
import Cookies from "universal-cookie";

function Post({
  content,
  author,
  image,
  title,
  id,
  initialUpVotes,
  initialDownVotes,
}) {
  const [upVotes, setUpVotes] = useState(initialUpVotes);
  const [downVotes, setDownVotes] = useState(initialDownVotes);
  const cookie = new Cookies();
  axios.defaults.headers.common["Authorization"] = `Bearer ${cookie.get(
    "jwt_auth"
  )}`;
  async function handleUpVote() {
    await axios
      .post(`${BASE_URL}/upVote`, { postId: id })
      .then((res) => {
        setUpVotes(res.data.upVotes);
        setDownVotes(res.data.downVotes);
      })
      .catch((err) => {
        alert(err);
      });
  }

  async function handleDownVote(s) {
    await axios
      .post(`${BASE_URL}/downVote`, { postId: id })
      .then((res) => {
        setUpVotes(res.data.upVotes);
        setDownVotes(res.data.downVotes);
      })
      .catch((err) => {
        alert(err);
      });
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
        <button className="bg-red-400 px-3 py-1 rounded-xl hover:bg-red-500">
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
          <button className="text-gray-400 hover:text-gray-200">
            <FontAwesomeIcon icon={faCommentAlt} /> Comments
          </button>
        </div>
      </div>
    </div>
  );
}

export default Post;
