/**
 * MobileNav — 移动端底部导航栏组件
 * 仅在小屏幕（lg 以下）显示，切换 Home / Explore / Library / Account 视图
 * 切换时同步清空搜索和筛选状态
 */

import React from 'react';
import { ViewMode } from '../types';
import { useStore } from '../store/useStore';
import { useTranslation } from 'react-i18next';
import { LayoutGrid, Compass, Bookmark, User } from 'lucide-react';

const MobileNav: React.FC = () => {
  const { currentView, setView, setSearchQuery, setActiveFilter } = useStore();
  const { t } = useTranslation();

  /** 导航项配置 */
  const navItems = [
    { id: ViewMode.Home, icon: LayoutGrid, label: t('navHome') },
    { id: ViewMode.Explore, icon: Compass, label: t('navExplore') },
    { id: ViewMode.Library, icon: Bookmark, label: t('navSaved') },
    { id: ViewMode.Account, icon: User, label: t('navProfile') },
  ];

  /** 导航切换：跳转视图并重置搜索/筛选 */
  const handleNav = (view: ViewMode) => {
    setView(view);
    setSearchQuery('');
    setActiveFilter('All');
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-100 h-16 flex items-center justify-around px-6 z-50">
      {navItems.map(item => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => handleNav(item.id)}
            className={`flex flex-col items-center gap-1 transition-all ${
              currentView === item.id ? 'text-primary scale-110' : 'text-text-secondary opacity-60'
            }`}
          >
            <Icon
              size={24}
              className={currentView === item.id ? 'fill-current' : ''}
            />
            <span className="text-[10px] font-black uppercase tracking-tighter">{item.label}</span>
          </button>
        )
      })}
    </nav>
  );
};

export default MobileNav;
