/**
 * AppPage — 已登录用户的应用主页面
 * 布局：桌面端左侧固定 Sidebar + 右侧内容区
 *       移动端顶部 MobileHeader + 内容区 + 底部 MobileNav
 * 所有子视图（包括 PaperDetail）共享同一布局壳
 */

import React, { useEffect,useCallback } from 'react';
import { ViewMode } from '../types';
import { useAppStore } from '../store/appStore';

// 布局组件
import Sidebar from '../components/Sidebar';
import MobileHeader from '../components/MobileHeader';
import MobileNav from '../components/MobileNav';

// 子视图页面
import Explore from './Explore';
import Library from './Library';
import Account from './Account';
import PaperDetail from './PaperDetail';
import { useUserStore } from '../store/userStore';
import { useNavigate } from 'react-router-dom';
import {getCurrentUser  } from '@/service/api';
const AppPage: React.FC = () => {
  const {currentView} = useAppStore();
  const {isAuthenticated,token,login} = useUserStore();
  const navigate = useNavigate();
  // 重构无感登录逻辑，增加错误处理和严谨的判断
  const initAuth = useCallback(async () => {

    if (isAuthenticated) return;

    if (!token) {
      navigate('/auth', { replace: true });
      return;
    }

    try {
      const res = await getCurrentUser();
      if (res && res.data && res.data.id) {
        login(res.data, token); // res.data 直接就是 User 对象
      } else {
        navigate('/auth', { replace: true });
      }
    } catch (error) {
      console.error('无感登录失败:', error);
      navigate('/auth', { replace: true });
    }
  }, [isAuthenticated, token, login, navigate]);

  useEffect(() => {
    // 执行认证初始化
    initAuth();

    // 组件卸载时清理副作用（防止导航到已卸载的组件）
    return () => {};
  }, [initAuth]); 

  /** 根据当前视图渲染对应页面 */
  const renderView = () => {
    switch (currentView) {
      case ViewMode.Explore:
        return <Explore />;
      case ViewMode.Library:
        return <Library />;
      case ViewMode.Account:
        return <Account />;
      case ViewMode.PaperDetail:
        return <PaperDetail />;
      default:
        return <Explore />;
    }
  };


  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-light">
      {/* 桌面端侧边栏 */}
      <Sidebar />

      {/* 主内容区 */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-transparent">
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
