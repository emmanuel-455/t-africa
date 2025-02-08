import { useState, useEffect } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [pendingReviews, setPendingReviews] = useState([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem("orders");
    if (savedOrders) {
      const parsedOrders = JSON.parse(savedOrders);
      setOrders(parsedOrders);
      
      const reviews = localStorage.getItem("reviews") ? JSON.parse(localStorage.getItem("reviews")) : {};
      const itemsToReview = parsedOrders.flatMap(order => 
        order.status === "Delivered"
          ? order.items.filter(item => !reviews[item.id])
          : []
      );
      setPendingReviews(itemsToReview);
    }
  }, []);

  const toggleOrderDetails = (id) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };

  const submitReview = (itemId) => {
    const reviews = localStorage.getItem("reviews") ? JSON.parse(localStorage.getItem("reviews")) : {};
    reviews[itemId] = true;
    localStorage.setItem("reviews", JSON.stringify(reviews));
    setPendingReviews(pendingReviews.filter(item => item.id !== itemId));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
      {orders.length === 0 ? (
        <p className="text-gray-600">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border p-4 rounded-lg bg-white shadow-md">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">Order ID: {order.id}</p>
                  <p className="text-gray-500">Date: {order.date}</p>
                  <p className={`text-sm font-semibold ${order.status === "Delivered" ? "text-green-500" : "text-yellow-500"}`}>
                    Status: {order.status}
                  </p>
                </div>
                <div>
                  <p className="font-bold">Total: ₦{order.total.toFixed(2)}</p>
                  <button
                    onClick={() => toggleOrderDetails(order.id)}
                    className="text-blue-500 underline text-sm"
                  >
                    {expandedOrder === order.id ? "Hide Details" : "View Details"}
                  </button>
                </div>
              </div>
              {expandedOrder === order.id && (
                <div className="mt-4 border-t pt-3">
                  <h3 className="text-md font-semibold mb-2">Order Items</h3>
                  <ul className="space-y-2">
                    {order.items.map((item, index) => (
                      <li key={index} className="flex justify-between text-sm">
                        <span>{item.name}</span>
                        <span>{item.quantity} × ₦{item.price.toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {pendingReviews.length > 0 && (
        <div className="mt-6 p-4 border rounded-lg bg-white shadow-md">
          <h3 className="text-lg font-semibold mb-2">Pending Reviews</h3>
          <ul className="space-y-2">
            {pendingReviews.map((item) => (
              <li key={item.id} className="flex justify-between text-sm items-center">
                <span>{item.name}</span>
                <button
                  onClick={() => submitReview(item.id)}
                  className="text-blue-500 underline text-sm"
                >
                  Submit Review
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Orders;
