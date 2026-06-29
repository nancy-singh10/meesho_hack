import React from 'react';
import { 
  Wallet, 
  Activity, 
  ShieldAlert, 
  Mic, 
  FileSignature, 
  Banknote, 
  Gavel, 
  Code 
} from 'lucide-react';

const StackCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg hover:border-gray-300 transition-all group flex flex-col items-start h-full">
    <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-6 border border-gray-200 group-hover:scale-110 transition-transform">
      <Icon className="text-gray-500" size={20} />
    </div>
    <h3 className="text-lg font-bold text-[#11111A] mb-3">{title}</h3>
    <p className="text-[#4A4A5A] text-sm leading-relaxed">{description}</p>
  </div>
);

const Stack = () => {
  const stackItems = [
    {
      icon: Wallet,
      title: 'Shram Wallet',
      description: 'Portable, verified worker identity with skills, history & trust score.'
    },
    {
      icon: Activity,
      title: 'AI Trust Score',
      description: 'CIBIL-grade score for workers, updated with every verified placement.'
    },
    {
      icon: ShieldAlert,
      title: 'Employer Fraud Predictor',
      description: '47 real-time signals score employer pay probability before you accept.'
    },
    {
      icon: Mic,
      title: 'Dialect-Adaptive Negotiation',
      description: 'Voice messages in 12 micro-dialects — Bhojpuri to Marwari.'
    },
    {
      icon: FileSignature,
      title: 'Contract Generation',
      description: 'State-aware contracts in Hindi & regional languages, e-signed on WhatsApp.'
    },
    {
      icon: Banknote,
      title: '72h Wage Insurance',
      description: 'Unpaid in 72 hours? KaamSetu pays from float, recovers from employer.'
    },
    {
      icon: Gavel,
      title: 'Autonomous Legal Recovery',
      description: 'Legal notices auto-drafted and filed without lifting a finger.'
    },
    {
      icon: Code,
      title: 'Enterprise API',
      description: 'Banks, NBFCs and gig platforms query Shram ID at ₹50/call.'
    }
  ];

  return (
    <section id="stack" className="py-24 max-w-7xl mx-auto px-8">
      <div className="mb-16 max-w-2xl">
        <h4 className="text-[#FF6B4A] font-bold tracking-widest text-xs uppercase mb-4">The Stack</h4>
        <h2 className="text-5xl font-extrabold text-[#11111A] leading-tight">
          Financial infrastructure, <br />
          <span className="text-[#FF6B4A]">not a job board.</span>
        </h2>
        <p className="text-[#4A4A5A] mt-6 text-lg leading-relaxed">
          Eight composable layers that turn casual labour into a verifiable, insurable, queryable asset class.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stackItems.map((item, index) => (
          <StackCard key={index} {...item} />
        ))}
      </div>
    </section>
  );
};

export default Stack;
