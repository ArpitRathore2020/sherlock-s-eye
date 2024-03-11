import TopBar from "./components/TopBar";
import Categories from "./components/Categories";
import ChatsBar from "./components/ChatsBar";
import Posts from "./components/Posts";
import SideBar from "./components/SideBar";
import ExpandedContext from "./components/context";
import ChatSection from "./components/ChatSection";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
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
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Posts />} />
              <Route path="/messages" element={<ChatSection />} />
            </Routes>
          </BrowserRouter>
        </div>
        <div className="hidden sm:block col-span-2">
          <ChatsBar />
        </div>
      </div>
    </div>
  );
}

export default App;
