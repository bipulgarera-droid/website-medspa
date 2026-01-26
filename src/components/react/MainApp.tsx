
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import CommitmentSection from './CommitmentSection';
import AboutSection from './AboutSection';
import TestimonialsSection from './TestimonialsSection';
import Footer from './Footer';
import BookingModal from './BookingModal';
import AdminDashboard from './AdminDashboard';

// Props for dynamic personalization
export interface ProspectData {
  businessName?: string;
  logoUrl?: string;
  phone?: string;
  email?: string;
  address?: string;
}

interface MainAppProps {
  prospectData?: ProspectData;
}

const MainApp: React.FC<MainAppProps> = ({ prospectData }) => {
  const [view, setView] = useState<'home' | 'admin'>('home');
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Check URL params for owner link
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('owner') === '1') {
        setView('admin');
      }
    }
  }, []);

  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);

  const handleBookingConfirmed = () => setIsBookingOpen(false);

  if (view === 'admin') {
    return <AdminDashboard onBack={() => setView('home')} />;
  }

  return (
    <div className="font-sans antialiased text-nova-text bg-nova-gray min-h-screen flex flex-col">
      <Navbar
        onOpenBooking={openBooking}
        businessName={prospectData?.businessName}
        logoUrl={prospectData?.logoUrl}
      />

      <main className="flex-grow">
        {/* CommitmentSection is the visual Hero (Image) */}
        <CommitmentSection onOpenBooking={openBooking} />
        {/* HeroSection is the Services Grid */}
        <HeroSection onOpenBooking={openBooking} />

        <AboutSection />

        <TestimonialsSection />
      </main>

      <Footer
        onAdminClick={() => setView('admin')}
        businessName={prospectData?.businessName}
        phone={prospectData?.phone}
        email={prospectData?.email}
        address={prospectData?.address}
      />

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

export default MainApp;
