
import React from 'react';
import { Paper } from '../types';
import PaperCard from './PaperCard';

interface ExploreViewProps {
  papers: Paper[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeFilter: string;
  setActiveFilter: (f: string) => void;
  onBookmark: (id: string) => void;
  onPaperClick: (paper: Paper) => void;
}

const CATEGORIES = [
  { id: 'cs', name: 'AI & CS', icon: 'psychology', color: 'text-purple-600', bg: 'bg-purple-50' },
  { id: 'physics', name: 'Physics', icon: 'flare', color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 'math', name: 'Math', icon: 'calculate', color: 'text-orange-600', bg: 'bg-orange-50' },
  { id: 'q-bio', name: 'Biology', icon: 'biotech', color: 'text-green-600', bg: 'bg-green-50' },
];

const ExploreView: React.FC<ExploreViewProps> = ({ 
  papers, 
  searchQuery, 
  setSearchQuery, 
  activeFilter, 
  setActiveFilter, 
  onBookmark,
  onPaperClick
}) => {
  const featuredPaper = papers[0];

  return (
    <div className="flex flex-col gap-8 animate-fade-in pb-12">
      {/* Featured Section */}
      {!searchQuery && activeFilter === 'All' && featuredPaper && (
        <section className="relative overflow-hidden rounded-3xl bg-background-dark text-white p-8 md:p-12 shadow-2xl shadow-primary/20">
          <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
            <span className="material-symbols-outlined !text-[120px]">auto_awesome</span>
          </div>
          <div className="relative z-10 flex flex-col gap-4 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="bg-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Featured Research</span>
              <span className="text-white/50 text-xs font-medium">Updated 2h ago</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-black leading-tight tracking-tight">
              {featuredPaper.title}
            </h2>
            <p className="text-white/70 line-clamp-2 text-sm md:text-base leading-relaxed">
              {featuredPaper.abstract}
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <button 
                onClick={() => onPaperClick(featuredPaper)}
                className="bg-white text-background-dark px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-primary-light transition-colors flex items-center gap-2"
              >
                Read Abstract
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_right_alt</span>
              </button>
              <button 
                onClick={() => onBookmark(featuredPaper.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/20 font-bold text-sm hover:bg-white/10 transition-all ${featuredPaper.isBookmarked ? 'bg-primary/20 border-primary/50' : ''}`}
              >
                <span className="material-symbols-outlined !text-[20px]">{featuredPaper.isBookmarked ? 'bookmark_added' : 'bookmark_add'}</span>
                {featuredPaper.isBookmarked ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Modern Category Selector */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black uppercase tracking-widest text-text-secondary">Explore by Domain</h3>
          {activeFilter !== 'All' && (
            <button onClick={() => setActiveFilter('All')} className="text-xs font-bold text-primary hover:underline">Clear Selection</button>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`flex flex-col items-center justify-center p-6 rounded-2xl border transition-all gap-3 group ${
                activeFilter === cat.id 
                  ? 'bg-primary/5 border-primary shadow-inner' 
                  : 'bg-white border-gray-100 hover:border-primary/30 hover:shadow-md'
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl ${cat.bg} flex items-center justify-center transition-transform group-hover:scale-110`}>
                <span className={`material-symbols-outlined ${cat.color}`}>{cat.icon}</span>
              </div>
              <span className={`text-xs font-black uppercase tracking-tight ${activeFilter === cat.id ? 'text-primary' : 'text-text-main'}`}>
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Discovery Feed Header */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-4">
          <div>
            <h3 className="text-xl font-black text-text-main">Discovery Feed</h3>
            <p className="text-xs text-text-secondary font-medium">Browsing {activeFilter === 'All' ? 'global' : activeFilter} research papers</p>
          </div>
          <div className="relative w-full md:w-64">
             <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-xl bg-background-subtle border-none text-sm focus:ring-1 focus:ring-primary placeholder-text-secondary" 
              placeholder="Filter these papers..." 
              type="text"
            />
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary !text-[18px]">search</span>
          </div>
        </div>

        {/* Paper Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {papers.length > 0 ? (
            papers.map((paper, idx) => (
              <div key={paper.id} className={`${idx === 0 && !searchQuery ? 'md:col-span-2' : ''}`}>
                <PaperCard 
                  paper={paper} 
                  onBookmark={onBookmark} 
                  onClick={onPaperClick}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center flex flex-col items-center gap-4 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
              <span className="material-symbols-outlined text-gray-300 !text-[64px]">science_off</span>
              <p className="text-text-secondary font-bold">No research matches your specific query.</p>
              <button onClick={() => { setSearchQuery(''); setActiveFilter('All'); }} className="text-primary font-black text-xs uppercase tracking-widest border-b-2 border-primary/20 hover:border-primary transition-all">Reset Exploration</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ExploreView;
