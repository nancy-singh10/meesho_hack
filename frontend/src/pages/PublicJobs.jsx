import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Users, Clock, ShieldCheck, Star } from 'lucide-react';

const PublicJobs = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const jobs = [
    {
      id: 1,
      category: 'ELECTRICIAN',
      title: 'Electrician for site wiring',
      company: 'Sharma Constructions',
      rating: 4.6,
      pay: '₹900',
      location: 'Lucknow, UP',
      duration: '14 days',
      workersNeeded: 2,
      startDate: '1 Jul',
      description: 'Full house wiring + panel setup for new build.',
      timeAgo: '42m ago',
    },
    {
      id: 2,
      category: 'MASON',
      title: 'Mason for residential build',
      company: 'Sharma Constructions',
      rating: 4.6,
      pay: '₹950',
      location: 'Lucknow, UP',
      duration: '30 days',
      workersNeeded: 3,
      startDate: '30 Jun',
      description: '3-storey residential block, RCC shuttering experience preferred.',
      timeAgo: '42m ago',
    },
    {
      id: 3,
      category: 'WELDER',
      title: 'Welder for steel frame',
      company: 'Gupta Builders Pvt Ltd',
      rating: 4.3,
      pay: '₹1.1K',
      location: 'Patna, BR',
      duration: '20 days',
      workersNeeded: 2,
      startDate: '2 Jul',
      description: 'Structural steel framework, MIG welding.',
      timeAgo: '42m ago',
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#11111A] font-sans selection:bg-purple-200">
      
      {/* Custom Navbar for this Light Theme Page */}
      <nav className="flex items-center justify-between px-8 py-4 w-full max-w-7xl mx-auto border-b border-gray-200">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-8 h-8 rounded-full bg-[#11111A] flex items-center justify-center">
            <span className="text-white font-bold text-sm">क</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg leading-tight tracking-tight text-[#11111A]">KaamSetu</span>
            <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase leading-none">2.0 • SHRAM OS</span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#4A4A5A]">
          <Link to="/" className="hover:text-black transition-colors">How it works</Link>
          <Link to="/jobs" className="text-black transition-colors">Jobs</Link>
          <Link to="/whatsapp" className="hover:text-black transition-colors">WhatsApp demo</Link>
          <Link to="/employer-login" className="hover:text-black transition-colors">For employers</Link>
        </div>

        <div className="flex items-center gap-6">
          <Link to="/signin" className="text-sm font-semibold text-[#11111A] hover:opacity-70 transition-opacity">
            Sign in
          </Link>
          <Link to="/signin" className="bg-[#11111A] hover:bg-gray-800 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all">
            Try the demo
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-16">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-16">
          <p className="text-[#FF6B4A] text-xs font-bold tracking-widest uppercase mb-4">Open Work</p>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-[#11111A]">
            Verified jobs across Bharat.
          </h1>
          <p className="text-lg text-[#4A4A5A] leading-relaxed max-w-2xl mb-10">
            Every employer here is checked for GST, UPI age, and payment history. Apply via WhatsApp — the AI negotiates fair wage for you.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl text-[#11111A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#11111A] focus:border-transparent transition-shadow shadow-sm"
              placeholder="Search by skill, city, or company"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
              
              <div className="flex justify-between items-start mb-2">
                <span className="text-[#FF6B4A] text-xs font-bold tracking-widest uppercase">{job.category}</span>
                <div className="text-right">
                  <div className="text-xl font-bold text-[#11111A] leading-none">{job.pay}</div>
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">PER DAY</div>
                </div>
              </div>

              <h3 className="text-lg font-bold text-[#11111A] mb-1">{job.title}</h3>
              <div className="flex items-center gap-1.5 text-sm text-gray-600 mb-6">
                <span>{job.company}</span>
                <span className="text-gray-300">•</span>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-semibold">{job.rating}</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm text-[#4A4A5A]">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#4A4A5A]">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>{job.duration}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#4A4A5A]">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span>{job.workersNeeded} workers needed</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#4A4A5A]">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>starts {job.startDate}</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-6 line-clamp-2 min-h-[40px]">
                {job.description}
              </p>

              <div className="mt-auto">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-full text-xs font-bold tracking-wider">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    SAFE
                  </div>
                  <span className="text-xs text-gray-400 font-medium">{job.timeAgo}</span>
                </div>

                <Link to="/whatsapp" className="w-full block text-center bg-[#1E234C] hover:bg-[#15193B] text-white font-semibold py-3.5 rounded-xl transition-colors">
                  Apply via WhatsApp
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default PublicJobs;
