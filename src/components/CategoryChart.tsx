/**
 * CategoryChart — 分类分布水平条形图
 * 設計：書卷氣 — 焦糖/剑桥灰蓝色渐变替代紫色
 */

import React from 'react';
import { DailyData } from '../types';

interface CategoryChartProps {
  data: DailyData[];
  title: string;
  subtitle: string;
}

const CategoryChart: React.FC<CategoryChartProps> = ({ data, title, subtitle }) => (
  <div className="bg-white/80 backdrop-blur-sm border border-border-light rounded-xl p-4 shadow-warm-sm">
    <div className="flex items-center justify-between mb-3">
      <div>
        <h3 className="font-serif font-semibold text-text-main text-xs">{title}</h3>
        <p className="text-[10px] text-text-muted">{subtitle}</p>
      </div>
    </div>

    <div className="flex flex-col gap-3">
      {data.map((item, idx) => (
        <div key={item.day} className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[10px]">
            <span className="font-medium text-text-main">{item.day}</span>
            <span className="font-semibold text-primary">{item.value}%</span>
          </div>
          <div className="h-2 w-full bg-background-warm rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{ 
                width: `${item.value}%`,
                background: `linear-gradient(90deg, #C48B54 0%, ${idx % 2 === 0 ? '#D4A574' : '#5C6B7B'} 100%)`
              }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default CategoryChart;
