import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails, fetchSimilarProducts } from "../../Redux/slices/productsSlice";
import { addToCart } from "../../Redux/slices/cartSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";



const ProductDetails = ({ productId }) => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const {selectedProduct, loading, error, similarProducts} = useSelector((state) => state.products);
  const {user, guestId} = useSelector((state) => state.auth);

  const [mainImg, setMainImg] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const productFetchId = productId || id;

  useEffect(() => {
    if(productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts({ id: productFetchId }));
    }
  }, [productFetchId, dispatch]);

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImg(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  const handleQuantityChange = (action) => {
    if (action === "plus") setQuantity((prev) => prev + 1);
    if (action === "minus" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    // Nothing selected
    if (!selectedSize && !selectedColor) {
      toast.error("Please select your preferred size and color to continue.", {
        duration: 1000,
      });
      return;
    }

    // Color selected, size missing
    if (!selectedSize && selectedColor) {
      toast.error("Please select a size to continue.", {
        duration: 1000,
      });
      return;
    }

    // Size selected, color missing
    if (selectedSize && !selectedColor) {
      toast.error("Please select a color to continue.", {
        duration: 1000,
      });
      return;
    }

    // Both selected → proceed
    setIsButtonDisabled(true);
    dispatch(
      addToCart({
        productId: productFetchId,
        quantity,
        size: selectedSize,
        color: selectedColor,
        guestId,
        userId: user?._id 
      })
    ).then(() => {
      toast.success("Product added to cart!", { duration: 1000 });
    }).catch((error) => {
      toast.error("Failed to add product to cart. Please try again.", { duration: 1000 });
      console.error("Add to cart error:", error);
    }).finally(() => {
      setIsButtonDisabled(false);
    }); 
  };  

// Loading UI  
if (loading) {
  return (
    <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
      <div className="flex flex-col md:flex-row">
        
        {/* LEFT THUMBNAILS */}
        <div className="hidden md:flex flex-col space-y-4 mr-6">
          {Array(4).fill(0).map((_, i) => (
            <Skeleton
              key={i}
              className="w-20 h-20 rounded-lg"
              baseColor="#e5e7eb"
              highlightColor="#f3f4f6"
            />
          ))}
        </div>

        {/* MAIN IMAGE */}
        <div className="md:w-1/2">
          <Skeleton
            className="w-full h-[400px] sm:h-[500px] md:h-[420px] lg:h-[520px] rounded-lg"
            baseColor="#e5e7eb"
            highlightColor="#f3f4f6"
          />
        </div>

        {/* RIGHT SIDE CONTENT */}
        <div className="md:w-1/2 md:ml-10 mt-6 md:mt-0 space-y-4">
          
          {/* Title */}
          <Skeleton width="70%" height={25} />

          {/* Price */}
          <Skeleton width="30%" height={20} />

          {/* Description */}
          <Skeleton width="90%" />
          <Skeleton width="80%" />
          <Skeleton width="60%" />

          {/* Color */}
          <div>
            <Skeleton width="20%" />
            <div className="flex gap-2 mt-2">
              {Array(4).fill(0).map((_, i) => (
                <Skeleton key={i} circle width={30} height={30} />
              ))}
            </div>
          </div>

          {/* Size */}
          <div>
            <Skeleton width="20%" />
            <div className="flex gap-2 mt-2">
              {Array(4).fill(0).map((_, i) => (
                <Skeleton key={i} circle width={30} height={30} />
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <Skeleton width="30%" />
            <div className="flex gap-3 mt-2">
              <Skeleton width={30} height={30} />
              <Skeleton width={40} height={30} />
              <Skeleton width={30} height={30} />
            </div>
          </div>

          {/* Button */}
          <Skeleton height={45} />

          {/* Table */}
          <div className="mt-6 space-y-2">
            <Skeleton width="40%" />
            {Array(5).fill(0).map((_, i) => (
              <Skeleton key={i} height={15} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

//error UI 
 if (error) {
  return (
    <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
      <div className="flex flex-col items-center justify-center py-16 text-center">
        
        {/* Icon */}
        <div className="text-5xl mb-4">🛑</div>

        {/* Title */}
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
          Unable to load product
        </h2>

        {/* Message */}
        <p className="text-gray-500 max-w-md mb-6">
          Something went wrong while fetching this product. Please try again or explore other items.
        </p>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => window.location.reload()}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
          >
            Retry
          </button>

          <button
            onClick={() => window.history.back()}
            className="border border-gray-300 px-6 py-2 rounded hover:bg-gray-100 transition"
          >
            Go Back
          </button>
        </div>

      </div>
    </div>
  );
}

  return (
    <div>
      {selectedProduct && (
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
        <div className="flex flex-col md:flex-row">
          {/* left thumbnails */}

          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || `Thumbnail ${index} `}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                  mainImg === image.url ? "border-black" : "border-gray-300"
                } `}
                onClick={() => setMainImg(image.url)}
              />
            ))}
          </div>

          {/* Main image */}

          <div className="md:w-1/2">
            <div className="mb-4 ">
              {mainImg && (
                <img
                  src={mainImg}
                  alt="Main Product"
                  className="w-full h-[400px] sm:h-[500px] md:h-[420px] lg:h-[520px] object-cover rounded-lg"
                />
              )}
            </div>
          </div>

          {/* Mobile Thumbnail */}
          <div className="md:hidden flex overscroll-x-scroll space-x-4 mb-4">
            {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || `Thumbnail ${index}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                  mainImg === image.url ? "border-black" : "border-gray-300"
                } `}
                onClick={() => setMainImg(image.url)}
              />
            ))}
          </div>

          {/* Right side content of product */}
          <div className="md:w-1/2 md:ml-10">
            <h1 className="text-xl md:text-xl lg:text-2xl font-semibold mb-2">
              {selectedProduct.name}
            </h1>
            <span className="text-md md:text-lg lg:text-lg font-bold text-gray-800 pr-2">
              ₹{selectedProduct.price &&
                `${selectedProduct.price}`}
            </span>
            <p className="text-gray-700 text-xs md:text-sm lg:text-lg mt-2 mb-4 ">
              {selectedProduct.description}
            </p>

            {/* color selection */}
            <div className="mb-4 ">
              <p className="text-gray-700">Color:</p>
              <div className="flex gap-2 mt-2 ">
                {selectedProduct.colors.map((color) => (
                  <button
                    key={color}
                    // onClick={() => setSelectedColor(color)}
                    onClick={() =>
                      setSelectedColor((prev) => (prev === color ? "" : color))
                    }
                    className={`w-6 h-6 lg:w-8 lg:h-8 md:w-7 md:h-7  rounded-full border ${selectedColor === color ? "border-3 border-black" : "border-gray-300"} `}
                    style={{ backgroundColor: color.toLocaleLowerCase() }}
                  ></button>
                ))}
              </div>
            </div>

            {/* size selection  */}
            <div className="mb-4">
              <p className="text-gray-700">Size:</p>
              <div className="flex gap-2 mt-2 ">
                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    // onClick={() => setSelectedSize(size)}
                    onClick={() =>
                      setSelectedSize((prev) => (prev === size ? "" : size))
                    }
                    className={`w-8 h-8 rounded-full border ${selectedSize === size ? " bg-black text-white" : "border-gray-600"} `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity increase and decrease */}
            <div className="mb-6">
              <p className="text-gray-600">Quantity:</p>
              <div className="flex items-center space-x-4 mt-2 ">
                <button
                  onClick={() => handleQuantityChange("minus")}
                  className="px-2 py-1 bg-gray-200 rounded text-lg "
                >
                  -
                </button>
                <span className="text-lg">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange("plus")}
                  className="px-2 py-1 bg-gray-200 rounded text-lg "
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to cart button */}
            <button
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
              className={`bg-black text-white py-2 px-6 rounded w-full mb-4 ${
                isButtonDisabled
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-gray-800"
              }`}
            >
              ADD TO CART
            </button>

            {/* characteristics of the product */}
            <div className="mt-10 text-gray-700 ">
              <h3 className="text-xl font-bold mb-4 ">Characteristics:</h3>
              <table className="w-full text-left text-sm text-gray-600">
                <tbody>
                  <tr>
                    <td className="py-1">Category</td>
                    <td className="py-1">{selectedProduct.category}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Collections</td>
                    <td className="py-1">{selectedProduct.collections}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Material</td>
                    <td className="py-1">{selectedProduct.material}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Gender</td>
                    <td className="py-1">{selectedProduct.gender}</td>
                  </tr>
                  {/* <tr>
                    <td className="py-1">Rating</td>
                    <td className="py-1">{selectedProduct.rating} ({selectedProduct.numReviews} reviews)</td>
                  </tr> */}
                  <tr>
                    <td className="py-1">SKU</td>
                    <td className="py-1">{selectedProduct.sku}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Stock</td>
                    <td className="py-1">{selectedProduct.countInStock}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-15 lg:mt-15 md:mt-20 ">
          <h2 className="text-2xl text-center mb-4 font-medium">
            You May Also Like
          </h2>
          <ProductGrid products={similarProducts} loading={loading} error={error} />
        </div>
      </div>
      )}
    </div>
  );
};

export default ProductDetails;
