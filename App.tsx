
import React, { useState, useMemo } from 'react';
import { Paper, ViewMode } from './types';
import { MOCK_PAPERS } from './constants';
import Sidebar from './components/Sidebar';
import PaperCard from './components/PaperCard';
import HomeDashboard from './components/HomeDashboard';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewMode>(ViewMode.Home);
  const [searchQuery, setSearchQuery] = useState('');
  const [papers, setPapers] = useState<Paper[]>(MOCK_PAPERS);
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredPapers = useMemo(() => {
    let result = papers;

    // Filter by view
    if (currentView === ViewMode.Library) {
      result = result.filter(p => p.isBookmarked);
    }

    // Filter by category chip
    if (activeFilter !== 'All') {
      result = result.filter(p => 
        p.mainCategory.includes(activeFilter) || 
        p.subCategory.includes(activeFilter) ||
        p.mainCategory.toLowerCase().startsWith(activeFilter.toLowerCase())
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.abstract.toLowerCase().includes(q) ||
        p.authors.some(a => a.toLowerCase().includes(q))
      );
    }

    return result;
  }, [papers, searchQuery, activeFilter, currentView]);

  const handleBookmark = (id: string) => {
    setPapers(prev => prev.map(p => 
      p.id === id ? { ...p, isBookmarked: !p.isBookmarked } : p
    ));
  };

  const handleReset = () => {
    setSearchQuery('');
    setActiveFilter('All');
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-light">
      {/* Desktop Sidebar */}
      <Sidebar 
        currentView={currentView} 
        onViewChange={setCurrentView} 
      />

      {/* Main Content Area */}
      <main className="flex-1 h-full overflow-y-auto relative bg-white pb-20 lg:pb-0">
        <div className="max-w-[1024px] mx-auto px-5 py-6 md:px-12 flex flex-col gap-6">
          
          {/* Mobile Header (Hidden on LG) */}
          <div className="lg:hidden flex items-center justify-between mb-2">
            <h1 className="text-xl font-bold tracking-tight text-text-main flex items-center gap-2">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: '24px' }}>science</span>
              ArXivPulse
            </h1>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-blue-500 flex items-center justify-center text-white text-[10px] font-bold">
                JD
              </div>
            </div>
          </div>

          {/* Conditional Rendering based on ViewMode */}
          {currentView === ViewMode.Home ? (
            <HomeDashboard />
          ) : (
            <div className="flex flex-col gap-6 animate-fade-in">
              {/* Page Header */}
              <div className="flex flex-col gap-1">
                <h1 className="text-3xl md:text-4xl font-black text-text-main tracking-tight">
                  {currentView === ViewMode.Library ? 'Your Saved Research' : 'Frontiers of Science'}
                </h1>
                <p className="text-text-secondary text-lg">
                  {currentView === ViewMode.Library 
                    ? 'Continue where you left off with your curated collection.' 
                    : 'Discover groundbreaking research curated for you.'}
                </p>
              </div>

              {/* Search Bar */}
              <div className="w-full sticky top-0 z-20 bg-white/90 backdrop-blur-md py-4 -my-4">
                <div className="relative flex w-full items-center">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-primary">
                    <span className="material-symbols-outlined">search</span>
                  </div>
                  <input 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-14 pl-12 pr-4 rounded-xl bg-background-subtle border-transparent focus:border-primary focus:ring-primary focus:ring-1 text-text-main placeholder-text-secondary transition-all shadow-sm" 
                    placeholder="Search papers or topics..." 
                    type="text"
                  />
                </div>
              </div>

              {/* Filter Chips */}
              <div className="flex gap-2 flex-wrap items-center overflow-x-auto no-scrollbar py-1">
                <button 
                  onClick={() => setActiveFilter('All')}
                  className={`flex h-9 shrink-0 items-center justify-center rounded-full px-5 transition-all text-sm font-bold ${
                    activeFilter === 'All' ? 'bg-primary text-white shadow-sm' : 'bg-background-subtle text-text-main'
                  }`}
                >
                  All
                </button>
                {['cs', 'physics', 'math', 'q-bio'].map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`flex h-9 shrink-0 items-center justify-center rounded-full px-5 border transition-colors text-sm font-bold ${
                      activeFilter === cat ? 'bg-primary/5 border-primary text-primary' : 'bg-background-subtle border-gray-100'
                    }`}
                  >
                    {cat.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Section Header */}
              <div className="flex items-end justify-between mb-2">
                <h2 className="text-lg font-bold text-text-main">
                  {currentView === ViewMode.Library ? 'Collection' : 'Latest Insights'}
                </h2>
              </div>

              {/* Paper Cards Grid */}
              <div className="grid grid-cols-1 gap-5 pb-10">
                {filteredPapers.length > 0 ? (
                  filteredPapers.map(paper => (
                    <PaperCard 
                      key={paper.id} 
                      paper={paper} 
                      onBookmark={handleBookmark} 
                    />
                  ))
                ) : (
                  <div className="py-20 text-center flex flex-col items-center gap-4">
                    <span className="material-symbols-outlined text-gray-300" style={{ fontSize: '64px' }}>search_off</span>
                    <p className="text-text-secondary font-medium">No papers found matching your criteria.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 h-16 flex items-center justify-around px-6 z-50">
        {[
          { id: ViewMode.Home, icon: 'grid_view', label: 'Home' },
          { id: ViewMode.Explore, icon: 'explore', label: 'Explore' },
          { id: ViewMode.Library, icon: 'bookmark', label: 'Saved' },
          { id: ViewMode.Account, icon: 'person', label: 'Profile' },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`flex flex-col items-center gap-1 transition-all ${currentView === item.id ? 'text-primary scale-110' : 'text-text-secondary opacity-60'}`}
          >
            <span className={`material-symbols-outlined ${currentView === item.id ? 'fill' : ''}`} style={{ fontSize: '24px' }}>
              {item.icon}
            </span>
            <span className="text-[10px] font-black uppercase tracking-tighter">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default App;
