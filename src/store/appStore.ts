/**
 * appStore — 应用状态管理 (Zustand + Immer + Persist)
 * 管理当前视图、搜索/筛选等全局 UI 状态
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { ViewMode } from '../types';

interface AppState {
  currentView: ViewMode;
  previousView: ViewMode;
  searchQuery: string;
  activeFilter: string;

  // Actions
  setView: (view: ViewMode) => void;
  setSearchQuery: (query: string) => void;
  setActiveFilter: (filter: string) => void;
  resetUI: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    immer((set) => ({
      currentView: ViewMode.Explore,
      previousView: ViewMode.Explore,
      searchQuery: '',
      activeFilter: 'All',

      setView: (view) => 
        set((state) => {
          if (view !== state.currentView) {
            state.previousView = state.currentView;
            state.currentView = view;
          }
        }),

      setSearchQuery: (searchQuery) => 
        set((state) => {
          state.searchQuery = searchQuery;
        }),

      setActiveFilter: (activeFilter) => 
        set((state) => {
          state.activeFilter = activeFilter;
        }),

      resetUI: () => 
        set((state) => {
          state.currentView = ViewMode.Explore;
          state.searchQuery = '';
          state.activeFilter = 'All';
        }),
    })),
    {
      name: 'app-storage',
      partialize: (state) => ({ 
        currentView: state.currentView,
        previousView: state.previousView,
        activeFilter: state.activeFilter 
      }),
    }
  )
);
