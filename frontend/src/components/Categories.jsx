import { useEffect, useState, useContext } from "react";
import axios from "axios";
import ExpandedContext from "./context";
import { BASE_URL } from "../constants/helper";

function Categories() {
  const { expanded, setExpanded } = useContext(ExpandedContext);
  const [categoryRanking, setCategoryRanking] = useState({});

  async function fetchCategoryRanking() {
    try {
      const response = await axios.get(`${BASE_URL}/getTopCategories`); // fetcing top categories from backed
      setCategoryRanking(response.data); // set the ranking object to the recieved state
      console.log(response.data);
    } catch (error) {
      alert(`gone ${error}`);
      console.error("Failed to fetch category ranking data:", error);
    }
  }
  // top categories section on the left of the screen
  return (
    <div className="flex-col bg-gray-50 dark:bg-black h-full p-5">
      <div className="flex justify-between items-center mb-3">
        <b className="text-black dark:text-gray-200  text-lg mb-3 flex justify-center">
          Top Categories
        </b>
        {/* button to refresh the top categories section */}
        <button
          className="bg-gray-300 text-black dark:bg-gray-600 dark:hover:bg-gray-500 rounded-md px-3 py-1 dark:text-gray-200"
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
            className="bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 rounded-xl p-2 mb-2"
          >
            <h2 className="text-black dark:text-gray-200 mb-2">
              <b># {category}</b>
            </h2>
            <ul>
              {posts.map(
                (
                  post,
                  index // displaying all the post categories
                ) => (
                  <li key={index} className="flex justify-between items-center">
                    <div>
                      <span>{post.title}</span>
                      <span>{post._id}</span>
                    </div>
                    <div>Upvotes: {post.upVotes}</div>
                  </li>
                )
              )}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default Categories;
