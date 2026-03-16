import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import register from "../assets/register.webp";
import { registerUser } from "../Redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { mergeCart } from "../Redux/slices/cartSlice";


const Register = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
    const navigate = useNavigate();
  const location = useLocation();
  const { user, guestId, loading } = useSelector((state) => state.auth);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
  }

  return (
    <div className="flex">
      <div className="w-full md:w-1/2 flex-col flex justify-center items-center p-8 md:p-12">
        <form 
        className="w-full max-w-md bg-white rounded-lg border p-8 shadow-sm"
        onSubmit={handleSubmit}
        >
          <div className="flex justify-center mb-6">
            <h2 className="text-xl font-medium">The Drip Store</h2>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6 ">Create Account</h2>
          
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
          <img src={register} alt="Login to account" className="w-full h-[600px] object-cover " />
         </div>
      </div>
    </div>
  );
};

export default Register;
