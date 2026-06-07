import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// ─── Animated Terminal Component ─────────────────────────────────
const TerminalWindow = () => {
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState('');
  const [phase, setPhase] = useState(0);
  const terminalRef = useRef(null);

  const terminalScript = [
    { type: 'cmd', text: '$ python main.py --mode production', delay: 0 },
    { type: 'info', text: 'Initializing LangGraph StateGraph...', delay: 700 },
    { type: 'info', text: 'Loading model: Llama-3.3-70b via Groq API', delay: 1400 },
    { type: 'success', text: '✓ Vector store connected  [Qdrant @ :6333]', delay: 2100 },
    { type: 'success', text: '✓ Semantic router loaded  [512-dim embeddings]', delay: 2700 },
    { type: 'separator', text: '─────────────────────────────────────────', delay: 3100 },
    { type: 'node', text: 'NODE [orchestrator]    → READY', delay: 3500 },
    { type: 'node', text: 'NODE [optimist]        → READY', delay: 3800 },
    { type: 'node', text: 'NODE [devil_advocate]  → READY', delay: 4100 },
    { type: 'node', text: 'NODE [risk_analyst]    → READY', delay: 4400 },
    { type: 'node', text: 'NODE [researcher]      → READY', delay: 4700 },
    { type: 'node', text: 'NODE [judge]           → READY', delay: 5000 },
    { type: 'separator', text: '─────────────────────────────────────────', delay: 5300 },
    { type: 'exec', text: 'Parallel branch executing: [optimist | devil_advocate | risk_analyst]', delay: 5700 },
    { type: 'metric', text: 'Inference latency: 847ms  |  Tokens: 2,341', delay: 6400 },
    { type: 'metric', text: 'Confidence score: 0.91    |  Harshness: 3/5', delay: 6900 },
    { type: 'success', text: '✓ Graph execution complete. Verdict delivered.', delay: 7500 },
    { type: 'prompt', text: '> Awaiting next decision...', delay: 8200 },
  ];

  useEffect(() => {
    const timers = [];
    terminalScript.forEach((line, idx) => {
      const t = setTimeout(() => {
        setLines(prev => [...prev, line]);
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      }, line.delay);
      timers.push(t);
    });

    // Loop
    const loopTimer = setTimeout(() => {
      setLines([]);
    }, 11000);
    timers.push(loopTimer);

    return () => timers.forEach(clearTimeout);
  }, [lines.length === 0 ? 0 : null]);

  // Re-run loop
  useEffect(() => {
    if (lines.length === 0) {
      const timers = [];
      terminalScript.forEach((line) => {
        const t = setTimeout(() => {
          setLines(prev => [...prev, line]);
          if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
          }
        }, line.delay);
        timers.push(t);
      });
      const loopTimer = setTimeout(() => {
        setLines([]);
      }, 12000);
      timers.push(loopTimer);
      return () => timers.forEach(clearTimeout);
    }
  }, [lines]);

  const getLineStyle = (type) => {
    switch (type) {
      case 'cmd': return 'text-white font-semibold';
      case 'info': return 'text-slate-400';
      case 'success': return 'text-[#00FF88]';
      case 'node': return 'text-[#00D4FF]';
      case 'exec': return 'text-[#9B59FF] font-medium';
      case 'metric': return 'text-[#FFB800]';
      case 'prompt': return 'text-[#00D4FF] font-bold';
      case 'separator': return 'text-slate-700';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="relative border border-[#00D4FF]/20 rounded-lg overflow-hidden bg-[#020D1A]/90 backdrop-blur-sm border-glow">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0A1628]/80 border-b border-[#00D4FF]/10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#E0443E]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840] border border-[#1FAD2F]" />
        </div>
        <span className="font-mono text-xs text-slate-500 tracking-widest">LANGGRAPH_RUNTIME.py</span>
        <div className="w-16 flex justify-end">
          <span className="font-mono text-xs text-[#00FF88] animate-pulse">● LIVE</span>
        </div>
      </div>

      {/* Terminal Body */}
      <div
        ref={terminalRef}
        className="p-5 font-mono text-xs leading-relaxed h-64 overflow-y-auto space-y-1"
        style={{ scrollbarWidth: 'none' }}
      >
        {lines.map((line, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className={getLineStyle(line.type)}
          >
            {line.text}
          </motion.div>
        ))}
        {/* Cursor */}
        <span className="inline-block w-2 h-4 bg-[#00D4FF] cursor-blink align-middle" />
      </div>
    </div>
  );
};

// ─── Floating Stats ───────────────────────────────────────────────
const StatBadge = ({ label, value, color = 'blue', delay = 0 }) => {
  const colorMap = {
    blue: 'border-[#00D4FF]/30 text-[#00D4FF] bg-[#00D4FF]/5',
    purple: 'border-[#9B59FF]/30 text-[#9B59FF] bg-[#9B59FF]/5',
    green: 'border-[#00FF88]/30 text-[#00FF88] bg-[#00FF88]/5',
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`border rounded-sm px-3 py-1.5 font-mono text-xs ${colorMap[color]}`}
    >
      <span className="opacity-60 mr-1">{label}:</span>
      <span className="font-semibold">{value}</span>
    </motion.div>
  );
};

// ─── Main Hero Component ──────────────────────────────────────────
const Hero = () => {
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setTitleVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#020408] bg-grid"
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #00D4FF22 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl"
          style={{ background: 'radial-gradient(circle, #9B59FF22 0%, transparent 70%)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-32 w-full grid md:grid-cols-2 gap-16 items-center">
        {/* ── LEFT: Text Content ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Status Badge */}
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
            <span className="font-mono text-xs text-slate-500 tracking-widest uppercase">
              Available for Remote Roles
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.div variants={itemVariants}>
            <h1 className="font-display font-extrabold leading-tight tracking-tight">
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-1">Architecting</span>
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl gradient-text mb-1">Autonomous AI</span>
              <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white">& Scalable LLMOps.</span>
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.p variants={itemVariants} className="text-slate-400 text-base md:text-lg leading-relaxed max-w-lg font-body">
            Hi, I'm <span className="text-[#00D4FF] font-semibold">Danyal Wahdat</span> — I build
            production-ready, scalable AI systems with complex state management, not just simple wrappers.
            Specializing in{' '}
            <span className="text-white">multi-agent orchestration</span>,{' '}
            <span className="text-white">local vector routing</span>, and{' '}
            <span className="text-white">high-performance backend pipelines</span>.
          </motion.p>

          {/* Stats Row */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
            <StatBadge label="LOCATION" value="Islamabad, PK" color="blue" delay={0.8} />
            <StatBadge label="AGENTS" value="6-node graphs" color="purple" delay={0.9} />
            <StatBadge label="COST_REDUCTION" value="~80%" color="green" delay={1.0} />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
            <motion.button
              onClick={() => document.getElementById('hero-project')?.scrollIntoView({ behavior: 'smooth' })}
              className="font-mono text-sm px-6 py-3 bg-[#00D4FF] text-[#020408] font-bold rounded-sm hover:bg-[#00D4FF]/90 transition-colors"
              whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(0,212,255,0.4)' }}
              whileTap={{ scale: 0.97 }}
            >
              VIEW ARCHITECTURE →
            </motion.button>
            <motion.a
              href="mailto:mdanyalwahdat@gmail.com?subject=Technical%20Inquiry%20from%20Portfolio"
              className="font-mono text-sm px-6 py-3 border border-[#00D4FF]/40 text-[#00D4FF] hover:bg-[#00D4FF]/10 rounded-sm transition-all"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              BOOK A TECHNICAL CHAT
            </motion.a>
            <motion.a
              href="/Danyal_Wahdat_cv.pdf"
              download="Danyal_Wahdat_CV.pdf"
              className="font-mono text-sm px-6 py-3 border border-[#00FF88]/40 text-[#00FF88] hover:bg-[#00FF88]/10 rounded-sm transition-all flex items-center gap-2"
              whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(0,255,136,0.15)' }}
              whileTap={{ scale: 0.97 }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              DOWNLOAD CV
            </motion.a>
          </motion.div>

          {/* Tech Stack Inline */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2 pt-2">
            {['LangGraph', 'FastAPI', 'Qdrant', 'Docker', 'AWS Lambda', 'Azure AI'].map((tech) => (
              <span key={tech} className="font-mono text-xs px-2 py-1 bg-[#0A1628] border border-[#00D4FF]/10 text-slate-400 rounded-sm">
                {tech}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT: Terminal ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Floating decorative elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 border border-[#9B59FF]/20 rounded-full animate-pulse-slow pointer-events-none" />
          <div className="absolute -bottom-8 -left-4 w-16 h-16 border border-[#00D4FF]/15 rounded-full animate-pulse-slow pointer-events-none" style={{ animationDelay: '1s' }} />

          <TerminalWindow />

          {/* Side metric strip */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              { label: 'AGENTS', val: '6', unit: 'NODES' },
              { label: 'LATENCY', val: '847', unit: 'MS' },
              { label: 'VECTORS', val: '512', unit: 'DIM' },
            ].map(({ label, val, unit }) => (
              <div key={label} className="bg-[#060C14] border border-[#00D4FF]/10 rounded-sm p-3 text-center">
                <div className="font-mono text-lg font-bold text-[#00D4FF]">{val}</div>
                <div className="font-mono text-xs text-slate-600 mt-0.5">{unit}</div>
                <div className="font-mono text-xs text-slate-500 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-xs text-slate-600 tracking-widest">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-[#00D4FF]/50 to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
