import TopBar from "./TopBar";
import Categories from "./Categories";
import ChatsBar from "./ChatsBar";
import Posts from "./Posts";
import SideBar from "./SideBar";
import ExpandedContext from "./context";
import ChatSection from "./ChatSection";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Home() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="flex-col h-full bg-gray-400">
      <ExpandedContext.Provider value={{ expanded, setExpanded }}>
        <TopBar loggedIn={true} />
        <SideBar />
      </ExpandedContext.Provider>
      <div className="grid grid-cols-12 gap-2 h-screen">
        <div className="hidden sm:block col-span-2">
          <Categories />
        </div>
        <div className="col-span-12 sm:col-span-8">
          <Routes>
            <Route path="/" element={<Posts />} />
            <Route path="/messages" element={<ChatSection />} />
          </Routes>
        </div>
        <div className="hidden sm:block col-span-2">
          <ChatsBar />
        </div>
      </div>
    </div>
  );
}

export default Home;
