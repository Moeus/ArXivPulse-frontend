/**
 * CategoryGrid — 分类网格筛选组件
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Brain, Atom, Calculator, Dna } from 'lucide-react';

/** 分类配置 — 使用温暖的色调 */
const CATEGORIES = [
  { id: 'cs', nameKey: 'categoryAiCs' as const, icon: Brain, color: 'text-amber-700', bg: 'bg-amber-50' },
  { id: 'physics', nameKey: 'categoryPhysics' as const, icon: Atom, color: 'text-cambridge', bg: 'bg-cambridge/8' },
  { id: 'math', nameKey: 'categoryMath' as const, icon: Calculator, color: 'text-primary-dark', bg: 'bg-primary/8' },
  { id: 'q-bio', nameKey: 'categoryBiology' as const, icon: Dna, color: 'text-emerald-700', bg: 'bg-emerald-50' },
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
        <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted font-sans">
          {t('exploreByDomain')}
        </h3>
        {activeFilter !== 'All' && (
          <button
            onClick={() => onFilterChange('All')}
            className="text-[11px] font-medium text-primary hover:underline underline-offset-2"
          >
            {t('clearSelection')}
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => {
                if (activeFilter === cat.id) onFilterChange('All');
                else onFilterChange(cat.id);
              }}
              className={`flex flex-col items-center justify-center p-5 rounded-2xl border transition-all duration-200 gap-3 group ${
                activeFilter === cat.id
                  ? 'bg-primary/5 border-primary/20 shadow-warm-sm'
                  : 'bg-white/60 backdrop-blur-sm border-border-light hover:border-primary/20 hover:shadow-warm-sm'
              }`}
            >
              <div className={`w-11 h-11 rounded-xl ${cat.bg} flex items-center justify-center transition-transform duration-200 group-hover:scale-110`}>
                <Icon className={cat.color} size={20} />
              </div>
              <span className={`text-[11px] font-semibold uppercase tracking-wider ${activeFilter === cat.id ? 'text-primary' : 'text-text-main'}`}>
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
