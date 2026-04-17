import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createCheckout } from "../../Redux/slices/checkoutSlice";
import RazorpayButton from "./RazorpayButton";
import { ColorName } from "../../utilities/NameFromHax";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CheckOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [checkoutid, setCheckoutid] = useState(null);
  const [processing, setProcessing] = useState(false);

  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    state: "",
    city: "",
    pincode: "",
    phone: "",
  });

  // Redirect if cart empty
  useEffect(() => {
    if (!loading && (!cart || !cart.products || cart.products.length === 0)) {
      navigate("/");
    }
  }, [cart, loading, navigate]);

  const handleCreateCheckOut = async (e) => {
    e.preventDefault();

    if (cart && cart.products.length > 0) {
      const res = await dispatch(
        createCheckout({
          checkoutItems: cart.products,
          shippingAddress,
          paymentMethod: "Razorpay",
          totalPrice: Number(cart.totalPrice),
        })
      );

      if (res.payload && res.payload._id) {
        setCheckoutid(res.payload._id);
      }
    }
  };

  // 🚀 FAST NAVIGATION AFTER PAYMENT
  const handlePaymentSuccess = async (details) => {
    try {
      setProcessing(true);

      // Navigate instantly
      navigate("/order-confirmation");

      // Run APIs in background
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutid}/pay`,
        { paymentStatus: "paid", paymentDetails: details },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutid}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
    } catch (err) {
      console.error("Payment error:", err);
    } finally {
      setProcessing(false);
    }
  };

  // ===========================
  // 🔄 LOADING STATE (SKELETON)
  // ===========================
  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6">
        {/* LEFT */}
        <div className="bg-white p-6 rounded-lg">
          <Skeleton height={30} width={150} className="mb-6" />

          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} height={40} className="mb-4" />
          ))}

          <Skeleton height={50} />
        </div>

        {/* RIGHT */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <Skeleton height={25} width={120} className="mb-4" />

          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-4 mb-4">
              <Skeleton height={80} width={80} />
              <div className="flex-1">
                <Skeleton height={20} width="80%" />
                <Skeleton height={15} width="60%" />
              </div>
            </div>
          ))}

          <Skeleton height={20} />
          <Skeleton height={20} />
          <Skeleton height={30} />
        </div>
      </div>
    );
  }

  // ===========================
  // ❌ ERROR STATE
  // ===========================
  if (error) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center">
        <h2 className="text-2xl font-semibold mb-4 text-red-600">
          Something went wrong
        </h2>
        <p className="mb-6 text-gray-600">{error}</p>

        <button
          onClick={() => window.location.reload()}
          className="bg-black text-white px-6 py-2 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  // ===========================
  // 🛒 EMPTY CART
  // ===========================
  if (!cart || !cart.products || cart.products.length === 0) {
    return (
      <div className="text-center py-20">
        <p>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      {/* LEFT */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6">CheckOut</h2>

        <form onSubmit={handleCreateCheckOut}>
          <h3 className="text-lg mb-4">Contact Details</h3>

          <div className="mb-4">
            <label>Email</label>
            <input
              type="email"
              value={user ? user.email : ""}
              className="w-full p-2 border rounded"
              disabled
            />
          </div>

          <h3 className="text-lg mb-4">Delivery</h3>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              placeholder="First Name"
              value={shippingAddress.firstName}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  firstName: e.target.value,
                })
              }
              className="border p-2 rounded"
              required
            />

            <input
              placeholder="Last Name"
              value={shippingAddress.lastName}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  lastName: e.target.value,
                })
              }
              className="border p-2 rounded"
              required
            />
          </div>

          <input
            placeholder="Address"
            value={shippingAddress.address}
            onChange={(e) =>
              setShippingAddress({
                ...shippingAddress,
                address: e.target.value,
              })
            }
            className="border w-full p-2 rounded mb-4"
            required
          />

          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              placeholder="State"
              value={shippingAddress.state}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  state: e.target.value,
                })
              }
              className="border p-2 rounded"
              required
            />

            <input
              placeholder="City"
              value={shippingAddress.city}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  city: e.target.value,
                })
              }
              className="border p-2 rounded"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              placeholder="Pincode"
              maxLength={6}
              value={shippingAddress.pincode}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  pincode: e.target.value.replace(/\D/g, ""),
                })
              }
              className="border p-2 rounded"
              required
            />

            <input
              placeholder="Phone"
              maxLength={10}
              value={shippingAddress.phone}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  phone: e.target.value.replace(/\D/g, ""),
                })
              }
              className="border p-2 rounded"
              required
            />
          </div>

          <div className="mt-6">
            {!checkoutid ? (
              <button
                type="submit"
                disabled={processing}
                className="bg-black w-full text-white py-3 rounded"
              >
                {processing ? "Processing..." : "Continue to Payment"}
              </button>
            ) : (
              <RazorpayButton
                amount={Number(cart.totalPrice)}
                onSuccess={handlePaymentSuccess}
                user={user}
                shippingAddress={shippingAddress}
              />
            )}
          </div>
        </form>
      </div>

      {/* RIGHT */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg mb-4">Order Summary</h3>

        {cart.products.map((product, index) => (
          <div key={index} className="flex justify-between mb-4">
            <div className="flex gap-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-24 object-cover"
              />
              <div>
                <p>{product.name}</p>
                <p>Size: {product.size}</p>
                <p>Color: {ColorName(product.color)}</p>
              </div>
            </div>
            <p>₹{product.price}</p>
          </div>
        ))}

        <div className="flex justify-between mt-4 border-t pt-4">
          <p>Total</p>
          <p>₹{cart.totalPrice}</p>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;