import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { cartAtom, isUserLoggedInAtom } from '../../redux/Store';
import Cart from "../../assets/cart.svg";
import Cart2 from "../../assets/cart2.svg";
import ReviewsSection from '../../components/ReviewsSection';
import Category from '../../components/Category';
import Delivery from '../../components/Delivery';
import SellerInfo from '../../components/SellerInfo';

function ProductDetails() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [cartItems, setCartItems] = useAtom(cartAtom);
  const [newReview, setNewReview] = useState('');
  const [reviewRating, setReviewRating] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isUserLoggedIn] = useAtom(isUserLoggedInAtom);
  const navigate = useNavigate();

  const reviews = [
    { user: "John Doe", rating: 5, comment: "Excellent product!" },
    { user: "Jane Smith", rating: 4, comment: "Very good, but could be better." },
  ];

  useEffect(() => {
    const loadProductDetails = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();

        if (response.ok) {
          setProduct(data);
          setSelectedImage(data.thumbnail);
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
  }, []);

  const handleAddToCart = () => {
    const newItem = {
      id: product.id,
      name: product.title,
      price: product.price,
      quantity: Math.max(1, quantity),
      image: selectedImage,
    };

    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.id === product.id);
      const updatedCart = itemExists
        ? prevItems.map((item) => 
            item.id === product.id 
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        : [...prevItems, newItem];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleButtonClick = () => {
    if (isUserLoggedIn) {
      handleAddToCart();
    } else {
      navigate('/signin');
    }
  };

  if (!product) {
    return <div className="text-center mt-10 text-xl">Loading...</div>;
  }

  return (
    <div>
      <div className='mb-4'>
        <Category />
      </div>
      <div className='flex'>
        <div className="w-full mx-auto bg-white rounded-xl p-4 md:p-8 flex flex-col md:flex-row gap-10 max-w-screen-xl">
          {/* Product Images */}
          <div className="w-full lg:w-1/4 flex flex-col items-start gap-4">
        <div className="flex flex-row lg:flex-row gap-3">
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

          <div className="w-full lg:w-[220px] aspect-square bg-[#E0E5EB] rounded-lg overflow-hidden">
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
            <h2 className="text-xl font-normal text-gray-900">{product.title}</h2>
            <div className="rounded-lg">
              <div className="text-xl mb-2 bg-gray-200 px-3 py-2 font-bold text-[#1F2937] flex items-center space-x-2">
                <span>NGN {product.price}</span>
              </div>
              <p className="text-sm text-[#9CA3AF]">Minimum Order: 1 piece</p>
            </div>
            <p className="text-gray-700 lg:w-[500px] text-sm mb-3">{product.description}</p>

            <div className="flex items-center text-yellow-500">
              {[...Array(5)].map((_, index) => (
                <span key={index} className={`text-xl ${index < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
              ))} 500+ Sold
            </div>

            <div>
              <label className="block mb-2 text-base font-medium text-[#1F2937]">Quantity</label>
              <div className="flex items-center justify-between bg-white border border-[#E0E5EB] w-[150px] sm:w-[60%] md:w-[20%] mb-4 rounded-md py-2 px-2">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="font-bold text-xl">-</button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                  className="w-16 text-center border-none outline-none"
                />
                <button onClick={() => setQuantity(quantity + 1)} className="font-bold text-xl">+</button>
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
            </div>

            <Delivery />
            <SellerInfo />
            <ReviewsSection
              reviews={reviews}
              isUserLoggedIn={true}
              newReview={newReview}
              setNewReview={setNewReview}
              reviewRating={reviewRating}
              setReviewRating={setReviewRating}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
