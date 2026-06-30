import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, ArrowLeft, MoreVertical, Phone, Video, Mic, Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';
import { API_BASE_URL } from '../config';


const WhatsappSimulator = () => {
  const userName = localStorage.getItem('shram_user_name')?.split(' ')[0] || 'Bhaiyya/Didi';
  const [messages, setMessages] = useState([
    { id: 1, text: `🌍 Kripya bhasha chunein / Please choose your language:\n\n1️⃣ Hindi (Hinglish)\n2️⃣ English`, sender: 'bot', time: "10:00 AM" }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [instructions, setInstructions] = useState('Language: Please select a language.');
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (e, explicitText = null) => {
    if (e) e.preventDefault();
    const textToSend = explicitText !== null ? explicitText : inputText;
    if (!textToSend.trim()) return;

    const userMessage = { id: Date.now(), text: textToSend, sender: 'user', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    try {
      const userId = localStorage.getItem('shram_user_id');
      const userName = localStorage.getItem('shram_user_name') || 'Worker';
      const res = await fetch(`${API_BASE_URL}/api/users/parse-whatsapp/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend, user_id: userId, mobile_number: '9876543210', user_name: userName })
      });
      const data = await res.json();
      
      // Update instructions based on state
      if (data.current_state === 'negotiating') {
        setInstructions('Tip: The agent found a match! You can reply with "Haan" to accept or "Nahi, 1000 chahiye" to counter.');
      } else if (data.current_state === 'working') {
        setInstructions('Tip: The contract is signed! Send "Kaam shuru" when you arrive, and "Kaam khatam" when done.');
      } else if (data.current_state === 'intake') {
        setInstructions('Tip: The bot needs your details. Try: "Mera naam Ramesh hai..."');
      } else if (data.current_state === 'toli_preference') {
        setInstructions('Toli Preference: Choose if you work alone or in a group.');
      } else if (data.current_state === 'distance_preference') {
        setInstructions('Distance: Choose how far you are willing to travel.');
      } else if (data.current_state === 'job_selection') {
        setInstructions('Job Selection: Type 1, 2, or 3 to choose a job.');
      } else if (data.current_state === 'language_selection') {
        setInstructions('Language: Please select a language.');
      } else {
        setInstructions('Menu: Choose an option by sending a number (1-5).');
      }

      // Simulate WhatsApp typing delay
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          id: Date.now() + 1, 
          text: data.bot_reply, 
          sender: 'bot', 
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
        }]);
        setLoading(false);
      }, 1500);

    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Mobile Device Frame */}
      <div className="w-full max-w-sm h-[800px] bg-black rounded-[3rem] p-4 shadow-2xl relative border-8 border-gray-900">
        
        {/* Screen */}
        <div className="w-full h-full bg-[#E5DDD5] rounded-[2rem] overflow-hidden flex flex-col relative">
          
          {/* Status Bar Mock */}
          <div className="h-6 bg-[#075E54] w-full flex items-center justify-between px-6 text-[10px] text-white font-medium z-20">
            <span>9:41</span>
            <div className="flex gap-1">
              <span>LTE</span>
              <span>100%</span>
            </div>
          </div>

          {/* WA Header */}
          <div className="bg-[#075E54] text-white px-3 py-3 flex items-center gap-3 z-10 shadow-md">
            <button onClick={() => navigate('/')} className="hover:bg-white/10 p-1 rounded-full -ml-1">
              <ArrowLeft size={20} />
            </button>
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg shrink-0 overflow-hidden">
               <img src="https://ui-avatars.com/api/?name=Kaam+Setu&background=9333EA&color=fff" alt="KaamSetu" />
            </div>
            <div className="flex-1">
              <h2 className="font-semibold leading-tight">KaamSetu Bot</h2>
              <p className="text-[11px] text-white/80">Active now</p>
            </div>
            <div className="flex items-center gap-3">
              <Video size={18} />
              <Phone size={18} />
              <MoreVertical size={18} />
            </div>
          </div>

          {/* Chat Background Pattern */}
          <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://w0.peakpx.com/wallpaper/508/875/HD-wallpaper-whatsapp-background-cool-dark-green-new-theme-whatsapp-thumbnail.jpg')] bg-cover bg-center mix-blend-overlay"></div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 z-10 custom-scrollbar">
            <div className="flex justify-center mb-4">
               <span className="bg-[#D4EAF4] text-gray-600 text-xs px-3 py-1 rounded-lg shadow-sm">Today</span>
            </div>
            
            {messages.map((msg) => {
              const isMenu = msg.text.includes('Kripya ek number chunein:');
              return (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={msg.id} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`inline-block px-3 py-2 rounded-lg max-w-[85%] text-left whitespace-pre-wrap text-[15px] shadow-sm ${msg.sender === 'user' ? 'bg-[#dcf8c6] text-gray-900 rounded-tr-none' : 'bg-white text-gray-900 rounded-tl-none border border-gray-100'}`}>
                  {msg.text.startsWith('[VOICE_NOTE]') ? (
                    <div className="flex items-center gap-3 w-48">
                      <button className="w-8 h-8 rounded-full bg-[#00A884] flex items-center justify-center text-white shrink-0">
                        <Play size={16} fill="white" className="ml-1" />
                      </button>
                      <div className="flex-1 flex items-center">
                        <div className="w-full h-1 bg-gray-300 rounded-full overflow-hidden">
                          <div className="w-1/3 h-full bg-[#00A884]"></div>
                        </div>
                      </div>
                      <span className="text-[10px] text-gray-500 font-medium">0:04</span>
                    </div>
                  ) : (
                    <span dangerouslySetInnerHTML={{__html: msg.text.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')}} />
                  )}
                  
                  {isMenu && msg.sender === 'bot' && (
                    <div className="mt-3 flex flex-col gap-2 border-t border-gray-100 pt-2">
                        <button onClick={() => handleSend({preventDefault: () => {}}, "1")} className="w-full text-center text-[#00A884] font-bold py-2 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200">
                          {msg.text.includes('Find New Work') ? '1️⃣ Find New Work' : '1️⃣ Naya Kaam Dhoondo'}
                        </button>
                        <button onClick={() => handleSend({preventDefault: () => {}}, "2")} className="w-full text-center text-[#00A884] font-bold py-2 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200">
                          {msg.text.includes('Find New Work') ? '2️⃣ Clock In/Out (Attendance)' : '2️⃣ Haazri Lagao'}
                        </button>
                        <button onClick={() => handleSend({preventDefault: () => {}}, "3")} className="w-full text-center text-[#00A884] font-bold py-2 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200">
                          {msg.text.includes('Find New Work') ? '3️⃣ Wallet & Earnings' : '3️⃣ Wallet aur Paise'}
                        </button>
                        <button onClick={() => handleSend({preventDefault: () => {}}, "4")} className="w-full text-center text-[#00A884] font-bold py-2 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200">
                          {msg.text.includes('Find New Work') ? '4️⃣ My Trust Score' : '4️⃣ Mera Trust Score'}
                        </button>
                        <button onClick={() => handleSend({preventDefault: () => {}}, "5")} className="w-full text-center text-[#00A884] font-bold py-2 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200">
                          {msg.text.includes('Find New Work') ? '5️⃣ Insurance' : '5️⃣ Beema (Insurance)'}
                        </button>
                    </div>
                  )}
                  <span className="text-[10px] text-gray-400 float-right mt-1 ml-4">{msg.time} {msg.sender === 'user' && '✓✓'}</span>
                </div>
              </motion.div>
            )})}
            
            {loading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                <div className="bg-white rounded-lg rounded-tl-none px-4 py-3 shadow-sm text-gray-500 text-sm flex gap-1">
                  <span className="animate-bounce">•</span><span className="animate-bounce delay-100">•</span><span className="animate-bounce delay-200">•</span>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className="bg-[#f0f0f0] px-2 pt-2 flex gap-2 overflow-x-auto custom-scrollbar whitespace-nowrap z-10">
            {messages.length > 0 && messages[messages.length - 1].sender === 'bot' && (
              <>
                {(instructions.includes('Menu') || instructions.includes('Tip: Try sending: "Mera naam Ramesh')) && (
                  <>
                    <button onClick={() => handleSend(null, "1")} className="bg-white text-[#075E54] border border-[#075E54]/20 text-xs px-3 py-1.5 rounded-full hover:bg-[#075E54] hover:text-white transition-colors">1️⃣ Kaam Dhoondo</button>
                    <button onClick={() => handleSend(null, "2")} className="bg-white text-[#075E54] border border-[#075E54]/20 text-xs px-3 py-1.5 rounded-full hover:bg-[#075E54] hover:text-white transition-colors">2️⃣ Haazri Lagao</button>
                    <button onClick={() => handleSend(null, "3")} className="bg-white text-[#075E54] border border-[#075E54]/20 text-xs px-3 py-1.5 rounded-full hover:bg-[#075E54] hover:text-white transition-colors">3️⃣ Wallet</button>
                    <button onClick={() => handleSend(null, "4")} className="bg-white text-[#075E54] border border-[#075E54]/20 text-xs px-3 py-1.5 rounded-full hover:bg-[#075E54] hover:text-white transition-colors">4️⃣ Trust Score</button>
                    <button onClick={() => handleSend(null, "5")} className="bg-white text-[#075E54] border border-[#075E54]/20 text-xs px-3 py-1.5 rounded-full hover:bg-[#075E54] hover:text-white transition-colors">5️⃣ Beema</button>
                  </>
                )}
                {instructions.includes('agent found a match') && (
                  <>
                    <button onClick={() => handleSend(null, "Haan")} className="bg-white text-[#075E54] border border-[#075E54]/20 text-xs px-3 py-1.5 rounded-full hover:bg-[#075E54] hover:text-white transition-colors">Haan (Accept)</button>
                    <button onClick={() => handleSend(null, "Nahi, jyada chahiye")} className="bg-white text-[#075E54] border border-[#075E54]/20 text-xs px-3 py-1.5 rounded-full hover:bg-[#075E54] hover:text-white transition-colors">Nahi (Counter Offer)</button>
                  </>
                )}
                {instructions.includes('contract is signed') && (
                  <>
                    <button onClick={() => handleSend(null, "Kaam shuru")} className="bg-white text-[#075E54] border border-[#075E54]/20 text-xs px-3 py-1.5 rounded-full hover:bg-[#075E54] hover:text-white transition-colors">Kaam shuru (Clock In)</button>
                    <button onClick={() => handleSend(null, "Kaam khatam")} className="bg-white text-[#075E54] border border-[#075E54]/20 text-xs px-3 py-1.5 rounded-full hover:bg-[#075E54] hover:text-white transition-colors">Kaam khatam (Clock Out)</button>
                  </>
                )}
                {instructions.includes('Tip: The bot needs your details') && (
                  <button onClick={() => handleSend(null, "Mera naam Ramesh hai, main Lucknow mein electrician hoon")} className="bg-white text-[#075E54] border border-[#075E54]/20 text-xs px-3 py-1.5 rounded-full hover:bg-[#075E54] hover:text-white transition-colors">
                    Mera naam Ramesh hai...
                  </button>
                )}
                {instructions.includes('Toli Preference:') && (
                  <>
                    <button onClick={() => handleSend(null, "Akele")} className="bg-white text-[#075E54] border border-[#075E54]/20 text-xs px-3 py-1.5 rounded-full hover:bg-[#075E54] hover:text-white transition-colors">Akele (1)</button>
                    <button onClick={() => handleSend(null, "Main apni Toli ke sath (2 log)")} className="bg-white text-[#075E54] border border-[#075E54]/20 text-xs px-3 py-1.5 rounded-full hover:bg-[#075E54] hover:text-white transition-colors">Toli (2 Log)</button>
                    <button onClick={() => handleSend(null, "Main apni Toli ke sath (5 log)")} className="bg-white text-[#075E54] border border-[#075E54]/20 text-xs px-3 py-1.5 rounded-full hover:bg-[#075E54] hover:text-white transition-colors">Toli (5 Log)</button>
                    <button onClick={() => handleSend(null, "Main apni Toli ke sath (10 log)")} className="bg-white text-[#075E54] border border-[#075E54]/20 text-xs px-3 py-1.5 rounded-full hover:bg-[#075E54] hover:text-white transition-colors">Toli (10 Log)</button>
                  </>
                )}
                {instructions.includes('Distance:') && (
                  <>
                    <button onClick={() => handleSend(null, "5 KM")} className="bg-white text-[#075E54] border border-[#075E54]/20 text-xs px-3 py-1.5 rounded-full hover:bg-[#075E54] hover:text-white transition-colors">5 KM</button>
                    <button onClick={() => handleSend(null, "10 KM")} className="bg-white text-[#075E54] border border-[#075E54]/20 text-xs px-3 py-1.5 rounded-full hover:bg-[#075E54] hover:text-white transition-colors">10 KM</button>
                    <button onClick={() => handleSend(null, "20 KM")} className="bg-white text-[#075E54] border border-[#075E54]/20 text-xs px-3 py-1.5 rounded-full hover:bg-[#075E54] hover:text-white transition-colors">20 KM</button>
                  </>
                )}
                {instructions.includes('Job Selection:') && (
                  <>
                    <button onClick={() => handleSend(null, "1")} className="bg-white text-[#075E54] border border-[#075E54]/20 text-xs px-3 py-1.5 rounded-full hover:bg-[#075E54] hover:text-white transition-colors">Option 1</button>
                    <button onClick={() => handleSend(null, "2")} className="bg-white text-[#075E54] border border-[#075E54]/20 text-xs px-3 py-1.5 rounded-full hover:bg-[#075E54] hover:text-white transition-colors">Option 2</button>
                    <button onClick={() => handleSend(null, "3")} className="bg-white text-[#075E54] border border-[#075E54]/20 text-xs px-3 py-1.5 rounded-full hover:bg-[#075E54] hover:text-white transition-colors">Option 3</button>
                  </>
                )}
                {instructions.includes('Language:') && (
                  <>
                    <button onClick={() => handleSend(null, "Hindi")} className="bg-white text-[#075E54] border border-[#075E54]/20 text-xs px-3 py-1.5 rounded-full hover:bg-[#075E54] hover:text-white transition-colors">1️⃣ Hindi</button>
                    <button onClick={() => handleSend(null, "English")} className="bg-white text-[#075E54] border border-[#075E54]/20 text-xs px-3 py-1.5 rounded-full hover:bg-[#075E54] hover:text-white transition-colors">2️⃣ English</button>
                  </>
                )}
                <button onClick={() => handleSend(null, "Menu")} className="bg-white text-gray-600 border border-gray-300 text-xs px-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors ml-auto">
                  Reset (Menu)
                </button>
              </>
            )}
          </div>

          {/* Input Area */}
          <div className="bg-[#f0f0f0] p-2 flex items-center gap-2 z-10">
            <div className="flex-1 bg-white rounded-full flex items-center px-4 py-2 relative overflow-hidden">
              {isRecording ? (
                <div className="w-full flex items-center text-red-500 animate-pulse font-medium text-sm">
                  <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                  Recording voice note (0:03)...
                </div>
              ) : (
                <input 
                  type="text" 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend(e)}
                  placeholder="Type a message..."
                  className="w-full bg-transparent outline-none text-[15px] text-gray-900"
                />
              )}
            </div>
            {!inputText.trim() && !isRecording ? (
              <button 
                onMouseDown={() => setIsRecording(true)}
                onMouseUp={() => {
                  setIsRecording(false);
                  handleSend(null, "[VOICE_NOTE] Mujhe mistri ka kaam chahiye, main abhi delhi mein hoon");
                }}
                onTouchStart={() => setIsRecording(true)}
                onTouchEnd={() => {
                  setIsRecording(false);
                  handleSend(null, "[VOICE_NOTE] Mujhe mistri ka kaam chahiye, main abhi delhi mein hoon");
                }}
                className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-all bg-[#00A884] text-white hover:scale-110 active:scale-95"
              >
                <Mic size={20} />
              </button>
            ) : (
              <button 
                onClick={handleSend}
                disabled={!inputText.trim() && !isRecording || loading}
                className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-all bg-[#00A884] text-white"
              >
                <Send size={18} className="ml-1" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsappSimulator;
