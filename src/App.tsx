import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, User, Sparkles, 
  Github, Linkedin, Instagram, 
  ExternalLink, Code2, Briefcase, 
  Mail, ChevronRight,
  Layout, Layers,
  Smartphone, Gamepad2, Globe, Database
} from 'lucide-react';
import { portfolioData } from './data/portfolio';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const profilePic = "/profile.jpeg";

interface Message {
  id: string;
  text: string | React.ReactNode;
  sender: 'bot' | 'user';
  timestamp: Date;
}

const QUICK_ACTIONS = [
  { label: "Projects", q: "Show Projects", icon: Layout },
  { label: "Experience", q: "Career Journey", icon: Briefcase },
  { label: "Skills", q: "Skills", icon: Code2 },
  { label: "Contact", q: "Contact", icon: Mail },
];

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
    await new Promise(r => setTimeout(r, 800));
    processResponse(text.toLowerCase());
  };

  const processResponse = (input: string) => {
    setIsTyping(false);
    
    if (input.includes('project')) {
      addMessage(
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Layout size={14} className="text-emerald-500" />
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Featured Projects</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {portfolioData.projects.map((p, idx) => {
              const Icon = p.category === 'CLI' ? Code2 : 
                           p.category === 'Mobile' ? Smartphone : 
                           p.category === 'Game' ? Gamepad2 : 
                           p.category === 'Web' ? Globe : 
                           p.category === 'Backend' ? Database : Layers;
              
              return (
                <motion.a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  key={p.title} 
                  className="p-5 rounded-2xl glass-card group cursor-pointer block relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 bg-emerald-500/5 rounded-full blur-xl" />
                  </div>

                  <div className="flex justify-between items-start mb-4">
                    <div className="flex flex-col gap-3">
                      <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 w-fit group-hover:bg-emerald-500 group-hover:text-black transition-all duration-300">
                        <Icon size={18} />
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-emerald-500/50 uppercase tracking-widest mb-1 block">{p.category}</span>
                        <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">{p.title}</h4>
                      </div>
                    </div>
                    {p.link && <ExternalLink size={14} className="text-white/20 group-hover:text-emerald-500 transition-colors mt-1" />}
                  </div>
                  
                  <p className="text-[12px] text-white/40 leading-relaxed mb-4 group-hover:text-white/60 transition-colors line-clamp-2">
                    {p.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {p.tech.split(' / ').map(t => (
                      <span key={t} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-white/40 group-hover:border-emerald-500/20 group-hover:text-emerald-500/70 transition-all">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>,
        'bot'
      );
    } else if (input.includes('experience') || input.includes('journey')) {
      addMessage(
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <Briefcase size={14} className="text-emerald-500" />
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Professional Experience</span>
          </div>
          <div className="relative border-l border-white/5 ml-2 pl-6 space-y-8">
            {portfolioData.experience.map((exp, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]" />
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-emerald-500/60 font-medium uppercase">{exp.period}</span>
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
    } else if (input.includes('skill') || input.includes('tech')) {
       addMessage(
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <Code2 size={14} className="text-emerald-500" />
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Technical Skills</span>
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
    } else if (input.includes('contact') || input.includes('reach') || input.includes('social')) {
      addMessage(
        <div className="space-y-5">
           <div className="flex items-center gap-2 mb-2">
            <Mail size={14} className="text-emerald-500" />
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Get in Touch</span>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <a href={`mailto:${portfolioData.about.socials.email}`} className="p-4 rounded-2xl glass-card flex justify-between items-center transition-all group">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase text-white/30 font-bold mb-0.5">Email</span>
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
          <p>I can help you with:</p>
          <div className="grid grid-cols-1 gap-1 text-emerald-400/80 font-medium text-[13px]">
            <button onClick={() => handleSend("Show Projects")} className="text-left hover:text-emerald-400 flex items-center gap-2 group">
              <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" /> View Projects
            </button>
            <button onClick={() => handleSend("Experience")} className="text-left hover:text-emerald-400 flex items-center gap-2 group">
              <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" /> Experience Path
            </button>
            <button onClick={() => handleSend("Skills")} className="text-left hover:text-emerald-400 flex items-center gap-2 group">
              <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" /> Tech Stack
            </button>
            <button onClick={() => handleSend("Contact")} className="text-left hover:text-emerald-400 flex items-center gap-2 group">
              <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" /> Contact Info
            </button>
          </div>
        </div>,
        'bot'
      );
    }
  };

  return (
    <div className="flex h-[100dvh] w-screen bg-[#030303] text-white antialiased overflow-hidden font-sans">
      {/* Visual Enhancements */}
      <div className="bg-glow-container" />

      {/* Sidebar - Desktop Only */}
      <aside className="hidden md:flex w-72 border-r border-white/5 flex-col p-8 bg-black/20 backdrop-blur-3xl z-20">
        <div className="flex items-center gap-3 mb-12">
          <div className="relative group">
            <div className="absolute -inset-2 bg-emerald-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-xl text-emerald-500">B</div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-tight text-lg leading-none">Bhavuk.</span>
            <span className="text-[10px] text-white/30 font-medium tracking-wider uppercase mt-1">Portfolio v2.0</span>
          </div>
        </div>
        
        <nav className="flex-1 space-y-1">
          {QUICK_ACTIONS.map(item => (
            <button 
              key={item.label} 
              onClick={() => handleSend(item.q)} 
              className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-[13px] font-medium text-white/40 hover:text-white hover:bg-white/5 transition-all group"
            >
              <div className="flex items-center gap-3">
                <item.icon size={16} className="text-white/20 group-hover:text-emerald-500 transition-colors" /> 
                {item.label}
              </div>
            </button>
          ))}
        </nav>

        <div className="pt-8 mt-auto border-t border-white/5 flex items-center gap-4">
          <div className="relative">
             <img src={profilePic} className="w-10 h-10 rounded-xl object-cover border border-white/10" alt="Bhavuk" />
             <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#030303]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-tight text-white/90">Bhavuk Arora</span>
            <span className="text-[10px] text-white/30 uppercase font-medium">Product Engineer</span>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col relative z-10 h-full overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden h-14 border-b border-white/5 flex items-center px-6 justify-between bg-black/40 backdrop-blur-2xl shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-bold text-xs text-emerald-500">B</div>
            <span className="text-[10px] font-bold tracking-wider text-white/80 uppercase">Bhavuk Arora</span>
          </div>
          <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-6 custom-scrollbar-hide">
          <div className="max-w-3xl mx-auto w-full flex flex-col min-h-full">
            <AnimatePresence mode="wait">
              {messages.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="flex-1 flex flex-col items-center justify-center py-10 text-center space-y-10"
                >
                  {/* Tilted Image Overlap */}
                  <div className="relative h-32 w-32 mx-auto">
                    <motion.div 
                      initial={{ rotate: -12, x: -8 }}
                      animate={{ rotate: -15, x: -10 }}
                      className="absolute top-0 left-0 w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl backdrop-blur-xl z-0"
                    >
                      <Sparkles className="text-emerald-500/30" size={32} />
                    </motion.div>
                    <motion.div 
                      initial={{ rotate: 8, x: 8 }}
                      animate={{ rotate: 5, x: 10 }}
                      className="absolute top-4 left-4 w-24 h-24 rounded-3xl overflow-hidden border-2 border-emerald-500/20 shadow-2xl z-10"
                    >
                      <img src={profilePic} className="w-full h-full object-cover" alt="Bhavuk" />
                    </motion.div>
                  </div>
                  
                  <div className="space-y-6 relative z-10 px-4">
                    <div className="flex flex-col gap-2 items-center">
                       <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 font-bold text-[10px] tracking-widest uppercase border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                         Uplink Established
                       </span>
                       <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-none">
                        Hi <span className="text-emerald-500">Recruiter.</span>
                      </h1>
                    </div>
                    <p className="text-white/40 text-sm max-w-xs mx-auto font-medium leading-relaxed">
                      I'm a Product Engineer specialized in building high-performance web applications. How can I help you?
                    </p>
                  </div>

                  {/* Show tiles only on desktop */}
                  <div className="hidden sm:grid grid-cols-2 gap-3 w-full max-w-xl relative z-10">
                    {QUICK_ACTIONS.map(item => (
                      <button 
                        key={item.label} 
                        onClick={() => handleSend(item.q)} 
                        className="p-5 rounded-2xl glass-card text-left transition-all group flex items-start gap-4"
                      >
                        <div className="p-2 rounded-xl bg-white/5 group-hover:bg-emerald-500/10 transition-colors">
                          <item.icon size={18} className="text-white/20 group-hover:text-emerald-500 transition-colors" />
                        </div>
                        <div className="flex flex-col">
                          <div className="text-[14px] font-bold text-white/80 group-hover:text-white transition-colors">{item.label}</div>
                          <span className="text-[11px] text-white/20 font-medium mt-0.5">Explore my {item.label.toLowerCase()}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <div className="py-8 sm:py-12 space-y-10">
                  {messages.map(msg => (
                    <div key={msg.id} className="flex gap-4 sm:gap-8 message-fade items-start">
                      <div className={cn(
                        "w-8 h-8 sm:w-9 sm:h-9 rounded-xl shrink-0 flex items-center justify-center shadow-2xl relative", 
                        msg.sender === 'bot' 
                          ? "bg-emerald-600/10 border border-emerald-500/20 text-emerald-500" 
                          : "bg-white/5 border border-white/10 text-white/60"
                      )}>
                        {msg.sender === 'bot' ? <Sparkles size={16} /> : <User size={16} />}
                        {msg.sender === 'bot' && <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full" />}
                      </div>
                      <div className="flex-1 pt-0.5">
                        <div className="flex items-center gap-3 mb-1.5">
                          <span className={cn("text-[9px] sm:text-[10px] font-bold uppercase tracking-widest", msg.sender === 'bot' ? "text-emerald-500" : "text-white/30")}>
                            {msg.sender === 'bot' ? "Assistant" : "You"}
                          </span>
                          <span className="text-[8px] sm:text-[9px] text-white/10 uppercase font-medium">{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <div className="text-[14px] sm:text-[15px] leading-[1.6] text-white/90 font-medium">
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex gap-4 sm:gap-8 items-start py-2 opacity-40">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-600/5 border border-emerald-500/10 flex items-center justify-center shrink-0">
                        <Sparkles size={16} className="text-emerald-500 animate-pulse" />
                      </div>
                      <div className="flex gap-1.5 mt-3 sm:mt-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" />
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} className="h-20 sm:h-40" />
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Input Area */}
        <div className="px-4 pb-6 pt-2 sm:px-12 sm:pb-12 bg-gradient-to-t from-[#030303] via-[#030303] to-transparent shrink-0">
          <div className="max-w-3xl mx-auto">
            {/* Quick Action Chips */}
            <div className="flex gap-2 overflow-x-auto pb-4 mb-2 custom-scrollbar-hide -mx-1 px-1">
              {QUICK_ACTIONS.map(action => (
                <button
                  key={action.label}
                  onClick={() => handleSend(action.q)}
                  className="action-chip flex items-center gap-2"
                >
                  <action.icon size={12} />
                  {action.label}
                </button>
              ))}
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-emerald-500/5 blur-xl group-focus-within:bg-emerald-500/10 transition-all duration-500 opacity-0 group-focus-within:opacity-100 rounded-3xl" />
              <div className="relative flex items-center bg-white/[0.03] border border-white/5 rounded-2xl overflow-hidden focus-within:border-emerald-500/20 transition-all backdrop-blur-3xl">
                <input
                  className="w-full bg-transparent border-none text-white px-5 py-4 sm:px-6 sm:py-5 focus:ring-0 text-[14px] sm:text-[15px] placeholder-white/10 font-medium"
                  placeholder="Ask me anything..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSend(inputValue) }}
                />
                <button 
                  onClick={() => handleSend(inputValue)} 
                  className={cn(
                    "p-2.5 sm:p-3 mr-2 sm:mr-3 rounded-xl transition-all duration-300", 
                    inputValue.trim() 
                      ? "bg-emerald-500/10 text-emerald-500" 
                      : "text-white/5"
                  )}
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
