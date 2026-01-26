
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CommitmentSection from './components/CommitmentSection';
import AboutSection from './components/AboutSection';
import TestimonialsSection from './components/TestimonialsSection';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import AdminDashboard from './components/AdminDashboard';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'admin'>('home');
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Check URL params for owner link
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('owner') === '1') {
      setView('admin');
    }
  }, []);

  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);

  const handleBookingConfirmed = () => {
    setIsBookingOpen(false);
  };

  if (view === 'admin') {
    return <AdminDashboard onBack={() => setView('home')} />;
  }

  return (
    <div className="font-sans antialiased text-nova-text bg-nova-gray min-h-screen flex flex-col">
      <Navbar onOpenBooking={openBooking} />
      
      <main className="flex-grow">
        {/* CommitmentSection is the visual Hero (Image) */}
        <CommitmentSection onOpenBooking={openBooking} />
        {/* HeroSection is the Services Grid */}
        <HeroSection onOpenBooking={openBooking} />
        
        <AboutSection />
        <TestimonialsSection />
      </main>

      <Footer onAdminClick={() => setView('admin')} />
      
      {/* Floating Elements */}
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={closeBooking} 
        onConfirm={handleBookingConfirmed}
        initialData={null}
      />
    </div>
  );
};

export default App;
