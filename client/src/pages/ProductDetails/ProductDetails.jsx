import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { useAtom } from 'jotai'; // Import useAtom to manage cart state
import { cartAtom } from '../../redux/Store'; // Import cartAtom to manage the cart state
import Cart from "../../assets/cart.svg"; // Import the cart icon
import Cart2 from "../../assets/cart2.svg"; // Import the contact supplier icon

function ProductDetails() {
  const { id } = useParams(); // Get product ID from the URL parameters
  const [quantity, setQuantity] = useState(1); // Manage quantity state
  const [product, setProduct] = useState(null); // Manage product details
  const [selectedImage, setSelectedImage] = useState(''); // Manage selected product image
  const [cartItems, setCartItems] = useAtom(cartAtom); // Manage cart items using jotai atom
  const navigate = useNavigate(); // Hook for navigating programmatically

  const user = true; // Assume user is not logged in (change this based on actual authentication state)

  // Fetch product details on component mount
  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data); // Store product data
        setSelectedImage(data.thumbnail); // Set initial image to product thumbnail
      })
      .catch(error => console.error('Error fetching product details:', error));
  }, [id]);

  // Function to add the product to the cart
  const handleAddToCart = () => {
    const newItem = {
      id: product.id, // Product ID
      name: product.title, // Product title
      price: product.price, // Product price
      quantity, // Selected quantity
      image: selectedImage, // Selected image or fallback to thumbnail
    };

    setCartItems(prevItems => {
      const itemExists = prevItems.find(item => item.id === product.id); // Check if item is already in the cart

      if (itemExists) {
        // If item exists, update its quantity
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        // If item doesn't exist, add it to the cart
        return [...prevItems, newItem];
      }
    });
  };

  // Function to handle the click on "Add to Cart" button
  const handleButtonClick = () => {
    if (user) {
      handleAddToCart(); // If user is logged in, add the product to the cart
    } else {
      navigate('/signin'); // If user is not logged in, redirect to signin page
    }
  };

  // Show loading message if product is not yet fetched
  if (!product) {
    return <div className="text-center mt-10 text-xl">Loading...</div>;
  }

  return (
    <div className="w-[100%] mx-auto pl-[130px] p-8 flex justify-between flex-row gap-5">
      {/* Product Images */}
      <div className="w-[30%]">
        <div className="top-4 flex gap-2">
          {/* Product thumbnails */}
          <div className="flex flex-col space-y-2 mr-[10px]">
            {product.images.map((img, index) => (
              <div
                key={index}
                className={`w-16 h-16 border bg-[#E0E5EB] rounded-md overflow-hidden cursor-pointer ${
                  selectedImage === img ? 'border-green-500' : 'border-gray-200'
                }`}
                onClick={() => setSelectedImage(img)} // Update selected image
              >
                <img
                  src={img}
                  alt={`Product ${index}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Main product image */}
          <div className="w-full aspect-square bg-[#E0E5EB] rounded-lg overflow-hidden">
            <img
              src={selectedImage}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="w-[70%] ml-3 grid grid-cols-1 md:grid-cols-2 gap-[21px]">
        <div className="flex flex-col gap-[20px]">
          {/* Product title */}
          <h1 className="text-xl font-bold">{product.title}</h1>

          {/* Rating */}
          <div className="flex items-center text-yellow-500">
            {[...Array(5)].map((_, index) => (
              <span key={index} className={`text-xl ${index < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-300'}`}>
                ★
              </span>
            ))}
            <span className="ml-2 text-sm font-medium text-black">{product.rating}</span>
          </div>

          {/* Price */}
          <div className="bg-white p-[15px]">
            <p className="text-sm mb-1 text-[#9CA3AF]">Minimum order quantity: 1 piece</p>
            <p className="font-bold text-lg">
              US$ {product.price} - ${product.price + 4.0}
            </p>
          </div>

          {/* Quantity Selector */}
          <div>
            <label className="block text-base font-medium text-[#1F2937]">Quantity</label>
            <div className="flex justify-between items-center mt-1 bg-white space-x-2 border rounded-md border-[#E0E5EB] py-1 px-3">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-16 text-center"
              />
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>

          {/* Add to Cart and Contact Supplier buttons */}
          <div className="mt-6 flex space-x-4">
            <button
              onClick={handleButtonClick}
              className="w-full gap-2 flex items-center justify-center text-base bg-brandGreen text-white py-2 rounded-[10px]"
            >
              Add to cart <img src={Cart} alt="Add to cart" />
            </button>
            <button className="w-full border gap-2 flex items-center justify-center text-base bg-[#EFF0F2] text-[#1F2937] py-2 rounded-[10px]">
              Contact Supplier <img src={Cart2} alt="Contact supplier" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
