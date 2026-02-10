import React from 'react';

/**
 * 类型定义文件
 * 定义项目中所有共享的 TypeScript 接口、枚举和类型
 */

/** 作者信息（备用，目前 Paper.authors 使用 string[]） */

export interface Author {
    name: string;
}

export interface Paper {
    id: string;
    title: string;
    abstract: string;
    authors: string[];
    mainCategory: string;
    subCategory: string;
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

export interface StatItem {
    label: string;
    value: string;
    trend: string;
    icon: React.ReactNode;
    color: string;
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

export interface User {
    email: string;
    name: string;
}
