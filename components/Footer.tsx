
import React from 'react';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';
import { NAV_LINKS } from '../constants';

interface FooterProps {
  onAdminClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  return (
    <footer className="bg-nova-dark text-white py-16 px-6 md:px-10" id="contact">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand */}
        <div className="col-span-1 md:col-span-1">
          <h2 className="text-2xl font-bold tracking-wide uppercase mb-6">RONDEBOSCH LASER</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Your premier destination for laser hair removal, advanced peels, and skin rejuvenation. State of the art technology meets luxury care.
          </p>
        </div>

        {/* Links */}
        <div className="col-span-1">
          <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-gray-500">Menu</h4>
          <ul className="space-y-3">
            {NAV_LINKS.map(link => (
              <li key={link.label}>
                <a href={link.href} className="text-gray-300 hover:text-white transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="col-span-1">
          <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-gray-500">Visit Us</h4>
          <address className="not-italic text-gray-300 text-sm leading-relaxed space-y-2">
            <p>15 Rondebosch Main Road</p>
            <p>Cape Town, 7700</p>
            <p className="pt-2 hover:text-white cursor-pointer">info@rondeboschlaser.com</p>
            <p className="hover:text-white cursor-pointer">+27 (21) 123-4567</p>
          </address>
        </div>

        {/* Social */}
        <div className="col-span-1 flex flex-col items-start md:items-end">
          <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-gray-500">Follow</h4>
          <div className="flex space-x-4">
            <a href="#" className="p-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors">
              <Instagram size={18} />
            </a>
            <a href="#" className="p-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors">
              <Twitter size={18} />
            </a>
            <a href="#" className="p-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors">
              <Facebook size={18} />
            </a>
          </div>
        </div>

      </div>
      
      <div className="max-w-[1440px] mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <p>&copy; 2026 Rondebosch Laser Hair Removal. All rights reserved.</p>
        <div className="flex gap-4">
            <p>Privacy Policy &bull; Terms of Service</p>
            <button onClick={onAdminClick} className="opacity-0 hover:opacity-50 transition-opacity">Owner Login</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
