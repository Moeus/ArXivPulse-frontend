/**
 * PaperCard — 论文卡片组件
 * 設計：精致的"咖啡品鉴卡"风格 — 轻微弥散阴影 + 细线描边
 */

import React, { useState } from 'react';
import { Paper, ViewMode } from '../types';
import { useAppStore } from '../store/appStore';
import { usePaperStore } from '../store/paperStore';
import { useTranslation } from 'react-i18next';
import { Bookmark, BookmarkCheck, Sparkles, Clock } from 'lucide-react';

interface PaperCardProps {
  paper: Paper;
}

const PaperCard: React.FC<PaperCardProps> = ({ paper }) => {
  const setView = useAppStore(state => state.setView);
  const { toggleBookmark, setSelectedPaper } = usePaperStore();
  const { t } = useTranslation();
  const [showSummary, setShowSummary] = useState(false);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAiInsights = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (aiSummary) {
      setShowSummary(!showSummary);
      return;
    }
    setLoading(true);
    setShowSummary(true);
    // const summary = await geminiService.summarizePaper(paper);
    // setAiSummary(summary);
    setLoading(false);
  };

  const handleCardClick = () => {
    setSelectedPaper(paper);
    setView(ViewMode.PaperDetail);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white/80 backdrop-blur-sm border border-border-light rounded-2xl p-6 shadow-warm-sm hover:shadow-warm hover:border-primary/20 transition-all duration-300 group cursor-pointer animate-slide-up"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex gap-2 mb-1 flex-wrap items-center">
          {/* 药丸形标签 — 剑桥灰蓝底色，像咖啡豆轮廓 */}
          <span className="px-2.5 py-1 rounded-full bg-cambridge/10 text-cambridge text-[10px] font-semibold tracking-wider uppercase">
            {paper.category}
          </span>
          <span className="text-primary-dark text-xs font-serif italic tracking-wide opacity-70">
            {paper.journal}
          </span>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            toggleBookmark(paper.id);
          }}
          className={`transition-all duration-200 p-1.5 rounded-lg hover:bg-primary/5 ${paper.isBookmarked ? 'text-primary' : 'text-text-muted hover:text-primary'}`}
        >
          {paper.isBookmarked ? <BookmarkCheck className="fill-current" size={20} /> : <Bookmark size={20} />}
        </button>
      </div>

      <h3 className="text-lg font-serif font-semibold text-text-main mb-3 leading-snug group-hover:text-primary transition-colors duration-200">
        {paper.title}
      </h3>
      
      <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
        {paper.abstract}
      </p>

      {showSummary && (
        <div className="mb-4 p-4 bg-primary/5 rounded-xl border border-primary/10 animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="text-primary" size={14} />
            <span className="text-[10px] font-serif font-semibold text-primary uppercase tracking-wider">{t('geminiAiInsights')}</span>
          </div>
          {loading ? (
            <div className="flex items-center gap-3 text-primary text-sm font-medium py-3">
              {/* 咖啡滴漏加载动画 */}
              <div className="flex gap-1">
                <div className="w-1 h-1 rounded-full bg-primary animate-drip" />
                <div className="w-1 h-1 rounded-full bg-primary animate-drip" style={{ animationDelay: '0.3s' }} />
                <div className="w-1 h-1 rounded-full bg-primary animate-drip" style={{ animationDelay: '0.6s' }} />
              </div>
              <span className="font-serif italic text-xs">{t('analyzingResearch')}</span>
            </div>
          ) : (
            <p className="text-sm text-text-main leading-relaxed">
              {aiSummary}
            </p>
          )}
        </div>
      )}

      <div className="flex items-center justify-between border-t border-border-light pt-4 mt-auto">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-text-main">
          <span className="font-medium text-xs text-text-secondary">{paper.authors.join(', ')}</span>
          <button 
            onClick={handleAiInsights}
            className="text-[11px] font-semibold text-primary flex items-center gap-1 hover:underline underline-offset-2"
          >
            <Sparkles size={12} />
            {showSummary ? t('hide') : t('explain')}
          </button>
        </div>
        <span className="text-[10px] text-text-muted font-mono bg-background-warm px-2 py-1 rounded-lg hidden sm:inline-block">
          {paper.publishedDate}
        </span>
      </div>
    </div>
  );
};

export default PaperCard;
