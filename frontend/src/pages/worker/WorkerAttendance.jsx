import React, { useState, useEffect } from 'react';
import WorkerLayout from '../../components/worker/WorkerLayout';
import { MapPin, Camera, Clock, CheckCircle2, ShieldCheck, Map, ScanFace } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WorkerAttendance = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState('00:00:00');
  const [isVerifying, setIsVerifying] = useState(false);

  // Timer simulation
  useEffect(() => {
    let interval;
    if (isCheckedIn && !isCheckedOut) {
      let seconds = 0;
      interval = setInterval(() => {
        seconds++;
        const hrs = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        setTimeElapsed(`${hrs}:${mins}:${secs}`);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCheckedIn, isCheckedOut]);

  const handleCheckIn = () => {
    setIsVerifying(true);
    setTimeout(() => {
        setIsVerifying(false);
        setIsCheckedIn(true);
    }, 1500);
  };

  const handleCheckOut = () => {
    setIsVerifying(true);
    setTimeout(() => {
        setIsVerifying(false);
        setIsCheckedOut(true);
    }, 2000);
  };

  return (
    <WorkerLayout 
      title="Smart Attendance" 
      subtitle="Geofenced clock-in · Daily proof of work"
    >
      <div className="p-8 max-w-7xl mx-auto space-y-6 pb-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Location / Map Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-gray-200 shadow-sm rounded-3xl overflow-hidden flex flex-col h-[600px]"
          >
            {/* Map Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white relative z-10">
                <div>
                    <h3 className="font-bold text-[#11111A]">Bhardwaj Constructions</h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <MapPin size={12} /> Sector 62, Noida
                    </p>
                </div>
                <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold border border-emerald-100 flex items-center gap-1.5">
                    <ShieldCheck size={14} /> GPS Verified
                </div>
            </div>

            {/* Simulated Map Area */}
            <div className="flex-1 relative bg-[#e5e9ea] overflow-hidden">
                {/* SVG Map Pattern */}
                <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#9CA3AF" strokeWidth="1"/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                    {/* Fake Roads */}
                    <path d="M 0 100 Q 150 150 200 50 T 400 200 T 600 100" fill="none" stroke="white" strokeWidth="8"/>
                    <path d="M 100 0 L 150 600" fill="none" stroke="white" strokeWidth="6"/>
                </svg>

                {/* Geofence Circle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-64 h-64 bg-emerald-500/20 border-2 border-emerald-500 rounded-full animate-[pulse_3s_ease-in-out_infinite] flex items-center justify-center">
                        <div className="w-4 h-4 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.8)] relative">
                             {/* User Dot */}
                             <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full"></div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-gray-200 flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
                    <span className="text-sm font-bold text-[#11111A]">You are inside the geofence</span>
                </div>
            </div>
          </motion.div>

          {/* Action Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white border border-gray-200 shadow-sm rounded-3xl p-8 flex flex-col items-center justify-center h-[600px] relative overflow-hidden text-center"
          >
             {/* Background glowing shape */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-50 rounded-full blur-[100px] opacity-60 pointer-events-none"></div>

             <div className="relative z-10 w-full max-w-sm">
                
                <AnimatePresence mode="wait">
                    {!isCheckedIn && !isCheckedOut && (
                        <motion.div 
                            key="checkin"
                            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -20 }}
                            className="flex flex-col items-center"
                        >
                            <div className="w-24 h-24 bg-gray-50 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 mb-6 shadow-inner">
                                <ScanFace size={40} />
                            </div>
                            <h2 className="text-2xl font-bold text-[#11111A] mb-2">Ready to work?</h2>
                            <p className="text-[#4A4A5A] mb-8 text-sm">Your location is verified. Clock in to start the smart contract timer.</p>
                            
                            <button 
                                onClick={handleCheckIn}
                                disabled={isVerifying}
                                className="w-full bg-[#1E234C] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#2a316a] transition-colors shadow-lg disabled:opacity-70"
                            >
                                {isVerifying ? (
                                    <span className="animate-pulse">Verifying GPS...</span>
                                ) : (
                                    <>Clock In Now <CheckCircle2 size={18} /></>
                                )}
                            </button>
                        </motion.div>
                    )}

                    {isCheckedIn && !isCheckedOut && (
                        <motion.div 
                            key="active"
                            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -20 }}
                            className="flex flex-col items-center w-full"
                        >
                            <div className="text-[10px] font-bold text-[#FF6B4A] tracking-wider uppercase mb-2 bg-orange-50 px-3 py-1 rounded-full">Shift Active</div>
                            <h2 className="text-6xl font-black text-[#11111A] tracking-tighter tabular-nums mb-8">
                                {timeElapsed}
                            </h2>

                            <div className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-8 relative overflow-hidden group cursor-pointer hover:border-[#FF6B4A] transition-colors border-dashed">
                                <div className="absolute inset-0 bg-white/50 group-hover:bg-transparent transition-colors"></div>
                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-[#FF6B4A] mb-3">
                                        <Camera size={24} />
                                    </div>
                                    <h4 className="font-bold text-[#11111A] text-sm">Proof of Work Photo</h4>
                                    <p className="text-xs text-gray-500 mt-1">Tap to open camera</p>
                                </div>
                            </div>
                            
                            <button 
                                onClick={handleCheckOut}
                                disabled={isVerifying}
                                className="w-full bg-[#FF6B4A] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#e85a3c] transition-colors shadow-[0_4px_14px_rgba(255,107,74,0.4)] disabled:opacity-70"
                            >
                                {isVerifying ? (
                                    <span className="animate-pulse">Uploading Proof...</span>
                                ) : (
                                    <>End Shift & Submit</>
                                )}
                            </button>
                        </motion.div>
                    )}

                    {isCheckedOut && (
                        <motion.div 
                            key="done"
                            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center"
                        >
                            <div className="w-24 h-24 bg-emerald-50 rounded-full border border-emerald-100 flex items-center justify-center text-emerald-500 mb-6 relative">
                                <CheckCircle2 size={40} />
                                <div className="absolute inset-0 rounded-full animate-ping border-2 border-emerald-400 opacity-20"></div>
                            </div>
                            <h2 className="text-2xl font-bold text-[#11111A] mb-2">Shift Completed!</h2>
                            <p className="text-[#4A4A5A] text-sm mb-6">Proof of work accepted by Smart Contract.</p>
                            
                            <div className="bg-gray-50 w-full rounded-xl p-4 text-left border border-gray-200 mb-8">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs text-gray-500 font-bold uppercase">Time Logged</span>
                                    <span className="text-sm font-bold text-[#11111A]">{timeElapsed}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-500 font-bold uppercase">Contract Status</span>
                                    <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">Payment Queued</span>
                                </div>
                            </div>

                            <button onClick={() => { setIsCheckedIn(false); setIsCheckedOut(false); setTimeElapsed('00:00:00'); }} className="text-sm font-bold text-gray-400 hover:text-[#11111A] transition-colors">
                                Reset Demo
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

             </div>
          </motion.div>

        </div>
      </div>
    </WorkerLayout>
  );
};

export default WorkerAttendance;
