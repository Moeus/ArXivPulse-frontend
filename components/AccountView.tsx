
import React, { useState } from 'react';
import { UserSubscription, Frequency, TimeSlot } from '../types';

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
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Form State
  const [selectedTopicIds, setSelectedTopicIds] = useState<string[]>(['cs.AI', 'cs.CV']);
  const [freq, setFreq] = useState<Frequency>('daily');
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
      timeSlot: 'morning', // Defaulting for simplicity
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
      </div>
    );
  }

  if (subscription && !isEditing) {
    return (
      <div className="flex flex-col gap-8 animate-fade-in pb-12">
        <div className="flex justify-between items-end">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-black text-text-main">My Subscription</h1>
            <p className="text-text-secondary">Your active pulse settings and delivery schedule.</p>
          </div>
          <button 
            onClick={() => setIsEditing(true)}
            className="text-primary font-bold text-sm hover:underline"
          >
            Edit Configuration
          </button>
        </div>

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
          onClick={() => setSubscription(null)}
          className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-text-secondary font-bold hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all"
        >
          Cancel Subscription
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 animate-fade-in pb-20">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black text-text-main tracking-tight">Configure Your Pulse</h1>
        <p className="text-text-secondary text-lg">Curate your research feed. Select the domains that matter to you and we'll deliver the latest pre-prints directly to your inbox.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-start">
        {/* Left Column: Form */}
        <div className="flex flex-col gap-8">
          
          {/* Section 1: Research Domains */}
          <section className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-text-main">1. Research Domains</h2>
              <button className="text-[10px] font-black uppercase text-text-secondary tracking-widest hover:text-primary">Select Topics</button>
            </div>

            {/* Selected Chips Area */}
            <div className="flex flex-wrap gap-2 min-h-[40px]">
              {selectedTopicIds.map(id => (
                <div key={id} className="flex items-center gap-2 bg-primary/5 text-primary border border-primary/20 px-3 py-1.5 rounded-full text-xs font-bold group">
                  {getTopicName(id)}
                  <button onClick={() => handleToggleTopic(id)} className="material-symbols-outlined !text-[14px] hover:text-red-500">close</button>
                </div>
              ))}
              <button className="flex items-center gap-1 text-xs font-bold text-text-secondary px-3 py-1.5 hover:text-primary transition-colors">
                <span className="material-symbols-outlined !text-[16px]">add</span>
                Add more
              </button>
            </div>

            {/* Domain Groups Accodion */}
            <div className="flex flex-col gap-3">
              {DOMAIN_GROUPS.map(group => (
                <div key={group.id} className="border border-gray-100 rounded-2xl overflow-hidden">
                  <button 
                    onClick={() => toggleGroup(group.id)}
                    className="w-full flex items-center justify-between p-4 bg-background-subtle hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${group.color}`}>
                        <span className="material-symbols-outlined !text-[18px]">{group.icon}</span>
                      </div>
                      <span className="font-bold text-sm text-text-main">{group.name}</span>
                    </div>
                    <span className={`material-symbols-outlined transition-transform ${expandedGroups.includes(group.id) ? 'rotate-180' : ''}`}>expand_more</span>
                  </button>
                  
                  {expandedGroups.includes(group.id) && (
                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 animate-fade-in">
                      {group.topics.map(topic => (
                        <label key={topic.id} className="flex items-center gap-3 cursor-pointer group">
                          <input 
                            type="checkbox" 
                            checked={selectedTopicIds.includes(topic.id)}
                            onChange={() => handleToggleTopic(topic.id)}
                            className="w-5 h-5 rounded border-gray-200 text-primary focus:ring-primary/20 transition-all cursor-pointer"
                          />
                          <span className={`text-sm font-medium transition-colors ${selectedTopicIds.includes(topic.id) ? 'text-primary font-bold' : 'text-text-main group-hover:text-primary'}`}>
                            {topic.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: Delivery Preferences */}
          <section className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm flex flex-col gap-8">
            <h2 className="text-xl font-black text-text-main">2. Delivery Preferences</h2>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="font-bold text-sm text-text-main">Pulse Frequency</p>
                <p className="text-xs text-text-secondary">How often would you like to receive updates?</p>
              </div>
              <div className="bg-background-subtle p-1.5 rounded-2xl flex gap-1">
                <button 
                  onClick={() => setFreq('daily')}
                  className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${freq === 'daily' ? 'bg-white text-primary shadow-sm' : 'text-text-secondary hover:text-text-main'}`}
                >
                  Daily Pulse
                </button>
                <button 
                  onClick={() => setFreq('weekly')}
                  className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${freq === 'weekly' ? 'bg-white text-primary shadow-sm' : 'text-text-secondary hover:text-text-main'}`}
                >
                  Weekly Digest
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
              <div>
                <p className="font-bold text-sm text-text-main">Email Preview</p>
                <p className="text-xs text-text-secondary">See how your digest will look with current settings.</p>
              </div>
              <button 
                onClick={() => setShowEmailPreview(!showEmailPreview)}
                className={`relative w-12 h-6 rounded-full transition-colors ${showEmailPreview ? 'bg-primary' : 'bg-gray-200'}`}
              >
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${showEmailPreview ? 'translate-x-6' : ''}`} />
              </button>
            </div>
          </section>

          {/* Academic Integrity Protocol (Retained) */}
          <section className="bg-amber-50 border border-amber-100 rounded-3xl p-8 flex flex-col gap-4">
             <div className="flex items-center gap-2 text-amber-800">
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>gavel</span>
                <h3 className="text-sm font-black uppercase tracking-widest">Academic Integrity Protocol</h3>
              </div>
              <div className="bg-white/50 p-4 rounded-2xl text-xs leading-relaxed text-amber-900/80 border border-amber-200/50">
                <p className="mb-3"><strong>Warning on Misconduct:</strong> This platform is designed strictly for research discovery. Users are warned against utilizing AI-generated insights for plagiarism, data fabrication, or any other form of academic dishonesty.</p>
                <p><strong>Disclaimer:</strong> ArXivPulse disclaims all liability for consequences from misuse. By subscribing, you acknowledge you are solely responsible for adhering to your institution's integrity standards.</p>
              </div>
              <label className="flex items-center gap-3 cursor-pointer group mt-2">
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
        </div>

        {/* Right Column: Preview & Save */}
        <div className="flex flex-col gap-6 sticky top-6">
          
          {/* Preview Card */}
          <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[400px]">
            <div className="bg-primary p-4 flex items-center justify-between text-white">
              <span className="text-[10px] font-black uppercase tracking-widest">Preview</span>
              <span className="material-symbols-outlined !text-[16px]">visibility</span>
            </div>
            <div className="flex-1 bg-background-subtle p-6 flex flex-col gap-4 overflow-y-auto">
              {/* Fake Email Header */}
              <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-text-secondary tracking-tighter">Subject</p>
                  <p className="text-xs font-bold text-text-main">Your Daily ArXiv Pulse: 5 New Papers</p>
                </div>
              </div>

              {/* Fake Paper in Email */}
              <div className="bg-white rounded-2xl p-5 border border-gray-100 flex flex-col gap-3">
                <div className="flex gap-1.5">
                   <span className="px-1.5 py-0.5 rounded-md bg-purple-50 text-primary text-[8px] font-black uppercase tracking-tighter">CV</span>
                   <span className="px-1.5 py-0.5 rounded-md bg-blue-50 text-blue-600 text-[8px] font-black uppercase tracking-tighter">AI</span>
                </div>
                <h4 className="text-sm font-black text-text-main leading-tight">Attention Is All You Need... Again?</h4>
                <p className="text-[10px] text-text-secondary line-clamp-3 leading-relaxed">We propose a novel architecture that revisits the fundamental principles of attention mechanisms in transformers...</p>
                <div className="mt-2 w-full py-2 bg-background-subtle rounded-xl text-center text-[10px] font-black text-text-main border border-gray-50">
                  Read PDF
                </div>
              </div>
            </div>
          </div>

          {/* Final Summary Card */}
          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-lg flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-text-secondary font-medium">Total Domains</span>
                <span className="text-text-main font-black">{selectedTopicIds.length} Selected</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-text-secondary font-medium">Frequency</span>
                <span className="text-text-main font-black capitalize">{freq}</span>
              </div>
            </div>

            <div className="relative">
              <input 
                type="email" 
                defaultValue="researcher@university.edu"
                className="w-full pl-10 pr-4 py-3 bg-background-subtle border-none rounded-2xl text-xs font-medium focus:ring-1 focus:ring-primary"
              />
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary !text-[16px]">mail</span>
            </div>

            <button 
              onClick={handleSave}
              disabled={!agreed || selectedTopicIds.length === 0}
              className="bg-primary text-white w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform active:scale-95 disabled:opacity-20 disabled:scale-100"
            >
              <span className="material-symbols-outlined fill !text-[20px]">task_alt</span>
              Save Subscription
            </button>
            
            {isEditing && (
               <button 
                onClick={handleCancel}
                className="text-text-secondary text-xs font-bold hover:text-text-main text-center"
              >
                Cancel and Go Back
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountView;
