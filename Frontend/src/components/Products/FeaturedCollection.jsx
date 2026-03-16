import React from "react";
import { Link } from "react-router-dom";

const FeaturedCollection = () => {
  return (
    <section className="py-16 px-4 lg:px-0 ">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center bg-gray-100 rounded-3xl ">

        {/* Left Content */}
        
        <div
          className="w-full lg:w-1/2 
                p-6 sm:p-8 lg:p-12
                text-center lg:text-left
                flex flex-col justify-center"
        >
          <h2 className="text-sm sm:text-base font-semibold text-gray-700 mb-2">
            Comfort and style
          </h2>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            Apparel made for your everyday life.
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6">
            Discover high-quality, comfortable clothing that effortlessly blends
            fashion and function. Designed to make you look & feel great every
            day.
          </p>

          <div className="flex justify-center lg:justify-start">
            <Link
              to="/collections/all"
              className="bg-black text-white px-6 py-3 rounded-lg text-sm sm:text-base md:text-lg 
                 hover:bg-gray-700 transition"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Right Content */}

        <div
          className="w-full lg:w-1/2 overflow-hidden
             rounded-t-3xl lg:rounded-t-none
             lg:rounded-tr-3xl lg:rounded-br-3xl
            "
         >
          <img
            src="https://i.pinimg.com/736x/b1/18/6d/b1186dc7d3b94fa5461e49a5ea8070a7.jpg"
            alt="featured collection"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
