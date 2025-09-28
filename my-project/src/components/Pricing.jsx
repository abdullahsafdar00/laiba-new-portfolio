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
    billing: '',
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
      <p className="text-center text-black mt-2 max-w-xl mx-auto">
        Choose a plan that fits your project — pay only for what you need.
      </p>



      <div className="mt-8 flex flex-col md:flex-row gap-8 justify-center items-center">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`relative max-w-80 w-full ${plan.popular ? 'scale-105 z-10' : 'scale-100'}`}
          >
            {plan.popular && (
              <div className="absolute inset-x-0 top-1 flex justify-center">
                <span className="rounded-full bg-gradient-to-r from-orange-400 to-pink-500 px-3 py-1 text-xs font-semibold text-white">
                  Most Popular
                </span>
              </div>
            )}
            <div className="mt-4 rounded-lg border-2 border-gray-800 bg-white shadow-lg">
              <div className="border-b p-6">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className="text-gray-500">{plan.note}</p>
              </div>
              <div className="p-6">
                <div className="mb-4 flex items-baseline">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.billing && (
                    <span className="ml-1 text-sm text-gray-500">{plan.billing}</span>
                  )}
                </div>
                <ul className="space-y-1 text-gray-500">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <svg
                        className="h-4 w-4 text-pink-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t p-6">
                <button
                  className="w-full rounded-lg border-2 border-pink-600 px-4 py-2 text-white hover:opacity-90 transition-all hover:text-pink-600 hover:bg-transparent duration-300 bg-pink-600 font-semibold"
                  onClick={() => handleChoosePlan(plan)}
                >
                 Request Quote
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
