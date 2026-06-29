import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Wallet, Briefcase, ShieldAlert, MessageSquare, FileText, CreditCard, Umbrella, Code, Bell, Settings, LogOut, Search, MapPin } from 'lucide-react';

const WorkerLayout = ({ children, title, subtitle }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('shram_user_id');
    localStorage.removeItem('shram_user_name');
    navigate('/');
  };

  const navItems = [
    { path: '/worker', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
    { path: '/worker/wallet', icon: <Wallet size={18} />, label: 'Shram Wallet' },
    { path: '/worker/jobs', icon: <Briefcase size={18} />, label: 'Find Work' },
    { path: '/worker/attendance', icon: <MapPin size={18} />, label: 'Attendance' },
    { path: '/worker/fraud-score', icon: <ShieldAlert size={18} />, label: 'Fraud Score' },
    { path: '/worker/negotiation', icon: <MessageSquare size={18} />, label: 'Negotiation' },
    { path: '/worker/contract', icon: <FileText size={18} />, label: 'Contract' },
    { path: '/worker/payments', icon: <CreditCard size={18} />, label: 'Payments' },
    { path: '/worker/insurance', icon: <Umbrella size={18} />, label: 'Insurance' },
  ];

  return (
    <div className="flex h-screen bg-[#FDFCF8] text-[#11111A] overflow-hidden font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col flex-shrink-0 z-20">
        <div className="p-6 pb-8 border-b border-gray-200">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#11111A] flex items-center justify-center">
              <span className="text-white font-bold text-sm">क</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight tracking-tight text-[#11111A]">KaamSetu</span>
              <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase leading-none">2.0 • SHRAM OS</span>
            </div>
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-[#FF6B4A]/10 text-[#FF6B4A] border border-[#FF6B4A]/20 shadow-sm font-semibold'
                    : 'text-[#4A4A5A] hover:bg-gray-50 hover:text-[#11111A]'
                }`}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-gray-200 space-y-2">
           <button className="flex items-center gap-3 px-4 py-3 text-[#4A4A5A] hover:text-[#11111A] transition-colors w-full rounded-xl hover:bg-gray-50">
            <Settings size={18} />
            <span className="text-sm font-medium">Settings</span>
          </button>
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-red-600 hover:text-red-700 transition-colors w-full rounded-xl hover:bg-red-50">
            <LogOut size={18} />
            <span className="text-sm font-medium">Sign out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Top Header */}
        <header className="h-20 border-b border-gray-200 flex items-center justify-between px-8 bg-white z-10 flex-shrink-0">
            <div>
               <h1 className="text-xl font-bold text-[#11111A]">{title || 'Shram Worker'}</h1>
               <p className="text-sm text-[#4A4A5A] mt-1">{subtitle}</p>
            </div>
            
            <div className="flex items-center gap-6">
                <div className="relative w-80">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                       <Search className="h-4 w-4 text-gray-400" />
                   </div>
                   <input 
                       type="text" 
                       placeholder="Search jobs, employers, transactions ⌘K" 
                       className="block w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm text-[#11111A] placeholder-gray-400 focus:outline-none focus:border-[#FF6B4A] focus:ring-1 focus:ring-[#FF6B4A] transition-all"
                   />
                </div>

                <button onClick={() => navigate('/whatsapp')} className="bg-[#25D366] hover:bg-[#128C7E] text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-colors shadow-sm">
                    <MessageSquare size={16} /> WhatsApp Bot
                </button>

                <button className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#11111A] transition-colors relative">
                    <Bell size={18} />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#FF6B4A] rounded-full border-2 border-white"></span>
                </button>

                <div className="flex items-center gap-3 border-l border-gray-200 pl-6">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-bold text-[#11111A]">{localStorage.getItem('shram_user_name') || 'Worker'}</p>
                        <p className="text-[10px] text-gray-500 font-mono">SHRAM-IN-7821-4490</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#1E234C] flex items-center justify-center font-bold text-sm text-white shadow-md">
                        RK
                    </div>
                </div>
            </div>
        </header>
        
        <main className="flex-1 overflow-y-auto bg-[#FDFCF8] z-10 relative">
             {/* Background ambient light */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-100/40 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-100/40 rounded-full blur-[120px] pointer-events-none" />
            <div className="relative z-10">
                {children}
            </div>
        </main>
      </div>
    </div>
  );
};

export default WorkerLayout;
