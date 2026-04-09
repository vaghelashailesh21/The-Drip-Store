import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchProductDetails,
  updateProduct,
} from "../../Redux/slices/productsSlice";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const EditProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { selectedProduct, loading, error } = useSelector(
    (state) => state.products
  );

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

  useEffect(() => {
    if (id) dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedProduct) {
      setProductData({
        ...selectedProduct,
        sizes: selectedProduct.sizes || [],
        colors: selectedProduct.colors || [],
        images: selectedProduct.images || [],
        isFeatured: selectedProduct.isFeatured || false,
        isPublished: selectedProduct.isPublished || false,
      });
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Upload Image
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
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setProductData((prev) => ({
        ...prev,
        images: [...prev.images, { url: data.imageUrl }],
      }));

      setUploading(false);
    } catch (err) {
      console.error(err);
      setUploading(false);
    }
  };

  // Remove Image
  const handleRemoveImage = (index) => {
    setProductData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateProduct({ id, productData }));
    navigate("/admin/products");
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6">
        <Skeleton height={35} width={200} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} height={40} />
            ))}
        </div>

        <Skeleton height={100} />

        <Skeleton height={40} />
        <Skeleton height={40} />

        <Skeleton height={50} />
      </div>
    );
  }

  // ================= ERROR =================
  if (error) {
    return (
      <div className="min-h-[60vh] md:min-h-screen flex items-start md:items-center justify-center pt-16 md:pt-0 px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">✏️</div>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
            Failed to load product
          </h2>
          <p className="text-gray-500 max-w-md mb-6">
            We couldn’t fetch product details. Please try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // ================= MAIN =================
  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 shadow-md rounded-md bg-white">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">
        Edit Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <input name="name" value={productData.name} onChange={handleChange} className="border p-2 rounded" placeholder="Name" />
          <input type="number" name="price" value={productData.price} onChange={handleChange} className="border p-2 rounded" placeholder="Price" />
          <input type="number" name="countInStock" value={productData.countInStock} onChange={handleChange} className="border p-2 rounded" placeholder="Stock" />
          <input name="sku" value={productData.sku} onChange={handleChange} className="border p-2 rounded" placeholder="SKU" />

          <select name="category" value={productData.category} onChange={handleChange} className="border p-2 rounded">
            <option value="">Category</option>
            <option value="Top Wear">Top Wear</option>
            <option value="Bottom Wear">Bottom Wear</option>
          </select>

          <select name="gender" value={productData.gender} onChange={handleChange} className="border p-2 rounded">
            <option value="">Gender</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Unisex">Unisex</option>
          </select>

          <input name="collections" value={productData.collections} onChange={handleChange} className="border p-2 rounded" placeholder="Collection" />

        </div>

        {/* Description */}
        <textarea
          name="description"
          value={productData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows={4}
          placeholder="Description"
        />

        {/* Sizes */}
        <input
          type="text"
          value={productData.sizes.join(",")}
          onChange={(e) =>
            setProductData({
              ...productData,
              sizes: e.target.value.split(",").map((s) => s.trim()),
            })
          }
          className="border p-2 rounded w-full"
          placeholder="Sizes (S, M, L)"
        />

        {/* Colors */}
        <input
          type="text"
          value={productData.colors.join(",")}
          onChange={(e) =>
            setProductData({
              ...productData,
              colors: e.target.value.split(",").map((c) => c.trim()),
            })
          }
          className="border p-2 rounded w-full"
          placeholder="Colors"
        />

        {/* Toggles */}
        <div className="flex gap-4">
          <label className="flex gap-2">
            <input type="checkbox" name="isFeatured" checked={productData.isFeatured} onChange={handleChange} />
            Featured
          </label>
          <label className="flex gap-2">
            <input type="checkbox" name="isPublished" checked={productData.isPublished} onChange={handleChange} />
            Published
          </label>
        </div>

        {/* Image Upload */}
        <div>
          <input type="file" onChange={handleImageUpload} />

          {uploading && (
            <div className="flex gap-2 mt-2">
              <Skeleton width={80} height={80} />
              <Skeleton width={80} height={80} />
            </div>
          )}

          <div className="flex flex-wrap gap-4 mt-4">
            {productData.images?.map((img, i) => (
              <div key={i} className="relative">
                <img
                  src={img.url}
                  alt=""
                  className="w-20 h-20 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(i)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;