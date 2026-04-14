import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "./Redux/slices/authSlice";
import { clearCart } from "./Redux/slices/cartSlice";
import { isTokenExpired } from "./utilities/checkTokenExpiry";
import { toast } from "sonner";
import App from "./App";

const AppWrapper = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 🔥 Check on app load
  useEffect(() => {
    const token = localStorage.getItem("userToken");

    if (token && isTokenExpired(token)) {
      const isManualLogout = sessionStorage.getItem("manualLogout");

      if (!isManualLogout && !sessionStorage.getItem("sessionExpiredShown")) {
        toast.error("Session expired. Please login again.");
        sessionStorage.setItem("sessionExpiredShown", "true");
      }

      dispatch(logout());
      dispatch(clearCart());
      navigate("/login");
    }
  }, [dispatch, navigate]);

  // 🔥 Real-time auto logout
  useEffect(() => {
    const token = localStorage.getItem("userToken");

    if (token) {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      const expiryTime = decoded.exp * 1000;
      const timeout = expiryTime - Date.now();

      if (timeout > 0) {
        const timer = setTimeout(() => {
          const isManualLogout = sessionStorage.getItem("manualLogout");

          if (
            !isManualLogout &&
            !sessionStorage.getItem("sessionExpiredShown")
          ) {
            toast.error("Session expired. Please login again.");
            sessionStorage.setItem("sessionExpiredShown", "true");
          }

          dispatch(logout());
          dispatch(clearCart());
          navigate("/login");
        }, timeout);

        return () => clearTimeout(timer);
      } else {
        const isManualLogout = sessionStorage.getItem("manualLogout");

        if (
          !isManualLogout &&
          !sessionStorage.getItem("sessionExpiredShown")
        ) {
          toast.error("Session expired. Please login again.");
          sessionStorage.setItem("sessionExpiredShown", "true");
        }

        dispatch(logout());
        dispatch(clearCart());
        navigate("/login");
      }
    }
  }, [dispatch, navigate]);

  return <App />;
};

export default AppWrapper;