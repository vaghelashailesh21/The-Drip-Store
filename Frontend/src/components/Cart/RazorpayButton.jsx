import React from "react";
import axios from "axios";

const RazorpayButton = ({ amount, onSuccess, user, shippingAddress }) => {
  const handlePayment = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/payment/create-order`,
        { amount }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "The Drip Store",
        description: "Order Payment",
        order_id: data.id,

        handler: function (response) {
          onSuccess(response);
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
    }
  };

  return (
    <button
      type="button"
      onClick={handlePayment}
      className="bg-black text-white py-3 px-6 rounded w-full"
    >
      Pay with Razorpay
    </button>
  );
};

export default RazorpayButton;