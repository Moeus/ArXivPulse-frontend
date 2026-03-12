/**
 * 类型定义文件
 * 定义项目中所有共享的 TypeScript 接口、枚举和类型
 */

export interface User {
    id: string;
    username: string;
    email: string;
    avatar?: string;
}

export interface Paper {
    id: string;
    title: string;
    abstract: string;
    authors: string[];
    category: string;
    journal: string;
    publishedDate: string;
    isBookmarked?: boolean;
}

export enum ViewMode {
    Home = 'home',
    Explore = 'explore',
    Library = 'library',
    Account = 'account',
    PaperDetail = 'paper_detail',
    Landing = 'landing',
    Auth = 'auth'
}

export interface TrendingTopic {
    name: string;
    count: string;
}

export interface DailyData {
    day: string;
    value: number;
}

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}

export type Frequency = 'daily' | 'weekly';
export type TimeSlot = 'morning' | 'afternoon' | 'evening';

export interface UserSubscription {
    domains: string[];
    frequency: Frequency;
    timeSlot: TimeSlot;
    subscribedAt: string;
}
