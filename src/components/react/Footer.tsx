
import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { NAV_LINKS } from '../../constants';

interface FooterProps {
  businessName?: string;
  address?: string;
  email?: string;
  phone?: string;
  slug?: string;
  onAdminClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({
  businessName = 'RONDEBOSCH LASER',
  address = '15 Rondebosch Main Road, Cape Town, 7700',
  email = 'info@rondeboschlaser.com',
  phone = '+27 (21) 123-4567',
  slug,
  onAdminClick
}) => {
  // Split address into lines for display
  const addressLines = address.split(',').map(line => line.trim());

  const getDynamicHref = (href: string) => {
    if (slug && !href.startsWith('#') && !href.startsWith('http')) {
      return `${href}?preview=${slug}`;
    }
    return href;
  }

  return (
    <footer className="bg-nova-dark text-white py-16 px-6 md:px-10" id="contact">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Brand */}
        <div className="col-span-1 md:col-span-1">
          <h2 className="text-2xl font-bold tracking-wide uppercase mb-6">{businessName}</h2>
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
                <a
                  href={getDynamicHref(link.href)}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href={getDynamicHref("/services/laser-hair-removal")} className="text-gray-300 hover:text-white transition-colors">
                Laser Hair Removal
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="col-span-1">
          <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-gray-500">Visit Us</h4>
          <address className="not-italic text-gray-300 text-sm leading-relaxed space-y-2">
            {addressLines.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
            <p className="pt-2 hover:text-white cursor-pointer">{email}</p>
            <p className="hover:text-white cursor-pointer">{phone}</p>
          </address>
        </div>

        {/* Social */}
        <div className="col-span-1 flex flex-col items-start md:items-end">
          <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-gray-500">Follow</h4>
          <div className="flex space-x-4">
            <div className="p-2 border border-white/20 rounded-full text-gray-400 cursor-not-allowed">
              <Instagram size={18} />
            </div>
            <div className="p-2 border border-white/20 rounded-full text-gray-400 cursor-not-allowed">
              <Twitter size={18} />
            </div>
            <div className="p-2 border border-white/20 rounded-full text-gray-400 cursor-not-allowed">
              <Facebook size={18} />
            </div>
          </div>
        </div>

      </div>

      <div className="max-w-[1440px] mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <p>&copy; 2026 {businessName}. All rights reserved.</p>
        <div className="flex gap-4">
          <p>Privacy Policy &bull; Terms of Service</p>
          <button onClick={onAdminClick} className="opacity-0 hover:opacity-50 transition-opacity">Owner Login</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
