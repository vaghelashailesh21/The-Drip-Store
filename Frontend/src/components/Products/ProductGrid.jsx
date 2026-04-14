import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductGrid = ({ products, loading, error }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-0">
        {Array(8)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="block">
              <div className="bg-white p-4 rounded-lg">
                {/* Image Skeleton */}
                <div className="w-full h-50 sm:h-40 md:h-100 lg:h-100 mb-4">
                  <Skeleton
                    className="w-full h-full rounded-lg"
                    baseColor="#e5e7eb"
                    highlightColor="#f3f4f6"
                  />
                </div>

                {/* Title */}
                <Skeleton width="80%" height={15} />

                {/* Price */}
                <Skeleton width="40%" height={15} />
              </div>
            </div>
          ))}
      </div>
    );
  }

  if (error) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      
      {/* Icon */}
      <div className="text-5xl mb-4">⚠️</div>

      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Something went wrong
      </h2>

      {/* Description */}
      <p className="text-gray-500 mb-6 max-w-md">
        We couldn't load the products right now. Please try again or check your connection.
      </p>

      {/* Retry Button */}
      <button
        onClick={() => window.location.reload()}
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
      >
        Try Again
      </button>

    </div>
  );
}

// ================= NO PRODUCTS =================
if (!loading && (!products || products.length === 0)) {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
      
      {/* Icon */}
      <div className="text-6xl mb-4">🛍️</div>

      {/* Title */}
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
        No products found
      </h2>

      {/* Description */}
      <p className="text-gray-500 max-w-md mb-6">
        Try changing filters or explore other collections.
      </p>

      {/* Button */}
      <button
        onClick={() => window.location.href = "/collections/all"}
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
      >
        Explore Products
      </button>
    </div>
  );
}

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-0">
      {products.map((product, index) => (
        <Link key={index} to={`/product/${product._id}`} className="block">
          <div className="bg-white p-4 rounded-lg">
            <div className="w-full h-50 sm:h-40 md:h-100 lg:h-100 mb-4 ">
              <img
                src={product.images[0].url}
                alt={product.images[0].altText || product.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <h2 className="text-sm mb-2">{product.name}</h2>
            <p className="text-gray-500 font-medium text-sm tracking-tighter">
              ₹{product.price}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;
