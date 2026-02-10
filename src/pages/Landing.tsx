/**
 * Landing — 首页落地页
 * 未登录用户看到的首屏页面，包含应用名称、介绍文案和 CTA 按钮
 * 点击 "Sign In" 或 CTA 按钮跳转到 Auth 页面
 */

import React from 'react';
import { useStore } from '../store/useStore';
import { ViewMode } from '../types';
import { useT } from '../i18n';
import { FlaskConical, Languages } from 'lucide-react';


const Landing: React.FC = () => {
  const { setView, locale, setLocale } = useStore();
  const { t } = useT();

  const toggleLang = () => setLocale(locale === 'en' ? 'zh' : 'en');

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <nav className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FlaskConical className="text-primary" size={32} />
          <span className="text-2xl font-black text-text-main tracking-tighter">{t('appName')}</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={toggleLang} className="flex items-center gap-1.5 text-sm font-bold text-text-secondary hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-primary/5">
            <Languages size={18} />
            {t('switchLang')}
          </button>
          <button onClick={() => setView(ViewMode.Auth)} className="text-sm font-bold text-text-main hover:text-primary transition-colors">{t('signIn')}</button>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary text-xs font-black uppercase tracking-widest mb-8 animate-fade-in">{t('landingBadge')}</div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-text-main leading-[1.1] tracking-tight mb-8 max-w-5xl">{t('landingTitle')}<span className="text-primary italic">{t('landingTitleHighlight')}</span></h1>
        <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed mb-12 font-medium">{t('landingDescription')}</p>
        <button onClick={() => setView(ViewMode.Auth)} className="bg-primary text-white px-10 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-primary/30 hover:scale-105 transition-all">{t('landingCta')}</button>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      </section>
    </div>
  );
};

export default Landing;
