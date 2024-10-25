import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { cartAtom } from '../../redux/Store';
import ShippingForm from '../../components/ShippingForm';
import Trash from '../../assets/trash.svg';

const CheckoutPage = () => {
  const [cart, setCart] = useAtom(cartAtom);
  const deliveryFee = 5.99; // Fixed delivery fee

  // Load cart from localStorage on mount if cart is empty
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      if (parsedCart.length > 0) {
        setCart(parsedCart); // Only update if localStorage has items
      }
    }
  }, [setCart]);

  // Sync cart with localStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart)); // Store the updated cart
    }
  }, [cart]);

  // Remove item from cart and update localStorage
  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    if (updatedCart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update localStorage if cart is not empty
    } else {
      localStorage.removeItem('cart'); // Clear localStorage if cart is empty
    }
  };

  // Increase quantity of item
  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  // Decrease quantity of item (minimum 1)
  const decreaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
  };

  // Handle form submission (place order)
  const handleSubmit = (e) => {
    e.preventDefault();

    // Add form validation and API logic here.
    console.log('Order Submitted:', cart);
    alert('Your order has been placed successfully!');

    setCart([]); // Clear the cart after order
    localStorage.removeItem('cart'); // Clear cart from localStorage
    window.location.href = '/order-confirmation'; // Redirect to order confirmation
  };

  return (
    <div className="container mx-auto flex flex-col p-4 md:p-8">
      <h1 className="text-2xl font-bold">Checkout</h1>

      {/* ShippingForm */}
      <ShippingForm />

      <div className="col-span-1 mt-8">
        <h2 className="text-[18px] font-semibold mb-4">Cart Summary</h2>
        {cart.length > 0 ? (
          <ul className="space-y-8 border border-gray-300 rounded-md p-4">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image} // Assuming your item has an `image` property
                    alt={item.name}
                    className="w-16 h-16 object-cover"
                  />
                  <div className='flex flex-col gap-1'>
                    <span className="block font-semibold">{item.name}</span>
                    <span className="block text-gray-500">${item.price.toFixed(2)}</span>
                    <div className="flex items-center space-x-4">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="px-4 py-1 bg-gray-300 rounded-md"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="px-4 py-1 bg-gray-300 rounded-md"
                  >
                    +
                  </button>
                </div>
                  </div>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <img src={Trash} alt="Remove item" />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty.</p>
        )}
        {cart.length > 0 && (
          <div className="mt-4 ">
            <div className='space-y-1'>
            <p><strong>Delivery Fee:</strong> ${deliveryFee.toFixed(2)}</p>
            <p>
              <strong>Total:</strong> $
              {(
                cart.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                ) + deliveryFee
              ).toFixed(2)}
            </p>
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="mt-3 bg-brandGreen text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Place Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
