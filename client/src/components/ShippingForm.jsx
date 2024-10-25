import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlusCircle } from 'react-icons/fa';
import { compress, decompress } from 'lz-string';

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
  const [showForm, setShowForm] = useState(false);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);

  // Fetch saved addresses from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('shippingAddresses');
    if (savedData) {
      const decompressedData = decompress(savedData);
      const parsedData = JSON.parse(decompressedData);
      setSavedAddresses(parsedData);
    }
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission (add/edit address)
  const handleSave = () => {
    let updatedAddresses;

    if (editIndex !== null) {
      updatedAddresses = savedAddresses.map((address, index) =>
        index === editIndex ? formData : address
      );
    } else {
      updatedAddresses = [...savedAddresses, formData];
    }

    const compressedData = compress(JSON.stringify(updatedAddresses));
    localStorage.setItem('shippingAddresses', compressedData);

    setSavedAddresses(updatedAddresses);
    alert(editIndex !== null ? 'Shipping address updated successfully!' : 'Shipping address saved successfully!');
    setEditIndex(null);
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
    setShowForm(false);
  };

  // Handle delete address
  const handleDelete = (index) => {
    const updatedAddresses = savedAddresses.filter((_, idx) => idx !== index);
    const compressedData = compress(JSON.stringify(updatedAddresses));
    localStorage.setItem('shippingAddresses', compressedData);
    setSavedAddresses(updatedAddresses);
    alert('Address deleted successfully!');
  };

  // Handle edit address
  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData(savedAddresses[index]);
    setShowForm(true);
  };

  // Handle address selection
  const handleSelectAddress = (index) => {
    setSelectedAddressIndex(index);
    onSelectAddress(savedAddresses[index]); // Pass selected address to parent component
  };

  return (
    <div className="p-2">
      <div className="mt-8">
        <h2 className="text-[18px] font-semibold mb-4">Saved Shipping Addresses</h2>
        {savedAddresses.length > 0 ? (
          <ul className="space-y-2 flex flex-col">
            {savedAddresses.map((address, index) => (
              <div key={index} className="flex flex-row md:flex-row items-start md:items-center">
                <label className="mr-">
                  <input
                    type="radio"
                    name="shippingAddress"
                    value={index}
                    checked={selectedAddressIndex === index}
                    onChange={() => handleSelectAddress(index)}
                    className="mr-2"
                  />
                </label>
                <div className='flex flex-col'>
                <li className="border border-gray-300 rounded-md p-4 w-full md:w-auto flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <strong>Name:</strong> {address.fullName}
                      <p><strong>Phone:</strong> {address.phone}</p>
                      <p><strong>Address:</strong> {address.address}, {address.city}, {address.state}, {address.zip}, {address.country}</p>
                    </div>
                  </div>
                </li>
                <div className="flex justify-end space-x-2 mt-1 md:mt-0">
                      <button
                        onClick={() => handleEdit(index)}
                        className=" text-black px-3 py-1 rounded-md "
                      >
                        <FaEdit className="inline-block w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className=" text-black px-3 py-1 rounded-md "
                      >
                        <FaTrash className="inline-block w-4 h-4" />
                      </button>
                    </div>
                </div>
              </div>
            ))}
          </ul>
        ) : (
          <p className='mb-3'>No saved addresses yet.</p>
        )}
      </div>

      <div>
        <h2 className="text-[18px] font-semibold mb-4">Shipping Information</h2>

        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="text-green-500 hover:text-green-700 flex items-center"
          >
            <FaPlusCircle className="w-6 h-6 inline-block mr-2" /> Add New Shipping Address
          </button>
        ) : (
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-brandGreen focus:border-brandGreen"
                  placeholder="example@example.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-brandGreen focus:border-brandGreen"
                  placeholder="(123) 456-7890"
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

            {/* Payment Method */}
            <div>
              <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">Payment Method</label>
              <select
                name="paymentMethod"
                id="paymentMethod"
                required
                value={formData.paymentMethod}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-brandGreen focus:border-brandGreen"
              >
                <option value="credit_card">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="bank_transfer">Bank Transfer</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="mt-4">
              <button
                type="button"
                onClick={handleSave}
                className="bg-brandGreen text-white px-4 py-2 rounded-md hover:bg-brandGreenDark"
              >
                {editIndex !== null ? 'Update Address' : 'Save Address'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ShippingForm;
