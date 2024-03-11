import { useContext } from "react";
import ExpandedContext from "./context";
import Categories from "./Categories";
import ChatsBar from "./ChatsBar";

function SideBar() {
  const { expanded, setExpanded } = useContext(ExpandedContext);
  return (
    <div
      // toggling the width onclick
      className={`bg-gray-600 overflow-auto transition-all h-screen fixed  ${
        expanded ? "w-40" : "w-0"
      }`}
    >
      <div>
        <div>
          <Categories />
        </div>
        <div>
          <ChatsBar />
        </div>
      </div>
    </div>
  );
}

export default SideBar;
