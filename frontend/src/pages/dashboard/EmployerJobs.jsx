import React, { useState } from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { Briefcase, MapPin, IndianRupee, Clock, ArrowRight, CheckCircle2, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const EmployerJobs = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    
    const [jobs, setJobs] = useState([
        {
            id: 'JOB-9982',
            title: 'Master Mason',
            location: 'Sector 62, Noida',
            wage: 950,
            duration: 14,
            status: 'matching',
            matches: 3,
            postedAt: '2 hours ago'
        },
        {
            id: 'JOB-8124',
            title: 'Site Helper',
            location: 'Indirapuram',
            wage: 650,
            duration: 30,
            status: 'active',
            matches: 12,
            postedAt: '3 days ago'
        },
        {
            id: 'JOB-4412',
            title: 'Electrician',
            location: 'Ghaziabad',
            wage: 1200,
            duration: 5,
            status: 'completed',
            matches: 8,
            postedAt: '1 month ago'
        }
    ]);

    return (
        <DashboardLayout>
            <div className="max-w-6xl mx-auto space-y-8 pb-20">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-[#FF6B4A] font-bold text-xs tracking-wider uppercase mb-2">
                            <Briefcase size={16} /> Job Postings
                        </div>
                        <h2 className="text-3xl font-black text-[#11111A] tracking-tight mb-2">My Posted Jobs</h2>
                        <p className="text-[#4A4A5A] font-medium">Track your job postings and find the best matches.</p>
                    </div>
                    <button 
                        onClick={() => navigate('/dashboard/post-job')}
                        className="bg-[#1E234C] hover:bg-[#151936] text-white px-6 py-3 rounded-xl font-bold shadow-md transition-colors flex items-center gap-2"
                    >
                        Post a New Job
                    </button>
                </div>

                <div className="bg-white border border-gray-100 shadow-xl shadow-gray-200/40 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between sticky top-0 z-20">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search jobs..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E234C] transition-all font-medium"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    <AnimatePresence>
                    {jobs.map((job, i) => (
                        <motion.div
                            key={job.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-xl shadow-gray-200/40 relative group hover:border-[#1E234C]/30 transition-colors"
                        >
                            <div className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#1E234C] rounded-full blur-[80px] opacity-10 pointer-events-none translate-x-1/2 -translate-y-1/2 group-hover:bg-[#FF6B4A] transition-colors"></div>
                                
                                <div className="flex-1 relative z-10">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="font-black text-2xl text-[#11111A] tracking-tight">{job.title}</h3>
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm ${
                                            job.status === 'matching' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                            job.status === 'active' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                            'bg-emerald-50 text-emerald-600 border-emerald-100'
                                        }`}>
                                            {job.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 font-medium flex items-center gap-4">
                                        <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                                        <span className="flex items-center gap-1"><Clock size={14} /> Posted {job.postedAt}</span>
                                    </p>
                                    
                                    <div className="flex items-center gap-6 mt-6">
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Wage / Duration</p>
                                            <p className="font-bold text-[#11111A]">₹{job.wage}/day <span className="text-gray-400 font-medium">for {job.duration} days</span></p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Matches found</p>
                                            <p className="font-bold text-[#FF6B4A]">{job.matches} Verified Workers</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="relative z-10 flex flex-col gap-3 min-w-[200px]">
                                    {job.status === 'matching' ? (
                                        <button onClick={() => navigate('/dashboard/post-job')} className="w-full bg-[#1E234C] hover:bg-[#15193B] text-white px-6 py-4 rounded-xl font-bold transition-all shadow-md text-sm flex items-center justify-center gap-2 hover:-translate-y-1">
                                            View Matches <ArrowRight size={16} />
                                        </button>
                                    ) : job.status === 'active' ? (
                                        <button onClick={() => navigate('/dashboard/contracts')} className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl font-bold transition-all shadow-md text-sm flex items-center justify-center gap-2 hover:-translate-y-1">
                                            Manage Contract <ArrowRight size={16} />
                                        </button>
                                    ) : (
                                        <button disabled className="w-full bg-gray-100 text-gray-400 px-6 py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 cursor-not-allowed">
                                            <CheckCircle2 size={16} /> Job Completed
                                        </button>
                                    )}
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

export default EmployerJobs;
