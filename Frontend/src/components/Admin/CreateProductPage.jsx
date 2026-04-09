import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../Redux/slices/productsSlice";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CreateProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  // Handle input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Image Upload
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
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      setProductData((prev) => ({
        ...prev,
        images: [...prev.images, { url: data.imageUrl, altText: "" }],
      }));

      setUploading(false);
    } catch (err) {
      setUploading(false);
      setError("Image upload failed. Try again.");
    }
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const finalData = {
        ...productData,
        sizes: productData.sizes.length ? productData.sizes : ["M"],
        colors: productData.colors.length ? productData.colors : ["Black"],
        collections: productData.collections || "default",
      };

      await dispatch(createProduct(finalData));
      navigate("/admin/products");
    } catch (err) {
      setError("Failed to create product. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = (index) => {
    setProductData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // ================= ERROR UI =================
  if (error && !loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-start sm:justify-center pt-20 sm:pt-0 bg-gray-50 px-4">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-center">
          Something went wrong
        </h2>
        <p className="text-gray-500 mb-6 text-center max-w-md">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 shadow-md rounded-md bg-white">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">Create Product</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {["name", "price", "countInStock", "sku"].map((field, i) => (
            <div key={i}>
              <label className="block font-semibold mb-1 capitalize">
                {field}
              </label>
              {loading ? (
                <Skeleton height={40} />
              ) : (
                <input
                  type={
                    field === "price" || field === "countInStock"
                      ? "number"
                      : "text"
                  }
                  name={field}
                  value={productData[field]}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              )}
            </div>
          ))}

          {/* Category */}
          <div>
            <label className="block font-semibold mb-1">Category</label>
            {loading ? (
              <Skeleton height={40} />
            ) : (
              <select
                name="category"
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="">Select</option>
                <option value="Top Wear">Top Wear</option>
                <option value="Bottom Wear">Bottom Wear</option>
              </select>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block font-semibold mb-1">Gender</label>
            {loading ? (
              <Skeleton height={40} />
            ) : (
              <select
                name="gender"
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="">Select</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Unisex">Unisex</option>
              </select>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-1">Description</label>
          {loading ? (
            <Skeleton height={80} />
          ) : (
            <textarea
              name="description"
              onChange={handleChange}
              className="w-full border p-2 rounded"
              rows={4}
            />
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-semibold mb-1">Upload Images</label>

          {/* Upload Input */}
          <input type="file" onChange={handleImageUpload} className="mb-3" />

          {/* Upload Loader */}
          {uploading && (
            <div className="flex gap-3">
              {Array(2)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="w-20 h-20 bg-gray-200 animate-pulse rounded"
                  ></div>
                ))}
            </div>
          )}

          {/* Image Preview */}
          <div className="grid grid-cols-3 sm:flex gap-4 mt-4">
            {productData.images.map((img, i) => (
              <div key={i} className="relative group">
                <img
                  src={img.url}
                  alt=""
                  className="w-20 h-20 object-cover rounded border"
                />

                {/* REMOVE BUTTON */}
                <button
                  type="button"
                  onClick={() => handleRemoveImage(i)}
                  className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Creating Product..." : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default CreateProductPage;
