/**
 * EmptyState — 通用空状态提示组件
 * 用于 Library 页面无收藏、Explore 页面无搜索结果等场景
 *
 * Props:
 *   icon        — Material Symbols 图标名称
 *   message     — 提示文案
 *   actionLabel — 可选的按钮文字
 *   onAction    — 可选的按钮点击回调
 */

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon: Icon, message, actionLabel, onAction }) => (
  <div className="py-20 text-center flex flex-col items-center gap-4 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
    <Icon className="text-gray-300" size={64} />
    <p className="text-text-secondary font-bold">{message}</p>
    {actionLabel && onAction && (
      <button
        onClick={onAction}
        className="text-primary font-black text-xs uppercase tracking-widest border-b-2 border-primary/20"
      >
        {actionLabel}
      </button>
    )}
  </div>
);

export default EmptyState;
