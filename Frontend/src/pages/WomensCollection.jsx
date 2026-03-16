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
          name: "French Style V-Neck Blouse Shirt",
          price: "16",
          images: [
            {
              url: "https://i.pinimg.com/1200x/a0/d8/03/a0d8036e5432cb6b5cf365e4da50f2f9.jpg",
            },
          ],
        },
        {
          _id: 2,
          name: "Designer Jacket",
          price: "45",
          images: [
            {
              url: "https://i.pinimg.com/736x/37/72/9a/37729a78525fc5d5db73a40f0b2e3860.jpg",
            },
          ],
        },
        {
          _id: 3,
          name: "Stripes Top",
          price: "10",
          images: [
            {
              url: "https://i.pinimg.com/736x/a0/bc/34/a0bc34b47f7406c3f25b467402ccc25c.jpg",
            },
          ],
        },
        {
          _id: 4,
          name: "French Style V-Neck Blouse Shirt",
          price: "14",
          images: [
            {
              url: "https://i.pinimg.com/736x/a0/96/98/a0969857e44909ad5ac8c9cdbed0aab2.jpg",
            },
          ],
        },
        {
          _id: 5,
          name: "SweatShirt",
          price: "12",
          images: [
            {
              url: "https://i.pinimg.com/736x/47/bf/dd/47bfddcefd1d445e2db287685ab28a7b.jpg",
            },
          ],
        },
        {
          _id: 6,
          name: "Blue Denim Jacket",
          price: "50",
          images: [
            {
              url: "https://i.pinimg.com/736x/92/60/b7/9260b7a8873f7751f5affdd87a758144.jpg",
            },
          ],
        },
        {
          _id: 7,
          name: "OverSized Hoodie",
          price: "16",
          images: [
            {
              url: "https://i.pinimg.com/1200x/01/93/92/01939240fa6ca601b887c431259267de.jpg",
            },
          ],
        },
        {
          _id: 8,
          name: "Brown Leather Jacket",
          price: "80",
          images: [
            {
              url: "https://i.pinimg.com/1200x/05/d7/2e/05d72ed895ddae8892f370ef5cf17088.jpg",
            },
          ],
        },
         {
          _id: 9,
          name: "High Waist Straight Jeans",
          price: "42",
          images: [
            {
              url: "https://i.pinimg.com/1200x/bd/4b/eb/bd4beb1bcbaf9d1b5379722d59b7446e.jpg",
            },
          ],
        },
        {
          _id: 10,
          name: "Baggy Jeans Light Blue",
          price: "44",
          images: [
            {
              url: "https://i.pinimg.com/1200x/d6/0a/2d/d60a2d6a648af4d7d02d0e425d9b468f.jpg",
            },
          ],
        },

        {
          _id: 11,
          name: "Ripped Denim Jeans",
          price: "45",
          images: [
            {
              url: "https://i.pinimg.com/1200x/d6/4f/f8/d64ff8e38a9996fa1ba20a68abd0a489.jpg",
            },
          ],
        },
        {
          _id: 12,
          name: "Wide Leg Palazzo Pants",
          price: "35",
          images: [
            {
              url: "https://i.pinimg.com/1200x/5d/35/c4/5d35c46e2929e0390d19afd27401bca5.jpg",
            },
          ],
        },
        {
          _id: 13,
          name: "Jogger Pants Olive Green",
          price: "28",
          images: [
            {
              url: "https://i.pinimg.com/736x/0a/e2/0b/0ae20bbd9a496806be7690f13aa674c5.jpg",
            },
          ],
        },
        {
          _id: 14,
          name: "Grey Sweatpants",
          price: "25",
          images: [
            {
              url: "https://i.pinimg.com/1200x/92/e3/20/92e320b4d530d526d900fd044df682b0.jpg",
            },
          ],
        },
        {
          _id: 15,
          name: "Track Pants Navy Blue",
          price: "26",
          images: [
            {
              url: "https://i.pinimg.com/1200x/31/58/94/315894b44e442f568527e73a46056637.jpg",
            },
          ],
        },
        {
          _id: 16,
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
      <div className="flex flex-col lg:flex-row mb-3" >
      {/* mobile filter button */}
      <button onClick={toggleSidebar} className="lg:hidden border border-gray-200 p-2 mt-2.5 justify-center  items-center flex ">
        <FaFilter className="mr-1" /> Filter
      </button>

      {/* Filter Sidebar */}
      <div
        ref={sidebarRef} 
        className={`${isSideBarOpen ? "translate-x-0" : "-translate-x-full"} mt-4.5  sm:mt-5 lg:mt-0  bottom-0 z-40 left-0 bg-white w-64 overflow-y-auto  transform transition-transform duration-300 lg:static lg:translate-x-0`} style={{position: 'fixed', background: '#fff',zIndex: '9999', top: '114px'}}
       >
        <FilterSidebar />
      </div>
       <div className="grow p-4 gap-4 lg:pl-70 ">
          <h2 className="text-xl font-medium lg:font-light lg:text-2xl text-center uppercase  mb-3 lg:mb-0 lg:mt-3 ">Women's Collection</h2>

        {/*sort options*/}
        <SortOptions /> 

        {/* product grid */}
        <ProductGrid products={products}/>

      </div>
    </div>
  );
};

export default CollectionPage;
