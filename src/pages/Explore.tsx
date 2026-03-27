/**
 * Explore — 论文探索页面
 * 功能：精选论文展示、分类筛选、关键词搜索、论文列表
 * 过滤逻辑现在在组件内部使用 useMemo 自管理，不再依赖外部 props
 */

import React, { useMemo } from 'react';
import { Paper, ViewMode } from '../types';
import { useAppStore } from '../store/appStore';
import { usePaperStore } from '../store/paperStore';
import { useTranslation } from 'react-i18next';
import { Coffee } from 'lucide-react';

// 可复用组件
import PaperCard from '../components/PaperCard';
import FeaturedPaper from '../components/FeaturedPaper';
import CategoryGrid from '../components/CategoryGrid';
import SearchBar from '../components/SearchBar';
import EmptyState from '../components/EmptyState';

const Explore: React.FC = () => {
  const { searchQuery, setSearchQuery, activeFilter, setActiveFilter, setView } = useAppStore();
  const { papers, setSelectedPaper } = usePaperStore();
  const { t } = useTranslation();

  /** 根据搜索关键词和分类筛选计算过滤后的论文列表 */
  const filteredPapers = useMemo(() => {
    let result = papers;

    // 按分类筛选
    if (activeFilter !== 'All') {
      result = result.filter(p =>
        p.category.toLowerCase().includes(activeFilter.toLowerCase())
      );
    }

    // 按关键词搜索（标题、摘要、作者）
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.abstract.toLowerCase().includes(q) ||
        p.authors.some(a => a.toLowerCase().includes(q))
      );
    }

    return result;
  }, [papers, searchQuery, activeFilter]);

  /** 精选论文：列表中的第一篇 */
  const featuredPaper = filteredPapers[0];

  /** 点击论文卡片 → 进入 PaperDetail 页面 */
  const handlePaperClick = (p: Paper) => {
    setSelectedPaper(p);
    setView(ViewMode.PaperDetail);
  };

  /** 重置所有筛选 */
  const handleReset = () => {
    setSearchQuery('');
    setActiveFilter('All');
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in pb-12">
      {/* 精选论文 Hero 卡片（无筛选时显示） */}
      {!searchQuery && featuredPaper && (
        <FeaturedPaper paper={featuredPaper} onRead={() => handlePaperClick(featuredPaper)} />
      )}

      {/* 分类网格筛选器 */}
      <CategoryGrid activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      {/* 论文列表区域 */}
      <section className="flex flex-col gap-6">
        {/* 标题 + 搜索栏 */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-4">
          <div>
            <h3 className="text-xl font-black text-text-main">{t('discoveryFeed')}</h3>
            <p className="text-xs text-text-secondary font-medium">
              {activeFilter === 'All'
                ? t('browsingGlobal')
                : t('browsingFiltered').replace('{filter}', activeFilter)}
            </p>
          </div>
          <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder={t('filterPlaceholder')} />
        </div>

        {/* 论文卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPapers.length > 0 ? (
            filteredPapers.map((paper, idx) => (
              <div key={paper.id} className={`${idx === 0 && !searchQuery ? 'md:col-span-2' : ''}`}>
                <PaperCard paper={paper} />
              </div>
            ))
          ) : (
            <div className="col-span-full">
              <EmptyState
                icon={Coffee}
                message={t('noResearchMatch')}
                actionLabel={t('reset')}
                onAction={handleReset}
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Explore;
