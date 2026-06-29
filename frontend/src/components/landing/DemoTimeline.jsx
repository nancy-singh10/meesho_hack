import React from 'react';

const TimelineStep = ({ time, title, description, isActive }) => (
  <div className="relative flex flex-col pt-8 group">
    {/* Line */}
    <div className="absolute top-[15px] left-0 right-0 h-[2px] bg-gray-200 -z-10 group-first:left-1/2 group-last:right-1/2"></div>
    
    {/* Node */}
    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold mb-4 mx-auto bg-white transition-all
      ${isActive ? 'border-[#FF6B4A] text-[#FF6B4A] shadow-[0_0_15px_rgba(255,107,74,0.3)]' : 'border-gray-300 text-gray-500 group-hover:border-gray-400 group-hover:text-[#11111A]'}`}>
      {time}
    </div>
    
    {/* Content */}
    <div className="text-center px-2">
      <h4 className="text-[#11111A] font-bold text-sm mb-2">{title}</h4>
      <p className="text-[#4A4A5A] text-xs leading-relaxed">{description}</p>
    </div>
  </div>
);

const DemoTimeline = () => {
  const steps = [
    {
      time: '0:05',
      title: 'Mason sends voice note',
      description: 'Bhojpuri — "Kaam chahiye, RCC shuttering, Patna mein."'
    },
    {
      time: '0:12',
      title: 'Skills extracted',
      description: 'Whisper + LLM identify trade, location, urgency.'
    },
    {
      time: '0:25',
      title: '3 matches surface',
      description: 'Ranked by Pay Probability Score - top match ₹950/day vs mandi rate ₹700.'
    },
    {
      time: '0:35',
      title: 'Fraud check passes',
      description: 'Employer "Safe — 98% pay probability" from 47 signals.'
    },
    {
      time: '0:45',
      title: 'Agent negotiates',
      description: "WhatsApp voice in contractor's regional dialect. Accepted."
    },
    {
      time: '0:55',
      title: 'Contract + insurance live',
      description: 'Hindi contract signed. 72h wage guarantee active.'
    }
  ];

  return (
    <section id="demo" className="py-24 max-w-7xl mx-auto px-8 border-t border-gray-200">
      <div className="flex justify-between items-end mb-16">
        <div>
          <h4 className="text-[#FF6B4A] font-bold tracking-widest text-xs uppercase mb-4">55-Second Demo</h4>
          <h2 className="text-5xl font-extrabold text-[#11111A]">
            From voice note to signed <span className="text-[#FF6B4A]">contract.</span>
          </h2>
        </div>
        <div className="text-gray-500 font-mono text-sm tracking-widest hidden md:block">
          total: 00:55
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {steps.map((step, idx) => (
          <TimelineStep 
            key={idx} 
            {...step} 
            isActive={idx === 0 || idx === 5} 
          />
        ))}
      </div>
    </section>
  );
};

export default DemoTimeline;
