import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchAdminProducts } from '../Redux/slices/adminProductSlice';
import { fetchAllOrders } from '../Redux/slices/adminOrderSlice';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AdminHomePage = () => {
const dispatch = useDispatch();
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

// loading ui
  if (productsLoading || ordersLoading) {
  return (
    <div className="max-w-7xl mx-auto">
      
      {/* Title */}
      <Skeleton width={250} height={35} className="mb-6" />

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        
        {Array(3).fill(0).map((_, i) => (
          <div key={i} className="p-4 shadow-md rounded-lg space-y-3">
            <Skeleton width={120} />
            <Skeleton width={80} height={30} />
            <Skeleton width={100} />
          </div>
        ))}

      </div>

      {/* Table */}
      <div>
        <Skeleton width={200} height={25} className="mb-4" />

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th><Skeleton width={80} /></th>
                <th><Skeleton width={80} /></th>
                <th><Skeleton width={80} /></th>
                <th><Skeleton width={80} /></th>
              </tr>
            </thead>

            <tbody>
              {Array(5).fill(0).map((_, i) => (
                <tr key={i}>
                  <td className="p-4"><Skeleton width={120} /></td>
                  <td className="p-4"><Skeleton width={100} /></td>
                  <td className="p-4"><Skeleton width={80} /></td>
                  <td className="p-4"><Skeleton width={60} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
// error ui
  if (productsError || ordersError) {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex flex-col items-center justify-center py-16 text-center">
        
        {/* Icon */}
        <div className="text-5xl mb-4">📊</div>

        {/* Title */}
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
          Dashboard failed to load
        </h2>

        {/* Message */}
        <p className="text-gray-500 max-w-md mb-6">
          We couldn’t load admin data right now. Please try again.
        </p>

        {/* Optional error detail */}
        <p className="text-sm text-red-400 mb-4">
          {productsError || ordersError}
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
    <div className='max-w-7xl mx-auto '>
        <h1 className='text-3xl font-bold mb-6'>Admin Dashboard</h1>
     
        {/* Dashboard Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        <div className='p-4 shadow-md rounded-lg'>
          <h2 className='text-xl font-semibold'>Revenue</h2>
          <p className='text-2xl'>₹{totalSales.toFixed(2)}</p>
        </div>

        <div className='p-4 shadow-md rounded-lg'>
          <h2 className='text-xl font-semibold'>Total Orders</h2>
          <p className='text-2xl'>{totalOrders}</p>
          <Link to="/admin/orders" className='text-blue-500 hover:underline'>
            Manage Orders
          </Link>
        </div>

        <div className='p-4 shadow-md rounded-lg'>
          <h2 className='text-xl font-semibold'>Total Products</h2>
          <p className='text-2xl'>{products.length}</p>
          <Link to="/admin/products" className='text-blue-500 hover:underline'>
            Manage Products
          </Link>
        </div>
      </div>

        <div className='mt-6'>
            <h2 className='text-2xl font-bold mb-4'>Recent Orders</h2>
            <div className='overflow-x-auto'>
                <table className='min-w-full text-left text-gray-500'>
                    <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
                        <tr>
                            <th className='py-3 px-4'>Order ID</th>
                            <th className='py-3 px-4'>User</th>
                            <th className='py-3 px-4'>Total Price</th>
                            <th className='py-3 px-4'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <tr key={order._id} className='border-b hover:bg-gray-50 cursor-pointer'>
                                    <td className='p-4'>{order._id}</td>
                                    <td className='p-4'>{order.user?.name}</td>
                                    <td className='p-4'>₹{order.totalPrice.toFixed(2)}</td>
                                    <td className='p-4'>{order.status}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className='text-center p-4 text-gray-500'>
                                    No recent order found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default AdminHomePage