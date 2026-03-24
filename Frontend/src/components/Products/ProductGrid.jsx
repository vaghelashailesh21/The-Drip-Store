import React from 'react'
import { Link } from 'react-router-dom'

const ProductGrid = ({products, loading, error}) => {
    if (loading) {
        return <p className="text-center text-gray-500">Loading products...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">Error loading products: {error}</p>;
    }
  return (
    <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-0'>
        {products.map((product, index) => (
                <Link key={index} to={`/product/${product._id}`} className='block'>
                    <div className='bg-white p-4 rounded-lg'>
                        <div className='w-full h-50 sm:h-40 md:h-100 lg:h-100 mb-4 '>
                            <img src={product.images[0].url} alt={product.images[0].altText || product.name} className='w-full h-full object-cover rounded-lg'/>
                        </div>
                        <h2 className='text-sm mb-2'>{product.name}</h2>
                        <p className='text-gray-500 font-medium text-sm tracking-tighter'>
                          ₹{product.price}
                        </p>
                    </div>
                </Link>
            ))}
    </div>
  )
}

export default ProductGrid