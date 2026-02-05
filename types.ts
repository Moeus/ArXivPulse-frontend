
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
  Account = 'account'
}

export interface TrendingTopic {
  name: string;
  count: string;
}

export interface StatItem {
  label: string;
  value: string;
  trend: string;
  icon: string;
  color: string;
}

export interface DailyData {
  day: string;
  value: number;
}
