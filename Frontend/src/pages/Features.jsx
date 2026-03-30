import React from "react";
import {
  FaTshirt,
  FaShieldAlt,
  FaShippingFast,
  FaStar,
  FaHeadset,
  FaShoppingBag,
} from "react-icons/fa";

const features = [
  {
    title: "Trendy & Stylish Collection",
    desc: "Stay updated with the latest fashion trends and discover styles that match your personality.",
    icon: <FaStar size={26} />,
  },
  {
    title: "Premium Quality Products",
    desc: "We ensure high-quality materials and comfortable designs for everyday wear.",
    icon: <FaTshirt size={26} />,
  },
  {
    title: "Easy Shopping Experience",
    desc: "Browse, select, and order your favorite products with a smooth and simple interface.",
    icon: <FaShoppingBag size={26} />,
  },
  {
    title: "Secure Payments",
    desc: "Shop confidently with safe and reliable payment options powered by Razorpay.",
    icon: <FaShieldAlt size={26} />,
  },
  {
    title: "Fast & Reliable Service",
    desc: "We aim to provide quick order processing and dependable service to our customers.",
    icon: <FaShippingFast size={26} />,
  },
  {
    title: "Customer Support",
    desc: "Our team is always ready to help you with any queries or issues.",
    icon: <FaHeadset size={26} />,
  },
];

const Features = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 px-4 sm:px-6 md:px-12 lg:px-20 py-10">

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4">
        Why Choose The Drip Store?
      </h1>

      {/* Subtitle */}
      <p className="text-sm sm:text-base text-center max-w-2xl mx-auto mb-12 text-gray-600">
        We focus on delivering quality, style, and a seamless shopping experience 
        to make your fashion journey easy and enjoyable.
      </p>

      {/* Features Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group bg-gray-50 p-6 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            {/* Icon */}
            <div className="mb-4 text-black group-hover:text-gray-700 transition">
              {feature.icon}
            </div>

            {/* Title */}
            <h2 className="text-lg sm:text-xl font-semibold mb-2">
              {feature.title}
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Features;