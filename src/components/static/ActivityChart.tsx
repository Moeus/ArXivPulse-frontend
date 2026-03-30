/**
 * ActivityChart — 周活动趋势 SVG 面积图
 * 設計：書卷氣 — 使用焦糖色替代紫色
 */

import React from 'react';
import { DailyData } from '../../types';

interface ActivityChartProps {
  data: DailyData[];
  title: string;
  subtitle: string;
}

const ActivityChart: React.FC<ActivityChartProps> = ({ data, title, subtitle }) => (
  <div className="bg-white/80 backdrop-blur-sm border border-border-light rounded-xl p-4 shadow-warm-sm">
    <div className="flex items-center justify-between mb-3">
      <div>
        <h3 className="font-serif font-semibold text-text-main text-xs">{title}</h3>
        <p className="text-[10px] text-text-muted">{subtitle}</p>
      </div>
      <div className="px-2 py-1 bg-primary/5 rounded-lg border border-primary/10">
        <span className="text-[10px] font-semibold text-primary">{data.reduce((a, b) => a + b.value, 0).toLocaleString()}</span>
      </div>
    </div>

    <div className="h-36 w-full relative">
      <svg className="w-full h-full overflow-visible" viewBox="0 0 700 200" preserveAspectRatio="none">
        <defs>
          <linearGradient id="areaGradientCoffee" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C48B54" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#C48B54" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {[0, 50, 100, 150].map(y => (
          <line key={y} x1="0" y1={y} x2="700" y2={y} stroke="#E8E4DC" strokeWidth="1" />
        ))}

        <path
          d={`M 0 200 ${data.map((d, i) => `L ${i * 100} ${200 - (d.value / 800) * 180}`).join(' ')} L ${(data.length - 1) * 100} 200 Z`}
          fill="url(#areaGradientCoffee)"
        />

        <path
          d={`M 0 ${200 - (data[0].value / 800) * 180} ${data.map((d, i) => `L ${i * 100} ${200 - (d.value / 800) * 180}`).join(' ')}`}
          fill="none"
          stroke="#C48B54"
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
            fill="#F7F6F3"
            stroke="#C48B54"
            strokeWidth="2"
            className="hover:r-6 cursor-pointer transition-all duration-200"
          />
        ))}
      </svg>

      <div className="flex justify-between mt-2 px-1">
        {data.map(d => (
          <span key={d.day} className="text-[9px] font-medium text-text-muted uppercase tracking-wide">{d.day}</span>
        ))}
      </div>
    </div>
  </div>
);

export default ActivityChart;
