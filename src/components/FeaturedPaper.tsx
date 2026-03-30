/**
 * FeaturedPaper — 精选论文 Hero 卡片组件
 * 設計：書卷氣 — 深色咖啡底色的精选推荐卡片
 */

import React from 'react';
import { Paper } from '../types';
import { usePaperStore } from '../store/paperStore';
import { useTranslation } from 'react-i18next';
import { Sparkles, ArrowRight, Bookmark, BookmarkCheck, Clock } from 'lucide-react';

interface FeaturedPaperProps {
  paper: Paper;
  onRead: () => void;
}

const FeaturedPaper: React.FC<FeaturedPaperProps> = ({ paper, onRead }) => {
  const toggleBookmark = usePaperStore(state => state.toggleBookmark);
  const { t, i18n } = useTranslation();

  // 根据当前语言选择摘要
  const abstract = paper.abstractText
    ? (i18n.language.startsWith('zh') ? paper.abstractText.ch : paper.abstractText.en)
    : '';

  return (
    <section className="relative overflow-hidden rounded-2xl bg-background-dark text-white p-8 md:p-10 shadow-warm-xl">
      {/* Warm decorative gradients */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-cambridge/6 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-5 max-w-2xl">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-cambridge/20 text-white/80 text-[10px] font-semibold uppercase tracking-widest border border-cambridge/20">
            {t('featuredResearch')}
          </span>
          <span className="flex items-center gap-1 text-white/40 text-[10px] font-medium">
            <Clock size={10} />
            ⏱ 3 Min Read
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-semibold leading-snug tracking-tight text-white/95">
          {paper.title}
        </h2>

        <p className="text-white/50 line-clamp-2 text-sm leading-relaxed font-sans">
          {abstract}
        </p>

        <div className="flex items-center gap-2 text-white/40 text-xs">
          <span className="font-medium">{paper.authors.join(', ')}</span>
          <span className="text-white/20">·</span>
          <span>{paper.publishedDate}</span>
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-1">
          <button
            onClick={onRead}
            className="group bg-primary text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-primary-dark transition-all duration-200 flex items-center gap-2 shadow-warm shadow-primary/20"
          >
            {t('readAbstract')}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => toggleBookmark(paper.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border font-medium text-sm transition-all duration-200 ${
              paper.isBookmarked 
                ? 'bg-primary/15 border-primary/30 text-primary' 
                : 'border-white/15 text-white/60 hover:bg-white/5 hover:border-white/25'
            }`}
          >
            {paper.isBookmarked ? <BookmarkCheck className="fill-current" size={18} /> : <Bookmark size={18} />}
            {paper.isBookmarked ? t('saved') : t('save')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPaper;
