import { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import ShippingForm from './ShippingForm'; // Assuming it's in the same directory

const AddNewAddressButton = () => {
  const [showShippingForm, setShowShippingForm] = useState(false);

  // Toggle the form visibility
  const toggleFormVisibility = () => {
    setShowShippingForm((prev) => !prev);
  };

  return (
    <div className="mt-4">
      <button
        onClick={toggleFormVisibility}
        className="text-green-500 hover:text-green-700 flex items-center"
      >
        <FaPlusCircle className="w-6 h-6 inline-block mr-2" /> Add New Shipping Address
      </button>

      {/* Conditionally render ShippingForm based on showShippingForm state */}
      {showShippingForm && <ShippingForm onSelectAddress={(address) => console.log(address)} />}
    </div>
  );
};

export default AddNewAddressButton;
