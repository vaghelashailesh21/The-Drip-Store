import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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

  if (loading) return <p className="p-6">Loading orders...</p>;
  if (error) return <p className="p-6 text-red-500">Failed to load orders.</p>;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4">Order Management</h2>

      {/* Mobile Cards */}
      <div className="grid sm:hidden gap-4">
        {orders?.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} className="p-4 bg-white shadow-md rounded-lg space-y-2">
              <p className="font-semibold text-sm">Order: #{order._id}</p>
              <p className="text-sm">Customer: {order.user?.name}</p>
              <p className="text-sm">Total: ₹{order.totalPrice?.toFixed(2)}</p>
              <p className="text-sm">Status: {order.status}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleStatusChange(order._id, "Delivered")}
                  className="bg-green-500 text-white px-2 py-1 rounded text-xs"
                >
                  Mark as Delivered
                </button>
                <button
                  onClick={() => navigate(`/admin/orders/${order._id}`)}
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
                  onClick={() => navigate(`/admin/orders/${order._id}`)} // Row click navigates
                >
                  <td className="py-4 px-4 font-medium text-gray-900">#{order._id}</td>
                  <td className="py-4 px-4">{order.user?.name}</td>
                  <td className="py-4 px-4">₹{order.totalPrice?.toFixed(2)}</td>
                  <td className="py-4 px-4">
                    <select
                      value={order.status}
                      onChange={(e) => {
                        e.stopPropagation(); // Prevent row click
                        handleStatusChange(order._id, e.target.value);
                      }}
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
                        e.stopPropagation(); // Prevent row click
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