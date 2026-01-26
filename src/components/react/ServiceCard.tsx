
import React from 'react';
import { Plus, ArrowRight } from 'lucide-react';
import { Service } from '../../types';

interface ServiceCardProps {
  service: Service;
  onBook: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onBook }) => {
  return (
    <div className="group relative h-[240px] md:h-[350px] w-full bg-white rounded-xl md:rounded-2xl p-4 md:p-6 transition-all duration-500 ease-in-out hover:bg-nova-dark overflow-hidden shadow-sm hover:shadow-2xl">

      {/* Default State Content */}
      <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-between transition-opacity duration-300 group-hover:opacity-0 pointer-events-none group-hover:pointer-events-none">

        {/* Top Row: Image & Plus Icon */}
        <div className="flex justify-between items-start">
          <div className="w-20 h-20 md:w-32 md:h-32 overflow-hidden rounded-lg md:rounded-xl bg-gray-50 flex items-center justify-center p-1">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover rounded-md md:rounded-lg"
            />
          </div>
          <span className="text-gray-400 font-light text-xs md:text-base">( + )</span>
        </div>

        {/* Bottom Row: Number & Title */}
        <div className="mt-auto">
          <span className="block text-gray-400 text-[10px] md:text-xs mb-1 md:mb-2">({service.number})</span>
          <h3 className="text-lg md:text-3xl text-gray-900 font-medium leading-tight">
            {service.title} <span className="font-serif italic font-normal block md:inline">{service.italicWord}</span>
          </h3>
        </div>
      </div>

      {/* Hover State Content */}
      <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75 bg-nova-dark rounded-xl md:rounded-2xl">

        {/* Top: Book Button */}
        <div className="flex justify-between items-center w-full">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBook();
            }}
            className="text-white text-xs md:text-sm flex items-center gap-1 md:gap-2 hover:underline underline-offset-4"
          >
            Book <span className="hidden md:inline">an Appointment</span> <span className="opacity-70">( + )</span>
          </button>
          <div className="text-white/20">
            <Plus className="rotate-45" size={16} />
          </div>
        </div>

        {/* Middle/Bottom: Info */}
        <div className="mt-auto space-y-2 md:space-y-4">
          <span className="block text-white/50 text-[10px] md:text-xs">({service.number})</span>

          <h3 className="text-lg md:text-3xl text-white font-medium leading-tight">
            {service.title} <br className="hidden md:block" />
            <span className="font-serif italic font-normal text-white ml-1 md:ml-0">{service.italicWord}</span>
          </h3>

          <p className="text-gray-400 text-[10px] md:text-sm leading-relaxed max-w-[90%] line-clamp-3 md:line-clamp-none">
            {service.description}
          </p>

          <div className="pt-2 hidden md:block">
            <span className="inline-block p-2 rounded-full border border-white/20 text-white cursor-pointer hover:bg-white hover:text-black transition-colors" onClick={onBook}>
              <ArrowRight size={16} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
