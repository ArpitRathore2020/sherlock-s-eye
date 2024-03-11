import { ChevronLast, ChevronFirst } from "lucide-react";
import eagle from "../assets/eagle.png";
import { useContext, useState } from "react";
import ExpandedContext from "./context";

function TopBar({ loggedIn }) {
  const { expanded, setExpanded } = useContext(ExpandedContext);
  if (loggedIn) {
    return (
      <div className="flex justify-between bg-gray-800">
        <div className="flex">
          <div className="block sm:hidden p-4 pb-2  justify-between items-center">
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600"
            >
              {expanded ? (
                <ChevronFirst color="white" />
              ) : (
                <ChevronLast color="white" />
              )}
            </button>
          </div>
          <img
            className="py-2 mx-4"
            src={eagle}
            alt="logo here"
            height={40}
            width={40}
          ></img>
        </div>

        <div className="flex">
          {/* if someone want to add leads */}
          <button className="bg-red-500 hover:bg-red-800 m-2 text-white rounded-xl p-3">
            ADD LEADS+
          </button>
          {/* profile */}
          <img
            className="rounded-full py-2 mx-4"
            src="https://picsum.photos/200"
            alt="image here"
            height={40}
            width={40}
          ></img>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className="flex justify-between bg-gray-800">
          <img
            className="py-2 mx-4"
            src={eagle}
            alt="logo here"
            height={40}
            width={40}
          ></img>
          {/* if someone is not logged in so he will se login and signup buttons instead of profile */}
          <div>
            <button className="bg-red-500 hover:bg-red-800 m-2 text-white rounded-xl p-3">
              Login
            </button>
            <button className="bg-red-500 hover:bg-red-800 m-2 text-white rounded-xl p-3">
              Signup
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default TopBar;
