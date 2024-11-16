import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProfilePicture from '../../assets/PP.png'; // Placeholder profile image
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);

  // Fetch user data from a mock API (or your actual API)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Replace with your API endpoint
        const response = await axios.get('/api/user/profile');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <div>Loading...</div>; // Show loading state if user data isn't available yet
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-10">
        
        {/* User Information */}
        <div className="flex items-center mb-6">
          <img src={ProfilePicture} alt="User Profile" className="w-24 h-24 rounded-full mr-6" />
          <div>
            <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        {/* Account Settings */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link to="/profile/edit" className="bg-blue-500 text-white py-2 px-4 rounded-md">Edit Profile</Link>
            <Link to="/profile/change-password" className="bg-red-500 text-white py-2 px-4 rounded-md">Change Password</Link>
          </div>
        </div>

        {/* Address Book */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Address Book</h2>
          <div className="bg-gray-100 p-4 rounded-md">
            {user.addresses && user.addresses.length > 0 ? (
              <ul>
                {user.addresses.map((address, index) => (
                  <li key={index} className="border-b py-2">
                    {address.street}, {address.city}, {address.state} - {address.zip}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No addresses added. <Link to="/profile/add-address" className="text-blue-500">Add an address</Link></p>
            )}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Payment Methods</h2>
          <div className="bg-gray-100 p-4 rounded-md">
            {user.paymentMethods && user.paymentMethods.length > 0 ? (
              <ul>
                {user.paymentMethods.map((method, index) => (
                  <li key={index} className="border-b py-2">
                    {method.cardType} ending in {method.last4}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No payment methods added.</p>
            )}
          </div>
        </div>

        {/* Order History */}
<div className="mt-6">
  <h2 className="text-xl font-semibold mb-4">Order History</h2>
  <div className="bg-gray-100 p-4 rounded-md">
    {user.orders && user.orders.length > 0 ? (
      <ul>
        {user.orders.map(order => (
          <li key={order.id} className="border-b py-4">
            <div className="mb-2 font-bold">Order #{order.id} - {order.date}</div>
            <div>Status: <span className="font-semibold">{order.status}</span></div>
            <div>Total: NGN {order.total.toLocaleString()}</div>

            {/* Product List */}
            <ul className="mt-2">
              {order.items.map(item => (
                <li key={item.id} className="text-gray-700 text-sm mt-1">
                  {item.productName} - {item.quantity} x NGN {item.price.toLocaleString()}
                </li>
              ))}
            </ul>

            {/* Optional: Tracking Link */}
            {order.trackingLink && (
              <a href={order.trackingLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 mt-2 block">
                Track Order
              </a>
            )}
          </li>
        ))}
      </ul>
    ) : (
      <p>No orders found.</p>
    )}
  </div>
</div>


        {/* Wishlist */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Wishlist</h2>
          <div className="bg-gray-100 p-4 rounded-md">
            {user.wishlist && user.wishlist.length > 0 ? (
              <ul>
                {user.wishlist.map(item => (
                  <li key={item.id} className="border-b py-2">
                    {item.productName}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No items in wishlist.</p>
            )}
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-6">
          <button className="bg-red-500 text-white py-2 px-4 rounded-md">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
