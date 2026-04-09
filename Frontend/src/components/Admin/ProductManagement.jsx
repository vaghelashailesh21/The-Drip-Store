import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  deleteProduct,
  fetchAdminProducts,
} from "../../Redux/slices/adminProductSlice";

const ProductManagement = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.adminProducts);

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <h2 className="text-2xl font-bold mb-6">
          <Skeleton width={250} />
        </h2>

        {/* Mobile Skeleton Cards */}
        <div className="grid gap-4 sm:hidden">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="border rounded-lg p-4 shadow-sm bg-white space-y-2">
                <Skeleton height={150} width="100%" className="rounded" />
                <Skeleton height={20} width="60%" />
                <Skeleton height={15} width="40%" />
                <Skeleton height={15} width="30%" />
                <div className="flex gap-2">
                  <Skeleton width="50%" height={35} />
                  <Skeleton width="50%" height={35} />
                </div>
              </div>
            ))}
        </div>

        {/* Desktop Table Skeleton */}
        <div className="hidden sm:block overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full text-left text-gray-500">
            <thead className="bg-gray-100 text-xs uppercase text-gray-700">
              <tr>
                {["Image", "Name", "Price", "SKU", "Actions"].map((_, i) => (
                  <th key={i} className="py-3 px-4">
                    <Skeleton width={80} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-4">
                      <Skeleton width={50} height={50} className="rounded" />
                    </td>
                    <td className="p-4">
                      <Skeleton width={120} height={20} />
                    </td>
                    <td className="p-4">
                      <Skeleton width={60} height={20} />
                    </td>
                    <td className="p-4">
                      <Skeleton width={80} height={20} />
                    </td>
                    <td className="p-4 flex gap-2">
                      <Skeleton width={60} height={30} />
                      <Skeleton width={60} height={30} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // ================= ERROR =================
if (error) {
  return (
    <div className="min-h-screen flex flex-col items-center 
                    justify-start sm:justify-center pt-20 sm:pt-0 bg-gray-50">
      <div className="text-6xl mb-4">🛒</div>
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2 text-center">
        Failed to load products
      </h2>
      <p className="text-gray-500 max-w-md mb-6 text-center">
        Something went wrong. Please try again.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
      >
        Retry
      </button>
    </div>
  );
}

  // ================= MAIN =================
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold">Product Management</h2>
        <Link
          to="/admin/products/create"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 text-center w-full sm:w-auto"
        >
          + Create Product
        </Link>
      </div>

      {/* ================= MOBILE VIEW ================= */}
      <div className="grid gap-4 sm:hidden">
        {products?.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="border rounded-lg p-4 shadow-sm bg-white">
              <Skeleton
                height={150}
                width="100%"
                className="rounded mb-3"
                style={{ display: "none" }}
              />
              <img
                src={product.images?.[0]?.url || "/placeholder.png"}
                alt={product.name}
                className="w-full h-42 object-cover rounded-md mb-3"
              />
              <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
              <p className="text-sm text-gray-600">₹{product.price}</p>
              <p className="text-sm text-gray-500 mb-3">SKU: {product.sku}</p>
              <div className="flex gap-2">
                <Link
                  to={`/admin/products/${product._id}/edit`}
                  className="flex-1 bg-yellow-500 text-white py-2 rounded text-center hover:bg-yellow-600"
                >
                  Update
                </Link>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No Products found.</p>
        )}
      </div>

      {/* ================= DESKTOP VIEW ================= */}
      <div className="hidden sm:block overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              {["Image", "Name", "Price", "SKU", "Actions"].map((col, i) => (
                <th key={i} className="py-3 px-4">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products?.length > 0 ? (
              products.map((product) => (
                <tr key={product._id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <img
                      src={product.images?.[0]?.url || "/placeholder.png"}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="p-4 font-medium text-gray-900">{product.name}</td>
                  <td className="p-4">₹{product.price}</td>
                  <td className="p-4">{product.sku}</td>
                  <td className="p-4">
                    <Link
                      to={`/admin/products/${product._id}/edit`}
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center p-4 text-gray-500">
                  No Products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default ProductManagement;