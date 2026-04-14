import React, { useEffect } from "react";
import MyOrdersPage from "./MyOrdersPage";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../Redux/slices/authSlice";
import { clearCart } from "../Redux/slices/cartSlice";
import { isTokenExpired } from "../utilities/checkTokenExpiry";
import { toast } from "sonner";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 🔥 Protect route + handle expired token
  useEffect(() => {
    const token = localStorage.getItem("userToken");

    if (!user || !token || isTokenExpired(token)) {
      // 🚨 Avoid showing toast on manual logout
      const isManualLogout = sessionStorage.getItem("manualLogout");

      if (!isManualLogout) {
        if (!sessionStorage.getItem("sessionExpiredShown")) {
          toast.error("Session expired. Please login again.");
          sessionStorage.setItem("sessionExpiredShown", "true");
        }
      }

      dispatch(logout());
      // ❌ DO NOT clear cart here (important fix)

      navigate("/login?redirect=profile"); // ✅ preserve intent
    }
  }, [user, navigate, dispatch]);

  // 🔥 Manual logout (only place where cart should clear)
  const handleLogout = () => {
    sessionStorage.setItem("manualLogout", "true"); // mark manual logout

    dispatch(logout());
    dispatch(clearCart()); // ✅ clear only on manual logout
    
    navigate("/login");
  };

  // Optional UI while redirecting
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6">
          
          {/* LEFT SIDEBAR */}
          <div className="w-full md:w-1/3 lg:w-1/4 bg-white shadow-md rounded-xl p-6">
            <h1 className="text-xl md:text-2xl font-bold mb-2">
              {user.name}
            </h1>
            <p className="text-gray-600 mb-6">{user.email}</p>

            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
            >
              Log out
            </button>
          </div>

          {/* RIGHT CONTENT */}
          <div className="w-full md:w-2/3 lg:w-3/4 bg-white shadow-md rounded-xl p-2">
            <MyOrdersPage />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;