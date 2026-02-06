
import { create } from 'zustand';
import { ViewMode, Paper, User, UserSubscription } from '../types';
import { MOCK_PAPERS } from '../constants';

interface AppState {
  user: User | null;
  currentView: ViewMode;
  previousView: ViewMode;
  selectedPaper: Paper | null;
  papers: Paper[];
  searchQuery: string;
  activeFilter: string;
  subscription: UserSubscription | null;

  // Actions
  setUser: (user: User | null) => void;
  setView: (view: ViewMode) => void;
  setSelectedPaper: (paper: Paper | null) => void;
  setSearchQuery: (query: string) => void;
  setActiveFilter: (filter: string) => void;
  toggleBookmark: (id: string) => void;
  setSubscription: (sub: UserSubscription | null) => void;
  logout: () => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  currentView: ViewMode.Landing,
  previousView: ViewMode.Explore,
  selectedPaper: null,
  papers: MOCK_PAPERS,
  searchQuery: '',
  activeFilter: 'All',
  subscription: null,

  setUser: (user) => set({ user }),
  
  setView: (view) => set((state) => {
    if (view === state.currentView) return state;
    return { 
      previousView: state.currentView,
      currentView: view 
    };
  }),

  setSelectedPaper: (paper) => set({ selectedPaper: paper }),
  
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  
  setActiveFilter: (activeFilter) => set({ activeFilter }),

  toggleBookmark: (id) => set((state) => ({
    papers: state.papers.map(p => 
      p.id === id ? { ...p, isBookmarked: !p.isBookmarked } : p
    ),
    // 同步更新 selectedPaper 的状态
    selectedPaper: state.selectedPaper?.id === id 
      ? { ...state.selectedPaper, isBookmarked: !state.selectedPaper.isBookmarked } 
      : state.selectedPaper
  })),

  setSubscription: (subscription) => set({ subscription }),

  logout: () => set({ 
    user: null, 
    currentView: ViewMode.Landing,
    selectedPaper: null,
    searchQuery: '',
    activeFilter: 'All'
  }),
}));
