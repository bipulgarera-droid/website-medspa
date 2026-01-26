// Supabase client for fetching prospect data
const SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || '';

export interface ProspectData {
    slug: string;
    business_name: string;
    logo_url?: string;
    phone?: string;
    email?: string;
    address?: string;
}

export async function getProspectBySlug(slug: string): Promise<ProspectData | null> {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
        console.warn('Supabase credentials not configured');
        return null;
    }

    try {
        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/personalized_previews?slug=eq.${encodeURIComponent(slug)}&select=slug,business_name,logo_url,phone,email,address`,
            {
                headers: {
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                },
            }
        );

        if (!response.ok) {
            console.error('Failed to fetch prospect:', response.statusText);
            return null;
        }

        const data = await response.json();
        if (data && data.length > 0) {
            return data[0] as ProspectData;
        }

        return null;
    } catch (error) {
        console.error('Error fetching prospect:', error);
        return null;
    }
}
