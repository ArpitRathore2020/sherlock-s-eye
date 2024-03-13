import { useState, useEffect } from "react";
import axios from "axios";
import AddLeads from "./AddLead";
import PostModal from "./PostModal";
import { BASE_URL } from "../constants/helper";
import Cookies from "universal-cookie";

function Posts() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const cookie = new Cookies();

  useEffect(() => {
    async function fetchPosts() {
      axios.defaults.headers.common["Authorization"] = `Bearer ${cookie.get(
        "jwt_auth"
      )}`;
      try {
        const response = await axios.get(`${BASE_URL}/posts`);
        setPosts(response.data.reverse());
      } catch (err) {
        console.error(err);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div className="bg-gray-900 text-white h-screen overflow-auto p-5">
      <AddLeads setIsModalOpen={setIsModalOpen} />
      <PostModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <hr className="m-8 bg-gray-600"></hr>
      {posts.map((post, key) => {
        return (
          <Post
            key={key}
            content={post.content}
            author={post.authorID}
            image={post.imageUrl || "https://picsum.photos/400/600"}
            title={post.title}
          />
        );
      })}
    </div>
  );
}

function Post({ content, author, image, title }) {
  return (
    <div className="flex-col bg-gray-800 hover:bg-gray-700 rounded-md p-5 m-4 text-white flex">
      <div className="flex items-center">
        <img
          className="rounded-full mr-2"
          src="https://picsum.photos/200"
          alt="userprofile"
          width={30}
          height={30}
        ></img>
        <i className="px-5">{author}</i>
        <div className="flex justify-end w-full">
          <button className="bg-red-400 p-2 rounded-xl hover:bg-red-500">
            <i>send message</i>
          </button>
        </div>
      </div>
      <div className="mt-2">
        <b>{title}</b>
      </div>
      <div className="mt-2 flex m-auto">
        <img
          src={image}
          alt="media"
          className="w-full h-auto rounded-md center max-w-[400px]"
        />
      </div>
      <div className="mt-2">{content}</div>
    </div>
  );
}

export default Posts;
