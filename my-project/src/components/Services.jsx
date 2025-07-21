import React, { useState } from 'react';

const services = [
  {
    title: 'Web Design',
    description: 'Modern, responsive, and user-friendly interfaces tailored for your brand.',
    image: 'https://source.unsplash.com/featured/?webdesign',
  },
  {
    title: 'Web Development',
    description: 'Scalable and fast websites using the latest technologies.',
    image: 'https://source.unsplash.com/featured/?coding',
  },
  {
    title: 'SEO Optimization',
    description: 'Rank better and attract more visitors with proven SEO strategies.',
    image: 'https://source.unsplash.com/featured/?seo',
  },
  {
    title: 'E-commerce',
    description: 'Build online stores with smooth checkout and payment gateways.',
    image: 'https://source.unsplash.com/featured/?ecommerce',
  },
  {
    title: 'Brand Identity',
    description: 'Create cohesive brand visuals from logos to colors and typography.',
    image: 'https://source.unsplash.com/featured/?branding',
  },
  {
    title: 'Support & Maintenance',
    description: 'We provide long-term support, monitoring, and updates.',
    image: 'https://source.unsplash.com/featured/?maintenance',
  },
];

const TiltCard = ({ service }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const threshold = 10;

  const handleMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setTilt({ x: y * -threshold, y: x * threshold });
  };

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
      className="group bg-white rounded-2xl shadow-lg overflow-hidden transform-gpu transition-transform duration-300 hover:shadow-2xl w-full max-w-[360px] mx-auto"
    >
      <div className="relative w-full h-48 sm:h-52 md:h-56 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-60"></div>
      </div>
      <div className="p-5">
        <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
        <p className="text-sm md:text-base text-gray-600">{service.description}</p>
      </div>
    </div>
  );
};

const Services = () => {
  return (
    <section className="px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-16 bg-white">
      <div className="text-center mb-14">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pink-500">Our Services</h2>
        <p className="text-gray-600 mt-4 max-w-xl mx-auto text-sm sm:text-base">
          We deliver world-class design, development, and digital strategies to elevate your brand online.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <TiltCard key={index} service={service} />
        ))}
      </div>
    </section>
  );
};

export default Services;
