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
      if (!element) return;
      if (typeof window !== 'undefined' && window.appScrollTo) {
        window.appScrollTo(element)
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    
  };

  const menuItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'About', href: '#about', icon: User },
     { name: 'Services', href: '#services', icon: ClipboardList },
    { name: 'Portfolio', href: '#portfolio', icon: FolderOpen },
    { name: 'Testimonials', href: '#testimonials', icon: Star },
    { name: 'Contact', href: '#contact', icon: Mail }
  ];

  return (
<nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">

  <div className="mx-auto flex items-center justify-between min-h-[70px] px-4 sm:px-6 md:px-16 lg:px-24 xl:px-32 max-w-[1600px] text-gray-700">

      
      {/* Logo */}
  <a href="#home" className="text-pink-600 flex-shrink-0">
   <h1 className='text-2xl sm:text-3xl md:text-4xl font-semibold'>Laiba S.</h1>
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
              className="relative overflow-visible group text-gray-700 hover:text-pink-500 transition-colors duration-300 interactive"
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
              className="relative overflow-visible group text-gray-700 hover:text-pink-500 transition-colors duration-300 interactive"
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
        <a
          href="#let-start"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('letstalk');
          }}
          className="bg-pink-500 hover:shadow-[0px_0px_30px_14px] shadow-[0px_0px_30px_7px] hover:shadow-white/50 shadow-white/50 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-pink-400 transition duration-300 interactive"
        >
          Book a Consultation
        </a>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        onClick={toggleMenu}
        aria-controls="mobile-menu"
        aria-expanded={isMenuOpen}
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        className="lg:hidden text-gray-600 hover:text-pink-500 transition-colors duration-300 p-2"
      >
        {isMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
      </button>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        role="menu"
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
            <a
              href="#letstalk"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('letstalk');
                setIsMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 bg-pink-500 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-pink-600 transition-all duration-300"
            >
              <Mail className="w-4 h-4" />
              Get Started
            </a>
          </div>
        </div>
      </div>
      </div>
    </nav>
  );
};

export default Navbar;