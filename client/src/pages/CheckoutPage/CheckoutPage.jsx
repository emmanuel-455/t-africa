import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { cartAtom } from '../../redux/Store';
import { FaEdit, FaTrash, FaPlusCircle } from 'react-icons/fa'; // Importing icons from react-icons
import { compress, decompress } from 'lz-string'; // Import lz-string for compression

const CheckoutPage = () => {
  const [cart, setCart] = useAtom(cartAtom);
  const deliveryFee = 5.99; // Fixed delivery fee

  // Form state for shipping information
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

  // State for managing saved addresses
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // Track which address is being edited
  const [showForm, setShowForm] = useState(false); // Track form visibility

  // Fetch the saved addresses from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('shippingAddresses');
    if (savedData) {
      const decompressedData = decompress(savedData); // Decompress the saved data
      const parsedData = JSON.parse(decompressedData);
      setSavedAddresses(parsedData); // Set the state to the saved addresses
    }
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle save shipping info (either adding new or updating existing)
  const handleSave = () => {
    let updatedAddresses;

    if (editIndex !== null) {
      // If we're editing an existing address
      updatedAddresses = savedAddresses.map((address, index) =>
        index === editIndex ? formData : address
      );
    } else {
      // Adding a new address
      updatedAddresses = [...savedAddresses, formData];
    }

    // Compress and save the updated addresses to localStorage
    const compressedData = compress(JSON.stringify(updatedAddresses));
    localStorage.setItem('shippingAddresses', compressedData);

    setSavedAddresses(updatedAddresses); // Update state with the new/updated address
    alert(editIndex !== null ? 'Shipping address updated successfully!' : 'Shipping address saved successfully!');
    setEditIndex(null); // Reset edit mode

    // Clear the form for a new entry
    setFormData({
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

    setShowForm(false); // Hide the form after saving
  };

  // Handle form submission (place order)
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the selected shipping address
    if (!savedAddresses.length) {
      alert('Please save at least one shipping address before placing the order.');
      return;
    }

    

    // Here you would typically send the order to the backend
    console.log('Order Submitted:', formData);
    console.log('Cart Items:', cart);
    alert('Your order has been placed successfully!');

    setCart([]); // Clear the cart
    window.location.href = '/order-confirmation'; // Redirect to the order confirmation page
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Handle delete address
  const handleDelete = (index) => {
    const updatedAddresses = savedAddresses.filter((_, idx) => idx !== index);

    // Compress and save the updated addresses to localStorage
    const compressedData = compress(JSON.stringify(updatedAddresses));
    localStorage.setItem('shippingAddresses', compressedData);

    setSavedAddresses(updatedAddresses); // Update state with the new addresses
    alert('Address deleted successfully!');
  };

  // Handle edit address
  const handleEdit = (index) => {
    setEditIndex(index); // Set the edit index
    setFormData(savedAddresses[index]); // Prefill the form with the selected address
    setShowForm(true); // Show the form when editing
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Saved Shipping Addresses</h2>
          {savedAddresses.length > 0 ? (
            <ul className="space-y-4">
              {savedAddresses.map((address, index) => (
                <li key={index} className="border border-gray-300 rounded-md p-4">
                  <p><strong>Name:</strong> {address.fullName}</p>
                  <p><strong>Email:</strong> {address.email}</p>
                  <p><strong>Phone:</strong> {address.phone}</p>
                  <p><strong>Address:</strong> {address.address}, {address.city}, {address.state}, {address.zip}, {address.country}</p>

                  <div className="flex space-x-4 mt-4">
                    <button
                      onClick={() => handleEdit(index)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                    >
                      <FaEdit className="inline-block w-4 h-4" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    >
                      <FaTrash className="inline-block w-4 h-4" /> Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No saved addresses yet.</p>
          )}
        </div>

        {/* Shipping Information */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>

          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="text-green-500 hover:text-green-700"
            >
              <FaPlusCircle className="w-6 h-6 inline-block" /> Add New Shipping Address
            </button>
          ) : (
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
                    placeholder="Anytown"
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
                    placeholder="CA"
                  />
                </div>
              </div>

              {/* Zip Code */}
              <div>
                <label htmlFor="zip" className="block text-sm font-medium text-gray-700">Zip Code</label>
                <input
                  type="text"
                  name="zip"
                  id="zip"
                  required
                  value={formData.zip}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-brandGreen focus:border-brandGreen"
                  placeholder="12345"
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

              {/* Payment Method */}
              <div>
                <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">Payment Method</label>
                <select
                  name="paymentMethod"
                  id="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-brandGreen focus:border-brandGreen"
                >
                  <option value="credit_card">Credit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="bank_transfer">Bank Transfer</option>
                </select>
              </div>

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  {editIndex !== null ? 'Update Address' : 'Save Address'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="col-span-1">
          <h2 className="text-xl font-semibold mb-4">Cart Summary</h2>
          <ul className="space-y-4 border border-gray-300 rounded-md p-4">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>{item.name} - ${item.price.toFixed(2)}</span>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <p><strong>Delivery Fee:</strong> ${deliveryFee.toFixed(2)}</p>
            <p><strong>Total:</strong> ${(cart.reduce((total, item) => total + item.price, 0) + deliveryFee).toFixed(2)}</p>
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
