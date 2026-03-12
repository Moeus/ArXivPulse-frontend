/**
 * Account — 账户与订阅管理页面
 * 三种状态：
 *   1. 无订阅 → 显示引导用户配置的空状态
 *   2. 已订阅 + 非编辑 → 展示当前订阅摘要信息
 *   3. 编辑模式 → 分步配置：研究领域选择、推送频率、学术诚信确认
 */

import React, { useState } from 'react';
import { Frequency } from '../types';
import { useAppStore } from '../store/appStore';
import { useUserStore } from '../store/userStore';
import { useTranslation } from 'react-i18next';
import { Mail, LogOut, Clock, CheckCircle, X, ChevronDown, Calendar, CalendarDays, Gavel, TriangleAlert, Info, BadgeCheck, Rocket, Loader, Pencil, ArrowLeft, Sparkles, User } from 'lucide-react';
import { ARXIV_CATEGORIES } from '../constants/ArxivCategory';

const Account: React.FC = () => {
  const { resetUI } = useAppStore();
  const { subscription, setSubscription, user, logout } = useUserStore();
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);

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
        <button onClick={handleLogout} className="mt-8 text-sm font-bold text-red-500 hover:text-red-600 flex items-center gap-2">
           <LogOut size={16} />
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
      <div className="flex flex-col gap-6 animate-fade-in pb-20">

        {/* Hero 卡片：用户身份 + 订阅状态 */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary to-primary-light rounded-3xl p-6 shadow-xl shadow-primary/20">
          {/* 背景装饰圆 */}
          <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/5" />
          <div className="absolute -bottom-10 -right-2 w-28 h-28 rounded-full bg-white/5" />

          <div className="relative flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20 shadow-lg">
                <User className="text-white" size={26} />
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="text-xl font-black text-white leading-tight">
                  {user?.username || t('researcher')}
                </h1>
                <p className="text-sm text-white/70">{user?.email}</p>
                <span className="mt-1 inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/15 text-white text-[10px] font-black uppercase tracking-widest rounded-full border border-white/20 w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  {t('activeSubscription')}
                </span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="shrink-0 px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white/80 hover:text-white text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-1.5"
            >
              <LogOut size={14} />
              {t('logout')}
            </button>
          </div>

          {/* 统计小条 */}
          <div className="relative mt-5 grid grid-cols-2 gap-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/15 flex items-center gap-3">
              {subscription.frequency === 'daily'
                ? <Calendar className="text-white/80 shrink-0" size={20} />
                : <CalendarDays className="text-white/80 shrink-0" size={20} />
              }
              <div>
                <p className="text-[10px] text-white/60 font-bold uppercase tracking-widest">{t('frequency')}</p>
                <p className="text-sm font-black text-white capitalize">{subscription.frequency}</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/15 flex items-center gap-3">
              <Clock className="text-white/80 shrink-0" size={20} />
              <div>
                <p className="text-[10px] text-white/60 font-bold uppercase tracking-widest">{t('since')}</p>
                <p className="text-sm font-black text-white">{subscription.subscribedAt}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 订阅领域卡片 */}
        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BadgeCheck className="text-primary" size={18} />
              <h2 className="text-sm font-black text-text-main">{t('activeDomains')}</h2>
            </div>
            <span className="text-[10px] font-black text-primary bg-primary/5 border border-primary/10 rounded-full px-2.5 py-1">
              {subscription.domains.length}
            </span>
          </div>
          <div className="px-6 py-5 flex flex-wrap gap-2">
            {subscription.domains.map(id => (
              <span key={id} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/5 hover:bg-primary/10 text-primary rounded-xl text-xs font-bold border border-primary/10 transition-colors">
                {getTopicName(id)}
              </span>
            ))}
          </div>
        </div>

        {/* 操作区 */}
        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-sm font-black text-text-main">{t('manageSubscription')}</h2>
          </div>
          <div className="p-4 flex flex-col gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="w-full py-3.5 px-5 bg-primary/5 hover:bg-primary/10 border border-primary/15 text-primary rounded-2xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2"
            >
              <Pencil size={15} />
              {t('updatePreferences')}
            </button>

            {!confirmCancel ? (
              <button
                onClick={() => setConfirmCancel(true)}
                className="w-full py-3 px-5 text-red-400 hover:text-red-500 hover:bg-red-50/80 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2"
              >
                <X size={13} />
                {t('cancelSubscription')}
              </button>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex flex-col gap-3 animate-fade-in">
                <p className="text-xs font-bold text-red-700 text-center">{t('cancelSubscriptionConfirm')}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setSubscription(null); setConfirmCancel(false); }}
                    className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                  >
                    {t('confirmCancel')}
                  </button>
                  <button
                    onClick={() => setConfirmCancel(false)}
                    className="flex-1 py-2.5 bg-white border border-gray-200 text-text-secondary hover:bg-gray-50 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
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
    <div className="flex flex-col gap-6 animate-fade-in pb-28">

      {/* 头部：标题 + 返回按钮 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-lg shadow-primary/25">
            <Sparkles className="text-white" size={18} />
          </div>
          <div>
            <h1 className="text-xl font-black text-text-main tracking-tight">{t('editSubscription')}</h1>
            <p className="text-xs text-text-secondary mt-0.5">{user?.email}</p>
          </div>
        </div>
        {subscription && (
          <button
            onClick={handleCancel}
            className="px-3 py-2 border border-gray-200 rounded-xl text-text-secondary hover:bg-gray-50 text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-1.5"
          >
            <ArrowLeft size={13} />
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
          <div key={i} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold border transition-all ${
            step.done
              ? 'bg-green-50 border-green-200 text-green-700'
              : 'bg-gray-50 border-gray-200 text-text-secondary'
          }`}>
            {step.done
              ? <CheckCircle size={11} className="text-green-500" />
              : <div className="w-2.5 h-2.5 rounded-full border-2 border-gray-300" />
            }
            {step.label}
          </div>
        ))}
      </div>

      {/* Step 1: Research Domains */}
      <section className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
        <div className="p-5 border-b border-gray-100 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white font-black text-xs shadow-md shadow-primary/20">1</div>
          <div>
            <h2 className="text-base font-black text-text-main">{t('researchDomains')}</h2>
            <p className="text-[11px] text-text-secondary">{t('selectTopics')}</p>
          </div>
          {selectedTopicIds.length > 0 && (
            <span className="ml-auto text-[10px] font-black text-primary bg-primary/5 border border-primary/15 px-2.5 py-1 rounded-full">
              {selectedTopicIds.length} {t('selected')}
            </span>
          )}
        </div>
        <div className="p-3 flex flex-col gap-2">
          {ARXIV_CATEGORIES.map(group => (
            <div key={group.id} className="border border-gray-100 rounded-2xl overflow-hidden hover:border-gray-200 transition-colors">
              <button
                onClick={() => { setExpandedGroups(prev => prev.includes(group.id) ? prev.filter(g => g !== group.id) : [...prev, group.id]); }}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50/60 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${group.color} shadow-sm`}>
                    <group.icon size={18} />
                  </div>
                  <div className="text-left">
                    <span className="font-bold text-sm text-text-main block">{t(group.nameKey)}</span>
                    <span className="text-[10px] text-text-secondary">{group.topics.length} {t('topicsAvailable')}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${group.topics.filter(tp => selectedTopicIds.includes(tp.id)).length > 0 ? 'text-primary bg-primary/5' : 'text-text-secondary bg-gray-50'}`}>
                    {group.topics.filter(tp => selectedTopicIds.includes(tp.id)).length} {t('selected')}
                  </span>
                  <ChevronDown size={18} className={`text-text-secondary transition-transform duration-200 ${expandedGroups.includes(group.id) ? 'rotate-180' : ''}`} />
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
                            ? 'bg-primary/5 border-primary/20'
                            : 'bg-gray-50/60 border-transparent hover:bg-gray-100/60 hover:border-gray-200'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => { setSelectedTopicIds(prev => prev.includes(topic.id) ? prev.filter(t => t !== topic.id) : [...prev, topic.id]); }}
                          className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/20"
                        />
                        <span className={`text-xs ${isSelected ? 'text-primary font-bold' : 'text-text-main font-medium'}`}>{getTopicName(topic.id)}</span>
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
      <section className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
        <div className="p-5 border-b border-gray-100 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white font-black text-xs shadow-md shadow-primary/20">2</div>
          <div>
            <h2 className="text-base font-black text-text-main">{t('deliverySchedule')}</h2>
            <p className="text-[11px] text-text-secondary">{t('chooseFrequency')}</p>
          </div>
        </div>
        <div className="p-4 grid grid-cols-2 gap-3">
          <button
            onClick={() => setFreq('daily')}
            className={`relative p-5 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
              freq === 'daily'
                ? 'border-primary bg-primary/5 shadow-md shadow-primary/10'
                : 'border-gray-100 hover:border-gray-200 bg-gray-50/40'
            }`}
          >
            {freq === 'daily' && <div className="absolute top-2.5 right-2.5"><CheckCircle className="text-primary" size={15} /></div>}
            <Calendar size={26} className={freq === 'daily' ? 'text-primary' : 'text-text-secondary'} />
            <span className={`text-sm font-black ${freq === 'daily' ? 'text-primary' : 'text-text-main'}`}>{t('daily')}</span>
            <span className="text-[10px] text-text-secondary text-center">{t('everyMorning8')}</span>
          </button>
          <button
            onClick={() => setFreq('weekly')}
            className={`relative p-5 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
              freq === 'weekly'
                ? 'border-primary bg-primary/5 shadow-md shadow-primary/10'
                : 'border-gray-100 hover:border-gray-200 bg-gray-50/40'
            }`}
          >
            {freq === 'weekly' && <div className="absolute top-2.5 right-2.5"><CheckCircle className="text-primary" size={15} /></div>}
            <CalendarDays size={26} className={freq === 'weekly' ? 'text-primary' : 'text-text-secondary'} />
            <span className={`text-sm font-black ${freq === 'weekly' ? 'text-primary' : 'text-text-main'}`}>{t('weekly')}</span>
            <span className="text-[10px] text-text-secondary text-center">{t('everyMondayMorning')}</span>
          </button>
        </div>
      </section>

      {/* Step 3: Academic Integrity */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-50/30 border border-amber-200/50 rounded-3xl overflow-hidden">
        <div className="p-5 border-b border-amber-200/30 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-md shadow-amber-500/20">
            <Gavel size={18} />
          </div>
          <div>
            <h2 className="text-base font-black text-amber-900">{t('academicIntegrity')}</h2>
            <p className="text-[11px] text-amber-700">{t('reviewProtocol')}</p>
          </div>
        </div>
        <div className="p-4 flex flex-col gap-3">
          <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl text-xs leading-relaxed text-amber-900/80 border border-amber-200/30 space-y-3">
            <div className="flex gap-3">
              <TriangleAlert className="text-amber-600 shrink-0 mt-0.5" size={16} />
              <p><strong className="text-amber-800">{t('warningMisconduct')}</strong> {t('warningMisconductText')}</p>
            </div>
            <div className="flex gap-3">
              <Info className="text-amber-600 shrink-0 mt-0.5" size={16} />
              <p><strong className="text-amber-800">{t('disclaimer')}</strong> {t('disclaimerText')}</p>
            </div>
          </div>
          <label className={`flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition-all border-2 ${
            agreed ? 'bg-green-50 border-green-300' : 'bg-white/50 border-amber-200/50 hover:border-amber-300'
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
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          {subscription && (
            <button
              onClick={handleCancel}
              className="shrink-0 px-4 py-2.5 border border-gray-200 text-text-secondary hover:bg-gray-50 rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
            >
              {t('cancel')}
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={!agreed || selectedTopicIds.length === 0}
            className="shrink-0 flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-primary-light text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 disabled:opacity-30 disabled:shadow-none disabled:cursor-not-allowed transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Rocket size={14} />
            {t('saveSubscription')}
          </button>
        </div>
      </div>

  );
};

export default Account;
