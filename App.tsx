
import React, { useState, useMemo } from 'react';
import { Paper, ViewMode, User } from './types';
import { MOCK_PAPERS } from './constants';
import Sidebar from './components/Sidebar';
import PaperCard from './components/PaperCard';
import HomeDashboard from './components/HomeDashboard';
import ExploreView from './components/ExploreView';
import PaperDetailView from './components/PaperDetailView';
import AccountView from './components/AccountView';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<ViewMode>(ViewMode.Landing);
  const [previousView, setPreviousView] = useState<ViewMode>(ViewMode.Explore);
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [papers, setPapers] = useState<Paper[]>(MOCK_PAPERS);
  const [activeFilter, setActiveFilter] = useState('All');

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

  const handleBookmark = (id: string) => {
    setPapers(prev => {
      const updated = prev.map(p => 
        p.id === id ? { ...p, isBookmarked: !p.isBookmarked } : p
      );
      if (selectedPaper && selectedPaper.id === id) {
        const p = updated.find(p => p.id === id);
        if (p) setSelectedPaper(p);
      }
      return updated;
    });
  };

  const handlePaperClick = (paper: Paper) => {
    setPreviousView(currentView);
    setSelectedPaper(paper);
    setCurrentView(ViewMode.PaperDetail);
  };

  const handleBack = () => {
    setCurrentView(previousView);
    setSelectedPaper(null);
  };

  const handleLogin = (email: string) => {
    setUser({ email, name: email.split('@')[0] });
    setCurrentView(ViewMode.Explore);
  };

  const renderContent = () => {
    if (!user) {
      if (currentView === ViewMode.Auth) {
        return <AuthPage onLogin={handleLogin} onBack={() => setCurrentView(ViewMode.Landing)} />;
      }
      return <LandingPage onGetStarted={() => setCurrentView(ViewMode.Auth)} />;
    }

    switch (currentView) {
      case ViewMode.Home:
        return <HomeDashboard />;
      case ViewMode.Explore:
        return (
          <ExploreView 
            papers={filteredPapers}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            onBookmark={handleBookmark}
            onPaperClick={handlePaperClick}
          />
        );
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
                  <PaperCard 
                    key={paper.id} 
                    paper={paper} 
                    onBookmark={handleBookmark} 
                    onClick={handlePaperClick}
                  />
                ))
              ) : (
                <div className="py-20 text-center flex flex-col items-center gap-4 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                  <span className="material-symbols-outlined text-gray-300 !text-[64px]">bookmark_border</span>
                  <p className="text-text-secondary font-bold">Your library is currently empty.</p>
                  <button onClick={() => setCurrentView(ViewMode.Explore)} className="text-primary font-black text-xs uppercase tracking-widest border-b-2 border-primary/20">Go Discover</button>
                </div>
              )}
            </div>
          </div>
        );
      case ViewMode.PaperDetail:
        if (!selectedPaper) return null;
        return <PaperDetailView paper={selectedPaper} onBack={handleBack} onBookmark={handleBookmark} />;
      case ViewMode.Account:
        return <AccountView />;
      default:
        return null;
    }
  };

  // Logic to show/hide full app shell based on auth state
  if (!user) {
    return <div className="min-h-screen bg-white">{renderContent()}</div>;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-light">
      <Sidebar 
        currentView={currentView} 
        onViewChange={(view) => {
          setCurrentView(view);
          if (view !== ViewMode.PaperDetail) {
            setSearchQuery('');
            setActiveFilter('All');
          }
        }} 
      />

      <main className="flex-1 h-full overflow-y-auto relative bg-white pb-24 lg:pb-0">
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
                setCurrentView(item.id);
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
