import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, ArrowRight, Building2, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const EmployerLogin = () => {
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call for Employer Login
    setTimeout(() => {
      localStorage.setItem('shram_user_name', 'L&T Infra');
      localStorage.setItem('shram_user_id', 'EMP-999');
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#11111A] flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full space-y-8">
        
        <div className="text-center">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-[#1E234C] flex items-center justify-center mb-6 shadow-md cursor-pointer" onClick={() => navigate('/')}>
            <Briefcase size={32} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight mb-2 text-[#11111A]">KaamSetu <span className="text-[#FF6B4A]">Biz</span></h2>
          <p className="text-[#4A4A5A]">Employer Portal. Post jobs and hire verified workers instantly.</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-gray-200 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-[#1E234C]"></div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-[#11111A] mb-2">Registered Mobile Number / GSTIN</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Building2 className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-[#11111A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E234C] focus:border-transparent transition-all shadow-sm"
                  placeholder="Enter business number"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !mobile}
              className="w-full flex items-center justify-center gap-2 bg-[#1E234C] hover:bg-[#15193B] text-white py-3.5 px-4 rounded-xl font-semibold transition-all shadow-md disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Secure Login'}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-center gap-2 text-sm text-[#4A4A5A] font-medium">
            <ShieldCheck size={16} className="text-emerald-500" />
            <span>End-to-end encrypted business portal</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EmployerLogin;
