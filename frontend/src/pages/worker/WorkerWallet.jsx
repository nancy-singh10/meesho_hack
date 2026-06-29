import React from 'react';
import WorkerLayout from '../../components/worker/WorkerLayout';
import { QrCode, ShieldCheck, Download, Network } from 'lucide-react';
import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const WorkerWallet = () => {
  const skillData = [
    { subject: 'RCC Shuttering', A: 90, fullMark: 100 },
    { subject: 'Plastering', A: 85, fullMark: 100 },
    { subject: 'Brickwork', A: 95, fullMark: 100 },
    { subject: 'Tiling', A: 70, fullMark: 100 },
    { subject: 'Electrical', A: 40, fullMark: 100 },
    { subject: 'Plumbing', A: 30, fullMark: 100 },
  ];

  const wageTrendData = [
    { month: 'Jan', wage: 18000 },
    { month: 'Feb', wage: 21000 },
    { month: 'Mar', wage: 19500 },
    { month: 'Apr', wage: 24000 },
    { month: 'May', wage: 26500 },
    { month: 'Jun', wage: 24850 },
  ];

  const nfts = [
    { id: 'WNFT-047', job: 'RCC Shuttering', employer: 'Bhardwaj Constructions', date: '2026-06-18', hash: '0x9a4f...82bd', amount: '₹11,400' },
    { id: 'WNFT-046', job: 'Plastering', employer: 'Sharma Builders', date: '2026-06-04', hash: '0x8f22...31ac', amount: '₹5,400' },
    { id: 'WNFT-045', job: 'Brickwork', employer: 'Goyal Infra', date: '2026-05-22', hash: '0x7e11...99bc', amount: '₹6,800' },
  ];

  return (
    <WorkerLayout 
      title="Shram Wallet" 
      subtitle="Your portable, verified work identity."
    >
      <div className="p-8 max-w-7xl mx-auto space-y-6 pb-20">
        
        {/* Top Grid: ID Card & Radar Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* ID Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative h-72 rounded-[2rem] p-8 overflow-hidden flex flex-col justify-between shadow-lg"
            style={{
                background: 'linear-gradient(135deg, #1E234C 0%, #FF6B4A 150%)',
            }}
          >
            {/* Abstract Background shapes */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-[60px] opacity-20 translate-x-1/4 -translate-y-1/4"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-300 rounded-full mix-blend-overlay filter blur-[60px] opacity-30 -translate-x-1/4 translate-y-1/4"></div>

            <div className="relative z-10 flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 text-white/80 font-bold text-xs tracking-widest uppercase mb-3">
                  <Network size={14} />
                  <span>Shram Wallet</span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-1">{localStorage.getItem('shram_user_name') || 'Worker'}</h2>
                <p className="text-white/80 text-sm font-medium">Verified Mason · Tier II</p>
              </div>
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm border border-white/30">
                <QrCode className="w-8 h-8 text-white" />
              </div>
            </div>

            <div className="relative z-10 flex justify-between items-end">
              <div>
                <p className="text-white/70 text-[10px] font-bold tracking-widest uppercase mb-1">Shram ID</p>
                <p className="text-white font-mono text-sm tracking-widest font-medium">SHRAM-TN-7821-4490</p>
              </div>
              <div className="text-right">
                <p className="text-emerald-300 flex items-center gap-1 justify-end text-[10px] font-bold tracking-widest uppercase mb-1">
                  <ShieldCheck size={12} /> Trust Score
                </p>
                <p className="text-4xl font-bold text-white leading-none">847</p>
              </div>
            </div>
          </motion.div>

          {/* Skill Graph */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white border border-gray-200 shadow-sm rounded-[2rem] p-6 h-72 flex flex-col"
          >
            <div className="flex items-center gap-2 text-[#1E234C] font-bold text-xs tracking-wider uppercase mb-2">
              <Network size={14} />
              <span>Skill Graph</span>
            </div>
            <div className="flex-1 w-full h-full relative -mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillData}>
                  <PolarGrid stroke="#E5E7EB" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#6B7280', fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Skills" dataKey="A" stroke="#1E234C" fill="#1E234C" fillOpacity={0.15} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

        </div>

        {/* Wage Trend */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-gray-200 shadow-sm rounded-3xl p-8"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-[#FF6B4A] font-bold text-xs tracking-wider uppercase mb-2">Wage Trend - Last 6 Months</p>
              <div className="flex items-center gap-3">
                <h3 className="text-3xl font-bold text-[#11111A]">₹24,850</h3>
                <span className="text-emerald-600 text-sm font-semibold">+18.4%</span>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-[#4A4A5A] bg-white text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
                <Download size={16} /> Export verified record
            </button>
          </div>

          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={wageTrendData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorWageWalletLight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1E234C" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#1E234C" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis dataKey="month" stroke="#9CA3AF" tick={{fill: '#6B7280', fontSize: 12}} axisLine={false} tickLine={false} dy={10} />
                <YAxis stroke="#9CA3AF" tick={{fill: '#6B7280', fontSize: 12}} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{backgroundColor: '#fff', borderColor: '#E5E7EB', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} itemStyle={{color: '#11111A'}} />
                <Area type="monotone" dataKey="wage" stroke="#1E234C" strokeWidth={3} fillOpacity={1} fill="url(#colorWageWalletLight)" />
                <Area type="monotone" dataKey="wage" stroke="none" fill="none" dot={{ stroke: '#1E234C', strokeWidth: 2, r: 4, fill: '#fff' }} activeDot={{ stroke: '#FF6B4A', strokeWidth: 2, r: 6, fill: '#FF6B4A' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* NFTs Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-gray-200 shadow-sm rounded-3xl p-8"
        >
          <div className="flex justify-between items-end mb-8">
            <div>
              <p className="text-[#1E234C] font-bold text-xs tracking-wider uppercase mb-2">Verified Work NFTs</p>
              <h3 className="text-2xl font-bold text-[#11111A]">Cryptographically signed work history</h3>
            </div>
            <p className="text-sm text-gray-500 font-medium">5 of 47 shown</p>
          </div>

          <div className="relative space-y-6 before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
            {nfts.map((nft, index) => (
              <div key={nft.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                {/* Timeline Marker */}
                <div className="flex items-center justify-center w-6 h-6 rounded-full border-4 border-[#FDFCF8] bg-[#FF6B4A] absolute left-0 md:left-1/2 -translate-x-1/2 z-10 shrink-0 shadow-sm"></div>
                
                {/* Content Card */}
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] ml-12 md:ml-0 p-4 rounded-xl bg-white border border-gray-200 shadow-sm group-hover:border-[#FF6B4A]/50 group-hover:shadow-md transition-all flex justify-between items-center">
                   <div>
                       <div className="flex items-center gap-2 mb-1">
                           <ShieldCheck size={14} className="text-emerald-500" />
                           <h4 className="text-[#11111A] font-bold text-sm">{nft.job}</h4>
                       </div>
                       <p className="text-xs text-[#4A4A5A] mb-2">{nft.employer} · {nft.date}</p>
                       <p className="text-[10px] text-gray-500 font-mono bg-gray-50 px-2 py-0.5 rounded inline-block">{nft.hash}</p>
                   </div>
                   <div className="text-right">
                       <p className="text-[#11111A] font-bold text-lg mb-1">{nft.amount}</p>
                       <p className="text-[10px] font-bold text-[#1E234C] tracking-wider uppercase">{nft.id}</p>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        
      </div>
    </WorkerLayout>
  );
};

export default WorkerWallet;
