/**
 * StatCard — 单个统计卡片组件
 * 展示一个统计指标（数值 + 趋势 + 图标），用于 Account 页面
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
  <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm hover:shadow-md transition-all duration-200 group">
    <div className="flex items-center justify-between mb-2">
      <div className={`p-1.5 rounded-lg ${color} group-hover:scale-110 transition-transform duration-200`}>
        {icon}
      </div>
      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
        trend.startsWith('+') ? 'text-emerald-600 bg-emerald-50' : 'text-red-500 bg-red-50'
      }`}>
        {trend}
      </span>
    </div>
    <p className="text-[9px] text-text-secondary font-semibold uppercase tracking-wide mb-0.5">{label}</p>
    <p className="text-xl font-black text-text-main tracking-tight">{value}</p>
  </div>
);

export default StatCard;
