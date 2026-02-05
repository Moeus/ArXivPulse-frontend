
import React, { useState } from 'react';
import { UserSubscription, Frequency, TimeSlot } from '../types';

const AVAILABLE_DOMAINS = [
  { id: 'cs.AI', name: 'Artificial Intelligence', icon: 'psychology' },
  { id: 'cs.LG', name: 'Machine Learning', icon: 'settings_suggest' },
  { id: 'physics.quant-ph', name: 'Quantum Physics', icon: 'flare' },
  { id: 'math.ST', name: 'Statistics', icon: 'equalizer' },
  { id: 'q-bio.NC', name: 'Neuroscience', icon: 'biotech' },
  { id: 'cs.CV', name: 'Computer Vision', icon: 'visibility' },
];

const AccountView: React.FC = () => {
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Temporary Form State
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [freq, setFreq] = useState<Frequency>('daily');
  const [time, setTime] = useState<TimeSlot>('morning');
  const [agreed, setAgreed] = useState(false);

  const handleToggleDomain = (id: string) => {
    setSelectedDomains(prev => 
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    if (!agreed || selectedDomains.length === 0) return;
    
    setSubscription({
      domains: selectedDomains,
      frequency: freq,
      timeSlot: time,
      subscribedAt: new Date().toLocaleDateString()
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (subscription) {
      setSelectedDomains(subscription.domains);
      setFreq(subscription.frequency);
      setTime(subscription.timeSlot);
    } else {
      setSelectedDomains([]);
      setFreq('daily');
      setTime('morning');
      setAgreed(false);
    }
    setIsEditing(false);
  };

  const startSetup = () => {
    setIsEditing(true);
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black text-text-main tracking-tight">Subscription Settings</h1>
        <p className="text-text-secondary">Manage how you receive the latest research updates.</p>
      </div>

      {!subscription && !isEditing ? (
        /* Empty State */
        <div className="bg-white border-2 border-dashed border-gray-100 rounded-3xl p-12 flex flex-col items-center text-center gap-6">
          <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary !text-[40px]">notifications_active</span>
          </div>
          <div className="max-w-md">
            <h3 className="text-xl font-bold text-text-main mb-2">Personalized Research Feed</h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              Stay ahead by subscribing to specific research domains. We'll deliver a curated summary of new papers directly to your dashboard at your preferred time.
            </p>
          </div>
          <button 
            onClick={startSetup}
            className="bg-primary text-white px-8 py-3 rounded-xl font-black text-sm uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95"
          >
            Setup My Subscription
          </button>
        </div>
      ) : isEditing ? (
        /* Setup / Edit Form */
        <div className="flex flex-col gap-6">
          {/* Step 1: Domains */}
          <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-black uppercase tracking-widest text-text-main mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: '20px' }}>category</span>
              1. Choose Research Domains
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {AVAILABLE_DOMAINS.map(domain => (
                <button
                  key={domain.id}
                  onClick={() => handleToggleDomain(domain.id)}
                  className={`flex items-center gap-3 p-4 rounded-xl border transition-all text-left ${
                    selectedDomains.includes(domain.id)
                      ? 'bg-primary/5 border-primary shadow-inner'
                      : 'bg-white border-gray-100 hover:border-primary/20'
                  }`}
                >
                  <span className={`material-symbols-outlined ${selectedDomains.includes(domain.id) ? 'text-primary' : 'text-text-secondary'}`}>
                    {domain.icon}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-text-main">{domain.name}</span>
                    <span className="text-[10px] text-text-secondary font-mono">{domain.id}</span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Step 2: Cadence */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-black uppercase tracking-widest text-text-main mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary" style={{ fontSize: '20px' }}>event_repeat</span>
                2. Delivery Frequency
              </h3>
              <div className="flex gap-3">
                {(['daily', 'weekly'] as Frequency[]).map(f => (
                  <button
                    key={f}
                    onClick={() => setFreq(f)}
                    className={`flex-1 py-3 rounded-xl border font-bold text-sm capitalize transition-all ${
                      freq === f ? 'bg-primary text-white border-primary shadow-md' : 'bg-background-subtle border-transparent text-text-secondary hover:border-gray-200'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </section>

            <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-black uppercase tracking-widest text-text-main mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary" style={{ fontSize: '20px' }}>schedule</span>
                3. Preferred Time
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {(['morning', 'afternoon', 'evening'] as TimeSlot[]).map(t => (
                  <button
                    key={t}
                    onClick={() => setTime(t)}
                    className={`py-3 rounded-xl border font-bold text-[10px] uppercase tracking-tighter transition-all ${
                      time === t ? 'bg-primary text-white border-primary shadow-md' : 'bg-background-subtle border-transparent text-text-secondary hover:border-gray-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* Step 3: Protocol Agreement */}
          <section className="bg-amber-50 border border-amber-100 rounded-2xl p-6 flex flex-col gap-4">
             <div className="flex items-center gap-2 text-amber-800">
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>gavel</span>
                <h3 className="text-xs font-black uppercase tracking-widest">Academic Integrity Protocol</h3>
              </div>
              <div className="bg-white/50 p-4 rounded-xl text-[11px] leading-relaxed text-amber-900/80 border border-amber-200/50">
                <p className="mb-2"><strong>Warning on Misconduct:</strong> This platform is designed strictly for research discovery and assistance. Users are explicitly warned against utilizing AI-generated insights or summaries for plagiarism, data fabrication, or any other form of academic dishonesty.</p>
                <p><strong>Disclaimer:</strong> ArXivPulse and its operators disclaim all liability for any consequences arising from the misuse of this platform for unethical academic purposes. By subscribing, you acknowledge that you are solely responsible for adhering to the integrity standards of your institution.</p>
              </div>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-5 h-5 rounded border-amber-300 text-primary focus:ring-primary transition-all"
                />
                <span className="text-xs font-bold text-amber-900 group-hover:text-primary transition-colors">
                  I have read and agree to the Academic Integrity Protocol.
                </span>
              </label>
          </section>

          {/* Actions */}
          <div className="flex items-center gap-4 justify-end mt-4">
            <button 
              onClick={handleCancel}
              className="px-6 py-3 rounded-xl font-bold text-sm text-text-secondary hover:bg-gray-100 transition-all"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              disabled={!agreed || selectedDomains.length === 0}
              className="bg-primary text-white px-8 py-3 rounded-xl font-black text-sm uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
            >
              {subscription ? 'Update Subscription' : 'Confirm Subscription'}
            </button>
          </div>
        </div>
      ) : (
        /* Active Subscription Summary */
        <div className="flex flex-col gap-6">
          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row gap-8 items-start md:items-center">
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined !text-[32px]">task_alt</span>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-text-main">Subscription Active</h3>
                <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-tighter">Running</span>
              </div>
              <p className="text-sm text-text-secondary">Next update: Scheduled for tomorrow {subscription?.timeSlot}.</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setIsEditing(true)}
                className="px-5 py-2.5 rounded-xl border border-gray-100 font-bold text-sm text-text-main hover:bg-gray-50 transition-all"
              >
                Edit Preferences
              </button>
              <button 
                onClick={() => setSubscription(null)}
                className="px-5 py-2.5 rounded-xl border border-red-100 text-red-600 font-bold text-sm hover:bg-red-50 transition-all"
              >
                Unsubscribe
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-background-subtle rounded-2xl p-6 border border-gray-100">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-text-secondary mb-4">Monitoring Domains</h4>
               <div className="flex flex-wrap gap-2">
                 {subscription?.domains.map(d => (
                   <span key={d} className="px-3 py-1 bg-white rounded-lg border border-gray-100 text-xs font-bold text-text-main">
                     {d}
                   </span>
                 ))}
               </div>
             </div>
             <div className="bg-background-subtle rounded-2xl p-6 border border-gray-100">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-text-secondary mb-4">Delivery Cycle</h4>
               <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2">
                   <span className="material-symbols-outlined text-primary text-[20px]">sync</span>
                   <span className="text-xs font-bold text-text-main capitalize">{subscription?.frequency}</span>
                 </div>
                 <div className="w-px h-4 bg-gray-200"></div>
                 <div className="flex items-center gap-2">
                   <span className="material-symbols-outlined text-primary text-[20px]">schedule</span>
                   <span className="text-xs font-bold text-text-main capitalize">{subscription?.timeSlot}</span>
                 </div>
               </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountView;
