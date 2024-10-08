import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { useAtom } from 'jotai'; 
import { cartAtom } from '../../redux/Store'; 
import Cart from "../../assets/cart.svg"; 
import Cart2 from "../../assets/cart2.svg"; 

function ProductDetails() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1); 
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(''); 
  const [cartItems, setCartItems] = useAtom(cartAtom); 
  const navigate = useNavigate();

  const user = true; 

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data);
        setSelectedImage(data.thumbnail);
      })
      .catch(error => console.error('Error fetching product details:', error));
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

  if (!product) {
    return <div className="text-center mt-10 text-xl">Loading...</div>;
  }

  return (
    <div className="w-full mx-auto p-4 md:p-8 flex flex-col lg:flex-row gap-8 max-w-screen-xl">
      {/* Product Images */}
      <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-start gap-4">
        <div className="flex flex-row lg:flex-col gap-2">
          {/* Thumbnails */}
          <div className="flex flex-col lg:flex-col space-y-2 space-x-2 lg:space-x-0 lg:mr-[10px]">
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
      <div className="w-full lg:w-2/3 flex flex-col gap-6">
        {/* Product Title */}
        <h1 className="text-2xl font-semibold">{product.title}</h1>

        {/* Pricing Section */}
        <div className="border p-4 rounded-lg bg-white shadow-sm">
          <p className="text-sm text-[#9CA3AF]">Minimum Order: 1 piece</p>
          <div className="text-lg font-bold text-[#1F2937] flex items-center space-x-2">
            <span>US$ {product.price}</span>
            <span>-</span>
            <span>US$ {product.price + 4.0}</span>
          </div>
          <p className="text-sm text-gray-500">Prices may vary based on order quantity</p>
        </div>

        {/* Quantity Selector */}
        <div>
          <label className="block text-base font-medium text-[#1F2937]">Quantity</label>
          <div className="flex justify-between items-center mt-2 bg-white space-x-2 border border-[#E0E5EB] rounded-md py-2 px-4">
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

        {/* Rating */}
        <div className="flex items-center space-x-2 text-yellow-500">
          {[...Array(5)].map((_, index) => (
            <span key={index} className={`text-xl ${index < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-300'}`}>
              ★
            </span>
          ))}
          <span className="text-sm text-gray-700">{product.rating}</span>
        </div>

        {/* Product Description */}
        <div className="border-t pt-4 mt-4">
          <h2 className="text-lg font-semibold mb-2">Product Details</h2>
          <p className="text-gray-700">{product.description}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
