import React, { useState } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { setFilters, fetchProductsByFilters } from "../../Redux/slices/productsSlice";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handelSearchToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setFilters({ search: searchTerm }));
    dispatch(fetchProductsByFilters({ search: searchTerm }));
    navigate(`/collections/all?search=${searchTerm}`);
    setIsOpen(false);
  };

  return (
    <div
      className={`flex items-center transition-all duration-300 
                ${isOpen ? "fixed top-0 left-0 w-full bg-white h-24 z-50 md:h-24  px-4" : "w-auto"}
                `} >

      {isOpen ? (
        <form
          onSubmit={handleSearch}
          className="relative flex items-center w-full max-w-3xl mx-auto"
        >
          <div className="w-full relative  ">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
             className="bg-gray-100 w-full px-4 py-2.5 md:py-3 pr-12 rounded-lg focus:outline-none placeholder:text-gray-700"

            />
            {/* search icon in search bar */}
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
            >
              <HiMagnifyingGlass className="  h-5 w-5 text-gray-700 " />
            </button>
          </div>
          {/* close button for closing the search bar */}
          <button
            type="button"
            onClick={handelSearchToggle}
            className="ml-3 text-gray-600 hover:text-black"
          >
            <HiMiniXMark className="h-6 w-6" />
          </button>
        </form>
      ) : (
        <button onClick={handelSearchToggle}>
          <HiMagnifyingGlass className="lg:h-6 lg:w-6 md:h-5 md:w-5 h-4 w-4 text-gray-700" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
