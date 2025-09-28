import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ClipboardList, ImageIcon, Send } from 'lucide-react';

const Step = ({ Icon, title, children }) => (
  <div className="flex flex-col items-center text-center gap-4 p-6 bg-white rounded-xl shadow-md">
    <div className="p-4 bg-pink-50 rounded-full text-pink-600">
      <Icon className="w-8 h-8" />
    </div>
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-sm text-gray-500">{children}</p>
  </div>
);

const Services = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const openLetsTalk = () => {
    // If already on home path, scroll to #let-start, otherwise navigate to home and then scroll
    if (location.pathname === '/') {
      const el = document.getElementById('let-start');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // navigate to home with hash; App main will include the #let-start section
      navigate('/#let-start');
      // Small delay to allow navigation and render
      setTimeout(() => {
        const el = document.getElementById('let-start');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    }
  };

  return (
    <section className="min-h-screen bg-white pt-20 pb-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-semibold text-black">Process — <span className='text-pink-600'>How I Work</span></h1>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">A clear, three-step workflow so you know what to expect from start to finish.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Step Icon={ClipboardList} title="Discovery">
            We start with a short discovery to understand your goals, audience, and constraints.
          </Step>

          <Step Icon={ImageIcon} title="Design">
            Concepts, iterations and visual assets created with attention to branding and conversion.
          </Step>

          <Step Icon={Send} title="Delivery">
            Final assets delivered, support for launch, and optional post-delivery tweaks.
          </Step>
        </div>

        <div className="bg-pink-50 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Ready to start your project?</h2>
            <p className="text-sm text-gray-600">Select a plan or book a consultation and I'll walk you through the next steps.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/book-consultation" className="bg-pink-600 text-white px-5 py-3 rounded-full font-medium hover:bg-pink-700 transition">Let’s Start Your Project</Link>
            <button onClick={openLetsTalk} className="px-5 py-3 rounded-full border border-pink-200 text-pink-600 hover:bg-pink-50 transition">See Plans</button>
          </div>
        </div>
        {/* Booking handled in the static LetsTalk component */}
      </div>
    </section>
  );
};

export default Services;
