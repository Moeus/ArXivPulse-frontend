
import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage, ViewMode } from '../types';
import { GoogleGenAI } from '@google/genai';
import { useStore } from '../store/useStore';

const PaperDetailView: React.FC = () => {
  const { selectedPaper: paper, setView, previousView, toggleBookmark } = useStore();
  
  if (!paper) return null;

  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: `Hi! I've read "${paper.title}". How can I help you understand this research today?` }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
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
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full animate-fade-in gap-0 overflow-hidden -mx-5 md:-mx-12 -my-6 bg-white">
      <div className="flex-1 overflow-y-auto px-6 py-8 md:px-12 border-r border-gray-100 scroll-smooth custom-scrollbar">
        <button 
          onClick={() => setView(previousView || ViewMode.Explore)}
          className="group flex items-center gap-2 text-text-secondary hover:text-primary mb-8 transition-colors"
        >
          <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">arrow_back</span>
          <span className="text-sm font-bold uppercase tracking-widest">Back</span>
        </button>

        <div className="max-w-3xl mx-auto flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
                {paper.mainCategory}
              </span>
              <span className="text-xs text-text-secondary font-medium">Published on {paper.publishedDate}</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black text-text-main leading-tight tracking-tight">
              {paper.title}
            </h1>

            <div className="flex items-center justify-between py-4 border-y border-gray-50 mt-4">
              <div className="flex flex-wrap gap-2 items-center">
                {paper.authors.map(author => (
                  <span key={author} className="text-sm font-semibold text-text-main bg-background-subtle px-3 py-1 rounded-lg">
                    {author}
                  </span>
                ))}
              </div>
              <button 
                onClick={() => toggleBookmark(paper.id)}
                className={`p-2 rounded-full transition-colors ${paper.isBookmarked ? 'bg-primary/10 text-primary' : 'bg-gray-50 text-text-secondary'}`}
              >
                <span className={`material-symbols-outlined ${paper.isBookmarked ? 'fill' : ''}`}>
                  {paper.isBookmarked ? 'bookmark_added' : 'bookmark_add'}
                </span>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-8 mt-4">
            <section>
              <h2 className="text-sm font-black uppercase tracking-widest text-primary mb-4">Abstract</h2>
              <p className="text-lg text-text-main leading-relaxed font-medium opacity-90">
                {paper.abstract}
              </p>
            </section>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[400px] flex flex-col bg-background-subtle h-[500px] lg:h-full">
        <div className="p-5 border-b border-gray-100 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">forum</span>
            <span className="font-black text-sm uppercase tracking-widest text-text-main">AI Assistant</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 bg-gray-50/50 custom-scrollbar">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm shadow-sm ${
                msg.role === 'user' ? 'bg-primary text-white' : 'bg-white text-text-main'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
             <div className="flex justify-start">
               <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl shadow-sm flex gap-1">
                 <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></div>
                 <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                 <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
               </div>
             </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="p-4 bg-white border-t border-gray-100">
          <div className="relative">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask a question..."
              className="w-full pl-4 pr-12 py-3 bg-background-subtle border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <button onClick={handleSendMessage} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center bg-primary text-white">
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperDetailView;
