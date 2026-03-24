import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import { useSearchParams, useNavigate } from "react-router-dom";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
=======
import { Navigate, useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
>>>>>>> 4a206cfc9149b72045b426e759751845d0bf9973
  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    minPrice: 0,
<<<<<<< HEAD
    maxPrice: 5000,
  });

  const [priceRange, setPriceRange] = useState([0, 5000]);
=======
    maxPrice: 100,
  });

  const [priceRange, setPriceRange] = useState([0, 100]);
>>>>>>> 4a206cfc9149b72045b426e759751845d0bf9973

  const categoris = ["Top Wear", "Bottom Wear"];

  const colors = [
<<<<<<< HEAD
    "#0B0B0B",
    "#FFFFFF",
    "#000c65",
    "#2F4F2F",
    "#3f2e24",
    "#59045c",
    "#fcd38d",
    "#66646f",
    "#4682B4",
    "#d6d7d9",
=======
    "#0B0B0B", // Jet Black
    "#FFFFFF", // Pure White
    "#000c65", // Midnight Blue
    "#2F4F2F", // Deep Olive
    "#3f2e24", // Coffee Brown
    "#59045c", // Burgundy
    "#c99a00", // Gold
    "#fcd38d", // Soft Cream
    "#cbd6e1", // Steel Gray
    "#66646fb9", // Gray
    "#4682B4", // Denim Blue
    "#ea7221", // Coral Accent
>>>>>>> 4a206cfc9149b72045b426e759751845d0bf9973
  ];

  const sizes = ["S", "M", "L", "XL"];

  const materials = [
    "Cotton",
    "Polyester",
    "Denim",
    "Linen",
    "Wool",
    "Leather",
    "Fleece",
  ];

  const genders = ["Men", "Women"];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    setFilters({
      gender: params.gender || "",
      category: params.category || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      minPrice: params.minPrice || 0,
<<<<<<< HEAD
      maxPrice: params.maxPrice || 5000,
    });

    setPriceRange([0, params.maxPrice || 5000]);
=======
      maxPrice: params.Price || 100,
    });

    setPriceRange([0, params.maxPrice || 100]);
>>>>>>> 4a206cfc9149b72045b426e759751845d0bf9973
  }, [searchParams]);

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;

    let newFilters = { ...filters };

    if (type === "checkbox") {
      if (checked) {
        newFilters[name] = [...(newFilters[name] || []), value];
      } else {
        newFilters[name] = newFilters[name].filter((item) => item !== value);
      }
    } else {
<<<<<<< HEAD
      // 🔥 toggle logic
      if (newFilters[name] === value) {
        newFilters[name] = "";
      } else {
        newFilters[name] = value;
      }
    }

=======
      newFilters[name] = value;
    }
>>>>>>> 4a206cfc9149b72045b426e759751845d0bf9973
    setFilters(newFilters);
    updateURlParams(newFilters);
  };

  const updateURlParams = (newFilters) => {
    const params = new URLSearchParams();
    // {category: "Top Wear", size: ["S", "M"] }
    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.append(key, newFilters[key].join(","));
      } else if (newFilters[key]) {
        params.append(key, newFilters[key]);
      }
    });
    setSearchParams(params);
<<<<<<< HEAD
    navigate(`?${params.toString()}`); // ?category=Bottom+Wear&size=XS%2CS
=======
    Navigate(`?${params.toString()}`); // ?category=Bottom+Wear&size=XS%2CS
>>>>>>> 4a206cfc9149b72045b426e759751845d0bf9973
  };

  const handlePriceChange = (e) => {
    const newPrice = e.target.value;
    setPriceRange([0, newPrice]);
    const newFilters = { ...filters, minPrice: 0, maxPrice: newPrice };
<<<<<<< HEAD
    setFilters(newFilters);
    updateURlParams(newFilters);
  };

  const handleGenderClick = (gender) => {
    const newFilters = {
      ...filters,
      gender: filters.gender === gender ? "" : gender,
    };

    setFilters(newFilters);
    updateURlParams(newFilters);
  };

  const handleCategoryClick = (category) => {
  const newFilters = {
    ...filters,
    category: filters.category === category ? "" : category,
  };

  setFilters(newFilters);
  updateURlParams(newFilters);
};

=======
    setFilters(filters);
    updateURlParams(newFilters);
  };

>>>>>>> 4a206cfc9149b72045b426e759751845d0bf9973
  return (
    <div className="p-4">
      <h3 className="text-xl font-medium text-gray-800 mb-3">Filter</h3>

      {/* Gender filter */}
      <div className="mb-4">
        <label className="block text-gray-600 font-medium mb-2">Gender</label>
<<<<<<< HEAD

        {genders.map((gender) => (
          <label key={gender} className="flex items-center mb-1 cursor-pointer">
=======
        {genders.map((gender) => (
          <div key={gender} className="flex items-center mb-1">
>>>>>>> 4a206cfc9149b72045b426e759751845d0bf9973
            <input
              type="radio"
              name="gender"
              value={gender}
<<<<<<< HEAD
              checked={filters.gender === gender}
              onChange={handleFilterChange}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span onClick={() => handleGenderClick(gender)} className="text-gray-700">{gender}</span>
          </label>
=======
              onChange={handleFilterChange}
              checked={filters.gender === gender}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{gender}</span>
          </div>
>>>>>>> 4a206cfc9149b72045b426e759751845d0bf9973
        ))}
      </div>

      {/* catogory filter */}

      <div className="mb-4">
        <label className="block text-gray-600 font-medium mb-2">Catogory</label>
        {categoris.map((category) => (
<<<<<<< HEAD
            <label key={category} className="flex items-center mb-1 cursor-pointer">
=======
          <div key={category} className="flex items-center mb-1">
>>>>>>> 4a206cfc9149b72045b426e759751845d0bf9973
            <input
              type="radio"
              name="category"
              value={category}
<<<<<<< HEAD
              checked={filters.category === category}
              onChange={handleFilterChange}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span onClick={() => handleCategoryClick(category)} className="text-gray-700">{category}</span>
          </label>
=======
              onChange={handleFilterChange}
              checked={filters.category === category}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{category}</span>
          </div>
>>>>>>> 4a206cfc9149b72045b426e759751845d0bf9973
        ))}
      </div>

      {/* Color filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Color</label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
<<<<<<< HEAD
              type="button"
              name="color"
              value={color}
              onClick={handleFilterChange}
              className={`w-8 h-8 rounded-full border border-gray-300 hover:scale-105 transition-transform ${
                filters.color === color ? "ring-2 ring-blue-500" : ""
              }`}
              style={{ backgroundColor: color }}
=======
              type="color"
              name="color"
              value={color}
              onClick={handleFilterChange}
              className={`w-8 h-8 rounded-full border border-gray-300 hover:scale-105 transition-transform ${filters.color === color ? "ring-blue-500" : ""}`}
              style={{ backgroundColor: color.toLowerCase() }}
>>>>>>> 4a206cfc9149b72045b426e759751845d0bf9973
            />
          ))}
        </div>
      </div>

      {/* Size filter */}

      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Size</label>
        {sizes.map((size) => (
          <div className=" items-center mb-1" key={size}>
            <input
              type="checkbox"
              name="size"
              value={size}
              onChange={handleFilterChange}
              checked={filters.size.includes(size)}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span>{size}</span>
          </div>
        ))}
      </div>

      {/* Material filter */}

      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Material</label>
        {materials.map((material) => (
          <div className=" items-center mb-1" key={material}>
            <input
              type="checkbox"
              name="material"
              value={material}
              onChange={handleFilterChange}
              checked={filters.material.includes(material)}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span>{material}</span>
          </div>
        ))}
      </div>

      {/* Price Range */}

      <div className="mb-8">
        <label className="block text-gray-600 font-medium mb-2">
          Price Range
        </label>
        <input
          type="range"
          name="priceRange"
          min={0}
<<<<<<< HEAD
          max={5000}
=======
          max={100}
>>>>>>> 4a206cfc9149b72045b426e759751845d0bf9973
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer "
        />
        <div className="flex justify-between text-gray-600 mt-2">
<<<<<<< HEAD
          <span>₹0</span>
          <span>₹{priceRange[1]}</span>
=======
          <span>$0</span>
          <span>${priceRange[1]}</span>
>>>>>>> 4a206cfc9149b72045b426e759751845d0bf9973
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
