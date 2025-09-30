import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Starter",
    price: "$35",
    billing: "/product",
    note: "One Product Listing Images",
    popular: false,
    features: ["One Product Images", "1 Revision", "3 days delivery"],
  },
  {
    name: "Business",
    price: "$100",
    billing: "/3product",
    note: "Perfect for growing businesses",
    popular: true,
    features: [
      "3 products & listing images",
      "3 Revisions",
      "7 days delivery",
      "Custom branding",
    ],
  },
  {
    name: "Industry",
    price: "$150",
    billing: "/5product",
    note: "Perfect for Startups",
    popular: false,
    features: [
      "5 Products & listing images",
      "5 Revisions",
      "10 days delivery",
      "Custom branding",
      "Priority support",
    ],
  },
];

const Pricing = () => {
  const navigate = useNavigate();
  const handleChoosePlan = (plan) => {
    navigate("/purchase-plan", { state: { plan } });
  };

  return (
    <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto"
      id="pricing"
    >
      <h1 className="text-center text-3xl sm:text-4xl md:text-5xl font-semibold text-pink-600">
        Flexible Plans for Your Design Needs
      </h1>
      <p className="text-center text-gray-700 mt-4 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
        Choose a plan that fits your project — pay only for what you need.
      </p>

      <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan, idx) => (
          <motion.div
            key={idx}
                initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
            className={`relative w-full ${
              plan.popular ? "lg:scale-105 z-10" : ""
            }`}
          >
            {plan.popular && (
              <div className="absolute inset-x-0 -top-3 flex justify-center">
                <span className="rounded-full bg-gradient-to-r from-orange-400 to-pink-500 px-3 py-1 text-xs sm:text-sm font-semibold text-white shadow">
                  Most Popular
                </span>
              </div>
            )}

            <div className="mt-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-transform duration-200">
              {/* header */}
              <div className="p-4 sm:p-6 border-b">
                <h3 className="text-xl sm:text-2xl font-semibold">
                  {plan.name}
                </h3>
                <p className="text-gray-500 text-sm sm:text-base">
                  {plan.note}
                </p>
              </div>

              {/* price + features */}
              <div className="p-4 sm:p-6">
                <div className="mb-4 flex items-baseline">
                  <span className="text-xl sm:text-2xl font-bold text-pink-600">
                    {plan.price}
                  </span>
                  {plan.billing && (
                    <span className="ml-2 text-xs sm:text-sm text-gray-500">
                      {plan.billing}
                    </span>
                  )}
                </div>
                <ul className="space-y-2 text-gray-600">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 sm:gap-3">
                      <span className="text-pink-600 mt-1">•</span>
                      <span className="text-xs sm:text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="p-4 sm:p-6 border-t">
                <button
                  onClick={() => handleChoosePlan(plan)}
                  aria-label={`Choose the ${plan.name} plan for ${plan.price}`}
                  className="w-full rounded-full bg-pink-600 text-white py-2.5 sm:py-3 text-sm sm:text-base font-semibold hover:bg-pink-700 transition"
                >
                  Request a Quote
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Pricing;
