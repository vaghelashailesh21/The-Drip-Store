import React from "react";
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXFill } from "react-icons/ri";

const Topbar = () => {
  return (
    <div className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center">
          {/* Left */}
          <div className="hidden md:flex items-center gap-4 flex-1">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TbBrandMeta className="h-5 w-5 hover:text-gray-300 cursor-pointer" />
            </a>

            <a
              href="https://www.instagram.com/iamshayu/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IoLogoInstagram className="h-5 w-5 hover:text-gray-300 cursor-pointer" />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <RiTwitterXFill className="h-4 w-4 hover:text-gray-300 cursor-pointer" />
            </a>
          </div>

          {/* Center */}
          <div className="text-sm md:text-xs md:pl-10 text-center flex-1 whitespace-nowrap lg:text-sm lg:pl-10 ">
            We Ship All Over India - Fast & Reliable Shipping!
          </div>

          {/* Right */}
          <div className="hidden md:flex justify-end flex-1  text-sm">
            <a href="tel:+919328213046" className="hover:text-gray-300">
              +91 9328213046
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
