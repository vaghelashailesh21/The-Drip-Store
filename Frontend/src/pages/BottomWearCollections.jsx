import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const sidebarRef = useRef(null);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

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

  useEffect(() => {
    setTimeout(() => {
      const fetchedProducts = [
        {
          _id: 1,
          name: "Slim Fit Blue Jeans",
          price: "40",
          images: [
            {
              url: "https://i.pinimg.com/1200x/84/cd/e8/84cde854c92e964e78cb0dc73b444d51.jpg",
            },
          ],
        },
        {
          _id: 2,
          name: "Black Cargo Pants",
          price: "35",
          images: [
            {
              url: "https://i.pinimg.com/1200x/a4/55/fb/a455fbdf7205dca63cc39eaf6ab68535.jpg",
            },
          ],
        },
        {
          _id: 3,
          name: "Grey Sweatpants",
          price: "25",
          images: [
            {
              url: "https://i.pinimg.com/1200x/92/e3/20/92e320b4d530d526d900fd044df682b0.jpg",
            },
          ],
        },
        {
          _id: 4,
          name: "Classic Chinos Beige",
          price: "30",
          images: [
            {
              url: "https://i.pinimg.com/1200x/22/39/b2/2239b20c8d940481f28b4d472493ea8a.jpg",
            },
          ],
        },
        {
          _id: 5,
          name: "Ripped Denim Jeans",
          price: "45",
          images: [
            {
              url: "https://i.pinimg.com/1200x/d6/4f/f8/d64ff8e38a9996fa1ba20a68abd0a489.jpg",
            },
          ],
        },
        {
          _id: 6,
          name: "Formal Trousers Black",
          price: "38",
          images: [
            {
              url: "https://i.pinimg.com/1200x/81/14/8f/81148f182b3651712ca197034e071792.jpg",
            },
          ],
        },
        {
          _id: 7,
          name: "Jogger Pants Olive Green",
          price: "28",
          images: [
            {
              url: "https://i.pinimg.com/736x/0a/e2/0b/0ae20bbd9a496806be7690f13aa674c5.jpg",
            },
          ],
        },
        {
          _id: 8,
          name: "Denim Shorts Blue",
          price: "20",
          images: [
            {
              url: "https://i.pinimg.com/1200x/ce/d6/1b/ced61bfe34675785995d46e691ad4fb4.jpg",
            },
          ],
        },
        {
          _id: 9,
          name: "High Waist Wide Leg Pants",
          price: "32",
          images: [
            {
              url: "https://i.pinimg.com/1200x/87/ab/30/87ab30f0f79b72220d3bbb59993b1d29.jpg",
            },
          ],
        },
        {
          _id: 10,
          name: "Skinny Fit Black Jeans",
          price: "42",
          images: [
            {
              url: "https://i.pinimg.com/736x/d6/de/6c/d6de6c5f81375b0bb12e76def09cc273.jpg",
            },
          ],
        },
        {
          _id: 11,
          name: "Linen Pants White",
          price: "34",
          images: [
            {
              url: "https://i.pinimg.com/1200x/2c/6b/20/2c6b204b01262be1abec007198159f67.jpg",
            },
          ],
        },
        {
          _id: 12,
          name: "Track Pants Navy Blue",
          price: "26",
          images: [
            {
              url: "https://i.pinimg.com/1200x/31/58/94/315894b44e442f568527e73a46056637.jpg",
            },
          ],
        },
        {
          _id: 13,
          name: "Pleated Trousers Grey",
          price: "36",
          images: [
            {
              url: "https://i.pinimg.com/1200x/a6/17/32/a6173255f60bdf0530bf7baddd5e8cb5.jpg",
            },
          ],
        },
        {
          _id: 14,
          name: "Casual Shorts Khaki",
          price: "18",
          images: [
            {
              url: "https://i.pinimg.com/1200x/18/0c/c8/180cc8b959e4c96b160941c6fd4843d4.jpg",
            },
          ],
        },
        {
          _id: 15,
          name: "Baggy Jeans Light Blue",
          price: "44",
          images: [
            {
              url: "https://i.pinimg.com/1200x/d6/0a/2d/d60a2d6a648af4d7d02d0e425d9b468f.jpg",
            },
          ],
        },
        {
          _id: 16,
          name: "Cotton Pajama Pants",
          price: "22",
          images: [
            {
              url: "https://i.pinimg.com/1200x/46/9c/17/469c172d12ec6ba270806ecf7ebe7435.jpg",
            },
          ],
        },
        {
          _id: 17,
          name: "High Waist Straight Jeans",
          price: "42",
          images: [
            {
              url: "https://i.pinimg.com/1200x/bd/4b/eb/bd4beb1bcbaf9d1b5379722d59b7446e.jpg",
            },
          ],
        },
        {
          _id: 18,
          name: "Wide Leg Palazzo Pants",
          price: "35",
          images: [
            {
              url: "https://i.pinimg.com/1200x/5d/35/c4/5d35c46e2929e0390d19afd27401bca5.jpg",
            },
          ],
        },
        {
          _id: 19,
          name: "Black loose fit joggers",
          price: "28",
          images: [
            {
              url: "https://i.pinimg.com/1200x/5e/e1/5e/5ee15ebe037b6f7bedf327473c28ccfa.jpg",
            },
          ],
        },
      ];
      setProducts(fetchedProducts);
    }, 1000);
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
        className={`${isSideBarOpen ? "translate-x-0" : "-translate-x-full"} mt-4.5  sm:mt-5 lg:mt-0  bottom-0 z-40 left-0 bg-white w-64 overflow-y-auto  transform transition-transform duration-300 lg:static lg:translate-x-0`}
        style={{
          position: "fixed",
          background: "#fff",
          zIndex: "9999",
          top: "114px",
        }}
      >
        <FilterSidebar />
      </div>
      <div className="grow p-4 gap-4 lg:pl-70 ">
        <h2 className="text-xl font-medium lg:font-light lg:text-2xl text-center uppercase  mb-3 lg:mb-0 lg:mt-3 ">
          Bottom-Wear Collection
        </h2>

        {/*sort options*/}
        <SortOptions />

        {/* product grid */}
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default CollectionPage;
