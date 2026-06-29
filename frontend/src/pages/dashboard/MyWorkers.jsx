import React, { useState } from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { Users, Search, ShieldCheck, MapPin, IndianRupee, ArrowRight, Star, History } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MyWorkers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

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
      image: 'https://images.unsplash.com/photo-1506803682981-6e718a9dd3ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      isAvailable: true
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
      image: 'https://images.unsplash.com/photo-1543269664-7eef42226a21?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      isAvailable: false
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
      image: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      isAvailable: true
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
                                <button className="flex-1 bg-gray-50 hover:bg-gray-100 text-[#4A4A5A] font-bold py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-2 border border-gray-200">
                                    <History size={16} /> View History
                                </button>
                                <button 
                                    disabled={!worker.isAvailable}
                                    className="flex-1 bg-[#1E234C] hover:bg-[#15193B] text-white font-bold py-3 rounded-xl transition-all shadow-md text-sm flex items-center justify-center gap-2 disabled:opacity-50 hover:-translate-y-0.5"
                                >
                                    Rehire <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default MyWorkers;
