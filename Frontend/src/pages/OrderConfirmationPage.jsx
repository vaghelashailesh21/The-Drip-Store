import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../Redux/slices/cartSlice";
<<<<<<< HEAD
import { ColorName } from "../utilities/NameFromHax";
=======
>>>>>>> 4a206cfc9149b72045b426e759751845d0bf9973

const OrderConfirmationPage = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {checkout} = useSelector((state) => state.checkout);

  //Clear the cart when the order is confirmed
  useEffect(() => {
    if(checkout && checkout._id){
       dispatch(clearCart());
      localStorage.removeItem("cart");
    } else {
      navigate("/my-orders");
    }
  }, [checkout, dispatch, navigate]);

  const calculateEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt)
    orderDate.setDate(orderDate.getDate() + 10) // add 10 days to OrderDate
    return orderDate.toLocaleDateString()
  }

  return (
    <div className="max-w-4xl mx-auto p-6 lg:mt-2 bg-white">
      <h1 className="text-xl lg:text-3xl md:text-2xl font-bold text-center text-emerald-700 mb-6">
        Thank You For Your Order!
      </h1>

      {checkout && (
        <div className="p-4 sm:p-6 rounded-lg border">
          <div className=" flex flex-col sm:flex-row justify-between mb-8">
            {/* order id and date  */}
            <div>
<<<<<<< HEAD
              <h2 className="text-sm md:text-sm lg:text-lg font-semibold">Order ID:{checkout._id}</h2>
              <p className="text-gray-500 text-sm md:text-sm lg:text-sm">
=======
              <h2 className="text-sm md:text-xl lg:text-xl font-semibold">Order ID:{checkout._id}</h2>
              <p className="text-gray-500 text-sm md:text-xl lg:text-xl">
>>>>>>> 4a206cfc9149b72045b426e759751845d0bf9973
                Order Date:{new Date(checkout.createdAt).toLocaleDateString()}
              </p>
            </div>
            {/* Estimated Delivery */}
            <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0">
              <p className="text-emerald-700 text-sm">
                Estimated Delivery:{" "}
                {calculateEstimatedDelivery(checkout.createdAt)}
              </p>
            </div>
          </div>
          {/* ordered items */}
          <div className="mb-8">
            {checkout.checkoutItems.map((item) => (
              <div key={item.productId} className="flex items-center mb-4">
                <img src={item.image} alt={item.name} className="w-14 h-16 object-cover  rounded-md mr-4 " />
                <div>
<<<<<<< HEAD
                  <h4 className="text-xs md:text-sm mb-2 lg:text-sm font-semibold">{item.name}</h4>
                  <p className="text-xs md:text-sm lg:text-sm  text-gray-500">
                    {ColorName(item.color)} | {item.size}
                  </p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-xs md:text-sm mb-2 lg:text-sm ">₹{item.price}</p>
=======
                  <h4 className="text-xs md:text-lg mb-2 lg:text-lg font-semibold">{item.name}</h4>
                  <p className="text-xs md:text-sm lg:text-sm  text-gray-500">
                    {item.color} | {item.size}
                  </p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-xs md:text-sm mb-2 lg:text-sm ">${item.price}</p>
>>>>>>> 4a206cfc9149b72045b426e759751845d0bf9973
                  <p className="text-xs md:text-sm whitespace-nowrap lg:text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Payment and Delivery info */}
<<<<<<< HEAD
          <div className="grid grid-cols-2 gap-14">
            {/* Payment info */}
            <div>
              <h4 className="text-sm md:text-xl lg:text-xl font-semibold mb-2">Payment</h4>
              <p className="text-xs md:text-sm lg:text-sm text-gray-600">Razorpay</p>
=======
          <div className="grid grid-cols-2 gap-8">
            {/* Payment info */}
            <div>
              <h4 className="text-sm md:text-xl lg:text-xl font-semibold mb-2">Payment</h4>
              <p className="text-xs md:text-sm lg:text-sm text-gray-600">PayPal</p>
>>>>>>> 4a206cfc9149b72045b426e759751845d0bf9973
            </div>
            {/* Delivery Info */}
            <div>
              <h4 className="text-sm md:text-xl lg:text-xl font-semibold mb-2">Delivery</h4>
              <p className="text-xs md:text-sm lg:text-sm text-gray-600">{checkout.shippingAddress.address}</p>
<<<<<<< HEAD
              <p className="text-xs md:text-sm lg:text-sm text-gray-600">{checkout.shippingAddress.city}, {" "}{checkout.shippingAddress.state}, {checkout.shippingAddress.pincode}</p>
=======
              <p className="text-xs md:text-sm lg:text-sm text-gray-600">{checkout.shippingAddress.city}, {" "}{checkout.shippingAddress.state}</p>
>>>>>>> 4a206cfc9149b72045b426e759751845d0bf9973
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmationPage;
