import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { cartAtom, isUserLoggedInAtom } from '../../redux/Store';
import Cart from "../../assets/cart.svg";
import Cart2 from "../../assets/cart2.svg";

function ProductDetails() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [cartItems, setCartItems] = useAtom(cartAtom);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [reviewRating, setReviewRating] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useAtom(isUserLoggedInAtom);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProductDetails = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();

        if (response.ok) {
          setProduct(data);
          setSelectedImage(data.thumbnail);
          setReviews(data.reviews || []);

          const relatedResponse = await fetch(`https://dummyjson.com/products/category/${data.category}`);
          const relatedData = await relatedResponse.json();
          setRelatedProducts(relatedData.products.filter(p => p.id !== data.id));
        } else {
          console.error('Error fetching product details:', data);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    loadProductDetails();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
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
      return itemExists
        ? prevItems.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item)
        : [...prevItems, newItem];
    });
  };

  const handleButtonClick = () => {
    if (isUserLoggedIn) {
      handleAddToCart();
    } else {
      navigate('/signin');
    }
  };

  const handleSubmitReview = () => {
    const newReviewObject = {
      rating: reviewRating,
      comment: newReview,
      user: "John Doe",
    };

    setReviews(prevReviews => [...prevReviews, newReviewObject]);
    setNewReview('');
    setReviewRating(0);
  };

  if (!product) {
    return <div className="text-center mt-10 text-xl">Loading...</div>;
  }

  return (
    <div className="w-full mx-auto p-4 md:p-8 flex flex-col lg:flex-row gap-8 max-w-screen-xl">
      {/* Product Images */}
      <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-start gap-4">
        <div className="flex flex-row lg:flex-row gap-1">
          <div className="flex flex-col space-y-2 lg:mr-[10px]">
            {product.images.map((img, index) => (
              <div
                key={index}
                className={`w-16 h-16 md:w-16 md:h-16 border bg-[#E0E5EB] rounded-md overflow-hidden cursor-pointer ${
                  selectedImage === img ? 'border-green-500' : 'border-gray-200'
                }`}
                onClick={() => setSelectedImage(img)}
              >
                <img src={img} alt={`Product ${index}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          <div className="w-full lg:w-[80%] aspect-square bg-[#E0E5EB] rounded-lg overflow-hidden">
            <img 
              src={selectedImage} 
              alt={product.title} 
              className="w-full h-auto max-h-[400px] object-contain" 
            />
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="w-full lg:w-2/3 flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <div className="">
          
          <p className="text-gray-700 w-[500px] text-sm mb-3">{product.description}</p>
        </div>
        <div className="rounded-lg">
          <div className="text-lg font-bold text-[#1F2937] flex items-center space-x-2">
            <span>US$ {product.price}</span>
            <span>-</span>
            <span>US$ {product.price + 4.0}</span>
          </div>
          <p className="text-sm text-[#9CA3AF]">Minimum Order: 1 piece</p>
        </div>

        <div className="flex items-center text-yellow-500">
          {[...Array(5)].map((_, index) => (
            <span key={index} className={`text-xl ${index < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-300'}`}>
              ★
            </span>
          ))}
        </div>

        <div>
          <label className="block text-base font-medium text-[#1F2937]">Quantity</label>
          <div className="flex justify-between items-center mt-2 bg-white space-x-2 border border-[#E0E5EB] w-[170px] sm:w-[60%] md:w-[20%] mb-4 rounded-md py-2 px-4">
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

        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={handleButtonClick}
            className="w-full md:w-auto bg-brandGreen hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2"
          >
            <span className="text-nowrap">Add to Cart</span>
            <img src={Cart} alt="Add to cart" />
          </button>
          <button className="w-full md:w-auto border bg-[#EFF0F2] hover:bg-gray-200 text-black font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2">
            <span>Contact Supplier</span>
            <img src={Cart2} alt="Contact supplier" />
          </button>
        </div>


        {/* Review Section */}
        <div className="border-t pt-4 mt-4">
          <h2 className="text-lg font-semibold mb-2">Customer Reviews</h2>
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
            <p>No reviews yet.</p>
          )}

          {isUserLoggedIn ? (
            <div className="mt-4">
              <h3 className="font-semibold">Add a Review</h3>
              <textarea
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                placeholder="Write your review..."
              />
              <div className="flex items-center mt-2">
                <span className="mr-2">Rating:</span>
                {[...Array(5)].map((_, index) => (
                  <span
                    key={index}
                    className={`cursor-pointer text-lg ${index < reviewRating ? 'text-yellow-500' : 'text-gray-300'}`}
                    onClick={() => setReviewRating(index + 1)}
                  >
                    ★
                  </span>
                ))}
              </div>
              <button onClick={handleSubmitReview} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 mt-2 rounded-lg">
                Submit Review
              </button>
            </div>
          ) : (
            <Link to="/signin" className="mt-2 bg-white py-3 rounded-full px-5 text-blue-500 hover:underline">
              Sign in to leave a review
            </Link>
          )}
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="border-t pt-4 mt-4">
            <h2 className="text-lg font-semibold mb-2">Related Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {relatedProducts.slice(0, 4).map((relatedProduct) => (
                <Link to={`/product/${relatedProduct.id}`} key={relatedProduct.id} className="border p-2 rounded-lg hover:shadow-md">
                  <img
                    src={relatedProduct.thumbnail}
                    alt={relatedProduct.title}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <h3 className="text-sm font-semibold mt-2">{relatedProduct.title}</h3>
                  <p className="text-gray-500 text-sm">US$ {relatedProduct.price}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
