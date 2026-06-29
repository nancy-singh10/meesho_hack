import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { Sparkles, ShieldCheck, Briefcase, MapPin, Loader2, ArrowRight, Award, BadgeCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MatchesView = () => {
  const { id } = useParams();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [negotiatingMatch, setNegotiatingMatch] = useState(null);
  const [offerWage, setOfferWage] = useState('');
  const [aiReply, setAiReply] = useState('');
  const [isAccepted, setIsAccepted] = useState(false);
  const [negotiatingLoad, setNegotiatingLoad] = useState(false);

  useEffect(() => {
    // Hardcoded mock data for the premium UI prototype
    setTimeout(() => {
        setMatches([
            {
                id: 1,
                match_score: 98,
                worker_details: {
                    name: 'Ramesh Kumar',
                    shram_id: 'SHRAM-IN-7821',
                    trust_score: 94,
                    jobs_completed: 47,
                    location: 'Sector 62, Noida',
                    image: 'https://images.unsplash.com/photo-1506803682981-6e718a9dd3ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                    skills: ['Master Mason', 'Plastering']
                }
            },
            {
                id: 2,
                match_score: 85,
                worker_details: {
                    name: 'Suresh Das',
                    shram_id: 'SHRAM-IN-2291',
                    trust_score: 82,
                    jobs_completed: 14,
                    location: 'Indirapuram',
                    image: 'https://images.unsplash.com/photo-1543269664-7eef42226a21?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                    skills: ['Laborer', 'Heavy Lifting']
                }
            }
        ]);
        setLoading(false);
    }, 1200);
  }, [id]);

  const handleNegotiate = (match) => {
    setNegotiatingMatch(match);
    setAiReply('');
    setOfferWage('');
    setIsAccepted(false);
  };

  const submitOffer = async () => {
    if (!offerWage) return;
    setNegotiatingLoad(true);
    
    // Simulate AI Negotiation
    setTimeout(() => {
        if (offerWage >= 900) {
            setAiReply("I have checked with Ramesh. He agrees to ₹" + offerWage + "/day. I am generating the Smart Contract now.");
            setIsAccepted(true);
        } else {
            setAiReply("Ramesh is a highly rated Master Mason. He will not accept less than ₹900/day. Please increase your offer.");
            setIsAccepted(false);
            setOfferWage('900');
        }
        setNegotiatingLoad(false);
    }, 1500);
  };

  const acceptContract = async () => {
    setNegotiatingLoad(true);
    setTimeout(() => {
        navigate('/dashboard/contracts');
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto relative font-sans space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#FF6B4A] font-bold text-xs tracking-wider uppercase mb-2">
                <Sparkles size={16} /> AI Match Engine
            </div>
            <h2 className="text-3xl font-black mb-2 text-[#11111A] tracking-tight">Matched Shramiks</h2>
            <p className="text-[#4A4A5A] font-medium">We found these verified workers for your "Master Tile Mason" job.</p>
          </div>
          <button onClick={() => navigate('/dashboard')} className="bg-white border border-gray-200 text-[#11111A] px-4 py-2 rounded-xl font-bold hover:bg-gray-50 transition-colors shadow-sm">
            Close Search
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-96 gap-4 bg-white border border-gray-100 rounded-3xl shadow-sm">
            <Loader2 className="w-12 h-12 text-[#FF6B4A] animate-spin" />
            <p className="text-[#4A4A5A] font-bold animate-pulse">Scanning the Shram Network...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnimatePresence>
              {matches.map((match, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={match.id}
                  className="bg-white border border-gray-100 shadow-xl shadow-gray-200/40 rounded-3xl overflow-hidden group hover:border-[#1E234C]/30 transition-colors flex flex-col"
                >
                  {/* ID Card Top */}
                  <div className="relative p-6 bg-[#1E234C] text-white overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF6B4A] rounded-full blur-[80px] opacity-30 pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
                    
                    <div className="flex items-start gap-6 relative z-10">
                        <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-xl rotate-2">
                            <img src={match.worker_details.image} alt="Profile" className="w-full h-full object-cover rounded-xl" />
                        </div>
                        <div className="flex-1 pt-2">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-2xl font-black tracking-tight">{match.worker_details.name}</h3>
                                <BadgeCheck size={18} className="text-emerald-400" />
                            </div>
                            <p className="text-white/60 font-mono text-xs mb-3">{match.worker_details.shram_id}</p>
                            <div className="flex flex-wrap gap-2">
                                {match.worker_details.skills.map(s => (
                                    <span key={s} className="bg-white/10 border border-white/20 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                                        {s}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                  </div>

                  {/* ID Card Bottom */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div className="flex justify-between mb-8">
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Location</p>
                            <p className="font-bold text-[#11111A] flex items-center gap-1"><MapPin size={14} className="text-[#FF6B4A]"/> {match.worker_details.location}</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Verified Jobs</p>
                            <p className="font-bold text-[#11111A] flex items-center gap-1"><Briefcase size={14} className="text-[#1E234C]"/> {match.worker_details.jobs_completed}</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Trust Score</p>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-black text-emerald-600">{match.worker_details.trust_score}</span>
                                <span className="text-[10px] bg-emerald-50 text-emerald-600 border border-emerald-100 px-1 rounded font-bold">/100</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                        <div className="flex-1 bg-orange-50 border border-orange-100 p-3 rounded-xl flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#FF6B4A] text-white flex items-center justify-center shrink-0">
                                <Sparkles size={14} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-[#FF6B4A] uppercase tracking-widest leading-tight">AI Match</p>
                                <p className="font-black text-[#11111A] text-sm">{match.match_score}% Compatible</p>
                            </div>
                        </div>
                        
                        <button 
                          onClick={() => handleNegotiate(match)}
                          className="bg-[#1E234C] hover:bg-[#15193B] text-white px-6 py-4 rounded-xl text-sm font-bold transition-all shadow-md flex items-center gap-2 hover:-translate-y-1"
                        >
                          Send Offer <ArrowRight size={18} />
                        </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Negotiation Modal (Overhauled to look like a chat) */}
        <AnimatePresence>
        {negotiatingMatch && (
          <div className="fixed inset-0 bg-[#11111A]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl w-full max-w-lg shadow-2xl relative overflow-hidden flex flex-col h-[600px]"
            >
              {/* Modal Header */}
              <div className="bg-[#1E234C] p-6 text-white flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white p-0.5 relative">
                      <img src={negotiatingMatch.worker_details.image} alt="Worker" className="w-full h-full object-cover rounded-full" />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#1E234C]"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{negotiatingMatch.worker_details.name}</h3>
                    <p className="text-xs text-white/60 font-medium flex items-center gap-1"><Sparkles size={12} className="text-[#FF6B4A]" /> AI Agent Active</p>
                  </div>
                </div>
                <button onClick={() => setNegotiatingMatch(null)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">✕</button>
              </div>

              {/* Chat Area */}
              <div className="flex-1 bg-gray-50 p-6 overflow-y-auto flex flex-col gap-4">
                  
                  {/* AI Intro Message */}
                  <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#1E234C] text-white flex items-center justify-center shrink-0 shadow-sm mt-1">
                          <Sparkles size={14} />
                      </div>
                      <div className="bg-white border border-gray-200 p-4 rounded-2xl rounded-tl-sm shadow-sm max-w-[85%]">
                          <p className="text-sm font-medium text-[#11111A]">Namaste! I am the AI representing {negotiatingMatch.worker_details.name}. I negotiate wages and terms on his behalf based on his skillset and market rates. What is your daily wage offer?</p>
                      </div>
                  </div>

                  {/* My Offer (if sent) */}
                  {aiReply && (
                      <div className="flex items-start gap-3 flex-row-reverse">
                          <div className="w-8 h-8 rounded-full bg-[#FF6B4A] text-white flex items-center justify-center shrink-0 shadow-sm mt-1 font-bold text-xs">
                              You
                          </div>
                          <div className="bg-[#1E234C] text-white p-4 rounded-2xl rounded-tr-sm shadow-sm max-w-[85%]">
                              <p className="text-sm font-medium">I am offering ₹{offerWage} per day.</p>
                          </div>
                      </div>
                  )}

                  {/* Loading State */}
                  {negotiatingLoad && !isAccepted && (
                      <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#1E234C] text-white flex items-center justify-center shrink-0 shadow-sm mt-1">
                              <Sparkles size={14} />
                          </div>
                          <div className="bg-white border border-gray-200 p-4 rounded-2xl rounded-tl-sm shadow-sm flex gap-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                          </div>
                      </div>
                  )}

                  {/* AI Response */}
                  {aiReply && !negotiatingLoad && (
                      <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#1E234C] text-white flex items-center justify-center shrink-0 shadow-sm mt-1">
                              <Sparkles size={14} />
                          </div>
                          <div className={`p-4 rounded-2xl rounded-tl-sm shadow-sm max-w-[85%] ${isAccepted ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-white border-gray-200 text-[#11111A]'}`}>
                              <p className="text-sm font-medium">{aiReply}</p>
                          </div>
                      </div>
                  )}

              </div>

              {/* Input Area */}
              <div className="p-6 bg-white border-t border-gray-100 shrink-0">
                  {!isAccepted ? (
                      <div className="flex gap-3">
                          <input
                            type="number"
                            value={offerWage}
                            onChange={(e) => setOfferWage(e.target.value)}
                            disabled={negotiatingLoad}
                            className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[#11111A] focus:outline-none focus:ring-2 focus:ring-[#1E234C] focus:bg-white transition-colors font-bold"
                            placeholder="Enter daily wage (₹)..."
                          />
                          <button
                            onClick={submitOffer}
                            disabled={negotiatingLoad || !offerWage}
                            className="bg-[#FF6B4A] hover:bg-[#E55A39] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md disabled:opacity-50"
                          >
                            Send
                          </button>
                      </div>
                  ) : (
                      <button
                        onClick={acceptContract}
                        disabled={negotiatingLoad}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-lg"
                      >
                        {negotiatingLoad ? <Loader2 className="animate-spin" /> : <><ShieldCheck /> Generate Smart Contract</>}
                      </button>
                  )}
              </div>

            </motion.div>
          </div>
        )}
        </AnimatePresence>

      </div>
    </DashboardLayout>
  );
};

export default MatchesView;
