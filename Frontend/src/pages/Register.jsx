import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import register from "../assets/Login.webp";
import { registerUser } from "../Redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { mergeCart } from "../Redux/slices/cartSlice";
import { toast } from "sonner";
import { clearAuthState } from "../Redux/slices/authSlice";


const Register = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
    const navigate = useNavigate();
  const location = useLocation();
  const { user, guestId, loading, error, success } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  // Get redirect parameter and check if its checkout or something
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");
  
  useEffect(() => {
    if (user) {
         if(cart?.products.length > 0  && guestId){
          dispatch(mergeCart({guestId, user})).then(() => {
            navigate(isCheckoutRedirect ?  "/checkout" : "/");
          });
         } else {
          navigate(isCheckoutRedirect ? "/checkout" : "/");
         }
    }
  }, [user, guestId, cart, navigate, isCheckoutRedirect, dispatch])

  useEffect(() => {
  if (error) {
    toast.error(error, { duration: 1000 });
    dispatch(clearAuthState());
  }

  if (success) {
    toast.success("Account created successfully 🎉", { duration: 1000 });
    dispatch(clearAuthState());
  }
}, [error, success, dispatch]);

  const handleSubmit = (e) => {
  e.preventDefault();

  if (!name || !email || !password) {
    toast.error("Please fill all fields", { duration: 1000 });
    return;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters", { duration: 1000 });
    return;
  }

  dispatch(registerUser({ name, email, password }));
};

  return (
    <div className="flex">
      <div className="w-full md:w-1/2 flex-col flex justify-center items-center p-6 md:p-12 lg:p-0">
        <form 
        className="w-full max-w-md bg-white rounded-lg border p-6 lg:p-8  shadow-sm"
        onSubmit={handleSubmit}
        >

          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-center mb-2 ">Hey There!👋</h2>
          <h1 className=" text-center mb-2 ">Welcome To</h1>
          <div className="flex justify-center mb-6">
            
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold">The Drip Store</h2>
          </div>
          
          <h2 className="text-lg md:text-xl lg:text-2xl  text-center mb-6 ">Create Account</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">E-mail</label>
            <input
              type="email"
              placeholder="Enter Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="bg-black text-white w-full p-2 rounded-lg font-semibold hover:bg-gray-800 transition " >
           {loading ? "Loading..." : "Sign up"}
          </button>
          <p className="mt-6 text-center text-sm">
            Already have an account? { }
            <Link to={`/login?redirect=${encodeURIComponent(redirect)}`} className="text-blue-500">
              Login
            </Link>
          </p>
        </form>
      </div>

      <div className="hidden md:block w-1/2 bg-gray-800 ">
         <div className="h-full flex flex-col justify-center items-center">
          <img src={register} alt="Login to account" className="w-full h-[650px] object-cover " />
         </div>
      </div>
    </div>
  );
};

export default Register;
