import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 mt-12 py-12 bg-[#FDFCF8]">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-[#11111A] font-bold text-xl mb-1 flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#11111A] flex items-center justify-center">
              <span className="text-white font-bold text-xs">क</span>
            </div>
            KaamSetu.
          </h3>
          <p className="text-[#4A4A5A] text-xs">The OS for India's informal economy.</p>
        </div>
        
        <div className="flex gap-8 text-sm text-[#4A4A5A] font-semibold">
          <a href="#dashboard" className="hover:text-[#11111A] transition-colors">Dashboard</a>
          <a href="#signin" className="hover:text-[#11111A] transition-colors">Sign in</a>
        </div>
        
        <div className="text-gray-400 text-xs font-medium">
          © 2026 KaamSetu Labs
        </div>
      </div>
    </footer>
  );
};

export default Footer;
