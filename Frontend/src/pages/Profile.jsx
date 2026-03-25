import React, { useEffect } from "react";
import MyOrdersPage from "./MyOrdersPage";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../Redux/slices/authSlice";
import { clearCart } from "../Redux/slices/cartSlice";

const Profile = () => {

  const {user} = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/login");
  }  

return (
  <div className="min-h-screen  py-6">
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
}
export default Profile;
