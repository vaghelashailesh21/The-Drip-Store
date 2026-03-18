import React from "react";
import Heroimg from "../../assets/BG1.jpg";
import { Link } from "react-router-dom";

const Hero = () => {

  return (
    <section className="relative  ">
      <img
        src={Heroimg}
        alt="TheDripStore"
        className="object-cover w-full h-[270px] md:h-[500px] lg:h-[640px] "
      />
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center ">
        <div className="text-center text-white p-6">
          <h1 className="text-4xl md:text-7xl font-bold tracking-tighter uppercase mb-4">
            Fashion House
          </h1>
          <p className="text-sm tracking-tighter md:text-lg  mb-6">
            Explore our trendy street-style outfits with fast worldwide shipping
          </p>
          <Link to="/collections/all"  className="bg-white text-gray-950 px-3 py-2  rounded-sm text-xs lg:text-lg md:text-lg" >Shop Now</Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;

