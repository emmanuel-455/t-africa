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
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [cartItems, setCartItems] = useAtom(cartAtom);
  const [isUserLoggedIn] = useAtom(isUserLoggedInAtom);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [reviewRating, setReviewRating] = useState(0);
  
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

          const relatedResponse = await fetch(`https://dummyjson.com/products/category/${data.category}`);
          const relatedData = await relatedResponse.json();
          setRelatedProducts(relatedData.products.filter(p => p.id !== data.id));
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
    loadProductDetails();
  }, [id]);

  useEffect(() => window.scrollTo(0, 0), []);

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
    isUserLoggedIn ? handleAddToCart() : navigate('/signin');
  };

  const handleSubmitReview = () => {
    reviews.push({ rating: reviewRating, comment: newReview, user: "John Doe" });
    setNewReview('');
    setReviewRating(0);
  };

  if (!product) return <div className="text-center mt-10 text-xl">Loading...</div>;

  return (
    <div>
      <Category />
      <div className='flex'>
      <div className='flex flex-col md:gap-8 lg:gap- md:flex-row lg:flex-row max-w-screen-xl mx-auto p-4 md:p-8 bg-white rounded-xl'>
        {/* Product Images */}
        <div className='flex mb-5 flex-col gap-5'>
        <h2 className='text-xl md:hidden block font-medium text-gray-900'>{product.title}</h2>
          <div className="flex flex-row gap-3">
            <div className="flex flex-col space-y-2">
              {product.images.map((img, index) => (
                <img key={index} src={img} alt={`Product ${index}`} className={`w-16 h-16 cursor-pointer border rounded-md ${selectedImage === img ? 'border-green-500' : 'border-gray-200'}`} onClick={() => setSelectedImage(img)} />
              ))}
            </div>
            <img src={selectedImage} alt={product.title} className="lg:w-[320px] md:w-full w-[250px] aspect-square bg-[#E0E5EB] rounded-lg object-contain" />
          </div>
          <div className='hidden md:block lg:hidden'>
          <Delivery />
          <SellerInfo />
          </div>
        </div>

        {/* Product Details */}
        <div className='flex flex-col md:w-full lg:w-[30%] gap-2'>
          <h2 className='text-xl hidden md:block font-medium text-gray-900'>{product.title}</h2>
          <div className='text-xl font-bold bg-gray-200 px-3 py-2 text-[#1F2937]'>NGN {product.price}</div>
          <p className='text-sm text-[#9CA3AF]'>Minimum Order: 1 piece</p>
          <p className='text-gray-700 text-sm'>{product.description}</p>
          <div className='flex items-center text-yellow-500'>
            {[...Array(5)].map((_, index) => (
              <span key={index} className={`text-xl ${index < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
            ))} <span className='text-sm'>500+ Sold</span>
          </div>
          
          <label className='block text-base font-medium text-[#1F2937]'>Quantity</label>
          <div className='flex justify-between mb-3 items-center bg-white border border-[#E0E5EB] rounded-md py-2 px-4'>
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
            <input type='number' value={quantity} onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))} className='w-16 text-center border-none outline-none' />
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>

          <div className='flex gap-4 mb-8 w-full'>
            <button onClick={handleButtonClick} className='bg-brandGreen text-nowrap w-full justify-center text-white py-3 px-4 rounded-lg flex items-center'>
              Add to Cart <img src={Cart} alt='Add to cart' />
            </button>
      
          </div>
          <div className='hidden lg:block'>
          <ReviewsSection reviews={reviews} newReview={newReview} setNewReview={setNewReview} reviewRating={reviewRating} setReviewRating={setReviewRating} handleSubmitReview={handleSubmitReview} />
          </div>
      </div>
      
      <div className='lg:block md:hidden lg:w-[30%]'>
          <Delivery />
          <SellerInfo />
          </div>

          <div className='hidden'>
          <ReviewsSection reviews={reviews} newReview={newReview} setNewReview={setNewReview} reviewRating={reviewRating} setReviewRating={setReviewRating} handleSubmitReview={handleSubmitReview} />
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
