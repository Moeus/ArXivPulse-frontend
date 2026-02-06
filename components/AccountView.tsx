
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
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-start">
          <div className="flex flex-col gap-8">
            <section className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm flex flex-col gap-6">
              <h2 className="text-xl font-black text-text-main">1. Research Domains</h2>
              <div className="flex flex-wrap gap-2 min-h-[40px]">
                {selectedTopicIds.map(id => (
                  <div key={id} className="flex items-center gap-2 bg-primary/5 text-primary border border-primary/20 px-3 py-1.5 rounded-full text-xs font-bold">
                    {getTopicName(id)}
                    <button onClick={() => handleToggleTopic(id)} className="material-symbols-outlined !text-[14px] hover:text-red-500">close</button>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                {DOMAIN_GROUPS.map(group => (
                  <div key={group.id} className="border border-gray-100 rounded-2xl overflow-hidden">
                    <button onClick={() => toggleGroup(group.id)} className="w-full flex items-center justify-between p-4 bg-background-subtle hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${group.color}`}>
                          <span className="material-symbols-outlined !text-[18px]">{group.icon}</span>
                        </div>
                        <span className="font-bold text-sm text-text-main">{group.name}</span>
                      </div>
                      <span className={`material-symbols-outlined transition-transform ${expandedGroups.includes(group.id) ? 'rotate-180' : ''}`}>expand_more</span>
                    </button>
                    {expandedGroups.includes(group.id) && (
                      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3 animate-fade-in">
                        {group.topics.map(topic => (
                          <label key={topic.id} className="flex items-center gap-3 cursor-pointer group">
                            <input type="checkbox" checked={selectedTopicIds.includes(topic.id)} onChange={() => handleToggleTopic(topic.id)} className="w-5 h-5 rounded border-gray-200 text-primary focus:ring-primary/20" />
                            <span className={`text-sm font-medium ${selectedTopicIds.includes(topic.id) ? 'text-primary font-bold' : 'text-text-main'}`}>{topic.name}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm flex flex-col gap-8">
              <h2 className="text-xl font-black text-text-main">2. Delivery Preferences</h2>
              <div className="flex bg-background-subtle p-1.5 rounded-2xl flex gap-1 w-fit">
                  <button onClick={() => setFreq('daily')} className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${freq === 'daily' ? 'bg-white text-primary shadow-sm' : 'text-text-secondary'}`}>Daily</button>
                  <button onClick={() => setFreq('weekly')} className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${freq === 'weekly' ? 'bg-white text-primary shadow-sm' : 'text-text-secondary'}`}>Weekly</button>
              </div>
            </section>

            <section className="bg-amber-50 border border-amber-100 rounded-3xl p-8 flex flex-col gap-4">
               <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="w-5 h-5 rounded border-amber-300 text-primary" />
                  <span className="text-xs font-bold text-amber-900">Agree to Academic Integrity Protocol.</span>
                </label>
            </section>
          </div>

          <div className="flex flex-col gap-6 sticky top-6">
            <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-lg flex flex-col gap-6">
              <button onClick={handleSave} disabled={!agreed || selectedTopicIds.length === 0} className="bg-primary text-white w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-primary/20 disabled:opacity-20">Save Subscription</button>
              <button onClick={handleCancel} className="text-text-secondary text-xs font-bold hover:text-text-main text-center">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountView;
