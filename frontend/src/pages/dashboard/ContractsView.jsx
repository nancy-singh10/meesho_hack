import React, { useState } from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { FileText, CheckCircle2, IndianRupee, Loader2, Clock, ShieldCheck, ArrowRight, MapPin, Map, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ContractsView = () => {
    const [loading, setLoading] = useState(false);
    
    // Advanced Mock Data for Smart Contracts
    const [contracts, setContracts] = useState([
        { 
            id: 'SC-9982', 
            workerName: 'Ramesh Kumar', 
            role: 'Master Mason', 
            wage: 950, 
            status: 'attendance_pending',
            location: 'Sector 62, Noida',
            attendance: {
                status: 'Worker checked in via GPS',
                time: '08:15 AM',
                proof_uploaded: true,
                image: 'https://images.unsplash.com/photo-1504307651254-35680f356f12?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
            }
        },
        { 
            id: 'SC-8124', 
            workerName: 'Suresh Das', 
            role: 'Site Helper', 
            wage: 650, 
            status: 'paid',
            location: 'Indirapuram',
            attendance: {
                status: 'Approved & Paid',
                time: '06:00 PM yesterday',
                proof_uploaded: false
            }
        }
    ]);

    const handleApproveAndPay = (id) => {
        setLoading(true);
        setTimeout(() => {
            setContracts(contracts.map(c => c.id === id ? { ...c, status: 'paid', attendance: {...c.attendance, status: 'Approved & Paid'} } : c));
            setLoading(false);
        }, 2000);
    };

    return (
        <DashboardLayout>
            <div className="max-w-6xl mx-auto space-y-8">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-[#FF6B4A] font-bold text-xs tracking-wider uppercase mb-2">
                            <ShieldCheck size={16} /> Smart Contract Engine
                        </div>
                        <h2 className="text-3xl font-black mb-2 text-[#11111A] tracking-tight">Active Deployments</h2>
                        <p className="text-[#4A4A5A] font-medium">Verify worker attendance and release escrow payments automatically.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    <AnimatePresence>
                    {contracts.map((contract, i) => (
                        <motion.div
                            key={contract.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-xl shadow-gray-200/40 relative group hover:border-[#1E234C]/30 transition-colors"
                        >
                            {/* Contract Header */}
                            <div className="p-6 bg-gray-50/50 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#1E234C] rounded-full blur-[80px] opacity-10 pointer-events-none translate-x-1/2 -translate-y-1/2 group-hover:bg-[#FF6B4A] transition-colors"></div>
                                
                                <div className="flex items-center gap-4 relative z-10">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white shadow-md ${contract.status === 'paid' ? 'bg-emerald-500' : 'bg-[#1E234C]'}`}>
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-black text-xl text-[#11111A] tracking-tight">{contract.workerName}</h3>
                                            <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider border border-gray-200">{contract.id}</span>
                                        </div>
                                        <p className="text-sm text-[#4A4A5A] font-medium">{contract.role} <span className="mx-2">•</span> <span className="text-[#FF6B4A] font-bold">₹{contract.wage} / day</span></p>
                                    </div>
                                </div>
                                <div className="relative z-10">
                                    <span className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 border shadow-sm ${
                                        contract.status === 'paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-orange-50 text-orange-600 border-orange-100'
                                    }`}>
                                        {contract.status === 'paid' ? <><CheckCircle2 size={16}/> Escrow Released</> : <><Clock size={16}/> Attendance Review</>}
                                    </span>
                                </div>
                            </div>

                            {/* Verification Section */}
                            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                                
                                {/* Left: Proof */}
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-1"><MapPin size={12}/> Geofence Data</p>
                                    
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shrink-0 border border-blue-100">
                                                <Map size={14} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-[#11111A]">Worker inside geofence</p>
                                                <p className="text-xs text-gray-500 font-medium">Verified at {contract.attendance.time} • {contract.location}</p>
                                            </div>
                                        </div>

                                        {contract.attendance.proof_uploaded && (
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center shrink-0 border border-orange-100">
                                                    <Camera size={14} />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-bold text-[#11111A] mb-2">Proof of Work Photo</p>
                                                    <div className="w-full h-32 rounded-xl overflow-hidden border-2 border-gray-100 shadow-sm">
                                                        <img src={contract.attendance.image} alt="Proof" className="w-full h-full object-cover" />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Right: Action */}
                                <div className="flex flex-col justify-center border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-8">
                                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 mb-6">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Daily Payout</p>
                                        <h4 className="text-3xl font-black text-[#11111A] tracking-tighter mb-1">₹{contract.wage}</h4>
                                        <p className="text-xs text-gray-500 font-medium">Will be released instantly to worker's Shram Wallet via UPI.</p>
                                    </div>

                                    {contract.status === 'paid' ? (
                                        <div className="bg-emerald-50 border border-emerald-100 text-emerald-600 px-6 py-4 rounded-xl flex items-center justify-center gap-2 font-bold w-full shadow-sm text-lg">
                                            <CheckCircle2 size={24} /> Funds Settled
                                        </div>
                                    ) : (
                                        <button 
                                            onClick={() => handleApproveAndPay(contract.id)}
                                            disabled={loading}
                                            className="bg-[#1E234C] hover:bg-[#15193B] text-white px-6 py-4 rounded-xl flex items-center justify-center gap-2 font-bold transition-all shadow-md w-full disabled:opacity-70 hover:-translate-y-1 text-lg"
                                        >
                                            {loading ? (
                                                <><Loader2 className="w-6 h-6 animate-spin" /> Processing Blockchain tx...</>
                                            ) : (
                                                <><ShieldCheck size={24} /> Approve & Release Escrow</>
                                            )}
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

export default ContractsView;
