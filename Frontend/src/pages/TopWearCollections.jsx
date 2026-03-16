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
          name: "OverSized Hoodie",
          price: "16",
          images: [
            {
              url: "https://i.pinimg.com/1200x/01/93/92/01939240fa6ca601b887c431259267de.jpg",
            },
          ],
        },
        {
          _id: 2,
          name: "Gray Knitted Pullover",
          price: "12",
          images: [
            {
              url: "https://i.pinimg.com/1200x/7f/af/08/7faf089e1b57d7b7f5abf629d259b6ab.jpg",
            },
          ],
        },
        {
          _id: 3,
          name: "Blue Denim Jacket",
          price: "50",
          images: [
            {
              url: "https://i.pinimg.com/736x/92/60/b7/9260b7a8873f7751f5affdd87a758144.jpg",
            },
          ],
        },
        {
          _id: 4,
          name: "Blue Denim Jacket",
          price: "50",
          images: [
            {
              url: "https://i.pinimg.com/736x/09/2f/1b/092f1be2bf9c6e025b8fc97e71802c70.jpg",
            },
          ],
        },
        {
          _id: 5,
          name: "French Style V-Neck Blouse Shirt",
          price: "16",
          images: [
            {
              url: "https://i.pinimg.com/1200x/a0/d8/03/a0d8036e5432cb6b5cf365e4da50f2f9.jpg",
            },
          ],
        },
        {
          _id: 6,
          name: "Black Leather Jacket",
          price: "90",
          images: [
            {
              url: "https://i.pinimg.com/736x/71/f1/03/71f103ca280f15140f75ae6e75786840.jpg",
            },
          ],
        },
        {
          _id: 7,
          name: "Oversized Tshirt",
          price: "45",
          images: [
            {
              url: "https://i.pinimg.com/1200x/a1/f8/6a/a1f86a1424e75e44fac5f3a634dea225.jpg",
            },
          ],
        },
        {
          _id: 8,
          name: "SweatShirt",
          price: "12",
          images: [
            {
              url: "https://i.pinimg.com/736x/47/bf/dd/47bfddcefd1d445e2db287685ab28a7b.jpg",
            },
          ],
        },
        {
          _id: 9,
          name: "Small Checks Shirt",
          price: "10",
          images: [
            {
              url: "https://i.pinimg.com/1200x/32/e6/3a/32e63a1d99014dcb0c04f7e6b034552b.jpg",
            },
          ],
        },
        {
          _id: 10,
          name: "Pure White Shirt",
          price: "14",
          images: [
            {
              url: "https://i.pinimg.com/736x/c2/f4/a9/c2f4a9063f9036b2fa392b5968876f3a.jpg",
            },
          ],
        },
        {
          _id: 11,
          name: "Black Knitted Polo T-shirt",
          price: "16",
          images: [
            {
              url: "https://i.pinimg.com/1200x/92/ea/00/92ea001ad5538e7421e34ce096621ff4.jpg",
            },
          ],
        },
        {
          _id: 12,
          name: "French Style V-Neck Blouse Shirt",
          price: "14",
          images: [
            {
              url: "https://i.pinimg.com/736x/a0/96/98/a0969857e44909ad5ac8c9cdbed0aab2.jpg",
            },
          ],
        },
        {
          _id: 13,
          name: "Stripes Top",
          price: "10",
          images: [
            {
              url: "https://i.pinimg.com/736x/a0/bc/34/a0bc34b47f7406c3f25b467402ccc25c.jpg",
            },
          ],
        },
        {
          _id: 14,
          name: "Black OverSized Hoodie",
          price: "16",
          images: [
            {
              url: "https://i.pinimg.com/1200x/d9/dd/10/d9dd100c96a377edc0c8b0b5d5569dea.jpg",
            },
          ],
        },
        {
          _id: 15,
          name: "Designer Jacket",
          price: "45",
          images: [
            {
              url: "https://i.pinimg.com/736x/37/72/9a/37729a78525fc5d5db73a40f0b2e3860.jpg",
            },
          ],
        },
        {
          _id: 16,
          name: "Leather Jacket",
          price: "90",
          images: [
            {
              url: "https://i.pinimg.com/1200x/88/7c/80/887c8058b0be3b340455a51e0b0699c3.jpg",
            },
          ],
        },
        {
          _id: 17,
          name: "Biker Jacket",
          price: "90",
          images: [
            {
              url: "https://i.pinimg.com/736x/fc/c7/64/fcc764cf1f7a5519a6d0d86ddcebbae2.jpg",
            },
          ],
        },
        {
          _id: 18,
          name: "Black Denim Jacket",
          price: "50",
          images: [
            {
              url: "https://i.pinimg.com/1200x/f9/94/8b/f9948bd1d4fa6ade25538f5735e2066e.jpg",
            },
          ],
        },
        {
          _id: 19,
          name: "Flannel Shirt",
          price: "20",
          images: [
            {
              url: "https://i.pinimg.com/736x/21/ec/44/21ec44676d364c987b30246f34ff86ab.jpg",
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
          Top-Wear Collection
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
