// src/pages/CheckoutPage.jsx

import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { cartAtom } from '../../redux/Store';
import trashIcon from '../../assets/trash.svg'; // Importing trash icon as an image

const CheckoutPage = () => {
  const [cart, setCart] = useAtom(cartAtom);
  const deliveryFee = 5.99; // Fixed delivery fee

  // Calculate total price of the cart items
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const totalPrice = calculateTotalPrice();

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    paymentMethod: 'credit_card',
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic form validation
    const { fullName, email, phone, address, city, state, zip, country, paymentMethod } = formData;
    if (!fullName || !email || !phone || !address || !city || !state || !zip || !country || !paymentMethod) {
      alert('Please fill in all required fields.');
      return;
    }

    // Here you would typically send the order to the backend
    // For demonstration, we'll just log the data, clear the cart, and navigate to a confirmation page
    console.log('Order Submitted:', formData);
    console.log('Cart Items:', cart);
    alert('Your order has been placed successfully!');
    setCart([]); // Clear the cart

    // Navigate to the order confirmation page using window.location.href
    window.location.href = '/order-confirmation'; // This will redirect the user to the confirmation page
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Shipping Information */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                required
                value={formData.fullName}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-brandGreen focus:border-brandGreen"
                placeholder="John Doe"
              />
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-brandGreen focus:border-brandGreen"
                placeholder="john.doe@example.com"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-brandGreen focus:border-brandGreen"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                required
                value={formData.address}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-brandGreen focus:border-brandGreen"
                placeholder="123 Main St"
              />
            </div>

            {/* City and State */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* City */}
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-brandGreen focus:border-brandGreen"
                  placeholder="New York"
                />
              </div>

              {/* State */}
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                <input
                  type="text"
                  name="state"
                  id="state"
                  required
                  value={formData.state}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-brandGreen focus:border-brandGreen"
                  placeholder="NY"
                />
              </div>
            </div>

            {/* ZIP Code and Country */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* ZIP Code */}
              <div>
                <label htmlFor="zip" className="block text-sm font-medium text-gray-700">ZIP Code</label>
                <input
                  type="text"
                  name="zip"
                  id="zip"
                  required
                  value={formData.zip}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-brandGreen focus:border-brandGreen"
                  placeholder="10001"
                />
              </div>

              {/* Country */}
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                <input
                  type="text"
                  name="country"
                  id="country"
                  required
                  value={formData.country}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-brandGreen focus:border-brandGreen"
                  placeholder="USA"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary and Payment */}
        <div>
          {/* Order Summary */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            {cart.length > 0 ? (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                      <div>
                        <h3 className="text-sm font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="mt-1 text-red-500 hover:text-red-700"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <img src={trashIcon} alt="Remove" className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}

                {/* Subtotal */}
                <div className="flex justify-between">
                  <p className="font-medium">Subtotal:</p>
                  <p className="font-medium">${totalPrice.toFixed(2)}</p>
                </div>

                {/* Delivery Fee */}
                <div className="flex justify-between">
                  <p className="font-medium">Delivery Fee:</p>
                  <p className="font-medium">${deliveryFee.toFixed(2)}</p>
                </div>

                {/* Total */}
                <div className="flex justify-between text-lg font-semibold">
                  <p>Total:</p>
                  <p>${(totalPrice + deliveryFee).toFixed(2)}</p>
                </div>
              </div>
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>

          {/* Payment Method */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <select
              name="paymentMethod"
              id="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleInputChange}
              className="block w-full border border-gray-300 rounded-md p-2 focus:ring-brandGreen focus:border-brandGreen"
            >
              <option value="credit_card">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="bank_transfer">Bank Transfer</option>
            </select>
          </div>

          {/* Submit Order */}
          <div className="mt-8">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-brandGreen text-white font-semibold rounded-md hover:bg-green-700 transition"
            >
              Place Order
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
