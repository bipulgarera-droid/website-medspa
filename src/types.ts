
export interface Service {
  id: string;
  number: string;
  title: string;
  italicWord: string; // The part of the title that uses the serif font
  description: string;
  image: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface LeadData {
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  date?: string;
  time?: string;
  notes?: string;
}

export interface Appointment {
  id: string;
  submissionTimestamp: number;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  service: string;
  appointmentDate: string;
  appointmentTime: string;
  notes?: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export interface ConversationLog {
  id: string;
  timestamp: number;
  durationSeconds: number;
  leadData: LeadData | null;
  status: 'completed' | 'missed' | 'incomplete';
  transcript: string;
}
