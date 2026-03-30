import React from "react";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 px-4 sm:px-6 md:px-12 lg:px-20 py-10">

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4">
        Contact Us
      </h1>

      {/* Subtitle */}
      <p className="text-sm sm:text-base text-center max-w-2xl mx-auto mb-10 text-gray-600">
        Have questions or need help? We're here for you. Reach out to us anytime 
        and we’ll get back to you as soon as possible.
      </p>

      {/* Contact Section */}
      <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-2">

        {/* Left Side - Info */}
        <div className="bg-gray-100 p-6 sm:p-8 rounded-2xl shadow-md">
          <h2 className="text-xl sm:text-2xl font-semibold mb-6">
            Get in Touch
          </h2>

          <div className="space-y-5 text-gray-700">

            {/* Email */}
            <div className="flex items-start gap-3">
              <span className="text-xl">📧</span>
              <div>
                <p className="font-medium">Email</p>
                <a
                  href="mailto:vaghelashailesh230@gmail.com"
                  className="text-gray-600 hover:underline"
                >
                  vaghelashailesh230@gmail.com
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3">
              <span className="text-xl">📞</span>
              <div>
                <p className="font-medium">Phone</p>
                <a
                  href="tel:9328213046"
                  className="text-gray-600 hover:underline"
                >
                  +91 9328213046
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-3">
              <span className="text-xl">📍</span>
              <div>
                <p className="font-medium">Location</p>
                <p className="text-gray-600">
                  Ahmedabad, Gujarat, India
                </p>
              </div>
            </div>

          </div>

          <p className="mt-8 text-sm text-gray-500">
            Our team typically responds within 24 hours.
          </p>
        </div>

        {/* Right Side - Brand Message */}
        <div className="flex flex-col justify-center bg-gray-50 p-6 sm:p-8 rounded-2xl shadow-md">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            We're Here to Help
          </h2>

          <p className="text-gray-600 mb-4 leading-relaxed">
            At <span className="font-semibold">The Drip Store</span>, we value our customers 
            and their experience. Whether you have questions about products, orders, 
            or anything else, feel free to reach out.
          </p>

          <p className="text-gray-600 leading-relaxed">
            Your satisfaction is our priority, and we’re always happy to assist you.
          </p>
        </div>

      </div>

    </div>
  );
};

export default ContactUs;