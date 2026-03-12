import React from 'react';
import { ViewMode } from './types';
import { useAppStore } from './store/appStore';
import { useUserStore } from './store/userStore';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import AppPage from './pages/AppPage';
import {HeroUIProvider} from '@heroui/react'
import { ToastProvider } from '@heroui/toast';


const App: React.FC = () => {
  const currentView = useAppStore(state => state.currentView);
  const isAuthenticated = useUserStore(state => state.isAuthenticated);


  return (
      <div className="min-h-screen bg-white">
        {isAuthenticated ? (
          <AppPage />
        ) : (
          currentView === ViewMode.Auth ? <Auth /> : <Landing />
        )}
      </div>
  )
}

export default App;
