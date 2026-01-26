
import React from 'react';
import { SERVICES } from '../../constants';
import ServiceCard from './ServiceCard';

interface HeroSectionProps {
  onOpenBooking: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  return (
    <section className="bg-nova-gray py-12 md:py-20 px-4 md:px-10 min-h-screen" id="services">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Header Text */}
        <div className="mb-10 md:mb-20 text-center md:text-left">
          <h1 className="text-3xl md:text-6xl lg:text-7xl text-nova-dark font-medium leading-tight mb-4 md:mb-6">
            Effortless Beauty with <br className="hidden md:block" />
            <span className="font-serif italic font-normal">State of the Art</span> Technology
          </h1>
          
          <p className="text-gray-500 max-w-lg text-sm md:text-base leading-relaxed mx-auto md:mx-0">
            Specializing in premium laser hair removal, cosmelan treatments, and advanced skin rejuvenation. 
            Experience the confidence of flawless skin with our expert med spa services.
          </p>
        </div>

        {/* Grid: Changed to grid-cols-2 for mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {SERVICES.map((service) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              onBook={onOpenBooking} 
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
