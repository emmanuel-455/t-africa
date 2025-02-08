import { useState, useEffect } from 'react';
import { compress, decompress } from 'lz-string';
import AddressBook from './AddressBook';
import ShippingForm from './ShippingForm';
import AddNewAddressButton from './AddNewAddressButton';
//import AddNewShippingAddress from './AddNewShippingAddress';


const ShippingPage = () => {
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

  useEffect(() => {
    const savedData = localStorage.getItem('shippingAddresses');
    if (savedData) {
      const decompressedData = decompress(savedData);
      const parsedData = JSON.parse(decompressedData);
      setSavedAddresses(parsedData);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
    setShowForm(false);
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
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData(savedAddresses[index]);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    const updatedAddresses = savedAddresses.filter((_, idx) => idx !== index);
    const compressedData = compress(JSON.stringify(updatedAddresses));
    localStorage.setItem('shippingAddresses', compressedData);
    setSavedAddresses(updatedAddresses);
  };

  const handleSelectAddress = (index) => {
    setSelectedAddressIndex(index);
  };

  return (
    <div className="p-4">
      <AddressBook
        savedAddresses={savedAddresses}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSelectAddress={handleSelectAddress}
        selectedAddressIndex={selectedAddressIndex}
      />
      <AddNewAddressButton onClick={() => setShowForm(true)} />
      {showForm && (
        <ShippingForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleSave={handleSave}
          editIndex={editIndex}
        />
      )}
    </div>
  );
};

export default ShippingPage;
