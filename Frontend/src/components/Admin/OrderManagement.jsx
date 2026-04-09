import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { fetchAllOrders, updateOrderStatus } from "../../Redux/slices/adminOrderSlice";

const OrderManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { orders, loading, error } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    if (!user || user.role !== "admin") navigate("/");
    else dispatch(fetchAllOrders());
  }, [dispatch, user, navigate]);

  const handleStatusChange = (orderId, status) => {
    dispatch(updateOrderStatus({ id: orderId, status }));
  };

  // Loading Skeleton
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          <Skeleton width={250} />
        </h2>

        {/* Mobile Skeleton Cards */}
        <div className="grid sm:hidden gap-4">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="p-4 bg-white shadow-md rounded-lg space-y-2"
              >
                <Skeleton width={`60%`} height={20} />
                <Skeleton width={`50%`} height={15} />
                <Skeleton width={`40%`} height={15} />
                <Skeleton width={`30%`} height={15} />
                <div className="flex gap-2 mt-2">
                  <Skeleton width={80} height={25} />
                  <Skeleton width={80} height={25} />
                </div>
              </div>
            ))}
        </div>

        {/* Desktop Table Skeleton */}
        <div className="hidden sm:block overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full text-left text-gray-500">
            <thead className="bg-gray-100 text-xs sm:text-sm uppercase text-gray-700">
              <tr>
                {["Order ID", "Customer", "Total Price", "Status", "Actions"].map((col, i) => (
                  <th key={i} className="py-3 px-4">
                    <Skeleton width={80} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <tr key={i} className="border-b">
                    {Array(5)
                      .fill(0)
                      .map((__, j) => (
                        <td key={j} className="py-4 px-4">
                          <Skeleton width={`90%`} height={20} />
                        </td>
                      ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

// Error UI
if (error) {
  return (
    <div className="min-h-screen flex flex-col items-center 
                    justify-start sm:justify-center pt-20 sm:pt-0 bg-gray-50">
      <div className="text-6xl mb-4">📦</div>
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2 text-center">
        Failed to load orders
      </h2>
      <p className="text-gray-500 max-w-md mb-6 text-center">
        We couldn’t fetch order data. Please try again.
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

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4">Order Management</h2>

      {/* Mobile Cards */}
      <div className="grid sm:hidden gap-4">
        {orders?.length > 0 ? (
          orders.map((order) => (
            <div
              key={order._id}
              className="p-4 bg-white shadow-md rounded-lg space-y-2"
              onClick={() => navigate(`/admin/orders/${order._id}`)}
            >
              <p className="font-semibold text-sm">Order: #{order._id}</p>
              <p className="text-sm">Customer: {order.user?.name}</p>
              <p className="text-sm">Total: ₹{order.totalPrice?.toFixed(2)}</p>
              <p className="text-sm">Status: {order.status}</p>
              <div className="flex gap-2 mt-2">
                <select
                  value={order.status}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className="p-2 border rounded text-sm"
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/admin/orders/${order._id}`);
                  }}
                  className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No Orders Found</p>
        )}
      </div>

      {/* Desktop Table */}
      <div className="hidden sm:block overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs sm:text-sm text-gray-700 uppercase">
            <tr>
              {["Order ID", "Customer", "Total Price", "Status", "Actions"].map((col, i) => (
                <th key={i} className="py-3 px-4">{col}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {orders?.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/admin/orders/${order._id}`)}
                >
                  <td className="py-4 px-4 font-medium text-gray-900">#{order._id}</td>
                  <td className="py-4 px-4">{order.user?.name}</td>
                  <td className="py-4 px-4">₹{order.totalPrice?.toFixed(2)}</td>
                  <td className="py-4 px-4">
                    <select
                      value={order.status}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1 sm:p-2"
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStatusChange(order._id, "Delivered");
                      }}
                      className="bg-green-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-green-600 text-xs sm:text-sm"
                    >
                      Mark as Delivered
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No Orders Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;