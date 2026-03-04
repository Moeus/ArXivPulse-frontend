/**
 * PaperCard — 论文卡片组件
 * 展示论文的分类标签、标题、摘要、作者和发布日期
 * 支持收藏切换和 AI 摘要展开功能
 * 点击卡片跳转到 PaperDetail 页面
 */

import React, { useState } from 'react';
import { Paper, ViewMode } from '../types';
import { useStore } from '../store/useStore';
import { useTranslation } from 'react-i18next';
import { Bookmark, BookmarkCheck, Sparkles } from 'lucide-react';

interface PaperCardProps {
  paper: Paper;
}

const PaperCard: React.FC<PaperCardProps> = ({ paper }) => {
  const { toggleBookmark, setSelectedPaper, setView } = useStore();
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

  const getCategoryColor = (cat: string) => {
    if (cat.startsWith('cs')) return 'bg-purple-100 text-primary';
    if (cat.startsWith('physics')) return 'bg-blue-100 text-blue-700';
    if (cat.startsWith('math')) return 'bg-orange-100 text-orange-700';
    if (cat.startsWith('q-bio')) return 'bg-green-100 text-green-700';
    return 'bg-gray-100 text-gray-700';
  };

  const handleCardClick = () => {
    setSelectedPaper(paper);
    setView(ViewMode.PaperDetail);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group cursor-pointer animate-slide-up"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex gap-2 mb-2 flex-wrap">
          <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${getCategoryColor(paper.category)}`}>
            {paper.category}
          </span>
          <span className="px-2.5 py-1 rounded-md bg-gray-900 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 text-xs font-bold tracking-wide">
            {paper.journal}
          </span>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            toggleBookmark(paper.id);
          }}
          className={`transition-colors p-1 ${paper.isBookmarked ? 'text-primary' : 'text-text-secondary hover:text-primary'}`}
        >
          {paper.isBookmarked ? <BookmarkCheck className="fill-current" size={24} /> : <Bookmark size={24} />}
        </button>
      </div>

      <h3 className="text-xl font-bold text-text-main mb-2 leading-tight group-hover:text-primary transition-colors">
        {paper.title}
      </h3>
      
      <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
        {paper.abstract}
      </p>

      {showSummary && (
        <div className="mb-4 p-4 bg-primary/5 rounded-lg border border-primary/10 animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="text-primary" size={18} />
            <span className="text-xs font-bold text-primary uppercase tracking-wider">{t('geminiAiInsights')}</span>
          </div>
          {loading ? (
            <div className="flex items-center gap-3 text-text-secondary text-sm italic py-2">
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              {t('analyzingResearch')}
            </div>
          ) : (
            <p className="text-sm text-text-main leading-relaxed">
              {aiSummary}
            </p>
          )}
        </div>
      )}

      <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-text-main">
          <span className="font-medium whitespace-nowrap">{paper.authors.join(', ')}</span>
          <button 
            onClick={handleAiInsights}
            className="text-xs font-bold text-primary flex items-center gap-1 hover:underline"
          >
            <Sparkles size={14} />
            {showSummary ? t('hide') : t('explain')}
          </button>
        </div>
        <span className="text-xs text-text-secondary font-mono bg-gray-50 px-2 py-1 rounded hidden sm:inline-block">
          {paper.publishedDate}
        </span>
      </div>
    </div>
  );
};

export default PaperCard;
