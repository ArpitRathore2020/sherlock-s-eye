import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faCommentAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constants/helper";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

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
  const cookie = new Cookies();
  const navigate = useNavigate();
  const obj = jwtDecode(cookie.get("jwt_auth"));
  const USER_ID = obj.id;
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

  async function handleDownVote() {
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
        <div className="flex-grow">{sentimentTag}</div>

        <button
          onClick={() => {
            // send a hello text -> this is important to create an object, then only we can access it's elements
            axios
              .post(`${BASE_URL}/api/v1/putChats`, {
                data: {
                  sender: USER_ID,
                  reciever: author,
                  message: "Hello",
                },
              })
              .then((response) => {
                // console.log(response);
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
            // so above we are sending a hello text a user, so as to create a chat object for these two, which we can late access
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
