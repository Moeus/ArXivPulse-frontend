
import React, { useState } from 'react';
import { Frequency, TimeSlot } from '../types';
import { useStore } from '../store/useStore';

interface DomainGroup {
  id: string;
  name: string;
  icon: string;
  color: string;
  topics: { id: string; name: string }[];
}

const DOMAIN_GROUPS: DomainGroup[] = [
  {
    id: 'cs',
    name: 'Computer Science',
    icon: 'terminal',
    color: 'bg-orange-100 text-orange-600',
    topics: [
      { id: 'cs.AI', name: 'Artificial Intelligence' },
      { id: 'cs.CV', name: 'Computer Vision' },
      { id: 'cs.CR', name: 'Cryptography' },
      { id: 'cs.NI', name: 'Networking' },
      { id: 'cs.LG', name: 'Machine Learning' },
    ]
  },
  {
    id: 'physics',
    name: 'Physics',
    icon: 'flare',
    color: 'bg-blue-100 text-blue-600',
    topics: [
      { id: 'physics.quant-ph', name: 'Quantum Physics' },
      { id: 'physics.optics', name: 'Optics' },
      { id: 'physics.gen-ph', name: 'General Physics' },
    ]
  },
  {
    id: 'math',
    name: 'Mathematics',
    icon: 'calculate',
    color: 'bg-green-100 text-green-600',
    topics: [
      { id: 'math.ST', name: 'Statistics' },
      { id: 'math.GT', name: 'Topology' },
      { id: 'math.CO', name: 'Combinatorics' },
    ]
  }
];

const AccountView: React.FC = () => {
  const { subscription, setSubscription, logout, user } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  
  const [selectedTopicIds, setSelectedTopicIds] = useState<string[]>(subscription?.domains || ['cs.AI', 'cs.CV']);
  const [freq, setFreq] = useState<Frequency>(subscription?.frequency || 'daily');
  const [showEmailPreview, setShowEmailPreview] = useState(true);
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['cs']);
  const [agreed, setAgreed] = useState(false);

  const toggleGroup = (id: string) => {
    setExpandedGroups(prev => 
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  const handleToggleTopic = (id: string) => {
    setSelectedTopicIds(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    if (!agreed || selectedTopicIds.length === 0) return;
    setSubscription({
      domains: selectedTopicIds,
      frequency: freq,
      timeSlot: 'morning',
      subscribedAt: new Date().toLocaleDateString()
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const getTopicName = (id: string) => {
    for (const group of DOMAIN_GROUPS) {
      const topic = group.topics.find(t => t.id === id);
      if (topic) return topic.name;
    }
    return id;
  };

  if (!subscription && !isEditing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6 animate-fade-in">
        <div className="w-24 h-24 rounded-full bg-primary/5 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary !text-[48px]">mark_email_unread</span>
        </div>
        <div className="max-w-md">
          <h1 className="text-3xl font-black text-text-main mb-3">Your Research Pulse</h1>
          <p className="text-text-secondary leading-relaxed">
            Curate your personalized research feed. Select the domains that matter to you and we'll deliver the latest pre-prints directly to your inbox.
          </p>
        </div>
        <button 
          onClick={() => setIsEditing(true)}
          className="bg-primary text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-transform active:scale-95"
        >
          Configure Your Pulse
        </button>
        <button onClick={logout} className="mt-8 text-sm font-bold text-red-500 hover:text-red-600 flex items-center gap-2">
           <span className="material-symbols-outlined">logout</span>
           Logout
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 animate-fade-in pb-20">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-black text-text-main tracking-tight">Account Preferences</h1>
          <p className="text-text-secondary text-lg">Signed in as {user?.email}</p>
        </div>
        <button 
          onClick={logout}
          className="px-4 py-2 border border-red-100 rounded-xl text-red-500 hover:bg-red-50 text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2"
        >
          <span className="material-symbols-outlined !text-[18px]">logout</span>
          Logout
        </button>
      </div>

      {!isEditing && subscription ? (
        <div className="flex flex-col gap-8">
           <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm grid md:grid-cols-3 gap-8">
              <div className="flex flex-col gap-2">
                <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest">Active Domains</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {subscription.domains.map(id => (
                    <span key={id} className="px-3 py-1 bg-primary/5 text-primary rounded-lg text-xs font-bold border border-primary/10">
                      {getTopicName(id)}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest">Frequency</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="material-symbols-outlined text-primary">event_repeat</span>
                  <span className="font-bold text-text-main capitalize">{subscription.frequency}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest">Next Delivery</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="material-symbols-outlined text-primary">schedule</span>
                  <span className="font-bold text-text-main">Tomorrow Morning</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsEditing(true)}
              className="bg-primary/5 text-primary w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest border border-primary/20 hover:bg-primary/10 transition-all"
            >
              Update Preferences
            </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
          {/* Main Content */}
          <div className="flex flex-col gap-6">
            
            {/* Step 1: Research Domains */}
            <section className="bg-gradient-to-br from-white to-gray-50/50 border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6 border-b border-gray-100 bg-white">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white font-black text-sm shadow-lg shadow-primary/20">1</div>
                  <div>
                    <h2 className="text-lg font-black text-text-main">Research Domains</h2>
                    <p className="text-xs text-text-secondary">Select the topics you want to follow</p>
                  </div>
                </div>
              </div>
              
              {/* Selected Topics Pills */}
              {selectedTopicIds.length > 0 && (
                <div className="px-6 py-4 bg-primary/[0.02] border-b border-gray-100">
                  <div className="flex flex-wrap gap-2">
                    {selectedTopicIds.map(id => (
                      <div key={id} className="group flex items-center gap-2 bg-white text-primary border border-primary/20 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm hover:shadow-md hover:border-primary/40 transition-all">
                        <span className="material-symbols-outlined !text-[14px]">check_circle</span>
                        {getTopicName(id)}
                        <button onClick={() => handleToggleTopic(id)} className="material-symbols-outlined !text-[14px] opacity-50 hover:opacity-100 hover:text-red-500 transition-all">close</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Domain Groups */}
              <div className="p-4 flex flex-col gap-2">
                {DOMAIN_GROUPS.map(group => (
                  <div key={group.id} className="border border-gray-100 rounded-2xl overflow-hidden bg-white hover:border-gray-200 transition-colors">
                    <button onClick={() => toggleGroup(group.id)} className="w-full flex items-center justify-between p-4 hover:bg-gray-50/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${group.color} shadow-sm`}>
                          <span className="material-symbols-outlined !text-[20px]">{group.icon}</span>
                        </div>
                        <div className="text-left">
                          <span className="font-bold text-sm text-text-main block">{group.name}</span>
                          <span className="text-[10px] text-text-secondary">{group.topics.length} topics available</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-1 rounded-lg">
                          {group.topics.filter(t => selectedTopicIds.includes(t.id)).length} selected
                        </span>
                        <span className={`material-symbols-outlined text-text-secondary transition-transform duration-200 ${expandedGroups.includes(group.id) ? 'rotate-180' : ''}`}>expand_more</span>
                      </div>
                    </button>
                    {expandedGroups.includes(group.id) && (
                      <div className="px-4 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-2 animate-fade-in">
                        {group.topics.map(topic => {
                          const isSelected = selectedTopicIds.includes(topic.id);
                          return (
                            <label 
                              key={topic.id} 
                              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border ${
                                isSelected 
                                  ? 'bg-primary/5 border-primary/20 shadow-sm' 
                                  : 'bg-gray-50/50 border-transparent hover:bg-gray-100/50 hover:border-gray-200'
                              }`}
                            >
                              <input 
                                type="checkbox" 
                                checked={isSelected} 
                                onChange={() => handleToggleTopic(topic.id)} 
                                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/20" 
                              />
                              <span className={`text-sm ${isSelected ? 'text-primary font-bold' : 'text-text-main font-medium'}`}>{topic.name}</span>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Step 2: Delivery Preferences */}
            <section className="bg-gradient-to-br from-white to-gray-50/50 border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6 border-b border-gray-100 bg-white">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white font-black text-sm shadow-lg shadow-primary/20">2</div>
                  <div>
                    <h2 className="text-lg font-black text-text-main">Delivery Schedule</h2>
                    <p className="text-xs text-text-secondary">Choose how often you receive updates</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setFreq('daily')} 
                    className={`relative p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                      freq === 'daily' 
                        ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10' 
                        : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50/50'
                    }`}
                  >
                    {freq === 'daily' && <div className="absolute top-2 right-2"><span className="material-symbols-outlined text-primary !text-[16px]">check_circle</span></div>}
                    <span className={`material-symbols-outlined !text-[28px] ${freq === 'daily' ? 'text-primary' : 'text-text-secondary'}`}>today</span>
                    <span className={`text-sm font-black ${freq === 'daily' ? 'text-primary' : 'text-text-main'}`}>Daily</span>
                    <span className="text-[10px] text-text-secondary">Every morning at 8 AM</span>
                  </button>
                  <button 
                    onClick={() => setFreq('weekly')} 
                    className={`relative p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                      freq === 'weekly' 
                        ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10' 
                        : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50/50'
                    }`}
                  >
                    {freq === 'weekly' && <div className="absolute top-2 right-2"><span className="material-symbols-outlined text-primary !text-[16px]">check_circle</span></div>}
                    <span className={`material-symbols-outlined !text-[28px] ${freq === 'weekly' ? 'text-primary' : 'text-text-secondary'}`}>date_range</span>
                    <span className={`text-sm font-black ${freq === 'weekly' ? 'text-primary' : 'text-text-main'}`}>Weekly</span>
                    <span className="text-[10px] text-text-secondary">Every Monday morning</span>
                  </button>
                </div>
              </div>
            </section>

            {/* Step 3: Academic Integrity */}
            <section className="bg-gradient-to-br from-amber-50 to-orange-50/30 border border-amber-200/50 rounded-3xl overflow-hidden">
              <div className="p-6 border-b border-amber-200/30 bg-amber-50/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
                    <span className="material-symbols-outlined !text-[20px]">gavel</span>
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-amber-900">Academic Integrity</h2>
                    <p className="text-xs text-amber-700">Please review and accept our protocol</p>
                  </div>
                </div>
              </div>
              <div className="p-6 flex flex-col gap-4">
                <div className="bg-white/60 backdrop-blur-sm p-5 rounded-2xl text-xs leading-relaxed text-amber-900/80 border border-amber-200/30 space-y-3">
                  <div className="flex gap-3">
                    <span className="material-symbols-outlined text-amber-600 !text-[18px] shrink-0 mt-0.5">warning</span>
                    <p><strong className="text-amber-800">Warning on Misconduct:</strong> This platform is designed strictly for research discovery and assistance. Users are explicitly warned against utilizing AI-generated insights or summaries for plagiarism, data fabrication, or any other form of academic dishonesty.</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="material-symbols-outlined text-amber-600 !text-[18px] shrink-0 mt-0.5">info</span>
                    <p><strong className="text-amber-800">Disclaimer:</strong> ArXivPulse and its operators disclaim all liability for any consequences arising from the misuse of this platform for unethical academic purposes.</p>
                  </div>
                </div>
                <label className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all border-2 ${
                  agreed 
                    ? 'bg-green-50 border-green-300' 
                    : 'bg-white/50 border-amber-200/50 hover:border-amber-300'
                }`}>
                  <input 
                    type="checkbox" 
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="w-5 h-5 rounded border-amber-300 text-green-600 focus:ring-green-500/20 transition-all"
                  />
                  <span className={`text-sm font-bold transition-colors ${agreed ? 'text-green-700' : 'text-amber-800'}`}>
                    I have read and agree to the Academic Integrity Protocol
                  </span>
                  {agreed && <span className="material-symbols-outlined text-green-600 ml-auto">verified</span>}
                </label>
              </div>
            </section>
          </div>

          {/* Sidebar Summary */}
          <div className="flex flex-col gap-4 sticky top-6">
            <div className="bg-gradient-to-br from-white to-gray-50/50 border border-gray-100 rounded-3xl overflow-hidden shadow-lg">
              <div className="p-5 border-b border-gray-100 bg-white">
                <h3 className="text-sm font-black text-text-main flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary !text-[18px]">summarize</span>
                  Subscription Summary
                </h3>
              </div>
              <div className="p-5 flex flex-col gap-4">
                {/* Selected Topics */}
                <div>
                  <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest mb-2">Selected Topics</p>
                  {selectedTopicIds.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {selectedTopicIds.slice(0, 4).map(id => (
                        <span key={id} className="px-2 py-1 bg-primary/5 text-primary rounded-lg text-[10px] font-bold">
                          {getTopicName(id)}
                        </span>
                      ))}
                      {selectedTopicIds.length > 4 && (
                        <span className="px-2 py-1 bg-gray-100 text-text-secondary rounded-lg text-[10px] font-bold">
                          +{selectedTopicIds.length - 4} more
                        </span>
                      )}
                    </div>
                  ) : (
                    <p className="text-xs text-text-secondary italic">No topics selected</p>
                  )}
                </div>
                
                {/* Frequency */}
                <div>
                  <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest mb-2">Delivery</p>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary !text-[16px]">{freq === 'daily' ? 'today' : 'date_range'}</span>
                    <span className="text-sm font-bold text-text-main capitalize">{freq}</span>
                  </div>
                </div>

                {/* Status */}
                <div className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
                  agreed && selectedTopicIds.length > 0 
                    ? 'bg-green-50 text-green-700 border border-green-200' 
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  <span className="material-symbols-outlined !text-[16px]">
                    {agreed && selectedTopicIds.length > 0 ? 'check_circle' : 'pending'}
                  </span>
                  {agreed && selectedTopicIds.length > 0 
                    ? 'Ready to subscribe!' 
                    : !agreed 
                      ? 'Agree to protocol to continue' 
                      : 'Select at least one topic'
                  }
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="p-5 pt-0 flex flex-col gap-3">
                <button 
                  onClick={handleSave} 
                  disabled={!agreed || selectedTopicIds.length === 0} 
                  className="bg-gradient-to-r from-primary to-primary-light text-white w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 disabled:opacity-30 disabled:shadow-none disabled:cursor-not-allowed transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="material-symbols-outlined !text-[18px]">rocket_launch</span>
                  Save Subscription
                </button>
                <button 
                  onClick={handleCancel} 
                  className="text-text-secondary text-xs font-bold hover:text-text-main text-center py-2 rounded-xl hover:bg-gray-100 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountView;
