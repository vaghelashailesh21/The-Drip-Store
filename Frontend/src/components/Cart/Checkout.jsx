import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { useDispatch, useSelector } from "react-redux";
import { createCheckout } from "../../Redux/slices/checkoutSlice";
import RazorpayButton from "./RazorpayButton";
import {ColorName} from "../../utilities/NameFromHax"
=======
import PayPalButton from "./PayPalButton";
import { useDispatch, useSelector } from "react-redux";
import { createCheckout } from "../../Redux/slices/checkoutSlice";
>>>>>>> 4a206cfc9149b72045b426e759751845d0bf9973
import axios from "axios";

const CheckOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
<<<<<<< HEAD
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
=======
  const {cart, loading, error} = useSelector((state) => state.cart);
  const {user} = useSelector((state) => state.auth);
>>>>>>> 4a206cfc9149b72045b426e759751845d0bf9973

  const [checkoutid, setCheckoutid] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    state: "",
    city: "",
    pincode: "",
    phone: "",
  });

  //Ensure cart is loaded before proceeding
  useEffect(() => {
<<<<<<< HEAD
    if (!cart || !cart.products || cart.products.length === 0) {
=======
    if(!cart || !cart.products || cart.products.length === 0){
>>>>>>> 4a206cfc9149b72045b426e759751845d0bf9973
      navigate("/");
    }
  }, [cart, navigate]);

  const handleCreateCheckOut = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
    if (cart && cart.products.length > 0) {
=======
    if(cart && cart.products.length > 0){
>>>>>>> 4a206cfc9149b72045b426e759751845d0bf9973
      const res = await dispatch(
        createCheckout({
          checkoutItems: cart.products,
          shippingAddress,
<<<<<<< HEAD
          paymentMethod: "Razorpay",
          totalPrice: Number(cart.totalPrice),
        }),
      );
      if (res.payload && res.payload._id) {
=======
          paymentMethod: "Paypal",
          totalPrice: cart.totalPrice,
        })
      );
      if(res.payload && res.payload._id) {
>>>>>>> 4a206cfc9149b72045b426e759751845d0bf9973
        setCheckoutid(res.payload._id); // set checkout id if checkout was successful
      }
    }
  };

  const handlePaymentSuccess = async (details) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutid}/pay`,
<<<<<<< HEAD
        { paymentStatus: "paid", paymentDetails: details },
=======
        {paymentStatus: "paid", paymentDetails: details},
>>>>>>> 4a206cfc9149b72045b426e759751845d0bf9973
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
<<<<<<< HEAD
        },
=======
        }
>>>>>>> 4a206cfc9149b72045b426e759751845d0bf9973
      );
      await handleFinalizeCheckout(checkoutid); // Finalize checkout if payment is successful
    } catch (error) {
      console.error(error);
    }
  };

<<<<<<< HEAD
  const handleFinalizeCheckout = async (checkoutid) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutid}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );
      navigate("/order-confirmation");
    } catch (error) {
      console.error(error);
    }
  };

  const handleRazorpayPayment = async () => {
    try {
      // 1. Create Razorpay order
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/payment/create-order`,
        {
          amount: Number(cart.totalPrice)
        },
      );

      // 2. Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "The Drip Store",
        description: "Order Payment",
        order_id: data.id,

        handler: async function (response) {
          console.log("Payment Success:", response);

          // 👉 reuse your existing function
          await handlePaymentSuccess(response);
        },

        prefill: {
          name: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
          email: user?.email,
          contact: shippingAddress.phone,
        },

        theme: {
          color: "#000000",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Payment failed, try again");
    }
  };

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!cart || !cart.products || cart.products.length === 0) {
    return <p>Your cart is empty</p>;
  }
=======
const handleFinalizeCheckout = async (checkoutid) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutid}/finalize`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );
   navigate("/order-confirmation");
  } catch (error) {
    console.error(error);
  }
};

if (loading) return <p>Loading cart...</p>;
if(error) return <p>Error: {error}</p>
if(!cart || !cart.products || cart.products.length === 0) {
  return <p>Your cart is empty</p>;
}
>>>>>>> 4a206cfc9149b72045b426e759751845d0bf9973

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      {/* left section */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6">CheckOut</h2>
        <form onSubmit={handleCreateCheckOut}>
          <h3 className="text-lg mb-4">Contact Details</h3>
          <div className="mb-4">
            <label className="text-gray-700 block">Email</label>
            <input
              type="email"
<<<<<<< HEAD
              value={user ? user.email : ""}
=======
              value={user? user.email : ""}
>>>>>>> 4a206cfc9149b72045b426e759751845d0bf9973
              className="w-full p-2 border rounded"
              disabled
            />
          </div>
          <h3 className="text-lg mb-4">Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                value={shippingAddress.firstName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    firstName: e.target.value,
                  })
                }
                className="border w-full p-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                value={shippingAddress.lastName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    lastName: e.target.value,
                  })
                }
                className="border w-full p-2 rounded"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              value={shippingAddress.address}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                })
              }
              className="border w-full p-2 rounded"
              required
            />
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">State</label>
              <input
                type="text"
                value={shippingAddress.state}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    state: e.target.value,
                  })
                }
                className="border w-full p-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">City</label>
              <input
                type="text"
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value,
                  })
                }
                className="border w-full p-2 rounded"
                required
              />
            </div>
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">PinCode</label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                value={shippingAddress.pincode}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    pincode: e.target.value.replace(/\D/g, ""),
                  })
                }
                className="border w-full p-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Phone</label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={10}
                value={shippingAddress.phone}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    phone: e.target.value.replace(/\D/g, ""),
                  })
                }
                className="border w-full p-2 rounded"
                required
              />
            </div>
          </div>
          <div className="mt-6">
            {!checkoutid ? (
              <button
                type="submit"
                className="bg-black w-full text-white py-3 rounded "
              >
                Continue to payment
              </button>
            ) : (
              <div>
<<<<<<< HEAD
                <h3 className="text-lg mb-4">Pay with Razorpay</h3>
                <RazorpayButton
                  amount={Number(cart.totalPrice)}
                  onSuccess={handlePaymentSuccess}
                  user={user}
                  shippingAddress={shippingAddress}
=======
                <h3 className="text-lg mb-4">Pay with PayPal</h3>
                <PayPalButton
                  amount={cart.totalPrice}
                  onSuccess={handlePaymentSuccess}
                  onError={(err) => alert("Payment failed, Try Again.")}
>>>>>>> 4a206cfc9149b72045b426e759751845d0bf9973
                />
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Right Section */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg mb-4">Order Summary</h3>
        <div className="border-t border-gray-400 py-4 mb-4">
          {cart.products.map((product, index) => (
            <div
              key={index}
              className="flex items-start justify-between py-2 border-b border-gray-400"
            >
              <div className="flex items-start">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-24 object-cover mr-4"
                />
                <div>
                  <h3 className="text-md">{product.name}</h3>
                  <p className="text-gray-500">Size: {product.size}</p>
<<<<<<< HEAD
                  <p className="text-gray-500">Color: {ColorName(product.color)}</p>
                </div>
              </div>
              <p className="text-xl">₹{product.price?.toLocaleString()}</p>
=======
                  <p className="text-gray-500">Color: {product.color}</p>
                </div>
              </div>
              <p className="text-xl">${product.price?.toLocaleString()}</p>
>>>>>>> 4a206cfc9149b72045b426e759751845d0bf9973
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between text-lg mb-4">
          <p>Subtotal</p>
<<<<<<< HEAD
          <p>₹{cart.totalPrice?.toLocaleString()}</p>
=======
          <p>${cart.totalPrice?.toLocaleString()}</p>
>>>>>>> 4a206cfc9149b72045b426e759751845d0bf9973
        </div>
        <div className="flex items-center justify-between text-lg ">
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <div className="flex items-center justify-between text-lg mt-4 border-t pt-4">
          <p>Total Amount</p>
<<<<<<< HEAD
          <p>₹{cart.totalPrice?.toLocaleString()}</p>
=======
          <p>${cart.totalPrice?.toLocaleString()}</p>
>>>>>>> 4a206cfc9149b72045b426e759751845d0bf9973
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
