import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { SiVisa, SiMastercard } from "react-icons/si";
import { FaRegCreditCard, FaCreditCard } from "react-icons/fa";


const PaymentIcons = () => (
  <div className="flex items-center gap-3 mt-2 mb-4">
    <SiVisa size={28} color="#2563eb" title="Visa" />
    <SiMastercard size={28} color="#e76f51" title="Mastercard" />
    <FaRegCreditCard size={26} color="#2a9d8f" title="Debit Card" />
    <FaCreditCard size={26} color="#6c63ff" title="2Checkout / Card" />
  </div>
);

const WhatHappensNext = () => (
  <div className="bg-white border border-pink-100 rounded-xl p-4 mt-4 text-left">
    <h3 className="font-bold text-pink-600 mb-2 text-base">What happens after payment?</h3>
    <ul className="text-gray-700 text-sm space-y-1">
      <li>You’ll receive a confirmation email instantly.</li>
      <li>Our team will contact you within 24 hours to start your project.</li>
      <li>You’ll get a personal dashboard to track progress and communicate.</li>
      <li className="font-semibold">100% satisfaction or your money back!</li>
    </ul>
  </div>
);

const Progress = ({ step }) => (
  <div className="flex items-center justify-center gap-2 mb-6">
    <span className="text-pink-700 font-semibold mr-2">Step 2 of 2: Payment</span>
    <div className="flex gap-1">
      <div className={`w-6 h-1 rounded ${step >= 1 ? 'bg-pink-600' : 'bg-gray-200'}`}></div>
      <div className={`w-6 h-1 rounded ${step >= 2 ? 'bg-pink-600' : 'bg-gray-200'}`}></div>
      <div className={`w-6 h-1 rounded ${step >= 3 ? 'bg-pink-600' : 'bg-gray-200'}`}></div>
    </div>
  </div>
);

const PaymentForm = ({ plan, form, setForm, loading, setLoading, navigate }) => {
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handle2COPayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStep(2);
    try {
      // 1. Get signature from backend
      const amount = parseInt(plan.price.replace("$", ""));
      const res = await fetch("http://localhost:5000/api/tco-signature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, currency: "USD", billingEmail: form.email }),
      });
      const { signature, merchantCode } = await res.json();
      if (!signature || !merchantCode) throw new Error("Could not get payment signature");
      // 2. Load 2CO inline script if not already loaded
      if (!window.TCO) {
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://www.2checkout.com/checkout/api/2co.min.js";
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });
      }
      // 3. Setup 2CO inline payment
      window.TCO.loadPubKey('sandbox', () => {
        window.TCO.requestToken(async (tokenResponse) => {
          // 4. Place order in backend
          const orderRes = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.name,
          email: form.email,
          items: [plan.name],
          total: plan.price.replace("$", ""),
              paymentToken: tokenResponse.token,
        }),
      });
          if (orderRes.ok) {
            toast.success("Payment successful! Order placed. Check your email.");
        setForm({ name: "", email: "" });
            setStep(3);
            setTimeout(() => navigate("/order-success"), 2000);
      } else {
            toast.error("Order placement failed, but payment succeeded.");
            setStep(1);
          }
        }, (error) => {
          toast.error("Payment failed: " + error.errorMsg);
          setStep(1);
          setLoading(false);
        }, {
          sellerId: merchantCode,
          publishableKey: process.env.REACT_APP_TCO_PUBLISHABLE_KEY,
          ccNo: document.getElementById('ccNo')?.value,
          cvv: document.getElementById('cvv')?.value,
          expMonth: document.getElementById('expMonth')?.value,
          expYear: document.getElementById('expYear')?.value,
          currency: "USD",
          amount,
          billingAddr: {
            email: form.email,
            name: form.name,
          },
          signature,
        });
      });
    } catch (err) {
      toast.error("Payment error. Try again.");
      setStep(1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handle2COPayment} className="space-y-4">
      <Progress step={step} />
          <div>
        <label className="block font-medium mb-1 text-sm">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              placeholder="Your Name"
              required
          disabled={loading}
            />
          </div>
          <div>
        <label className="block font-medium mb-1 text-sm">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              placeholder="Your Email"
              required
          disabled={loading}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block font-medium mb-1 text-sm">Card Number</label>
          <input id="ccNo" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="Card Number" required disabled={loading} />
        </div>
        <div>
          <label className="block font-medium mb-1 text-sm">CVV</label>
          <input id="cvv" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="CVV" required disabled={loading} />
        </div>
        <div>
          <label className="block font-medium mb-1 text-sm">Exp Month</label>
          <input id="expMonth" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="MM" required disabled={loading} />
        </div>
        <div>
          <label className="block font-medium mb-1 text-sm">Exp Year</label>
          <input id="expYear" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="YYYY" required disabled={loading} />
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-pink-600 text-white font-semibold py-2 rounded-lg hover:bg-pink-700 transition text-base"
      >
        {loading ? "Processing..." : `Pay ${plan.price} & Get Started`}
      </button>
      <div className="text-xs text-gray-400 text-center mt-1">Payments are securely processed by 2Checkout. We never store your card details.</div>
      <div className="text-center mt-2">
        <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" className="text-pink-600 underline text-sm">Need help? Chat with us on WhatsApp</a>
      </div>
    </form>
  );
};

const PurchasePlan = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { plan, user } = location.state || {};
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "" });
  const [loading, setLoading] = useState(false);

  if (!plan) {
    return <div className="min-h-screen flex items-center justify-center text-xl">No plan selected.</div>;
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-2 py-8 md:px-4 md:py-20">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 bg-white rounded-2xl shadow-none p-0 overflow-hidden">
        {/* Left: Plan Details */}
        <div className="flex flex-col justify-between p-6 md:p-8 bg-white rounded-2xl shadow-2xl z-50">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-pink-600 mb-1">{plan.name}</h1>
            <span className="inline-block bg-pink-100 text-pink-600 px-3 py-1 rounded-full font-semibold text-base mb-1">
              {plan.price} {plan.billing}
            </span>
            {plan.suitability && <div className="text-gray-500 text-xs mb-2">Best for {plan.suitability}</div>}
            <h2 className="text-lg font-bold text-pink-700 mb-1 mt-2">Unlock Your Dream Design Today!</h2>
            <p className="text-gray-600 mb-1 text-sm">Curious what your space could become? Take the first step and see the transformation.</p>
            <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold mb-1">100% Satisfaction Guarantee</span>
            <PaymentIcons />
            <WhatHappensNext />
          </div>
          <button
            className="mt-6 text-pink-600 underline text-xs md:text-sm self-start"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
        </div>
        {/* Right: Payment Form */}
        <div className="flex flex-col justify-center p-6 md:p-8 bg-white rounded-2xl shadow-2xl z-40">
          <PaymentForm plan={plan} form={form} setForm={setForm} loading={loading} setLoading={setLoading} navigate={navigate} />
        </div>
      </div>
    </section>
  );
};

export default PurchasePlan;
