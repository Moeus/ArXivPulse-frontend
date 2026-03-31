/**
 * PaperCard — 论文卡片组件
 * 設計：精致的"咖啡品鉴卡"风格 — 轻微弥散阴影 + 细线描边
 *
 * 接收 paperId，从 paperStore.paperMap 中取完整数据渲染。
 */

import React, { useEffect, useState } from 'react';
import { ViewMode } from '../types';
import { useAppStore } from '../store/appStore';
import { usePaperStore } from '../store/paperStore';
import { useTranslation } from 'react-i18next';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import  * as  api  from "../service/api"
import toast from 'react-hot-toast';
interface PaperCardProps {
  paperId: string;
}

const PaperCard: React.FC<PaperCardProps> = ({ paperId }) => {
  const setView = useAppStore(state => state.setView);
  const { setBookmark, setSelectedPaper, paperMap } = usePaperStore();
  const { t, i18n } = useTranslation();
  const [isBookmark, setIsBookmark] = useState(false);
  const [loading, setLoading] = useState(false);
  const paper = paperMap[paperId];
  useEffect(()=>{
    setIsBookmark(paper.isBookmarked)
  },[paper])

  if (!paper) return null;

  // 根据当前语言选择摘要
  const abstract = paper.abstractText
    ? (i18n.language.startsWith('zh') ? paper.abstractText.ch : paper.abstractText.en)
    : '';

  const handleCardClick = () => {
    setSelectedPaper(paper);
    setView(ViewMode.PaperDetail);
  };
    
  /**
   * 处理收藏/取消收藏逻辑
   * @param {string|number} paperId - 论文唯一标识
   */
  const handleToggleBookmark = async (paperId) => {
    const isAdding = !isBookmark; 
    if (loading) return; 
    setLoading(true);
    try {
      const res = isAdding 
        ? await api.addFavorite(paperId) 
        : await api.removeFavorite(paperId);

      if (res && res.code === 200) {
        toast.success(res.message || (isAdding ? '收藏成功' : '已取消收藏'));
        setIsBookmark(isAdding);
        // 同步到全局状态
        setBookmark(paperId, isAdding);
      } else {
        toast.error(res.message || '操作失败');
      }
    } catch (error) {
      console.error('收藏接口调用异常:', error);
      toast.error('网络请求失败，请检查网络连接');
    }
    setLoading(false);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white/80 backdrop-blur-sm border border-border-light rounded-2xl p-6 shadow-warm-sm hover:shadow-warm hover:border-primary/20 transition-all duration-300 group cursor-pointer animate-slide-up"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex gap-2 mb-1 flex-wrap items-center">
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
            handleToggleBookmark(paperId)
          }}
          className={`transition-all duration-200 p-1.5 rounded-lg hover:bg-primary/5 ${isBookmark ? 'text-primary' : 'text-text-muted hover:text-primary'}`}
        >
          {isBookmark ? <BookmarkCheck className="fill-current" size={20} /> : <Bookmark size={20} />}
        </button>
      </div>

      <h3 className="text-lg font-serif font-semibold text-text-main mb-3 leading-snug group-hover:text-primary transition-colors duration-200">
        {paper.title}
      </h3>

      <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
        {abstract}
      </p>

      <div className="flex items-center justify-between border-t border-border-light pt-4 mt-auto">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-text-main">
          <span className="font-medium text-xs text-text-secondary">{paper.authors.join(', ')}</span>
        </div>
        <span className="text-[10px] text-text-muted font-mono bg-background-warm px-2 py-1 rounded-lg hidden sm:inline-block">
          {paper.publishedDate}
        </span>
      </div>
    </div>
  );
};

export default PaperCard;
