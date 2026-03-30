import React, { useState } from "react";

const faqs = [
  {
    question: "How can I place an order?",
    answer:
      "Browse products, add items to your cart, and proceed to checkout. Enter your details and complete the payment to place your order.",
  },
  {
    question: "What payment methods are available?",
    answer:
      "We use Razorpay for secure payments, supporting UPI, debit/credit cards, net banking, and wallets.",
  },
  {
    question: "Can I track my order?",
    answer:
      "Currently, order tracking is not available, but it will be added in future updates.",
  },
  {
    question: "How can I cancel my order?",
    answer:
      "You can contact support or the admin to request cancellation before processing.",
  },
  {
    question: "Do you offer returns or refunds?",
    answer:
      "Return and refund functionality will be available in future enhancements.",
  },
  {
    question: "Is my payment secure?",
    answer:
      "Yes, all transactions are securely processed through Razorpay with proper encryption.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 px-4 sm:px-6 md:px-12 lg:px-20 py-10">

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4">
        Frequently Asked Questions
      </h1>

      {/* Subtitle */}
      <p className="text-sm sm:text-base text-center max-w-2xl mx-auto mb-10 text-gray-600">
        Find answers to the most common questions about shopping, payments, and orders.
      </p>

      {/* FAQ Container */}
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`border rounded-xl p-4 sm:p-5 shadow-sm transition-all duration-300 ${
              activeIndex === index ? "bg-gray-50 shadow-md" : "bg-white"
            }`}
          >
            {/* Question */}
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center text-left"
            >
              <h2 className="text-base sm:text-lg font-semibold pr-4">
                {faq.question}
              </h2>

              <span className="text-xl font-bold">
                {activeIndex === index ? "−" : "+"}
              </span>
            </button>

            {/* Answer */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                activeIndex === index ? "max-h-40 mt-3" : "max-h-0"
              }`}
            >
              <p className="text-sm sm:text-base text-gray-600">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default FAQ;