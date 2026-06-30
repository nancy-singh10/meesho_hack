import React, { useState } from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Briefcase, MapPin, IndianRupee, Clock, ShieldCheck, ArrowRight, ArrowLeft, History, MessageSquare, Star } from 'lucide-react';

const PostJob = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [isMatching, setIsMatching] = useState(false);
    const [matchedWorkers, setMatchedWorkers] = useState([]);
    const [sendingOfferId, setSendingOfferId] = useState(null);
    const [sentOffers, setSentOffers] = useState({});
    const [selectedWorkerHistory, setSelectedWorkerHistory] = useState(null);

    const handleSendOffer = (workerId) => {
        setSendingOfferId(workerId);
        setTimeout(() => {
            setSendingOfferId(null);
            setSentOffers(prev => ({ ...prev, [workerId]: true }));
        }, 1200);
    };
    
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
        // Simulate Escrow Funding
        setTimeout(() => {
            setLoading(false);
            setStep(3);
            setIsMatching(true);
            
            // Simulate AI Matching duration
            setTimeout(() => {
                setIsMatching(false);
                setMatchedWorkers([
                    { id: 1, name: "Ramesh Kumar", role: "Expert Mason", rating: 4.8, jobs: 47, score: 847, wage: "₹950/day", match: "98%", distance: "2.4 km", image: "/images/workers/ramesh.png", history: [
                        { id: 1, title: 'Master Mason', date: 'June 15 - June 28, 2026', paid: '₹15,200', rating: 5, review: 'Excellent work, very punctual and maintained high quality.', location: 'Sector 62, Noida' },
                        { id: 2, title: 'Bricklaying', date: 'April 10 - April 22, 2026', paid: '₹14,000', rating: 5, review: 'Great finish on the boundary walls.', location: 'Sector 62, Noida' }
                    ]},
                    { id: 2, name: "Suresh Singh", role: "Tile Mason", rating: 4.6, jobs: 32, score: 792, wage: "₹900/day", match: "94%", distance: "3.1 km", image: "/images/workers/suresh.png", history: [
                        { id: 1, title: 'Site Helper', date: 'May 1 - May 20, 2026', paid: '₹12,400', rating: 4.5, review: 'Hardworking and follows instructions well.', location: 'Indirapuram' }
                    ]},
                    { id: 3, name: "Pappu Yadav", role: "Mason Helper", rating: 4.9, jobs: 89, score: 910, wage: "₹850/day", match: "88%", distance: "5.0 km", image: "/images/workers/vikash.png", history: [
                        { id: 1, title: 'Helper - Mixing', date: 'June 1 - June 10, 2026', paid: '₹8,500', rating: 4.9, review: 'Very strong and consistent worker.', location: 'Ghaziabad' }
                    ]}
                ]);
            }, 2500);
        }, 1500);
    };

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto py-8">
                
                {/* Stepper Header */}
                <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step === 1 ? 'bg-[#FF6B4A] text-white shadow-lg shadow-orange-500/30' : 'bg-[#1E234C] text-white'}`}>1</div>
                        <h2 className={`hidden sm:block font-bold ${step === 1 ? 'text-[#11111A]' : 'text-gray-400'}`}>Job Details</h2>
                    </div>
                    <div className="flex-1 h-px bg-gray-200 mx-4"></div>
                    <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step === 2 ? 'bg-[#FF6B4A] text-white shadow-lg shadow-orange-500/30' : (step > 2 ? 'bg-[#1E234C] text-white' : 'bg-gray-100 text-gray-400')}`}>2</div>
                        <h2 className={`hidden sm:block font-bold ${step === 2 ? 'text-[#11111A]' : 'text-gray-400'}`}>Fund Escrow</h2>
                    </div>
                    <div className="flex-1 h-px bg-gray-200 mx-4"></div>
                    <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step === 3 ? 'bg-[#FF6B4A] text-white shadow-lg shadow-orange-500/30' : 'bg-gray-100 text-gray-400'}`}>3</div>
                        <h2 className={`hidden sm:block font-bold ${step === 3 ? 'text-[#11111A]' : 'text-gray-400'}`}>AI Match</h2>
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
                        {step === 3 && (
                            <motion.div 
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="p-8 md:p-12 relative z-10"
                            >
                                {isMatching ? (
                                    <div className="flex flex-col items-center justify-center py-20 text-center">
                                        <div className="relative w-24 h-24 mb-8">
                                            <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
                                            <div className="absolute inset-0 border-4 border-[#FF6B4A] rounded-full border-t-transparent animate-spin"></div>
                                            <Sparkles className="absolute inset-0 m-auto text-[#1E234C]" size={32} />
                                        </div>
                                        <h2 className="text-3xl font-black text-[#11111A] mb-4 tracking-tight animate-pulse">Agentic AI Matching...</h2>
                                        <p className="text-[#4A4A5A] font-medium text-lg max-w-md mx-auto">Searching Shram Network and scanning Pinecone Vector DB for the best verified workers in your area.</p>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="mb-8 flex justify-between items-end">
                                            <div>
                                                <h2 className="text-3xl font-black text-[#11111A] mb-2 tracking-tight">Top Matched Workers</h2>
                                                <p className="text-[#4A4A5A] font-medium">We found {matchedWorkers.length} verified workers for this job.</p>
                                            </div>
                                            <button onClick={() => navigate('/dashboard')} className="text-[#FF6B4A] font-bold hover:underline flex items-center gap-1">Dashboard <ArrowRight size={16}/></button>
                                        </div>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            {matchedWorkers.map(worker => (
                                                <div key={worker.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-lg shadow-gray-200/40 relative overflow-hidden group hover:-translate-y-1 transition-all">
                                                    <div className="absolute top-0 right-0 bg-[#FF6B4A] text-white text-[10px] font-black px-3 py-1 rounded-bl-xl z-10">
                                                        {worker.match} MATCH
                                                    </div>
                                                    <div className="flex items-center gap-4 mb-4">
                                                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-black text-xl shrink-0 overflow-hidden shadow-inner">
                                                            {worker.image ? <img src={worker.image} alt={worker.name} className="w-full h-full object-cover" /> : worker.name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <h3 className="font-black text-[#11111A] leading-tight">{worker.name}</h3>
                                                            <p className="text-xs text-gray-500 font-bold">{worker.role}</p>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="grid grid-cols-2 gap-2 mb-6">
                                                        <div className="bg-gray-50 p-2 rounded-lg">
                                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Trust Score</p>
                                                            <p className="font-black text-[#1E234C] text-lg">{worker.score}</p>
                                                        </div>
                                                        <div className="bg-gray-50 p-2 rounded-lg">
                                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Verified Jobs</p>
                                                            <p className="font-black text-[#1E234C] text-lg">{worker.jobs}</p>
                                                        </div>
                                                        <div className="bg-gray-50 p-2 rounded-lg col-span-2">
                                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Negotiated Wage (Agent)</p>
                                                            <p className="font-black text-emerald-600 text-lg">{worker.wage}</p>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex gap-2 mt-4">
                                                        <button 
                                                            onClick={() => setSelectedWorkerHistory(worker)}
                                                            className="flex-1 py-2.5 rounded-xl font-bold bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors text-sm flex items-center justify-center gap-1 border border-gray-200"
                                                        >
                                                            <History size={14} /> History
                                                        </button>
                                                        <button 
                                                            onClick={() => handleSendOffer(worker.id)}
                                                            disabled={sendingOfferId === worker.id || sentOffers[worker.id]}
                                                            className={`flex-[2] py-2.5 rounded-xl font-bold transition-colors shadow-md text-sm flex items-center justify-center gap-2 ${
                                                                sentOffers[worker.id] 
                                                                ? 'bg-emerald-500 text-white cursor-default' 
                                                                : sendingOfferId === worker.id 
                                                                    ? 'bg-gray-200 text-gray-500 cursor-wait' 
                                                                    : 'bg-[#1E234C] hover:bg-[#151936] text-white'
                                                            }`}
                                                        >
                                                            {sentOffers[worker.id] ? (
                                                                <><ShieldCheck size={16} /> Offer Sent ✓</>
                                                            ) : sendingOfferId === worker.id ? (
                                                                'Sending via Agent...'
                                                            ) : (
                                                                <><MessageSquare size={16} /> Send Offer</>
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
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
                                        <p className="text-[#4A4A5A] font-medium text-sm">{selectedWorkerHistory.jobs} Jobs Completed • {selectedWorkerHistory.rating} <Star size={12} className="inline text-orange-500 fill-current mb-1" /></p>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedWorkerHistory(null)} className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 transition-colors">
                                    ✕
                                </button>
                            </div>
                            
                            <div className="p-6 overflow-y-auto bg-gray-50/50 flex-1">
                                <div className="space-y-4">
                                    {selectedWorkerHistory.history && selectedWorkerHistory.history.map((job) => (
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
                                        handleSendOffer(selectedWorkerHistory.id);
                                        setSelectedWorkerHistory(null);
                                    }} 
                                    disabled={sentOffers[selectedWorkerHistory.id]}
                                    className="bg-[#FF6B4A] hover:bg-[#E55A39] text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md flex items-center gap-2"
                                >
                                    Send WhatsApp Offer <ArrowRight size={16} />
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </DashboardLayout>
    );
};

export default PostJob;
