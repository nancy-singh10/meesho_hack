import React from 'react';
import WorkerLayout from '../../components/worker/WorkerLayout';
import { ShieldCheck, Wallet, Briefcase, IndianRupee, Building2, Activity, ArrowUpRight, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const WorkerDashboard = () => {
  const earningsData = [
    { name: 'Jan', amount: 18000 },
    { name: 'Feb', amount: 21000 },
    { name: 'Mar', amount: 19500 },
    { name: 'Apr', amount: 24000 },
    { name: 'May', amount: 26500 },
    { name: 'Jun', amount: 26150 },
  ];

  const recentActivity = [
    { title: 'RCC Shuttering', employer: 'Bhardwaj Constructions', date: '12d', amount: '₹11,400', status: 'PAID', type: 'success' },
    { title: 'Plastering', employer: 'Sharma Builders', date: '6d', amount: '₹5,400', status: 'PAID', type: 'success' },
    { title: 'Brickwork', employer: 'Goyal Infra', date: '8d', amount: '₹6,800', status: 'PAID', type: 'success' },
    { title: 'Tiling', employer: 'Mehta Group', date: '4d', amount: '₹3,600', status: 'PENDING', type: 'warning' },
  ];

  return (
    <WorkerLayout 
      title={`Namaste, ${localStorage.getItem('shram_user_name')?.split(' ')[0] || 'Worker'}`} 
      subtitle="Your wallet is healthy. 4 new matched jobs today."
    >
      <div className="p-8 max-w-7xl mx-auto space-y-6 pb-20">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Trust Score Card (Premium Navy Gradient) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden shadow-xl shadow-blue-900/10"
            style={{
                background: 'linear-gradient(135deg, #1E234C 0%, #151936 100%)'
            }}
          >
            {/* Decorative background blur */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FF6B4A] rounded-full blur-[120px] opacity-20 pointer-events-none translate-x-1/3 -translate-y-1/3"></div>

            <div className="flex-1 relative z-10 w-full text-white">
              <div className="flex items-center gap-2 text-white/80 font-bold text-xs tracking-wider uppercase mb-6">
                <ShieldCheck size={18} className="text-[#FF6B4A]" />
                <span>Shram Trust Score</span>
              </div>
              
              <h2 className="text-7xl font-black text-white mb-2 tracking-tighter">847</h2>
              <p className="text-white/60 mb-8 font-medium">Top 8% of masons in Bihar. <span className="text-[#FF6B4A]">+24 pts this month.</span></p>
              
              <div className="flex flex-wrap gap-3">
                <span className="bg-white/10 border border-white/20 text-white text-xs px-4 py-2 rounded-xl font-bold backdrop-blur-md">
                    On-time pay 100%
                </span>
                <span className="bg-white/10 border border-white/20 text-white text-xs px-4 py-2 rounded-xl font-bold backdrop-blur-md">
                    47 verified jobs
                </span>
                <span className="bg-white/10 border border-white/20 text-white text-xs px-4 py-2 rounded-xl font-bold backdrop-blur-md">
                    0 disputes
                </span>
              </div>
            </div>

            {/* Circular Progress with Glow */}
            <div className="relative w-48 h-48 flex items-center justify-center shrink-0 z-10">
              {/* Outer Glow */}
              <div className="absolute inset-0 rounded-full shadow-[0_0_50px_rgba(255,107,74,0.3)]"></div>
              
              <svg className="w-full h-full transform -rotate-90 relative z-10" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="transparent" />
                <circle 
                  cx="50" cy="50" r="42" 
                  stroke="#FF6B4A" 
                  strokeWidth="8" 
                  strokeLinecap="round" 
                  fill="transparent" 
                  strokeDasharray="263.89" 
                  strokeDashoffset={263.89 - (263.89 * (94/900))} 
                  className="transition-all duration-1000 ease-out" 
                  style={{ filter: 'drop-shadow(0px 0px 8px rgba(255,107,74,0.6))' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center relative z-20">
                <span className="text-4xl font-black text-white">94</span>
                <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest mt-1">of 900</span>
              </div>
            </div>
          </motion.div>

          {/* Risk Level Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white border border-gray-100 shadow-xl shadow-gray-200/40 rounded-3xl p-8 flex flex-col justify-between"
          >
            <div>
              <p className="text-[#1E234C] font-bold text-xs tracking-wider uppercase mb-4 flex items-center gap-2">
                  <ShieldAlert size={16} /> Risk Level
              </p>
              <div className="flex items-center gap-2 mb-4 bg-emerald-50 w-fit px-4 py-2 rounded-full border border-emerald-100">
                <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse"></div>
                <h3 className="text-2xl font-black text-emerald-600 tracking-tight">Low</h3>
              </div>
              <p className="text-sm text-gray-500 font-medium">All employers in your queue passed fraud screening.</p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-100">
              <div className="flex flex-col items-start">
                <p className="text-2xl font-black text-[#11111A]">96%</p>
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1">Pay Rate</p>
              </div>
              <div className="flex flex-col items-start">
                <p className="text-2xl font-black text-[#11111A]">12</p>
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1">Active</p>
              </div>
              <div className="flex flex-col items-start">
                <p className="text-2xl font-black text-[#11111A]">0</p>
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1">Disputes</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 4 Mini Cards with Micro-interactions */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white border border-gray-100 shadow-xl shadow-gray-200/40 rounded-3xl p-6 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full blur-xl translate-x-1/2 -translate-y-1/2 group-hover:bg-blue-100 transition-colors"></div>
            <div className="w-12 h-12 bg-blue-50 text-[#1E234C] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Wallet size={20} />
            </div>
            <p className="text-[#4A4A5A] font-bold text-[10px] tracking-widest uppercase mb-1">Wallet Balance</p>
            <h3 className="text-3xl font-black text-[#11111A] tracking-tight">₹24,850</h3>
            <ArrowUpRight size={18} className="absolute top-6 right-6 text-gray-300 group-hover:text-[#1E234C] transition-colors" />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white border border-gray-100 shadow-xl shadow-gray-200/40 rounded-3xl p-6 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-full blur-xl translate-x-1/2 -translate-y-1/2 group-hover:bg-emerald-100 transition-colors"></div>
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Briefcase size={20} />
            </div>
            <p className="text-[#4A4A5A] font-bold text-[10px] tracking-widest uppercase mb-1">Verified Jobs</p>
            <h3 className="text-3xl font-black text-[#11111A] tracking-tight">47</h3>
            <ArrowUpRight size={18} className="absolute top-6 right-6 text-gray-300 group-hover:text-emerald-500 transition-colors" />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white border border-gray-100 shadow-xl shadow-gray-200/40 rounded-3xl p-6 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-full blur-xl translate-x-1/2 -translate-y-1/2 group-hover:bg-orange-100 transition-colors"></div>
            <div className="w-12 h-12 bg-orange-50 text-[#FF6B4A] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <IndianRupee size={20} />
            </div>
            <p className="text-[#4A4A5A] font-bold text-[10px] tracking-widest uppercase mb-1">Today's Wage</p>
            <h3 className="text-3xl font-black text-[#11111A] tracking-tight">₹950</h3>
            <ArrowUpRight size={18} className="absolute top-6 right-6 text-gray-300 group-hover:text-[#FF6B4A] transition-colors" />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white border border-gray-100 shadow-xl shadow-gray-200/40 rounded-3xl p-6 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gray-100 rounded-full blur-xl translate-x-1/2 -translate-y-1/2 group-hover:bg-gray-200 transition-colors"></div>
            <div className="w-12 h-12 bg-gray-50 text-gray-500 border border-gray-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Building2 size={20} />
            </div>
            <p className="text-[#4A4A5A] font-bold text-[10px] tracking-widest uppercase mb-1">Current Employer</p>
            <h3 className="text-xl font-bold text-[#11111A] leading-tight mt-1">Bhardwaj<br/>Constructions</h3>
            <ArrowUpRight size={18} className="absolute top-6 right-6 text-gray-300 group-hover:text-gray-900 transition-colors" />
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Area Chart with Premium Gradients */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2 bg-white border border-gray-100 shadow-xl shadow-gray-200/40 rounded-3xl p-8 flex flex-col"
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-[#1E234C] font-bold text-xs tracking-wider uppercase mb-2 flex items-center gap-2">
                    <Activity size={16} /> Earnings · 6 Months
                </p>
                <h3 className="text-5xl font-black text-[#11111A] tracking-tighter">₹1,35,150</h3>
              </div>
              <div className="bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-full font-bold text-sm flex items-center gap-1 border border-emerald-100 shadow-sm">
                +18.4% <ArrowUpRight size={16} />
              </div>
            </div>
            
            <div className="flex-1 min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={earningsData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#1E234C" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#1E234C" stopOpacity={0}/>
                            </linearGradient>
                            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="4" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                        <XAxis dataKey="name" stroke="#9CA3AF" tick={{fill: '#6B7280', fontSize: 12, fontWeight: 600}} axisLine={false} tickLine={false} dy={10} />
                        <YAxis stroke="#9CA3AF" tick={{fill: '#6B7280', fontSize: 12, fontWeight: 600}} axisLine={false} tickLine={false} />
                        <Tooltip 
                            contentStyle={{backgroundColor: '#1E234C', borderColor: '#1E234C', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}} 
                            itemStyle={{color: '#fff', fontWeight: 'bold'}}
                            labelStyle={{color: '#9CA3AF'}}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="amount" 
                            stroke="#FF6B4A" 
                            strokeWidth={4} 
                            fillOpacity={1} 
                            fill="url(#colorEarnings)"
                            activeDot={{ r: 8, fill: '#FF6B4A', stroke: '#fff', strokeWidth: 3 }}
                            filter="url(#glow)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Recent Activity List - Premium styling */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white border border-gray-100 shadow-xl shadow-gray-200/40 rounded-3xl overflow-hidden flex flex-col"
          >
            <div className="p-8 border-b border-gray-100 bg-gray-50/50">
                <p className="text-[#1E234C] font-bold text-xs tracking-wider uppercase flex items-center gap-2">
                <Activity size={16} /> Recent Activity
                </p>
            </div>
            <div className="p-4 space-y-2 flex-1 overflow-y-auto">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="flex justify-between items-center group p-4 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer border border-transparent hover:border-gray-100">
                  <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${
                          activity.type === 'success' ? 'bg-emerald-50 text-emerald-500 border-emerald-100' : 'bg-amber-50 text-amber-500 border-amber-100'
                      }`}>
                          {activity.type === 'success' ? <CheckCircle2 size={18} /> : <Activity size={18} />}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-[#11111A] mb-1 group-hover:text-[#FF6B4A] transition-colors">{activity.title}</h4>
                        <p className="text-xs text-gray-500 font-medium">{activity.employer} · {activity.date}</p>
                      </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-[#11111A] text-sm mb-1">{activity.amount}</p>
                    <p className={`text-[9px] font-bold tracking-widest uppercase ${
                         activity.type === 'success' ? 'text-emerald-500' : 'text-amber-500'
                    }`}>{activity.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </WorkerLayout>
  );
};

export default WorkerDashboard;
