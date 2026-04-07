import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


const NewArrivals = () => {
  
   const [newArrivals, setNewArrivals] = useState([]);
   const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   // Fetch new arrivals from the backend when the component mounts
   useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
        );
        setNewArrivals(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to load new arrivals");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  // Loading UI
 if (loading) {
  return (
    <section>
      <div className="container px-auto pr-8 pl-8 lg:pr-0 lg:pl-0 overflow-x-scroll no-scrollbar scroll-smooth snap-x snap-mandatory flex space-x-6 relative">
        
        {Array(4).fill(0).map((_, index) => (
          <div
            key={index}
            className="min-w-[48%] sm:min-w-[50%] md:min-w-[30%] lg:min-w-[30%] relative"
          >
            {/* Image Skeleton (same size as real image) */}
            <Skeleton
              className="w-full h-[200px] md:h-[300px] lg:h-[500px] rounded-lg"
              baseColor="#e5e7eb"   // light gray
              highlightColor="#f3f4f6"
            />

            {/* Overlay Skeleton (same as your product UI) */}
            <div className="absolute bottom-0 left-0 right-0 p-2 md:p-4 bg-black/40 backdrop-blur-md rounded-b-lg">
              <Skeleton width="80%" height={15} />
              <Skeleton width="40%" height={15} />
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}

  // Error UI
  if (error) {
  return (
    <section>
      <div className="flex flex-col items-center justify-center py-16 text-center px-4">
        
        {/* Icon */}
        <div className="text-5xl mb-4">🚫</div>

        {/* Title */}
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
          Failed to load New Arrivals
        </h2>

        {/* Message */}
        <p className="text-gray-500 max-w-md mb-6">
          We couldn’t fetch the latest drops right now. Please check your connection or try again.
        </p>

        {/* Button */}
        <button
          onClick={() => window.location.reload()}
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
        >
          Retry
        </button>

      </div>
    </section>
  );
}
  

  return (
    <section >
        <div className="container px-auto pr-8 pl-8 lg:pr-0 lg:pl-0 overflow-x-scroll no-scrollbar scroll-smooth snap-x snap-mandatory flex  space-x-6 relative">
          {newArrivals.map((product) => (
            <div key={product._id} className=" min-w-[48%] sm:min-w-[50%] md:min-w-[30%] lg:min-w-[30%]  relative">
              <img
                src={product.images?.[0]?.url}
                alt={product.images?.[0]?.altText || product.name}
                className="w-full h-[200px] md:h-[300px] lg:h-[500px] object-cover rounded-lg" 
              />
              <div className="absolute bottom-0 left-0 right-0  p-1 md:p-4 bg-black/50 backdrop-blur-md text-white  rounded-b-lg ">
                <Link to={`/product/${product._id}`} className="block">
                  <h4 className="font-medium  text-xs lg:text-xl md:text-xs justify-center" >{product.name}</h4>
                  <p className=" text-xs lg:text-xl md:text-xs mt-1 ">₹{product.price}</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
    </section>
  );
};

export default NewArrivals;
