/**
 * ActivityChart — 周活动趋势 SVG 面积图组件
 * 展示每日论文索引量的折线 + 面积图，用于 Dashboard 页面
 *
 * Props:
 *   data  — DailyData 数组 [{ day, value }]
 *   title — 图表标题
 *   subtitle — 图表副标题
 */

import React from 'react';
import { DailyData } from '../types';

interface ActivityChartProps {
  data: DailyData[];
  title: string;
  subtitle: string;
}

const ActivityChart: React.FC<ActivityChartProps> = ({ data, title, subtitle }) => (
  <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
    {/* 标题 */}
    <div className="flex items-center justify-between mb-6">
      <h3 className="font-bold text-text-main">{title}</h3>
      <span className="text-xs text-text-secondary font-medium">{subtitle}</span>
    </div>

    {/* SVG 图表 */}
    <div className="h-48 w-full relative group">
      <svg className="w-full h-full overflow-visible" viewBox="0 0 700 200">
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7f13ec" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#7f13ec" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* 网格线 */}
        {[0, 50, 100, 150].map(y => (
          <line key={y} x1="0" y1={y} x2="700" y2={y} stroke="#f1f1f1" strokeWidth="1" />
        ))}

        {/* 面积填充 */}
        <path
          d={`M 0 200 ${data.map((d, i) => `L ${i * 100} ${200 - (d.value / 800) * 180}`).join(' ')} L ${(data.length - 1) * 100} 200 Z`}
          fill="url(#areaGradient)"
        />

        {/* 折线 */}
        <path
          d={`M 0 ${200 - (data[0].value / 800) * 180} ${data.map((d, i) => `L ${i * 100} ${200 - (d.value / 800) * 180}`).join(' ')}`}
          fill="none"
          stroke="#7f13ec"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 数据点 */}
        {data.map((d, i) => (
          <circle
            key={i}
            cx={i * 100}
            cy={200 - (d.value / 800) * 180}
            r="4"
            fill="#fff"
            stroke="#7f13ec"
            strokeWidth="2"
            className="hover:r-6 cursor-pointer transition-all"
          />
        ))}
      </svg>

      {/* 日期标签 */}
      <div className="flex justify-between mt-4">
        {data.map(d => (
          <span key={d.day} className="text-[10px] font-bold text-text-secondary uppercase">{d.day}</span>
        ))}
      </div>
    </div>
  </div>
);

export default ActivityChart;
