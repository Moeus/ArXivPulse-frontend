/**
 * Library — 收藏论文页面
 * 設計：書卷氣 — "我的书架"
 * 数据来源：后端 Favorites API
 */

import React, { useEffect } from 'react';
import { ViewMode } from '../types';
import { useAppStore } from '../store/appStore';
import { usePaperStore } from '../store/paperStore';
import { useTranslation } from 'react-i18next';
import PaperCard from '../components/PaperCard';
import EmptyState from '../components/EmptyState';
import { Bookmark, Loader } from 'lucide-react';

const Library: React.FC = () => {
  const setView = useAppStore(state => state.setView);
  const { favoritePaperIds, isLoading, fetchFavorites } = usePaperStore();
  const { t } = useTranslation();

  // 进入页面时刷新收藏列表
  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* 页面标题 */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-serif font-semibold text-text-main tracking-tight">{t('savedResearch')}</h1>
        <p className="text-sm text-text-muted">{t('savedResearchDesc')}</p>
      </div>

      {/* 加载中 */}
      {isLoading && (
        <div className="flex items-center justify-center py-16 gap-3 text-text-muted">
          <Loader size={20} className="animate-spin text-primary" />
          <span className="text-sm font-medium">{t('loading') || '加载中...'}</span>
        </div>
      )}

      {/* 论文列表 / 空状态 */}
      {!isLoading && (
        <div className="grid grid-cols-1 gap-4">
          {favoritePaperIds.length > 0 ? (
            favoritePaperIds.map((id) => <PaperCard key={id} paperId={id} />)
          ) : (
            <EmptyState
              icon={Bookmark}
              message={t('libraryEmpty')}
              actionLabel={t('goDiscover')}
              onAction={() => setView(ViewMode.Explore)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Library;
