import React from 'react';
import WorkerLayout from '../../components/worker/WorkerLayout';
import { Umbrella, ShieldCheck, Scale, Gavel, CheckCircle2, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const WorkerInsurance = () => {
  const recentClaims = [
    { id: 'WIN-2184', employer: 'Goyal Infra', amount: '₹6,800', resolution: '4 days', status: 'Recovered' },
    { id: 'WIN-2098', employer: 'Mehta Group', amount: '₹3,600', resolution: '3 days', status: 'Float Paid' },
    { id: 'WIN-2091', employer: 'Quick Build Co', amount: '₹4,200', resolution: '9 days', status: 'Legal Notice Sent' },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Recovered': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      case 'Float Paid': return 'text-[#1E234C] bg-blue-50 border-blue-100';
      case 'Legal Notice Sent': return 'text-amber-600 bg-amber-50 border-amber-100';
      default: return 'text-gray-600 bg-gray-50 border-gray-100';
    }
  };

  return (
    <WorkerLayout 
      title="72-hour Wage Insurance" 
      subtitle="Autonomous recovery · legal notice · float payout"
    >
      <div className="p-8 max-w-7xl mx-auto space-y-6 pb-20">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Active Coverage Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white border border-gray-200 shadow-sm rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden"
          >
            {/* Background glowing shape */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-[80px] opacity-60 pointer-events-none translate-x-1/4 -translate-y-1/4"></div>

            <div className="flex-1 relative z-10 w-full">
              <div className="flex items-center gap-2 text-[#FF6B4A] font-bold text-xs tracking-wider uppercase mb-6">
                <Umbrella size={16} />
                <span>Active Coverage</span>
              </div>
              
              <h2 className="text-4xl font-bold text-[#11111A] mb-2">₹11,040</h2>
              <p className="text-[#4A4A5A] mb-8 font-medium">Bhardwaj Constructions · invoice INV-04812</p>
              
              <div className="flex flex-wrap gap-3">
                <span className="bg-gray-50 border border-gray-200 text-[#4A4A5A] text-xs px-3 py-1.5 rounded-full font-bold flex items-center gap-1.5">
                    Premium ₹38 paid
                </span>
                <span className="bg-gray-50 border border-gray-200 text-[#4A4A5A] text-xs px-3 py-1.5 rounded-full font-bold flex items-center gap-1.5">
                    Auto-claim enabled
                </span>
                <span className="bg-gray-50 border border-gray-200 text-[#4A4A5A] text-xs px-3 py-1.5 rounded-full font-bold flex items-center gap-1.5">
                    Legal recovery armed
                </span>
              </div>
            </div>

            {/* Circular Progress */}
            <div className="relative w-48 h-48 flex items-center justify-center shrink-0 z-10">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" stroke="#F3F4F6" strokeWidth="6" fill="transparent" />
                <circle 
                  cx="50" cy="50" r="42" 
                  stroke="#1E234C" 
                  strokeWidth="6" 
                  strokeLinecap="round" 
                  fill="transparent" 
                  strokeDasharray="263.89" 
                  strokeDashoffset={263.89 - (263.89 * 66) / 100} // 47h of 72h is approx 65%
                  className="transition-all duration-1000 ease-out" 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-[#11111A]">47h <span className="text-[#FF6B4A]">32m</span></span>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Remaining</span>
              </div>
            </div>
          </motion.div>

          {/* Right Metrics Cards */}
          <div className="flex flex-col gap-6">
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 flex items-center gap-4 group hover:border-[#1E234C]/30 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                      <ShieldCheck size={20} />
                  </div>
                  <div>
                      <p className="text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-0.5">Float Reserve</p>
                      <h4 className="text-xl font-bold text-[#11111A]">₹2.4 Cr</h4>
                      <p className="text-xs text-gray-500 mt-0.5">across 18,400 active policies</p>
                  </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 flex items-center gap-4 group hover:border-[#1E234C]/30 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1E234C] shrink-0">
                      <Scale size={20} />
                  </div>
                  <div>
                      <p className="text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-0.5">Recovery Success</p>
                      <h4 className="text-xl font-bold text-[#11111A]">94.2%</h4>
                      <p className="text-xs text-gray-500 mt-0.5">average resolution 11 days</p>
                  </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 flex items-center gap-4 group hover:border-[#1E234C]/30 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#FF6B4A] shrink-0">
                      <Gavel size={20} />
                  </div>
                  <div>
                      <p className="text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-0.5">Legal Notices Issued</p>
                      <h4 className="text-xl font-bold text-[#11111A]">1,247</h4>
                      <p className="text-xs text-gray-500 mt-0.5">FY26 to date · 0 cost to worker</p>
                  </div>
              </motion.div>
          </div>
        </div>

        {/* Bottom Section: Recent Claims */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white border border-gray-200 shadow-sm rounded-3xl overflow-hidden"
        >
            <div className="p-8 border-b border-gray-100">
                <p className="text-[#1E234C] font-bold text-xs tracking-wider uppercase">Recent Claims</p>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr>
                            <th className="px-8 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider bg-gray-50">Claim ID</th>
                            <th className="px-8 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider bg-gray-50">Employer</th>
                            <th className="px-8 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider bg-gray-50">Amount</th>
                            <th className="px-8 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider bg-gray-50">Resolution</th>
                            <th className="px-8 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider bg-gray-50">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {recentClaims.map((claim, idx) => (
                            <tr key={claim.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-8 py-5">
                                    <span className="font-mono text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{claim.id}</span>
                                </td>
                                <td className="px-8 py-5 font-bold text-sm text-[#11111A]">{claim.employer}</td>
                                <td className="px-8 py-5 font-bold text-sm text-[#11111A]">{claim.amount}</td>
                                <td className="px-8 py-5 text-sm text-[#4A4A5A]">{claim.resolution}</td>
                                <td className="px-8 py-5">
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(claim.status)}`}>
                                        {claim.status === 'Recovered' && <CheckCircle2 size={12} />}
                                        {claim.status === 'Float Paid' && <ShieldCheck size={12} />}
                                        {claim.status === 'Legal Notice Sent' && <Clock size={12} />}
                                        {claim.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>

      </div>
    </WorkerLayout>
  );
};

export default WorkerInsurance;
