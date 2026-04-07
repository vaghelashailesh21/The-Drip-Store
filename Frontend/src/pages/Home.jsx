import React, { useState, useEffect } from "react";
import Hero from "../components/Layout/Hero";
import GenderCollectionSection from "../components/Products/GenderCollectionSection";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductDetails";
import ProductGrid from "../components/Products/ProductGrid";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturesSection from "../components/Products/FeaturesSection";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../Redux/slices/productsSlice";
import { useLocation } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  // Redux state (Top Wear products)
  const { products, loading, error } = useSelector((state) => state.products);

  // Best Seller states
  const [bestSellers, setBestSellers] = useState(null);
  const [bestSellerLoading, setBestSellerLoading] = useState(true);
  const [bestSellerError, setBestSellerError] = useState(null);

  useEffect(() => {
    // Fetch Women's Top Wear products
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "Top Wear",
        limit: 8,
      }),
    );

    // Fetch Best Seller product
    const fetchBestSellers = async () => {
      try {
        setBestSellerLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`,
        );
        setBestSellers(response.data);
        setBestSellerError(null);
      } catch (err) {
        console.error(err);
        setBestSellerError("Failed to load best seller product");
      } finally {
        setBestSellerLoading(false);
      }
    };

    fetchBestSellers();
  }, [dispatch]);

  useEffect(() => {
    const container = document.getElementById("main-scroll");

    if (container) {
      container.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [location]);

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Gender Collection */}
      <GenderCollectionSection />

      {/* New Arrivals (handles its own loading/error internally) */}
      <div className="max-w-7xl  mx-auto text-center relative ">
        <h2 className="text-xl lg:text-3xl md:text-3xl font-bold mb-4 whitespace-nowrap text-center">
          Explore New Arrivals
        </h2>
        <p className="text-sm p-2 lg:text-lg md:text-lg text-gray-600 lg:mb-15 mb-7">
          Discover the latest styles straight off the runway, freshly added to
          keep your wardrobe on the cutting edge of fashion
        </p>
        <NewArrivals />
      </div>

      {/* ================= BEST SELLER ================= */}
      <h2 className="text-xl lg:text-3xl md:text-3xl text-center font-bold mb-2 lg:mb-5 md:mb-5 mt-10 md:mt-15 lg:mt-15">
        Best Seller
      </h2>


     {bestSellerError ? (
  <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
    <div className="flex flex-col items-center justify-center py-16 text-center">
      
      {/* Icon */}
      <div className="text-5xl mb-4">🔥</div>

      {/* Title */}
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
        Failed to load Best Seller
      </h2>

      {/* Message */}
      <p className="text-gray-500 max-w-md mb-6">
        We couldn't load the trending product right now. Please try again or explore other collections.
      </p>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => window.location.reload()}
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
        >
          Retry
        </button>
      </div>

    </div>
  </div>
) : bestSellerLoading ? (
        // ✅ SAME as ProductDetails layout
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
          <div className="flex flex-col md:flex-row">
            {/* LEFT THUMBNAILS */}
            <div className="hidden md:flex flex-col space-y-4 mr-6">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <Skeleton
                    key={i}
                    className="w-20 h-20 rounded-lg"
                    baseColor="#e5e7eb"
                    highlightColor="#f3f4f6"
                  />
                ))}
            </div>

            {/* MAIN IMAGE */}
            <div className="md:w-1/2">
              <Skeleton
                className="w-full h-[400px] sm:h-[500px] md:h-[420px] lg:h-[520px] rounded-lg"
                baseColor="#e5e7eb"
                highlightColor="#f3f4f6"
              />
            </div>

            {/* RIGHT CONTENT */}
            <div className="md:w-1/2 md:ml-10 mt-6 md:mt-0 space-y-4">
              <Skeleton width="70%" height={25} />
              <Skeleton width="30%" height={20} />

              <Skeleton width="90%" />
              <Skeleton width="80%" />
              <Skeleton width="60%" />

              {/* Color */}
              <div>
                <Skeleton width="20%" />
                <div className="flex gap-2 mt-2">
                  {Array(4)
                    .fill(0)
                    .map((_, i) => (
                      <Skeleton key={i} circle width={30} height={30} />
                    ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <Skeleton width="20%" />
                <div className="flex gap-2 mt-2">
                  {Array(4)
                    .fill(0)
                    .map((_, i) => (
                      <Skeleton key={i} circle width={30} height={30} />
                    ))}
                </div>
              </div>

              {/* Button */}
              <Skeleton height={45} />
            </div>
          </div>
        </div>
      ) : (
        <ProductDetails productId={bestSellers._id} />
      )}

      {/* ================= WOMEN TOP WEAR ================= */}
      <div className="container mx-auto p-10">
        <h2 className="text-xl md: text-2xl lg:text-3xl text-center font-bold mt-2 mb-6">
          Top Wear for Womens
        </h2>

        {/* ProductGrid already handles loading + error */}

        <ProductGrid products={products} loading={loading} error={error} />
      </div>

      {/* Featured + Features */}
      <FeaturedCollection />
      <FeaturesSection />
    </div>
  );
};

export default Home;
