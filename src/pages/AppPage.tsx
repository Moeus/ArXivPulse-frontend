/**
 * AppPage — 已登录用户的应用主页面
 * 布局：桌面端左侧固定 Sidebar + 右侧内容区
 *       移动端顶部 MobileHeader + 内容区 + 底部 MobileNav
 * 所有子视图（包括 PaperDetail）共享同一布局壳
 */

import React from 'react';
import { ViewMode } from '../types';
import { useStore } from '../store/useStore';

// 布局组件
import Sidebar from '../components/Sidebar';
import MobileHeader from '../components/MobileHeader';
import MobileNav from '../components/MobileNav';

// 子视图页面
import Dashboard from './Dashboard';
import Explore from './Explore';
import Library from './Library';
import Account from './Account';
import PaperDetail from './PaperDetail';

const AppPage: React.FC = () => {
  const { currentView } = useStore();

  /** 根据当前视图渲染对应页面 */
  const renderView = () => {
    switch (currentView) {
      case ViewMode.Home:
        return <Dashboard />;
      case ViewMode.Explore:
        return <Explore />;
      case ViewMode.Library:
        return <Library />;
      case ViewMode.Account:
        return <Account />;
      case ViewMode.PaperDetail:
        return <PaperDetail />;
      default:
        return <Dashboard />;
    }
  };


  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-light">
      {/* 桌面端侧边栏 */}
      <Sidebar />

      {/* 主内容区 */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-white">
        {/* 移动端顶部标题栏 — 所有页面显示 */}
        <MobileHeader />

        {/* 页面内容 */}
        <div className={`flex-1 overflow-y-auto pb-20 lg:pb-0 custom-scrollbar max-w-[1024px] mx-auto w-full px-5 py-6 md:px-12`}>
          {renderView()}
        </div>
      </main>

      {/* 移动端底部导航栏 — 所有页面显示 */}
      <MobileNav />
    </div>
  );
};

export default AppPage;
