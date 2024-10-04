import React from 'react';
import { useAtom } from 'jotai';
import { cartAtom } from '../../Redux/Store';  // Import the cart atom
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
    <div className="p-4 pr-[196px] pl-[174px] flex gap-[50px]"> {/* Flex container for the cart and checkout sections */}
      
      {/* Cart section on the left */}
      <div className="w-3/4">  {/* Adjust the width as needed */}
        <h2 className="text-xl font-bold mb-4">Cart</h2>
        {cart.length > 0 ? (
          <div className="flex flex-col gap-[15px]">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center pb-4">
                
                <div className='bg-white w-[75px] h-[103px] flex items-center justify-center rounded-[5px]'>
                  {/* Item image */}
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
                </div>
                
                {/* Item details */}
                <div className="flex-1 ml-4">
                  <p className='font-bold tetx-base'>${item.price}</p>
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
      </div>

      {/* Checkout section on the right */}
      <div className="w-[339px] static p-4 rounded-md h-fit">  {/* Adjust the width as needed */}
        <h3 className="text-lg font-bold mb-4">Summary</h3>
        <div className='flex flex-col gap-[16px]'>
          <div className="flex justify-between">
            <p>Total:</p>
            <p>${totalPrice.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p>Delivery:</p>
            <p>${deliveryFee.toFixed(2)}</p>
          </div>
          <div className="flex border-t justify-between font-bold">
            <p></p>
            <p>${(totalPrice + deliveryFee).toFixed(2)}</p>
          </div>
        </div>

        {/* Checkout Button */}
        <button
          className="mt-1 text-base w-full bg-[#06C569] text-white py-2 rounded-md font-bold"
          onClick={() => alert('Proceeding to Checkout')}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default ViewCart;
