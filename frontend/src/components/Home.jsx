import TopBar from "./TopBar";
import Categories from "./Categories";
import ChatsBar from "./ChatsBar";
import SideBar from "./SideBar";
import ExpandedContext from "./context";
import ChatSection from "./ChatSection";
import { Link, useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BASE_URL } from "../constants/helper";
import Cookies from "universal-cookie";
import { Suspense } from "react";
const Posts = React.lazy(() => import("./Posts"));
// since posts are a lot so we don't want to load then

function Home() {
  const cookie = new Cookies();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  //   useEffect(() => {
  axios
    .get(`${BASE_URL}/get`, {
      headers: {
        "X-Custom-Header": "value",
        Authorization: `Bearer ${cookie.get("jwt_auth")}`,
      },
    })
    .then((response) => {})
    .catch((error) => navigate("/"));
  //   }, []);

  return (
    <div className="flex-col h-screen bg-gray-50 dark:bg-black overflow-hidden">
      {/* <div className="flex-col h-screen bg-gray-400"> */}
      <ExpandedContext.Provider value={{ expanded, setExpanded }}>
        <TopBar loggedIn={true} />
        <SideBar />
      </ExpandedContext.Provider>
      <div className="grid grid-cols-12 gap-2 h-screen">
        <div className="hidden sm:block col-span-3 m-5">
          <Categories />
        </div>
        <div className="col-span-12 sm:col-span-6">
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={"loading"}>
                  <Posts />
                </Suspense>
              }
            />
            <Route path="/messages" element={<ChatSection />} />
          </Routes>
        </div>
        <div className="hidden sm:block col-span-3 m-10">
          <ChatsBar />
        </div>
      </div>
    </div>
  );
}

export default Home;
