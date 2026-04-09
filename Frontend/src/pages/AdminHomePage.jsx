import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchAdminProducts } from "../Redux/slices/adminProductSlice";
import { fetchAllOrders, updateOrderStatus } from "../Redux/slices/adminOrderSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AdminHomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.adminProducts);
  const {
    orders,
    totalOrders,
    totalSales,
    loading: ordersLoading,
    error: ordersError,
  } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(fetchAllOrders());
  }, [dispatch]);

  // ================= LOADING =================
  if (productsLoading || ordersLoading) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <Skeleton width={250} height={35} className="mb-6" />

        {/* Dashboard Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="p-4 shadow-md rounded-lg space-y-3">
                <Skeleton width={120} />
                <Skeleton width={80} height={30} />
                <Skeleton width={100} />
              </div>
            ))}
        </div>

        <Skeleton width={200} height={25} className="mb-4" />

        {/* Orders Table Skeleton */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
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
                  <tr key={i}>
                    {Array(5)
                      .fill(0)
                      .map((_, j) => (
                        <td key={j} className="p-4">
                          <Skeleton width="100%" />
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

  // ================= ERROR =================
  if (productsError || ordersError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-start sm:justify-center pt-20 sm:pt-0 bg-gray-50">
        <div className="text-6xl mb-4">📊</div>
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2 text-center">
          Dashboard failed to load
        </h2>
        <p className="text-gray-500 max-w-md mb-6 text-center">
          We couldn’t load admin data right now. Please try again.
        </p>
        <p className="text-sm text-red-400 mb-4 text-center">
          {productsError || ordersError}
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
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold">Revenue</h2>
          <p className="text-2xl">₹{totalSales.toFixed(2)}</p>
        </div>
        <div className="p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold">Total Orders</h2>
          <p className="text-2xl">{totalOrders}</p>
          <Link to="/admin/orders" className="text-blue-500 hover:underline">
            Manage Orders
          </Link>
        </div>
        <div className="p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold">Total Products</h2>
          <p className="text-2xl">{products.length}</p>
          <Link to="/admin/products" className="text-blue-500 hover:underline">
            Manage Products
          </Link>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>

        {orders?.length > 0 ? (
          (() => {
            const recentOrders = [...orders]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 5);

            return (
              <>
                {/* Mobile Cards */}
                <div className="grid sm:hidden gap-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order._id}
                      className="p-4 bg-white shadow-md rounded-lg space-y-1 cursor-pointer hover:shadow-lg transition break-words"
                      onClick={() => navigate(`/admin/orders/${order._id}`)}
                    >
                      <p className="font-semibold text-sm truncate">
                        Order: #{order._id}
                      </p>
                      <p className="text-sm">Customer: {order.user?.name}</p>
                      <p className="text-sm">
                        Total: ₹{order.totalPrice?.toFixed(2)}
                      </p>
                      <p className="text-sm">Status: {order.status}</p>
                      <div className="flex gap-2 mt-2">
                        <select
                          value={order.status}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) =>
                            dispatch(
                              updateOrderStatus({
                                id: order._id,
                                status: e.target.value,
                              }),
                            )
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg block w-full p-1"
                        >
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(
                              updateOrderStatus({
                                id: order._id,
                                status: "Delivered",
                              }),
                            );
                          }}
                          className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600"
                        >
                          Mark as Delivered
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop Table */}
                <div className="hidden sm:block overflow-x-auto shadow-md rounded-lg">
                  <table className="min-w-full text-left text-gray-500">
                    <thead className="bg-gray-100 text-xs sm:text-sm text-gray-700 uppercase">
                      <tr>
                        {["Order ID", "Customer", "Total Price", "Status", "Actions"].map(
                          (col, i) => (
                            <th key={i} className="py-3 px-4">
                              {col}
                            </th>
                          ),
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr
                          key={order._id}
                          className="border-b hover:bg-gray-50 cursor-pointer"
                        >
                          <td
                            className="py-4 px-4 font-medium text-gray-900"
                            onClick={() =>
                              navigate(`/admin/orders/${order._id}`)
                            }
                          >
                            #{order._id}
                          </td>
                          <td
                            className="py-4 px-4"
                            onClick={() =>
                              navigate(`/admin/orders/${order._id}`)
                            }
                          >
                            {order.user?.name}
                          </td>
                          <td
                            className="py-4 px-4"
                            onClick={() =>
                              navigate(`/admin/orders/${order._id}`)
                            }
                          >
                            ₹{order.totalPrice?.toFixed(2)}
                          </td>
                          <td>
                            <select
                              value={order.status}
                              onChange={(e) =>
                                dispatch(
                                  updateOrderStatus({
                                    id: order._id,
                                    status: e.target.value,
                                  }),
                                )
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1 sm:p-2"
                            >
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="py-4 px-4">
                            <button
                              onClick={() =>
                                dispatch(
                                  updateOrderStatus({
                                    id: order._id,
                                    status: "Delivered",
                                  }),
                                )
                              }
                              className="bg-green-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-green-600 text-xs sm:text-sm"
                            >
                              Mark as Delivered
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            );
          })()
        ) : (
          <p className="text-center text-gray-500">No Recent Orders</p>
        )}
      </div>
    </div>
  );
};

export default AdminHomePage;