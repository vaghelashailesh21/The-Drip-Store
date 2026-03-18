import React, { useState, useEffect } from 'react';
import Hero from '../components/Layout/Hero';
import GenderCollectionSection from '../components/Products/GenderCollectionSection';
import NewArrivals from '../components/Products/NewArrivals';
import ProductDetails from '../components/Products/ProductDetails';
import ProductGrid from '../components/Products/ProductGrid';
import FeaturedCollection from '../components/Products/FeaturedCollection';
import FeaturesSection from '../components/Products/FeaturesSection';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilters } from '../Redux/slices/productsSlice';
import { useLocation } from "react-router-dom";

import axios from 'axios';

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
      })
    );


    // Fetch Best Seller product
    const fetchBestSellers = async () => {
      try {
        setBestSellerLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
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
        <h2 className="text-xl lg:text-3xl md:text-3xl font-bold mb-4 whitespace-nowrap text-center">Explore New Arrivals</h2>
        <p className="text-sm p-2 lg:text-lg md:text-lg text-gray-600 lg:mb-15 mb-7">
          Discover the latest styles straight off the runway, freshly added to
          keep your wardrobe on the cutting edge of fashion
        </p>
      <NewArrivals />
      </div>

      {/* ================= BEST SELLER ================= */}
      <h2 className='text-xl lg:text-3xl md:text-3xl text-center font-bold mb-2 lg:mb-5 md:mb-5 mt-10 md:mt-15 lg:mt-15'>
        Best Seller
      </h2>

      {bestSellerLoading ? (
        <p className="text-center text-gray-500 py-5">
          Loading best seller product...
        </p>
      ) : bestSellerError ? (
        <p className="text-center text-red-500 py-5">
          {bestSellerError}
        </p>
      ) : bestSellers ? (
        <ProductDetails productId={bestSellers._id} />
      ) : (
        <p className="text-center text-gray-500 py-5">
          No best seller found
        </p>
      )}

      {/* ================= WOMEN TOP WEAR ================= */}
      <div className="container mx-auto p-4">
        <h2 className="text-xl md: text-2xl lg:text-3xl text-center font-bold mt-2 mb-6">
          Top Wear for Womens
        </h2>

        {/* ProductGrid already handles loading + error */}

        <ProductGrid
          products={products}
          loading={loading}
          error={error}
          />
      </div>

      {/* Featured + Features */}
      <FeaturedCollection />
      <FeaturesSection />
    </div>
  );
};

export default Home;