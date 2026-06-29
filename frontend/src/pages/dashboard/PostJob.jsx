import React, { useState } from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Briefcase, MapPin, IndianRupee, Clock, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';

const PostJob = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    
    // Form State
    const [jobData, setJobData] = useState({
        title: '',
        location: '',
        wage: '',
        duration: '',
        description: ''
    });

    const handleNext = () => setStep(2);
    const handleBack = () => setStep(1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call and Blockchain Minting
        setTimeout(() => {
            navigate('/dashboard'); // Temporarily route to dashboard instead of /jobs/1/matches since this is a prototype
        }, 1500);
    };

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto py-8">
                
                {/* Stepper Header */}
                <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step === 1 ? 'bg-[#FF6B4A] text-white shadow-lg shadow-orange-500/30' : 'bg-[#1E234C] text-white'}`}>1</div>
                        <h2 className={`font-bold ${step === 1 ? 'text-[#11111A]' : 'text-gray-400'}`}>Job Details</h2>
                    </div>
                    <div className="flex-1 h-px bg-gray-200 mx-6"></div>
                    <div className="flex items-center gap-4">
                        <h2 className={`font-bold ${step === 2 ? 'text-[#11111A]' : 'text-gray-400'}`}>Smart Escrow Funding</h2>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step === 2 ? 'bg-[#FF6B4A] text-white shadow-lg shadow-orange-500/30' : 'bg-gray-100 text-gray-400'}`}>2</div>
                    </div>
                </div>

                <div className="bg-white border border-gray-100 shadow-xl shadow-gray-200/40 rounded-3xl overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-[100px] opacity-40 pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
                    
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div 
                                key="step1"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="p-8 md:p-12 relative z-10"
                            >
                                <div className="mb-8">
                                    <h2 className="text-3xl font-black text-[#11111A] mb-2 tracking-tight">Create Smart Contract</h2>
                                    <p className="text-[#4A4A5A] font-medium">Define your requirements. Our AI will match you with verified workers.</p>
                                </div>

                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-bold text-[#1E234C] uppercase tracking-wider mb-2">Job Title / Skill</label>
                                            <div className="relative">
                                                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                <input 
                                                    type="text" 
                                                    value={jobData.title}
                                                    onChange={e => setJobData({...jobData, title: e.target.value})}
                                                    placeholder="e.g. Master Tile Mason" 
                                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#1E234C] focus:border-transparent transition-all outline-none font-medium"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-[#1E234C] uppercase tracking-wider mb-2">Location</label>
                                            <div className="relative">
                                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                <input 
                                                    type="text" 
                                                    value={jobData.location}
                                                    onChange={e => setJobData({...jobData, location: e.target.value})}
                                                    placeholder="e.g. Sector 62, Noida" 
                                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#1E234C] focus:border-transparent transition-all outline-none font-medium"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-bold text-[#1E234C] uppercase tracking-wider mb-2">Daily Wage (₹)</label>
                                            <div className="relative">
                                                <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                <input 
                                                    type="number" 
                                                    value={jobData.wage}
                                                    onChange={e => setJobData({...jobData, wage: e.target.value})}
                                                    placeholder="800" 
                                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#1E234C] focus:border-transparent transition-all outline-none font-medium"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-[#1E234C] uppercase tracking-wider mb-2">Duration (Days)</label>
                                            <div className="relative">
                                                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                <input 
                                                    type="number" 
                                                    value={jobData.duration}
                                                    onChange={e => setJobData({...jobData, duration: e.target.value})}
                                                    placeholder="14" 
                                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#1E234C] focus:border-transparent transition-all outline-none font-medium"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-[#1E234C] uppercase tracking-wider mb-2">Detailed Requirements</label>
                                        <textarea 
                                            rows="4" 
                                            value={jobData.description}
                                            onChange={e => setJobData({...jobData, description: e.target.value})}
                                            placeholder="Describe the exact work needed. Our AI will extract skills automatically..." 
                                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#1E234C] focus:border-transparent transition-all outline-none font-medium resize-none"
                                        ></textarea>
                                    </div>
                                    
                                    <div className="pt-4 flex justify-end">
                                        <button 
                                            type="button" 
                                            onClick={handleNext}
                                            className="bg-[#1E234C] hover:bg-[#151936] text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-md flex items-center gap-2 hover:-translate-y-0.5"
                                        >
                                            Continue to Escrow <ArrowRight size={18} />
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div 
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="p-8 md:p-12 relative z-10"
                            >
                                <div className="mb-8">
                                    <h2 className="text-3xl font-black text-[#11111A] mb-2 tracking-tight">Fund Smart Escrow</h2>
                                    <p className="text-[#4A4A5A] font-medium">To activate this job on the Shram Network, lock the initial funds in escrow.</p>
                                </div>

                                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-8">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-[#4A4A5A] font-bold text-sm">Estimated Total Cost</span>
                                        <span className="text-2xl font-black text-[#11111A]">₹{((jobData.wage || 0) * (jobData.duration || 0)).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-4 border-t border-dashed border-gray-300">
                                        <div className="flex items-center gap-2">
                                            <ShieldCheck size={18} className="text-[#FF6B4A]" />
                                            <span className="text-[#1E234C] font-bold">Required Escrow Deposit (50%)</span>
                                        </div>
                                        <span className="text-2xl font-black text-[#FF6B4A]">₹{(((jobData.wage || 0) * (jobData.duration || 0)) * 0.5).toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 mb-8">
                                    <Sparkles size={20} className="text-blue-600 shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="text-sm font-bold text-blue-900 mb-1">Why Escrow?</h4>
                                        <p className="text-xs text-blue-800 font-medium leading-relaxed">Funds are locked in a smart contract and only released when you approve the worker's daily GPS attendance and Proof of Work photos. This guarantees trust for both parties.</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <button 
                                        type="button" 
                                        onClick={handleBack}
                                        className="text-gray-500 hover:text-[#11111A] font-bold transition-colors flex items-center gap-2 px-4 py-2"
                                    >
                                        <ArrowLeft size={18} /> Back
                                    </button>
                                    <button 
                                        onClick={handleSubmit}
                                        disabled={loading}
                                        className="bg-[#FF6B4A] hover:bg-[#E55A39] text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-orange-500/30 flex items-center gap-2 hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
                                    >
                                        {loading ? 'Minting Smart Contract...' : 'Pay & Publish Job'}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default PostJob;
