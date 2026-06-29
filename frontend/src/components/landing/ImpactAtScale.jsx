import React from 'react';

const ImpactAtScale = () => {
  return (
    <section className="w-screen relative left-1/2 -translate-x-1/2 bg-[#121A3B] py-24">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-16">
          <h4 className="text-[#FFD4C4] font-bold tracking-widest text-xs uppercase mb-4">Impact At Scale</h4>
          <h2 className="text-4xl md:text-5xl font-bold text-white max-w-2xl leading-tight">
            Measurable change <br/> in workers' lives.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="border-l border-transparent md:pl-0">
            <h2 className="text-5xl font-extrabold text-[#FFD4C4] mb-2">₹42/day</h2>
            <p className="text-sm text-white font-bold mb-1">Wage uplift</p>
            <p className="text-xs text-gray-400">vs mandi rate</p>
          </div>
          <div className="md:border-l md:border-gray-700 md:pl-6 border-l border-gray-700 pl-6">
            <h2 className="text-5xl font-extrabold text-[#FFD4C4] mb-2">4.2 min</h2>
            <p className="text-sm text-white font-bold mb-1">Negotiation time</p>
            <p className="text-xs text-gray-400">vs 1-day mandi process</p>
          </div>
          <div className="md:border-l md:border-gray-700 md:pl-6 border-l border-gray-700 pl-6">
            <h2 className="text-5xl font-extrabold text-[#FFD4C4] mb-2">89%</h2>
            <p className="text-sm text-white font-bold mb-1">Disputes resolved</p>
            <p className="text-xs text-gray-400">by AI agent without a lawyer</p>
          </div>
          <div className="md:border-l md:border-gray-700 md:pl-6 border-l border-gray-700 pl-6">
            <h2 className="text-5xl font-extrabold text-[#FFD4C4] mb-2">0</h2>
            <p className="text-sm text-white font-bold mb-1">App installs needed</p>
            <p className="text-xs text-gray-400">WhatsApp or missed call</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactAtScale;
