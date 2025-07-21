import React, { useEffect, useState } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/orders', {
      headers: {
        // Add auth header if needed
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="p-4 border rounded mb-2 bg-white">
              <div className="flex justify-between">
                <span className="font-semibold">{order.customerName}</span>
                <span className="text-gray-500 text-sm">{new Date(order.createdAt).toLocaleString()}</span>
              </div>
              <div className="mt-2">
                <span className="text-gray-700">Items: </span>
                <span>{Array.isArray(order.items) ? order.items.join(', ') : order.items}</span>
              </div>
              <div className="mt-1">
                <span className="text-gray-700">Total: </span>
                <span className="font-bold text-pink-600">${order.total}</span>
              </div>
              <div className="mt-1 text-gray-500 text-sm">Status: {order.status}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
