/**
 * PaperDetail — 论文详情页面
 * 設計：書卷氣 — 温暖的卡片、衬线标题、AI 品鉴师面板
 */

import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage, ViewMode } from '../types';
import { GoogleGenAI } from '@google/genai';
import { useAppStore } from '../store/appStore';
import { usePaperStore } from '../store/paperStore';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ExternalLink, Bookmark, BookmarkCheck, FileText, Sparkles, Coffee, X, ChevronDown, ArrowUp } from 'lucide-react';

const PaperDetail: React.FC = () => {
  const { setView, previousView } = useAppStore();
  const { selectedPaper: paper, toggleBookmark } = usePaperStore();
  const { t } = useTranslation();
  
  const [showAI, setShowAI] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // 初始化欢迎语
  useEffect(() => {
    if (paper && messages.length === 0) {
      setMessages([
        { role: 'model', text: `☕ Hi! I've thoroughly read "${paper.title}". Ask me anything — I'll distill the key insights for you.` }
      ]);
    }
  }, [paper]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (showAI) {
      scrollToBottom();
    }
  }, [messages, showAI]);

  if (!paper) return null;

  const handleSendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const chat = ai.chats.create({
        model: 'gemini-2.0-flash-exp',
        config: {
          systemInstruction: `You are an expert scientific assistant discussing the paper titled "${paper.title}". 
          Abstract: ${paper.abstract}. Be concise, accurate, and helpful.`,
        }
      });

      const response = await chat.sendMessage({ message: userMessage });
      const text = response.text || "I'm sorry, I couldn't process that.";
      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (error) {
      console.error("Chat failed:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error. Please check your API configuration." }]);
    } finally {
      setIsTyping(false);
    }
  };

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
              href={`https://arxiv.org/abs/${paper.id}`} 
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
              {paper.abstract}
            </p>
          </section>

          {/* Mobile: View on ArXiv */}
          <div className="sm:hidden pt-4">
              <a 
              href={`https://arxiv.org/abs/${paper.id}`} 
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

      {/* AI Assistant FAB */}
      <button
        onClick={() => setShowAI(!showAI)}
        className={`fixed z-50 right-6 bottom-24 lg:bottom-10 shadow-warm-xl transition-all duration-300 rounded-2xl flex items-center justify-center
          ${showAI 
            ? 'w-11 h-11 bg-white border border-border-light text-text-muted hover:text-primary' 
            : 'w-13 h-13 bg-primary text-white hover:scale-105 shadow-primary/20'
          }
        `}
        title={t('openAiChat')}
      >
        {showAI ? <X size={20} /> : <Sparkles size={22} />}
      </button>

      {/* AI Assistant Panel */}
      {showAI && (
        <div 
          className="lg:hidden fixed inset-0 bg-coffee/15 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setShowAI(false)}
        />
      )}

      <div className={`
        fixed z-50 bg-paper/95 backdrop-blur-xl shadow-warm-xl transition-all duration-300 ease-out flex flex-col border-l border-border-light
        
        inset-x-0 bottom-0 top-[20%] rounded-t-2xl lg:rounded-none
        transform ${showAI ? 'translate-y-0' : 'translate-y-full'}
        
        lg:inset-y-0 lg:right-0 lg:left-auto lg:top-0 lg:w-[380px] lg:bottom-0
        lg:transform ${showAI ? 'lg:translate-x-0' : 'lg:translate-x-full'}
      `}>
        {/* Panel Header */}
        <div className="p-4 border-b border-border-light flex items-center justify-between bg-white/50 backdrop-blur rounded-t-2xl lg:rounded-none">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-primary/8 flex items-center justify-center">
               <Coffee className="text-primary" size={16} />
            </div>
            <div>
              <h3 className="font-serif font-semibold text-sm text-text-main">{t('aiAssistant')}</h3>
              <p className="text-[10px] text-text-muted font-medium">Powered by Gemini 2.0</p>
            </div>
          </div>
          <button 
            onClick={() => setShowAI(false)} 
            className="lg:hidden p-2 text-text-muted hover:text-text-secondary"
          >
            <ChevronDown size={20} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-background-warm/30 custom-scrollbar">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
              <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-primary text-white rounded-tr-sm shadow-warm-sm' 
                  : 'bg-white text-text-main border border-border-light rounded-tl-sm shadow-warm-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
             <div className="flex justify-start animate-fade-in">
               <div className="bg-white border border-border-light px-4 py-3 rounded-2xl rounded-tl-sm shadow-warm-sm flex gap-1.5 items-center">
                 {/* 咖啡滴漏加载动画 */}
                 <div className="w-1 h-1 bg-primary/40 rounded-full animate-drip" />
                 <div className="w-1 h-1 bg-primary/40 rounded-full animate-drip" style={{ animationDelay: '0.3s' }} />
                 <div className="w-1 h-1 bg-primary/40 rounded-full animate-drip" style={{ animationDelay: '0.6s' }} />
               </div>
             </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-border-light pb-8 lg:pb-4">
          <div className="relative flex items-end gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if(e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder={t('askQuestion')}
              rows={1}
              className="w-full pl-4 pr-12 py-3 bg-background-warm border border-border-light rounded-xl text-sm focus:ring-1 focus:ring-primary/20 focus:border-primary/30 transition-all resize-none max-h-32 min-h-[44px]"
              style={{ fieldSizing: 'content' } as any} 
            />
            <button 
              onClick={handleSendMessage} 
              disabled={!input.trim() || isTyping}
              className="absolute right-2 bottom-1.5 w-8 h-8 rounded-lg flex items-center justify-center bg-primary text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-warm-sm hover:shadow-warm"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default PaperDetail;
