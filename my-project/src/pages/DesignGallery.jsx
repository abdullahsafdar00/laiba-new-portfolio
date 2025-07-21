// src/pages/DesignGallery.jsx
import React from 'react';

const DESIGN_IMAGES = [
  { src: '/artboard1.png' },
  { src: '/artboard1.png' },
  { src: '/artboard1.png' },
  { src: '/designs/design4.jpg' },
  { src: '/designs/design5.jpg' },
  { src: '/designs/design6.jpg' },
  { src: '/designs/design7.jpg' },
  { src: '/designs/design8.jpg' },
  { src: '/designs/design9.jpg' },
  { src: '/designs/design10.jpg' },
  { src: '/designs/design11.jpg' },
  { src: '/designs/design12.jpg' },
  { src: '/designs/design13.jpg' },
  { src: '/designs/design14.jpg' },
  { src: '/designs/design15.jpg' },
  { src: '/designs/design16.jpg' },
  { src: '/designs/design17.jpg' },
  { src: '/designs/design18.jpg' },
  { src: '/designs/design19.jpg' },
  { src: '/designs/design20.jpg' },
];

const DesignGallery = () => {
  return (
    <section className="min-h-screen bg-white pt-16 px-4 sm:px-10">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-pink-500 mb-2">
        More Designs
      </h2>
      <p className="text-sm sm:text-base text-center text-slate-500 mb-8 max-w-xl mx-auto">
        A curated collection of our creative designs — bold, clean, and beautiful.
      </p>

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3">
        {DESIGN_IMAGES.map((design, idx) => (
          <div
            key={idx}
            className="overflow-hidden rounded-xl shadow-md transition-transform duration-300 cursor-pointer aspect-[16/27]"
          >
            <img
              src={design.src}
              alt={`Design ${idx + 1}`}
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default DesignGallery;
