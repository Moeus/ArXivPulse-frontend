/**
 * StatCard — 单个统计卡片组件
 * 展示一个统计指标（数值 + 趋势 + 图标），用于 Dashboard 页面
 *
 * Props:
 *   stat — 统计数据对象 { label, value, trend, icon, color }
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
  <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-2 rounded-xl ${color}`}>
        {icon}
      </div>
      <span className={`text-xs font-bold px-2 py-1 rounded-full ${
        trend.startsWith('+') ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
      }`}>
        {trend}
      </span>
    </div>
    <p className="text-text-secondary text-xs font-semibold uppercase tracking-wider">{label}</p>
    <p className="text-2xl font-black text-text-main mt-1">{value}</p>
  </div>
);

export default StatCard;
