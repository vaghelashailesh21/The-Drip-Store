import React from "react";
import { Link } from "react-router-dom";
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXFill } from "react-icons/ri";
import { FiPhoneCall } from "react-icons/fi";

const Footer = () => {
  return (
    <footer
      className="border-t border-gray-300 py-12"
      style={{ position: "relative", zIndex: "9999", background: "#fff" }}
    >
      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Shop */}
          <div>
            <h3 className="text-lg mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link
                  to="/collections/all/?gender=Men&category=Top+Wear"
                  className="hover:text-black"
                >
                  Men's Top Wear
                </Link>
              </li>
              <li>
                <Link
                  to="/collections/all/?gender=Women&category=Top+Wear"
                  className="hover:text-black"
                >
                  Women's Top Wear
                </Link>
              </li>
              <li>
                <Link
                  to="/collections/all/?gender=Men&category=Bottom+Wear"
                  className="hover:text-black"
                >
                  Men's Bottom Wear
                </Link>
              </li>
              <li>
                <Link
                  to="/collections/all/?gender=Women&category=Bottom+Wear"
                  className="hover:text-black"
                >
                  Women's Bottom Wear
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-lg  mb-4">Follow Us</h3>
            <div className="flex items-center text-gray-600 hover:text-black gap-4 mb-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TbBrandMeta className="h-5 w-5 text-gray-600 hover:text-black cursor-pointer" />
              </a>

              <a
                href="https://www.instagram.com/iamshayu/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IoLogoInstagram className="h-5 w-5 text-gray-600 hover:text-black cursor-pointer" />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <RiTwitterXFill className="h-4 w-4 hover:text-gray-600 cursor-pointer" />
              </a>
            </div>
            <p className="text-gray-800 mb-1">Call Us</p>
            <p className="flex items-center text-gray-600 hover:text-black text-sm">
              <FiPhoneCall className="mr-2 h-4 w-4" />
              +91 9328213046
            </p>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg  mb-4">Support</h3>
            <ul className=" space-y-2 text-sm text-gray-600">
              <li>
                <Link to="ContactUS" className="hover:text-black">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="AboutUS" className="hover:text-black">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="FAQ" className="hover:text-black">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="Features" className="hover:text-black">
                  Features
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg mb-4">Newsletter</h3>
            <p className="text-gray-600 mb-4 text-sm">
              Be the first to hear about new products, exclusive events, and
              online offers.
            </p>
            
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-3 w-full text-sm border border-gray-600 border-r-0 rounded-l-md focus:outline-none focus:ring-1 focus:ring-gray-600"
              />
              <button
                type="submit"
                className="bg-black text-white px-4 text-sm rounded-r-md hover:bg-gray-800"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* FOOTER BOTTOM */}
      <div className="border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 pt-12">
          <p className="text-gray-500 text-sm text-center">
            © 2026, The Drip Store. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
