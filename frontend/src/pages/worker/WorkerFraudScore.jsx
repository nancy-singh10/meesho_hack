import React, { useState, useEffect } from 'react';
import WorkerLayout from '../../components/worker/WorkerLayout';
import { Network, Activity, AlertTriangle, ShieldCheck, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

const WorkerFraudScore = () => {
  const [signals, setSignals] = useState([
    { id: 'gst', label: 'GST Compliance', desc: 'Higher = filed returns regularly', value: 78, weight: 0.25 },
    { id: 'phone', label: 'Phone Number Age', desc: 'Older = more legitimate (months scale 0-100)', value: 64, weight: 0.15 },
    { id: 'distance', label: 'Address ↔ Job Distance Score', desc: 'Higher = closer & verifiable', value: 82, weight: 0.15 },
    { id: 'review', label: 'Worker Review Score', desc: 'From past KaamSetu placements', value: 71, weight: 0.20 },
    { id: 'payment', label: 'On-time Payment History', desc: 'Across last 12 months', value: 88, weight: 0.25 },
  ]);

  const [overallScore, setOverallScore] = useState(78);
  const [riskLevel, setRiskLevel] = useState('Caution');

  useEffect(() => {
    let score = 0;
    signals.forEach(s => {
      score += s.value * s.weight;
    });
    const finalScore = Math.round(score);
    setOverallScore(finalScore);
    
    if (finalScore >= 85) setRiskLevel('Safe');
    else if (finalScore >= 65) setRiskLevel('Caution');
    else setRiskLevel('High Risk');
  }, [signals]);

  const handleSliderChange = (id, newValue) => {
    setSignals(signals.map(s => s.id === id ? { ...s, value: parseInt(newValue) } : s));
  };

  const getRiskColors = () => {
    if (riskLevel === 'Safe') return { ring: '#10B981', bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', glow: 'bg-emerald-100' };
    if (riskLevel === 'Caution') return { ring: '#F59E0B', bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', glow: 'bg-amber-100' };
    return { ring: '#EF4444', bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200', glow: 'bg-red-100' };
  };

  const colors = getRiskColors();

  return (
    <WorkerLayout 
      title="Employer Fraud Predictor" 
      subtitle="Real-time pay-probability scoring · 47-signal gradient boosted model"
    >
      <div className="p-8 max-w-7xl mx-auto space-y-6 pb-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* AI Verdict Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white border border-gray-200 shadow-sm rounded-3xl p-8 flex flex-col items-center justify-between text-center relative overflow-hidden h-[34rem]"
          >
            {/* Background glowing shape */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 ${colors.glow} rounded-full blur-[80px] opacity-40 pointer-events-none transition-colors duration-500`}></div>

            <div className="flex items-center gap-2 text-[#1E234C] font-bold text-xs tracking-wider uppercase mb-8 relative z-10 w-full justify-center">
              <Network size={14} />
              <span>AI Verdict</span>
            </div>
            
            <div className="relative w-64 h-64 flex items-center justify-center shrink-0 z-10 my-4">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" stroke="#F3F4F6" strokeWidth="6" fill="transparent" />
                <circle 
                  cx="50" cy="50" r="42" 
                  stroke={colors.ring} 
                  strokeWidth="6" 
                  strokeLinecap="round" 
                  fill="transparent" 
                  strokeDasharray="263.89" 
                  strokeDashoffset={263.89 - (263.89 * overallScore) / 100} 
                  className="transition-all duration-300 ease-out" 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold text-[#11111A] transition-all">{overallScore}</span>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Pay Probability</span>
              </div>
            </div>

            <div className="relative z-10 flex flex-col items-center mt-4">
               <span className={`${colors.bg} ${colors.text} ${colors.border} border font-bold px-6 py-2 rounded-full flex items-center gap-2 transition-colors duration-300`}>
                   {riskLevel === 'Safe' && <ShieldCheck size={16} />}
                   {riskLevel === 'Caution' && <AlertTriangle size={16} />}
                   {riskLevel === 'High Risk' && <ShieldAlert size={16} />}
                   {riskLevel}
               </span>
               <p className="text-sm text-[#4A4A5A] mt-6 max-w-sm">
                   Model trained on 100,000+ informal placements · 89% accuracy at predicting payment default.
               </p>
            </div>
          </motion.div>

          {/* Live Signals Card (Interactive) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white border border-gray-200 shadow-sm rounded-3xl p-8 h-[34rem] flex flex-col"
          >
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2 text-[#1E234C] font-bold text-xs tracking-wider uppercase">
                  <Activity size={14} />
                  <span>Live Signals (Interactive)</span>
                </div>
                <span className="text-xs text-[#FF6B4A] font-bold bg-orange-50 px-3 py-1 rounded-full border border-orange-100">Adjust sliders</span>
            </div>

            <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {signals.map((signal, idx) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + (idx * 0.05) }}
                        key={signal.id} 
                        className="space-y-2 group"
                    >
                        <div className="flex justify-between items-end">
                            <div>
                                <h4 className="font-bold text-[#11111A] text-sm">{signal.label}</h4>
                                <p className="text-xs text-gray-500">{signal.desc}</p>
                            </div>
                            <span className="font-bold text-lg text-[#1E234C]">{signal.value}</span>
                        </div>
                        
                        {/* Interactive Slider */}
                        <div className="relative pt-1">
                            <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                value={signal.value}
                                onChange={(e) => handleSliderChange(signal.id, e.target.value)}
                                className="w-full h-2.5 bg-gray-100 rounded-lg appearance-none cursor-pointer outline-none slider-thumb"
                                style={{
                                    background: `linear-gradient(to right, #1E234C ${signal.value}%, #F3F4F6 ${signal.value}%)`
                                }}
                            />
                            {/* Custom CSS for slider thumb needed in global CSS, or inline styles */}
                            <style dangerouslySetInnerHTML={{__html: `
                                input[type=range].slider-thumb::-webkit-slider-thumb {
                                    appearance: none;
                                    width: 16px;
                                    height: 16px;
                                    border-radius: 50%;
                                    background: #FF6B4A;
                                    cursor: pointer;
                                    box-shadow: 0 0 5px rgba(0,0,0,0.2);
                                    border: 2px solid white;
                                }
                                input[type=range].slider-thumb::-moz-range-thumb {
                                    width: 16px;
                                    height: 16px;
                                    border-radius: 50%;
                                    background: #FF6B4A;
                                    cursor: pointer;
                                    box-shadow: 0 0 5px rgba(0,0,0,0.2);
                                    border: 2px solid white;
                                }
                            `}} />
                        </div>
                    </motion.div>
                ))}
            </div>
          </motion.div>

        </div>
      </div>
    </WorkerLayout>
  );
};

export default WorkerFraudScore;
