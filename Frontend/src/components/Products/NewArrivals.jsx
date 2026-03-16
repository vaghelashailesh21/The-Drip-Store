import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const NewArrivals = () => {
  
   const [newArrivals, setNewArrivals] = useState([]);

   // Fetch new arrivals from the backend when the component mounts
   useEffect(() => {
     const fetchNewArrivals = async () => {
       try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`);
          setNewArrivals(response.data);
       }
        catch (error) {
          console.error(error);
       }
      };
      fetchNewArrivals();
    }, []);

  return (
    <section >
      <div className="max-w-7xl  mx-auto text-center relative ">
        <h2 className="text-xl lg:text-3xl md:text-3xl font-bold mb-4 whitespace-nowrap text-center">Explore New Arrivals</h2>
        <p className="text-sm p-2 lg:text-lg md:text-lg text-gray-600 lg:mb-15 mb-7">
          Discover the latest styles straight off the runway, freshly added to
          keep your wardrobe on the cutting edge of fashion
        </p>

        <div className="container px-auto pr-8 pl-8 overflow-x-scroll no-scrollbar scroll-smooth snap-x snap-mandatory flex  space-x-6 relative">
          {newArrivals.map((product) => (
            <div key={product._id} className=" min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative">
              <img
                src={product.images?.[0]?.url}
                alt={product.images?.[0]?.altText || product.name}
                className="w-full h-[500px] object-cover rounded-lg" 
              />
              <div className="absolute bottom-0 left-0 right-0  p-4 bg-black/50 backdrop-blur-md text-white  rounded-b-lg ">
                <Link to={`/product/${product._id}`} className="block">
                  <h4 className="font-medium  text-xl">{product.name}</h4>
                  <p className=" mt-1 ">${product.price}</p>
                </Link>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
