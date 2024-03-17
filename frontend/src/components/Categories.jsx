import { useEffect, useState, useContext } from "react";
import axios from "axios";
import ExpandedContext from "./context";
import { BASE_URL } from "../constants/helper";

function Categories() {
  const { expanded, setExpanded } = useContext(ExpandedContext);
  const [categoryRanking, setCategoryRanking] = useState({});

  async function fetchCategoryRanking() {
    try {
      const response = await axios.get(`${BASE_URL}/getTopCategories`);
      setCategoryRanking(response.data);
      console.log(response.data);
    } catch (error) {
      alert("gone");
      console.error("Failed to fetch category ranking data:", error);
    }
  }

  return (
    <div className="flex-col bg-black h-full p-5">
      <div className="flex justify-between items-center mb-3">
        <b className="text-gray-200 text-lg">Top Categories</b>
        <button
          className="bg-gray-600 hover:bg-gray-500 rounded-md px-3 py-1 text-gray-200"
          onClick={fetchCategoryRanking}
        >
          Refresh
        </button>
      </div>
      {/* displaying all the available categories of crime that we have */}
      {Object.entries(categoryRanking).map(([category, posts], key) => {
        return (
          <div
            key={key}
            className="bg-gray-600 hover:bg-gray-500 rounded-xl p-2 mb-2"
          >
            <h2 className="text-gray-200 mb-2"># {category}</h2>
            <ul>
              {posts.map((post, index) => (
                <li key={index} className="flex justify-between items-center">
                  <div>
                    <span>{post.title}</span>
                    <span>{post._id}</span>
                  </div>
                  <div>Upvotes: {post.upVotes}</div>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default Categories;
