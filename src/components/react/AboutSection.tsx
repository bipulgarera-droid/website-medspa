
import React from 'react';

// Add businessName prop
interface AboutSectionProps {
  businessName?: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ businessName = "Rondebosch Laser" }) => {
  return (
    <section className="bg-white py-20 px-6 md:px-10" id="about">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-12">
          <span className="text-gray-400 text-sm flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
            About {businessName}
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

          {/* Left: Heading */}
          <div className="lg:w-2/3">
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-nova-dark leading-tight font-medium">
              At {businessName}, we combine <span className="font-serif italic font-normal text-gray-600">state-of-the-art technology</span> with expert care to deliver exceptional results. From laser hair removal to <span className="font-serif italic font-normal text-gray-600">advanced peels and cosmelan</span>, our goal is your absolute confidence.
            </h2>
          </div>

          {/* Right: Small visual & Detail */}
          <div className="lg:w-1/3 flex flex-col justify-end h-full mt-8 lg:mt-0">
            <div className="relative mb-8">
              <div className="w-full aspect-square rounded-2xl overflow-hidden bg-gray-100 max-w-[300px]">
                <img
                  src="/images/about-spa-interior.png"
                  alt="Advanced Skin Care Tool"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="border border-gray-200 rounded-full w-10 h-10 flex items-center justify-center mb-6">
              <div className="w-1 h-1 bg-black rounded-full"></div>
            </div>

            <p className="text-gray-500 text-sm leading-relaxed max-w-[300px]">
              We are a dedicated med spa offering top-tier aesthetic procedures in a luxurious environment. Our specialists use the latest diode lasers and clinical skincare to ensure safe, effective, and beautiful results.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
