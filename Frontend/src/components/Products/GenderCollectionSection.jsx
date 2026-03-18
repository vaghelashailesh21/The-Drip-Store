import React from "react";
import MensCollection from "../../assets/Men4.jpg";
import WomensCollection from "../../assets/Women1.jpg";
import { Link } from "react-router-dom";

const GenderCollectionSection = () => {
  return (
    <section className="px-6 py-8 lg:py-16 md:py-12" >
      <div className="max-w-7xl mx-auto flex gap-4 sm:gap-6">

        {/* Womens Collection */}
        <div className="relative flex-1 overflow-hidden  ">

          <img
            src={WomensCollection}
            alt="WomensCollection"
            className="w-full h-[220px] sm:h-[300px] md:h-[420px] lg:h-[550px] object-cover"
          />

           <Link to="/collections/all/?gender=Women"
                className="block mt-1 text-xs sm:text-sm text-gray-700 " >
          <div className="  absolute  left-1 bottom-2 sm:left-6 sm:bottom-6 lg:top-6 lg:bottom-auto
          bg-white/80 px-1.5 lg:px-3 md:px-3 py-2  rounded">
          
              <h2 className="text-xs sm:text-lg font-semibold text-gray-900 whitespace-pre leading-tight">
                  Women's Collection
              </h2>
                    <h3>Shop Now</h3>
           </div>
           </Link>
        </div>

        
          {/* Mens Collection */}
        <div className="relative flex-1 overflow-hidden  ">

          <img
            src={MensCollection}
            alt="MensCollection"
            className="w-full h-[220px] sm:h-[300px] md:h-[420px] lg:h-[550px] object-cover"
          />

           <Link to="/collections/all/?gender=Men"
                className="block mt-1 text-xs sm:text-sm text-gray-700 " >
          <div className="  absolute  left-1 bottom-2 sm:left-6 sm:bottom-6 lg:top-6 lg:bottom-auto
          bg-white/80 px-3 py-2  rounded">
          
              <h2 className="text-xs sm:text-lg font-semibold text-gray-900 leading-tight">
                  Men's Collection
              </h2>
             <h3>Shop Now</h3>
           </div>
            </Link>
        </div>
      </div>
    </section>
  );
};

export default GenderCollectionSection;
