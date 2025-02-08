import { useState, useEffect } from "react";
import { compress, decompress } from "lz-string";
import AddressBook from "./AddressBook";

const Address = () => {
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

  // Load addresses from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('shippingAddresses');
    if (savedData) {
      const decompressedData = decompress(savedData);
      const parsedData = JSON.parse(decompressedData);
      setSavedAddresses(parsedData);
    }
  }, []);

  // Save address to localStorage
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
    <div>
      <AddressBook
        savedAddresses={savedAddresses}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSelectAddress={handleSelectAddress}
        selectedAddressIndex={selectedAddressIndex}
      />
    </div>
  );
};

export default Address;
