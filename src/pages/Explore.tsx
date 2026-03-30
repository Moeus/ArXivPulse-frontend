/**
 * Explore — 论文探索页面
 * 設計：書卷氣 — 柔和的排版、温暖的色调
 * 数据来源：后端 API（推荐 / 搜索）
 */

import React, { useEffect, useCallback, useRef } from 'react';
import { Paper, ViewMode } from '../types';
import { useAppStore } from '../store/appStore';
import { usePaperStore } from '../store/paperStore';
import { useTranslation } from 'react-i18next';
import { Coffee, Loader } from 'lucide-react';

// 可复用组件
import PaperCard from '../components/PaperCard';
import FeaturedPaper from '../components/FeaturedPaper';
import CategoryGrid from '../components/CategoryGrid';
import SearchBar from '../components/SearchBar';
import EmptyState from '../components/EmptyState';

const Explore: React.FC = () => {
  const { searchQuery, setSearchQuery, activeFilter, setActiveFilter, setView } = useAppStore();
  const { papers, isLoading, fetchRecommendations, fetchSearch, setSelectedPaper, fetchFavorites } = usePaperStore();
  const { t } = useTranslation();
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const initialLoadDone = useRef(false);

  // 初始加载：获取收藏 + 推荐
  useEffect(() => {
    if (!initialLoadDone.current) {
      initialLoadDone.current = true;
      fetchFavorites();
      if (!searchQuery) {
        fetchRecommendations(1);
      } else {
        fetchSearch(searchQuery, 1);
      }
    }
  }, []);

  // 搜索防抖
  useEffect(() => {
    if (!initialLoadDone.current) return;
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      if (searchQuery.trim()) {
        fetchSearch(searchQuery.trim(), 1);
      } else {
        fetchRecommendations(1);
      }
    }, 500);
    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, [searchQuery]);

  /** 过滤：分类筛选仍在前端做（API 不支持按 category 过滤，category 字段用于展示） */
  const filteredPapers = activeFilter !== 'All'
    ? papers.filter(p => p.category.toLowerCase().includes(activeFilter.toLowerCase()))
    : papers;

  /** 精选论文 */
  const featuredPaper = filteredPapers[0];

  /** 点击论文卡片 */
  const handlePaperClick = (p: Paper) => {
    setSelectedPaper(p);
    setView(ViewMode.PaperDetail);
  };

  /** 重置筛选 */
  const handleReset = () => {
    setSearchQuery('');
    setActiveFilter('All');
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in pb-12">
      {/* 精选论文 Hero 卡片 */}
      {!searchQuery && featuredPaper && (
        <FeaturedPaper paper={featuredPaper} onRead={() => handlePaperClick(featuredPaper)} />
      )}

      {/* 分类网格筛选器 */}
      <CategoryGrid activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      {/* 论文列表区域 */}
      <section className="flex flex-col gap-6">
        {/* 标题 + 搜索栏 */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-light pb-4">
          <div>
            <h3 className="text-lg font-serif font-semibold text-text-main">{t('discoveryFeed')}</h3>
            <p className="text-xs text-text-muted font-medium mt-0.5">
              {activeFilter === 'All'
                ? t('browsingGlobal')
                : t('browsingFiltered').replace('{filter}', activeFilter)}
            </p>
          </div>
          <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder={t('filterPlaceholder')} />
        </div>

        {/* 加载中 */}
        {isLoading && (
          <div className="flex items-center justify-center py-16 gap-3 text-text-muted">
            <Loader size={20} className="animate-spin text-primary" />
            <span className="text-sm font-medium">{t('loading') || '加载中...'}</span>
          </div>
        )}

        {/* 论文卡片网格 */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
        )}
      </section>
    </div>
  );
};

export default Explore;
