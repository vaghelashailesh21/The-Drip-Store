import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { addUser, deleteUser, fetchUsers, updateUser } from "../../Redux/slices/adminSlice";

const UserManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { users, loading, error } = useSelector((state) => state.admin);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  useEffect(() => {
    if (user && user.role !== "admin") navigate("/");
  }, [user, navigate]);

  useEffect(() => {
    if (user && user.role === "admin") dispatch(fetchUsers());
  }, [dispatch, user]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser(formData));
    setFormData({ name: "", email: "", password: "", role: "customer" });
  };

  const handleRoleChange = (userId, newRole) => {
    dispatch(updateUser({ id: userId, role: newRole }));
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(userId));
    }
  };

  // Loading Skeleton UI
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          <Skeleton width={200} />
        </h2>

        {/* Add User Form Skeleton */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md space-y-3">
          <h3 className="text-lg font-bold mb-4">
            <Skeleton width={150} />
          </h3>
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} height={35} className="mb-3" />
            ))}
          <Skeleton width={100} height={35} />
        </div>

        {/* Mobile Cards Skeleton */}
        <div className="grid sm:hidden gap-4">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-lg shadow-md space-y-2"
              >
                <Skeleton width={`60%`} height={20} />
                <Skeleton width={`80%`} height={15} />
                <Skeleton width={`40%`} height={15} />
                <Skeleton width={`50%`} height={15} />
              </div>
            ))}
        </div>

        {/* Desktop Table Skeleton */}
        <div className="hidden sm:block overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full text-left text-gray-500">
            <thead className="bg-gray-100 text-xs sm:text-sm uppercase text-gray-700">
              <tr>
                {["Name", "Email", "Role", "Actions"].map((h, i) => (
                  <th key={i} className="py-3 px-4">
                    <Skeleton width={80} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <tr key={i} className="border-b">
                    {Array(4)
                      .fill(0)
                      .map((__, j) => (
                        <td key={j} className="py-4 px-4">
                          <Skeleton width={`90%`} height={20} />
                        </td>
                      ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

// Error UI
if (error) {
  return (
    <div className="min-h-screen flex flex-col items-center 
                    justify-start sm:justify-center pt-20 sm:pt-0 bg-gray-50">
      <div className="text-6xl mb-4">👤</div>
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2 text-center">
        Failed to load users
      </h2>
      <p className="text-gray-500 max-w-md mb-6 text-center">
        We couldn’t fetch user data. Please try again.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
      >
        Retry
      </button>
    </div>
  );
}

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      <h2 className="text-2xl sm:text-3xl font-bold">User Management</h2>

      {/* Add User Form */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-bold mb-4">Add New User</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-2 border rounded"
            required
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Add User
          </button>
        </form>
      </div>

      {/* Mobile Cards */}
      <div className="grid sm:hidden gap-4">
        {users.map((u) => (
          <div
            key={u._id}
            className="bg-white p-4 rounded-lg shadow-md space-y-2"
          >
            <p className="font-semibold text-gray-900">{u.name}</p>
            <p className="text-gray-600">{u.email}</p>
            <div className="flex items-center justify-between">
              <select
                value={u.role}
                onChange={(e) => handleRoleChange(u._id, e.target.value)}
                className="p-2 border rounded"
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
              <button
                onClick={() => handleDeleteUser(u._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden sm:block overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs sm:text-sm uppercase text-gray-700">
            <tr>
              {["Name", "Email", "Role", "Actions"].map((h) => (
                <th key={h} className="py-3 px-4">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-b hover:bg-gray-50">
                <td className="py-4 px-4 font-medium text-gray-900 whitespace-nowrap">
                  {u.name}
                </td>
                <td className="py-4 px-4">{u.email}</td>
                <td className="py-4 px-4">
                  <select
                    value={u.role}
                    onChange={(e) => handleRoleChange(u._id, e.target.value)}
                    className="p-2 border rounded"
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="py-4 px-4">
                  <button
                    onClick={() => handleDeleteUser(u._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;