import React, { useState } from 'react';
import WorkerLayout from '../../components/worker/WorkerLayout';
import { Search, MapPin, Star, ShieldCheck, ArrowRight, ShieldAlert, Navigation, Filter, CheckCircle2, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WorkerJobs = () => {
  const [activeFilter, setActiveFilter] = useState('Recommended');
  const [swipedJobs, setSwipedJobs] = useState([]);

  const jobs = [
    {
      id: 1,
      title: 'Senior Plastering Mason',
      employer: 'Bhardwaj Constructions',
      wage: '₹950',
      duration: '14 days',
      distance: '1.2 km',
      location: 'Sector 62, Noida',
      fraudScore: 'Safe',
      fraudVal: 92,
      skills: ['Wall Plastering', 'Cement Mixing'],
      isUrgent: true,
      matchScore: '98%',
    },
    {
      id: 2,
      title: 'Site Helper / Laborer',
      employer: 'Sharma Builders',
      wage: '₹600',
      duration: '7 days',
      distance: '3.5 km',
      location: 'Indirapuram, Ghaziabad',
      fraudScore: 'Caution',
      fraudVal: 74,
      skills: ['Heavy Lifting', 'Site Cleanup'],
      isUrgent: false,
      matchScore: '85%',
    },
    {
      id: 3,
      title: 'Tile Mason',
      employer: 'Apex Infra',
      wage: '₹1100',
      duration: '30 days',
      distance: '8.1 km',
      location: 'Vasant Kunj, Delhi',
      fraudScore: 'Safe',
      fraudVal: 88,
      skills: ['Floor Tiling', 'Marble Fitting'],
      isUrgent: false,
      matchScore: '92%',
    }
  ];

  const handleApply = (id) => {
      if(!swipedJobs.includes(id)){
          setSwipedJobs([...swipedJobs, id]);
      }
  };

  const getFraudColors = (score) => {
      if (score === 'Safe') return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      if (score === 'Caution') return 'bg-amber-50 text-amber-600 border-amber-200';
      return 'bg-red-50 text-red-600 border-red-200';
  };

  return (
    <WorkerLayout 
      title="Job Discovery" 
      subtitle="AI-matched opportunities near you"
    >
      <div className="p-8 max-w-7xl mx-auto space-y-6 pb-20">
        
        {/* Top Search & Filter Bar */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between sticky top-0 z-20">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search skills, employers, or locations..." 
              className="w-full bg-gray-50 border-none rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B4A]/20 transition-all text-[#11111A]"
            />
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto hide-scrollbar">
            {['Recommended', 'Highest Paying', 'Nearest', 'Safest (Zero Fraud)'].map(filter => (
              <button 
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeFilter === filter 
                  ? 'bg-[#1E234C] text-white shadow-md' 
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {filter}
              </button>
            ))}
            <button className="p-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 shrink-0 ml-2">
                <Filter size={18} />
            </button>
          </div>
        </div>

        {/* Discovery Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <motion.div 
              key={job.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border border-gray-200 shadow-sm rounded-3xl overflow-hidden group hover:shadow-md transition-all flex flex-col h-full relative"
            >
                {/* Visual Map Header */}
                <div className="h-32 bg-gray-100 relative overflow-hidden border-b border-gray-200">
                    <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                        <defs><pattern id={`grid-${job.id}`} width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="#9CA3AF" strokeWidth="0.5"/></pattern></defs>
                        <rect width="100%" height="100%" fill={`url(#grid-${job.id})`} />
                        <path d="M -50 50 Q 100 100 150 20 T 350 100 T 500 50" fill="none" stroke="#1E234C" strokeWidth="4" className="opacity-10"/>
                    </svg>
                    
                    {/* Distance Badge */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 border border-gray-100">
                        <Navigation size={12} className="text-[#FF6B4A]" />
                        <span className="text-xs font-bold text-[#11111A]">{job.distance} away</span>
                    </div>

                    {job.isUrgent && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
                            <Clock size={12} />
                            <span className="text-[10px] font-bold uppercase tracking-wider">Urgent</span>
                        </div>
                    )}
                </div>

                {/* Job Content */}
                <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-xl font-bold text-[#11111A] group-hover:text-[#FF6B4A] transition-colors leading-tight mb-1">{job.title}</h3>
                            <p className="text-sm font-medium text-[#4A4A5A]">{job.employer}</p>
                        </div>
                        <div className="bg-orange-50 text-[#FF6B4A] font-bold text-sm px-2 py-1 rounded-lg border border-orange-100 shrink-0">
                            {job.matchScore} Match
                        </div>
                    </div>

                    <div className="flex items-center gap-2 mb-6">
                        <MapPin size={14} className="text-gray-400" />
                        <span className="text-xs text-gray-500 font-medium">{job.location}</span>
                    </div>

                    {/* Key Metrics Grid */}
                    <div className="grid grid-cols-3 gap-2 mb-6">
                        <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 flex flex-col justify-center">
                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Daily Wage</span>
                            <span className="font-bold text-[#11111A]">{job.wage}</span>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 flex flex-col justify-center">
                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Duration</span>
                            <span className="font-bold text-[#11111A]">{job.duration}</span>
                        </div>
                        <div className={`rounded-xl p-3 border flex flex-col justify-center ${getFraudColors(job.fraudScore)}`}>
                            <span className="text-[10px] font-bold uppercase tracking-wider mb-1 opacity-80">Fraud Score</span>
                            <div className="flex items-center gap-1">
                                <span className="font-bold">{job.fraudVal}</span>
                                {job.fraudScore === 'Safe' ? <ShieldCheck size={14} /> : <ShieldAlert size={14} />}
                            </div>
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                        {job.skills.map(skill => (
                            <span key={skill} className="bg-white border border-gray-200 text-[#4A4A5A] text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md">
                                {skill}
                            </span>
                        ))}
                    </div>

                    {/* Action Button */}
                    <button 
                        onClick={() => handleApply(job.id)}
                        disabled={swipedJobs.includes(job.id)}
                        className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                            swipedJobs.includes(job.id)
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                            : 'bg-[#1E234C] text-white hover:bg-[#2a316a] hover:shadow-lg hover:-translate-y-1'
                        }`}
                    >
                        {swipedJobs.includes(job.id) ? (
                            <>Applied & AI Negotiating <CheckCircle2 size={18} /></>
                        ) : (
                            <>Apply & Auto-Negotiate <ArrowRight size={18} /></>
                        )}
                    </button>
                </div>
            </motion.div>
          ))}
        </div>

      </div>
    </WorkerLayout>
  );
};

export default WorkerJobs;
