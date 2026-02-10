/**
 * Library — 收藏论文页面
 * 展示用户已收藏（bookmark）的论文列表
 * 无收藏时显示 EmptyState 空状态
 */

import React, { useMemo } from 'react';
import { ViewMode } from '../types';
import { useStore } from '../store/useStore';
import { useT } from '../i18n';
import PaperCard from '../components/PaperCard';
import EmptyState from '../components/EmptyState';
import { Bookmark } from 'lucide-react';

const Library: React.FC = () => {
  const { papers, setView } = useStore();
  const { t } = useT();

  /** 从全部论文中过滤出已收藏的 */
  const bookmarkedPapers = useMemo(() => papers.filter(p => p.isBookmarked), [papers]);

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* 页面标题 */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black text-text-main tracking-tight">{t('savedResearch')}</h1>
        <p className="text-text-secondary">{t('savedResearchDesc')}</p>
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
