import { useEffect, useState, useContext } from "react";
import axios from "axios";
import ExpandedContext from "./context";
import { BASE_URL } from "../constants/helper";

function Categories() {
  const { expanded, setExpanded } = useContext(ExpandedContext);
  const [categoryRanking, setCategoryRanking] = useState({});

  useEffect(() => {
    async function fetchCategoryRanking() {
      try {
        const response = await axios.get(`${BASE_URL}/getTopCategories`);
        setCategoryRanking(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch category ranking data:", error);
      }
    }

    fetchCategoryRanking();
  }, []);

  return (
    <div className="flex-col bg-gray-50 dark:bg-black h-full p-5">
      <b className="text-black dark:text-gray-200  text-lg mb-3 flex justify-center">
        Top Categories
      </b>
      {/* displaying all the available categories of crime that we have */}
      {Object.entries(categoryRanking).map(([category, posts], key) => {
        return (
          <div
            key={key}
            className="bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 rounded-xl p-2 mb-2"
          >
            <h2 className="dark:text-gray-200 mb-2">
              <b># {category}</b>
            </h2>
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
