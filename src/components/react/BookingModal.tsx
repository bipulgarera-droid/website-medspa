
import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { LeadData, Appointment } from '../../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  initialData: LeadData | null;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, onConfirm, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Laser Hair Removal',
    date: '',
    time: '',
    notes: ''
  });

  // Pre-fill form when initialData changes or modal opens
  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        name: initialData.name || prev.name,
        phone: initialData.phone || prev.phone,
        email: initialData.email || prev.email,
        service: initialData.service || prev.service,
        date: initialData.date || prev.date,
        time: initialData.time || prev.time,
        notes: initialData.notes || prev.notes
      }));
    }
  }, [initialData, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new Appointment Object
    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      submissionTimestamp: Date.now(),
      clientName: formData.name,
      clientPhone: formData.phone,
      clientEmail: formData.email,
      service: formData.service,
      appointmentDate: formData.date || new Date().toISOString().split('T')[0], // Fallback if empty
      appointmentTime: formData.time || '09:00', // Fallback if empty
      notes: formData.notes,
      status: 'confirmed'
    };

    // Save to Local Storage
    try {
        const existing = localStorage.getItem('appointments');
        const appointments: Appointment[] = existing ? JSON.parse(existing) : [];
        appointments.push(newAppointment);
        localStorage.setItem('appointments', JSON.stringify(appointments));
    } catch (err) {
        console.error("Failed to save appointment", err);
    }
    
    alert(`Appointment Confirmed for ${formData.name}!`);
    
    if (onConfirm) {
        onConfirm();
    } else {
        onClose();
    }
    
    // Reset form slightly but keep some defaults if needed, mostly just closing modal
    setFormData({
        name: '', phone: '', email: '', service: 'Laser Hair Removal', date: '', time: '', notes: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-lg relative shadow-2xl animate-fade-in-up my-8">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black transition-colors"
        >
          <X size={24} />
        </button>

        <h3 className="text-3xl font-serif italic mb-2">Book Your Visit</h3>
        <p className="text-gray-500 text-sm mb-6">Confirm your details below. We'll contact you to finalize your appointment.</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          
          {/* Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Full Name</label>
              <input 
                name="name" 
                value={formData.name} 
                onChange={handleChange}
                type="text" 
                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors bg-transparent text-sm" 
                placeholder="Jane Doe" 
                required 
              />
            </div>
            
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Phone Number</label>
              <input 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="tel" 
                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors bg-transparent text-sm" 
                placeholder="(555) 000-0000" 
                required 
              />
            </div>
          </div>

          <div>
             <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Email Address</label>
             <input 
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email" 
                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors bg-transparent text-sm" 
                placeholder="jane@example.com" 
                required 
              />
          </div>

          {/* Service Selection */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Treatment</label>
            <select 
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors bg-transparent text-sm"
            >
              <option>Laser Hair Removal</option>
              <option>Cosmelan Peel</option>
              <option>Dermaplaning</option>
              <option>Chemical Peel</option>
              <option>Threading / Waxing</option>
              <option>Microneedling</option>
              <option>Other / Consultation</option>
            </select>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
               <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Preferred Date</label>
               <input 
                 name="date"
                 value={formData.date}
                 onChange={handleChange}
                 type="date" 
                 required
                 className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors bg-transparent text-sm font-sans"
               />
            </div>
            <div>
               <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Preferred Time</label>
               <input 
                 name="time"
                 value={formData.time}
                 onChange={handleChange}
                 type="time"
                 required 
                 className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors bg-transparent text-sm font-sans"
               />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Notes</label>
            <textarea 
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={2}
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors bg-transparent text-sm resize-none"
              placeholder="Any specific concerns or requests..."
            ></textarea>
          </div>

          <div className="pt-4">
            <button type="submit" className="w-full bg-nova-dark text-white py-4 rounded-lg hover:bg-black transition-colors font-medium text-sm tracking-wide">
              CONFIRM APPOINTMENT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
