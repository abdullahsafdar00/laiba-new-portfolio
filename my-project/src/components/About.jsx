import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

  const scrollToSection = (sectionId) => {
  
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    
  };

export default function About() {
  return (
   <motion.section
    initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
    className="relative px-6 sm:px-12 lg:px-24 py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white via-pink-50/40 to-white text-slate-800 overflow-hidden">

      {/* Section Heading */}
      <div className="flex justify-center">
        <span className="inline-flex items-center gap-2 mb-6 text-sm font-semibold uppercase tracking-wider text-pink-600">
          <Sparkles className="w-4 h-4" aria-hidden="true" />
          <span className="ml-2">Who I Am</span>
        </span>
      </div>

      {/* Hero: text + image */}
      <motion.div
        className="mb-16 relative z-10"
       
      >
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16">
          {/* Text */}
          <div className="w-full lg:w-2/3 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight text-left">
              <span className="bg-pink-600 bg-clip-text text-transparent">
                Designing Stop Scrolling Visuals
              </span>
              <span className="block">for Amazon Listings & Storefronts</span>
            </h2>

            <p className="mt-6 text-base sm:text-lg text-gray-600 leading-relaxed">
              Helping sellers increase conversions by creating visually compelling Amazon listings and storefronts that speak directly to buyers, build trust, spark curiosity, and turn clicks into purchases.
            </p>
          </div>

         {/* Image */}
<div className="w-full lg:w-1/3 flex justify-center lg:justify-end">
  <img
    src="/laiba.jpg"
    alt="Laiba - Graphic Designer"
    className="rounded-xl w-full max-w-[200px] sm:max-w-[280px] lg:max-w-md object-cover"
  />
</div>

        </div>
      </motion.div>

      {/* Sales Question */}
      <motion.div
        className="max-w-3xl mx-auto text-center space-y-6 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-pink-600">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            <span className="ml-2">What I Offer</span>
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900 leading-snug">
          Are your product sales lower than expected?
        </h3>

        <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
          Whether you’re an Amazon seller, an agency, or an eCommerce store owner,{" "}
          <span className="text-pink-700">
            your products deserve more than just “good pictures.”
          </span>{" "}
          They deserve strategic designs that connect with your audience, build credibility, and increase conversions.
        </p>

        <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
          The real issue isn’t always product quality. You can have the best ingredients in the world, but if your product isn’t presented strategically, it won’t feel worth buying. That’s where Amazon listing images and A+ Content come in. They don’t just “decorate” your page, they tell your brand story, build trust, and serve as your first (and most powerful) sales pitch.
        </p>

        {/* CTA */}
        <div className="flex justify-center">
          <a
            href="#let-start"
            onClick={(e) => {
              scrollToSection("letstalk")
              e.preventDefault();
              
            }}
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-full text-white bg-pink-600 hover:opacity-90 transition-all duration-300 shadow-lg"
          >
            Let’s design your product
          </a>
        </div>
      </motion.div>
    </motion.section>
  );
}
