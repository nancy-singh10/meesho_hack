import React from 'react';
import WorkerLayout from '../../components/worker/WorkerLayout';
import { TrendingUp, Clock, ShieldCheck, ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const WorkerPayments = () => {
  const disbursementData = [
    { month: 'Jan', amount: 18000 },
    { month: 'Feb', amount: 21000 },
    { month: 'Mar', amount: 19500 },
    { month: 'Apr', amount: 24000 },
    { month: 'May', amount: 26500 },
    { month: 'Jun', amount: 24850 },
  ];

  const recentTransactions = [
    { id: 1, employer: 'Bhardwaj Constructions', date: '2026-06-18', amount: '+₹11,400', type: 'credit' },
    { id: 2, employer: 'Sharma Builders', date: '2026-06-04', amount: '+₹5,400', type: 'credit' },
    { id: 3, employer: 'Goyal Infra', date: '2026-05-21', amount: '+₹6,800', type: 'credit' },
    { id: 4, employer: 'Mehta Group', date: '2026-05-08', amount: '+₹3,600', type: 'credit' },
  ];

  const timelineSteps = [
    { id: 1, title: 'WORK COMPLETED', time: 'Day 0 - 18:30', status: 'completed' },
    { id: 2, title: 'WAGE INVOICE SENT', time: 'Day 0 - 18:32', status: 'completed' },
    { id: 3, title: 'EMPLOYER CONFIRMATION', time: 'Day 1 - 09:14', status: 'completed' },
    { id: 4, title: 'PAYMENT WINDOW (72H)', time: 'Day 1-3', status: 'active' },
    { id: 5, title: 'FLOAT PAYOUT', time: 'Day 3 - 18:30', status: 'pending' },
    { id: 6, title: 'AUTO RECOVERY', time: 'Day 4+', status: 'pending' },
    { id: 7, title: 'LEGAL NOTICE', time: 'Day 7+', status: 'pending' },
  ];

  return (
    <WorkerLayout 
      title="Payments" 
      subtitle="Live monitoring · UPI · IMPS · KaamSetu Float"
    >
      <div className="p-8 max-w-7xl mx-auto space-y-6 pb-20">
        
        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-gray-200 shadow-sm rounded-3xl p-6 relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
              <p className="text-[#1E234C] font-bold text-xs tracking-wider uppercase">This Month</p>
              <TrendingUp size={16} className="text-emerald-500" />
            </div>
            <h3 className="text-3xl font-bold text-[#11111A] mb-1">₹24,850</h3>
            <p className="text-emerald-600 text-sm font-bold">+18%</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white border border-gray-200 shadow-sm rounded-3xl p-6 relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <p className="text-[#FF6B4A] font-bold text-xs tracking-wider uppercase">Pending</p>
              <Clock size={16} className="text-[#FF6B4A]" />
            </div>
            <h3 className="text-3xl font-bold text-[#11111A] mb-1">₹11,040</h3>
            <p className="text-[#FF6B4A] text-sm font-bold bg-orange-50 inline-block px-2 py-0.5 rounded">due 2d 4h</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white border border-gray-200 shadow-sm rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-blue-50 rounded-full opacity-50 blur-2xl"></div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <p className="text-[#1E234C] font-bold text-xs tracking-wider uppercase">Float Insured</p>
              <ShieldCheck size={16} className="text-[#1E234C]" />
            </div>
            <h3 className="text-3xl font-bold text-[#11111A] mb-1 relative z-10">₹11,040</h3>
            <p className="text-[#4A4A5A] text-sm font-medium relative z-10">auto-paid if late</p>
          </motion.div>
        </div>

        {/* Active Payment Tracker */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white border border-gray-200 shadow-sm rounded-3xl p-8">
            <div className="flex flex-col md:flex-row justify-between md:items-end mb-12">
                <div>
                    <p className="text-[#FF6B4A] font-bold text-xs tracking-wider uppercase mb-2">Active Payment</p>
                    <h2 className="text-2xl font-bold text-[#11111A]">Bhardwaj Constructions · ₹11,040</h2>
                    <p className="text-sm text-gray-500 font-medium mt-1">72-hour guarantee window</p>
                </div>
                <div className="mt-4 md:mt-0 text-right">
                    <h3 className="text-3xl font-bold text-[#11111A] tracking-tight">47h <span className="text-[#FF6B4A]">32m</span></h3>
                    <p className="text-[10px] text-gray-500 font-bold tracking-wider uppercase mt-1">Remaining</p>
                </div>
            </div>

            {/* Horizontal Timeline */}
            <div className="relative pb-6 overflow-x-auto hide-scrollbar">
                <div className="min-w-[800px]">
                    <div className="absolute top-3 left-0 right-0 h-0.5 bg-gray-100 z-0"></div>
                    <div className="absolute top-3 left-0 h-0.5 bg-emerald-500 z-0 transition-all" style={{ width: '45%' }}></div>
                    
                    <div className="flex justify-between relative z-10">
                        {timelineSteps.map((step) => (
                            <div key={step.id} className="flex flex-col items-center w-32 relative">
                                <div className={`w-6 h-6 rounded-full border-4 border-white flex items-center justify-center shrink-0 mb-3 shadow-sm transition-colors
                                    ${step.status === 'completed' ? 'bg-emerald-500' : step.status === 'active' ? 'bg-[#FF6B4A]' : 'bg-gray-200'}
                                `}>
                                    {step.status === 'active' && <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>}
                                </div>
                                <h4 className="text-[9px] font-bold text-[#11111A] tracking-wider uppercase text-center mb-1 leading-tight">{step.title}</h4>
                                <p className="text-[9px] text-gray-500 font-medium text-center">{step.time}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Bar Chart */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white border border-gray-200 shadow-sm rounded-3xl p-8 flex flex-col">
                <p className="text-[#1E234C] font-bold text-xs tracking-wider uppercase mb-6">Monthly Disbursements</p>
                <div className="flex-1 min-h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={disbursementData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                            <XAxis dataKey="month" stroke="#9CA3AF" tick={{fill: '#6B7280', fontSize: 12}} axisLine={false} tickLine={false} dy={10} />
                            <YAxis stroke="#9CA3AF" tick={{fill: '#6B7280', fontSize: 12}} axisLine={false} tickLine={false} />
                            <Tooltip cursor={{fill: '#F9FAFB'}} contentStyle={{backgroundColor: '#fff', borderColor: '#E5E7EB', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} itemStyle={{color: '#11111A'}} />
                            <Bar dataKey="amount" fill="#1E234C" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            {/* Recent Transactions */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white border border-gray-200 shadow-sm rounded-3xl p-8">
                <p className="text-[#1E234C] font-bold text-xs tracking-wider uppercase mb-6">Recent Transactions</p>
                <div className="space-y-6">
                    {recentTransactions.map((tx) => (
                        <div key={tx.id} className="flex justify-between items-center group">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                                    <ArrowDownRight size={18} />
                                </div>
                                <div>
                                    <h4 className="text-[#11111A] font-bold text-sm mb-1 group-hover:text-[#FF6B4A] transition-colors">{tx.employer}</h4>
                                    <p className="text-xs text-gray-500">{tx.date}</p>
                                </div>
                            </div>
                            <span className="text-[#11111A] font-bold text-lg">{tx.amount}</span>
                        </div>
                    ))}
                </div>
            </motion.div>

        </div>

      </div>
    </WorkerLayout>
  );
};

export default WorkerPayments;
