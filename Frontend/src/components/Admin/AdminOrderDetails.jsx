import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchOrderById } from "../../Redux/slices/adminOrderSlice";

const AdminOrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedOrder, loading, error } = useSelector(
    (state) => state.adminOrders
  );

  useEffect(() => {
    dispatch(fetchOrderById(id));
  }, [dispatch, id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">Error loading order</p>;
  if (!selectedOrder) return <p className="p-6">Order not found</p>;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">
        Admin Order Details
      </h2>

      <div className="p-4 sm:p-6 bg-white shadow-md rounded-xl space-y-6">
        {/* Top Section */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h3 className="text-sm sm:text-lg md:text-xl font-semibold">
              Order ID: #{selectedOrder._id}
            </h3>
            <p className="text-gray-500 text-sm sm:text-base">
              {new Date(selectedOrder.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="flex flex-col sm:items-end gap-2">
            <span
              className={`${
                selectedOrder.isPaid
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              } px-3 py-1 rounded-full text-xs sm:text-sm font-medium`}
            >
              {selectedOrder.isPaid ? "Paid" : "Unpaid"}
            </span>

            <span
              className={`${
                selectedOrder.isDelivered
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              } px-3 py-1 rounded-full text-xs sm:text-sm font-medium`}
            >
              {selectedOrder.isDelivered ? "Delivered" : "Pending Delivery"}
            </span>
          </div>
        </div>

        {/* Customer + Payment + Shipping */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-4 rounded">
            <h4 className="font-semibold mb-2">Customer Info</h4>
            <p className="text-sm sm:text-base">Name: {selectedOrder.user?.name}</p>
            <p className="text-sm sm:text-base">Email: {selectedOrder.user?.email}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded">
            <h4 className="font-semibold mb-2">Payment Info</h4>
            <p className="text-sm sm:text-base">Method: {selectedOrder.paymentMethod}</p>
            <p className="text-sm sm:text-base">
              Status: {selectedOrder.isPaid ? "Paid" : "Unpaid"}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded">
            <h4 className="font-semibold mb-2">Shipping Info</h4>
            <p className="text-sm sm:text-base">
              {selectedOrder.shippingAddress?.address},{" "}
              {selectedOrder.shippingAddress?.city},{" "}
              {selectedOrder.shippingAddress?.state} -{" "}
              {selectedOrder.shippingAddress?.pincode}
            </p>
          </div>
        </div>

        {/* Products */}
        <div className="overflow-x-auto">
          <h3 className="font-semibold mb-4">Products</h3>
          <table className="min-w-full text-gray-600 border rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                {["Name", "Price", "Qty", "Total"].map((col, i) => (
                  <th key={i} className="py-2 px-4 text-sm sm:text-base text-left">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {selectedOrder.orderItems.map((item, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4 flex items-center gap-2 sm:gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-12 w-12 sm:h-14 sm:w-16 object-cover rounded"
                    />
                    <Link
                      to={`/product/${item.productId}`}
                      className="text-blue-500 hover:underline text-sm sm:text-base"
                    >
                      {item.name}
                    </Link>
                  </td>
                  <td className="py-2 px-4 text-sm sm:text-base">₹{item.price}</td>
                  <td className="py-2 px-4 text-sm sm:text-base">{item.quantity}</td>
                  <td className="py-2 px-4 text-sm sm:text-base">
                    ₹{item.price * item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total */}
        <div className="mt-4 text-right text-sm sm:text-base">
          <h3 className="font-bold">Total: ₹{selectedOrder.totalPrice}</h3>
        </div>

        <Link
          to="/admin/orders"
          className="inline-block mt-4 text-blue-500 hover:underline text-sm sm:text-base"
        >
          Back to Orders
        </Link>
      </div>
    </div>
  );
};

export default AdminOrderDetails;