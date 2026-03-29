import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, Plus, User, Sparkles, 
  Github, Linkedin, Instagram, 
  ExternalLink, Code2, Briefcase, 
  Mail, Smartphone, Rocket, 
  FileDown, X, Menu
} from 'lucide-react';
import { portfolioData } from './data/portfolio';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import profilePic from './assets/hero.png';

interface Message {
  id: string;
  text: string | React.ReactNode;
  sender: 'bot' | 'user';
}

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const addMessage = (text: string | React.ReactNode, sender: 'bot' | 'user') => {
    setMessages(prev => [...prev, {
      id: Math.random().toString(36).substr(2, 9),
      text,
      sender
    }]);
  };

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    addMessage(text, 'user');
    setInputValue('');
    if (window.innerWidth < 768) setIsSidebarOpen(false);
    
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 800));
    processResponse(text.toLowerCase());
  };

  const processResponse = (input: string) => {
    setIsTyping(false);
    
    if (input.includes('project')) {
      addMessage(
        <div className="space-y-4">
          <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Featured Projects</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {portfolioData.projects.map(p => (
              <div key={p.title} className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-sm font-bold text-white">{p.title}</h4>
                  <ExternalLink size={12} className="text-white/40" />
                </div>
                <p className="text-[11px] text-white/60">{p.description}</p>
                <p className="mt-2 text-[9px] font-mono text-emerald-500/60 uppercase">{p.tech}</p>
              </div>
            ))}
          </div>
        </div>,
        'bot'
      );
    } else if (input.includes('experience') || input.includes('journey')) {
      addMessage(
        <div className="space-y-6">
          <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Experience</p>
          <div className="border-l border-white/10 ml-1 pl-4 space-y-6">
            {portfolioData.experience.map((exp, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[9px] font-mono text-white/40 uppercase">{exp.period}</span>
                <h4 className="text-sm font-bold text-white">{exp.role} @ {exp.company}</h4>
                <p className="text-[11px] text-white/60 mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>,
        'bot'
      );
    } else if (input.includes('contact') || input.includes('reach') || input.includes('social')) {
      addMessage(
        <div className="space-y-4">
          <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Connect</p>
          <div className="grid grid-cols-1 gap-2">
            <a href={`mailto:${portfolioData.about.socials.email}`} className="p-3 rounded-lg border border-white/10 bg-white/5 flex justify-between items-center hover:bg-white/10 transition-all">
              <span className="text-xs text-white/80">{portfolioData.about.socials.email}</span>
              <Mail size={14} className="text-emerald-500" />
            </a>
          </div>
          <div className="flex gap-4 pt-2">
            <a href={portfolioData.about.socials.github} target="_blank" className="text-white/40 hover:text-white transition-colors"><Github size={18} /></a>
            <a href={portfolioData.about.socials.linkedin} target="_blank" className="text-white/40 hover:text-white transition-colors"><Linkedin size={18} /></a>
            <a href={portfolioData.about.socials.behance} target="_blank" className="text-white/40 hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M22 13.848c0 3.949-3.201 7.152-7.152 7.152-3.951 0-7.152-3.203-7.152-7.152s3.201-7.152 7.152-7.152c3.951 0 7.152 3.203 7.152 7.152zm-12.015 0c0 2.686 2.177 4.863 4.863 4.863 2.686 0 4.863-2.177 4.863-4.863s-2.177-4.863-4.863-4.863c-2.686 0-4.863 2.177-4.863 4.863zm1.152-11.848h7.426v1.391h-7.426v-1.391zm-10.137 13.063c0 2.223 1.802 4.026 4.025 4.026 2.224 0 4.026-1.803 4.026-4.026v-6.075h-8.051v6.075zm2.013-4.062h4.025v4.062c0 1.112-.901 2.013-2.013 2.013s-2.012-.901-2.012-2.013v-4.062z"/></svg>
            </a>
            <a href={portfolioData.about.socials.instagram} target="_blank" className="text-white/40 hover:text-white transition-colors"><Instagram size={18} /></a>
          </div>
        </div>,
        'bot'
      );
    } else {
      addMessage("I can provide details on Bhavuk's projects, career journey, or contact information. What do you need?", 'bot');
    }
  };

  return (
    <div className="flex h-screen w-screen bg-black text-white antialiased overflow-hidden font-sans">
      <div className="lowkey-glow" />

      {/* Sidebar - Desktop only */}
      <aside className="hidden md:flex w-64 border-r border-white/5 flex-col p-6 bg-black/50 backdrop-blur-xl z-20">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 rounded bg-emerald-600 flex items-center justify-center font-bold">B</div>
          <span className="font-bold tracking-tighter text-lg uppercase">Bhavuk.Console</span>
        </div>
        
        <nav className="flex-1 space-y-1">
          {[
            { label: "Missions", q: "Show Projects", icon: Rocket },
            { label: "Journey", q: "Career Journey", icon: Briefcase },
            { label: "Arsenal", q: "Skills", icon: Code2 },
            { label: "Uplink", q: "Contact", icon: Mail },
          ].map(item => (
            <button key={item.label} onClick={() => handleSend(item.q)} className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-xs font-medium text-white/40 hover:text-white hover:bg-white/5 transition-all">
              <item.icon size={14} className="text-emerald-500/60" /> {item.label}
            </button>
          ))}
        </nav>

        <div className="pt-6 border-t border-white/10 flex items-center gap-3">
          <img src={profilePic} className="w-8 h-8 rounded-full border border-white/10" alt="Bhavuk" />
          <div className="flex flex-col">
            <span className="text-[10px] font-bold">Bhavuk Arora</span>
            <span className="text-[8px] text-white/20 uppercase tracking-tighter">Product Engineer</span>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col relative z-10">
        {/* Mobile Header */}
        <header className="md:hidden h-14 border-b border-white/5 flex items-center px-4 justify-between bg-black/50 backdrop-blur-xl">
          <div className="w-8 h-8 rounded bg-emerald-600 flex items-center justify-center font-bold text-xs">B</div>
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-60">Console v4.0</span>
          <div className="w-8" />
        </header>

        <div className="flex-1 overflow-y-auto px-4 custom-scrollbar-hide">
          <div className="max-w-3xl mx-auto w-full flex flex-col min-h-full">
            {messages.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center py-20 text-center space-y-8">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 mx-auto">
                    <Sparkles className="text-emerald-500" size={32} />
                  </div>
                  <h1 className="text-2xl font-black tracking-tight text-white mb-2 uppercase">How can I help you?</h1>
                  <p className="text-white/40 text-xs max-w-xs mx-auto uppercase tracking-tighter">
                    4+ years experience // Scaling 0 → 1 // Mobile Specialist
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-xl">
                  {[
                    { label: "View Missions", q: "Show Projects", icon: Rocket },
                    { label: "Evolution Path", q: "Career Journey", icon: Briefcase },
                    { label: "Technical Arsenal", q: "Skills", icon: Code2 },
                    { label: "Direct Uplink", q: "Contact", icon: Mail },
                  ].map(item => (
                    <button key={item.label} onClick={() => handleSend(item.q)} className="p-4 rounded-xl border border-white/10 bg-white/5 hover:border-emerald-500/30 text-left transition-all group">
                      <item.icon size={16} className="text-emerald-500/40 group-hover:text-emerald-500 mb-2" />
                      <div className="text-[11px] font-bold text-white/80">{item.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-10 space-y-10">
                {messages.map(msg => (
                  <div key={msg.id} className="flex gap-4 sm:gap-6 message-fade">
                    <div className={cn("w-8 h-8 rounded shrink-0 flex items-center justify-center shadow-lg", msg.sender === 'bot' ? "bg-emerald-600" : "bg-white/10")}>
                      {msg.sender === 'bot' ? <Sparkles size={16} /> : <User size={16} />}
                    </div>
                    <div className="flex-1 text-sm sm:text-[15px] leading-relaxed text-white/80 font-medium">
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-6 items-center py-2 opacity-40">
                    <div className="w-8 h-8 rounded bg-emerald-600 flex items-center justify-center shrink-0"><Sparkles size={16} /></div>
                    <div className="flex gap-1">
                      <div className="w-1 h-1 rounded-full bg-white animate-bounce" />
                      <div className="w-1 h-1 rounded-full bg-white animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1 h-1 rounded-full bg-white animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} className="h-32" />
              </div>
            )}
          </div>
        </div>

        {/* Input - Fixed Bottom */}
        <div className="p-4 sm:p-10 bg-gradient-to-t from-black via-black/80 to-transparent">
          <div className="max-w-3xl mx-auto relative group">
            <div className="relative flex items-center bg-white/5 border border-white/10 rounded-2xl overflow-hidden focus-within:border-emerald-500/40 transition-all backdrop-blur-xl">
              <input
                className="w-full bg-transparent border-none text-white px-5 py-4 focus:ring-0 text-sm placeholder-white/20"
                placeholder="Ask about my experience..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSend(inputValue) }}
              />
              <button onClick={() => handleSend(inputValue)} className={cn("p-3 mr-2 rounded-xl transition-all", inputValue.trim() ? "text-emerald-500" : "text-white/10")}>
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
