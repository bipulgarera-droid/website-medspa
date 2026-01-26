import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../constants';

interface NavbarProps {
  onOpenBooking: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        const offset = 100; // Header height + padding
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      } else if (href === '#') {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    }
  };

  // Dynamic classes based on scroll state
  const navBgClass = isScrolled 
    ? 'bg-nova-gray/90 backdrop-blur-md border-b border-gray-200/50 py-4' 
    : 'bg-transparent py-6 border-transparent';
    
  const navTextClass = isScrolled || isMobileMenuOpen 
    ? 'text-gray-600 hover:text-black' 
    : 'text-white/90 hover:text-white';
    
  const logoClass = isScrolled || isMobileMenuOpen 
    ? 'text-nova-dark' 
    : 'text-white';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBgClass}`}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex items-center justify-between">
        
        {/* Logo */}
        <a 
          href="#" 
          onClick={(e) => handleNavClick(e, '#')}
          className={`text-xl md:text-2xl font-bold tracking-wide uppercase font-sans transition-colors ${logoClass}`}
        >
          RONDEBOSCH LASER
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.label} 
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-sm font-medium transition-colors cursor-pointer ${navTextClass}`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className={`md:hidden p-2 transition-colors ${logoClass}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 p-6 flex flex-col space-y-4 shadow-xl">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.label} 
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-lg font-medium text-gray-800 cursor-pointer"
            >
              {link.label}
            </a>
          ))}
          <button 
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="w-full bg-nova-dark text-white py-3 rounded-full mt-4"
          >
            Book Appointment
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;