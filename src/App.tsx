import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useUserStore } from './store/userStore';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import AppPage from './pages/AppPage';

// 这是一个简单的路由守卫组件
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const {isAuthenticated,token} = useUserStore();
  
  // 如果未认证，直接重定向到落地页（或登录页）
  if (!isAuthenticated && !token) {
    return <Navigate to="/landing" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background-light">
        <Routes>
          {/* 公共路由 */}
          <Route path="/landing" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />

          {/* 受保护路由 */}
          <Route 
            path="/app" 
            element={
              <ProtectedRoute>
                <AppPage />
              </ProtectedRoute>
            } 
          />

          {/* 默认跳转：已登录去 app，未登录去 landing */}
          <Route path="/" element={<Navigate to="/app" replace />} />
          
          {/* 404 处理 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;