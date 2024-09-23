import Trash from '../assets/trash.svg';
import Check from "../assets/check.svg";
import { cartAtom } from '../Redux/Store';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

// Utility function to store cart items in localStorage
const storeCartItems = (cartItems) => {
  localStorage.setItem('cart', JSON.stringify(cartItems));
};

// Utility function to retrieve cart items from localStorage
const getStoredCartItems = () => {
  const storedItems = localStorage.getItem('cart');
  return storedItems ? JSON.parse(storedItems) : [];
};

const Cart = ({ isCartOpen, closeCart }) => {
  const [cartItems, setCartItems] = useAtom(cartAtom);

  useEffect(() => {
    const storedItems = getStoredCartItems();
    if (storedItems.length > 0) {
      updateCartItemsWithImages(storedItems);
    }
  }, [setCartItems]);

  const updateCartItemsWithImages = (items) => {
    const updatedItems = items.map((item) => ({
      ...item,
      image: item.image || 'https://via.placeholder.com/50',
    }));
    setCartItems(updatedItems);
  };

  useEffect(() => {
    storeCartItems(cartItems);
  }, [cartItems]);

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div>
      <div className="absolute top-full right-0 mt-2 bg-white shadow-md rounded-lg p-4 w-[345px]">
        <h2 className="mb-2 sticky">
          <span className="font-bold mr-1 text-xl">Cart</span> <span className="text-base ">{cartItems.length} Item{cartItems.length > 1 && 's'}</span>

          {cartItems.length > 0 ? (
            <div className="text-base mt-[24px] sticky rounded-[10px] w-full py-2 bg-[#E6F9F0] text-[#06C569] flex items-center justify-center font-medium">
              <img className="mr-2" src={Check} alt="" /> Added to cart
            </div>
          ) : null}
        </h2>

        {/* Cart Items Container with Scroll */}
        <div className="max-h-[250px] overflow-y-auto">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-4">
                <div className="w-[97px] h-[133px] bg-gray-200 rounded-[5px] overflow-hidden">
                  <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                </div>
                <div className="flex flex-col gap-[10px]">
                  <div>
                    <p className="font-bold text-sm">₦{item.price}</p>
                    <p className="text-gray-500 text-sm">{item.name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm">Quantity: {item.quantity}</p>
                  </div>

                  <button className="text-red-500" onClick={() => handleRemoveItem(item.id)}>
                    <img src={Trash} alt="Remove" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total and Checkout Section */}
        <div className="pt-2 mt-2 sticky bottom-0 bg-white">
          <div className="flex justify-between">
            <p className="font-bold">Total</p>
            <p className="text-base">NGN {totalPrice.toLocaleString()}</p>
          </div>

          <div className="flex gap-4 mt-4">
            <Link onClick={closeCart} to="/purchaseList" className="w-full font-base flex font-bold justify-center items-center py-2 bg-[#E0E5EB] text-[#1F2937] rounded-[10px]">View Cart</Link>
            <button className="w-full text-base font-bold py-2 bg-[#06C569] text-white rounded-[10px]">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
