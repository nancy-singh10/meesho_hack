import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Briefcase, Users, FileText, BarChart, LogOut } from 'lucide-react';

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('shram_user_id');
    localStorage.removeItem('shram_user_name');
    navigate('/');
  };

  const navItems = [
    { path: '/dashboard', icon: <BarChart size={20} />, label: 'Overview' },
    { path: '/dashboard/post-job', icon: <Briefcase size={20} />, label: 'Post a Job' },
    { path: '/dashboard/contracts', icon: <FileText size={20} />, label: 'Contracts' },
    { path: '/dashboard/workers', icon: <Users size={20} />, label: 'My Workers' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#11111A] flex font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1E234C] flex items-center justify-center">
              <span className="text-white font-bold text-sm">क</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight tracking-tight text-[#11111A]">KaamSetu</span>
              <span className="text-[10px] font-bold text-[#FF6B4A] tracking-widest uppercase leading-none">Biz</span>
            </div>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 mt-8 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                location.pathname === item.path || location.pathname.startsWith(`${item.path}/`) && item.path !== '/dashboard'
                  ? 'bg-orange-50 text-[#FF6B4A] border border-orange-200 font-semibold shadow-sm'
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
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-20 border-b border-gray-200 flex items-center justify-between px-8 bg-white z-10">
            <h1 className="text-2xl font-bold text-[#11111A]">Employer Dashboard</h1>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1E234C] flex items-center justify-center text-white font-bold shadow-md">
                {localStorage.getItem('shram_user_name')?.charAt(0).toUpperCase() || 'E'}
              </div>
              <div>
                  <p className="text-sm font-bold text-[#11111A]">{localStorage.getItem('shram_user_name') || 'Employer'}</p>
                  <p className="text-xs text-[#4A4A5A] font-medium">Verified Business</p>
              </div>
            </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-8 z-10">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
