import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserOrders } from "../Redux/slices/orderSlice";

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

 if(loading) return <p className="text-gray-600 items-center">Loading ...</p>
 if(error) return <p>Error: {error}</p>

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
                      ? `${orders.shippingAddress.city}, ${orders.shippingAddress.state}, ${orders.shippingAddress.pincode}`
                      : "N/A"}
                  </td>
                  <td className="py-2 px-4 text-xs md:text-sm lg:text-sm whitespace-nowrap pr-6 md:pl-5 lg:pl-5 ">
                    {orders.orderItems?.length || 0}
                  </td>
                  <td className="py-2 px-4 text-xs md:text-sm lg:text-sm whitespace-nowrap pr-6 md:pl-2 lg:pl-5">
                    ${orders.totalPrice}
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
