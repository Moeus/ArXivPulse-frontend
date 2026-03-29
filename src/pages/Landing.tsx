/**
 * Landing — 首页落地页
 * 全新设计：書卷氣與咖啡香
 * 包含 Hero、特性介绍、Daily Brew 横向滑动卡片预览、底部 CTA
 */

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Coffee, Languages, BookOpen, Clock, Sparkles, ArrowRight, Brain, Atom, Calculator, Dna, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/** 咖啡蒸汽 SVG 装饰 */
const SteamLines = () => (
  <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-2 pointer-events-none">
    {[0, 1, 2].map(i => (
      <div
        key={i}
        className="w-[2px] rounded-full bg-primary/20"
        style={{
          height: `${16 + i * 6}px`,
          animation: `steam 3s ease-in-out ${i * 0.5}s infinite`,
        }}
      />
    ))}
  </div>
);

/** Daily Brew 预览卡片 */
const BrewCard = ({ title, category, readTime, delay }: { title: string; category: string; readTime: string; delay: number }) => (
  <div
    className="min-w-[280px] md:min-w-[320px] p-6 rounded-2xl border border-border-light bg-white/80 backdrop-blur-sm shadow-warm-sm hover:shadow-warm hover:border-primary/30 transition-all duration-300 cursor-default group flex-shrink-0"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex items-center gap-2 mb-3">
      <span className="px-2.5 py-1 rounded-full bg-cambridge/10 text-cambridge text-[10px] font-semibold tracking-wider uppercase">
        {category}
      </span>
      <span className="flex items-center gap-1 text-[10px] text-text-muted font-medium">
        <Clock size={10} />
        {readTime}
      </span>
    </div>
    <h4 className="font-serif text-sm font-semibold text-text-main leading-snug group-hover:text-primary transition-colors line-clamp-2">
      {title}
    </h4>
    <div className="mt-3 flex items-center gap-1.5 text-primary text-[11px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
      <Sparkles size={12} />
      AI 解读已就绪
    </div>
  </div>
);

/** 特性卡片 */
const FeatureCard = ({ icon: Icon, title, description, delay }: { icon: any; title: string; description: string; delay: number }) => (
  <div
    className="flex flex-col items-center text-center p-8 rounded-2xl border border-border-light bg-white/60 backdrop-blur-sm shadow-warm-sm hover:shadow-warm hover:border-primary/20 transition-all duration-500 group"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="w-14 h-14 rounded-2xl bg-primary/8 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
      <Icon className="text-primary" size={24} />
    </div>
    <h3 className="font-serif text-base font-semibold text-text-main mb-2">{title}</h3>
    <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
  </div>
);

/** 学科领域装饰药丸 */
const DomainPill = ({ icon: Icon, label, color }: { icon: any; label: string; color: string }) => (
  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border-light bg-white/70 backdrop-blur-sm shadow-warm-sm text-xs font-medium text-text-secondary hover:border-primary/30 hover:text-primary transition-all cursor-default`}>
    <Icon size={14} className={color} />
    {label}
  </div>
);

const Landing: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const toggleLang = () => i18n.changeLanguage(i18n.language.startsWith('en') ? 'zh' : 'en');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const brewCards = [
    { title: 'Attention Is All You Need: Revisiting Transformer Architecture', category: 'cs.AI', readTime: '3 min' },
    { title: 'Quantum Error Correction with Surface Codes', category: 'Physics', readTime: '5 min' },
    { title: 'Neural Connectome Mapping via High-Resolution Diffusion Imaging', category: 'q-bio', readTime: '4 min' },
    { title: 'Geometric Structures on Hyperbolic 3-Manifolds', category: 'Math', readTime: '6 min' },
    { title: 'Large Language Models for Scientific Discovery', category: 'cs.CL', readTime: '4 min' },
  ];

  return (
    <div className="min-h-screen bg-transparent overflow-x-hidden">
      {/* ─── Sticky Navigation ─── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-paper/90 backdrop-blur-xl border-b border-border-light shadow-warm-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <Coffee className="text-primary" size={26} />
              <SteamLines />
            </div>
            <span className="text-lg italic font-serif font-semibold text-text-main tracking-tight">{t('appName')}</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={toggleLang} className="flex items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-primary/5">
              <Languages size={15} />
              {t('switchLang')}
            </button>
            <button
              onClick={() => navigate('/auth')}
              className="text-sm font-semibold text-text-main hover:text-primary transition-colors px-4 py-2 rounded-xl hover:bg-primary/5"
            >
              {t('signIn')}
            </button>
          </div>
        </div>
      </nav>

      {/* ─── Hero Section ─── */}
      <section className="relative max-w-6xl mx-auto px-6 pt-32 pb-20 flex flex-col items-center text-center">
        {/* Decorative warm glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none animate-pulse-soft" />
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-cambridge/3 rounded-full blur-[80px] -z-10 pointer-events-none" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border-light bg-white/60 backdrop-blur-sm text-primary text-[11px] font-semibold uppercase tracking-widest mb-8 animate-fade-in shadow-warm-sm">
          <Coffee size={13} />
          {t('landingBadge')}
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-semibold text-text-main leading-[1.15] tracking-tight mb-8 max-w-4xl animate-slide-up">
          {t('landingTitle')}
          <span className="text-primary italic"> {t('landingTitleHighlight')}</span>
        </h1>

        {/* Description */}
        <p className="text-base md:text-lg text-text-secondary max-w-2xl leading-relaxed mb-12 font-sans animate-fade-in" style={{ animationDelay: '200ms' }}>
          {t('landingDescription')}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in" style={{ animationDelay: '400ms' }}>
          <button
            onClick={() => navigate('/auth')}
            className="group bg-primary text-white px-8 py-4 rounded-2xl font-semibold text-base shadow-warm-lg shadow-primary/20 hover:shadow-warm-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center gap-3"
          >
            <Coffee size={18} />
            {t('landingCta')}
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => navigate('/auth')}
            className="text-text-secondary hover:text-primary px-6 py-4 rounded-2xl font-medium text-sm border border-border-light hover:border-primary/30 hover:bg-primary/3 transition-all duration-300"
          >
            {t('signIn')}
          </button>
        </div>

        {/* Domain Pills floating decoration */}
        <div className="flex flex-wrap justify-center gap-3 mt-16 animate-fade-in" style={{ animationDelay: '600ms' }}>
          <DomainPill icon={Brain} label="AI / CS" color="text-purple-500" />
          <DomainPill icon={Atom} label="Physics" color="text-blue-500" />
          <DomainPill icon={Calculator} label="Mathematics" color="text-orange-500" />
          <DomainPill icon={Dna} label="Biology" color="text-green-500" />
        </div>
      </section>

      {/* ─── Daily Brew Preview (Horizontal Scrolling Cards) ─── */}
      <section className="py-16 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Coffee className="text-primary" size={16} />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-text-main">{t('discoveryFeed')}</h2>
          </div>
          <p className="text-sm text-text-secondary ml-11">{t('landingBrewDesc')}</p>
        </div>
        <div className="flex gap-5 pl-6 md:pl-[calc(50%-570px)] overflow-x-auto pb-4 scrollbar-hide custom-scrollbar">
          {brewCards.map((card, i) => (
            <BrewCard
              key={i}
              title={card.title}
              category={card.category}
              readTime={card.readTime}
              delay={i * 100}
            />
          ))}
        </div>
      </section>

      {/* ─── Features Section ─── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-text-main mb-4">{t('landingFeaturesTitle')}</h2>
          <p className="text-sm text-text-secondary max-w-lg mx-auto">{t('landingFeaturesDesc')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon={BookOpen}
            title={t('featureBrewTitle')}
            description={t('featureBrewDesc')}
            delay={0}
          />
          <FeatureCard
            icon={Sparkles}
            title={t('featureAiTitle')}
            description={t('featureAiDesc')}
            delay={100}
          />
          <FeatureCard
            icon={Send}
            title={t('featureDeliveryTitle')}
            description={t('featureDeliveryDesc')}
            delay={200}
          />
        </div>
      </section>

      {/* ─── Bottom CTA ─── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="relative overflow-hidden rounded-3xl bg-background-dark p-10 md:p-16 text-center shadow-warm-xl">
          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-cambridge/8 blur-2xl pointer-events-none" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white/60 text-[10px] font-semibold uppercase tracking-widest mb-6 border border-white/10">
              <Coffee size={12} />
              {t('landingBottomBadge')}
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-white/95 mb-4 max-w-2xl mx-auto leading-tight">
              {t('landingBottomTitle')}
            </h2>
            <p className="text-white/60 text-sm max-w-lg mx-auto mb-8 leading-relaxed">
              {t('landingBottomDesc')}
            </p>
            <button
              onClick={() => navigate('/auth')}
              className="group bg-primary text-white px-8 py-4 rounded-2xl font-semibold text-base shadow-lg shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center gap-3 mx-auto"
            >
              {t('landingCta')}
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="max-w-6xl mx-auto px-6 py-10 border-t border-border-light">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-text-secondary text-sm">
            <Coffee size={16} className="text-primary" />
            <span className="font-serif italic font-medium text-text-main">{t('appName')}</span>
            <span className="text-text-muted">·</span>
            <span className="text-text-muted text-xs">{t('landingFooterSlogan')}</span>
          </div>
          <p className="text-xs text-text-muted">
            © 2025 Daily Cup Paper. {t('landingFooterRights')}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
