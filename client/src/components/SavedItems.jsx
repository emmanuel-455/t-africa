import { useState, useEffect } from "react";

// Mock API to simulate fetching saved items data
const fetchSavedItems = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "saved1",
          name: "Product 1",
          price: 500.00,
        },
        {
          id: "saved2",
          name: "Product 2",
          price: 1000.00,
        },
        {
          id: "saved3",
          name: "Product 3",
          price: 1500.00,
        },
      ]);
    }, 1000); // Simulating a 1-second delay for the mock API
  });
};

const SavedItems = () => {
  const [savedItems, setSavedItems] = useState([]);

  useEffect(() => {
    const loadSavedItems = async () => {
      const fetchedItems = await fetchSavedItems();
      setSavedItems(fetchedItems);
    };

    loadSavedItems();
  }, []);

  const removeItem = (itemId) => {
    setSavedItems(savedItems.filter(item => item.id !== itemId));
  };

  return (
    <div className="mt-10 md:p-8 border rounded-xl bg-gray-100 shadow-xl">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Saved Items</h3>
      {savedItems.length === 0 ? (
        <p className="text-lg text-gray-600">You have no saved items.</p>
      ) : (
        <div className="space-y-6">
          {savedItems.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium text-gray-700">{item.name}</span>
                <span className="text-sm text-gray-500">₦{item.price.toFixed(2)}</span>
              </div>
              <div className="text-sm text-gray-600 mb-4">
                <p>Saved for later.</p>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
                  // You can add more functionality here for the view item button
                >
                  View Item
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedItems;
