/**
 * CategoryGrid — 分类网格筛选组件
 * 展示可点击的分类卡片（AI/CS、Physics、Math、Biology）
 * 用户点击后切换 activeFilter
 *
 * Props:
 *   activeFilter    — 当前激活的筛选分类
 *   onFilterChange  — 筛选变化回调
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Brain, Atom, Calculator, Dna } from 'lucide-react';

/** 分类配置 */
const CATEGORIES = [
  { id: 'cs', nameKey: 'categoryAiCs' as const, icon: Brain, color: 'text-purple-600', bg: 'bg-purple-50' },
  { id: 'physics', nameKey: 'categoryPhysics' as const, icon: Atom, color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 'math', nameKey: 'categoryMath' as const, icon: Calculator, color: 'text-orange-600', bg: 'bg-orange-50' },
  { id: 'q-bio', nameKey: 'categoryBiology' as const, icon: Dna, color: 'text-green-600', bg: 'bg-green-50' },
];

interface CategoryGridProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ activeFilter, onFilterChange }) => {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-black uppercase tracking-widest text-text-secondary">
          {t('exploreByDomain')}
        </h3>
        {activeFilter !== 'All' && (
          <button
            onClick={() => onFilterChange('All')}
            className="text-xs font-bold text-primary hover:underline"
          >
            {t('clearSelection')}
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => {
                if (activeFilter === cat.id)
                  {
                    onFilterChange('All')
                  }
                else
                  {
                    onFilterChange(cat.id)
                  }
              }}
              className={`flex flex-col items-center justify-center p-6 rounded-2xl border transition-all gap-3 group ${
                activeFilter === cat.id
                  ? 'bg-primary/5 border-primary shadow-inner'
                  : 'bg-white border-gray-100 hover:border-primary/30 hover:shadow-md'
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl ${cat.bg} flex items-center justify-center transition-transform group-hover:scale-110`}>
                <Icon className={cat.color} size={24} />
              </div>
              <span className={`text-xs font-black uppercase tracking-tight ${activeFilter === cat.id ? 'text-primary' : 'text-text-main'}`}>
                {t(cat.nameKey)}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryGrid;
