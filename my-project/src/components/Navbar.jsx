import React, { useState } from 'react';
import { Menu, X, Home, FolderOpen, Settings, Star, DollarSign, User, Mail } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'Portfolio', href: '#portfolio', icon: FolderOpen },
    { name: 'Services', href: '#services', icon: Settings },
    { name: 'Testimonials', href: '#testimonials', icon: Star },
    { name: 'Pricing', href: '#pricing', icon: DollarSign },
    { name: 'Book a Consultation', href: '/book-consultation', icon: User },
    { name: 'About', href: '#about', icon: User },
    { name: 'Contact', href: '#contact', icon: Mail }
  ];

  return (
    <nav className="h-[70px] relative w-full px-4 sm:px-6 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between z-50 bg-white text-gray-700 shadow-[0px_4px_25px_0px_#0000000D] transition-all">
      
      {/* Logo */}
      <a href="#home" className="text-pink-600 flex-shrink-0">
       <h1 className='text-4xl font-semibold'>Laiba S.</h1>
      </a>

      {/* Desktop Menu */}
      <div className="hidden lg:flex items-center gap-8">
        {menuItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="relative overflow-hidden h-6 group text-gray-700 hover:text-pink-500 transition-colors duration-300"
          >
            <span className="block group-active:scale-90 transition-transform duration-300">
              {item.name}
            </span>
            {/* <span className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">
              {item.name}
            </span> */}
          </a>
        ))}
      </div>

      {/* Desktop CTA Button */}
      <div className="hidden lg:flex items-center">
        <a
          href="/book-consultation"
          className="border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-300"
        >
          Book a Consultation
        </a>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        onClick={toggleMenu}
        className="lg:hidden text-gray-600 hover:text-pink-500 transition-colors duration-300 p-2"
      >
        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu */}
      <div
        className={`absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 transform transition-all duration-300 ease-in-out lg:hidden ${
          isMenuOpen
            ? 'translate-y-0 opacity-100 visible'
            : '-translate-y-4 opacity-0 invisible'
        }`}
      >
        <div className="px-4 py-6 space-y-4">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 text-gray-700 hover:text-pink-500 hover:bg-pink-50 px-4 py-3 rounded-lg transition-all duration-300"
              >
                <IconComponent className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </a>
            );
          })}
          <div className="pt-4 border-t border-gray-100">
            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-center gap-2 bg-pink-500 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-pink-600 transition-all duration-300"
            >
              <Mail className="w-4 h-4" />
              Get Started
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;