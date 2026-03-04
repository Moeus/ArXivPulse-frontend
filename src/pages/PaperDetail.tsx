/**
 * PaperDetail — 论文详情页面
 * 展示论文元信息（分类、标题、作者、摘要）
 * AI 助手面板默认隐藏，通过浮动按钮触发
 * 响应式设计：
 *  - AI 面板：桌面端侧滑侧边栏，移动端底部抽屉
 *  - 布局：统一在 AppPage 容器内，无需特殊 margin hacks
 */

import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage, ViewMode } from '../types';
import { GoogleGenAI } from '@google/genai';
import { useStore } from '../store/useStore';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ExternalLink, Bookmark, BookmarkCheck, FileText, Sparkles, Bot, X, ChevronDown, ArrowUp } from 'lucide-react';

const PaperDetail: React.FC = () => {
  const { selectedPaper: paper, setView, previousView, toggleBookmark } = useStore();
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
        { role: 'model', text: `Hi! I've read "${paper.title}". How can I help you understand this research today?` }
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
      // Note: In a real app, API key should be securely handled
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
          className="group flex items-center gap-2 text-text-secondary hover:text-primary transition-colors focus:outline-none"
        >
          <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
          <span className="text-sm font-bold uppercase tracking-widest">{t('back')}</span>
        </button>

        {/* Action Bar */}
        <div className="flex items-center gap-3">
            <a 
              href={`https://arxiv.org/abs/${paper.id}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 text-text-secondary hover:bg-primary/5 hover:text-primary transition-all text-sm font-semibold"
            >
              <ExternalLink size={18} />
              {t('viewOnArxiv')}
            </a>
            <button 
              onClick={() => toggleBookmark(paper.id)}
              className={`p-2 rounded-full transition-colors ${paper.isBookmarked ? 'bg-primary/10 text-primary' : 'bg-gray-50 text-text-secondary hover:bg-gray-100'}`}
            >
              {paper.isBookmarked ? <BookmarkCheck className="fill-current" size={20} /> : <Bookmark size={20} />}
            </button>
        </div>
      </div>

      {/* 论文内容区域 */}
      <div className="flex-1 overflow-y-auto pb-32 lg:pb-0">
        <div className="max-w-4xl mx-auto flex flex-col gap-8 animate-fade-in">
          
          {/* Header Section */}
          <header className="flex flex-col gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
                {paper.category}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-gray-900 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 text-xs font-bold tracking-wide">
                {paper.journal}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <span className="text-xs text-text-secondary font-medium">{t('publishedOn')} {paper.publishedDate}</span>
            </div>
            
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-text-main leading-tight tracking-tight">
              {paper.title}
            </h1>

            <div className="flex flex-wrap gap-2 items-center mt-2">
              {paper.authors.map(author => (
                <span key={author} className="text-sm font-semibold text-text-main bg-background-subtle px-3 py-1.5 rounded-lg border border-transparent hover:border-primary/20 transition-colors cursor-default">
                  {author}
                </span>
              ))}
            </div>
          </header>

          <hr className="border-gray-100" />

          {/* Abstract Section */}
          <section>
            <h2 className="text-sm font-black uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
              <FileText size={18} />
              {t('abstract')}
            </h2>
            <p className="text-base md:text-lg text-text-main leading-relaxed font-medium opacity-90 text-justify">
              {paper.abstract}
            </p>
          </section>

          {/* Mobile Only: View on ArXiv Button (Show at bottom of content) */}
          <div className="sm:hidden pt-4">
              <a 
              href={`https://arxiv.org/abs/${paper.id}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-gray-50 text-text-main font-semibold hover:bg-gray-100 transition-colors"
            >
              <span>{t('viewOnArxiv')}</span>
              <ExternalLink size={18} />
            </a>
          </div>

        </div>
      </div>

      {/* AI Assistant FAB (Floating Action Button) */}
      <button
        onClick={() => setShowAI(!showAI)}
        className={`fixed z-50 right-6 bottom-24 lg:bottom-10 shadow-xl lg:shadow-2xl transition-all duration-300 rounded-full flex items-center justify-center
          ${showAI ? 'w-12 h-12 bg-white text-text-secondary hover:text-primary border border-gray-200' : 'w-14 h-14 bg-primary text-white hover:scale-105 hover:rotate-3'}
        `}
        title={t('openAiChat')}
      >
        {showAI ? <X size={24} /> : <Sparkles size={24} />}
      </button>

      {/* AI Assistant Panel */}
      {/* Overlay Backdrop (Mobile) */}
      {showAI && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setShowAI(false)}
        />
      )}

      {/* The Panel Container */}
      <div className={`
        fixed z-50 bg-white shadow-2xl transition-all duration-300 ease-out flex flex-col border-l border-gray-100
        
        /* Mobile Styles (Drawer from bottom) */
        inset-x-0 bottom-0 top-[20%] rounded-t-3xl lg:rounded-none
        transform ${showAI ? 'translate-y-0' : 'translate-y-full'}
        
        /* Desktop Styles (Side panel from right) */
        lg:inset-y-0 lg:right-0 lg:left-auto lg:top-0 lg:w-[400px] lg:bottom-0
        lg:transform ${showAI ? 'lg:translate-x-0' : 'lg:translate-x-full'}
      `}>
        {/* Panel Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white/50 backdrop-blur rounded-t-3xl lg:rounded-none">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
               <Bot className="text-primary" size={20} />
            </div>
            <div>
              <h3 className="font-black text-sm uppercase tracking-widest text-text-main">{t('aiAssistant')}</h3>
              <p className="text-[10px] text-text-secondary font-medium">Powered by Gemini 2.0</p>
            </div>
          </div>
          <button 
            onClick={() => setShowAI(false)} 
            className="lg:hidden p-2 text-gray-400 hover:text-gray-600"
          >
            <ChevronDown size={24} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-gray-50/30 custom-scrollbar">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
              <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm shadow-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-primary text-white rounded-tr-none' 
                  : 'bg-white text-text-main border border-gray-100 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
             <div className="flex justify-start animate-fade-in">
               <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1 items-center">
                 <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce"></div>
                 <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                 <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.4s]"></div>
               </div>
             </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-100 pb-8 lg:pb-4">
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
              className="w-full pl-4 pr-12 py-3 bg-background-subtle border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all resize-none max-h-32 min-h-[44px]"
              style={{ fieldSizing: 'content' } as any} 
              // Note: field-sizing is a newer CSS property, fallback to rows/auto-grow logic if needed, 
              // or just fixed height for simplicity in this demo.
            />
            <button 
              onClick={handleSendMessage} 
              disabled={!input.trim() || isTyping}
              className="absolute right-2 bottom-1.5 w-8 h-8 rounded-lg flex items-center justify-center bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed transition-opacity shadow-sm hover:shadow-md"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default PaperDetail;
