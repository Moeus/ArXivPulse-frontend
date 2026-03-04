/**
 * useStore — 全局状态管理（Zustand）
 * 管理当前视图、论文列表、搜索/筛选、订阅配置
 * 用户认证由 Clerk 管理，不在此处维护
 * 所有组件通过 useStore() hook 访问和修改全局状态
 */

import { create } from 'zustand';
import { ViewMode, Paper, UserSubscription } from '../types';
import { MOCK_PAPERS } from '../constants';

interface AppState {
  currentView: ViewMode;
  previousView: ViewMode;
  selectedPaper: Paper | null;
  papers: Paper[];
  searchQuery: string;
  activeFilter: string;
  subscription: UserSubscription | null;

  // Actions
  setView: (view: ViewMode) => void;
  setSelectedPaper: (paper: Paper | null) => void;
  setSearchQuery: (query: string) => void;
  setActiveFilter: (filter: string) => void;
  toggleBookmark: (id: string) => void;
  setSubscription: (sub: UserSubscription | null) => void;
  resetUI: () => void;
}

export const useStore = create<AppState>((set) => ({
  currentView: ViewMode.Landing,
  previousView: ViewMode.Explore,
  selectedPaper: null,
  papers: MOCK_PAPERS,
  searchQuery: '',
  activeFilter: 'All',
  subscription: null,

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

  /** 重置 UI 状态（配合 Clerk signOut 使用） */
  resetUI: () => set({ 
    currentView: ViewMode.Landing,
    selectedPaper: null,
    searchQuery: '',
    activeFilter: 'All'
  }),
}));

