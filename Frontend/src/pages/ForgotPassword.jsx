import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/users/forgot-password",
        { email },
      );
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong please check your email and try again");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md p-8 border border-gray-200 rounded-lg -translate-y-10">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Forgot Password
        </h2>

        {message && (
          <p className="text-center mb-4 text-green-600">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white 
            focus:outline-none focus:border-black focus:ring-0 transition"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md 
  hover:bg-gray-900 active:scale-[0.98] 
  transition duration-200 ease-in-out"
          >
            Send Reset Link
          </button>
        </form>
        <p className="text-center text-gray-500 mt-4 text-sm">
          Remembered your password?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
