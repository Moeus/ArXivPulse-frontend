/**
 * CategoryChart — 分类分布水平条形图组件
 * 展示各学科领域的论文占比，用于 Dashboard 页面
 *
 * Props:
 *   data     — DailyData 数组（day 作为分类名，value 作为百分比）
 *   title    — 图表标题
 *   subtitle — 图表副标题
 */

import React from 'react';
import { DailyData } from '../types';

interface CategoryChartProps {
  data: DailyData[];
  title: string;
  subtitle: string;
}

const CategoryChart: React.FC<CategoryChartProps> = ({ data, title, subtitle }) => (
  <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
    {/* 标题 */}
    <div className="flex items-center justify-between mb-6">
      <h3 className="font-bold text-text-main">{title}</h3>
      <span className="text-xs text-text-secondary font-medium">{subtitle}</span>
    </div>

    {/* 条形图列表 */}
    <div className="flex flex-col gap-4">
      {data.map((item) => (
        <div key={item.day} className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-tight">
            <span className="text-text-main">{item.day}</span>
            <span className="text-text-secondary">{item.value}%</span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${item.value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default CategoryChart;
