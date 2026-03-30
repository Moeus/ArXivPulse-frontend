/**
 * 类型定义文件
 * 定义项目中所有共享的 TypeScript 接口、枚举和类型
 * 已对齐后端 API 文档
 */
export interface User {
    id: string;
    username: string;
    email: string;
    subscription: UserSubscription;
}

/**
 * 论文摘要 — 包含中英文双语
 */
export interface AbstractText {
    en: string;
    ch: string;
}

/**
 * 论文数据结构 — 与后端 Paper 对象对齐
 */
export interface Paper {
    id: string;
    title: string;
    abstractText: AbstractText;
    authors: string[];
    category: string;
    subcategory: string;
    journal: string;
    publishedDate: string;
    link: string;
    crawlTime: string;
    isActive: boolean;
    isBookmarked?: boolean; // 前端本地收藏状态（由 favorites API 维护）
}

export enum ViewMode {
    Explore = 'explore',
    Library = 'library',
    Account = 'account',
    PaperDetail = 'paper_detail',
}

export interface TrendingTopic {
    name: string;
    count: string;
}

export interface DailyData {
    day: string;
    value: number;
}


/**
 * 用户订阅配置 — 与后端 Subscription 对象对齐
 */
export interface UserSubscription {
    categories: string[];
    pushTime: string;     // 格式 "HH:mm"，e.g. "08:00"
    isActive: boolean;
}

/**
 * 分页响应结构
 */
export interface PageResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;      // 0-indexed 页码
    first: boolean;
    last: boolean;
    empty: boolean;
}
