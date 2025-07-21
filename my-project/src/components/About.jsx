import React from "react";

const brandIcons = [
  { src: '/1.png', alt: 'Brand 1' },
  { src: '/2.png', alt: 'Brand 2' },
  { src: '/3.png', alt: 'Brand 3' },
  { src: '/4.png', alt: 'Brand 4' },
  { src: '/5.png', alt: 'Brand 5' },
  { src: '/6.png', alt: 'Brand 6' },
  { src: '/7.png', alt: 'Brand 7' },
  { src: '/8.png', alt: 'Brand 8' },
];

export default function About() {
  // Repeat icons 4 times for a seamless loop
  const icons = Array(4).fill(brandIcons).flat();

  return (
    <section className="text-center px-4 py-12 sm:py-16 lg:py-20 bg-white text-slate-800">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-4 leading-tight px-2">
        We build <span className="text-pink-500 italic">Design</span> that works.
      </h2>
      <p className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto mt-4 sm:mt-6 text-gray-500 text-sm sm:text-base md:text-lg px-2">
        I am passionate about delivering fast, beautiful, and reusable solutions that meet modern design needs. I have worked for my clients on different platforms.
      </p>
      
      {/* Logo Marquee */}
      <div className="overflow-hidden w-full relative max-w-7xl mx-auto select-none mt-8 sm:mt-12 lg:mt-16">
        {/* Left fade */}
        <div className="absolute left-0 top-0 h-full w-6 sm:w-12 md:w-16 lg:w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
        
        {/* Marquee container */}
        <div className="marquee-inner flex items-center h-16 sm:h-24 md:h-32 lg:h-40 xl:h-48">
          {icons.map((icon, idx) => (
            <div className="inline-block mx-1 sm:mx-2 md:mx-3 lg:mx-4 flex-shrink-0" key={icon.alt + idx}>
              <img
                src={icon.src}
                alt={icon.alt}
                className="h-20 w-16 sm:h-32 sm:w-24 md:h-40 md:w-28 lg:h-48 lg:w-32 xl:h-56 xl:w-40 object-contain"
                style={{ aspectRatio: '3/4' }}
                draggable={false}
              />
            </div>
          ))}
        </div>
        
        {/* Right fade */}
        <div className="absolute right-0 top-0 h-full w-6 sm:w-12 md:w-16 lg:w-20 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
      </div>
      
      {/* Animation Styles */}
      <style>{`
        .marquee-inner {
          animation: marqueeScroll 10s linear infinite;
        }
        
        @media (max-width: 640px) {
          .marquee-inner {
            animation-duration: 10s;
          }
        }
        
        @media (min-width: 1024px) {
          .marquee-inner {
            animation-duration: 10s;
          }
        }
        
        @keyframes marqueeScroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        
      `}</style>
    </section>
  );
}