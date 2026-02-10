/**
 * SearchBar — 搜索输入框组件
 * 带搜索图标的圆角输入框，用于 Explore 页面论文搜索
 *
 * Props:
 *   value       — 当前搜索关键词
 *   onChange     — 关键词变化回调
 *   placeholder  — 输入框占位文字
 */

import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder }) => (
  <div className="relative w-full md:w-64">
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-10 pl-10 pr-4 rounded-xl bg-background-subtle border-none text-sm focus:ring-1 focus:ring-primary placeholder-text-secondary"
      placeholder={placeholder}
      type="text"
    />
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
  </div>
);

export default SearchBar;
