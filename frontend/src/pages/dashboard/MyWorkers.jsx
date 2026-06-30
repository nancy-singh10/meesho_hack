import React, { useState } from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { Users, Search, ShieldCheck, MapPin, IndianRupee, ArrowRight, Star, History } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const MyWorkers = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [selectedWorkerHistory, setSelectedWorkerHistory] = useState(null);
  const [sendingOfferId, setSendingOfferId] = useState(null);
  const [sentOffers, setSentOffers] = useState({});

  const handleRehire = (workerId) => {
    setSendingOfferId(workerId);
    setTimeout(() => {
        setSendingOfferId(null);
        setSentOffers(prev => ({ ...prev, [workerId]: true }));
    }, 1500);
  };

  // Mock data for workers the employer has hired before
  const workers = [
    {
      id: 'SHRAM-IN-7821',
      name: 'Ramesh Kumar',
      role: 'Master Mason',
      trustScore: 94,
      location: 'Sector 62, Noida',
      totalPaid: '₹45,600',
      jobsCompleted: 3,
      lastWorked: '2 days ago',
      rating: 4.9,
      image: '/images/workers/ramesh.png',
      isAvailable: true,
      history: [
        { id: 1, title: 'Master Mason', date: 'June 15 - June 28, 2026', paid: '₹15,200', rating: 5, review: 'Excellent work, very punctual and maintained high quality.', location: 'Sector 62, Noida' },
        { id: 2, title: 'Bricklaying', date: 'April 10 - April 22, 2026', paid: '₹14,000', rating: 5, review: 'Great finish on the boundary walls.', location: 'Sector 62, Noida' },
        { id: 3, title: 'Mason', date: 'Jan 5 - Jan 20, 2026', paid: '₹16,400', rating: 4.8, review: 'Good speed, reliable worker.', location: 'Indirapuram' }
      ]
    },
    {
      id: 'SHRAM-IN-2291',
      name: 'Suresh Das',
      role: 'Site Helper',
      trustScore: 82,
      location: 'Indirapuram',
      totalPaid: '₹12,400',
      jobsCompleted: 1,
      lastWorked: '1 month ago',
      rating: 4.5,
      image: '/images/workers/suresh.png',
      isAvailable: false,
      history: [
        { id: 1, title: 'Site Helper', date: 'May 1 - May 20, 2026', paid: '₹12,400', rating: 4.5, review: 'Hardworking and follows instructions well.', location: 'Indirapuram' }
      ]
    },
    {
      id: 'SHRAM-IN-4412',
      name: 'Vikash Singh',
      role: 'Electrician',
      trustScore: 88,
      location: 'Ghaziabad',
      totalPaid: '₹28,500',
      jobsCompleted: 2,
      lastWorked: '15 days ago',
      rating: 4.8,
      image: '/images/workers/vikash.png',
      isAvailable: true,
      history: [
        { id: 1, title: 'Electrician - Wiring', date: 'June 1 - June 10, 2026', paid: '₹15,000', rating: 4.9, review: 'Perfect wiring job, no issues.', location: 'Ghaziabad' },
        { id: 2, title: 'Electrician - Fittings', date: 'March 15 - March 25, 2026', paid: '₹13,500', rating: 4.7, review: 'Good work on all light fittings.', location: 'Ghaziabad' }
      ]
    }
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8 pb-20">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
                <div className="flex items-center gap-2 text-[#FF6B4A] font-bold text-xs tracking-wider uppercase mb-2">
                    <Users size={16} /> Talent Roster
                </div>
                <h2 className="text-3xl font-black text-[#11111A] tracking-tight mb-2">My Workers</h2>
                <p className="text-[#4A4A5A] font-medium">Manage and rehire workers from your previous projects.</p>
            </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white border border-gray-100 shadow-xl shadow-gray-200/40 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between sticky top-0 z-20">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, ID, or skill..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E234C] transition-all font-medium"
            />
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto hide-scrollbar">
            {['All', 'Available Now', 'Top Rated', 'Masons', 'Electricians'].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  filter === f 
                  ? 'bg-[#1E234C] text-white shadow-md' 
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Workers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnimatePresence>
                {workers.map((worker, idx) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        key={worker.id}
                        className="bg-white border border-gray-100 shadow-xl shadow-gray-200/40 rounded-3xl overflow-hidden flex flex-col sm:flex-row group hover:border-[#1E234C]/30 transition-colors"
                    >
                        {/* Profile Image Column */}
                        <div className="sm:w-2/5 relative h-48 sm:h-auto overflow-hidden">
                            <div className="absolute inset-0 bg-[#1E234C]/20 z-10 group-hover:bg-transparent transition-colors"></div>
                            <img src={worker.image} alt={worker.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            
                            {/* Availability Badge */}
                            <div className="absolute top-4 left-4 z-20">
                                {worker.isAvailable ? (
                                    <span className="bg-emerald-500/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-lg border border-emerald-400">
                                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div> Available
                                    </span>
                                ) : (
                                    <span className="bg-gray-900/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                                        On Another Job
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Info Column */}
                        <div className="sm:w-3/5 p-6 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-xl font-black text-[#11111A] tracking-tight">{worker.name}</h3>
                                        <p className="text-sm font-medium text-[#4A4A5A]">{worker.role}</p>
                                    </div>
                                    <div className="flex items-center gap-1 bg-orange-50 text-[#FF6B4A] px-2 py-1 rounded font-bold text-xs border border-orange-100">
                                        <Star size={12} className="fill-current" /> {worker.rating}
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 font-mono mb-4">{worker.id}</p>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div>
                                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Trust Score</p>
                                        <p className="font-bold text-emerald-600 flex items-center gap-1">
                                            <ShieldCheck size={14} /> {worker.trustScore}/100
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Paid</p>
                                        <p className="font-bold text-[#11111A]">{worker.totalPaid}</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Location</p>
                                        <p className="font-bold text-[#11111A] text-xs truncate" title={worker.location}>{worker.location}</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">History</p>
                                        <p className="font-bold text-[#11111A] text-xs">{worker.jobsCompleted} jobs completed</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                                <button 
                                    onClick={() => setSelectedWorkerHistory(worker)}
                                    className="flex-1 bg-gray-50 hover:bg-gray-100 text-[#4A4A5A] font-bold py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-2 border border-gray-200"
                                >
                                    <History size={16} /> View History
                                </button>
                                <button 
                                    onClick={() => handleRehire(worker.id)}
                                    disabled={!worker.isAvailable || sendingOfferId === worker.id || sentOffers[worker.id]}
                                    className={`flex-1 font-bold py-3 rounded-xl transition-all shadow-md text-sm flex items-center justify-center gap-2 ${
                                        sentOffers[worker.id] 
                                        ? 'bg-emerald-500 text-white cursor-default' 
                                        : sendingOfferId === worker.id 
                                            ? 'bg-gray-200 text-gray-500 cursor-wait' 
                                            : 'bg-[#1E234C] hover:bg-[#15193B] text-white hover:-translate-y-0.5 disabled:opacity-50'
                                    }`}
                                >
                                    {sentOffers[worker.id] ? (
                                        <><ShieldCheck size={16} /> Offer Sent ✓</>
                                    ) : sendingOfferId === worker.id ? (
                                        'Sending...'
                                    ) : (
                                        <>Rehire <ArrowRight size={16} /></>
                                    )}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>

        {/* History Modal */}
        <AnimatePresence>
            {selectedWorkerHistory && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#11111A]/60 backdrop-blur-sm"
                    onClick={() => setSelectedWorkerHistory(null)}
                >
                    <motion.div 
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        onClick={e => e.stopPropagation()}
                        className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-2xl max-h-[85vh] flex flex-col"
                    >
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10">
                            <div className="flex items-center gap-4">
                                <img src={selectedWorkerHistory.image} alt={selectedWorkerHistory.name} className="w-14 h-14 rounded-full object-cover border-2 border-gray-100" />
                                <div>
                                    <h3 className="text-2xl font-black text-[#11111A] tracking-tight">{selectedWorkerHistory.name}'s History</h3>
                                    <p className="text-[#4A4A5A] font-medium text-sm">{selectedWorkerHistory.jobsCompleted} Jobs Completed • {selectedWorkerHistory.rating} <Star size={12} className="inline text-orange-500 fill-current mb-1" /></p>
                                </div>
                            </div>
                            <button onClick={() => setSelectedWorkerHistory(null)} className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 transition-colors">
                                ✕
                            </button>
                        </div>
                        
                        <div className="p-6 overflow-y-auto bg-gray-50/50 flex-1">
                            <div className="space-y-4">
                                {selectedWorkerHistory.history.map((job) => (
                                    <div key={job.id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <h4 className="font-bold text-lg text-[#11111A]">{job.title}</h4>
                                                <p className="text-sm font-medium text-gray-500">{job.date}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-black text-emerald-600 text-lg">{job.paid}</p>
                                                <div className="flex items-center justify-end gap-1 text-orange-500 text-xs font-bold mt-1">
                                                    {Array(5).fill(0).map((_, i) => (
                                                        <Star key={i} size={12} className={i < Math.floor(job.rating) ? "fill-current" : "text-gray-300"} />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                                            <MapPin size={12} /> {job.location}
                                        </div>
                                        <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm text-[#4A4A5A] font-medium italic">
                                            "{job.review}"
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="p-6 border-t border-gray-100 bg-white flex justify-end gap-3">
                            <button onClick={() => setSelectedWorkerHistory(null)} className="px-6 py-3 rounded-xl font-bold text-[#4A4A5A] hover:bg-gray-100 transition-colors">Close</button>
                            <button 
                                onClick={() => {
                                    handleRehire(selectedWorkerHistory.id);
                                    // Optional: close modal after a delay or keep it open so they see the success state
                                    // setSelectedWorkerHistory(null);
                                }} 
                                disabled={!selectedWorkerHistory.isAvailable || sendingOfferId === selectedWorkerHistory.id || sentOffers[selectedWorkerHistory.id]}
                                className={`px-8 py-3 rounded-xl font-bold transition-all shadow-md flex items-center gap-2 ${
                                    sentOffers[selectedWorkerHistory.id] 
                                    ? 'bg-emerald-500 text-white cursor-default' 
                                    : sendingOfferId === selectedWorkerHistory.id 
                                        ? 'bg-gray-200 text-gray-500 cursor-wait' 
                                        : 'bg-[#1E234C] hover:bg-[#15193B] text-white hover:-translate-y-0.5 disabled:opacity-50'
                                }`}
                            >
                                {sentOffers[selectedWorkerHistory.id] ? (
                                    <><ShieldCheck size={16} /> Offer Sent ✓</>
                                ) : sendingOfferId === selectedWorkerHistory.id ? (
                                    'Sending...'
                                ) : (
                                    <>Rehire Now <ArrowRight size={16} /></>
                                )}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

      </div>
    </DashboardLayout>
  );
};

export default MyWorkers;
