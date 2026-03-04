/**
 * Sidebar — 桌面端侧边栏导航组件
 * 仅在大屏幕（lg 及以上）显示
 * 包含：应用 Logo、主导航菜单、热门话题快捷入口、用户头像
 * 切换导航时自动重置搜索和筛选状态
 */

import React from 'react';
import { ViewMode } from '../types';
import { TRENDING_TOPICS } from '../constants';
import { useStore } from '../store/useStore';
import { useTranslation } from 'react-i18next';
import { House, Compass, Library, CircleUser, FlaskConical, Languages } from 'lucide-react';
import { UserButton, useUser } from '@clerk/react';

const Sidebar: React.FC = () => {
  const { currentView, setView, setSearchQuery, setActiveFilter } = useStore();
  const { user: clerkUser } = useUser();
  const { t, i18n } = useTranslation();

  const toggleLang = () => i18n.changeLanguage(i18n.language.startsWith('en') ? 'zh' : 'en');

  const navItems = [
    { id: ViewMode.Home, label: t('navHome'), icon: House },
    { id: ViewMode.Explore, label: t('navExplore'), icon: Compass },
    { id: ViewMode.Library, label: t('navLibrary'), icon: Library },
    { id: ViewMode.Account, label: t('navAccount'), icon: CircleUser },
  ];

  const handleNavClick = (view: ViewMode) => {
    setView(view);
    if (view !== ViewMode.PaperDetail) {
      setSearchQuery('');
      setActiveFilter('All');
    }
  };

  return (
    <aside className="w-64 hidden lg:flex flex-shrink-0 border-r border-gray-100 flex-col justify-between p-4 h-full bg-white sticky top-0">
      <div className="flex flex-col gap-8">
        <div className="px-2 pt-2 flex items-center justify-between">
          <div className="cursor-pointer" onClick={() => handleNavClick(ViewMode.Home)}>
            <h1 className="text-xl font-bold tracking-tight text-text-main flex items-center gap-2">
              <FlaskConical className="text-primary" size={28} />
              {t('appName')}
            </h1>
          </div>
          <button onClick={toggleLang} className="flex items-center gap-1 text-xs font-bold text-text-secondary hover:text-primary transition-colors px-2 py-1 rounded-lg hover:bg-primary/5" title="Switch Language">
            <Languages size={16} />
            {t('switchLang')}
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${
                  isActive 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-text-secondary hover:bg-background-subtle hover:text-primary'
                }`}
              >
                <Icon size={24} className={isActive ? 'fill-current' : ''} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="flex flex-col gap-3 px-2">
          <p className="text-xs font-semibold uppercase text-text-secondary tracking-wider">{t('trending')}</p>
          <div className="flex flex-col gap-2">
            {TRENDING_TOPICS.map((topic) => (
              <button
                key={topic.name}
                onClick={() => { setView(ViewMode.Explore); setActiveFilter(topic.name); }}
                className="group flex items-center justify-between text-sm text-text-main hover:text-primary transition-colors text-left"
              >
                <span>{topic.name}</span>
                <span className="text-xs text-text-secondary group-hover:text-primary/70">{topic.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-4 px-2">
        <div onClick={() => handleNavClick(ViewMode.Account)} className="flex items-center gap-3 cursor-pointer hover:opacity-80">
          <UserButton appearance={{ elements: { userButtonAvatarBox: "w-8 h-8" } }} />
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-medium text-text-main truncate">{(clerkUser.firstName+" "+clerkUser.lastName) || clerkUser?.primaryEmailAddress?.emailAddress || t('user')}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
