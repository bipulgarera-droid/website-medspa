
import React, { useState, useEffect } from 'react';
import { Calendar, User, Phone, CheckCircle, ArrowLeft, Clock, Sparkles } from 'lucide-react';
import { Appointment } from '../types';

interface AdminDashboardProps {
  onBack: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBack }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Seed mock data if empty
  useEffect(() => {
    const saved = localStorage.getItem('appointments');
    if (saved) {
      setAppointments(JSON.parse(saved));
    } else {
      // Mock Data for demo
      const mocks: Appointment[] = [
        {
          id: 'apt-1',
          submissionTimestamp: Date.now() - 86400000,
          clientName: 'Sarah Jenkins',
          clientPhone: '+27 72 123 4567',
          clientEmail: 'sarah.j@example.com',
          service: 'Laser Hair Removal',
          appointmentDate: '2026-02-15',
          appointmentTime: '14:30',
          status: 'confirmed',
          notes: 'First time patient, sensitive skin.'
        },
        {
          id: 'apt-2',
          submissionTimestamp: Date.now() - 172800000,
          clientName: 'Michael Torres',
          clientPhone: '+27 82 999 8888',
          clientEmail: 'mike.t@example.com',
          service: 'Cosmelan Peel',
          appointmentDate: '2026-02-10',
          appointmentTime: '09:00',
          status: 'pending',
          notes: ''
        }
      ];
      localStorage.setItem('appointments', JSON.stringify(mocks));
      setAppointments(mocks);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@clinic.com' && password === 'password123') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const formatDate = (dateStr: string) => {
    // Basic date formatter for YYYY-MM-DD
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-ZA', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatSubmissionTime = (ts: number) => {
    return new Date(ts).toLocaleString('en-ZA', { 
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-nova-gray flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-nova-dark uppercase tracking-wide">Admin Access</h2>
            <p className="text-gray-500 text-sm mt-2">Please log in to view appointments</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs uppercase font-bold text-gray-500 mb-1">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-nova-teal bg-transparent"
                placeholder="admin@clinic.com"
              />
            </div>
            <div>
              <label className="block text-xs uppercase font-bold text-gray-500 mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-nova-teal bg-transparent"
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="w-full bg-nova-dark text-white py-3 rounded-lg hover:bg-black transition-colors font-bold mt-4">
              LOGIN DASHBOARD
            </button>
            <button type="button" onClick={onBack} className="w-full text-gray-400 text-xs py-2 hover:text-black">
              Back to Website
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Stats
  const total = appointments.length;
  const confirmed = appointments.filter(a => a.status === 'confirmed').length;
  
  // Calculate top service
  const serviceCounts: Record<string, number> = {};
  appointments.forEach(a => {
    serviceCounts[a.service] = (serviceCounts[a.service] || 0) + 1;
  });
  const topService = Object.entries(serviceCounts).sort((a,b) => b[1] - a[1])[0]?.[0] || 'N/A';

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-nova-dark">
      {/* Navbar */}
      <nav className="bg-nova-dark text-white py-4 px-6 md:px-10 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft size={20} />
          </button>
          <span className="font-bold tracking-widest uppercase">Nova Admin</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Live System Active
        </div>
      </nav>

      <div className="max-w-[1440px] mx-auto p-6 md:p-10">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-400 text-xs uppercase font-bold tracking-wider">Total Bookings</p>
                <h3 className="text-4xl font-medium mt-1">{total}</h3>
              </div>
              <div className="p-3 bg-blue-50 text-blue-500 rounded-lg">
                <Calendar size={20} />
              </div>
            </div>
            <p className="text-xs text-gray-400">All time requests</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-400 text-xs uppercase font-bold tracking-wider">Confirmed</p>
                <h3 className="text-4xl font-medium mt-1">{confirmed}</h3>
              </div>
              <div className="p-3 bg-green-50 text-green-500 rounded-lg">
                <CheckCircle size={20} />
              </div>
            </div>
            <p className="text-xs text-green-600 font-bold">Upcoming Appointments</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className="overflow-hidden">
                <p className="text-gray-400 text-xs uppercase font-bold tracking-wider">Top Service</p>
                <h3 className="text-xl font-medium mt-2 truncate">{topService}</h3>
              </div>
              <div className="p-3 bg-purple-50 text-purple-500 rounded-lg flex-shrink-0">
                <Sparkles size={20} />
              </div>
            </div>
            <p className="text-xs text-gray-400">Most requested treatment</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
             <h3 className="font-bold text-lg">Upcoming Appointments</h3>
             <button onClick={() => window.location.reload()} className="text-xs bg-gray-100 px-3 py-1 rounded hover:bg-gray-200">Refresh Data</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-bold tracking-wider">
                <tr>
                  <th className="p-4 border-b">Submitted</th>
                  <th className="p-4 border-b">Appointment Slot</th>
                  <th className="p-4 border-b">Client Details</th>
                  <th className="p-4 border-b">Service</th>
                  <th className="p-4 border-b">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {appointments.length === 0 ? (
                    <tr>
                        <td colSpan={5} className="p-8 text-center text-gray-400">No appointments scheduled yet.</td>
                    </tr>
                ) : appointments.sort((a,b) => b.submissionTimestamp - a.submissionTimestamp).map((apt) => (
                  <tr key={apt.id} className="hover:bg-gray-50 transition-colors group">
                    
                    {/* Submission Date */}
                    <td className="p-4 text-gray-400 text-xs">
                       {formatSubmissionTime(apt.submissionTimestamp)}
                    </td>

                    {/* Appointment Slot */}
                    <td className="p-4">
                        <div className="flex items-center gap-2 font-mono text-nova-dark">
                           <Calendar size={14} className="text-nova-teal"/>
                           <span>{formatDate(apt.appointmentDate)}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 font-mono">
                           <Clock size={12}/>
                           <span>{apt.appointmentTime}</span>
                        </div>
                    </td>

                    {/* Client Details */}
                    <td className="p-4 relative">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 font-bold text-nova-dark">
                             <User size={12}/> {apt.clientName}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                             <Phone size={12}/> {apt.clientPhone}
                          </div>
                          <div className="text-[10px] text-gray-400 pl-4">
                             {apt.clientEmail}
                          </div>
                        </div>
                        {apt.notes && (
                           <div className="mt-2 text-[10px] bg-yellow-50 text-yellow-700 p-2 rounded border border-yellow-100 max-w-[200px]">
                              "{apt.notes}"
                           </div>
                        )}
                    </td>

                    {/* Service */}
                    <td className="p-4">
                         <span className="inline-block text-[11px] bg-nova-teal/5 text-nova-teal px-3 py-1 rounded-full font-bold uppercase tracking-wide border border-nova-teal/10">
                              {apt.service}
                         </span>
                    </td>

                    {/* Status */}
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide
                        ${apt.status === 'confirmed' ? 'bg-green-100 text-green-700' : 
                          apt.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-600'}
                      `}>
                        {apt.status}
                      </span>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
