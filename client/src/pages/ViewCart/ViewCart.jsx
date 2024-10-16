import React from 'react';
import { useAtom } from 'jotai';
import { cartAtom } from '../../redux/Store';  // Adjust the path as needed
import { Link } from 'react-router-dom';
import Trash from '../../assets/trash.svg';

const ViewCart = () => {
  const [cart, setCart] = useAtom(cartAtom);

  const deliveryFee = 5.99; // Fixed delivery fee

  // Calculate total price of the cart items
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const totalPrice = calculateTotalPrice();

  // Increase the quantity of a specific item
  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease the quantity of a specific item
  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  // Remove an item from the cart
  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-8">
      
      {/* Cart section on the left */}
      <div className="w-full lg:w-3/4">
        <h2 className="text-xl font-bold mb-4">Cart</h2>
        {cart.length > 0 ? (
          <div className="flex flex-col gap-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center pb-4 border-b">
                
                <div className="bg-white w-[75px] h-[103px] flex items-center justify-center rounded-[5px]">
                  {/* Item image */}
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
                </div>
                
                {/* Item details */}
                <div className="flex-1 ml-4">
                  <p className="font-bold text-base">${item.price}</p>
                  <h3 className="text-base">{item.name}</h3>
                  <div className="flex items-center gap-4 mt-2">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="px-2 py-1 bg-white rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="px-2 py-1 bg-white rounded"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Remove item button */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="ml-4 text-red-500"
                >
                  <img src={Trash} alt="Remove item" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>Your cart is empty.</p>
        )}

        {/* Proceed to Checkout */}
        {cart.length > 0 && (
          <div className="mt-6 flex justify-end">
            <Link to="/checkout" className="bg-brandGreen hover:bg-green-700 text-white py-2 px-4 rounded-md font-semibold">
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>

      {/* Checkout summary on the right */}
      <div className="w-full lg:w-1/4 p-4 rounded-md bg-gray-100 h-fit">
        <h3 className="text-lg font-bold mb-4">Summary</h3>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <p>Total:</p>
            <p>${totalPrice.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p>Delivery:</p>
            <p>${deliveryFee.toFixed(2)}</p>
          </div>
          <div className="flex border-t mb-5 justify-between font-bold">
            <p>Total Amount:</p>
            <p>${(totalPrice + deliveryFee).toFixed(2)}</p>
          </div>
        </div>

        {/* Checkout Button */}
        <Link to="/checkout" className="px-3 text-base w-full bg-[#06C569] hover:bg-green-700 text-white py-2 rounded-md font-bold">
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default ViewCart;
