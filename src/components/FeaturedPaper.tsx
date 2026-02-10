/**
 * FeaturedPaper — 精选论文 Hero 卡片组件
 * 在 Explore 页面顶部展示第一篇论文的大幅推荐卡片
 *
 * Props:
 *   paper    — 要展示的论文对象
 *   onRead   — "阅读摘要"按钮回调
 */

import React from 'react';
import { Paper } from '../types';
import { useStore } from '../store/useStore';
import { useT } from '../i18n';
import { Sparkles, ArrowRight, Bookmark, BookmarkCheck } from 'lucide-react';

interface FeaturedPaperProps {
  paper: Paper;
  onRead: () => void;
}

const FeaturedPaper: React.FC<FeaturedPaperProps> = ({ paper, onRead }) => {
  const { toggleBookmark } = useStore();
  const { t } = useT();

  return (
    <section className="relative overflow-hidden rounded-3xl bg-background-dark text-white p-8 md:p-12 shadow-2xl shadow-primary/20">
      {/* 装饰图标 */}
      <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
        <Sparkles size={120} />
      </div>

      <div className="relative z-10 flex flex-col gap-4 max-w-2xl">
        <div className="flex items-center gap-2">
          <span className="bg-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
            {t('featuredResearch')}
          </span>
        </div>

        <h2 className="text-2xl md:text-4xl font-black leading-tight tracking-tight">
          {paper.title}
        </h2>

        <p className="text-white/70 line-clamp-2 text-sm md:text-base leading-relaxed">
          {paper.abstract}
        </p>

        <div className="flex flex-wrap items-center gap-4 mt-2">
          <button
            onClick={onRead}
            className="bg-white text-background-dark px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-primary-light transition-colors flex items-center gap-2"
          >
            {t('readAbstract')}
            <ArrowRight size={18} />
          </button>
          <button
            onClick={() => toggleBookmark(paper.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/20 font-bold text-sm hover:bg-white/10 transition-all ${
              paper.isBookmarked ? 'bg-primary/20 border-primary/50' : ''
            }`}
          >
            {paper.isBookmarked ? <BookmarkCheck className="fill-current" size={20} /> : <Bookmark size={20} />}
            {paper.isBookmarked ? t('saved') : t('save')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPaper;
