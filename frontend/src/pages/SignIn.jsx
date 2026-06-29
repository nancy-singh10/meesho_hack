import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, ArrowRight, ShieldCheck, CheckCircle2, User, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

const SignIn = () => {
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const navigate = useNavigate();

  const [authType, setAuthType] = useState('signin');
  const [role, setRole] = useState('worker');
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mobile) return;
    if (authType === 'signup' && !name) {
        setErrorMsg('Please enter your name');
        return;
    }
    if (authType === 'signup' && role === 'employer' && !companyName) {
        setErrorMsg('Please enter your company name');
        return;
    }
    
    setLoading(true);
    setResponseMsg('');
    setErrorMsg('');

    if (role === 'employer') {
      setTimeout(() => {
        localStorage.setItem('shram_user_name', authType === 'signup' ? companyName : 'L&T Infra');
        localStorage.setItem('shram_user_id', 'EMP-999');
        navigate('/dashboard');
      }, 1000);
      return;
    }
    
    try {
      const res = await fetch('http://127.0.0.1:8000/api/auth/send-otp/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobile }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setResponseMsg(data.message);
        if (authType === 'signup') {
            localStorage.setItem('pending_signup_name', name);
        }
        setTimeout(() => {
          navigate('/verify', { state: { mobile, role } });
        }, 800);
      } else {
        setErrorMsg(data.error || 'Something went wrong');
      }
    } catch (err) {
      setErrorMsg('Failed to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#11111A] flex flex-col md:flex-row relative overflow-hidden font-sans">
      {/* Background ambient light */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-100/50 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-100/50 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Left side content */}
      <div className="w-full md:w-1/2 p-8 md:p-16 lg:p-24 flex flex-col justify-between z-10">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 mb-16 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 rounded-full bg-[#11111A] flex items-center justify-center">
              <span className="text-white font-bold text-sm">क</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight tracking-tight text-[#11111A]">KaamSetu</span>
              <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase leading-none">2.0 • SHRAM OS</span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 tracking-tight">
              Your work, <span className="text-[#FF6B4A]">your identity.</span>
            </h1>
            <p className="text-[#4A4A5A] text-lg max-w-md mb-12 leading-relaxed">
              Sign in to your Shram Wallet — portable, verified, owned by you. No Aadhaar required.
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-[#4A4A5A]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>ISO 27001</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>RBI SRO</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>SOC 2</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-20 md:mt-0 text-xs text-gray-500">
          © 2026 KaamSetu Labs
        </div>
      </div>

      {/* Right side - Login Card */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md relative"
        >
          {/* Card glow effect */}
          <div className="absolute -inset-1 bg-orange-200 rounded-2xl blur-xl opacity-30" />
          
          <div className="relative bg-white border border-gray-200 rounded-2xl p-8 shadow-2xl backdrop-blur-xl">
            
            {/* Top Toggle */}
            <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
                <button 
                    className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${authType === 'signin' ? 'bg-white text-[#11111A] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => { setAuthType('signin'); setErrorMsg(''); }}
                    type="button"
                >
                    Sign in
                </button>
                <button 
                    className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${authType === 'signup' ? 'bg-white text-[#11111A] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => { setAuthType('signup'); setErrorMsg(''); }}
                    type="button"
                >
                    Create account
                </button>
            </div>

            <div className="mb-8">
                <p className="text-sm font-medium text-[#4A4A5A] mb-3">I am a...</p>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={() => { setRole('worker'); setErrorMsg(''); }}
                        className={`p-4 rounded-xl border text-left transition-all ${role === 'worker' ? 'border-[#FF6B4A] bg-orange-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                    >
                        <div className={`font-semibold mb-1 ${role === 'worker' ? 'text-[#FF6B4A]' : 'text-[#11111A]'}`}>Worker</div>
                        <div className="text-xs text-gray-500 leading-tight">Get jobs via WhatsApp</div>
                    </button>
                    <button
                        type="button"
                        onClick={() => { setRole('employer'); setErrorMsg(''); }}
                        className={`p-4 rounded-xl border text-left transition-all ${role === 'employer' ? 'border-[#1E234C] bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                    >
                        <div className={`font-semibold mb-1 ${role === 'employer' ? 'text-[#1E234C]' : 'text-[#11111A]'}`}>Employer</div>
                        <div className="text-xs text-gray-500 leading-tight">Post jobs, hire workers</div>
                    </button>
                </div>
            </div>

            <h2 className="text-xl font-bold mb-2 text-[#11111A]">{authType === 'signin' ? 'Enter your mobile' : 'Create your account'}</h2>
            <p className="text-[#4A4A5A] text-sm mb-6">
              {role === 'worker' ? "We'll send a 4-digit code on WhatsApp." : "We'll verify your business account."}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {authType === 'signup' && (
                <>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-[#11111A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E234C] focus:border-transparent transition-all shadow-sm"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={loading}
                    />
                  </div>

                  {role === 'employer' && (
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Building2 className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        className="block w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-[#11111A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E234C] focus:border-transparent transition-all shadow-sm"
                        placeholder="Company Name"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                  )}
                </>
              )}

              <div className="relative mt-2">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  className="block w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-[#11111A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E234C] focus:border-transparent transition-all shadow-sm"
                  placeholder="+91 98XXX XX490"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  disabled={loading}
                />
              </div>

              {responseMsg && (
                <div className="text-sm text-emerald-600 bg-emerald-50 p-3 rounded-lg border border-emerald-200 mt-4 font-medium">
                  {responseMsg}
                </div>
              )}

              {errorMsg && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200 mt-4 font-medium">
                  {errorMsg}
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading || !mobile || (authType === 'signup' && !name) || (authType === 'signup' && role === 'employer' && !companyName)}
                  className="w-full text-white font-semibold py-3.5 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed bg-[#1E234C] hover:bg-[#15193B]"
                >
                  <span>{loading ? 'Processing...' : (authType === 'signin' ? 'Sign In' : 'Create Account')}</span>
                  {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignIn;
