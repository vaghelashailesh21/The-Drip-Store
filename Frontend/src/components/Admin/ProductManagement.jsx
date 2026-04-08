import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteProduct,
  fetchAdminProducts,
} from "../../Redux/slices/adminProductSlice";

const ProductManagement = () => {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector(
    (state) => state.adminProducts
  );

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
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Product Management</h2>

        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full text-left">
            <thead>
              <tr>
                {["Image", "Name", "Price", "SKU", "Actions"].map((_, i) => (
                  <th key={i} className="py-3 px-4">
                    <div className="h-4 w-20 bg-gray-300 rounded animate-pulse"></div>
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
                      <div className="w-12 h-12 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                    <td className="p-4">
                      <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                    <td className="p-4">
                      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                    <td className="p-4">
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                    <td className="p-4 flex gap-2">
                      <div className="h-8 w-16 bg-yellow-300 rounded animate-pulse"></div>
                      <div className="h-8 w-16 bg-red-300 rounded animate-pulse"></div>
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
      <div className="max-w-4xl mx-auto p-6 text-center">
        <div className="text-5xl mb-4">🛒</div>

        <h2 className="text-xl font-semibold mb-2">
          Failed to load products
        </h2>

        <p className="text-gray-500 mb-6">
          Something went wrong. Please try again.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="bg-black text-white px-6 py-2 rounded"
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
        <h2 className="text-xl sm:text-2xl font-bold">
          Product Management
        </h2>

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
            <div
              key={product._id}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              {/* Image */}
              <img
                src={product.images?.[0]?.url || "/placeholder.png"}
                alt={product.name}
                className="w-1/2 h-42 object-cover rounded-md mb-3"
              />

              <h3 className="font-semibold text-gray-900 mb-2">
                {product.name}
              </h3>

              <p className="text-sm text-gray-600">
                ₹{product.price}
              </p>

              <p className="text-sm text-gray-500 mb-3">
                SKU: {product.sku}
              </p>

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
          <p className="text-center text-gray-500">
            No Products found.
          </p>
        )}
      </div>

      {/* ================= DESKTOP VIEW ================= */}
      <div className="hidden sm:block overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">SKU</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products?.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b hover:bg-gray-50"
                >
                  {/* Image */}
                  <td className="p-4">
                    <img
                      src={product.images?.[0]?.url || "/placeholder.png"}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>

                  <td className="p-4 font-medium text-gray-900">
                    {product.name}
                  </td>

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