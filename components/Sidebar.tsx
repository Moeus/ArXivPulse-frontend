
import React from 'react';
import { ViewMode, TrendingTopic } from '../types';
import { TRENDING_TOPICS } from '../constants';

interface SidebarProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const navItems = [
    { id: ViewMode.Home, label: 'Home', icon: 'home' },
    { id: ViewMode.Explore, label: 'Explore', icon: 'explore' },
    { id: ViewMode.Library, label: 'Library', icon: 'library_books' },
    { id: ViewMode.Account, label: 'Account', icon: 'account_circle' },
  ];

  return (
    <aside className="w-64 hidden lg:flex flex-shrink-0 border-r border-gray-100 flex-col justify-between p-4 h-full bg-white sticky top-0">
      <div className="flex flex-col gap-8">
        {/* Logo */}
        <div className="px-2 pt-2">
          <h1 className="text-xl font-bold tracking-tight text-text-main flex items-center gap-2">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: '28px' }}>science</span>
            ArXivPulse
          </h1>
        </div>

        {/* Main Nav */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${
                  isActive 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-text-secondary hover:bg-background-subtle hover:text-primary'
                }`}
              >
                <span className={`material-symbols-outlined ${isActive ? 'fill' : ''}`}>
                  {item.icon}
                </span>
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Trending Topics */}
        <div className="flex flex-col gap-3 px-2">
          <p className="text-xs font-semibold uppercase text-text-secondary tracking-wider">Trending Topics</p>
          <div className="flex flex-col gap-2">
            {TRENDING_TOPICS.map((topic) => (
              <button
                key={topic.name}
                className="group flex items-center justify-between text-sm text-text-main hover:text-primary transition-colors text-left"
              >
                <span>{topic.name}</span>
                <span className="text-xs text-text-secondary group-hover:text-primary/70">{topic.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="border-t border-gray-100 pt-4 px-2">
        <div className="flex items-center gap-3 cursor-pointer hover:opacity-80">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-blue-500 flex items-center justify-center text-white text-xs font-bold">
            JD
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-text-main">John Doe</span>
            <span className="text-xs text-text-secondary">Researcher</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
