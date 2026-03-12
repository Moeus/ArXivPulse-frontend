/**
 * paperStore — 论文状态管理 (Zustand + Immer + Persist)
 * 管理论文列表数据、选中状态、收藏状态等
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { Paper } from '../types';
import { MOCK_PAPERS } from '../constants';

interface PaperState {
  papers: Paper[];
  selectedPaper: Paper | null;

  // Actions
  setSelectedPaper: (paper: Paper | null) => void;
  toggleBookmark: (id: string) => void;
}

export const usePaperStore = create<PaperState>()(
  persist(
    immer((set) => ({
      papers: MOCK_PAPERS,
      selectedPaper: null,

      setSelectedPaper: (paper) => 
        set((state) => {
          state.selectedPaper = paper as any; // Cast needed due to immer readonly nuances, but paper is plain object
        }),

      toggleBookmark: (id) => 
        set((state) => {
          const paper = state.papers.find((p) => p.id === id);
          if (paper) {
            paper.isBookmarked = !paper.isBookmarked;
          }
          
          if (state.selectedPaper && state.selectedPaper.id === id) {
            state.selectedPaper.isBookmarked = !state.selectedPaper.isBookmarked;
          }
        }),
    })),
    {
      name: 'paper-storage',
      // Persist papers list and selectedPaper
    }
  )
);
