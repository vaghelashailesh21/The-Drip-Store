import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserOrders } from "../Redux/slices/orderSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MyOrdersPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const {orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);
 

  const handleRowClick = (orderId) => {
    navigate(`/order/${orderId}`)
  }


// Loading UI
if (loading) {
  return (
    <div className="max-w-8xl mx-auto p-2 md:p-6 lg:p-4">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>

      <div className="relative shadow-md sm:rounded-lg overflow-x-scroll no-scrollbar">
        <table className="min-w-full text-left text-gray-500">
          
          {/* Header */}
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-2 px-4">Image</th>
              <th className="py-2 px-4">Order ID</th>
              <th className="py-2 px-4">Created</th>
              <th className="py-2 px-4">Shipping</th>
              <th className="py-2 px-4">Items</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {Array(5).fill(0).map((_, i) => (
              <tr key={i} className="border-b border-gray-50">
                
                {/* Image */}
                <td className="py-2 px-4">
                  <Skeleton width={50} height={60} />
                </td>

                {/* Order ID */}
                <td className="py-2 px-4">
                  <Skeleton width={100} />
                </td>

                {/* Date */}
                <td className="py-2 px-4">
                  <Skeleton width={120} />
                </td>

                {/* Address */}
                <td className="py-2 px-4">
                  <Skeleton width={180} />
                </td>

                {/* Items */}
                <td className="py-2 px-4">
                  <Skeleton width={30} />
                </td>

                {/* Price */}
                <td className="py-2 px-4">
                  <Skeleton width={60} />
                </td>

                {/* Status */}
                <td className="py-2 px-4">
                  <Skeleton width={70} height={20} />
                </td>

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
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col items-center justify-center py-16 text-center">
        
        {/* Icon */}
        <div className="text-5xl mb-4">📦</div>

        {/* Title */}
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
          Unable to load your orders
        </h2>

        {/* Message */}
        <p className="text-gray-500 max-w-md mb-6">
          Something went wrong while fetching your orders. Please try again.
        </p>

        {/* Button */}
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
    <div className="max-w-8xl mx-auto p-2 md:p-6 lg:p-4 ">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 ">My Orders</h2>
      <div className="relative shadow-md sm:rounded-lg overflow-x-scroll no-scrollbar scroll-smooth ">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-2 px-2 lg:py-2 lg:px-4 text-xs md:text-sm lg:text-sm whitespace-nowrap ">Image</th>
              <th className="py-2 px-2 lg:py-2 lg:px-4 text-xs md:text-sm lg:text-sm whitespace-nowrap ">Order ID</th>
              <th className="py-2 px-2 lg:py-2 lg:px-4 text-xs md:text-sm lg:text-sm whitespace-nowrap ">Created</th>
              <th className="py-2 px-2 lg:py-2 lg:px-4 text-xs md:text-sm lg:text-sm whitespace-nowrap ">Shipping Address</th>
              <th className="py-2 px-2 lg:py-2 lg:px-4 text-xs md:text-sm lg:text-sm whitespace-nowrap ">Items</th>
              <th className="py-2 px-2 lg:py-2 lg:px-4 text-xs md:text-sm lg:text-sm whitespace-nowrap ">Price</th>
              <th className="py-2 px-2 lg:py-2 lg:px-4 text-xs md:text-sm lg:text-sm whitespace-nowrap ">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((orders) => (
                <tr
                  key={orders._id}
                  onClick={() => handleRowClick(orders._id)}
                  className="border-b border-gray-50 cursor-pointer"
                >
                  <td className="py-2 px-2 sm:px-4 sm:py-4">
                    <img
                      src={orders.orderItems?.[0]?.image}
                      alt={orders.orderItems?.[0]?.name}
                      className="w-12 h-14 object-cover rounded-lg  "
                    />
                  </td>
                  <td className="py-2 px-4 text-xs md:text-sm lg:text-sm whitespace-nowrap pr-6 pl-2 md:pl-2 lg:pr-0">
                    #{orders._id}
                  </td>
                  <td className="py-2 px-4 text-xs md:text-sm lg:text-sm pl-2 pr-6 md:pl-2 lg:pl-5">
                    {new Date(orders.createdAt).toLocaleDateString()} {""}
                    {new Date(orders.createdAt).toLocaleTimeString()}
                  </td>
                  <td className="py-2 px-4 text-xs md:text-sm lg:text-sm  pr-6 md:pl-2 lg:pl-5">
                    {orders.shippingAddress
                      ? `${orders.shippingAddress.address}, ${orders.shippingAddress.city}, ${orders.shippingAddress.state}, ${orders.shippingAddress.pincode}`
                      : "N/A"}
                  </td>
                  <td className="py-2 px-4 text-xs md:text-sm lg:text-sm whitespace-nowrap pr-6 md:pl-5 lg:pl-5 ">
                    {orders.orderItems?.length || 0}
                  </td>
                  <td className="py-2 px-4 text-xs md:text-sm lg:text-sm whitespace-nowrap pr-6 md:pl-2 lg:pl-5">
                    ₹{orders.totalPrice}
                  </td>
                  <td className="py-2 px-4 text-xs md:text-sm lg:text-sm whitespace-nowrap pr-6 md:pl-2 lg:pl-5">
                    <span
                      className={`${orders.isPaid ? "bg-green-200 text-green-700" : "bg-red-100 text-red-700"} 
                      px-2 py-1 rounded-full text-xs font-medium sm:text-sm`} >
                         {orders.isPaid ? "Paid" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="py-4 px-4 text-center text-gray-500"
                >
                  You have no orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrdersPage;
