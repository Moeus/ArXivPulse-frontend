/**
 * Library — 收藏论文页面
 * 設計：書卷氣 — "我的书架"
 */

import React, { useMemo } from 'react';
import { ViewMode } from '../types';
import { useAppStore } from '../store/appStore';
import { usePaperStore } from '../store/paperStore';
import { useTranslation } from 'react-i18next';
import PaperCard from '../components/PaperCard';
import EmptyState from '../components/EmptyState';
import { Bookmark } from 'lucide-react';

const Library: React.FC = () => {
  const setView = useAppStore(state => state.setView);
  const papers = usePaperStore(state => state.papers);
  const { t } = useTranslation();

  /** 过滤已收藏论文 */
  const bookmarkedPapers = useMemo(() => papers.filter(p => p.isBookmarked), [papers]);

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* 页面标题 */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-serif font-semibold text-text-main tracking-tight">{t('savedResearch')}</h1>
        <p className="text-sm text-text-muted">{t('savedResearchDesc')}</p>
      </div>

      {/* 论文列表 / 空状态 */}
      <div className="grid grid-cols-1 gap-4">
        {bookmarkedPapers.length > 0 ? (
          bookmarkedPapers.map(paper => <PaperCard key={paper.id} paper={paper} />)
        ) : (
          <EmptyState
            icon={Bookmark}
            message={t('libraryEmpty')}
            actionLabel={t('goDiscover')}
            onAction={() => setView(ViewMode.Explore)}
          />
        )}
      </div>
    </div>
  );
};

export default Library;
