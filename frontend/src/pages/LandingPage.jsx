import React from 'react';
import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import ImpactAtScale from '../components/landing/ImpactAtScale';
import Stack from '../components/landing/Stack';
import DemoTimeline from '../components/landing/DemoTimeline';
import Testimonials from '../components/landing/Testimonials';
import FinalCTA from '../components/landing/FinalCTA';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#11111A] font-sans selection:bg-orange-500/30 overflow-x-hidden">
      <Navbar />
      <Hero />
      <Stack />
      <DemoTimeline />
      <ImpactAtScale />
      <Testimonials />
      <FinalCTA />
    </div>
  );
};

export default LandingPage;
