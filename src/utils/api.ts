/**
 * api.ts — HTTP 请求工具
 * baseURL = http://localhost:8080/api
 * 自动附加 JWT-Token 到 Authorization header
 */
import { useUserStore } from '../store/userStore';

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

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data as T;
}

// ─── Auth API ───────────────────────────────────

export interface AuthResponse {
  code: number;
  message: string;
  data: {
    token: string;
    user: {
      id: string;
      username: string;
      email: string;
      avatar?: string;
    };
  };
}

export interface MessageResponse {
  code: number;
  message: string;
}

export interface UserResponse {
  code: number;
  message: string;
  data: {
    id: string;
    username: string;
    email: string;
    avatar?: string;
  };
}

/** 用户注册 */
export function register(params: {
  email: string;
  username: string;
  password: string;
  code: string;
}) {
  return request<AuthResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

/** 发送验证码 */
export function sendVerificationCode(params: {
  email: string;
  type: 'register' | 'reset';
}) {
  return request<MessageResponse>('/auth/send-code', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

/** 用户登录 */
export function login(params: {
  account: string;
  password: string;
}) {
  return request<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

/** 忘记密码 — 发送重置验证码 */
export function forgotPassword(params: { email: string }) {
  return request<MessageResponse>('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

/** 重置密码 */
export function resetPassword(params: {
  email: string;
  code: string;
  newPassword: string;
}) {
  return request<AuthResponse>('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

/** 获取当前用户信息 */
export function getCurrentUser() {
  return request<UserResponse>('/auth/me', {
    method: 'GET',
  });
}
