import React from 'react';



const plans = [
  {
    name: 'Starter',
    price: '$35',
    billing: '/product',
    note: 'One Product Listing Images',
    popular: false,
    features: [
      'One Product Images',
      '1 Revision',
      '3 days delivery'
    ],
  },
  {
    name: 'Business',
    price: '$100',
    billing: '/3product',
    note: 'Perfect for growing businesses',
    popular: true,
    features: [
      '3 products & listing images',
      '3 Revisions',
      '7 days delivery',
      'Custom branding'
    ],
  },
  {
    name: 'Industry',
    price: '$150',
    billing: '/5product',
    note: 'Perfect for Startups',
    popular: false,
    features: [
      '5 Products & listing images',
      '5 Revisions',
      '10 days delivery',
      'Custom branding',
      'Priority support',
    ],
  },
];


import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const navigate = useNavigate();
  const handleChoosePlan = (plan) => {
    navigate('/purchase-plan', { state: { plan } });
  };

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto items-center" id="pricing">
      <h1 className="text-center text-5xl font-semibold text-pink-600">Flexible Plans for Your Design Needs</h1>
      <p className="text-center text-black mt-4 max-w-xl mx-auto">
        Choose a plan that fits your project — pay only for what you need.
      </p>



      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan, idx) => (
          <div key={idx} className={`relative w-full ${plan.popular ? 'lg:scale-105 z-10' : ''}`}>
            {plan.popular && (
              <div className="absolute inset-x-0 -top-3 flex justify-center">
                <span className="rounded-full bg-gradient-to-r from-orange-400 to-pink-500 px-3 py-1 text-xs font-semibold text-white shadow">Most Popular</span>
              </div>
            )}

            <div className="mt-6 bg-white rounded-xl shadow-lg border border-gray-100 interactive hover:shadow-xl hover:-translate-y-1 transition-transform duration-200">
              <div className="p-6 border-b">
                <h3 className="text-2xl font-semibold">{plan.name}</h3>
                <p className="text-gray-500">{plan.note}</p>
              </div>
              <div className="p-6">
                <div className="mb-4 flex items-baseline">
                  <span className="text-2xl font-bold text-pink-600">{plan.price}</span>
                  {plan.billing && (
                    <span className="ml-2 text-sm text-gray-500">{plan.billing}</span>
                  )}
                </div>
                <ul className="space-y-2 text-gray-600">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-pink-600 mt-1">•</span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 border-t">
                <button className="w-full rounded-full bg-pink-600 text-white py-3 font-semibold hover:bg-pink-700 transition" onClick={() => handleChoosePlan(plan)}>Request a Quote</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
