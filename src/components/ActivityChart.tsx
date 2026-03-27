/**
 * ActivityChart — 周活动趋势 SVG 面积图组件
 * 展示每日论文索引量的折线 + 面积图，用于 Account 页面
 */

import React from 'react';
import { DailyData } from '../types';

interface ActivityChartProps {
  data: DailyData[];
  title: string;
  subtitle: string;
}

const ActivityChart: React.FC<ActivityChartProps> = ({ data, title, subtitle }) => (
  <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
    <div className="flex items-center justify-between mb-3">
      <div>
        <h3 className="font-semibold text-text-main text-xs">{title}</h3>
        <p className="text-[10px] text-text-secondary">{subtitle}</p>
      </div>
      <div className="px-2 py-1 bg-primary/5 rounded-lg">
        <span className="text-[10px] font-bold text-primary">{data.reduce((a, b) => a + b.value, 0).toLocaleString()}</span>
      </div>
    </div>

    <div className="h-36 w-full relative">
      <svg className="w-full h-full overflow-visible" viewBox="0 0 700 200" preserveAspectRatio="none">
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {[0, 50, 100, 150].map(y => (
          <line key={y} x1="0" y1={y} x2="700" y2={y} stroke="#f1f1f1" strokeWidth="1" />
        ))}

        <path
          d={`M 0 200 ${data.map((d, i) => `L ${i * 100} ${200 - (d.value / 800) * 180}`).join(' ')} L ${(data.length - 1) * 100} 200 Z`}
          fill="url(#areaGradient)"
        />

        <path
          d={`M 0 ${200 - (data[0].value / 800) * 180} ${data.map((d, i) => `L ${i * 100} ${200 - (d.value / 800) * 180}`).join(' ')}`}
          fill="none"
          stroke="#8B5CF6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {data.map((d, i) => (
          <circle
            key={i}
            cx={i * 100}
            cy={200 - (d.value / 800) * 180}
            r="4"
            fill="#fff"
            stroke="#8B5CF6"
            strokeWidth="2"
            className="hover:r-6 cursor-pointer transition-all duration-200"
          />
        ))}
      </svg>

      <div className="flex justify-between mt-2 px-1">
        {data.map(d => (
          <span key={d.day} className="text-[9px] font-semibold text-text-secondary uppercase tracking-wide">{d.day}</span>
        ))}
      </div>
    </div>
  </div>
);

export default ActivityChart;
