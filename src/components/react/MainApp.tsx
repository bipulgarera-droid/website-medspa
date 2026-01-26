
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
  slug?: string; // For client-side data fetching
}

// Supabase config
const SUPABASE_URL = 'https://fjbowxwqaegvpjyinnsa.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqYm93eHdxYWVndnBqeWlubnNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwODc3NDUsImV4cCI6MjA3OTY2Mzc0NX0.FOPlfwF7kHhwSPhW1nlxeQ9TNBmkztEd2sQFYQ7C-SI';

const MainApp: React.FC<MainAppProps> = ({ prospectData: initialData, slug }) => {
  const [view, setView] = useState<'home' | 'admin'>('home');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [prospectData, setProspectData] = useState<ProspectData | undefined>(initialData);
  const [isLoading, setIsLoading] = useState(!!slug && !initialData);

  // Fetch prospect data client-side if slug is provided
  useEffect(() => {
    if (slug && !initialData) {
      const fetchProspect = async () => {
        try {
          const response = await fetch(
            `${SUPABASE_URL}/rest/v1/personalized_previews?slug=eq.${encodeURIComponent(slug)}&select=business_name,logo_url,phone,email,address`,
            {
              headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            if (data && data.length > 0) {
              const prospect = data[0];
              setProspectData({
                businessName: prospect.business_name,
                logoUrl: prospect.logo_url,
                phone: prospect.phone,
                email: prospect.email,
                address: prospect.address,
              });
            }
          }
        } catch (error) {
          console.error('Failed to fetch prospect data:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchProspect();
    }
  }, [slug, initialData]);

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

  // Simple loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-nova-gray flex items-center justify-center">
        <div className="text-nova-dark text-xl">Loading...</div>
      </div>
    );
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
