/**
 * paperStore — 论文状态管理 (Zustand + Immer)
 * 管理论文列表数据、分页、选中状态、收藏状态等
 * 数据来源为真实后端 API，不再使用模拟数据
 */

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Paper } from '../types';
import * as api from '../service/api';

interface PaperState {
  // 论文列表（Explore 页面 — 推荐 or 搜索结果）
  papers: Paper[];
  totalPages: number;
  currentPage: number;
  isLoading: boolean;

  // 收藏夹
  favoritePapers: Paper[];
  favoriteIds: Set<string>;      // 用于快速判断是否已收藏

  // 当前选中论文（详情页）
  selectedPaper: Paper | null;

  // Actions
  setSelectedPaper: (paper: Paper | null) => void;

  /** 加载推荐论文（首页/分页加载更多） */
  fetchRecommendations: (page?: number) => Promise<void>;

  /** 搜索论文 */
  fetchSearch: (keyword: string, page?: number) => Promise<void>;

  /** 加载收藏夹 */
  fetchFavorites: () => Promise<void>;

  /** 切换收藏 */
  toggleBookmark: (paperId: string) => Promise<void>;
}

export const usePaperStore = create<PaperState>()(
  immer((set, get) => ({
    papers: [],
    totalPages: 1,
    currentPage: 1,
    isLoading: false,
    favoritePapers: [],
    favoriteIds: new Set(),
    selectedPaper: null,

    setSelectedPaper: (paper) =>
      set((state) => {
        state.selectedPaper = paper as any;
      }),

    fetchRecommendations: async (page = 1) => {
      set((state) => { state.isLoading = true; });
      try {
        const res = await api.getRecommendations({ page, size: 100 });
        console.log(res)
        const { content, totalPages, number } = res.data;
        // 标记收藏态
        const ids = get().favoriteIds;
        const papers = content.map(p => ({ ...p, isBookmarked: ids.has(p.id) }));
        set((state) => {
          state.papers = papers as any;
          state.totalPages = totalPages;
          state.currentPage = number + 1; // backend 0-indexed
        });
        console.log("今日推荐论文的长度", papers.length)
      } catch (err) {
        console.error('fetchRecommendations error:', err);
      } finally {
        set((state) => { state.isLoading = false; });
      }
    },

    fetchSearch: async (keyword, page = 1) => {
      set((state) => { state.isLoading = true; });
      try {
        const res = await api.searchPapers({ keyword, scope: 'global', page, size: 20 });
        const { content, totalPages, number } = res.data;
        const ids = get().favoriteIds;
        const papers = content.map(p => ({ ...p, isBookmarked: ids.has(p.id) }));
        set((state) => {
          state.papers = papers as any;
          state.totalPages = totalPages;
          state.currentPage = number + 1;
        });
      } catch (err) {
        console.error('fetchSearch error:', err);
      } finally {
        set((state) => { state.isLoading = false; });
      }
    },

    fetchFavorites: async () => {
      set((state) => { state.isLoading = true; });
      try {
        const res = await api.getFavorites({ size: 100 });
        const papers = res.data.content;
        const ids = new Set(papers.map(p => p.id));
        set((state) => {
          state.favoritePapers = papers.map(p => ({ ...p, isBookmarked: true })) as any;
          state.favoriteIds = ids as any;
        });
      } catch (err) {
        console.error('fetchFavorites error:', err);
      } finally {
        set((state) => { state.isLoading = false; });
      }
    },

    toggleBookmark: async (paperId) => {
      const ids = get().favoriteIds;
      const isCurrentlyFavorited = ids.has(paperId);
      try {
        if (isCurrentlyFavorited) {
          await api.removeFavorite(paperId);
          set((state) => {
            (state.favoriteIds as Set<string>).delete(paperId);
            state.favoritePapers = state.favoritePapers.filter(p => p.id !== paperId) as any;
          });
        } else {
          await api.addFavorite(paperId);
          set((state) => {
            (state.favoriteIds as Set<string>).add(paperId);
          });
        }
        // 更新 papers 列表中的收藏状态
        set((state) => {
          state.papers = state.papers.map(p =>
            p.id === paperId ? { ...p, isBookmarked: !isCurrentlyFavorited } : p
          ) as any;
          if (state.selectedPaper?.id === paperId) {
            (state.selectedPaper as Paper).isBookmarked = !isCurrentlyFavorited;
          }
        });
      } catch (err) {
        console.error('toggleBookmark error:', err);
        throw err; // 上抛给组件处理用户提示
      }
    },
  }))
);
