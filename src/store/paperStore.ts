/**
 * paperStore — 论文状态管理 (Zustand + Immer)
 *
 * 数据结构：
 *   - paperIds        : string[]           — 有序 ID 列表（explore/search 结果顺序）
 *   - paperMap        : Record<string, Paper> — id → Paper 对象，O(1) 查询 / 更新
 *   - favoritePaperIds: string[]           — 收藏夹有序 ID 列表
 *   - favoriteIds     : Set<string>        — 快速判断是否已收藏
 *
 * PaperCard 只接收 paperId，内部自行从 paperMap 取完整数据渲染。
 * toggleBookmark 请求成功后，直接用 id 定位 paperMap 中的条目，O(1) 更新收藏状态。
 */

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Paper } from '../types';
import * as api from '../service/api';

interface PaperState {
  // Explore / Search 结果
  paperIds: string[];
  paperMap: Record<string, Paper>;
  totalPages: number;
  currentPage: number;
  isLoading: boolean;

  // 收藏夹
  favoritePaperIds: string[];              // 有序收藏 ID
  favoriteIds: Set<string>;               // 快速判断

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
  setBookmark: (paperId: string, isBookmarked: boolean) => Promise<void>;
}

export const usePaperStore = create<PaperState>()(
  immer((set, get) => ({
    paperIds: [],
    paperMap: {},
    totalPages: 1,
    currentPage: 1,
    isLoading: false,

    favoritePaperIds: [],
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
        // console.log(res);
        const { content, totalPages, number } = res.data;
        const ids = get().favoriteIds;

        const newIds: string[] = [];
        const newMap: Record<string, Paper> = { ...get().paperMap };

        content.forEach((p) => {
          newIds.push(p.id);
          newMap[p.id] = { ...p, isBookmarked: ids.has(p.id) };
        });

        set((state) => {
          state.paperIds = newIds;
          state.paperMap = newMap as any;
          state.totalPages = totalPages;
          state.currentPage = number + 1; // backend 0-indexed
        });
        console.log('今日推荐论文的长度', newIds.length);
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

        const newIds: string[] = [];
        const newMap: Record<string, Paper> = { ...get().paperMap };

        content.forEach((p) => {
          newIds.push(p.id);
          newMap[p.id] = { ...p, isBookmarked: ids.has(p.id) };
        });

        set((state) => {
          state.paperIds = newIds;
          state.paperMap = newMap as any;
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
        const favIds = papers.map((p) => p.id);
        const favIdSet = new Set(favIds);

        // 将收藏论文合并进 paperMap
        const extraMap: Record<string, Paper> = {};
        papers.forEach((p) => {
          extraMap[p.id] = { ...p, isBookmarked: true };
        });

        set((state) => {
          // 合并进全局 paperMap（收藏的论文也可在 explore 中被引用）
          Object.assign(state.paperMap as Record<string, Paper>, extraMap);
          state.favoritePaperIds = favIds as any;
          state.favoriteIds = favIdSet as any;
        });
      } catch (err) {
        console.error('fetchFavorites error:', err);
      } finally {
        set((state) => { state.isLoading = false; });
      }
    },

    setBookmark: async (paperId, isBookmarked) => {
      set((state) => {
        state.paperMap[paperId].isBookmarked = isBookmarked;
        if (isBookmarked) {
          state.favoriteIds.add(paperId);
          state.favoritePaperIds.unshift(paperId);
        } else {
          state.favoriteIds.delete(paperId);
          state.favoritePaperIds = state.favoritePaperIds.filter((id) => id !== paperId);
        }
      })
    }
  }))
);
