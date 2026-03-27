/**
 * CategoryChart — 分类分布水平条形图组件
 * 展示各学科领域的论文占比，用于 Account 页面
 */

import React from 'react';
import { DailyData } from '../types';

interface CategoryChartProps {
  data: DailyData[];
  title: string;
  subtitle: string;
}

const CategoryChart: React.FC<CategoryChartProps> = ({ data, title, subtitle }) => (
  <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
    <div className="flex items-center justify-between mb-3">
      <div>
        <h3 className="font-semibold text-text-main text-xs">{title}</h3>
        <p className="text-[10px] text-text-secondary">{subtitle}</p>
      </div>
    </div>

    <div className="flex flex-col gap-3">
      {data.map((item, idx) => (
        <div key={item.day} className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[10px]">
            <span className="font-semibold text-text-main">{item.day}</span>
            <span className="font-bold text-primary">{item.value}%</span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
              style={{ 
                width: `${item.value}%`,
                background: `linear-gradient(90deg, #8B5CF6 ${idx % 2 === 0 ? '0%' : '100%'}, #A78BFA 100%)`
              }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default CategoryChart;
