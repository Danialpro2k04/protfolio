import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { id: 'hero', label: '01 // HOME' },
    { id: 'hero-project', label: '02 // SYSTEMS' },
    { id: 'projects', label: '03 // CASE STUDIES' },
    { id: 'skills', label: '04 // DNA' },
    { id: 'certifications', label: '05 // CERTS' },
    { id: 'contact', label: '06 // CONTACT' },
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#020408]/90 backdrop-blur-xl border-b border-[#00D4FF]/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={() => scrollTo('hero')}
            className="font-mono text-sm font-600 tracking-widest"
            whileHover={{ scale: 1.05 }}
          >
            <span className="gradient-text font-bold text-base">DW</span>
            <span className="text-[#00D4FF]/30 mx-1">/</span>
            <span className="text-slate-400 text-xs">AGENTIC_AI</span>
          </motion.button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <motion.button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="font-mono text-xs text-slate-500 hover:text-[#00D4FF] transition-colors duration-200 tracking-wider"
                whileHover={{ y: -1 }}
              >
                {link.label}
              </motion.button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <motion.a
              href="mailto:mdanyalwahdat@gmail.com?subject=Technical%20Inquiry"
              className="font-mono text-xs px-4 py-2 border border-[#00D4FF]/40 text-[#00D4FF] hover:bg-[#00D4FF]/10 rounded-sm transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              HIRE_ME()
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#00D4FF] font-mono text-xs"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? '[ CLOSE ]' : '[ MENU ]'}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#060C14]/95 backdrop-blur-xl border-b border-[#00D4FF]/10 py-6 px-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="font-mono text-sm text-slate-400 hover:text-[#00D4FF] transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
              <a
                href="mailto:mdanyalwahdat@gmail.com"
                className="font-mono text-sm text-[#00D4FF] border border-[#00D4FF]/40 px-4 py-2 text-center rounded-sm mt-2"
              >
                HIRE_ME()
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
