/**
 * api.ts — HTTP 请求工具
 * baseURL = http://localhost:8080/api
 * 自动附加 JWT-Token 到 Authorization header
 * 已对齐后端 API 文档
 */
import { useUserStore } from '../store/userStore';
import type { PageResponse, Paper, UserSubscription } from '../types';

const BASE_URL = 'http://localhost:8080/api';

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = useUserStore.getState().token;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok || data.code >= 400) {
    throw new Error(data.message || 'Request failed');
  }

  return data as T;
}

// ─── 通用响应类型 ────────────────────────────────

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface AuthData {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    subscription: UserSubscription;
  };
}
export interface UserInfo {
  user: {
    id: string;
    username: string;
    email: string;
    subscription: UserSubscription;
  };
}

// ─── Auth API ─────────────────────────────────────

/** 发送验证码 */
export function sendCaptcha(params: {
  email: string;
  type: 'register' | 'reset_password';
}) {
  return request<ApiResponse<null>>('/auth/captcha', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

/** 用户注册 */
export function register(params: {
  username: string;
  email: string;
  password: string;
  captcha: string;
}) {
  return request<ApiResponse<AuthData>>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

/** 用户登录 */
export function login(params: {
  email: string;
  password: string;
}) {
  return request<ApiResponse<AuthData>>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

/** 重置密码 */
export function resetPassword(params: {
  email: string;
  newPassword: string;
  captcha: string;
}) {
  return request<ApiResponse<null>>('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

// ─── User API ─────────────────────────────────────

/** 获取当前用户信息 */
export function getCurrentUser() {
  return request<ApiResponse<UserInfo>>('/users/me', {
    method: 'GET',
  });
}

/** 更新订阅设置 */
export function updateSubscription(params: Partial<UserSubscription>) {
  return request<ApiResponse<UserSubscription>>('/users/me/subscription', {
    method: 'PUT',
    body: JSON.stringify(params),
  });
}

// ─── Papers API ───────────────────────────────────

/** 获取每日推荐论文（分页） */
export function getRecommendations(params: { page?: number; size?: number } = {}) {
  const { page = 1, size = 10 } = params;
  return request<ApiResponse<PageResponse<Paper>>>(
    `/papers/recommendations?page=${page}&size=${size}`,
    { method: 'GET' }
  );
}

/** 搜索论文（分页） */
export function searchPapers(params: {
  keyword?: string;
  scope?: 'global' | 'favorites';
  page?: number;
  size?: number;
}) {
  const { keyword = '', scope = 'global', page = 1, size = 10 } = params;
  const qs = new URLSearchParams();
  if (keyword) qs.set('keyword', keyword);
  qs.set('scope', scope);
  qs.set('page', String(page));
  qs.set('size', String(size));
  return request<ApiResponse<PageResponse<Paper>>>(`/papers?${qs.toString()}`, {
    method: 'GET',
  });
}

// ─── Favorites API ────────────────────────────────

/** 添加收藏 */
export function addFavorite(paperId: string) {
  return request<ApiResponse<null>>('/favorites', {
    method: 'POST',
    body: JSON.stringify({ paper_id: paperId }),
  });
}

/** 取消收藏 */
export function removeFavorite(paperId: string) {
  return request<ApiResponse<null>>(`/favorites/${paperId}`, {
    method: 'DELETE',
  });
}

/** 获取收藏列表（复用 searchPapers 的 favorites scope） */
export function getFavorites(params: { keyword?: string; page?: number; size?: number } = {}) {
  return searchPapers({ ...params, scope: 'favorites' });
}
