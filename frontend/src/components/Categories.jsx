import { useContext } from "react";
import ExpandedContext from "./context";

const cat = ["Theft", "Murder", "Kidnapping", "Blackmailing"];

function Categories() {
  const { expanded, setExpanded } = useContext(ExpandedContext);
  return (
    <div
      className={`flex-col bg-gray-700 ${expanded ? "h-screen" : "text-wrap"}`}
    >
      <b>CATEGORIES</b>
      {/* displaying all the available categories of crime that we have */}
      {cat.map((category, key) => {
        return (
          // make on cliks here to make it do something on clicking
          <div
            key={key}
            className="flex bg-gray-500 hover:bg-gray-400 rounded-xl  p-2 m-2"
          >
            {category}
          </div>
        );
      })}
    </div>
  );
}

export default Categories;
