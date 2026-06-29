import React from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { motion } from 'framer-motion';
import { Users, Briefcase, FileText, Activity, ShieldCheck, TrendingUp, ArrowRight, Wallet, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DashboardHome = () => {
    const navigate = useNavigate();

    const escrowData = [
        { name: 'Jan', amount: 120000 },
        { name: 'Feb', amount: 150000 },
        { name: 'Mar', amount: 140000 },
        { name: 'Apr', amount: 180000 },
        { name: 'May', amount: 250000 },
        { name: 'Jun', amount: 320000 },
    ];

    const stats = [
        { label: 'Active Jobs', value: '3', icon: <Briefcase size={20} />, color: 'blue' },
        { label: 'Verified Workers', value: '12', icon: <Users size={20} />, color: 'emerald' },
        { label: 'Pending Contracts', value: '1', icon: <FileText size={20} />, color: 'orange' },
    ];

    return (
        <DashboardLayout>
            <div className="max-w-7xl mx-auto space-y-8">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-black text-[#11111A] tracking-tight mb-2">Command Center</h2>
                        <p className="text-[#4A4A5A] font-medium">Here's the current state of your workforce and smart contracts.</p>
                    </div>
                    <button 
                        onClick={() => navigate('/dashboard/post-job')}
                        className="bg-[#FF6B4A] hover:bg-[#E55A39] text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-orange-500/20 hover:-translate-y-1 hover:shadow-xl flex items-center justify-center gap-2"
                    >
                        Post New Job <ArrowRight size={20} />
                    </button>
                </div>

                {/* Main Escrow Treasury Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white border border-gray-100 shadow-xl shadow-gray-200/40 rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-3"
                >
                    {/* Left: Escrow Balance */}
                    <div 
                        className="p-8 lg:col-span-1 relative flex flex-col justify-between"
                        style={{ background: 'linear-gradient(135deg, #1E234C 0%, #151936 100%)' }}
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6B4A] rounded-full blur-[100px] opacity-20 pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
                        
                        <div className="relative z-10 text-white mb-12">
                            <div className="flex items-center gap-2 text-white/80 font-bold text-xs tracking-wider uppercase mb-6">
                                <ShieldCheck size={18} className="text-[#FF6B4A]" />
                                <span>KaamSetu Escrow</span>
                            </div>
                            <h3 className="text-sm font-medium text-white/70 mb-1">Total Protected Funds</h3>
                            <p className="text-5xl font-black tracking-tighter mb-4">₹3,20,500</p>
                            
                            <div className="flex items-center gap-2 bg-white/10 w-fit px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-md">
                                <TrendingUp size={14} className="text-emerald-400" />
                                <span className="text-sm font-bold text-emerald-400">+28.5% this month</span>
                            </div>
                        </div>

                        <div className="relative z-10">
                            <button className="w-full bg-white text-[#1E234C] font-bold py-3 rounded-xl hover:bg-gray-50 transition-colors shadow-md flex items-center justify-center gap-2">
                                <Wallet size={18} /> Add Funds
                            </button>
                        </div>
                    </div>

                    {/* Right: Escrow Graph */}
                    <div className="p-8 lg:col-span-2 flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <p className="text-[#1E234C] font-bold text-xs tracking-wider uppercase">Escrow Utilization</p>
                            <span className="text-xs bg-gray-100 text-gray-600 font-bold px-3 py-1 rounded-full">6 Months</span>
                        </div>
                        <div className="flex-1 min-h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={escrowData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorEscrow" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#1E234C" stopOpacity={0.2}/>
                                            <stop offset="95%" stopColor="#1E234C" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                                    <XAxis dataKey="name" stroke="#9CA3AF" tick={{fill: '#6B7280', fontSize: 12, fontWeight: 600}} axisLine={false} tickLine={false} dy={10} />
                                    <YAxis stroke="#9CA3AF" tick={{fill: '#6B7280', fontSize: 12, fontWeight: 600}} axisLine={false} tickLine={false} tickFormatter={(val) => `₹${val/1000}k`} />
                                    <Tooltip 
                                        contentStyle={{backgroundColor: '#1E234C', borderColor: '#1E234C', borderRadius: '12px'}} 
                                        itemStyle={{color: '#fff', fontWeight: 'bold'}}
                                        labelStyle={{color: '#9CA3AF'}}
                                        formatter={(value) => [`₹${value.toLocaleString()}`, "Protected"]}
                                    />
                                    <Area type="monotone" dataKey="amount" stroke="#1E234C" strokeWidth={4} fillOpacity={1} fill="url(#colorEscrow)" activeDot={{ r: 8, fill: '#1E234C' }} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </motion.div>

                {/* 3 Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + (i * 0.1) }}
                            className="bg-white border border-gray-100 rounded-3xl p-6 shadow-xl shadow-gray-200/40 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-${stat.color}-50 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2 group-hover:bg-${stat.color}-100 transition-colors`}></div>
                            <div className={`w-12 h-12 bg-${stat.color}-50 text-${stat.color}-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10`}>
                                {stat.icon}
                            </div>
                            <h3 className="text-4xl font-black text-[#11111A] tracking-tight mb-1 relative z-10">{stat.value}</h3>
                            <p className="text-[#4A4A5A] font-bold text-[10px] tracking-widest uppercase relative z-10">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Recent Activity */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-xl shadow-gray-200/40"
                >
                    <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                        <h3 className="text-[#1E234C] font-bold text-xs tracking-wider uppercase flex items-center gap-2">
                            <Activity size={16} /> Live Network Activity
                        </h3>
                    </div>
                    <div className="p-2">
                        {/* Activity Item 1 */}
                        <div className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-2xl transition-colors cursor-pointer group">
                            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0 border border-emerald-100">
                                <CheckCircle2 size={18} />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-bold text-[#11111A] group-hover:text-[#FF6B4A] transition-colors">Smart Contract Signed: Plastering Team</p>
                                <p className="text-xs text-gray-500 font-medium mt-1">Ramesh Kumar accepted the offer of ₹950/day. Funds locked in Escrow.</p>
                            </div>
                            <span className="text-[10px] text-gray-400 font-bold">2m ago</span>
                        </div>
                        
                        {/* Activity Item 2 */}
                        <div className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-2xl transition-colors cursor-pointer group">
                            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shrink-0 border border-blue-100">
                                <ShieldCheck size={18} />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-bold text-[#11111A] group-hover:text-[#1E234C] transition-colors">AI Match Found: RCC Shuttering</p>
                                <p className="text-xs text-gray-500 font-medium mt-1">Found 4 verified workers matching your exact requirements.</p>
                            </div>
                            <span className="text-[10px] text-gray-400 font-bold">1hr ago</span>
                        </div>
                    </div>
                </motion.div>

            </div>
        </DashboardLayout>
    );
};

export default DashboardHome;
