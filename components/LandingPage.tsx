
import React from 'react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary !text-[32px]">science</span>
          <span className="text-2xl font-black text-text-main tracking-tighter">ArXivPulse</span>
        </div>
        <button 
          onClick={onGetStarted}
          className="text-sm font-bold text-text-main hover:text-primary transition-colors"
        >
          Sign In
        </button>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary text-xs font-black uppercase tracking-widest mb-8 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          AI-Powered Research Intelligence
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-text-main leading-[1.1] tracking-tight mb-8 max-w-5xl">
          Decode the frontiers of <span className="text-primary italic">human knowledge.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed mb-12 font-medium">
          ArXivPulse transforms the overwhelming flow of pre-prints into a personalized, AI-synthesized feed designed for the modern researcher.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button 
            onClick={onGetStarted}
            className="w-full sm:w-auto bg-primary text-white px-10 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-primary/30 hover:scale-105 transition-all active:scale-95"
          >
            Start Your Pulse
          </button>
          <a href="#features" className="text-sm font-bold text-text-secondary hover:text-text-main py-4 px-8">
            How it works →
          </a>
        </div>

        {/* Abstract Background Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      </section>

      {/* Features Grid */}
      <section id="features" className="bg-background-subtle py-32 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">auto_awesome</span>
              </div>
              <h3 className="text-xl font-bold text-text-main">AI Synthesis</h3>
              <p className="text-text-secondary text-sm leading-relaxed font-medium">
                Our models analyze thousands of new pre-prints daily to provide you with high-fidelity summaries and core innovation breakdowns.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">notifications_active</span>
              </div>
              <h3 className="text-xl font-bold text-text-main">Custom Delivery</h3>
              <p className="text-text-secondary text-sm leading-relaxed font-medium">
                Set your frequency, domains, and timing. We ensure the most relevant research hits your inbox exactly when you need it.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">forum</span>
              </div>
              <h3 className="text-xl font-bold text-text-main">Interactive Agent</h3>
              <p className="text-text-secondary text-sm leading-relaxed font-medium">
                Deep dive into any paper with our integrated research agent. Ask questions, clarify methodologies, and explore impacts in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-gray-100 text-center">
        <p className="text-xs font-bold text-text-secondary uppercase tracking-[0.2em]">
          &copy; 2024 ArXivPulse Research Intelligence. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
