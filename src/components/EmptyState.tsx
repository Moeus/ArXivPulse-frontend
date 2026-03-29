/**
 * EmptyState — 通用空状态提示
 * 設計：書卷氣 — 柔和的边框、温暖的色调
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
  <div className="py-20 text-center flex flex-col items-center gap-5 bg-background-warm/50 rounded-2xl border border-dashed border-border-subtle">
    <div className="w-20 h-20 rounded-2xl bg-primary/5 flex items-center justify-center">
      <Icon className="text-primary/30" size={40} />
    </div>
    <p className="text-text-secondary font-medium text-sm">{message}</p>
    {actionLabel && onAction && (
      <button
        onClick={onAction}
        className="text-primary font-semibold text-xs uppercase tracking-wider hover:underline underline-offset-4 transition-all"
      >
        {actionLabel}
      </button>
    )}
  </div>
);

export default EmptyState;
