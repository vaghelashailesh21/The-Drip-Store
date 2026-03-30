import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 px-4 sm:px-6 md:px-12 lg:px-20 py-10">

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6">
        About The Drip Store
      </h1>

      {/* Intro */}
      <p className="text-base sm:text-lg text-center max-w-3xl mx-auto mb-10 leading-relaxed">
        <span className="font-semibold">The Drip Store</span> is a fashion brand built for those 
        who want to express their style with confidence. We focus on delivering trendy, high-quality 
        clothing that blends comfort with modern design. Our goal is to make fashion simple, accessible, 
        and enjoyable for everyone.
      </p>

      {/* Brand Story */}
      <div className="max-w-4xl mx-auto mb-12">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
          Our Story
        </h2>
        <p className="text-gray-600 text-center leading-relaxed">
          The Drip Store started with a vision to create a platform where people can easily discover 
          stylish and affordable fashion. We believe that clothing is not just about appearance — it’s 
          about confidence, identity, and self-expression. Every product we offer is selected with care 
          to match current trends and customer needs.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid gap-6 md:grid-cols-2 mb-12">
        
        <div className="bg-gray-100 p-6 rounded-2xl shadow-md">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3">Our Mission</h2>
          <p className="text-gray-600">
            To provide stylish, high-quality fashion that is accessible to everyone while ensuring 
            a smooth and enjoyable shopping experience.
          </p>
        </div>

        <div className="bg-gray-100 p-6 rounded-2xl shadow-md">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3">Our Vision</h2>
          <p className="text-gray-600">
            To become a trusted fashion destination known for quality, style, and customer satisfaction.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-center mb-8">
          Why Choose Us?
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-gray-50 p-5 rounded-xl shadow">
            <p>✔ Trendy and stylish collections</p>
          </div>

          <div className="bg-gray-50 p-5 rounded-xl shadow">
            <p>✔ High-quality and comfortable clothing</p>
          </div>

          <div className="bg-gray-50 p-5 rounded-xl shadow">
            <p>✔ Secure and smooth shopping experience</p>
          </div>

          <div className="bg-gray-50 p-5 rounded-xl shadow">
            <p>✔ Reliable service and support</p>
          </div>

          <div className="bg-gray-50 p-5 rounded-xl shadow">
            <p>✔ Affordable fashion for everyone</p>
          </div>

          <div className="bg-gray-50 p-5 rounded-xl shadow">
            <p>✔ Modern and easy-to-use platform</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AboutUs;