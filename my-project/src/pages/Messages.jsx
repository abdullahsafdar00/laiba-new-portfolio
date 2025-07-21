import React, { useEffect, useState } from "react";

const Messages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("/api/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error("Failed to fetch messages:", err));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Messages</h2>
      {messages.length === 0 ? (
        <p className="text-gray-500">No messages found.</p>
      ) : (
        messages.map((msg) => (
          <div key={msg._id} className="p-4 border rounded mb-4">
            <h3 className="font-bold">{msg.name} ({msg.email})</h3>
            <p className="text-gray-500 text-sm">{new Date(msg.createdAt).toLocaleString()}</p>
            <p className="mt-2">{msg.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Messages;
