import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Activity, ShieldAlert, Users, IndianRupee, Map, Database, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('shram_user_id');
    localStorage.removeItem('shram_user_name');
    navigate('/');
  };

  const navItems = [
    { path: '/admin', icon: <Activity size={20} />, label: 'Platform Health' },
    { path: '/admin/workers', icon: <Users size={20} />, label: 'Shram Network' },
    { path: '/admin/fraud', icon: <ShieldAlert size={20} />, label: 'Fraud Detection' },
    { path: '/admin/map', icon: <Map size={20} />, label: 'Live Heatmap' },
  ];

  // Mock data for hackathon demo
  const trustScoreData = [
    { name: '400-500', workers: 12 },
    { name: '500-600', workers: 45 },
    { name: '600-700', workers: 120 },
    { name: '700-800', workers: 350 },
    { name: '800-900', workers: 410 },
    { name: '900+', workers: 85 },
  ];

  const wageTrendData = [
    { month: 'Jan', wage: 750 },
    { month: 'Feb', wage: 780 },
    { month: 'Mar', wage: 800 },
    { month: 'Apr', wage: 790 },
    { month: 'May', wage: 850 },
    { month: 'Jun', wage: 920 },
  ];

  const stats = [
    { label: 'Total Protected Wages', value: '₹14.2 Cr', trend: '+12%', color: 'text-emerald-600' },
    { label: 'Verified Workers', value: '1,42,850', trend: '+450/day', color: 'text-[#1E234C]' },
    { label: 'Active Contracts', value: '18,450', trend: '+8%', color: 'text-[#FF6B4A]' },
    { label: 'Fraud Attempts Blocked', value: '423', trend: '-2%', color: 'text-red-500' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#11111A] flex font-sans">
      {/* Sidebar - Distinct from Employer Dashboard */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col relative z-20">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#1E234C] flex items-center justify-center shadow-sm">
              <Database className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight tracking-tight text-[#11111A]">KaamSetu</span>
              <span className="text-[10px] font-bold text-[#FF6B4A] tracking-widest uppercase leading-none">HQ</span>
            </div>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 mt-8 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                location.pathname === item.path
                  ? 'bg-orange-50 text-[#FF6B4A] border border-orange-200 shadow-sm font-semibold'
                  : 'text-[#4A4A5A] hover:bg-gray-50 hover:text-[#11111A] font-medium'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-[#4A4A5A] hover:text-[#11111A] transition-colors w-full font-medium">
            <LogOut size={20} />
            <span>Logout Admin</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-20 border-b border-gray-200 flex items-center justify-between px-8 bg-white/90 backdrop-blur-md z-10">
            <h1 className="text-2xl font-bold text-[#11111A]">God's Eye View</h1>
            <div className="flex items-center gap-3">
               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
               <span className="text-sm font-mono text-gray-500 font-bold tracking-wider">SYSTEM NORMAL</span>
            </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-8 z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
                    >
                        <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider mb-2">{stat.label}</p>
                        <div className="flex items-end gap-3">
                            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                            <span className="text-xs font-mono font-bold text-[#4A4A5A] mb-1 bg-gray-100 px-2 py-0.5 rounded-md border border-gray-200">{stat.trend}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Trust Score Chart */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold mb-6 text-[#11111A]">Trust Score Distribution (Network Wide)</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={trustScoreData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                                <XAxis dataKey="name" stroke="#6B7280" tick={{fill: '#6B7280', fontSize: 12, fontWeight: 500}} axisLine={false} tickLine={false} />
                                <YAxis stroke="#6B7280" tick={{fill: '#6B7280', fontSize: 12, fontWeight: 500}} axisLine={false} tickLine={false} />
                                <Tooltip cursor={{fill: '#F3F4F6'}} contentStyle={{backgroundColor: '#FFFFFF', borderColor: '#E5E7EB', color: '#11111A', borderRadius: '8px', fontWeight: 600, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
                                <Bar dataKey="workers" fill="#1E234C" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* AI Negotiation Impact */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold mb-6 text-[#11111A]">Average Daily Wage (AI Negotiated)</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={wageTrendData}>
                                <defs>
                                    <linearGradient id="colorWage" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#FF6B4A" stopOpacity={0.2}/>
                                    <stop offset="95%" stopColor="#FF6B4A" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                                <XAxis dataKey="month" stroke="#6B7280" tick={{fill: '#6B7280', fontSize: 12, fontWeight: 500}} axisLine={false} tickLine={false} />
                                <YAxis stroke="#6B7280" tick={{fill: '#6B7280', fontSize: 12, fontWeight: 500}} axisLine={false} tickLine={false} domain={['dataMin - 50', 'dataMax + 50']} />
                                <Tooltip contentStyle={{backgroundColor: '#FFFFFF', borderColor: '#E5E7EB', color: '#11111A', borderRadius: '8px', fontWeight: 600, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
                                <Area type="monotone" dataKey="wage" stroke="#FF6B4A" strokeWidth={3} fillOpacity={1} fill="url(#colorWage)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-[#11111A]">Latest Fraud Alerts (Employer Side)</h3>
                    <button className="text-sm text-[#FF6B4A] font-semibold hover:text-[#E55A39]">View All</button>
                </div>
                <div className="space-y-4">
                    {[1, 2, 3].map((_, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 shadow-sm hover:border-red-200 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-red-50 rounded-lg">
                                    <ShieldAlert className="text-red-500 w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-bold text-[#11111A]">Ghost Employer Detected</p>
                                    <p className="text-sm text-[#4A4A5A] font-medium">System blocked an employer ID with 0 verifiable past tax records.</p>
                                </div>
                            </div>
                            <span className="text-xs font-mono font-bold text-gray-500">2 mins ago</span>
                        </div>
                    ))}
                </div>
            </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
