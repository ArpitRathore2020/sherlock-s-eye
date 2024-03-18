import { ChevronLast, ChevronFirst } from "lucide-react";
import eagle from "../assets/eagle.png";
import { useContext } from "react";
import ExpandedContext from "./context";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ThemeToggleSwitch from "./switch/ThemeToggleSwitch";

function TopBar() {
  const { expanded, setExpanded } = useContext(ExpandedContext);
  const navigate = useNavigate();
  return (
    <div className="flex justify-between bg-blue-300 dark:bg-blue-800 text-white">
      <div className="flex">
        <div className="block sm:hidden p-4 pb-2  justify-between items-center">
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-blue-400 hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            {expanded ? (
              <ChevronFirst color="white" />
            ) : (
              <ChevronLast color="white" />
            )}
          </button>
        </div>
        <div className="">
          <FaHome
            height={40}
            width={40}
            onClick={() => {
              navigate("/home");
            }}
            className="m-3 w-10 h-10 p-1 rounded-2xl hover:bg-gray-500"
            color="white"
          />
        </div>
        {/* <img
          className="py-2 mx-4"
          src={eagle}
          alt="logo here"
          height={40}
          width={40}
        ></img> */}
      </div>

      <div className="flex items-center">
        <ThemeToggleSwitch />
        {/* profile */}
        <img
          className="rounded-full mx-4 w-10 h-10"
          src="https://winaero.com/blog/wp-content/uploads/2019/09/Chrome-Incognito-Mode-Icon-256.png"
          alt="image here"
        ></img>
      </div>
    </div>
  );
}

export default TopBar;
