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

const ProjectCard: React.FC<{ project: any; index: number }> = ({ project, index }) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
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
        "group relative p-6 rounded-3xl glass-card spotlight-card overflow-hidden",
        project.featured && "sm:col-span-2 bg-gradient-to-br from-emerald-500/5 to-transparent border-emerald-500/10"
      )}
    >
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className={cn(
            "p-3 rounded-2xl transition-all duration-500",
            project.featured ? "bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.3)]" : "bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-black"
          )}>
            <Icon size={20} />
          </div>
          {project.link && (
            <div className="p-2 rounded-full bg-white/5 text-white/20 group-hover:text-emerald-500 transition-colors">
              <ExternalLink size={14} />
            </div>
          )}
        </div>

        <div className="space-y-2 mb-6">
          <span className="text-[10px] font-bold text-emerald-500/60 uppercase tracking-[0.2em]">
            {project.category}
          </span>
          <h4 className={cn(
            "font-bold text-white transition-colors group-hover:text-emerald-400",
            project.featured ? "text-xl sm:text-2xl" : "text-lg"
          )}>
            {project.title}
          </h4>
          <p className={cn(
            "text-white/40 leading-relaxed group-hover:text-white/70 transition-colors",
            project.featured ? "text-sm sm:text-base max-w-lg" : "text-xs"
          )}>
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tech.split(' / ').map((t: string) => (
            <span key={t} className="text-[10px] font-bold px-3 py-1 rounded-full bg-white/5 border border-white/5 text-white/50 group-hover:border-emerald-500/20 group-hover:text-emerald-500 transition-all uppercase tracking-tighter">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Background Polish */}
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
    <div className="space-y-8 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
          <span className="text-xs font-black text-white uppercase tracking-[0.3em]">Project Repository</span>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 custom-scrollbar-hide">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={cn(
                "px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap border",
                filter === c 
                  ? "bg-emerald-500 border-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.2)]" 
                  : "bg-white/5 border-white/5 text-white/40 hover:text-white hover:border-white/10"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
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
        <ProjectSection />,
        'bot'
      );
    } else if (input.includes('experience') || input.includes('journey')) {
      addMessage(
        <div className="space-y-8">
          <div className="flex items-center gap-2 mb-2">
            <Briefcase size={14} className="text-emerald-500" />
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Professional Experience</span>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {portfolioData.experience.map((exp, i) => (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                key={i} 
                className="relative group"
              >
                {/* Timeline Connector */}
                {i !== portfolioData.experience.length - 1 && (
                  <div className="absolute left-[21px] top-12 bottom-0 w-[1px] bg-gradient-to-b from-emerald-500/20 to-transparent" />
                )}

                <div className="flex gap-6">
                  {/* Icon/Badge Circle */}
                  <div className="relative shrink-0">
                    <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:border-emerald-500/30 transition-all duration-500 overflow-hidden">
                      <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="text-emerald-500 relative z-10">
                        {exp.type.includes('Founding') ? <Sparkles size={18} /> : 
                         exp.type.includes('Product') ? <Layout size={18} /> : 
                         <Code2 size={18} />}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 pb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">{exp.role}</h4>
                          <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 text-[9px] font-black uppercase tracking-tighter border border-emerald-500/10">
                            {exp.type}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-white/40">{exp.company}</p>
                      </div>
                      <span className="text-[10px] font-black text-white/20 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full h-fit">
                        {exp.period}
                      </span>
                    </div>
                    
                    <p className="text-[13px] text-white/50 leading-relaxed max-w-2xl group-hover:text-white/70 transition-colors">
                      {exp.description}
                    </p>

                    <div className="mt-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                       <div className="w-8 h-[1px] bg-emerald-500/30 mt-2" />
                       <span className="text-[10px] font-bold text-emerald-500/50 uppercase tracking-widest italic">Success Path</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>,
        'bot'
      );
    } else if (input.includes('skill') || input.includes('tech')) {
       addMessage(
        <div className="space-y-8">
          <div className="flex items-center gap-2 mb-2">
            <Code2 size={14} className="text-emerald-500" />
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Technical Arsenal</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Languages & Frameworks */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Core Stack</span>
                <span className="text-[9px] font-bold text-emerald-500/50 uppercase">Advanced</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[...portfolioData.skills.languages, ...portfolioData.skills.frameworks].map((s) => (
                  <motion.div 
                    whileHover={{ y: -2, backgroundColor: "rgba(255,255,255,0.05)" }}
                    key={s} 
                    className="p-3 rounded-2xl glass-card flex flex-col items-center justify-center gap-2 group transition-all"
                  >
                    <img 
                      src={`https://unpkg.com/simple-icons@v14/icons/${s.toLowerCase().replace('+', 'plus').replace('.', 'dot').replace(' ', '')}.svg`}
                      className="w-5 h-5 opacity-40 group-hover:opacity-100 group-hover:invert-0 transition-all filter brightness-0 invert"
                      alt={s}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <div className="hidden text-emerald-500/50 group-hover:text-emerald-500 transition-colors">
                      <Code2 size={16} />
                    </div>
                    <span className="text-[9px] font-bold text-white/40 group-hover:text-white transition-colors text-center">{s}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Infrastructure & Design */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                  <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Infrastructure</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {portfolioData.skills.infrastructure.map(s => (
                    <span key={s} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-[11px] font-bold text-white/40 hover:text-emerald-400 hover:border-emerald-500/20 transition-all cursor-default">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                  <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Product & Design</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {portfolioData.skills.design.map(s => (
                    <div key={s} className="p-3 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex items-center gap-3 group hover:bg-emerald-500/10 transition-all">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/40 group-hover:bg-emerald-500 transition-all" />
                      <span className="text-[10px] font-bold text-white/60 group-hover:text-white transition-colors">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>,
        'bot'
      );
    } else if (input.includes('contact') || input.includes('reach') || input.includes('social')) {
      addMessage(
        <div className="space-y-8">
          <div className="flex items-center gap-2 mb-2">
            <Mail size={14} className="text-emerald-500" />
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Connect & Collaborate</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Primary Email Card */}
            <motion.a 
              href={`mailto:${portfolioData.about.socials.email}`}
              whileHover={{ y: -4 }}
              className="sm:col-span-2 p-6 rounded-3xl glass-card group flex items-center justify-between relative overflow-hidden"
            >
              <div className="relative z-10">
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] mb-2 block">Direct Inquiry</span>
                <h4 className="text-xl font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">Shoot me an email</h4>
                <p className="text-xs text-white/40">{portfolioData.about.socials.email}</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-black transition-all duration-500">
                <Send size={24} />
              </div>
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors" />
            </motion.a>

            {/* LinkedIn Card */}
            <motion.a 
              href={portfolioData.about.socials.linkedin}
              target="_blank"
              whileHover={{ y: -4 }}
              className="p-6 rounded-3xl glass-card group flex flex-col justify-between aspect-square sm:aspect-video relative overflow-hidden"
            >
              <div className="w-10 h-10 rounded-xl bg-[#0077b5]/10 text-[#0077b5] flex items-center justify-center group-hover:bg-[#0077b5] group-hover:text-white transition-all">
                <Linkedin size={20} />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">LinkedIn</h4>
                <p className="text-[10px] text-white/40 uppercase tracking-widest">Professional Network</p>
              </div>
            </motion.a>

            {/* GitHub Card */}
            <motion.a 
              href={portfolioData.about.socials.github}
              target="_blank"
              whileHover={{ y: -4 }}
              className="p-6 rounded-3xl glass-card group flex flex-col justify-between aspect-square sm:aspect-video relative overflow-hidden"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 text-white/60 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <Github size={20} />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">GitHub</h4>
                <p className="text-[10px] text-white/40 uppercase tracking-widest">Source Repository</p>
              </div>
            </motion.a>
          </div>

          {/* Secondary Social Row */}
          <div className="flex items-center gap-4 px-2">
            <span className="text-[9px] font-black text-white/10 uppercase tracking-[0.4em]">Social Presence</span>
            <div className="flex-1 h-[1px] bg-white/5" />
            <div className="flex gap-2">
              {[
                { icon: Instagram, url: portfolioData.about.socials.instagram, color: "hover:text-pink-500" },
                { icon: ExternalLink, url: portfolioData.about.socials.behance, label: "Behance", color: "hover:text-blue-500" }
              ].map((s, i) => (
                <a 
                  key={i} 
                  href={s.url} 
                  target="_blank" 
                  className={cn("p-2.5 rounded-xl bg-white/5 text-white/30 transition-all border border-transparent hover:border-white/10", s.color)}
                >
                  <s.icon size={18} />
                </a>
              ))}
            </div>
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
