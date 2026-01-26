import React from 'react';
import { Mic } from 'lucide-react';

const VoiceWidget: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-40 hidden md:block group">
      <div className="bg-black text-white p-4 rounded-full shadow-2xl cursor-pointer hover:scale-110 transition-transform flex items-center justify-center w-14 h-14">
        <Mic size={24} />
      </div>
      
      {/* Tooltip / Expanded State Placeholder */}
      <div className="absolute bottom-full right-0 mb-4 w-64 bg-white p-4 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
        <p className="text-sm text-gray-600">
          <strong>Voice Assistant</strong><br/>
          How can we help you today?
        </p>
      </div>
    </div>
  );
};

export default VoiceWidget;
