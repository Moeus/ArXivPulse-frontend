/**
 * PaperDetail — 论文详情页面
 * 設計：書卷氣 — 温暖的卡片、衬线标题、AI 品鉴师面板
 */

import React, { useState, useEffect, useRef } from 'react';
import { ViewMode } from '../types';
import { GoogleGenAI } from '@google/genai';
import { useAppStore } from '../store/appStore';
import { usePaperStore } from '../store/paperStore';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ExternalLink, Bookmark, BookmarkCheck, FileText, Sparkles, Coffee, X, ChevronDown, ArrowUp, Loader } from 'lucide-react';

const PaperDetail: React.FC = () => {
  const { setView, previousView } = useAppStore();
  const { selectedPaper: paper, toggleBookmark } = usePaperStore();
  const { t, i18n } = useTranslation();
  
  // 根据当前语言选择展示的摘要
  const abstract = paper?.abstractText
    ? (i18n.language.startsWith('zh') ? paper.abstractText.ch : paper.abstractText.en)
    : '';
  
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);


  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };


  if (!paper) return null;

  return (
    <div className="flex flex-col h-full relative">
      {/* 顶部导航返回栏 */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => setView(previousView || ViewMode.Explore)}
          className="group flex items-center gap-2 text-text-muted hover:text-primary transition-colors focus:outline-none"
        >
          <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
          <span className="text-xs font-medium uppercase tracking-widest">{t('back')}</span>
        </button>

        {/* Action Bar */}
        <div className="flex items-center gap-2">
            <a 
              href={paper.link || `https://arxiv.org/abs/${paper.id}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-background-warm border border-border-light text-text-secondary hover:border-primary/20 hover:text-primary transition-all text-xs font-medium"
            >
              <ExternalLink size={14} />
              {t('viewOnArxiv')}
            </a>
            <button 
              onClick={() => toggleBookmark(paper.id)}
              className={`p-2 rounded-xl border transition-all duration-200 ${
                paper.isBookmarked 
                  ? 'bg-primary/8 border-primary/20 text-primary' 
                  : 'bg-background-warm border-border-light text-text-muted hover:border-primary/20 hover:text-primary'
              }`}
            >
              {paper.isBookmarked ? <BookmarkCheck className="fill-current" size={18} /> : <Bookmark size={18} />}
            </button>
        </div>
      </div>

      {/* 论文内容区域 */}
      <div className="flex-1 overflow-y-auto pb-32 lg:pb-0">
        <div className="max-w-4xl mx-auto flex flex-col gap-8 animate-fade-in">
          
          {/* Header Section */}
          <header className="flex flex-col gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              {/* 药丸形分类标签 */}
              <span className="px-3 py-1 rounded-full bg-cambridge/10 text-cambridge text-[10px] font-semibold uppercase tracking-widest">
                {paper.category}
              </span>
              <span className="text-primary-dark text-xs font-serif italic tracking-wide">
                {paper.journal}
              </span>
              <span className="w-1 h-1 rounded-full bg-border-subtle" />
              <span className="text-xs text-text-muted font-medium">{t('publishedOn')} {paper.publishedDate}</span>
            </div>
            
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-semibold text-text-main leading-tight tracking-tight">
              {paper.title}
            </h1>

            <div className="flex flex-wrap gap-2 items-center mt-1">
              {paper.authors.map(author => (
                <span key={author} className="text-sm font-medium text-text-secondary bg-background-warm px-3 py-1.5 rounded-lg border border-border-light hover:border-primary/20 transition-colors cursor-default">
                  {author}
                </span>
              ))}
            </div>
          </header>

          <hr className="border-border-light" />

          {/* Abstract Section */}
          <section>
            <h2 className="text-xs font-sans font-semibold uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
              <FileText size={15} />
              {t('abstract')}
            </h2>
            <p className="text-base md:text-lg text-text-main leading-relaxed font-sans opacity-90 text-justify">
              {abstract}
            </p>
          </section>

          {/* Mobile: View on ArXiv */}
          <div className="sm:hidden pt-4">
              <a 
              href={paper.link || `https://arxiv.org/abs/${paper.id}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-background-warm border border-border-light text-text-main font-medium hover:border-primary/20 transition-colors"
            >
              <span>{t('viewOnArxiv')}</span>
              <ExternalLink size={16} />
            </a>
          </div>

        </div>
      </div>

    </div>
  );
};

export default PaperDetail;
