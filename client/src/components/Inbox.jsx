import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Inbox = () => {
  const [messages, setMessages] = useState([]);

  // Load messages from localStorage or use mock data
  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem("messages")) || [
      { id: 1, sender: "John Doe", content: "We would like to place a bulk order for your product.", timestamp: "2 hours ago", read: false },
      { id: 2, sender: "Jane Smith", content: "Can you provide more details about shipping costs?", timestamp: "1 day ago", read: false },
      { id: 3, sender: "Mark Johnson", content: "Interested in collaborating on a new project.", timestamp: "3 days ago", read: true },
    ];
    setMessages(savedMessages);
  }, []);

  // Mark message as read
  const markAsRead = (id) => {
    const updatedMessages = messages.map((msg) =>
      msg.id === id ? { ...msg, read: true } : msg
    );
    setMessages(updatedMessages);
    localStorage.setItem("messages", JSON.stringify(updatedMessages));
  };

  // Delete message
  const deleteMessage = (id) => {
    const updatedMessages = messages.filter((msg) => msg.id !== id);
    setMessages(updatedMessages);
    localStorage.setItem("messages", JSON.stringify(updatedMessages));
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Inbox</h2>
      {messages.length === 0 ? (
        <p className="text-gray-500">No messages available.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`p-4 border rounded-lg shadow-md ${msg.read ? "bg-gray-100" : "bg-white"}`}>
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-bold">{msg.sender}</h4>
                <span className="text-sm text-gray-500">{msg.timestamp}</span>
              </div>
              <p className="text-gray-700 mt-1">{msg.content}</p>
              <div className="flex gap-4 mt-3">
                <Link
                  to={`/message/${msg.id}`}
                  className="text-blue-600 text-sm"
                  onClick={() => markAsRead(msg.id)}
                >
                  View Message
                </Link>
                <button
                  onClick={() => deleteMessage(msg.id)}
                  className="text-red-500 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Inbox;
