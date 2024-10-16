// src/pages/OrderConfirmation.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const OrderConfirmation = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
      <p className="text-lg mb-8">Your order has been placed successfully. You will receive an email confirmation shortly.</p>
      <Link to="/" className="bg-brandGreen hover:bg-green-700 text-white py-2 px-4 rounded-md font-semibold">
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderConfirmation;
