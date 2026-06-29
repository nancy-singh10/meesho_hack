import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Database, ArrowRight, Lock, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminLogin = () => {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call for Admin Login
    setTimeout(() => {
      localStorage.setItem('shram_user_name', 'System Admin');
      localStorage.setItem('shram_user_id', 'ADMIN-01');
      navigate('/admin');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#11111A] flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full space-y-8">
        
        <div className="text-center">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-[#1E234C] flex items-center justify-center mb-6 shadow-md cursor-pointer" onClick={() => navigate('/')}>
            <Database size={32} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight mb-2 text-[#11111A]">KaamSetu <span className="text-[#FF6B4A]">HQ</span></h2>
          <p className="text-[#4A4A5A]">God's Eye Admin Portal. Authorized personnel only.</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white border border-gray-200 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-[#1E234C]"></div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-[#11111A] mb-2">Admin ID</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Activity className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-[#11111A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E234C] focus:border-transparent transition-all shadow-sm"
                  placeholder="Enter your Admin ID"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#11111A] mb-2">Security Key</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-[#11111A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E234C] focus:border-transparent transition-all shadow-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !adminId || !password}
              className="w-full flex items-center justify-center gap-2 bg-[#1E234C] hover:bg-[#15193B] text-white py-3.5 px-4 rounded-xl font-semibold transition-all shadow-md disabled:opacity-50 mt-4"
            >
              {loading ? 'Verifying Credentials...' : 'Access HQ'}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;
