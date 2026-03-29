/**
 * Sidebar — 桌面端侧边栏导航
 * 設計：書卷氣 — 纸白背景 + 温暖的边框 + 精致的导航项
 */

import React from 'react';
import { ViewMode } from '../types';
import { useAppStore } from '../store/appStore';
import { useUserStore } from '../store/userStore';
import { useTranslation } from 'react-i18next';
import { Compass, Library, CircleUser, Coffee, Languages, LogOut } from 'lucide-react';

const Sidebar: React.FC = () => {
  const { currentView, setView, setSearchQuery, setActiveFilter, resetUI } = useAppStore();
  const { user, logout } = useUserStore();
  const { t, i18n } = useTranslation();

  const toggleLang = () => i18n.changeLanguage(i18n.language.startsWith('en') ? 'zh' : 'en');

  const navItems = [
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

  const handleLogout = () => {
    resetUI();
    logout();
  };

  /** 获取用户名首字母作为头像 */
  const getInitial = () => {
    if (user?.username) return user.username.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return 'U';
  };

  return (
    <aside className="w-60 hidden lg:flex flex-shrink-0 border-r border-border-light flex-col justify-between p-5 h-full bg-white/70 backdrop-blur-sm sticky top-0">
      <div className="flex flex-col gap-8">
        <div className="px-1 pt-1 flex items-center justify-between">
          <div className="cursor-pointer flex items-center gap-2.5" onClick={() => handleNavClick(ViewMode.Explore)}>
            <Coffee className="text-primary" size={22} />
            <h1 className="text-base italic font-serif font-semibold tracking-tight text-text-main">
              {t('appName')}
            </h1>
          </div>
          <button onClick={toggleLang} className="flex items-center gap-1 text-[10px] font-medium text-text-muted hover:text-primary transition-colors px-2 py-1 rounded-lg hover:bg-primary/5" title="Switch Language">
            <Languages size={13} />
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
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-primary/8 text-primary border border-primary/10' 
                    : 'text-text-secondary hover:bg-background-warm hover:text-primary border border-transparent'
                }`}
              >
                <Icon size={20} className={isActive ? '' : 'opacity-60 group-hover:opacity-100'} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

      </div>

      <div className="border-t border-border-light pt-4 px-1">
        <div className="flex items-center justify-between">
          <div onClick={() => handleNavClick(ViewMode.Account)} className="flex items-center gap-3 cursor-pointer hover:opacity-80 flex-1 min-w-0 transition-opacity">
            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary text-sm font-serif font-semibold shrink-0">
              {getInitial()}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-medium text-text-main truncate">{user?.username || t('user')}</span>
              <span className="text-[10px] text-text-muted truncate">{user?.email}</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="shrink-0 p-1.5 text-text-muted hover:text-red-500 hover:bg-red-50/80 rounded-lg transition-all"
            title={t('logout')}
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
