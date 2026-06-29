import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, QrCode, Briefcase, Activity, MessageSquare } from 'lucide-react';

const Hero = () => {
  return (
    <div className="max-w-7xl mx-auto px-8 pt-20 pb-24 flex flex-col gap-20">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
        
        {/* Left Content */}
        <div className="flex-1 space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FF6B4A]/30 bg-[#FF6B4A]/5 text-xs text-[#FF6B4A] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#FF6B4A] animate-pulse"></span>
            Live · Building for Bharat with Agentic AI
          </div>
          
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] text-[#11111A]">
            The Future of <br />
            India's <span className="text-[#FF6B4A]">Workforce.</span>
          </h1>
          
          <p className="text-[#4A4A5A] text-lg max-w-xl leading-relaxed">
            KaamSetu 2.0 is the OS for India's informal economy — a portable Shram Wallet that verifies identity, builds trust, predicts employer fraud, and guarantees wages within 72 hours.
          </p>
          
          <div className="flex flex-wrap items-center gap-4 pt-4">
            {!localStorage.getItem('shram_user_name') ? (
              <Link to="/signin" className="flex items-center gap-2 bg-[#1E234C] hover:bg-[#15193B] text-white px-6 py-3 rounded-full font-medium transition-all shadow-md">
                Get Started <ArrowRight size={18} />
              </Link>
            ) : (
              <Link to="/whatsapp" className="flex items-center gap-2 px-6 py-3 rounded-full font-medium border border-gray-300 hover:bg-gray-50 text-[#11111A] transition-all">
                <MessageSquare size={18} className="text-[#FF6B4A]" /> WhatsApp Demo
              </Link>
            )}
          </div>
        </div>

        {/* Right Content - Wallet Card */}
        <div className="flex-1 relative w-full max-w-md flex justify-center">
          {/* Glow effect behind card */}
          <div className="absolute inset-0 bg-[#FF6B4A]/10 blur-[80px] rounded-full"></div>
          
          <div className="relative w-full aspect-[1.6/1] rounded-3xl bg-gradient-to-br from-[#10142D] to-[#0A0D1F] p-8 border border-gray-800 shadow-2xl flex flex-col justify-between overflow-hidden group">
            
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2 text-gray-400 text-xs font-semibold tracking-[0.2em] uppercase">
                SHRAM ID • GOVERNMENT OF BHARAT (PROPOSED)
              </div>
            </div>
            
            <div className="mt-4 flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  {localStorage.getItem('shram_user_name') || 'XYZ'}
                </h3>
                <p className="text-gray-400 text-xs">SHRAM-IN-7821-4490</p>
                <p className="text-gray-400 text-xs mt-1">Patna, BR</p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold text-white leading-none mb-1">847</p>
                <p className="text-[10px] text-[#FF6B4A] font-bold uppercase tracking-widest">TRUST SCORE</p>
                <p className="text-[10px] text-[#FF6B4A] font-bold uppercase mt-1">Strong</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 border-y border-gray-700 py-3 mt-4 mb-3">
               <div>
                  <p className="text-lg font-bold text-white">34</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">JOBS</p>
               </div>
               <div>
                  <p className="text-lg font-bold text-white">₹4.20L</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">EARNED</p>
               </div>
               <div>
                  <p className="text-lg font-bold text-white">92%</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">PAID</p>
               </div>
            </div>
            
            <div className="flex justify-between items-center text-[10px] text-gray-400">
               <div className="flex items-center gap-1 text-green-400">
                 <Activity size={12} /> Verified • Portable • Permanent
               </div>
               <span>KAAMSETU 2.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width Problem & Stats Section */}
      <div className="w-screen relative left-1/2 -translate-x-1/2 bg-[#0A1128] mt-12 py-24">
        <div className="max-w-7xl mx-auto px-8">
          
          <div className="mb-16">
            <h4 className="text-[#FF6B4A] font-bold tracking-widest text-xs uppercase mb-4">The Problem</h4>
            <h2 className="text-4xl md:text-5xl font-bold text-white max-w-3xl leading-tight">
              A worker who built your office has never been paid on time.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <div className="border-l border-transparent md:pl-0">
              <h2 className="text-5xl font-extrabold text-[#FF6B4A] mb-2">450M</h2>
              <p className="text-sm text-white font-bold mb-1">Informal workers</p>
              <p className="text-xs text-gray-400">No verifiable work history</p>
            </div>
            <div className="border-l border-gray-800 pl-6">
              <h2 className="text-5xl font-extrabold text-[#FF6B4A] mb-2">₹0</h2>
              <p className="text-sm text-white font-bold mb-1">Financial identity</p>
              <p className="text-xs text-gray-400">Invisible to banks & credit</p>
            </div>
            <div className="border-l border-gray-800 pl-6">
              <h2 className="text-5xl font-extrabold text-[#FF6B4A] mb-2">15%</h2>
              <p className="text-sm text-white font-bold mb-1">Broker commission</p>
              <p className="text-xs text-gray-400">Eaten by middlemen daily</p>
            </div>
            <div className="border-l border-gray-800 pl-6">
              <h2 className="text-5xl font-extrabold text-[#FF6B4A] mb-2">60%</h2>
              <p className="text-sm text-white font-bold mb-1">Payment default</p>
              <p className="text-xs text-gray-400">Never paid what was agreed</p>
            </div>
          </div>

          <div className="border-l-4 border-[#FF6B4A] pl-6 max-w-4xl py-2">
            <p className="text-gray-300 text-lg italic leading-relaxed">
              "Ramesh Kumar built 34 buildings. He has ₹4.2L in wages earned. He couldn't get a ₹10,000 loan. His contractor paid him 3 weeks late — 11 times in a row. He had no contract. No proof. No recourse. <span className="text-[#FF6B4A] font-semibold not-italic">He is 450 million people.</span>"
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
