/**
 * MobileNav — 移动端底部导航栏
 * 設計：書卷氣 — 温暖的纸白背景、温暖的活跃指示
 */

import React from 'react';
import { ViewMode } from '../types';
import { useAppStore } from '../store/appStore';
import { useTranslation } from 'react-i18next';
import { LayoutGrid, Compass, Bookmark, User } from 'lucide-react';

const MobileNav: React.FC = () => {
  const { currentView, setView, setSearchQuery, setActiveFilter } = useAppStore();
  const { t } = useTranslation();

  /** 导航项配置 */
  const navItems = [
    { id: ViewMode.Home, icon: LayoutGrid, label: t('navHome') },
    { id: ViewMode.Explore, icon: Compass, label: t('navExplore') },
    { id: ViewMode.Library, icon: Bookmark, label: t('navSaved') },
    { id: ViewMode.Account, icon: User, label: t('navProfile') },
  ];

  /** 导航切换 */
  const handleNav = (view: ViewMode) => {
    setView(view);
    setSearchQuery('');
    setActiveFilter('All');
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-paper/90 backdrop-blur-xl border-t border-border-light h-16 flex items-center justify-around px-6 z-50">
      {navItems.map(item => {
        const Icon = item.icon;
        const isActive = currentView === item.id;
        return (
          <button
            key={item.id}
            onClick={() => handleNav(item.id)}
            className={`flex flex-col items-center gap-1 transition-all duration-200 ${
              isActive ? 'text-primary' : 'text-text-muted'
            }`}
          >
            <div className={`p-1 rounded-lg transition-all duration-200 ${isActive ? 'bg-primary/8' : ''}`}>
              <Icon size={20} />
            </div>
            <span className="text-[9px] font-semibold uppercase tracking-wide">{item.label}</span>
          </button>
        )
      })}
    </nav>
  );
};

export default MobileNav;
