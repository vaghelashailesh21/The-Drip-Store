import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../Redux/slices/productsSlice";
import axios from "axios";

const CreateProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    isFeatured: false,
    isPublished: false,
    images: [],
  });

  const [uploading, setUploading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);

      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setProductData((prev) => ({
        ...prev,
        images: [...prev.images, { url: data.imageUrl, altText: "" }],
      }));

      setUploading(false);
    } catch (err) {
      console.error(err);
      setUploading(false);
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalData = {
      ...productData,
      sizes: productData.sizes.length ? productData.sizes : ["M"],
      colors: productData.colors.length ? productData.colors : ["Black"],
      collections: productData.collections || "default",
    };

    await dispatch(createProduct(finalData));
    navigate("/admin/products");
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 shadow-md rounded-md bg-white">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">
        Create Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* GRID: Name, Price, Stock, SKU, Category, Gender, Material, Collection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Name */}
          <div>
            <label className="block font-semibold mb-1">Product Name</label>
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block font-semibold mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block font-semibold mb-1">Stock</label>
            <input
              type="number"
              name="countInStock"
              value={productData.countInStock}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          {/* SKU */}
          <div>
            <label className="block font-semibold mb-1">SKU</label>
            <input
              type="text"
              name="sku"
              value={productData.sku}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block font-semibold mb-1">Category</label>
            <select
              name="category"
              value={productData.category}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Select Category</option>
              <option value="Top Wear">Top Wear</option>
              <option value="Bottom Wear">Bottom Wear</option>
            </select>
          </div>

          {/* Gender */}
          <div>
            <label className="block font-semibold mb-1">Gender</label>
            <select
              name="gender"
              value={productData.gender}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Select</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Unisex">Unisex</option>
            </select>
          </div>

          {/* Material */}
          <div>
            <label className="block font-semibold mb-1">Material</label>
            <select
              name="material"
              value={productData.material}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Material</option>
              <option value="cotton">Cotton</option>
              <option value="polyester">Polyester</option>
              <option value="denim">Denim</option>
              <option value="linen">Linen</option>
              <option value="wool">Wool</option>
              <option value="leather">Leather</option>
              <option value="fleece">Fleece</option>
            </select>
          </div>

          {/* Collection */}
          <div>
            <label className="block font-semibold mb-1">Collection</label>
            <input
              type="text"
              name="collections"
              value={productData.collections}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows={4}
            required
          />
        </div>

        {/* Sizes */}
        <div>
          <label className="block font-semibold mb-1">Sizes</label>
          <input
            type="text"
            placeholder="S, M, L"
            value={productData.sizes.join(",")}
            onChange={(e) =>
              setProductData({
                ...productData,
                sizes: e.target.value.split(",").map((s) => s.trim()),
              })
            }
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Colors */}
        <div>
          <label className="block font-semibold mb-1">Colors</label>
          <input
            type="text"
            placeholder="Black, White"
            value={productData.colors.join(",")}
            onChange={(e) =>
              setProductData({
                ...productData,
                colors: e.target.value.split(",").map((c) => c.trim()),
              })
            }
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Toggles */}
        <div className="flex flex-col sm:flex-row gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isFeatured"
              checked={productData.isFeatured}
              onChange={handleChange}
            />
            Featured Product
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isPublished"
              checked={productData.isPublished}
              onChange={handleChange}
            />
            Published
          </label>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-semibold mb-1">Upload Images</label>
          <input type="file" onChange={handleImageUpload} />

          {uploading && (
            <div className="w-20 h-20 bg-gray-200 animate-pulse mt-2"></div>
          )}

          <div className="grid grid-cols-3 sm:flex gap-4 mt-4">
            {productData.images.map((img, i) => (
              <img
                key={i}
                src={img.url}
                alt=""
                className="w-20 h-20 object-cover rounded"
              />
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProductPage;