import { useState, useEffect } from "react";

// Mock API to simulate fetching orders and reviews
const fetchOrders = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "order1",
          date: "2025-02-06",
          status: "Delivered",
          total: 1000.00,
          items: [
            {
              id: "item1",
              name: "Product 1",
              quantity: 1,
              price: 500.00
            },
            {
              id: "item2",
              name: "Product 2",
              quantity: 2,
              price: 250.00
            },
            {
              id: "item4",
              name: "Product 4",
              quantity: 3,
              price: 300.00
            }
          ]
        },
        {
          id: "order2",
          date: "2025-02-07",
          status: "Delivered",
          total: 1500.00,
          items: [
            {
              id: "item3",
              name: "Product 3",
              quantity: 1,
              price: 1500.00
            },
            {
              id: "item5",
              name: "Product 5",
              quantity: 1,
              price: 400.00
            }
          ]
        }
      ]);
    }, 1000); // Simulating a 1-second delay for the mock API
  });
};

const fetchReviews = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        item1: true, // Item 1 has been reviewed
        item2: false, // Item 2 hasn't been reviewed
        item3: true,  // Item 3 has been reviewed
        item4: false, // Item 4 hasn't been reviewed
        item5: false  // Item 5 hasn't been reviewed
      });
    }, 1000); // Simulating a 1-second delay for fetching reviews
  });
};

const PendingReview = () => {
  const [orders, setOrders] = useState([]);
  const [pendingReviews, setPendingReviews] = useState([]);
  const [reviews, setReviews] = useState({});

  useEffect(() => {
    const loadOrdersAndReviews = async () => {
      const fetchedOrders = await fetchOrders();
      const fetchedReviews = await fetchReviews();

      setOrders(fetchedOrders);
      setReviews(fetchedReviews);

      const itemsToReview = fetchedOrders.flatMap(order =>
        order.status === "Delivered"
          ? order.items.filter(item => !fetchedReviews[item.id]) // Check for items that have not been reviewed
          : []
      );
      setPendingReviews(itemsToReview);
    };

    loadOrdersAndReviews();
  }, []);

  const submitReview = (itemId) => {
    setReviews(prevReviews => {
      const updatedReviews = { ...prevReviews, [itemId]: true };
      setPendingReviews(pendingReviews.filter(item => item.id !== itemId)); // Remove the reviewed item from the list
      return updatedReviews;
    });
  };

  return (
    <div className="mt-10 p-8 border rounded-xl bg-gray-100 shadow-xl">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Pending Reviews</h3>
      {pendingReviews.length === 0 ? (
        <p className="text-lg text-gray-600">No items pending review.</p>
      ) : (
        <div className="space-y-6">
          {pendingReviews.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium text-gray-700">{item.name}</span>
                <span className="text-sm text-gray-500">Quantity: {item.quantity}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-sm font-semibold text-gray-800">₦{(item.price * item.quantity).toFixed(2)}</span>
                <button
                  onClick={() => submitReview(item.id)}
                  className="text-blue-600 font-semibold underline text-sm"
                >
                  Submit Review
                </button>
              </div>
              <div className="border-t mt-4 pt-4 text-sm text-gray-600">
                <p>Review this item to help others know more about it!</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingReview;
