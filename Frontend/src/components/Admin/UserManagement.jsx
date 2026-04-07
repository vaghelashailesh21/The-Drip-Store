import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser, deleteUser, fetchUsers, updateUser } from "../../Redux/slices/adminSlice";

const UserManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {user} = useSelector((state) => state.auth);
  const {users, loading, error} = useSelector((state) => state.admin);

  useEffect(() => {
    if(user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if(user && user.role === "admin" ){
      dispatch(fetchUsers());
    }
  }, [dispatch, user])

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer", // default role
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser(formData));

    //reset the form after submission
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "customer",
    });
  };

  const handleRoleChange = (userId, newRole) => {
    dispatch(updateUser({ id: userId, role: newRole }));
  };

  const handleDeleteUser = (userId) => {
    if(window.confirm("Are you sure you want to delete this user?")){
      dispatch(deleteUser(userId));
    }
  };

  if (loading) {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">User Management</h2>

      {/* Form Skeleton */}
      <div className="mb-6 space-y-4">
        <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>

        {[1,2,3,4].map((i) => (
          <div key={i} className="h-10 bg-gray-200 rounded animate-pulse"></div>
        ))}

        <div className="h-10 w-32 bg-gray-300 rounded animate-pulse"></div>
      </div>

      {/* Table Skeleton */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left">
          <thead>
            <tr>
              {["Name","Email","Role","Actions"].map((h, i) => (
                <th key={i} className="py-3 px-4">
                  <div className="h-4 w-20 bg-gray-300 rounded animate-pulse"></div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {Array(5).fill(0).map((_, i) => (
              <tr key={i} className="border-b">
                <td className="p-4">
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                </td>
                <td className="p-4">
                  <div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
                </td>
                <td className="p-4">
                  <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
                </td>
                <td className="p-4">
                  <div className="h-8 w-20 bg-gray-300 rounded animate-pulse"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

if (error) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col items-center justify-center py-16 text-center">

        {/* Icon */}
        <div className="text-5xl mb-4">👤</div>

        {/* Title */}
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
          Failed to load users
        </h2>

        {/* Message */}
        <p className="text-gray-500 max-w-md mb-6">
          We couldn’t fetch user data right now. Please try again.
        </p>

        {/* Button */}
        <button
          onClick={() => window.location.reload()}
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
        >
          Retry
        </button>

      </div>
    </div>
  );
}

  return (
    <div className="max-w-7xl mx-auto ">
      <h2 className="text-2xl font-bold p-6">User Management</h2>
      {/* Add new user form */}
      <div className="p-6 rounded-lg mb-6">
        <h3 className="text-lg font-bold mb-4">Add New User</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">E-mail</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Add User
          </button>
        </form>
      </div>

      {/* user list management */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-b hover:bg-gray-50 cursor-pointer"
              >
                <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                  {user.name}
                </td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="p-2 border rounded"
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="p-4">
                  <button onClick={() => handleDeleteUser(user._id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
