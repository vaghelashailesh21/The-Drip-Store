import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import login from "../assets/WomenCollection.jpg";
import { loginUser, clearAuthState, generateNewGuestId  } from "../Redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { mergeCart } from "../Redux/slices/cartSlice";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, guestId, loading, error, success } = useSelector(
    (state) => state.auth
  );

  // ✅ Get redirect param
  const redirect =
    new URLSearchParams(location.search).get("redirect") || "/";

  // 🔥 LOGIN FLOW (FIXED)
useEffect(() => {
  if (user) {
    const handleLoginFlow = async () => {
      try {
        if (guestId) {
          await dispatch(
            mergeCart({ guestId, userId: user._id })
          ).unwrap();
        }

        // ✅ IMPORTANT
        dispatch(generateNewGuestId());

        sessionStorage.removeItem("manualLogout");
        sessionStorage.removeItem("sessionExpiredShown");

        if (redirect.includes("checkout")) {
          navigate("/checkout");
        } else if (redirect.includes("profile")) {
          navigate("/profile");
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Login flow error:", error);
      }
    };

    handleLoginFlow();
  }
}, [user, guestId, navigate, redirect, dispatch]);

  // 🔥 HANDLE TOASTS
  useEffect(() => {
    if (error) {
      toast.error(error, { duration: 1000 });
      dispatch(clearAuthState());
    }

    if (success) {
      toast.success("Login Successful 🎉", { duration: 1000 });
      dispatch(clearAuthState());
    }
  }, [error, success, dispatch]);

  // 🔥 SUBMIT HANDLER
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter email and password", { duration: 1000 });
      return;
    }

    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="flex">
      {/* LEFT SIDE */}
      <div className="w-full md:w-1/2 flex-col flex justify-center items-center p-6 md:p-10 lg:p-0">
        <form
          className="w-full max-w-md bg-white rounded-lg border p-6 lg:p-8 shadow-sm"
          onSubmit={handleSubmit}
        >
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-center mb-2">
            Hey There!👋
          </h2>
          <h1 className="text-center mb-2">Welcome To</h1>

          <div className="flex justify-center mb-8">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold">
              The Drip Store
            </h2>
          </div>

          <p className="text-center mb-8 text-xs whitespace-nowrap">
            Enter your e-mail and password to login
          </p>

          {/* EMAIL */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              E-mail
            </label>
            <input
              type="email"
              placeholder="Enter your e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
            />

            <div className="text-right mt-2">
              <Link
                to="/forgot-password"
                className="text-blue-600 font-medium text-xs hover:text-blue-800 hover:underline transition"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white w-full p-2 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            {loading ? "Loading..." : "Sign in"}
          </button>

          <p className="mt-6 text-center text-sm">
            Don't have an account?{" "}
            <Link
              to={`/register?redirect=${encodeURIComponent(redirect)}`}
              className="text-blue-500"
            >
              Register
            </Link>
          </p>
        </form>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden md:block w-1/2 bg-gray-800">
        <div className="h-full flex flex-col justify-center items-center">
          <img
            src={login}
            alt="Login to account"
            className="w-full h-[600px] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;