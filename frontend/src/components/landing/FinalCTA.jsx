import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, ArrowRight } from 'lucide-react';

const FinalCTA = () => {
  return (
    <section className="w-full py-32 bg-[#FDFCF8] flex flex-col items-center justify-center text-center px-4 border-t border-gray-200 mt-12">
      <div className="max-w-4xl mx-auto space-y-2 mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#11111A] tracking-tight">
          Aadhaar gave India an identity.
        </h2>
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#11111A] tracking-tight">
          UPI gave India payments.
        </h2>
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#FF6B4A] tracking-tight">
          KaamSetu gives India's<br />workers both —
        </h2>
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#11111A] tracking-tight">
          and a livelihood they can<br />prove.
        </h2>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
        {localStorage.getItem('shram_user_name') ? (
          <Link to="/whatsapp" className="flex items-center gap-2 bg-[#1E234C] hover:bg-[#15193B] text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md text-sm">
            <MessageSquare size={16} /> Start the demo
          </Link>
        ) : (
          <Link to="/signin" className="flex items-center gap-2 bg-[#1E234C] hover:bg-[#15193B] text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md text-sm">
            <ArrowRight size={16} /> Get Started
          </Link>
        )}
        <Link to="/employer-login" className="flex items-center gap-2 bg-transparent border border-gray-300 hover:border-gray-400 text-[#11111A] px-6 py-3 rounded-xl font-semibold transition-all text-sm">
          I'm an employer <ArrowRight size={16} />
        </Link>
      </div>

      <p className="text-[10px] text-gray-400 tracking-widest uppercase font-semibold">
        Built by Nancy Singh • DTU 2027 • for the 450M who built India
      </p>
    </section>
  );
};

export default FinalCTA;
