import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const cartItemCount =
    cart?.products?.reduce((total, product) => total + product.quantity, 0) ||
    0;

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <nav className=" relative w-full  flex items-center  justify-between md:px-2 py-2 lg:py-4 md:py-4 ">
        {/* Left-logo */}
        <div>
          <Link
            to="/"
            className="font-semibold 
             text-lg sm:text-xl md:text-2xl lg:text-3xl 
             tracking-tight whitespace-nowrap mr-0"
          >
            The Drip Store
          </Link>
        </div>
        {/* center - navigation link */}
        <div className="hidden md:flex space-x-6 lg:mr-0 md:mr-0">
          <Link
            to="/collections/all/?gender=Men"
            className="text-gray-700 hover:text-black font-medium md:text-sm lg:text-lg uppercase"
          >
            Men
          </Link>
          <Link
            to="/collections/all/?gender=Women"
            className="text-gray-700 hover:text-black font-medium md:text-sm lg:text-lg uppercase"
          >
            Women
          </Link>
          <Link
            to="/collections/all/?category=Top Wear"
            className="text-gray-700 hover:text-black font-medium md:text-sm lg:text-lg uppercase"
          >
            Top Wear
          </Link>
          <Link
            to="/collections/all/?category=Bottom Wear"
            className="text-gray-700 hover:text-black font-medium  lg:text-lg md:text-sm uppercase"
          >
            Bottom Wear
          </Link>
        </div>
        {/* Right - Icons */}

        <div className="flex items-center lg:space-x-4 space-x-3">
          {user && user.role === "admin" && (
            <Link
              to="/admin"
              className="bg-gray-900 text-xs lg:text-sm rounded text-white px-2 py-1 hidden md:flex"
            >
              Admin
            </Link>
          )}

          <Link to="/profile" className="hover:text-black">
            <HiOutlineUser className="lg:h-6 lg:w-6 md:h-5 md:w-5 h-4 w-4 text-gray-700" />
          </Link>

          <button
            onClick={toggleCartDrawer}
            className="relative hover:text-black"
          >
            <HiOutlineShoppingBag className="lg:h-6 lg:w-6 md:h-5 md:w-5 h-4 w-4 text-gray-700" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 bg-[#000000] text-white text-xs rounded-full px-1 py-0.3 lg:px-1.5 lg:py-0.5">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* search icon */}
          <SearchBar />

          <button onClick={toggleNavDrawer} className="md:hidden">
            <HiBars3BottomRight className="lg:h-6 lg:w-6 md:h-5 md:w-5 h-4 w-4 text-gray-700" />
          </button>
        </div>
      </nav>

      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile navigation */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50  ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"} `}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="lg:h-6 lg:w-6 md:h-5 md:w-5 h-4 w-4 text-gray-600" />
          </button>
        </div>

        <div className="p-4">
          <h2 className="text-xl font-semibold mb-10">Menu</h2>
          <nav className="space-y-6 ">
            <Link
              to="/collections/all/?gender=Men"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Men
            </Link>
            <Link
              to="/collections/all/?gender=Women"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Women
            </Link>
            <Link
              to="/collections/all/?category=Top Wear"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Top wear
            </Link>
            <Link
              to="/collections/all/?category=Bottom Wear"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Bottom wear
            </Link>

            <Link
              to="/admin"
              className="bg-gray-900 text-xs lg:text-sm rounded text-white px-2 py-1  md:flex"
            >
              Admin
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
