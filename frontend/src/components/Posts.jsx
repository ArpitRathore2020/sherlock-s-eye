import { useState, useEffect } from "react";
import axios from "axios";
import AddLeads from "./AddLead";
import PostModal from "./PostModal";
import { BASE_URL } from "../constants/helper";
import Cookies from "universal-cookie";
import Post from "./Post";

function Posts() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const cookie = new Cookies();

  useEffect(() => {
    async function fetchPosts() {
      axios.defaults.headers.common["Authorization"] = `Bearer ${cookie.get(
        "jwt_auth"
      )}`;
      try {
        const response = await axios.get(`${BASE_URL}/posts`);
        setPosts(response.data.reverse());
        console.log(response.data);
        // console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-black text-white h-screen overflow-auto no-scrollbar p-5">
      <AddLeads setIsModalOpen={setIsModalOpen} />
      {/* use useCallback here for setIsModalOpen to prevent rerendering in opening and closing of modal */}
      <PostModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <hr className="m-8 bg-black dark:bg-gray-600 "></hr>

      {posts.map((post, key) => {
        return (
          <Post
            name={post.name}
            key={key}
            content={post.content}
            author={post.userID}
            image={post.imageUrl || "https://picsum.photos/400/600"}
            title={post.title}
            id={post._id}
            initialUpVotes={post.upVote.length}
            initialDownVotes={post.downVote.length}
            sentiment={post.sentiment}
          />
        );
      })}
    </div>
  );
}
export default Posts;
