import React from 'react';
import { Link } from 'react-router-dom';

const CTA = () => (
  <section className="mt-10 py-12 px-6 bg-gradient-to-r from-pink-50 to-white rounded-xl text-center">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold mb-3">💡 Ready to bring your brand to life? Let’s create together.</h2>
      <p className="text-gray-600 mb-6">Choose a plan above or reach out for a custom quote tailored to your needs.</p>
      <a href="#contact" className="inline-block bg-pink-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-pink-700 transition">Contact Me</a>
    </div>
  </section>
);

export default CTA;
