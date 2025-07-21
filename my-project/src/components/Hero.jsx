import React from 'react';
import { SiAmazon } from 'react-icons/si';

const Hero = () => {
  return (
    <section className="bg-white px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 min-h-screen flex items-center">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-20 py-10 md:py-16">
          {/* Text Content */}
          <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left max-w-2xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-pink-500 leading-tight mb-6">
              BOOST YOUR SALES
              <span className="block mt-2 text-gray-900 text-4xl">on Amazon with  Optimized Visuals </span>
            </h1>
            <p className="text-gray-700 text-lg sm:text-xl lg:text-2xl leading-relaxed mb-10">
              I'm a solo graphic designer specializing in bold, feminine, and vibrant brand identities for online businesses. Let's bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start">
              <a
                href="#portfolio"
                className="bg-pink-500 text-white px-8 py-4 rounded-full text-base font-medium hover:bg-pink-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                View Portfolio
              </a>
              <a
                href="#contact"
                className="border border-pink-500 text-pink-500 px-8 py-4 rounded-full text-base font-medium hover:bg-pink-500 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 hover:text-white"
              >
                Contact Me
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="hidden md:flex flex-1 justify-center lg:justify-end w-full min-h-[320px] md:min-h-[400px]">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl aspect-[3/4]">
              <img
                src="/laiba.jpg"
                alt="Designer working"
                className="rounded-3xl object-contain object-center w-full h-full min-h-[320px] md:min-h-[400px] transition-transform duration-300 hover:scale-105"
                style={{ aspectRatio: '3/4' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
