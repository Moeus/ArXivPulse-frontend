/**
 * SearchBar — 搜索输入框
 * 設計：紙質感 — 温暖背景 + 精致圆角
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
      className="w-full h-10 pl-10 pr-4 rounded-xl bg-background-warm border border-border-light text-sm focus:ring-1 focus:ring-primary/20 focus:border-primary/30 placeholder-text-muted transition-all duration-200"
      placeholder={placeholder}
      type="text"
    />
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
  </div>
);

export default SearchBar;
