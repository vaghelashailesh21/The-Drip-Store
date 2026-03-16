import React, { useState, useEffect } from 'react'
import Hero from '../components/Layout/Hero'
import GenderCollectionSection from '../components/Products/GenderCollectionSection'
import NewArrivals from '../components/Products/NewArrivals'
import ProductDetails from '../components/Products/ProductDetails'
import ProductGrid from '../components/Products/ProductGrid'
import FeaturedCollection from '../components/Products/FeaturedCollection'
import FeaturesSection from '../components/Products/FeaturesSection'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsByFilters } from '../Redux/slices/productsSlice'
import axios from 'axios'


const Home = () => {
  const dispatch = useDispatch();
  const {products, loading, error} = useSelector((state) => state.products);
  const [bestSellers, setBestSellers] = useState(null);

    useEffect(() => { 
      // fetch products for specific collection (e.g., best sellers)
     dispatch(
      fetchProductsByFilters({ 
        gender: "Women",
        category: "Top Wear",
        limit: 8,
      })
    );
    // fetch best seller product
      const fetchBestSellers = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`);
          setBestSellers(response.data);
        } catch (error) {
          console.error(error);
        } 
      };
      fetchBestSellers();
    }, [dispatch]);

  return (
    <div>
        <Hero/>
        <GenderCollectionSection/>
        <NewArrivals/>
        {/* Best Seller section */}
        <h2 className='text-3xl text-center font-bold mb-2 mt-15 '>Best Seller</h2>
        {bestSellers ? (
          <ProductDetails productId={bestSellers._id} />
        ) : (
          <p className="text-center text-gray-500">Loading best seller product...</p>
        )}
        {/* Womens top section */}
        <div className="container mx-auto">
          <h2 className="text-3xl text-center font-bold mt-10 mb-6 ">
            Top Wear for Womens
          </h2>
          <ProductGrid products={products} loading={loading} error={error} />
        </div>

        <FeaturedCollection/>
        <FeaturesSection/>
    </div>
  )
}

export default Home