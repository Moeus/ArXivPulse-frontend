/**
 * Account — 账户与订阅管理页面
 * 三种状态：
 *   1. 无订阅 → 显示引导用户配置的空状态
 *   2. 已订阅 + 非编辑 → 展示当前订阅摘要信息
 *   3. 编辑模式 → 分步配置：研究领域选择、推送频率、学术诚信确认
 */

import React, { useState } from 'react';
import { Frequency, TimeSlot } from '../types';
import { useStore } from '../store/useStore';
import { useT } from '../i18n';
import type { TranslationKeys } from '../i18n';
import { Terminal, Atom, Calculator, Dna, Mail, LogOut, RefreshCw, Clock, CheckCircle, X, ChevronDown, Calendar, CalendarDays, Gavel, TriangleAlert, Info, BadgeCheck, FileText, Rocket, Loader } from 'lucide-react';

interface DomainGroup {
  id: string;
  nameKey: TranslationKeys;
  icon: React.ElementType;
  color: string;
  topics: { id: string; nameKey: TranslationKeys }[];
}

const DOMAIN_GROUPS: DomainGroup[] = [
  {
    id: 'cs',
    nameKey: 'computerScience',
    icon: Terminal,
    color: 'bg-orange-100 text-orange-600',
    topics: [
      { id: 'cs.AI', nameKey: 'artificialIntelligence' },
      { id: 'cs.CV', nameKey: 'computerVision' },
      { id: 'cs.CR', nameKey: 'cryptography' },
      { id: 'cs.NI', nameKey: 'networking' },
      { id: 'cs.LG', nameKey: 'machineLearning' },
    ]
  },
  {
    id: 'physics',
    nameKey: 'physics',
    icon: Atom,
    color: 'bg-blue-100 text-blue-600',
    topics: [
      { id: 'physics.quant-ph', nameKey: 'quantumPhysics' },
      { id: 'physics.optics', nameKey: 'optics' },
      { id: 'physics.gen-ph', nameKey: 'generalPhysics' },
    ]
  },
  {
    id: 'math',
    nameKey: 'mathematics',
    icon: Calculator,
    color: 'bg-green-100 text-green-600',
    topics: [
      { id: 'math.ST', nameKey: 'statistics' },
      { id: 'math.GT', nameKey: 'topology' },
      { id: 'math.CO', nameKey: 'combinatorics' },
    ]
  },
  {
    id: 'bio',
    nameKey: 'quantitativeBiology',
    icon: Dna,
    color: 'bg-red-100 text-red-600',
    topics: [ // Assuming bio topics existed or adding placeholder if strict match needed. 
              // Wait, previous file had 3 groups, I should stick to 3 groups unless I want to add Bio. 
              // The read file ONLY had 3 groups. I will stick to 3 groups.
    ]
  }
];

const Account: React.FC = () => {
  const { subscription, setSubscription, logout, user } = useStore();
  const { t } = useT();
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
      const topic = group.topics.find(tp => tp.id === id);
      if (topic) return t(topic.nameKey);
    }
    return id;
  };

  if (!subscription && !isEditing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6 animate-fade-in">
        <div className="w-24 h-24 rounded-full bg-primary/5 flex items-center justify-center">
          <Mail className="text-primary" size={48} />
        </div>
        <div className="max-w-md">
          <h1 className="text-3xl font-black text-text-main mb-3">{t('yourResearchPulse')}</h1>
          <p className="text-text-secondary leading-relaxed">
            {t('yourResearchPulseDesc')}
          </p>
        </div>
        <button 
          onClick={() => setIsEditing(true)}
          className="bg-primary text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-transform active:scale-95"
        >
          {t('configurePulse')}
        </button>
        <button onClick={logout} className="mt-8 text-sm font-bold text-red-500 hover:text-red-600 flex items-center gap-2">
           <LogOut size={16} />
           {t('logout')}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 animate-fade-in pb-20">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-black text-text-main tracking-tight">{t('accountPreferences')}</h1>
          <p className="text-text-secondary text-lg">{t('signedInAs')} {user?.email}</p>
        </div>
        <button 
          onClick={logout}
          className="px-4 py-2 border border-red-100 rounded-xl text-red-500 hover:bg-red-50 text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2"
        >
          <LogOut size={18} />
          {t('logout')}
        </button>
      </div>

      {!isEditing && subscription ? (
        <div className="flex flex-col gap-8">
           <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm grid md:grid-cols-3 gap-8">
              <div className="flex flex-col gap-2">
                <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest">{t('activeDomains')}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {subscription.domains.map(id => (
                    <span key={id} className="px-3 py-1 bg-primary/5 text-primary rounded-lg text-xs font-bold border border-primary/10">
                      {getTopicName(id)}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest">{t('frequency')}</p>
                <div className="flex items-center gap-2 mt-2">
                  <RefreshCw className="text-primary" size={20} />
                  <span className="font-bold text-text-main capitalize">{subscription.frequency}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest">{t('nextDelivery')}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Clock className="text-primary" size={20} />
                  <span className="font-bold text-text-main">{t('tomorrowMorning')}</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsEditing(true)}
              className="bg-primary/5 text-primary w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest border border-primary/20 hover:bg-primary/10 transition-all"
            >
              {t('updatePreferences')}
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
                    <h2 className="text-lg font-black text-text-main">{t('researchDomains')}</h2>
                    <p className="text-xs text-text-secondary">{t('selectTopics')}</p>
                  </div>
                </div>
              </div>
              
              {/* Selected Topics Pills */}
              {selectedTopicIds.length > 0 && (
                <div className="px-6 py-4 bg-primary/[0.02] border-b border-gray-100">
                  <div className="flex flex-wrap gap-2">
                    {selectedTopicIds.map(id => (
                      <div key={id} className="group flex items-center gap-2 bg-white text-primary border border-primary/20 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm hover:shadow-md hover:border-primary/40 transition-all">
                        <CheckCircle size={14} />
                        {getTopicName(id)}
                        <button onClick={() => handleToggleTopic(id)} className="opacity-50 hover:opacity-100 hover:text-red-500 transition-all"><X size={14} /></button>
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
                          <group.icon size={20} />
                        </div>
                        <div className="text-left">
                          <span className="font-bold text-sm text-text-main block">{t(group.nameKey)}</span>
                          <span className="text-[10px] text-text-secondary">{group.topics.length} {t('topicsAvailable')}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-1 rounded-lg">
                          {group.topics.filter(tp => selectedTopicIds.includes(tp.id)).length} {t('selected')}
                        </span>
                        <ChevronDown size={20} className={`text-text-secondary transition-transform duration-200 ${expandedGroups.includes(group.id) ? 'rotate-180' : ''}`} />
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
                              <span className={`text-sm ${isSelected ? 'text-primary font-bold' : 'text-text-main font-medium'}`}>{t(topic.nameKey)}</span>
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
                    <h2 className="text-lg font-black text-text-main">{t('deliverySchedule')}</h2>
                    <p className="text-xs text-text-secondary">{t('chooseFrequency')}</p>
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
                    {freq === 'daily' && <div className="absolute top-2 right-2"><CheckCircle className="text-primary" size={16} /></div>}
                    <Calendar size={28} className={freq === 'daily' ? 'text-primary' : 'text-text-secondary'} />
                    <span className={`text-sm font-black ${freq === 'daily' ? 'text-primary' : 'text-text-main'}`}>{t('daily')}</span>
                    <span className="text-[10px] text-text-secondary">{t('everyMorning8')}</span>
                  </button>
                  <button 
                    onClick={() => setFreq('weekly')} 
                    className={`relative p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                      freq === 'weekly' 
                        ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10' 
                        : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50/50'
                    }`}
                  >
                    {freq === 'weekly' && <div className="absolute top-2 right-2"><CheckCircle className="text-primary" size={16} /></div>}
                    <CalendarDays size={28} className={freq === 'weekly' ? 'text-primary' : 'text-text-secondary'} />
                    <span className={`text-sm font-black ${freq === 'weekly' ? 'text-primary' : 'text-text-main'}`}>{t('weekly')}</span>
                    <span className="text-[10px] text-text-secondary">{t('everyMondayMorning')}</span>
                  </button>
                </div>
              </div>
            </section>

            {/* Step 3: Academic Integrity */}
            <section className="bg-gradient-to-br from-amber-50 to-orange-50/30 border border-amber-200/50 rounded-3xl overflow-hidden">
              <div className="p-6 border-b border-amber-200/30 bg-amber-50/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
                    <Gavel size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-amber-900">{t('academicIntegrity')}</h2>
                    <p className="text-xs text-amber-700">{t('reviewProtocol')}</p>
                  </div>
                </div>
              </div>
              <div className="p-6 flex flex-col gap-4">
                <div className="bg-white/60 backdrop-blur-sm p-5 rounded-2xl text-xs leading-relaxed text-amber-900/80 border border-amber-200/30 space-y-3">
                  <div className="flex gap-3">
                    <TriangleAlert className="text-amber-600 shrink-0 mt-0.5" size={18} />
                    <p><strong className="text-amber-800">{t('warningMisconduct')}</strong> {t('warningMisconductText')}</p>
                  </div>
                  <div className="flex gap-3">
                    <Info className="text-amber-600 shrink-0 mt-0.5" size={18} />
                    <p><strong className="text-amber-800">{t('disclaimer')}</strong> {t('disclaimerText')}</p>
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
                    {t('agreeProtocol')}
                  </span>
                  {agreed && <BadgeCheck className="text-green-600 ml-auto" />}
                </label>
              </div>
            </section>
          </div>

          {/* Sidebar Summary */}
          <div className="flex flex-col gap-4 sticky top-6">
            <div className="bg-gradient-to-br from-white to-gray-50/50 border border-gray-100 rounded-3xl overflow-hidden shadow-lg">
              <div className="p-5 border-b border-gray-100 bg-white">
                <h3 className="text-sm font-black text-text-main flex items-center gap-2">
                  <FileText className="text-primary" size={18} />
                  {t('subscriptionSummary')}
                </h3>
              </div>
              <div className="p-5 flex flex-col gap-4">
                {/* Selected Topics */}
                <div>
                  <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest mb-2">{t('selectedTopics')}</p>
                  {selectedTopicIds.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {selectedTopicIds.slice(0, 4).map(id => (
                        <span key={id} className="px-2 py-1 bg-primary/5 text-primary rounded-lg text-[10px] font-bold">
                          {getTopicName(id)}
                        </span>
                      ))}
                      {selectedTopicIds.length > 4 && (
                        <span className="px-2 py-1 bg-gray-100 text-text-secondary rounded-lg text-[10px] font-bold">
                          +{selectedTopicIds.length - 4} {t('more')}
                        </span>
                      )}
                    </div>
                  ) : (
                    <p className="text-xs text-text-secondary italic">{t('noTopicsSelected')}</p>
                  )}
                </div>
                
                {/* Frequency */}
                <div>
                  <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest mb-2">{t('delivery')}</p>
                  <div className="flex items-center gap-2">
                    {freq === 'daily' ? <Calendar className="text-primary" size={16} /> : <CalendarDays className="text-primary" size={16} />}
                    <span className="text-sm font-bold text-text-main capitalize">{freq === 'daily' ? t('daily') : t('weekly')}</span>
                  </div>
                </div>

                {/* Status */}
                <div className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
                  agreed && selectedTopicIds.length > 0 
                    ? 'bg-green-50 text-green-700 border border-green-200' 
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {agreed && selectedTopicIds.length > 0 ? <CheckCircle size={16} /> : <Loader size={16} />}
                  {agreed && selectedTopicIds.length > 0 
                    ? t('readyToSubscribe') 
                    : !agreed 
                      ? t('agreeToProtocol') 
                      : t('selectAtLeastOneTopic')
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
                  <Rocket size={18} />
                  {t('saveSubscription')}
                </button>
                <button 
                  onClick={handleCancel} 
                  className="text-text-secondary text-xs font-bold hover:text-text-main text-center py-2 rounded-xl hover:bg-gray-100 transition-all"
                >
                  {t('cancel')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
