import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-4 w-full max-w-7xl mx-auto pt-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#11111A] flex items-center justify-center">
          <span className="text-white font-bold text-sm">क</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-lg leading-tight tracking-tight text-[#11111A]">KaamSetu</span>
          <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase leading-none">2.0 • SHRAM OS</span>
        </div>
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#4A4A5A]">
        <a href="#how-it-works" className="hover:text-black transition-colors">How it works</a>
        <Link to="/jobs" className="hover:text-black transition-colors">Jobs</Link>
        {localStorage.getItem('shram_user_name') && (
          <Link to="/whatsapp" className="hover:text-black transition-colors">WhatsApp demo</Link>
        )}
        <Link to="/employer-login" className="hover:text-black transition-colors">For employers</Link>
      </div>

      {localStorage.getItem('shram_user_name') ? (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#11111A] flex items-center justify-center text-white font-bold">
              {localStorage.getItem('shram_user_name').charAt(0).toUpperCase()}
            </div>
            <span className="text-[#11111A] font-medium">{localStorage.getItem('shram_user_name')}</span>
          </div>
          <button 
            onClick={() => {
              localStorage.removeItem('shram_user_name');
              localStorage.removeItem('shram_user_id');
              window.location.reload();
            }}
            className="text-xs text-gray-500 hover:text-[#11111A] underline font-semibold"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-6">
          <Link to="/signin" className="text-sm font-semibold text-[#11111A] hover:opacity-70 transition-opacity">
            Sign in
          </Link>
          <Link to="/whatsapp" className="bg-[#11111A] hover:bg-gray-800 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all">
            Try the demo
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
