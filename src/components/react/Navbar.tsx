
import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../../constants';

interface NavbarProps {
  businessName?: string;
  logoUrl?: string;
  slug?: string; // New: Slug for persisting preview state
  onOpenBooking: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ businessName = 'RONDEBOSCH LASER', logoUrl, slug, onOpenBooking }) => {
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

    // Dynamic Link Logic
    let targetHref = href;

    // If it's a relative path (e.g. /services/laser-hair-removal) AND we have a slug
    // We should keep the slug in URL query param to maintain branding
    if (slug && !href.startsWith('#') && !href.startsWith('http')) {
      const separator = href.includes('?') ? '&' : '?';
      targetHref = `${href}${separator}preview=${slug}`;
    }

    // Hash links
    if (targetHref.startsWith('#')) {
      if (window.location.pathname === '/' || window.location.pathname === '' || window.location.pathname.includes('/preview/')) {
        // Should work on preview page too since it's basically home
        if (targetHref === '#') {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          const element = document.querySelector(targetHref);
          if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
          }
        }
      } else {
        // Different page -> navigate home
        const base = slug ? `/preview/${slug}` : '/';
        window.location.href = `${base}${targetHref}`;
      }
    } else {
      // Normal navigation
      window.location.href = targetHref;
    }
  };

  // Helper to modify href on render for SEO/Standard click behavior
  const getDynamicHref = (href: string) => {
    if (slug && !href.startsWith('#') && !href.startsWith('http')) {
      // Actually, for inner pages in this template (like services), they are separate Astro pages.
      // We can just append ?preview=slug to them.
      // The target page will need to read this param.
      return `${href}?preview=${slug}`;
    }
    return href;
  }

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
          className={`flex items-center gap-3 transition-colors ${logoClass}`}
        >
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={businessName}
              className="h-8 md:h-10 max-w-[180px] object-contain"
              style={{
                // Smart filter logic:
                // - On hero (not scrolled): Show white logo (invert dark logos to white)
                // - On scrolled navbar (white bg): Show dark logo (invert white logos to dark)
                filter: (() => {
                  const isWhiteLogo = logoUrl.toLowerCase().includes('white');
                  const isOnWhiteBg = isScrolled || isMobileMenuOpen;

                  if (isWhiteLogo && isOnWhiteBg) {
                    // White logo on white bg -> make it black
                    return 'invert(1) brightness(0)';
                  } else if (!isWhiteLogo && !isOnWhiteBg) {
                    // Dark logo on dark hero -> make it white
                    return 'brightness(0) invert(1)';
                  }
                  return 'none';
                })()
              }}
            />
          ) : (
            <span className="text-xl md:text-2xl font-bold tracking-wide uppercase font-sans">
              {businessName}
            </span>
          )}
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={getDynamicHref(link.href)}
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
              href={getDynamicHref(link.href)}
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
