import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Home, FolderOpen,  Star,  User, Mail, ClipboardList } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
  
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    
  };

  const menuItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Portfolio', href: '#portfolio', icon: FolderOpen },
    { name: 'Services', href: '/services', icon: ClipboardList },
    { name: 'Testimonials', href: '#testimonials', icon: Star },
    { name: 'About', href: '#about', icon: User },
    { name: 'Contact', href: '#contact', icon: Mail }
  ];

  return (
    <nav className="h-[70px] w-full px-4 fixed bg-transparent backdrop-blur-md sm:px-6 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between z-50 text-gray-700 transition-all">
      
      {/* Logo */}
      <a href="#home" className="text-pink-600 flex-shrink-0">
       <h1 className='text-4xl font-semibold'>Laiba S.</h1>
      </a>

      {/* Desktop Menu */}
      <div className="hidden lg:flex items-center gap-8">
        {menuItems.map((item) => (
          item.href.startsWith('#') ? (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href.slice(1));
              }}
              className="relative overflow-hidden h-6 group text-gray-700 hover:text-pink-500 transition-colors duration-300"
            >
              <span className="block text-xl group-active:scale-90 transition-transform duration-300">
                {item.name}
              </span>
            </a>
          ) : (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => {
                if (item.href.includes('#')) {
                  setTimeout(() => {
                    const hash = item.href.split('#')[1];
                    scrollToSection(hash);
                  }, 0);
                }
              }}
              className="relative overflow-hidden h-6 group text-gray-700 hover:text-pink-500 transition-colors duration-300"
            >
              <span className="block text-xl group-active:scale-90 transition-transform duration-300">
                {item.name}
              </span>
            </Link>
          )
        ))}
      </div>

      {/* Desktop CTA Button */}
      <div className="hidden lg:flex items-center">
        <Link
          to="/book-consultation"
          className="bg-pink-500 hover:shadow-[0px_0px_30px_14px] shadow-[0px_0px_30px_7px] hover:shadow-white/50 shadow-white/50 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-pink-400 transition duration-300"
        >
          Book a Consultation
        </Link>
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
              item.href.startsWith('#') ? (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href.slice(1));
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-3 text-gray-700 hover:text-pink-500 hover:bg-pink-50 px-4 py-3 rounded-lg transition-all duration-300"
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => {
                    if (item.href.includes('#')) {
                      setTimeout(() => {
                        const hash = item.href.split('#')[1];
                        scrollToSection(hash);
                      }, 0);
                    }
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-3 text-gray-700 hover:text-pink-500 hover:bg-pink-50 px-4 py-3 rounded-lg transition-all duration-300"
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            );
          })}
          <div className="pt-4 border-t border-gray-100">
            <Link
              to="/book-consultation"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-center gap-2 bg-pink-500 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-pink-600 transition-all duration-300"
            >
              <Mail className="w-4 h-4" />
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;