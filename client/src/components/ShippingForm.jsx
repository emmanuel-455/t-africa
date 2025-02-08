import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { compress, decompress } from 'lz-string';
import AddressBook from './AddressBook';

const ShippingForm = ({ onSelectAddress }) => {
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
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);

  // Fetch saved addresses from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('shippingAddresses');
    if (savedData) {
      const decompressedData = decompress(savedData);
      const parsedData = JSON.parse(decompressedData);
      setSavedAddresses(parsedData);
      
      // Automatically set the first address as selected if available
      if (parsedData.length > 0) {
        setSelectedAddressIndex(0);
        onSelectAddress(parsedData[0]);
      }
    }
  }, [onSelectAddress]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission (add/edit address)
  const handleSave = () => {
    if (savedAddresses.length >= 1) {
      alert('You can only have one shipping address at a time.');
      return;
    }

    let updatedAddresses = [formData]; // Only one address allowed

    const compressedData = compress(JSON.stringify(updatedAddresses));
    localStorage.setItem('shippingAddresses', compressedData);

    setSavedAddresses(updatedAddresses);
    setEditIndex(null);
    alert('Shipping address saved successfully!');

    // Auto-select the newly added address
    setSelectedAddressIndex(0);
    onSelectAddress(updatedAddresses[0]);

    // Reset form
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
  };

  // Handle delete address
  const handleDelete = () => {
    localStorage.removeItem('shippingAddresses');
    setSavedAddresses([]);
    setSelectedAddressIndex(null);
    alert('Address deleted successfully!');
  };

  return (
    <div className="p-2">
      <h3 className="text-xl font-bold">Shipping Address</h3>
      <div>
        {/* Form for adding/editing address */}
        {savedAddresses.length === 0 && (
          <form className="mt-4">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Full Name"
              className="border p-2 mb-2 w-full"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone"
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Address"
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="City"
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              placeholder="State"
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleInputChange}
              placeholder="ZIP Code"
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              placeholder="Country"
              className="border p-2 mb-2 w-full"
            />
            <div className="mt-4">
              <button
                type="button"
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save Address
              </button>
            </div>
          </form>
        )}

        {/* Address book for saved addresses */}
        {savedAddresses.length > 0 && (
          <div className="mt-4 border p-4 rounded">
            <h4 className="font-bold">Your Shipping Address</h4>
            <p><strong>Name:</strong> {savedAddresses[0].fullName}</p>
            <p><strong>Email:</strong> {savedAddresses[0].email}</p>
            <p><strong>Phone:</strong> {savedAddresses[0].phone}</p>
            <p><strong>Address:</strong> {savedAddresses[0].address}</p>
            <p><strong>City:</strong> {savedAddresses[0].city}</p>
            <p><strong>State:</strong> {savedAddresses[0].state}</p>
            <p><strong>ZIP:</strong> {savedAddresses[0].zip}</p>
            <p><strong>Country:</strong> {savedAddresses[0].country}</p>

            <div className="mt-2 flex space-x-4">
              <button
                type="button"
                onClick={() => setEditIndex(0)}
                className="bg-yellow-500 text-white px-4 py-2 rounded flex items-center"
              >
                <FaEdit className="mr-1" /> Edit
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded flex items-center"
              >
                <FaTrash className="mr-1" /> Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Add PropTypes validation for ShippingForm component
ShippingForm.propTypes = {
  onSelectAddress: PropTypes.func.isRequired, // Validate that onSelectAddress is a function
};

export default ShippingForm;
