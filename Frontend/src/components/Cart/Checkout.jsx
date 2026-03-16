import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PayPalButton from "./PayPalButton";
import { useDispatch, useSelector } from "react-redux";
import { createCheckout } from "../../Redux/slices/checkoutSlice";
import axios from "axios";

const CheckOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {cart, loading, error} = useSelector((state) => state.cart);
  const {user} = useSelector((state) => state.auth);

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
    if(!cart || !cart.products || cart.products.length === 0){
      navigate("/");
    }
  }, [cart, navigate]);

  const handleCreateCheckOut = async (e) => {
    e.preventDefault();
    if(cart && cart.products.length > 0){
      const res = await dispatch(
        createCheckout({
          checkoutItems: cart.products,
          shippingAddress,
          paymentMethod: "Paypal",
          totalPrice: cart.totalPrice,
        })
      );
      if(res.payload && res.payload._id) {
        setCheckoutid(res.payload._id); // set checkout id if checkout was successful
      }
    }
  };

  const handlePaymentSuccess = async (details) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutid}/pay`,
        {paymentStatus: "paid", paymentDetails: details},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      await handleFinalizeCheckout(checkoutid); // Finalize checkout if payment is successful
    } catch (error) {
      console.error(error);
    }
  };

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
              value={user? user.email : ""}
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
                <h3 className="text-lg mb-4">Pay with PayPal</h3>
                <PayPalButton
                  amount={cart.totalPrice}
                  onSuccess={handlePaymentSuccess}
                  onError={(err) => alert("Payment failed, Try Again.")}
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
                  <p className="text-gray-500">Color: {product.color}</p>
                </div>
              </div>
              <p className="text-xl">${product.price?.toLocaleString()}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between text-lg mb-4">
          <p>Subtotal</p>
          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>
        <div className="flex items-center justify-between text-lg ">
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <div className="flex items-center justify-between text-lg mt-4 border-t pt-4">
          <p>Total Amount</p>
          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
