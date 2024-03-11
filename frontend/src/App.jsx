import TopBar from "./components/TopBar";
import Categories from "./components/Categories";
import ChatsBar from "./components/ChatsBar";
import Posts from "./components/Posts";
import SideBar from "./components/SideBar";
import ExpandedContext from "./components/context";
import { useState } from "react";

function App() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="flex-col h-full bg-gray-400">
      <ExpandedContext.Provider value={{ expanded, setExpanded }}>
        <TopBar loggedIn={true} className="fixed" />
        <SideBar />
      </ExpandedContext.Provider>
      <div className="grid grid-cols-12 gap-2 h-screen">
        <div className="hidden sm:block col-span-2">
          <Categories />
        </div>
        <div className="col-span-12 sm:col-span-8">
          <Posts />
        </div>
        <div className="hidden sm:block col-span-2">
          <ChatsBar />
        </div>
      </div>
    </div>
  );
}

export default App;
