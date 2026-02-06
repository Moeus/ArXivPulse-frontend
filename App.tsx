
import React, { useMemo } from 'react';
import { ViewMode } from './types';
import { useStore } from './store/useStore';
import Sidebar from './components/Sidebar';
import PaperCard from './components/PaperCard';
import HomeDashboard from './components/HomeDashboard';
import ExploreView from './components/ExploreView';
import PaperDetailView from './components/PaperDetailView';
import AccountView from './components/AccountView';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';

const App: React.FC = () => {
  const { 
    user, 
    currentView, 
    setView, 
    papers, 
    searchQuery, 
    activeFilter, 
    selectedPaper,
    setSearchQuery,
    setActiveFilter
  } = useStore();

  const filteredPapers = useMemo(() => {
    let result = papers;
    if (activeFilter !== 'All') {
      result = result.filter(p => 
        p.mainCategory.toLowerCase().includes(activeFilter.toLowerCase()) || 
        p.subCategory.toLowerCase().includes(activeFilter.toLowerCase())
      );
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.abstract.toLowerCase().includes(q) ||
        p.authors.some(a => a.toLowerCase().includes(q))
      );
    }
    return result;
  }, [papers, searchQuery, activeFilter]);

  const bookmarkedPapers = useMemo(() => {
    return papers.filter(p => p.isBookmarked);
  }, [papers]);

  const renderContent = () => {
    if (!user) {
      if (currentView === ViewMode.Auth) {
        return <AuthPage />;
      }
      return <LandingPage />;
    }

    switch (currentView) {
      case ViewMode.Home:
        return <HomeDashboard />;
      case ViewMode.Explore:
        return <ExploreView filteredPapers={filteredPapers} />;
      case ViewMode.Library:
        return (
          <div className="flex flex-col gap-6 animate-fade-in">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-black text-text-main tracking-tight">Saved Research</h1>
              <p className="text-text-secondary">Your personal collection of groundbreaking knowledge.</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {bookmarkedPapers.length > 0 ? (
                bookmarkedPapers.map(paper => (
                  <PaperCard key={paper.id} paper={paper} />
                ))
              ) : (
                <div className="py-20 text-center flex flex-col items-center gap-4 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                  <span className="material-symbols-outlined text-gray-300 !text-[64px]">bookmark_border</span>
                  <p className="text-text-secondary font-bold">Your library is currently empty.</p>
                  <button onClick={() => setView(ViewMode.Explore)} className="text-primary font-black text-xs uppercase tracking-widest border-b-2 border-primary/20">Go Discover</button>
                </div>
              )}
            </div>
          </div>
        );
      case ViewMode.PaperDetail:
        return selectedPaper ? <PaperDetailView /> : null;
      case ViewMode.Account:
        return <AccountView />;
      default:
        return null;
    }
  };

  if (!user) {
    return <div className="min-h-screen bg-white">{renderContent()}</div>;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-light">
      <Sidebar />

      <main className="flex-1 h-full overflow-y-auto relative bg-white pb-24 lg:pb-0 custom-scrollbar">
        <div className={`max-w-[1024px] mx-auto px-5 py-6 md:px-12 flex flex-col gap-6 h-full ${currentView === ViewMode.PaperDetail ? 'max-w-none px-0 py-0' : ''}`}>
          
          {currentView !== ViewMode.PaperDetail && (
            <div className="lg:hidden flex items-center justify-between mb-2">
              <h1 className="text-xl font-bold tracking-tight text-text-main flex items-center gap-2">
                <span className="material-symbols-outlined text-primary" style={{ fontSize: '24px' }}>science</span>
                ArXivPulse
              </h1>
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary" style={{ fontSize: '20px' }}>notifications</span>
              </div>
            </div>
          )}

          {renderContent()}
        </div>
      </main>

      {currentView !== ViewMode.PaperDetail && (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-100 h-16 flex items-center justify-around px-6 z-50">
          {[
            { id: ViewMode.Home, icon: 'grid_view', label: 'Home' },
            { id: ViewMode.Explore, icon: 'explore', label: 'Explore' },
            { id: ViewMode.Library, icon: 'bookmark', label: 'Saved' },
            { id: ViewMode.Account, icon: 'person', label: 'Profile' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => {
                setView(item.id);
                setSearchQuery('');
                setActiveFilter('All');
              }}
              className={`flex flex-col items-center gap-1 transition-all ${currentView === item.id ? 'text-primary scale-110' : 'text-text-secondary opacity-60'}`}
            >
              <span className={`material-symbols-outlined ${currentView === item.id ? 'fill' : ''}`} style={{ fontSize: '24px' }}>
                {item.icon}
              </span>
              <span className="text-[10px] font-black uppercase tracking-tighter">{item.label}</span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
};

export default App;
