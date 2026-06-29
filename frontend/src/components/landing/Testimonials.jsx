import React from 'react';
import { Quote } from 'lucide-react';

const TestimonialCard = ({ quote, author, role }) => (
  <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-gray-300 hover:shadow-lg transition-all flex flex-col justify-between min-h-[250px]">
    <div>
      <Quote className="text-[#FF6B4A] mb-6" size={32} />
      <p className="text-[#11111A] text-lg font-medium leading-relaxed mb-8">
        "{quote}"
      </p>
    </div>
    <div>
      <h4 className="text-[#11111A] font-bold">{author}</h4>
      <p className="text-[#4A4A5A] text-sm">{role}</p>
    </div>
  </div>
);

const Testimonials = () => {
  const testimonials = [
    {
      quote: "First time someone paid me on time. KaamSetu sent legal notice when contractor delayed.",
      author: "Sunita Devi",
      role: "Helper, Lucknow"
    },
    {
      quote: "Shram ID pre-screening cut our hiring fraud by 71% in 4 months.",
      author: "Karthik R.",
      role: "Ops Lead, Swiggy Genie"
    },
    {
      quote: "We finally have a credit-bureau-grade signal for informal labour. This is infrastructure.",
      author: "Anjali Mehra",
      role: "Partner, Lightspeed India"
    }
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-8">
      <div className="text-center mb-16">
        <h4 className="text-[#FF6B4A] font-bold tracking-widest text-xs uppercase mb-4">Trusted By</h4>
        <h2 className="text-5xl font-extrabold text-[#11111A]">
          Workers, employers, <span className="text-[#FF6B4A]">investors.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((item, index) => (
          <TestimonialCard key={index} {...item} />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
