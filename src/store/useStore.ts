/**
 * useStore — 全局状态管理（Zustand）
 * 管理用户认证状态、当前视图、论文列表、搜索/筛选、订阅配置、语言偏好
 * 所有组件通过 useStore() hook 访问和修改全局状态
 */

import { create } from 'zustand';
import { ViewMode, Paper, User, UserSubscription } from '../types';
import { MOCK_PAPERS } from '../constants';
import type { Locale } from '../i18n';

interface AppState {
  user: User | null;
  currentView: ViewMode;
  previousView: ViewMode;
  selectedPaper: Paper | null;
  papers: Paper[];
  searchQuery: string;
  activeFilter: string;
  subscription: UserSubscription | null;
  locale: Locale;

  // Actions
  setUser: (user: User | null) => void;
  setView: (view: ViewMode) => void;
  setSelectedPaper: (paper: Paper | null) => void;
  setSearchQuery: (query: string) => void;
  setActiveFilter: (filter: string) => void;
  toggleBookmark: (id: string) => void;
  setSubscription: (sub: UserSubscription | null) => void;
  setLocale: (locale: Locale) => void;
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
  locale: 'en',

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

  setLocale: (locale) => set({ locale }),

  logout: () => set({ 
    user: null, 
    currentView: ViewMode.Landing,
    selectedPaper: null,
    searchQuery: '',
    activeFilter: 'All'
  }),
}));

