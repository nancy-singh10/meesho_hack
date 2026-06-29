import React from 'react';
import WorkerLayout from '../../components/worker/WorkerLayout';
import { Mic, Send, Volume2, User, Play, CheckCheck, Bot } from 'lucide-react';
import { motion } from 'framer-motion';

const WorkerNegotiation = () => {
  const chatMessages = [
    { sender: 'agent', text: 'Skill scan complete. RCC Shuttering - 12 day project - Patna. Benchmark wage ₹880-₹1,020/day.' },
    { sender: 'worker', text: 'Mandi rate ₹700 chalu hai. ₹950 chahiye.' },
    { sender: 'agent', text: 'Drafting voice note for employer in Bhojpuri dialect with ₹950 anchor + on-time pay clause...' },
    { sender: 'employer', text: '₹880 final. Saamaan hum denge.' },
    { sender: 'agent', text: 'Counter-offer drafted: ₹920/day + materials. Pay Probability Score 96%. Sending voice note...' },
    { sender: 'employer', text: 'Manzoor. Kal subah 7 baje site pe milo.' },
  ];

  return (
    <WorkerLayout 
      title="AI Negotiation Agent" 
      subtitle="Dialect-adaptive · Bhojpuri voice synthesis · Live to employer's WhatsApp"
    >
      <div className="p-8 max-w-7xl mx-auto pb-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
          
          {/* Main Chat Area */}
          <div className="lg:col-span-2 bg-white border border-gray-200 shadow-sm rounded-3xl flex flex-col overflow-hidden relative">
            
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white z-10 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#1E234C] flex items-center justify-center text-white shadow-md">
                        <Bot size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-[#11111A]">Negotiation Agent</h3>
                        <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Active · Bhojpuri Dialect</span>
                        </div>
                    </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-[#11111A] hover:bg-gray-100 transition-colors">
                    <Mic size={16} className="text-[#FF6B4A]" /> Voice
                </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-gray-50/50">
                {chatMessages.map((msg, idx) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.2 }}
                        key={idx} 
                        className={`flex gap-3 max-w-[80%] ${msg.sender === 'worker' ? 'ml-auto flex-row-reverse' : ''}`}
                    >
                        {/* Avatar */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-sm ${
                            msg.sender === 'agent' ? 'bg-[#1E234C] text-white' : 
                            msg.sender === 'employer' ? 'bg-amber-100 text-amber-700 border border-amber-200' : 
                            'bg-[#FF6B4A] text-white'
                        }`}>
                            {msg.sender === 'agent' && <Bot size={14} />}
                            {msg.sender === 'employer' && <span className="font-bold text-xs">EMP</span>}
                            {msg.sender === 'worker' && <User size={14} />}
                        </div>

                        {/* Bubble */}
                        <div className={`p-4 rounded-2xl text-sm shadow-sm ${
                            msg.sender === 'agent' ? 'bg-white border border-gray-200 text-[#11111A] rounded-tl-none' : 
                            msg.sender === 'employer' ? 'bg-amber-50 border border-amber-100 text-[#11111A] rounded-tl-none' : 
                            'bg-[#FF6B4A] text-white rounded-tr-none'
                        }`}>
                            {msg.sender === 'agent' && <p className="text-[9px] font-bold tracking-wider uppercase mb-1 text-gray-400">AGENT</p>}
                            {msg.sender === 'employer' && <p className="text-[9px] font-bold tracking-wider uppercase mb-1 text-amber-600">EMPLOYER</p>}
                            {msg.sender === 'worker' && <p className="text-[9px] font-bold tracking-wider uppercase mb-1 text-orange-200">WORKER</p>}
                            <p className="leading-relaxed">{msg.text}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-white border-t border-gray-200 shrink-0">
                <div className="relative flex items-center">
                    <input 
                        type="text" 
                        placeholder="Ask the agent..." 
                        className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-[#FF6B4A] focus:ring-1 focus:ring-[#FF6B4A] transition-all"
                    />
                    <button className="absolute right-2 w-8 h-8 bg-[#1E234C] rounded-full flex items-center justify-center text-white hover:bg-[#2a3163] transition-colors">
                        <Send size={14} className="-ml-0.5" />
                    </button>
                </div>
            </div>
          </div>

          {/* Right Sidebar Area */}
          <div className="flex flex-col gap-6">
              
              {/* Voice Waveform */}
              <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white border border-gray-200 shadow-sm rounded-3xl p-6 flex flex-col justify-between"
              >
                  <div className="flex items-center gap-2 text-[#1E234C] font-bold text-xs tracking-wider uppercase mb-6">
                      <Volume2 size={14} />
                      <span>Voice Waveform</span>
                  </div>
                  
                  <div className="flex items-center justify-between h-20 gap-1 px-2">
                      {[...Array(40)].map((_, i) => {
                          // Generate varying heights for the waveform
                          const height = Math.max(10, Math.sin(i * 0.5) * 40 + Math.random() * 30 + 10);
                          return (
                              <motion.div 
                                  key={i}
                                  animate={{ height: [`${height}%`, `${height * 0.5}%`, `${height}%`] }}
                                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.05 }}
                                  className="w-1.5 bg-[#FF6B4A] rounded-full opacity-80"
                                  style={{ height: `${height}%` }}
                              />
                          );
                      })}
                  </div>

                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-6 text-center">
                      ElevenLabs · 12 micro-dialect models · 24kHz output
                  </p>
              </motion.div>

              {/* WhatsApp Preview */}
              <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white border border-gray-200 shadow-sm rounded-3xl p-6 flex-1 flex flex-col"
              >
                  <div className="flex items-center gap-2 text-[#1E234C] font-bold text-xs tracking-wider uppercase mb-6">
                      <div className="w-4 h-4 bg-emerald-500 rounded flex items-center justify-center">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                      </div>
                      <span>WhatsApp Preview</span>
                  </div>

                  <div className="flex-1 bg-[#EFEAE2] rounded-2xl p-4 flex flex-col justify-center relative overflow-hidden">
                      {/* WhatsApp Chat Background Pattern Simulation */}
                      <div className="absolute inset-0 opacity-10 bg-[url('https://static.whatsapp.net/rsrc.php/v3/yl/r/r2_l-l478z.png')]"></div>
                      
                      <div className="relative z-10 bg-white rounded-xl p-2 pb-1 shadow-sm max-w-[95%]">
                          <p className="text-[10px] text-gray-500 font-bold mb-2 ml-1 uppercase">From KaamSetu Agent</p>
                          
                          {/* Audio Player Mock */}
                          <div className="flex items-center gap-3 bg-gray-50 rounded-full p-1.5 pr-4 border border-gray-100">
                              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white shrink-0 shadow-sm cursor-pointer hover:bg-emerald-600">
                                  <Play size={14} className="ml-0.5" />
                              </div>
                              <div className="flex-1 flex items-center gap-1">
                                  {/* Fake Audio Waveform */}
                                  <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden flex">
                                     <div className="w-1/3 h-full bg-emerald-500"></div>
                                  </div>
                                  <span className="text-[10px] text-gray-400 font-medium shrink-0">0:14</span>
                              </div>
                              {/* Avatar in audio */}
                              <div className="w-6 h-6 rounded-full bg-[#1E234C] shrink-0 border border-white"></div>
                          </div>
                          
                          <p className="text-xs text-[#11111A] mt-3 italic px-1">"Bhaiyaji, {localStorage.getItem('shram_user_name')?.split(' ')[0] || 'Worker'} ji ke liye ₹920 per day final kar deejiye..."</p>
                          
                          <div className="flex justify-end items-center gap-1 mt-1">
                              <span className="text-[9px] text-gray-400 font-medium">12:04</span>
                              <CheckCheck size={12} className="text-blue-500" />
                          </div>
                      </div>
                  </div>
              </motion.div>

          </div>
        </div>
      </div>
    </WorkerLayout>
  );
};

export default WorkerNegotiation;
