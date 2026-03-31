import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, User, Sparkles, 
  Github, Linkedin, Instagram, 
  ExternalLink, Code2, Briefcase, 
  Mail, Rocket, ChevronRight, Terminal,
  Cpu, Layout, Command
} from 'lucide-react';
import { portfolioData } from './data/portfolio';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Using public folder path
const profilePic = "/profile.jpeg";

interface Message {
  id: string;
  text: string | React.ReactNode;
  sender: 'bot' | 'user';
  timestamp: Date;
}

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const addMessage = (text: string | React.ReactNode, sender: 'bot' | 'user') => {
    setMessages(prev => [...prev, {
      id: Math.random().toString(36).substr(2, 9),
      text,
      sender,
      timestamp: new Date()
    }]);
  };

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    addMessage(text, 'user');
    setInputValue('');
    
    setIsTyping(true);
    // Simulate thinking delay
    await new Promise(r => setTimeout(r, 1000));
    processResponse(text.toLowerCase());
  };

  const processResponse = (input: string) => {
    setIsTyping(false);
    
    if (input.includes('project') || input.includes('mission')) {
      addMessage(
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Rocket size={14} className="text-emerald-500" />
            <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-widest">Active Missions</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {portfolioData.projects.map(p => (
              <motion.div 
                whileHover={{ y: -2 }}
                key={p.title} 
                className="p-5 rounded-2xl glass-card group cursor-pointer"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                    <Layout size={16} />
                  </div>
                  <ExternalLink size={14} className="text-white/20 group-hover:text-emerald-500 transition-colors" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">{p.title}</h4>
                <p className="text-[11px] text-white/50 leading-relaxed mb-4">{p.description}</p>
                <div className="flex flex-wrap gap-2">
                   <span className="text-[9px] font-mono px-2 py-1 rounded bg-white/5 text-emerald-400 uppercase tracking-tighter">
                    {p.tech}
                   </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>,
        'bot'
      );
    } else if (input.includes('experience') || input.includes('journey') || input.includes('evolution')) {
      addMessage(
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <Cpu size={14} className="text-emerald-500" />
            <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-widest">Evolution Timeline</span>
          </div>
          <div className="relative border-l border-white/5 ml-2 pl-6 space-y-8">
            {portfolioData.experience.map((exp, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono text-emerald-500/60 font-medium uppercase">{exp.period}</span>
                  <h4 className="text-sm font-bold text-white">{exp.role}</h4>
                  <p className="text-xs font-medium text-white/40 mb-2">{exp.company}</p>
                  <p className="text-[12px] text-white/60 leading-relaxed max-w-xl">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>,
        'bot'
      );
    } else if (input.includes('skill') || input.includes('arsenal') || input.includes('tech')) {
       addMessage(
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <Command size={14} className="text-emerald-500" />
            <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-widest">Technical Arsenal</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider mb-3">Languages & Frameworks</p>
              <div className="flex flex-wrap gap-2">
                {[...portfolioData.skills.languages, ...portfolioData.skills.frameworks].map(s => (
                  <span key={s} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[11px] text-white/70 hover:border-emerald-500/30 transition-colors">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider mb-3">Infrastructure & Tools</p>
              <div className="flex flex-wrap gap-2">
                {portfolioData.skills.infrastructure.map(s => (
                  <span key={s} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[11px] text-white/70 hover:border-emerald-500/30 transition-colors">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>,
        'bot'
      );
    } else if (input.includes('contact') || input.includes('reach') || input.includes('social') || input.includes('uplink')) {
      addMessage(
        <div className="space-y-5">
           <div className="flex items-center gap-2 mb-2">
            <Terminal size={14} className="text-emerald-500" />
            <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-widest">Establishing Uplink</span>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <a href={`mailto:${portfolioData.about.socials.email}`} className="p-4 rounded-2xl glass-card flex justify-between items-center transition-all group">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase text-white/30 font-bold mb-0.5">Direct Channel</span>
                <span className="text-xs font-medium text-white/80">{portfolioData.about.socials.email}</span>
              </div>
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                <Mail size={16} />
              </div>
            </a>
          </div>
          <div className="flex gap-4 px-2">
            {[
              { icon: Github, url: portfolioData.about.socials.github },
              { icon: Linkedin, url: portfolioData.about.socials.linkedin },
              { icon: Instagram, url: portfolioData.about.socials.instagram },
            ].map((s, i) => (
              <a key={i} href={s.url} target="_blank" className="p-2 rounded-lg text-white/40 hover:text-emerald-500 hover:bg-emerald-500/5 transition-all">
                <s.icon size={20} />
              </a>
            ))}
          </div>
        </div>,
        'bot'
      );
    } else {
      addMessage(
        <div className="space-y-2">
          <p>I can provide specific intelligence on:</p>
          <div className="grid grid-cols-1 gap-1 text-emerald-400/80 font-mono text-[13px]">
            <button onClick={() => handleSend("Show Missions")} className="text-left hover:text-emerald-400 flex items-center gap-2 group">
              <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" /> /missions
            </button>
            <button onClick={() => handleSend("Career Journey")} className="text-left hover:text-emerald-400 flex items-center gap-2 group">
              <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" /> /evolution_path
            </button>
            <button onClick={() => handleSend("Skills")} className="text-left hover:text-emerald-400 flex items-center gap-2 group">
              <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" /> /arsenal
            </button>
            <button onClick={() => handleSend("Contact")} className="text-left hover:text-emerald-400 flex items-center gap-2 group">
              <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" /> /uplink
            </button>
          </div>
        </div>,
        'bot'
      );
    }
  };

  return (
    <div className="flex h-screen w-screen bg-[#030303] text-white antialiased overflow-hidden font-sans">
      {/* Visual Enhancements */}
      <div className="bg-glow-container">
        <div className="glow-1" />
        <div className="glow-2" />
      </div>
      <div className="scanline" />

      {/* Sidebar */}
      <aside className="hidden md:flex w-72 border-r border-white/5 flex-col p-8 bg-black/40 backdrop-blur-3xl z-20">
        <div className="flex items-center gap-3 mb-12">
          <div className="relative group">
            <div className="absolute -inset-2 bg-emerald-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center font-black text-xl shadow-[0_0_15px_rgba(16,185,129,0.3)]">B</div>
          </div>
          <div className="flex flex-col">
            <span className="font-black tracking-tight text-lg leading-none">BHAVUK</span>
            <span className="text-[10px] font-mono text-emerald-500/60 font-bold tracking-[0.2em] uppercase mt-1">Console v4.2.0</span>
          </div>
        </div>
        
        <nav className="flex-1 space-y-2">
          {[
            { label: "Missions", q: "Show Projects", icon: Rocket, cmd: "/exe" },
            { label: "Evolution", q: "Career Journey", icon: Briefcase, cmd: "/path" },
            { label: "Arsenal", q: "Skills", icon: Code2, cmd: "/tech" },
            { label: "Uplink", q: "Contact", icon: Mail, cmd: "/link" },
          ].map(item => (
            <button 
              key={item.label} 
              onClick={() => handleSend(item.q)} 
              className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-[13px] font-medium text-white/40 hover:text-white hover:bg-white/5 transition-all group"
            >
              <div className="flex items-center gap-3">
                <item.icon size={16} className="text-emerald-500/40 group-hover:text-emerald-500 transition-colors" /> 
                {item.label}
              </div>
              <span className="text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity text-emerald-500/60">{item.cmd}</span>
            </button>
          ))}
        </nav>

        <div className="pt-8 mt-auto border-t border-white/5 flex items-center gap-4">
          <div className="relative">
             <img src={profilePic} className="w-10 h-10 rounded-xl object-cover grayscale hover:grayscale-0 transition-all duration-500 border border-white/10" alt="Bhavuk" />
             <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#030303] shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-black tracking-tight">Bhavuk Arora</span>
            <span className="text-[10px] text-white/30 uppercase tracking-tighter font-bold">Product Engineer</span>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col relative z-10">
        {/* Mobile Header */}
        <header className="md:hidden h-16 border-b border-white/5 flex items-center px-6 justify-between bg-black/40 backdrop-blur-2xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-black text-sm shadow-[0_0_10px_rgba(16,185,129,0.2)]">B</div>
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-emerald-500/60">BHAVUK.CONSOLE</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-6 custom-scrollbar-hide">
          <div className="max-w-3xl mx-auto w-full flex flex-col min-h-full">
            <AnimatePresence mode="wait">
              {messages.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex-1 flex flex-col items-center justify-center py-20 text-center space-y-12"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full" />
                    <motion.div 
                       animate={{ rotate: 360 }}
                       transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                       className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center relative z-10 shadow-2xl backdrop-blur-xl"
                    >
                      <Sparkles className="text-emerald-500" size={40} />
                    </motion.div>
                  </div>
                  
                  <div className="space-y-4 relative z-10">
                    <h1 className="text-4xl sm:text-5xl font-black tracking-tighter text-white uppercase leading-none">
                      Operational <span className="text-emerald-500">Intelligence</span>
                    </h1>
                    <p className="text-white/40 text-xs font-mono max-w-sm mx-auto uppercase tracking-[0.3em]">
                      // 4+ YOE // Founding Member // Product-Led
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl relative z-10">
                    {[
                      { label: "Explore Missions", q: "Show Projects", icon: Rocket, cmd: "exe_projects" },
                      { label: "Evolution Path", q: "Career Journey", icon: Briefcase, cmd: "path_view" },
                      { label: "Technical Arsenal", q: "Skills", icon: Code2, cmd: "check_skills" },
                      { label: "Direct Uplink", q: "Contact", icon: Mail, cmd: "open_link" },
                    ].map(item => (
                      <button 
                        key={item.label} 
                        onClick={() => handleSend(item.q)} 
                        className="p-5 rounded-2xl glass-card text-left transition-all group flex items-start gap-4"
                      >
                        <div className="p-2 rounded-xl bg-white/5 group-hover:bg-emerald-500/10 transition-colors">
                          <item.icon size={18} className="text-white/20 group-hover:text-emerald-500 transition-colors" />
                        </div>
                        <div className="flex flex-col">
                          <div className="text-[13px] font-bold text-white/80 group-hover:text-white transition-colors">{item.label}</div>
                          <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest mt-0.5">{item.cmd}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <div className="py-12 space-y-12">
                  {messages.map(msg => (
                    <div key={msg.id} className="flex gap-5 sm:gap-8 message-fade items-start">
                      <div className={cn(
                        "w-9 h-9 rounded-xl shrink-0 flex items-center justify-center shadow-2xl relative", 
                        msg.sender === 'bot' 
                          ? "bg-emerald-600/20 border border-emerald-500/30 text-emerald-500 shadow-emerald-500/10" 
                          : "bg-white/5 border border-white/10 text-white/60 shadow-black/40"
                      )}>
                        {msg.sender === 'bot' ? <Sparkles size={18} /> : <User size={18} />}
                        {msg.sender === 'bot' && <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />}
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={cn("text-[10px] font-mono font-bold uppercase tracking-widest", msg.sender === 'bot' ? "text-emerald-500" : "text-white/30")}>
                            {msg.sender === 'bot' ? "Console" : "User"}
                          </span>
                          <span className="text-[9px] font-mono text-white/10 uppercase">{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <div className="text-sm sm:text-[15px] leading-[1.7] text-white/80 font-medium">
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex gap-8 items-start py-2 opacity-40">
                      <div className="w-9 h-9 rounded-xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                        <Sparkles size={18} className="text-emerald-500 animate-pulse" />
                      </div>
                      <div className="flex gap-1.5 mt-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" />
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} className="h-40" />
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-6 sm:p-12 bg-gradient-to-t from-[#030303] via-[#030303] to-transparent">
          <div className="max-w-3xl mx-auto relative group">
            <div className="absolute -inset-1 bg-emerald-500/5 blur-xl group-focus-within:bg-emerald-500/10 transition-all duration-500 opacity-0 group-focus-within:opacity-100 rounded-3xl" />
            <div className="relative flex items-center bg-white/[0.03] border border-white/5 rounded-2xl overflow-hidden focus-within:border-emerald-500/30 transition-all backdrop-blur-3xl shadow-2xl">
              <div className="pl-5 text-emerald-500/40 hidden sm:block">
                 <ChevronRight size={18} />
              </div>
              <input
                className="w-full bg-transparent border-none text-white px-4 sm:px-2 py-5 focus:ring-0 text-sm placeholder-white/10 font-medium"
                placeholder="Request intelligence... (e.g. 'Show projects')"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSend(inputValue) }}
              />
              <button 
                onClick={() => handleSend(inputValue)} 
                className={cn(
                  "p-3 mr-3 rounded-xl transition-all duration-300", 
                  inputValue.trim() 
                    ? "bg-emerald-500/10 text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]" 
                    : "text-white/5"
                )}
              >
                <Send size={18} />
              </button>
            </div>
            <div className="flex justify-between items-center px-4 mt-3">
               <span className="text-[9px] font-mono text-white/10 uppercase tracking-widest">End-to-end encrypted uplink</span>
               <span className="text-[9px] font-mono text-emerald-500/20 uppercase tracking-widest hidden sm:block">System Status: Optimal</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
