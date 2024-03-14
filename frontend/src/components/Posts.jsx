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
            id={post._id}
            initialUpVotes={post.upVote.length}
            initialDownVotes={post.downVote.length}
          />
        );
      })}
    </div>
  );
}
export default Posts;
