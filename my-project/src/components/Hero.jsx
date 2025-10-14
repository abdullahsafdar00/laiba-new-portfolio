import React from "react";
import {motion} from "framer-motion";
import Navbar from "./Navbar";

const brandIcons = [
  { src: "/1.png", alt: "Brand 1" },
  { src: "/2.png", alt: "Brand 2" },
  { src: "/3.png", alt: "Brand 3" },
  { src: "/4.png", alt: "Brand 4" },
  { src: "/5.png", alt: "Brand 5" },
  { src: "/6.png", alt: "Brand 6" },
  { src: "/7.png", alt: "Brand 7" },
  { src: "/8.png", alt: "Brand 8" },
];

const Hero = () => {

  return (
    <>
    <Navbar/>
      <motion.div 
          initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
       className="mt-28 sm:mt-20 min-h-[80vh]">
        <div className="relative flex flex-col items-center justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 text-black">
          {/* background blur */}
          <div className="absolute -top-32 sm:-top-52 -z-10 left-1/4 size-60 sm:size-96 xl:size-[500px] bg-pink-300 blur-[100px] opacity-30"></div>

          {/* avatars + stars */}
          <div className="flex flex-col sm:flex-row items-center mt-10 sm:mt-16 gap-4 sm:gap-6">
            {/* avatars */}
            <div className="flex -space-x-3 pr-0 sm:pr-3">
              {[
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200",
                "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200",
                "https://randomuser.me/api/portraits/men/75.jpg",
              ].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`user${i}`}
                  className="w-12 h-12 sm:w-10 sm:h-10 object-cover rounded-full border-2 border-white"
                />
              ))}
            </div>

            {/* stars */}
            <div className="text-center sm:text-left">
              <div className="flex justify-center sm:justify-start">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-star text-transparent fill-pink-600"
                    >
                      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                    </svg>
                  ))}
              </div>
              <p className="text-xs sm:text-sm text-gray-700 mt-1">
                Worked for 100+ clients
              </p>
            </div>
          </div>

          {/* headline */}
          <h1 className="text-4xl sm:text-3xl md:text-5xl lg:text-6xl font-semibold max-w-5xl text-center mt-6 leading-tight sm:leading-snug md:leading-[65px]">
            Boost Your Sales On Amazon{" "}
            <span className="block sm:inline bg-gradient-to-r from-pink-700 to-pink-600 bg-clip-text text-transparent">
              With Optimized Visuals.
            </span>
          </h1>

          {/* subtext */}
          <p className="max-w-md text-center text-sm sm:text-base md:text-lg my-6 text-gray-700">
            Helping Brands to Grow on Amazon with Optimized Visual Content | Amazon
            Design Expert
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href="#portfolio"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('portfolio')
                if (!el) return
                if (typeof window !== 'undefined' && window.appScrollTo) {
                  window.appScrollTo(el)
                } else {
                  el.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-6 sm:px-9 h-10 sm:h-12 flex items-center ring-offset-2 ring-1 ring-pink-400 transition-colors"
            >
              See my Work
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="ml-2"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('contact')
                if (!el) return
                if (typeof window !== 'undefined' && window.appScrollTo) {
                  window.appScrollTo(el)
                } else {
                  el.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="flex items-center gap-2 border border-slate-400 hover:bg-pink-50 transition rounded-full px-4 sm:px-7 h-10 sm:h-12 text-slate-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="lucide lucide-video"
              >
                <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
                <rect x="1" y="6" width="14" height="12" rx="2" />
              </svg>
              <span>Let's Discuss Your Project</span>
            </a>
          </div>

          {/* brand marquee */}
<p className="py-6 text-slate-600 mt-10 text-md sm:text-base md:text-lg">
  <span className="font-bold">Brands, </span>I’ve worked with...
</p>
<div className="overflow-hidden w-full relative max-w-6xl mx-auto select-none">
  <div className="absolute left-0 top-0 h-full w-16 sm:w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />

  {/* Marquee track */}
  <div className="marquee-track flex items-center">
    {[...brandIcons, ...brandIcons].map((icon, idx) => (
      <img
        key={idx}
        src={icon.src}
        alt={icon.alt}
        loading="lazy"
        className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto mx-4 object-contain transition-transform hover:scale-105"
        draggable={false}
      />
    ))}
  </div>

  <div className="absolute right-0 top-0 h-full w-16 sm:w-20 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
</div>

<style>{`
  .marquee-track {
  animation: marqueeScroll 3s linear infinite;
  display: flex;
  gap: 2rem;
}

@media (max-width: 768px) {
  .marquee-track {
    animation-duration: 3s;
    gap: 1rem;
  }
}

@media (min-width: 1280px) {
  .marquee-track {
    animation-duration: 3s; 
  }
}

@keyframes marqueeScroll {
  from { transform: translateX(0%); }
  to { transform: translateX(-100%); }
}

`}</style>

        
        </div>
      </motion.div>

      
    </>
  );
};

export default Hero;
