/**
 * MobileHeader — 移动端顶部标题栏组件
 * 仅在小屏幕（lg 以下）显示
 * 左侧：应用 Logo + 名称
 * 右侧：语言切换按钮（与桌面端 Sidebar 保持一致）
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Coffee, Languages } from 'lucide-react';

const MobileHeader: React.FC = () => {
  const { t, i18n } = useTranslation();

  const toggleLang = () => i18n.changeLanguage(i18n.language.startsWith('en') ? 'zh' : 'en');

  return (
    <div className="lg:hidden flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-white/90 backdrop-blur-xl flex-shrink-0 z-40">
      <h1 className="text-lg font-bold tracking-tight text-text-main flex items-center gap-2">
        <Coffee className="text-primary" size={24} />
        {t('appName')}
      </h1>
      <button
        onClick={toggleLang}
        className="flex items-center gap-1 text-xs font-bold text-text-secondary hover:text-primary transition-colors px-2.5 py-1.5 rounded-lg hover:bg-primary/5"
        title="Switch Language"
      >
        <Languages size={16} />
        {t('switchLang')}
      </button>
    </div>
  );
};

export default MobileHeader;
