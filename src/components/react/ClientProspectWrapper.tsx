
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

// Use same Supabase logic as MainApp
const SUPABASE_URL = 'https://fjbowxwqaegvpjyinnsa.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqYm93eHdxYWVndnBqeWlubnNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwODc3NDUsImV4cCI6MjA3OTY2Mzc0NX0.FOPlfwF7kHhwSPhW1nlxeQ9TNBmkztEd2sQFYQ7C-SI';

interface ProspectData {
    businessName?: string;
    logoUrl?: string;
    phone?: string;
    email?: string;
    address?: string;
}

interface WrapperProps {
    children: React.ReactNode;
}

// Higher-order component that fetches prospect data if "preview" param exists
const ClientProspectWrapper: React.FC<WrapperProps> = ({ children }) => {
    const [prospectData, setProspectData] = useState<ProspectData | undefined>(undefined);
    const [slug, setSlug] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const previewSlug = params.get('preview');

            if (previewSlug) {
                setSlug(previewSlug);

                const fetchProspect = async () => {
                    try {
                        const response = await fetch(
                            `${SUPABASE_URL}/rest/v1/personalized_previews?slug=eq.${encodeURIComponent(previewSlug)}&select=business_name,logo_url,contact_info`,
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
                                const contactInfo = prospect.contact_info || {};
                                setProspectData({
                                    businessName: prospect.business_name,
                                    logoUrl: prospect.logo_url,
                                    phone: contactInfo.phone,
                                    email: contactInfo.email,
                                    address: contactInfo.address,
                                });
                            }
                        }
                    } catch (error) {
                        console.error(error);
                    } finally {
                        setIsLoading(false);
                    }
                };
                fetchProspect();
            } else {
                setIsLoading(false);
            }
        }
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar
                onOpenBooking={() => { }}
                businessName={prospectData?.businessName}
                logoUrl={prospectData?.logoUrl}
                slug={slug}
            />

            <main className="flex-grow">
                {children}
            </main>

            <Footer
                businessName={prospectData?.businessName}
                phone={prospectData?.phone}
                email={prospectData?.email}
                address={prospectData?.address}
                slug={slug}
            />
        </div>
    );
};

export default ClientProspectWrapper;
