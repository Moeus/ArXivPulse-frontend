/**
 * userStore — 用户状态管理 (Zustand + Immer + Persist)
 * 管理用户登录态、Token、订阅配置信息
 * 已对齐后端 API 文档中的 User / Subscription 结构
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { User, UserSubscription } from '../types';

interface UserState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;

  // Actions
  login: (user: User, token: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  setSubscription: (sub: UserSubscription | null) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    immer((set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: (user, token) =>
        set((state) => {
          state.user = user;
          state.token = token;
          state.isAuthenticated = true;
        }),

      logout: () =>
        set((state) => {
          state.user = null;
          state.token = null;
          state.isAuthenticated = false;
        }),

      setUser: (user) =>
        set((state) => {
          state.user = user;
        }),

      setToken: (token) =>
        set((state) => {
          state.token = token;
        }),

      setSubscription: (subscription) =>
        set((state) => {
          if (state.user) {
            if (subscription) {
              state.user.subscription = subscription;
            } else {
              // 取消订阅时重置为空配置
              state.user.subscription = {
                categories: [],
                pushTime: '08:00',
                isActive: false,
              };
            }
          }
        }),
    })),
    {
      name: 'user-storage',
      partialize: (state) => ({
        token: state.token,
      }),
    }
  )
);
