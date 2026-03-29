/**
 * MobileHeader — 移动端顶部标题栏
 * 設計：書卷氣 — 温暖的纸白背景、衬线体 Logo
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Coffee, Languages } from 'lucide-react';

const MobileHeader: React.FC = () => {
  const { t, i18n } = useTranslation();

  const toggleLang = () => i18n.changeLanguage(i18n.language.startsWith('en') ? 'zh' : 'en');

  return (
    <div className="lg:hidden flex items-center justify-between px-5 py-3.5 border-b border-border-light bg-paper/90 backdrop-blur-xl flex-shrink-0 z-40">
      <h1 className="text-base font-serif font-semibold tracking-tight text-text-main flex items-center gap-2">
        <Coffee className="text-primary  italic" size={20} />
        {t('appName')}
      </h1>
      <button
        onClick={toggleLang}
        className="flex items-center gap-1 text-[10px] font-medium text-text-muted hover:text-primary transition-colors px-2.5 py-1.5 rounded-lg hover:bg-primary/5"
        title="Switch Language"
      >
        <Languages size={14} />
        {t('switchLang')}
      </button>
    </div>
  );
};

export default MobileHeader;
