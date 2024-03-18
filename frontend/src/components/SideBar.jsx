import { useContext } from "react";
import ExpandedContext from "./context";
import Categories from "./Categories";
import ChatsBar from "./ChatsBar";

function SideBar() {
  const { expanded, setExpanded } = useContext(ExpandedContext);
  return (
    <div
      // toggling the width onclick
      className={`bg-gray-50 dark:bg-black overflow-auto transition-all h-screen fixed z-10 border-r border-gray-300 dark:border-gray-600 ${
        expanded ? "w-2/3" : "w-0"
      }`}
    >
      <div>
        <div className="h-1/2 overflow-auto">
          <Categories />
        </div>
        <div className="h-1/2 overflow-auto">
          <ChatsBar />
        </div>
      </div>
    </div>
  );
}

export default SideBar;
