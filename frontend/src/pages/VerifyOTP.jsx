import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { API_BASE_URL } from '../config';


const VerifyOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  const location = useLocation();
  const navigate = useNavigate();
  const mobile = location.state?.mobile;
  const role = location.state?.role;

  // Refs for auto-focusing next input
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    if (!mobile) {
      // If no mobile number in state, user probably navigated here directly
      navigate('/signin');
    }
  }, [mobile, navigate]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if there's a value
    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length !== 4) return;
    
    setLoading(true);
    setErrorMsg('');
    
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/verify-otp/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobile, otp: otpValue }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setSuccessMsg('Verified successfully! Redirecting...');
        
        // Store session
        localStorage.setItem('shram_user_id', data.user_id);
        
        let finalName = data.name;
        const pendingName = localStorage.getItem('pending_signup_name');
        
        if (!finalName || finalName === 'Worker') {
            if (pendingName) {
                finalName = pendingName;
            }
        }
        
        if (finalName && finalName !== 'Worker') {
            localStorage.setItem('shram_user_name', finalName);
            if (pendingName) {
                localStorage.removeItem('pending_signup_name');
                // Update backend with the new name
                fetch(`${API_BASE_URL}/api/users/profile/complete/`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ user_id: data.user_id, name: finalName })
                }).catch(e => console.error(e));
            }
        } else {
            localStorage.setItem('shram_user_name', 'Worker');
        }
        
        // Wait 1.5s then redirect
        setTimeout(() => {
            if (role === 'worker') {
                navigate('/worker');
            } else {
                navigate('/dashboard');
            }
        }, 1500);
      } else {
        setErrorMsg(data.error || 'Invalid OTP');
      }
    } catch (err) {
      setErrorMsg('Failed to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  if (!mobile) return null;

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
            <div className="text-[#FF6B4A] text-xs font-bold tracking-widest uppercase mb-4">
              Step 2 of 2
            </div>
            <h2 className="text-2xl font-bold mb-2 text-[#11111A]">Check your WhatsApp</h2>
            <p className="text-[#4A4A5A] text-sm mb-8">
              We sent a 4-digit code to <span className="text-[#11111A] font-medium">{mobile}</span>
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-between gap-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={inputRefs[index]}
                    type="text"
                    maxLength={1}
                    className="w-16 h-16 text-center text-2xl font-bold bg-white border border-gray-200 rounded-xl text-[#11111A] focus:outline-none focus:ring-2 focus:ring-[#1E234C] focus:border-transparent transition-all shadow-sm"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    disabled={loading}
                  />
                ))}
              </div>

              {errorMsg && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200 text-center font-medium">
                  {errorMsg}
                </div>
              )}
              
              {successMsg && (
                <div className="text-sm text-emerald-600 bg-emerald-50 p-3 rounded-lg border border-emerald-200 text-center font-medium">
                  {successMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || otp.join('').length !== 4}
                className="w-full bg-[#1E234C] hover:bg-[#15193B] text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{loading ? 'Verifying...' : 'Verify Code'}</span>
                {!loading && <CheckCircle2 className="w-5 h-5 group-hover:scale-110 transition-transform" />}
              </button>

              <div className="text-center">
                <button type="button" onClick={() => navigate('/signin')} className="text-[#4A4A5A] text-sm hover:text-[#11111A] transition-colors flex items-center justify-center gap-1 mx-auto font-medium">
                    <RefreshCw className="w-4 h-4" />
                    Change mobile number
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VerifyOTP;
