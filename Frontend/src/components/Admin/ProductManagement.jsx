import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct, fetchAdminProducts } from "../../Redux/slices/adminProductSlice";

const ProductManagement = () => {
const dispatch = useDispatch();
const {products, loading, error} = useSelector(
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

// Loading state  
  if (loading) {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Product Management</h2>

      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left">
          
          {/* Header Skeleton */}
          <thead>
            <tr>
              {["Name", "Price", "SKU", "Actions"].map((_, i) => (
                <th key={i} className="py-3 px-4">
                  <div className="h-4 w-20 bg-gray-300 rounded animate-pulse"></div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Body Skeleton */}
          <tbody>
            {Array(6).fill(0).map((_, i) => (
              <tr key={i} className="border-b">
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

// Error state
  if (error) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col items-center justify-center py-16 text-center">

        {/* Icon */}
        <div className="text-5xl mb-4">🛒</div>

        {/* Title */}
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
          Failed to load products
        </h2>

        {/* Message */}
        <p className="text-gray-500 max-w-md mb-6">
          Something went wrong while fetching products. Please try again.
        </p>

        {/* Retry Button */}
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

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 ">Product Management</h2>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
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
                  className="border-b hover:bg-gray-50 cursor-pointer "
                >
                  <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="p-4">₹{product.price}</td>
                  <td className="p-4">{product.sku}</td>
                  <td className="p-4 ">
                    <Link
                      to={`/admin/products/${product._id}/edit`}
                      className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 px-2 py-1 rounded hover:bg-red-600 text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className='text-center p-4 text-gray-500'>
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
