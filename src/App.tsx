import React from 'react';
import { Show } from '@clerk/react';
import Landing from './pages/Landing';
import AppPage from './pages/AppPage';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Show when="signed-out">
        <Landing />
      </Show>
      <Show when="signed-in">
        <AppPage />
      </Show>
    </div>
  );
};

export default App;
