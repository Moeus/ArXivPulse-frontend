/**
 * Account — 账户与订阅管理页面
 * 設計：書卷氣 — 温暖的卡片风格
 */

import React, { useState } from 'react';
import { Frequency } from '../types';
import { useAppStore } from '../store/appStore';
import { useUserStore } from '../store/userStore';
import { useTranslation } from 'react-i18next';
import { Mail, LogOut, Clock, CheckCircle, X, ChevronDown, ChevronUp, Calendar, CalendarDays, Gavel, TriangleAlert, Info, BadgeCheck, Coffee, Loader, Pencil, ArrowLeft, Sparkles, User, BarChart3, TrendingUp } from 'lucide-react';
import { ARXIV_CATEGORIES } from '../constants/ArxivCategory';
import { ACTIVITY_CHART, CATEGORY_CHART } from '../constants';
import StatCard from '../components/StatCard';
import ActivityChart from '../components/ActivityChart';
import CategoryChart from '../components/CategoryChart';

const Account: React.FC = () => {
  const { resetUI } = useAppStore();
  const { subscription, setSubscription, user, logout } = useUserStore();
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const [selectedTopicIds, setSelectedTopicIds] = useState<string[]>(subscription?.domains || ['cs.AI', 'cs.CV']);
  const [freq, setFreq] = useState<Frequency>(subscription?.frequency || 'daily');
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['cs']);
  const [agreed, setAgreed] = useState(false);

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

  const handleLogout = () => {
    resetUI();
    logout();
  };

  const getTopicName = (id: string) => {
    for (const group of ARXIV_CATEGORIES) {
      const topic = group.topics.find(tp => tp.id === id);
      if (topic) {
        const translated = t(topic.nameKey);
        return translated !== topic.nameKey ? translated : topic.originalName;
      }
    }
    return id;
  };

  // ─────────────────────────────────────────────
  // 状态 1：无订阅
  // ─────────────────────────────────────────────
  if (!subscription && !isEditing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6 animate-fade-in">
        <div className="w-24 h-24 rounded-2xl bg-primary/8 flex items-center justify-center">
          <Coffee className="text-primary" size={40} />
        </div>
        <div className="max-w-md">
          <h1 className="text-2xl font-serif font-semibold text-text-main mb-3">{t('Configure')}</h1>
          <p className="text-text-secondary text-sm leading-relaxed">
            {t('ConfigureDesc')}
          </p>
        </div>
        <button
          onClick={() => setIsEditing(true)}
          className="bg-primary text-white px-8 py-4 rounded-xl font-semibold text-sm tracking-wide shadow-warm-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
        >
          {t('StartConfiguration')}
        </button>
        <button onClick={handleLogout} className="mt-6 text-sm font-medium text-red-400 hover:text-red-500 flex items-center gap-2 transition-colors">
           <LogOut size={14} />
           {t('logout')}
        </button>
      </div>
    );
  }

  // ─────────────────────────────────────────────
  // 状态 2：已订阅（非编辑）
  // ─────────────────────────────────────────────
  if (subscription && !isEditing) {
    return (
      <div className="flex flex-col gap-5 animate-fade-in pb-20">

        {/* Hero 卡片：用户身份 — 深色咖啡風格 */}
        <div className="relative overflow-hidden bg-background-dark rounded-2xl p-6 shadow-warm-xl">
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-primary/8 blur-2xl" />
          <div className="absolute -bottom-12 -left-8 w-36 h-36 rounded-full bg-cambridge/5 blur-xl" />

          <div className="relative flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-13 h-13 rounded-xl bg-primary/15 flex items-center justify-center border border-primary/20">
                <User className="text-primary" size={24} />
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="text-lg font-serif font-semibold text-white/90 leading-tight">
                  {user?.username || t('researcher')}
                </h1>
                <p className="text-sm text-white/40">{user?.email}</p>
                <span className="mt-1 inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary/15 text-primary text-[10px] font-semibold uppercase tracking-widest rounded-full border border-primary/20 w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-soft" />
                  {t('activeSubscription')}
                </span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="shrink-0 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white/50 hover:text-white/70 text-xs font-medium tracking-wider transition-all flex items-center gap-1.5"
            >
              <LogOut size={13} />
              {t('logout')}
            </button>
          </div>

          <div className="relative mt-5 grid grid-cols-2 gap-3">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/8 flex items-center gap-3">
              {subscription.frequency === 'daily'
                ? <Calendar className="text-white/40 shrink-0" size={18} />
                : <CalendarDays className="text-white/40 shrink-0" size={18} />
              }
              <div>
                <p className="text-[10px] text-white/30 font-medium uppercase tracking-widest">{t('frequency')}</p>
                <p className="text-sm font-serif font-semibold text-white/80 capitalize">{subscription.frequency}</p>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/8 flex items-center gap-3">
              <Clock className="text-white/40 shrink-0" size={18} />
              <div>
                <p className="text-[10px] text-white/30 font-medium uppercase tracking-widest">{t('since')}</p>
                <p className="text-sm font-serif font-semibold text-white/80">{subscription.subscribedAt}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 数据统计折叠区域 */}
        <div className="bg-white/80 backdrop-blur-sm border border-border-light rounded-2xl shadow-warm-sm overflow-hidden">
          <button
            onClick={() => setShowStats(!showStats)}
            className="w-full px-5 py-4 flex items-center justify-between hover:bg-background-warm/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center">
                <BarChart3 className="text-primary" size={16} />
              </div>
              <div className="text-left">
                <h2 className="text-sm font-serif font-semibold text-text-main">{t('systemStatus')}</h2>
                <p className="text-[10px] text-text-muted">{t('systemStatusDesc')}</p>
              </div>
            </div>
            {showStats ? (
              <ChevronUp size={16} className="text-text-muted" />
            ) : (
              <ChevronDown size={16} className="text-text-muted" />
            )}
          </button>

          {showStats && (
            <div className="px-5 pb-5 flex flex-col gap-4 animate-fade-in">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <StatCard 
                  label={t('daysOfService')} 
                  value='1,248' 
                  trend='+1' 
                  icon={<Calendar size={16} />} 
                  color='text-cambridge bg-cambridge/8' 
                />
                <StatCard 
                  label={t('papersSent')} 
                  value='84.2k' 
                  trend='+12%' 
                  icon={<TrendingUp size={16} />} 
                  color='text-primary bg-primary/8' 
                />
                <StatCard 
                  label={t('crawledIndex')} 
                  value='2.4M' 
                  trend='+5.4k' 
                  icon={<BarChart3 size={16} />} 
                  color='text-emerald-600 bg-emerald-50' 
                />
                <StatCard 
                  label={t('aiSummaries')} 
                  value='12.8k' 
                  trend='+8%' 
                  icon={<Sparkles size={16} />} 
                  color='text-amber-600 bg-amber-50' 
                />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <ActivityChart
                  data={ACTIVITY_CHART}
                  title={t('weeklyIndexingPulse')}
                  subtitle={t('dailyAverage')}
                />
                <CategoryChart
                  data={CATEGORY_CHART}
                  title={t('categoryDistribution')}
                  subtitle={t('topActiveFields')}
                />
              </div>
            </div>
          )}
        </div>

        {/* 订阅领域卡片 */}
        <div className="bg-white/80 backdrop-blur-sm border border-border-light rounded-2xl shadow-warm-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-border-light flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BadgeCheck className="text-primary" size={16} />
              <h2 className="text-sm font-serif font-semibold text-text-main">{t('activeDomains')}</h2>
            </div>
            <span className="text-[10px] font-semibold text-primary bg-primary/5 border border-primary/10 rounded-full px-2.5 py-1">
              {subscription.domains.length}
            </span>
          </div>
          <div className="px-5 py-4 flex flex-wrap gap-2">
            {subscription.domains.map(id => (
              <span key={id} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cambridge/8 hover:bg-cambridge/12 text-cambridge rounded-full text-xs font-medium border border-cambridge/10 transition-colors">
                {getTopicName(id)}
              </span>
            ))}
          </div>
        </div>

        {/* 操作区 */}
        <div className="bg-white/80 backdrop-blur-sm border border-border-light rounded-2xl shadow-warm-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-border-light">
            <h2 className="text-sm font-serif font-semibold text-text-main">{t('manageSubscription')}</h2>
          </div>
          <div className="p-4 flex flex-col gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="w-full py-3.5 px-5 bg-primary/5 hover:bg-primary/10 border border-primary/10 text-primary rounded-xl font-semibold text-sm tracking-wide transition-all flex items-center justify-center gap-2"
            >
              <Pencil size={14} />
              {t('updatePreferences')}
            </button>

            {!confirmCancel ? (
              <button
                onClick={() => setConfirmCancel(true)}
                className="w-full py-3 px-5 text-red-400 hover:text-red-500 hover:bg-red-50/60 rounded-xl text-xs font-medium tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <X size={12} />
                {t('cancelSubscription')}
              </button>
            ) : (
              <div className="bg-red-50/60 border border-red-200/60 rounded-xl p-4 flex flex-col gap-3 animate-fade-in">
                <p className="text-xs font-medium text-red-600 text-center">{t('cancelSubscriptionConfirm')}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setSubscription(null); setConfirmCancel(false); }}
                    className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-xs font-semibold tracking-wider transition-all"
                  >
                    {t('confirmCancel')}
                  </button>
                  <button
                    onClick={() => setConfirmCancel(false)}
                    className="flex-1 py-2.5 bg-white border border-border-light text-text-secondary hover:bg-background-warm rounded-xl text-xs font-semibold tracking-wider transition-all"
                  >
                    {t('keepSubscription')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    );
  }

  // ─────────────────────────────────────────────
  // 状态 3：编辑模式
  // ─────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-5 animate-fade-in pb-28">

      {/* 头部 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Coffee className="text-primary" size={18} />
          </div>
          <div>
            <h1 className="text-lg font-serif font-semibold text-text-main tracking-tight">{t('editSubscription')}</h1>
            <p className="text-xs text-text-muted mt-0.5">{user?.email}</p>
          </div>
        </div>
        {subscription && (
          <button
            onClick={handleCancel}
            className="px-3 py-2 border border-border-light rounded-xl text-text-muted hover:bg-background-warm text-xs font-medium tracking-wider transition-all flex items-center gap-1.5"
          >
            <ArrowLeft size={12} />
            {t('cancel')}
          </button>
        )}
      </div>

      {/* 步骤进度胶囊 */}
      <div className="flex items-center gap-2 flex-wrap">
        {[
          { label: t('researchDomains'), done: selectedTopicIds.length > 0 },
          { label: t('deliverySchedule'), done: true },
          { label: t('academicIntegrity'), done: agreed },
        ].map((step, i) => (
          <div key={i} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-medium border transition-all ${
            step.done
              ? 'bg-emerald-50/80 border-emerald-200/60 text-emerald-700'
              : 'bg-background-warm border-border-light text-text-muted'
          }`}>
            {step.done
              ? <CheckCircle size={11} className="text-emerald-500" />
              : <div className="w-2.5 h-2.5 rounded-full border-2 border-border-subtle" />
            }
            {step.label}
          </div>
        ))}
      </div>

      {/* Step 1: Research Domains */}
      <section className="bg-white/80 backdrop-blur-sm border border-border-light rounded-2xl overflow-hidden shadow-warm-sm">
        <div className="p-5 border-b border-border-light flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-serif font-semibold text-xs">1</div>
          <div className="flex-1">
            <h2 className="text-sm font-serif font-semibold text-text-main">{t('researchDomains')}</h2>
            <p className="text-[11px] text-text-muted">{t('selectTopics')}</p>
          </div>
          {selectedTopicIds.length > 0 && (
            <span className="text-[10px] font-semibold text-primary bg-primary/5 border border-primary/10 px-2.5 py-1 rounded-full">
              {selectedTopicIds.length}
            </span>
          )}
        </div>
        <div className="p-3 flex flex-col gap-2">
          {ARXIV_CATEGORIES.map(group => (
            <div key={group.id} className="border border-border-light rounded-xl overflow-hidden hover:border-primary/15 transition-colors">
              <button
                onClick={() => { setExpandedGroups(prev => prev.includes(group.id) ? prev.filter(g => g !== group.id) : [...prev, group.id]); }}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-background-warm/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${group.color} shadow-warm-sm`}>
                    <group.icon size={15} />
                  </div>
                  <div className="text-left">
                    <span className="font-medium text-sm text-text-main block">{t(group.nameKey)}</span>
                    <span className="text-[10px] text-text-muted">{group.topics.length} {t('topicsAvailable')}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-medium px-2 py-1 rounded-lg ${group.topics.filter(tp => selectedTopicIds.includes(tp.id)).length > 0 ? 'text-primary bg-primary/5' : 'text-text-muted bg-background-warm'}`}>
                    {group.topics.filter(tp => selectedTopicIds.includes(tp.id)).length}
                  </span>
                  <ChevronDown size={14} className={`text-text-muted transition-transform duration-200 ${expandedGroups.includes(group.id) ? 'rotate-180' : ''}`} />
                </div>
              </button>
              {expandedGroups.includes(group.id) && (
                <div className="px-4 pb-4 grid grid-cols-2 sm:grid-cols-3 gap-2 animate-fade-in">
                  {group.topics.map(topic => {
                    const isSelected = selectedTopicIds.includes(topic.id);
                    return (
                      <label
                        key={topic.id}
                        className={`flex items-center gap-2.5 p-3 rounded-xl cursor-pointer transition-all border ${
                          isSelected
                            ? 'bg-primary/5 border-primary/15'
                            : 'bg-background-warm/50 border-transparent hover:bg-background-warm hover:border-border-light'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => { setSelectedTopicIds(prev => prev.includes(topic.id) ? prev.filter(t => t !== topic.id) : [...prev, topic.id]); }}
                          className="w-4 h-4 rounded border-border-subtle text-primary focus:ring-primary/20"
                        />
                        <span className={`text-xs ${isSelected ? 'text-primary font-semibold' : 'text-text-main font-medium'}`}>{getTopicName(topic.id)}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Step 2: Delivery Schedule */}
      <section className="bg-white/80 backdrop-blur-sm border border-border-light rounded-2xl overflow-hidden shadow-warm-sm">
        <div className="p-5 border-b border-border-light flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-serif font-semibold text-xs">2</div>
          <div>
            <h2 className="text-sm font-serif font-semibold text-text-main">{t('deliverySchedule')}</h2>
            <p className="text-[11px] text-text-muted">{t('chooseFrequency')}</p>
          </div>
        </div>
        <div className="p-4 grid grid-cols-2 gap-3">
          <button
            onClick={() => setFreq('daily')}
            className={`relative p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
              freq === 'daily'
                ? 'border-primary bg-primary/5 shadow-warm-sm'
                : 'border-border-light hover:border-primary/20 bg-background-warm/40'
            }`}
          >
            {freq === 'daily' && <div className="absolute top-2 right-2"><CheckCircle className="text-primary" size={13} /></div>}
            <Calendar size={22} className={freq === 'daily' ? 'text-primary' : 'text-text-muted'} />
            <span className={`text-sm font-serif font-semibold ${freq === 'daily' ? 'text-primary' : 'text-text-main'}`}>{t('daily')}</span>
            <span className="text-[10px] text-text-muted text-center">{t('everyMorning8')}</span>
          </button>
          <button
            onClick={() => setFreq('weekly')}
            className={`relative p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
              freq === 'weekly'
                ? 'border-primary bg-primary/5 shadow-warm-sm'
                : 'border-border-light hover:border-primary/20 bg-background-warm/40'
            }`}
          >
            {freq === 'weekly' && <div className="absolute top-2 right-2"><CheckCircle className="text-primary" size={13} /></div>}
            <CalendarDays size={22} className={freq === 'weekly' ? 'text-primary' : 'text-text-muted'} />
            <span className={`text-sm font-serif font-semibold ${freq === 'weekly' ? 'text-primary' : 'text-text-main'}`}>{t('weekly')}</span>
            <span className="text-[10px] text-text-muted text-center">{t('everyMondayMorning')}</span>
          </button>
        </div>
      </section>

      {/* Step 3: Academic Integrity */}
      <section className="bg-amber-50/40 border border-amber-200/30 rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-amber-200/20 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
            <Gavel size={15} />
          </div>
          <div>
            <h2 className="text-sm font-serif font-semibold text-amber-900">{t('academicIntegrity')}</h2>
            <p className="text-[11px] text-amber-700/70">{t('reviewProtocol')}</p>
          </div>
        </div>
        <div className="p-4 flex flex-col gap-3">
          <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl text-xs leading-relaxed text-amber-900/70 border border-amber-200/20 space-y-3">
            <div className="flex gap-3">
              <TriangleAlert className="text-amber-500 shrink-0 mt-0.5" size={13} />
              <p><strong className="text-amber-800">{t('warningMisconduct')}</strong> {t('warningMisconductText')}</p>
            </div>
            <div className="flex gap-3">
              <Info className="text-amber-500 shrink-0 mt-0.5" size={13} />
              <p><strong className="text-amber-800">{t('disclaimer')}</strong> {t('disclaimerText')}</p>
            </div>
          </div>
          <label className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all border-2 ${
            agreed ? 'bg-emerald-50/60 border-emerald-300/60' : 'bg-white/40 border-amber-200/30 hover:border-amber-300/50'
          }`}>
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-5 h-5 rounded border-amber-300 text-emerald-600 focus:ring-emerald-500/20 transition-all"
            />
            <span className={`text-sm font-medium transition-colors ${agreed ? 'text-emerald-700' : 'text-amber-800'}`}>
              {t('agreeProtocol')}
            </span>
            {agreed && <BadgeCheck className="text-emerald-500 ml-auto" size={18} />}
          </label>
        </div>
      </section>

      <div className="max-w-2xl mx-auto flex items-center gap-3">
        {subscription && (
          <button
            onClick={handleCancel}
            className="shrink-0 px-4 py-2.5 border border-border-light text-text-muted hover:bg-background-warm rounded-xl text-xs font-medium tracking-wider transition-all"
          >
            {t('cancel')}
          </button>
        )}
        <button
          onClick={handleSave}
          disabled={!agreed || selectedTopicIds.length === 0}
          className="shrink-0 flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-semibold text-xs tracking-wide shadow-warm-lg shadow-primary/20 hover:shadow-warm-xl hover:shadow-primary/25 disabled:opacity-30 disabled:shadow-none disabled:cursor-not-allowed transition-all hover:scale-[1.01] active:scale-[0.99]"
        >
          <Coffee size={14} />
          {t('saveSubscription')}
        </button>
      </div>
    </div>

  );
};

export default Account;
