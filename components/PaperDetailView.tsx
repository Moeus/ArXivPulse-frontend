
import React, { useState, useEffect, useRef } from 'react';
import { Paper, ChatMessage } from '../types';
import { GoogleGenAI } from '@google/genai';

interface PaperDetailViewProps {
  paper: Paper;
  onBack: () => void;
  onBookmark: (id: string) => void;
}

const PaperDetailView: React.FC<PaperDetailViewProps> = ({ paper, onBack, onBookmark }) => {
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
          Abstract: ${paper.abstract}. 
          Authors: ${paper.authors.join(', ')}. 
          Be concise, accurate, and helpful. Use markdown for formatting.`,
        }
      });

      const response = await chat.sendMessage({ message: userMessage });
      const text = response.text || "I'm sorry, I couldn't process that.";
      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (error) {
      console.error("Chat failed:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error connecting to my knowledge base." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full animate-fade-in gap-0 overflow-hidden -mx-5 md:-mx-12 -my-6 bg-white">
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-6 py-8 md:px-12 border-r border-gray-100 scroll-smooth">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-text-secondary hover:text-primary mb-8 transition-colors"
        >
          <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">arrow_back</span>
          <span className="text-sm font-bold uppercase tracking-widest">Back to Library</span>
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
                <span className="text-xs font-bold text-text-secondary uppercase tracking-wider mr-2">Authors:</span>
                {paper.authors.map(author => (
                  <span key={author} className="text-sm font-semibold text-text-main bg-background-subtle px-3 py-1 rounded-lg">
                    {author}
                  </span>
                ))}
              </div>
              <button 
                onClick={() => onBookmark(paper.id)}
                className={`p-2 rounded-full transition-colors ${paper.isBookmarked ? 'bg-primary/10 text-primary' : 'bg-gray-50 text-text-secondary hover:text-primary'}`}
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

            <section className="bg-background-subtle p-8 rounded-3xl border border-gray-100">
              <h2 className="text-sm font-black uppercase tracking-widest text-text-secondary mb-6">Paper Context & Methodology</h2>
              <div className="flex flex-col gap-4 text-text-main/80 leading-relaxed">
                <p>
                  This research explores advancements in <strong>{paper.subCategory}</strong>. By analyzing complex data structures and introducing novel algorithms, the authors demonstrate a significant leap in performance over existing state-of-the-art models.
                </p>
                <p>
                  The methodology involves a robust framework for sequence transduction, utilizing the primary components of neural architecture to minimize latency while maximizing throughput. Further investigations revealed that the attention mechanism plays a critical role in global dependency modeling.
                </p>
                <div className="flex items-center gap-2 mt-4 text-primary italic text-sm">
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>info</span>
                  This is a generated placeholder for the detailed paper content. In a production environment, this would display full-text markdown from the source.
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Chat Sidebar */}
      <div className="w-full lg:w-[400px] flex flex-col bg-background-subtle h-[500px] lg:h-full border-t lg:border-t-0 lg:border-l border-gray-100">
        <div className="p-5 border-b border-gray-100 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">forum</span>
            <span className="font-black text-sm uppercase tracking-widest text-text-main">AI Research Agent</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-[10px] font-bold text-text-secondary uppercase">Online</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 bg-gray-50/50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-primary text-white rounded-tr-none' 
                  : 'bg-white text-text-main border border-gray-100 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-gray-100">
          <div className="relative">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask a question about the paper..."
              className="w-full pl-4 pr-12 py-3 bg-background-subtle border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <button 
              onClick={handleSendMessage}
              disabled={!input.trim() || isTyping}
              className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                input.trim() ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-gray-100 text-gray-400'
              }`}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>send</span>
            </button>
          </div>
          <p className="text-[10px] text-center text-text-secondary mt-3 font-medium opacity-60">
            AI can make mistakes. Verify critical research details.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaperDetailView;
