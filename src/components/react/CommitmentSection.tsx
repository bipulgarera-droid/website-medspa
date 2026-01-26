
import React from 'react';

interface CommitmentSectionProps {
  onOpenBooking: () => void;
}

const CommitmentSection: React.FC<CommitmentSectionProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Background Image - Skin Focused */}
      <img
        src="/images/hero-luxury-spa.png"
        alt="Smooth radiant skin"
        className="absolute inset-0 w-full h-full object-cover object-[35%_20%] md:object-top md:scale-125 md:translate-x-[10%]"
      />

      {/* Gradient Overlay for text readability */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-16 max-w-[1440px] mx-auto w-full pt-24 md:pt-32">
        {/* Top Text */}
        <div className="mt-48 md:mt-10">
          <h2 className="text-5xl md:text-7xl lg:text-8xl text-white font-medium leading-[1.1] tracking-tight drop-shadow-lg">
            Your Skin, <br />
            Our Passion for <br />
            <span className="font-serif italic font-normal">Perfection</span>
          </h2>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-10 md:mb-4">
          <div className="max-w-md">
            <p className="text-white/90 text-sm md:text-base mb-6 font-light leading-relaxed">
              Advanced aesthetic treatments designed for your unique needs.
              Reveal your best self with our expert laser and skin care solutions.
            </p>

            <button
              onClick={onOpenBooking}
              className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2 group"
            >
              ( Book a Consultation )
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommitmentSection;
