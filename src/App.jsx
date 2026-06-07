import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HeroProject from './components/HeroProject';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Certifications from './components/Certifications';

// ─── Loading Screen ───────────────────────────────────────────────
const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('INITIALIZING_PORTFOLIO...');

  const statuses = [
    'INITIALIZING_PORTFOLIO...',
    'LOADING_AGENT_GRAPH...',
    'CONNECTING_VECTOR_STORE...',
    'WARMING_LLM_INFERENCE...',
    'PORTFOLIO_READY.',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + (100 - prev) * 0.12 + 1;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return next;
      });
    }, 60);

    const statusInterval = setInterval(() => {
      setStatus(prev => {
        const idx = statuses.indexOf(prev);
        return statuses[Math.min(idx + 1, statuses.length - 1)];
      });
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(statusInterval);
    };
  }, []);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] bg-[#020408] flex flex-col items-center justify-center"
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid opacity-50" />

      <div className="relative text-center space-y-8 px-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="font-display font-extrabold text-5xl gradient-text mb-2">DW</div>
          <div className="font-mono text-xs text-slate-600 tracking-widest">DANYAL_WAHDAT // AGENTIC_AI_ENGINEER</div>
        </motion.div>

        {/* Progress Bar */}
        <div className="w-64 mx-auto">
          <div className="h-px bg-[#0A1628] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#9B59FF] to-[#00D4FF] rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="font-mono text-xs text-slate-600 animate-pulse">{status}</span>
            <span className="font-mono text-xs text-[#00D4FF]">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Decorative nodes */}
        <div className="flex justify-center gap-3">
          {['#9B59FF', '#00D4FF', '#00FF88', '#FFB800', '#FF4444'].map((color, i) => (
            <motion.div
              key={color}
              className="w-2 h-2 rounded-full"
              style={{ background: color }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// ─── Main App ─────────────────────────────────────────────────────
const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative min-h-screen bg-[#020408] noise-overlay">
      <AnimatePresence>
        {loading && (
          <LoadingScreen onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Navbar />
          <main>
            <Hero />
            <HeroProject />
            <Projects />
            <Skills />
            <Experience />
            <Certifications />
            <Contact />
          </main>
        </motion.div>
      )}
    </div>
  );
};

export default App;
