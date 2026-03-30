/**
 * StatCard — 统计卡片组件
 * 設計：書卷氣 — 温暖边框 + 弥散阴影
 */

import React from 'react';

interface StatCardProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    trend: string;
    color: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, trend, color }) => (
  <div className="bg-white/80 backdrop-blur-sm border border-border-light rounded-xl p-3 shadow-warm-sm hover:shadow-warm transition-all duration-200 group">
    <div className="flex items-center justify-between mb-2">
      <div className={`p-1.5 rounded-lg ${color} group-hover:scale-110 transition-transform duration-200`}>
        {icon}
      </div>
      <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${
        trend.startsWith('+') ? 'text-emerald-600 bg-emerald-50' : 'text-red-500 bg-red-50'
      }`}>
        {trend}
      </span>
    </div>
    <p className="text-[9px] text-text-muted font-medium uppercase tracking-wide mb-0.5">{label}</p>
    <p className="text-xl font-serif font-semibold text-text-main tracking-tight">{value}</p>
  </div>
);

export default StatCard;
