import React, {  useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from '../Redux/slices/productsSlice';

const CollectionPage = () => {
  const {collection} = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const queryParams = Object.fromEntries([...searchParams]);
  
  const sidebarRef = useRef(null);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  // Fetch products when filters/collection change
  useEffect(() => {
      dispatch(fetchProductsByFilters({ collection, ...queryParams }));
  }, [dispatch, collection, searchParams]);

 // Scroll to top when route OR filters change
  useEffect(() => {
    const container = document.getElementById("main-scroll");

    if (container) {
      container.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [location, searchParams]);

  const toggleSidebar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const handleClickOutside = (e) => {
    // close sidebar if clicked outside
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSideBarOpen(false);
    }
  };

  useEffect(() => {
    // add event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);

    // close event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col lg:flex-row mb-3">
      {/* mobile filter button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden border border-gray-200 p-2 mt-2.5 justify-center  items-center flex "
      >
        <FaFilter className="mr-1" /> Filter
      </button>

      {/* Filter Sidebar */}
      <div
        ref={sidebarRef}
        className={`${isSideBarOpen ? "translate-x-0" : "-translate-x-full"} mt-4.5  sm:mt-5 lg:mt-0  bottom-0 z-40 left-0 bg-white w-64 overflow-y-auto  transform transition-transform duration-300 lg:static lg:translate-x-0 top-[72px] lg:top-[114px] md:top-[90px]`}
        style={{
          position: "fixed",
          background: "#fff",
          zIndex: "9999",
        }}
      >
        <FilterSidebar />
        
      </div>
      <div className="grow p-4 gap-4 lg:pl-69 ">
        {/* <h2 className="text-xl font-medium lg:font-light lg:text-2xl text-center uppercase  mb-3 lg:mb-0 lg:mt-3 ">
        All Collection
        </h2> */}

        {/*sort options*/}
        <SortOptions />

        {/* product grid */}
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default CollectionPage;
