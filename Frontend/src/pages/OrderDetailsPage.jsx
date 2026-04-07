import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchOrderDetails } from "../Redux/slices/orderSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { orderDetails, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrderDetails(id));
  }, [dispatch, id]);

  
  // Loading UI
  if (loading) {
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      
      {/* Title */}
      <Skeleton width={200} height={30} className="mb-6" />

      <div className="p-4 sm:p-6 bg-white shadow-md rounded-xl space-y-6">

        {/* Top Section */}
        <div className="flex flex-col sm:flex-row justify-between">
          <div className="space-y-2">
            <Skeleton width={180} />
            <Skeleton width={120} />
          </div>

          <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0 space-y-2">
            <Skeleton width={100} height={25} />
            <Skeleton width={120} height={25} />
          </div>
        </div>

        {/* Payment + Shipping */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <Skeleton width={120} />
            <Skeleton width={160} />
            <Skeleton width={140} />
          </div>

          <div className="space-y-2">
            <Skeleton width={120} />
            <Skeleton width={200} />
          </div>
        </div>

        {/* Products */}
        <div>
          <Skeleton width={120} className="mb-4" />

          {Array(3).fill(0).map((_, i) => (
            <div key={i} className="flex items-center gap-4 mb-4">
              <Skeleton width={50} height={60} />
              <Skeleton width="40%" />
              <Skeleton width={80} />
              <Skeleton width={50} />
            </div>
          ))}
        </div>

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
          Unable to load order details
        </h2>

        {/* Message */}
        <p className="text-gray-500 max-w-md mb-6">
          Something went wrong while fetching this order. Please try again.
        </p>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => window.location.reload()}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
          >
            Retry
          </button>

          <Link
            to="/my-orders"
            className="border border-gray-300 px-6 py-2 rounded hover:bg-gray-100 transition"
          >
            Back to Orders
          </Link>
        </div>

      </div>
    </div>
  );
}

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl lg:text-3xl md:text-2xl font-bold mb-6">
        Order Details
      </h2>

      {!orderDetails ? (
        <p>No Orders Details Found</p>
      ) : (
        <div className="p-4 sm:p-6 bg-white shadow-md rounded-xl ">
          <div className="flex flex-col sm:flex-row justify-between mb-8">
            <div>
              <h3 className="text-sm md:text-xl lg:text-xl font-semibold">
                Order ID: #{orderDetails._id}
              </h3>
              <p className="text-gray-500 text-sm md:text-xl lg:text-xl">
                {new Date(orderDetails.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0">
              <span
                className={`${
                  orderDetails.isPaid
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                } px-3 py-1 rounded-full text-xs md:text-sm lg:text-sm font-medium mb-2`}
              >
                {orderDetails.isPaid ? "Approved" : "Pending"}
              </span>
              <span
                className={`${
                  orderDetails.isDelivered
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                } px-3 py-1 rounded-full text-xs md:text-sm lg:text-sm font-medium mb-2`}
              >
                {orderDetails.isDelivered ? "Delivered" : "Pending Delivery"}
              </span>
            </div>
          </div>
          {/* Customer , payment , shipping address*/}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-sm md:text-xl lg:text-xl font-semibold">
                Payment Info
              </h4>
              <p className=" text-xs md:text-sm lg:text-sm">
                Payment Method: {orderDetails.paymentMethod}
              </p>
              <p className=" text-xs md:text-sm lg:text-sm">
                Status: {orderDetails.isPaid ? "Paid" : "Unpaid"}
              </p>
            </div>
            <div>
              <h4 className="text-sm md:text-xl lg:text-xl font-semibold">
                Shipping Info
              </h4>
              
              {/* <p className=" text-xs md:text-sm lg:text-sm">
                Shipping Method: {orderDetails.shippingMethod}
              </p> */}
              <p className=" text-xs md:text-sm lg:text-sm">
                Address:{" "}
                {` ${orderDetails.shippingAddress.address}, ${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.state},  ${orderDetails.shippingAddress.pincode}`}
              </p>
            </div>
          </div>

          {/* Product List */}
          <div className="overflow-x-auto">
            <h3 className="text-sm md:text-xl lg:text-xl font-semibold font-semibold mb-4">
              Products
            </h3>
            <table className="min-w-full text-gray-600 mb-4">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-2 lg:py-2 lg:px-4 text-xs md:text-sm lg:text-sm whitespace-nowrap ">
                    Name
                  </th>
                  <th className="py-2 px-2 lg:py-2 lg:px-4 text-xs md:text-sm lg:text-sm whitespace-nowrap ">
                    Unit Price
                  </th>
                  <th className="py-2 px-2 lg:py-2 lg:px-4 text-xs md:text-sm lg:text-sm whitespace-nowrap ">
                    Quantity
                  </th>
                  <th className="py-2 px-2 lg:py-2 lg:px-4 text-xs md:text-sm lg:text-sm whitespace-nowrap ">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.orderItems.map((item) => (
                  <tr key={item.productId} className="border-b">
                    <td className="py-2 px-4 items-center flex">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-14 w-12 object-cover rounded-lg mr-3"
                      />
                      <Link
                        to={`/product/${item.productId}`}
                        className="text-blue-500 hover:underline text-xs md:text-sm lg:text-sm whitespace-nowrap pl-0 pr-6 md:pl-10 lg:pl-15 lg:pr-6  "
                      >
                        {item.name}
                      </Link>
                    </td>
                    <td className="py-2 px-4 text-xs md:text-sm lg:text-sm whitespace-nowrap pl-4 pr-6 md:pl-10 lg:pl-20">
                      ₹{item.price}
                    </td>
                    <td className="py-2 px-4 text-xs md:text-sm lg:text-sm whitespace-nowrap pl-4 md:pl-10 lg:pl-20">
                      {item.quantity}
                    </td>
                    <td className="py-2 px-4 text-xs md:text-sm lg:text-sm whitespace-nowrap pl-4 md:pl-10 lg:pl-20">
                      ₹{item.price * item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Back to orders link */}
          <Link
            to="/my-orders"
            className="text-blue-500 text-xs md:text-sm lg:text-sm  hover:underline"
          >
            Back To My Orders
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsPage;
