import React from 'react';
import { CheckCircle, Mail, ArrowLeft } from 'lucide-react';

const OrderSuccessPage = () => {
  const orderDetails = {
    orderId: "ORD-2024-001",
    service: "Brand Identity Package",
    price: "$299",
    date: "July 15, 2024",
    email: "customer@example.com"
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Success Icon and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">Thank you for your order. We'll get started right away.</p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-6">
          <div className="bg-pink-500 p-6">
            <h2 className="text-lg font-bold text-white">Order Details</h2>
            <p className="text-pink-100 text-sm">#{orderDetails.orderId}</p>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Service</span>
              <span className="font-semibold text-gray-800">{orderDetails.service}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Amount</span>
              <span className="font-bold text-pink-500">{orderDetails.price}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date</span>
              <span className="font-semibold text-gray-800">{orderDetails.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email</span>
              <span className="font-semibold text-gray-800">{orderDetails.email}</span>
            </div>
          </div>
        </div>

        {/* Check Email Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="font-semibold text-blue-800">Check Your Email</h3>
              <p className="text-sm text-blue-600">Confirmation details sent to {orderDetails.email}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button className="w-full bg-pink-500 text-white py-3 rounded-xl font-semibold hover:bg-pink-600 transition-colors duration-300">
            Contact Support
          </button>
          <a 
            href="/" 
            className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-pink-500 transition-colors duration-300 py-3"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Homepage
          </a>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;