import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTrashAlt, FaEnvelope } from "react-icons/fa";

const Inbox = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem("messages")) || [
      { id: 1, sender: "John Doe", content: "We would like to place a bulk order for your product.", timestamp: "2 hours ago", read: false },
      { id: 2, sender: "Jane Smith", content: "Can you provide more details about shipping costs?", timestamp: "1 day ago", read: false },
      { id: 3, sender: "Mark Johnson", content: "Interested in collaborating on a new project.", timestamp: "3 days ago", read: true },
    ];
    setMessages(savedMessages);
  }, []);

  const markAsRead = (id) => {
    const updatedMessages = messages.map((msg) =>
      msg.id === id ? { ...msg, read: true } : msg
    );
    setMessages(updatedMessages);
    localStorage.setItem("messages", JSON.stringify(updatedMessages));
  };

  const deleteMessage = (id) => {
    const updatedMessages = messages.filter((msg) => msg.id !== id);
    setMessages(updatedMessages);
    localStorage.setItem("messages", JSON.stringify(updatedMessages));
  };

  return (
    <div className="w-full p-1">
      <h2 className="text-xl font-medium mb-4">Inbox</h2>
      {messages.length === 0 ? (
        <p className="text-gray-500">No messages available.</p>
      ) : (
        <div className="space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-5 border rounded-lg shadow-md ${msg.read ? "bg-gray-100" : "bg-white"} transition-all transform hover:scale-105 hover:shadow-xl`}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                  <h4 className="text-lg font-bold text-gray-800">{msg.sender}</h4>
                  <span className="text-sm text-gray-500 sm:ml-4">{msg.timestamp}</span>
                </div>
                <div className="mt-2 sm:mt-0 flex gap-6">
                  <Link
                    to={`/message/${msg.id}`}
                    className="text-blue-600 text-sm hover:text-blue-800 transition-colors"
                    onClick={() => markAsRead(msg.id)}
                  >
                    <FaEnvelope className="inline-block mr-1" />
                    View Message
                  </Link>
                  <button
                    onClick={() => deleteMessage(msg.id)}
                    className="text-red-500 text-sm hover:text-red-700 transition-colors"
                  >
                    <FaTrashAlt className="inline-block mr-1" />
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-gray-700 mt-2 sm:mt-3">{msg.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Inbox;
