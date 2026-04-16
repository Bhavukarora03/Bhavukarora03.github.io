import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, User, Sparkles, 
  Github, Linkedin,
  ExternalLink, Code2, Briefcase, 
  Mail,
  Layout, Layers,
  Smartphone, Gamepad2, Globe, Database, Menu, X
} from 'lucide-react';
import { portfolioData } from './data/portfolio';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const profilePic = "/profile.jpeg";

const ProjectCard: React.FC<{ project: any; index: number }> = ({ project, index }) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || window.innerWidth < 768) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  const Icon = project.category === 'CLI' ? Code2 : 
               project.category === 'Mobile' ? Smartphone : 
               project.category === 'Game' ? Gamepad2 : 
               project.category === 'Web' ? Globe : 
               project.category === 'Backend' ? Database : Layers;

  return (
    <motion.a
      ref={cardRef}
      onMouseMove={handleMouseMove}
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className={cn(
        "group relative p-4 sm:p-6 rounded-3xl glass-card spotlight-card overflow-hidden w-full",
        project.featured && "md:col-span-2 bg-gradient-to-br from-emerald-500/5 to-transparent border-emerald-500/10"
      )}
    >
      <div className="relative z-10 h-full flex flex-col min-w-0">
        <div className="flex justify-between items-start mb-3 sm:mb-6 shrink-0">
          <div className={cn(
            "p-2 sm:p-3 rounded-2xl transition-all duration-500",
            project.featured ? "bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.3)]" : "bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-black"
          )}>
            <Icon size={16} className="sm:w-5 sm:h-5" />
          </div>
          {project.link && (
            <div className="p-2 rounded-full bg-white/5 text-white/20 group-hover:text-emerald-500 transition-colors">
              <ExternalLink size={12} />
            </div>
          )}
        </div>

        <div className="space-y-1 sm:space-y-2 mb-4 flex-1 min-w-0">
          <span className="text-[8px] sm:text-[9px] font-bold text-emerald-500/60 uppercase tracking-[0.2em]">
            {project.category}
          </span>
          <h4 className={cn(
            "font-bold text-white transition-colors group-hover:text-emerald-400 leading-tight truncate sm:whitespace-normal",
            project.featured ? "text-base sm:text-2xl" : "text-sm sm:text-lg"
          )}>
            {project.title}
          </h4>
          <p className={cn(
            "text-white/40 leading-relaxed group-hover:text-white/70 transition-colors line-clamp-2 sm:line-clamp-3",
            project.featured ? "text-[11px] sm:text-sm max-w-lg" : "text-[10px] sm:text-xs"
          )}>
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-1 sm:gap-2 mt-auto pt-2">
          {project.tech.split(' / ').map((t: string) => (
            <span key={t} className="text-[8px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-white/40 group-hover:border-emerald-500/20 group-hover:text-emerald-500 transition-all uppercase tracking-tighter whitespace-nowrap">
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors" />
    </motion.a>
  );
};

const ProjectSection: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...Array.from(new Set(portfolioData.projects.map(p => p.category)))];
  
  const filteredProjects = filter === 'All' 
    ? portfolioData.projects 
    : portfolioData.projects.filter(p => p.category === filter);

  return (
    <div className="space-y-6 sm:space-y-8 w-full">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-1 h-5 sm:w-1.5 sm:h-6 bg-emerald-500 rounded-full" />
          <span className="text-[10px] sm:text-xs font-black text-white uppercase tracking-[0.3em]">Project Repository</span>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 custom-scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap border",
                filter === c 
                  ? "bg-emerald-500 border-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.2)]" 
                  : "bg-white/5 border-white/5 text-white/40 hover:text-white"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {filteredProjects.map((p, idx) => (
          <ProjectCard key={p.title} project={p} index={idx} />
        ))}
      </div>
    </div>
  );
};

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
  { label: "Game Mode", q: "Start Game", icon: Gamepad2 },
];

const RiddleTerminal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [output, setOutput] = useState<string[]>(['AUTHENTICATING...', 'ACCESS GRANTED. SECURITY BYPASS ACTIVE.', '---', 'SOLVE THE RIDDLES TO ACCESS THE VAULT.', '---']);
  const [isHacking, setIsHacking] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  const riddles = [
    { 
      q: "I have many branches but no leaves, I keep your history but I'm not a book. What am I?", 
      a: "git",
      hint: "Think version control."
    },
    { 
      q: "I am a type of loop that never ends, I run forever unless you break me. What am I?", 
      a: "infinite loop",
      hint: "While(true) { ... }"
    },
    { 
      q: "I'm the reason you stay up until 3 AM, I'm hidden in plain sight, and usually, I'm just a missing semicolon. What am I?", 
      a: "bug",
      hint: "It's not a feature."
    }
  ];

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputValue.toLowerCase().trim();
    if (!cmd) return;

    setOutput(prev => [...prev, `> ${inputValue}`]);
    setInputValue('');

    if (cmd === riddles[step].a || (step === 1 && cmd.includes('infinite') && cmd.includes('loop'))) {
      if (step < riddles.length - 1) {
        setOutput(prev => [...prev, 'CORRECT. DECRYPTING NEXT LAYER...', '---']);
        setTimeout(() => setStep(s => s + 1), 500);
      } else {
        setIsHacking(true);
        setOutput(prev => [...prev, 'ALL LAYERS DECRYPTED.', 'ACCESSING VAULT...']);
        setTimeout(() => {
          setOutput(prev => [...prev, '---', 'ACCESS GRANTED: "BHAVUK_PRO_2026"', '---']);
          setIsHacking(false);
        }, 2000);
      }
    } else if (cmd === 'hint') {
      setOutput(prev => [...prev, `HINT: ${riddles[step].hint}`]);
    } else if (cmd === 'exit') {
      onClose();
    } else {
      setOutput(prev => [...prev, 'ERROR: INCORRECT KEYPHRASE. TRY AGAIN OR TYPE "HINT".']);
    }
  };

  useEffect(() => {
    if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }, [output]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 font-mono"
    >
      <div className="max-w-2xl w-full aspect-video bg-[#050505] border border-emerald-500/30 rounded-2xl flex flex-col overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.1)] relative">
        <div className="bg-emerald-500/10 border-b border-emerald-500/20 px-4 py-3 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Secure Uplink Terminal</span>
          </div>
          <button onClick={onClose} className="text-white/20 hover:text-white transition-colors"><X size={18} /></button>
        </div>

        <div ref={terminalRef} className="flex-1 p-6 overflow-y-auto custom-scrollbar-hide space-y-2 relative text-xs sm:text-sm">
          {output.map((line, i) => (
            <div key={i} className={cn(line.startsWith('>') ? "text-white/60" : line.includes('ERROR') ? "text-red-500" : line.includes('CORRECT') ? "text-yellow-500" : "text-emerald-500")}>
              {line}
            </div>
          ))}
          {!isHacking && step < riddles.length && (
            <div className="pt-4 animate-in fade-in duration-700">
              <div className="text-emerald-500/40 text-[10px] uppercase mb-1">Riddle #{step + 1}</div>
              <div className="text-emerald-400 italic">"{riddles[step].q}"</div>
            </div>
          )}
          {isHacking && (
             <div className="h-1 w-full bg-emerald-500/20 mt-4 overflow-hidden rounded-full">
                <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 2 }} className="h-full bg-emerald-500" />
             </div>
          )}
        </div>

        <form onSubmit={handleCommand} className="p-4 bg-black/40 border-t border-emerald-500/20 flex gap-3 shrink-0">
          <span className="text-emerald-500 font-bold">$</span>
          <input autoFocus className="flex-1 bg-transparent border-none text-emerald-400 focus:ring-0 p-0 text-sm placeholder:text-emerald-900" placeholder="TYPE ANSWER..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} disabled={isHacking} />
        </form>
      </div>
    </motion.div>
  );
};

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsSidebarOpen(true);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash.toLowerCase() === '#projects') {
        setTimeout(() => handleSend("Show Projects"), 500);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const addMessage = (text: string | React.ReactNode, sender: 'bot' | 'user') => {
    setMessages(prev => [...prev, { id: Math.random().toString(36).substr(2, 9), text, sender, timestamp: new Date() }]);
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
    if (input.includes('game') || input.includes('start game') || input.includes('terminal')) {
      addMessage(
        <div className="space-y-4">
          <p>Initialising <span className="text-emerald-500 font-bold">Terminal.exe</span>...</p>
          <button onClick={() => setShowGame(true)} className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 font-bold uppercase tracking-widest hover:bg-emerald-500 hover:text-black transition-all group">
            <Gamepad2 size={18} className="group-hover:rotate-12 transition-transform" /> Launch Terminal Challenge
          </button>
        </div>, 'bot'
      );
    } else if (input.includes('project')) addMessage(<ProjectSection />, 'bot');
    else if (input.includes('experience') || input.includes('journey')) {
      addMessage(
        <div className="space-y-6 w-full">
          <div className="flex items-center gap-2 mb-2">
            <Briefcase size={14} className="text-emerald-500" />
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.2em]">Career Timeline</span>
          </div>
          <div className="space-y-8">
            {portfolioData.experience.map((exp, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative pl-8 group"
              >
                {i !== portfolioData.experience.length - 1 && (
                  <div className="absolute left-[11px] top-8 bottom-[-32px] w-px bg-gradient-to-b from-emerald-500/20 to-transparent" />
                )}
                <div className="absolute left-0 top-1.5 w-[22px] h-[22px] rounded-full bg-[#030303] border-2 border-emerald-500/20 group-hover:border-emerald-500 transition-colors flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/40 group-hover:bg-emerald-500 animate-pulse" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-400 transition-colors">{exp.role}</h4>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/5 border border-emerald-500/10 text-[9px] font-bold text-emerald-500/60 uppercase">
                      {exp.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-white/40 font-medium">
                    <span className="text-emerald-500/60">{exp.company}</span>
                    <span className="w-1 h-1 rounded-full bg-white/10" />
                    <span>{exp.period}</span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-white/50 leading-relaxed max-w-xl">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>, 'bot'
      );
    } else if (input.includes('skill')) {
      addMessage(
        <div className="space-y-8 w-full">
          <div className="flex items-center gap-2 mb-2">
            <Code2 size={14} className="text-emerald-500" />
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.2em]">Technical Arsenal</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Object.entries(portfolioData.skills).map(([category, skills], i) => (
              <motion.div 
                key={category}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="space-y-3"
              >
                <h5 className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] px-1">
                  {category}
                </h5>
                <div className="flex flex-wrap gap-2">
                  {(skills as string[]).map(skill => (
                    <span 
                      key={skill} 
                      className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-[11px] font-medium text-white/60 hover:border-emerald-500/30 hover:text-emerald-400 transition-all cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>, 'bot'
      );
    } else if (input.includes('contact') || input.includes('reach')) {
      addMessage(
        <div className="space-y-6 w-full">
          <div className="flex items-center gap-2 mb-2">
            <Mail size={14} className="text-emerald-500" />
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.2em]">Transmission Channel</span>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <motion.a 
              href={`mailto:${portfolioData.about.socials.email}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="group relative p-6 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 hover:border-emerald-500/40 transition-all overflow-hidden"
            >
              <div className="relative z-10 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Available for projects</div>
                  <div className="text-lg font-bold text-white">Let's build something epic</div>
                  <div className="text-xs text-white/40">{portfolioData.about.socials.email}</div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-black flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)] group-hover:scale-110 transition-transform">
                  <Send size={20} />
                </div>
              </div>
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all" />
            </motion.a>

            <div className="grid grid-cols-2 gap-4">
              <a href={portfolioData.about.socials.linkedin} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-[#0077b5]/30 hover:bg-[#0077b5]/5 transition-all group">
                <Linkedin size={18} className="text-white/20 group-hover:text-[#0077b5]" />
                <span className="text-xs font-bold text-white/40 group-hover:text-white">LinkedIn</span>
              </a>
              <a href={portfolioData.about.socials.github} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all group">
                <Github size={18} className="text-white/20 group-hover:text-white" />
                <span className="text-xs font-bold text-white/40 group-hover:text-white">GitHub</span>
              </a>
            </div>
          </div>
        </div>, 'bot'
      );
    } else {
      addMessage(
        <div className="space-y-2">
          <p className="text-sm">Available commands:</p>
          <div className="flex flex-wrap gap-2 pt-2">
            {QUICK_ACTIONS.map(a => <button key={a.label} onClick={() => handleSend(a.q)} className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20">{a.label}</button>)}
          </div>
        </div>, 'bot'
      );
    }
  };

  return (
    <div className="flex h-full w-full bg-[#030303] text-white antialiased overflow-hidden font-sans fixed inset-0">
      <AnimatePresence>{showGame && <RiddleTerminal onClose={() => setShowGame(false)} />}</AnimatePresence>
      <div className="bg-glow-container" />

      {/* Sidebar Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
            onClick={() => setIsSidebarOpen(false)} className="md:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]" />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          x: isSidebarOpen ? 0 : -288,
          width: window.innerWidth >= 768 ? (isSidebarOpen ? 288 : 0) : 288
        }}
        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
        className={cn(
          "fixed md:relative top-0 left-0 h-full border-r border-white/5 bg-[#030303] z-[70] flex flex-col shrink-0 overflow-hidden",
          !isSidebarOpen && "md:border-none"
        )}
      >
        <div className="w-72 p-8 h-full flex flex-col">
          <div className="flex items-center mb-12">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-500">
              <Code2 size={20} />
            </div>
          </div>
          <nav className="flex-1 space-y-1">
            {QUICK_ACTIONS.map(item => (
              <button 
                key={item.label} 
                onClick={() => { 
                  handleSend(item.q); 
                  if (window.innerWidth < 768) setIsSidebarOpen(false); 
                }} 
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-[13px] font-medium text-white/40 hover:text-white hover:bg-white/5 transition-all group"
              >
                <item.icon size={16} className="text-white/20 group-hover:text-emerald-500" /> 
                {item.label}
              </button>
            ))}
          </nav>
          
          <div className="pt-8 mt-auto border-t border-white/5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-500">
              <img src={profilePic} className="w-full h-full object-cover" alt="Bhavuk" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white/90">Bhavuk Arora</span>
              <span className="text-[10px] text-white/20 uppercase font-medium tracking-widest">Engineer</span>
            </div>
          </div>
        </div>
      </motion.aside>

      <main className="flex-1 flex flex-col h-full overflow-hidden relative z-10 w-full min-w-0">
        <header className="h-16 border-b border-white/5 flex items-center px-4 sm:px-6 justify-between bg-[#030303]/50 backdrop-blur-xl shrink-0">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.2em] text-white/20 uppercase">Network Stable</span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-4 sm:px-10 py-6 sm:py-10 custom-scrollbar-hide">
          <div className="max-w-3xl mx-auto flex flex-col min-h-full w-full overflow-hidden">
            <AnimatePresence mode="wait">
              {messages.length === 0 ? (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col items-center justify-center text-center space-y-10 sm:space-y-12 py-10">
                  <div className="relative">
                    <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full" />
                    <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-[2.5rem] overflow-hidden border border-white/10 glass-card p-1 shadow-2xl">
                      <img src={profilePic} className="w-full h-full object-cover rounded-[2rem] grayscale" alt="Avatar" />
                    </div>
                  </div>
                  <div className="space-y-6 px-4">
                    <div className="flex flex-col gap-3 sm:gap-4 items-center">
                       <div className="px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-[9px] text-emerald-500/60 font-black uppercase tracking-[0.3em]">Architecting Reality</div>
                       <h1 className="text-4xl sm:text-6xl font-black tracking-tighter text-white">Engineer.<br /><span className="text-emerald-500">Architect.</span></h1>
                    </div>
                    <p className="text-white/40 text-[13px] sm:text-sm max-w-sm mx-auto font-medium leading-relaxed">I build resilient digital ecosystems, from low-level CLI tools to high-performance mobile architectures.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full max-w-lg px-2 sm:px-0">
                    {QUICK_ACTIONS.slice(0,4).map(item => (
                      <button key={item.label} onClick={() => handleSend(item.q)} className="p-4 sm:p-5 rounded-2xl glass-card text-left transition-all group flex items-start gap-3 sm:gap-4">
                        <div className="p-2 rounded-xl bg-white/5 group-hover:bg-emerald-500/10 transition-colors"><item.icon size={16} className="text-white/20 group-hover:text-emerald-500" /></div>
                        <div className="flex flex-col"><div className="text-xs sm:text-sm font-bold text-white/80 group-hover:text-white">{item.label}</div><span className="text-[9px] sm:text-[10px] text-white/20 font-medium">Explore</span></div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <div className="space-y-10 sm:space-y-12 pb-20">
                  {messages.map(msg => (
                    <div key={msg.id} className="flex gap-4 sm:gap-6 message-fade items-start">
                      <div className={cn("w-8 h-8 sm:w-9 sm:h-9 rounded-xl shrink-0 flex items-center justify-center border", msg.sender === 'bot' ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" : "bg-white/5 border-white/10 text-white/40")}>
                        {msg.sender === 'bot' ? <Sparkles size={16} /> : <User size={16} />}
                      </div>
                      <div className="flex-1 pt-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={cn("text-[9px] font-bold uppercase tracking-widest", msg.sender === 'bot' ? "text-emerald-500" : "text-white/20")}>{msg.sender === 'bot' ? "Assistant" : "You"}</span>
                        </div>
                        <div className="text-[14px] sm:text-[15px] leading-relaxed text-white/90 font-medium">{msg.text}</div>
                      </div>
                    </div>
                  ))}
                  {isTyping && <div className="flex gap-4 sm:gap-6 opacity-40"><div className="w-8 h-8 rounded-xl bg-emerald-500/5 flex items-center justify-center shrink-0"><Sparkles size={16} className="text-emerald-500 animate-pulse" /></div><div className="flex gap-1.5 mt-4"><div className="w-1 h-1 rounded-full bg-emerald-500 animate-bounce" /><div className="w-1 h-1 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" /><div className="w-1 h-1 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" /></div></div>}
                  <div ref={chatEndRef} className="h-20" />
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="px-4 pb-6 sm:pb-10 pt-4 bg-gradient-to-t from-[#030303] via-[#030303] to-transparent shrink-0">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="flex gap-2 overflow-x-auto py-2 custom-scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
              {QUICK_ACTIONS.map(action => (
                <button 
                  key={action.label} 
                  onClick={() => handleSend(action.q)} 
                  className="action-chip flex items-center gap-2 shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                >
                  <action.icon size={12} />
                  {action.label}
                </button>
              ))}
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-emerald-500/5 blur-xl group-focus-within:opacity-100 opacity-0 transition-all rounded-3xl" />
              <div className="relative flex items-center bg-white/[0.03] border border-white/5 rounded-2xl overflow-hidden focus-within:border-emerald-500/20 backdrop-blur-3xl">
                <input className="w-full bg-transparent border-none text-white px-5 py-4 sm:py-5 focus:ring-0 text-sm placeholder-white/10" placeholder="Ask me..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend(inputValue)} />
                <button onClick={() => handleSend(inputValue)} className={cn("p-2.5 sm:p-3 mr-2 sm:mr-3 rounded-xl transition-all", inputValue.trim() ? "bg-emerald-500/10 text-emerald-500" : "text-white/5")}><Send size={18} /></button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
