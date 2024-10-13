import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { useAtom } from 'jotai'; 
import { cartAtom } from '../../redux/Store'; 
import Cart from "../../assets/cart.svg"; 
import Cart2 from "../../assets/cart2.svg"; 
import { fetchProducts } from '../../utils/api';  // Import the fetchProducts API

function ProductDetails() {
  const { id } = useParams();  // Get the product id from the URL
  const [quantity, setQuantity] = useState(1); 
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(''); 
  const [cartItems, setCartItems] = useAtom(cartAtom); 
  const [reviews, setReviews] = useState([]);  // State to hold reviews
  const [newReview, setNewReview] = useState(''); // State to hold new review input
  const [reviewRating, setReviewRating] = useState(0); // State to hold review rating
  const navigate = useNavigate();

  const user = true;  // Assuming user is logged in (you can adjust this based on your auth logic)

  useEffect(() => {
    // Direct API request to fetch a single product by ID
    const loadProductDetails = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();

        if (response.ok) {
          setProduct(data);
          setSelectedImage(data.thumbnail);
          setReviews(data.reviews || []);  // Assuming reviews are part of the API response
        } else {
          console.error('Error fetching product details:', data);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    loadProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    const newItem = {
      id: product.id, 
      name: product.title, 
      price: product.price,
      quantity, 
      image: selectedImage, 
    };

    setCartItems(prevItems => {
      const itemExists = prevItems.find(item => item.id === product.id);

      if (itemExists) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prevItems, newItem];
      }
    });
  };

  const handleButtonClick = () => {
    if (user) {
      handleAddToCart();
    } else {
      navigate('/signin'); 
    }
  };

  // Function to handle submitting a new review
  const handleSubmitReview = () => {
    const newReviewObject = {
      rating: reviewRating,
      comment: newReview,
      user: "John Doe", // Hardcoded username, replace with actual logged-in user
    };

    setReviews(prevReviews => [...prevReviews, newReviewObject]);
    setNewReview(''); // Clear review input
    setReviewRating(0); // Reset rating
  };

  if (!product) {
    return <div className="text-center mt-10 text-xl">Loading...</div>;
  }

  return (
    <div className="w-full mx-auto p-4 md:p-8 flex flex-col lg:flex-row gap-8 max-w-screen-xl">
      {/* Product Images */}
      <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-start gap-4">
        <div className="flex flex-row lg:flex-col gap-1">
          {/* Thumbnails */}
          <div className="flex flex-col lg:flex-col space-y-2 lg:space-x-0 lg:mr-[10px]">
            {product.images.map((img, index) => (
              <div
                key={index}
                className={`w-16 h-16 border bg-[#E0E5EB] rounded-md overflow-hidden cursor-pointer ${
                  selectedImage === img ? 'border-green-500' : 'border-gray-200'
                }`}
                onClick={() => setSelectedImage(img)}
              >
                <img
                  src={img}
                  alt={`Product ${index}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="w-full lg:w-[80%] aspect-square bg-[#E0E5EB] rounded-lg overflow-hidden">
            <img
              src={selectedImage}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="w-full lg:w-2/3 flex flex-col gap-2">
        {/* Product Title */}
        <h1 className="text-xl">{product.title}</h1>
        
        {/* Pricing Section */}
        <div className="rounded-lg">
          <div className="text-lg font-bold text-[#1F2937] flex items-center space-x-2">
            <span>US$ {product.price}</span>
            <span>-</span>
            <span>US$ {product.price + 4.0}</span>
          </div>
          <p className="text-sm text-[#9CA3AF]">Minimum Order: 1 piece</p>
        </div>
        
        {/* Rating */}
        <div className="flex items-center text-yellow-500">
          {[...Array(5)].map((_, index) => (
            <span key={index} className={`text-xl ${index < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-300'}`}>
              ★
            </span>
          ))}
        </div>

        {/* Quantity Selector */}
        <div>
          <label className="block text-base font-medium text-[#1F2937]">Quantity</label>
          <div className="flex justify-between items-center mt-2 bg-white space-x-2 border border-[#E0E5EB] w-[40%] mb-4 rounded-md py-2 px-4">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="font-bold text-xl">
              -
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-16 text-center border-none outline-none"
            />
            <button onClick={() => setQuantity(quantity + 1)} className="font-bold text-xl">
              +
            </button>
          </div>
        </div>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={handleButtonClick}
            className="flex-1 bg-brandGreen hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2"
          >
            <span>Add to Cart</span>
            <img src={Cart} alt="Add to cart" />
          </button>
          <button className="flex-1 border bg-[#EFF0F2] hover:bg-gray-200 text-black font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2">
            <span>Contact Supplier</span>
            <img src={Cart2} alt="Contact supplier" />
          </button>
        </div>

        {/* Product Description */}
        <div className="border-t pt-4 mt-4">
          <h2 className="text-lg font-semibold mb-2">Product Details</h2>
          <p className="text-gray-700">{product.description}</p>
        </div>

        {/* Review Section */}
        <div className="border-t pt-4 mt-4">
          <h2 className="text-lg font-semibold mb-2">Customer Reviews</h2>
          
          {/* Display existing reviews */}
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="mb-4">
                <p className="font-bold">{review.user}</p>
                <div className="flex items-center text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-lg ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}>
                      ★
                    </span>
                  ))}
                </div>
                <p>{review.comment}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet. Be the first to review!</p>
          )}

          {/* Add a new review (if user is logged in) */}
          {user && (
            <div className="mt-4">
              <h3 className="font-semibold text-base mb-2">Leave a Review</h3>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center">
                  <span className="mr-2">Your Rating:</span>
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-xl cursor-pointer ${i < reviewRating ? 'text-yellow-500' : 'text-gray-300'}`}
                      onClick={() => setReviewRating(i + 1)}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <textarea
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  placeholder="Write your review here"
                  className="border p-2 rounded-md w-full"
                  rows="3"
                />
                <button
                  onClick={handleSubmitReview}
                  className="bg-green-500 text-white font-medium py-2 px-4 rounded-md"
                >
                  Submit Review
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
