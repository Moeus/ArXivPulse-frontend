
import React from 'react';
import { useStore } from '../store/useStore';
import { ViewMode } from '../types';


const LandingPage: React.FC = () => {
  const { setView } = useStore();

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <nav className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary !text-[32px]">science</span>
          <span className="text-2xl font-black text-text-main tracking-tighter">ArXivPulse</span>
        </div>
        <button onClick={() => setView(ViewMode.Auth)} className="text-sm font-bold text-text-main hover:text-primary transition-colors">Sign In</button>
      </nav>

      <section className="max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary text-xs font-black uppercase tracking-widest mb-8 animate-fade-in">AI-Powered Research Intelligence</div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-text-main leading-[1.1] tracking-tight mb-8 max-w-5xl">Decode the frontiers of <span className="text-primary italic">human knowledge.</span></h1>
        <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed mb-12 font-medium">ArXivPulse transforms the overwhelming flow of pre-prints into a personalized, AI-synthesized feed designed for the modern researcher.</p>
        <button onClick={() => setView(ViewMode.Auth)} className="bg-primary text-white px-10 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-primary/30 hover:scale-105 transition-all">Start Your Pulse</button>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      </section>
    </div>
  );
};

export default LandingPage;
