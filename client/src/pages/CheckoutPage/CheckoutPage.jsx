import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { cartAtom } from "../../redux/Store";
import ShippingForm from "../../components/ShippingForm";
import Trash from "../../assets/trash.svg";
import { FaPlusCircle } from "react-icons/fa";
import AddressBook from "../../components/AddressBook";
import { compress, decompress } from "lz-string";

const CheckoutPage = () => {
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);

  const [cart, setCart] = useAtom(cartAtom);
  const [showShippingForm, setShowShippingForm] = useState(false);
  const [shippingAddress, setShippingAddress] = useState(null);
  const deliveryFee = 5.99;

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      if (parsedCart.length > 0) {
        setCart(parsedCart);
      }
    }
  }, [setCart]);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    if (updatedCart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      localStorage.removeItem("cart");
    }
  };

  

  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0 || !shippingAddress) return;

    const newOrder = {
      id: `ORD${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      status: "Pending",
      total: cart.reduce((total, item) => total + item.price * item.quantity, 0) + deliveryFee,
      items: cart,
      shippingAddress,
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem("orders", JSON.stringify([newOrder, ...existingOrders]));

    setCart([]);
    localStorage.removeItem("cart");
    window.location.href = "/order-confirmation";
  };

  const updateShippingAddress = (address) => {
    setShippingAddress(address);
    setShowShippingForm(false);
  };

  const removeShippingAddress = () => {
    setShippingAddress(null);
  };

  useEffect(() => {
      const savedData = localStorage.getItem("shippingAddresses");
      if (savedData) {
        const decompressedData = decompress(savedData);
        const parsedData = JSON.parse(decompressedData);
        setSavedAddresses(parsedData);
      }
    }, []);
  
    const handleSelectAddress = (index) => {
      setSelectedAddressIndex(index);
    };
  
    const handleDelete = (index) => {
      const updatedAddresses = savedAddresses.filter((_, idx) => idx !== index);
      const compressedData = compress(JSON.stringify(updatedAddresses));
      localStorage.setItem("shippingAddresses", compressedData);
      setSavedAddresses(updatedAddresses);
    };

  return (
    <div className="container mx-auto flex flex-col p-4 md:p-8">
      <h1 className="text-2xl font-bold">Checkout</h1>

      {!shippingAddress && (
        <button
          onClick={() => setShowShippingForm(true)}
          className="mt-4 text-brandGreen px-4 py-2 rounded-md"
        >
          <FaPlusCircle className="w-6 h-6 inline-block mr-2" /> Add New Shipping Address
        </button>
      )}

      {showShippingForm && <ShippingForm onUpdateAddress={updateShippingAddress} />}

      {/* {shippingAddress && (
        <div className="mt-4 p-4 border rounded">
          <h2 className="text-lg font-semibold">Shipping Address</h2>
          <p>{shippingAddress.fullName}</p>
          <p>{shippingAddress.address}, {shippingAddress.city}, {shippingAddress.state}</p>
          <p>{shippingAddress.country} - {shippingAddress.zip}</p>
          <button
            onClick={removeShippingAddress}
            className="mt-2 text-red-500 underline"
          >
            Remove Address
          </button>
        </div>
      )} */}

      <AddressBook
                      savedAddresses={savedAddresses}
                      onSelectAddress={handleSelectAddress}
                      onDelete={handleDelete}
                      selectedAddressIndex={selectedAddressIndex}
                    />

      <div className="col-span-1 mt-8">
        <h2 className="text-[18px] font-semibold mb-4">Cart Summary</h2>
        {cart.length > 0 ? (
          <ul className="space-y-8 border border-gray-300 rounded-md p-4">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
                  <div className="flex flex-col gap-1">
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
          <div className="mt-4">
            <div className="space-y-1">
              <p><strong>Delivery Fee:</strong> ${deliveryFee.toFixed(2)}</p>
              <p>
                <strong>Total:</strong> $
                {(
                  cart.reduce((total, item) => total + item.price * item.quantity, 0) +
                  deliveryFee
                ).toFixed(2)}
              </p>
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="mt-3 bg-brandGreen text-white px-4 py-2 rounded-md hover:bg-green-600"
              disabled={!shippingAddress} // Disable button if no address
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

