/**
 * App — 应用根组件
 * 只做三层路由分发：
 *   1. 未登录 + Landing 视图 → Landing 页面
 *   2. 未登录 + Auth 视图   → Auth 页面
 *   3. 已登录              → AppPage（包含 Sidebar + 内容区）
 */

import React from 'react';
import { ViewMode } from './types/index.ts';
import { useStore } from './store/useStore.ts';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import AppPage from './pages/AppPage';

const App: React.FC = () => {
  const { user, currentView } = useStore();

  // -------- 未登录状态 --------
  if (!user) {
    return (
      <div className="min-h-screen bg-white">
        {currentView === ViewMode.Auth ? <Auth /> : <Landing />}
      </div>
    );
  }

  // -------- 已登录状态 --------
  return <AppPage />;
};

export default App;
