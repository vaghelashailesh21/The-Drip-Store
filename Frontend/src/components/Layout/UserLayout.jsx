import React from "react";
import Topbar from "../Layout/Topbar";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="h-screen flex flex-col">
      {/* FIXED HEADER AREA */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white">
        <Topbar />
        <div className="border-b border-gray-300">
          <div className="max-w-[1280px] mx-auto   px-4">
            <Header />
          </div>
        </div>
      </div>

      {/* SCROLLABLE CONTENT */}
      <div id="main-scroll" className=" flex-1  overflow-y-auto pt-[80px] lg:pt-[100px] md:pt-[100px]">
        <div className="max-w-screen mx-auto ">
          <Outlet />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
