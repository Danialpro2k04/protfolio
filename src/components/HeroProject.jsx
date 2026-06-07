import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Mini Architecture Graph ──────────────────────────────────────
const ArchitectureGraph = () => {
  const [hovered, setHovered] = useState(null);

  const nodes = {
    orchestrator: { x: '50%', y: '8%', label: 'ORCHESTRATOR', color: '#9B59FF', desc: 'Dimension planning & graph routing' },
    optimist: { x: '15%', y: '45%', label: 'OPTIMIST', color: '#00FF88', desc: 'Case FOR the decision' },
    devil: { x: '50%', y: '45%', label: "DEVIL'S ADV.", color: '#FF4444', desc: 'Logic AGAINST — counterarguments' },
    risk: { x: '85%', y: '45%', label: 'RISK ANALYST', color: '#FFB800', desc: 'Threats & probability scoring' },
    researcher: { x: '30%', y: '78%', label: 'RESEARCHER', color: '#00D4FF', desc: 'Live web exploration via Tavily API' },
    judge: { x: '70%', y: '78%', label: 'JUDGE', color: '#9B59FF', desc: 'Verdict with harshness 1–5 & confidence' },
  };

  const edges = [
    { from: 'orchestrator', to: 'optimist', parallel: true },
    { from: 'orchestrator', to: 'devil', parallel: true },
    { from: 'orchestrator', to: 'risk', parallel: true },
    { from: 'optimist', to: 'researcher', parallel: false },
    { from: 'devil', to: 'researcher', parallel: false },
    { from: 'risk', to: 'researcher', parallel: false },
    { from: 'researcher', to: 'judge', parallel: false },
  ];

  const getXY = (nodeKey, containerW, containerH) => {
    const node = nodes[nodeKey];
    const x = parseFloat(node.x) / 100 * containerW;
    const y = parseFloat(node.y) / 100 * containerH;
    return { x, y };
  };

  // SVG path between two percentage-based nodes
  const renderEdges = () => {
    const W = 500, H = 280;
    return edges.map((edge, i) => {
      const from = nodes[edge.from];
      const to = nodes[edge.to];
      const x1 = parseFloat(from.x) / 100 * W;
      const y1 = parseFloat(from.y) / 100 * H + 14;
      const x2 = parseFloat(to.x) / 100 * W;
      const y2 = parseFloat(to.y) / 100 * H - 6;
      const cy = (y1 + y2) / 2;
      const path = `M ${x1} ${y1} C ${x1} ${cy}, ${x2} ${cy}, ${x2} ${y2}`;
      return (
        <g key={i}>
          <path
            d={path}
            stroke={edge.parallel ? '#9B59FF' : '#00D4FF'}
            strokeWidth={edge.parallel ? 1.5 : 1}
            strokeDasharray={edge.parallel ? '0' : '4 3'}
            fill="none"
            opacity={0.35}
          />
          {/* Animated dot */}
          <motion.circle
            r="3"
            fill={edge.parallel ? '#9B59FF' : '#00D4FF'}
            filter="url(#glow)"
            animate={{ offsetDistance: ['0%', '100%'] }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'linear', delay: i * 0.4 }}
          >
            <animateMotion
              dur={`${2 + i * 0.3}s`}
              repeatCount="indefinite"
              path={path}
            />
          </motion.circle>
        </g>
      );
    });
  };

  return (
    <div className="relative w-full" style={{ height: '300px' }}>
      {/* SVG Edges Layer */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 500 280"
        preserveAspectRatio="xMidYMid meet"
        style={{ pointerEvents: 'none' }}
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {renderEdges()}
      </svg>

      {/* Parallel Execution Banner */}
      <div
        className="absolute left-[5%] right-[5%] border border-[#9B59FF]/25 rounded-sm bg-[#9B59FF]/5"
        style={{ top: '30%', height: '24%', pointerEvents: 'none' }}
      >
        <div className="absolute -top-2.5 left-3 font-mono text-xs text-[#9B59FF]/70 bg-[#060C14] px-1">
          ⚡ PARALLEL EXECUTION LAYER
        </div>
      </div>

      {/* Nodes */}
      {Object.entries(nodes).map(([key, node]) => (
        <motion.div
          key={key}
          className="absolute"
          style={{
            left: node.x,
            top: node.y,
            transform: 'translate(-50%, -50%)',
          }}
          onMouseEnter={() => setHovered(key)}
          onMouseLeave={() => setHovered(null)}
          whileHover={{ scale: 1.08, zIndex: 10 }}
        >
          {/* Tooltip */}
          <AnimatePresence>
            {hovered === key && (
              <motion.div
                initial={{ opacity: 0, y: 4, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-44 bg-[#060C14] border rounded-sm p-2 z-20 pointer-events-none"
                style={{ borderColor: node.color + '50' }}
              >
                <p className="font-mono text-xs text-slate-300">{node.desc}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div
            className="relative flex items-center justify-center px-3 py-2 rounded-sm border font-mono text-xs font-semibold cursor-pointer whitespace-nowrap"
            style={{
              backgroundColor: node.color + '12',
              borderColor: node.color + '60',
              color: node.color,
              boxShadow: hovered === key ? `0 0 20px ${node.color}40` : `0 0 8px ${node.color}20`,
            }}
          >
            <div
              className="absolute -top-1 -right-1 w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: node.color }}
            />
            {node.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// ─── Tech Badge Component ─────────────────────────────────────────
const TechBadge = ({ label, color = '#00D4FF' }) => (
  <span
    className="font-mono text-xs px-3 py-1 rounded-sm border font-medium"
    style={{
      borderColor: color + '40',
      color: color,
      background: color + '08',
    }}
  >
    {label}
  </span>
);

// ─── Main Hero Project Component ──────────────────────────────────
const HeroProject = () => {
  const [activeTab, setActiveTab] = useState('architecture');

  const tabs = [
    { id: 'architecture', label: 'ARCHITECTURE' },
    { id: 'problem', label: 'THE PROBLEM' },
    { id: 'stack', label: 'TECH STACK' },
  ];

  return (
    <section
      id="hero-project"
      className="relative py-32 bg-[#020408] overflow-hidden"
    >
      {/* Background accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #9B59FF, #00D4FF, transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono text-xs text-[#9B59FF] tracking-widest">01 // FLAGSHIP SYSTEM</span>
          <div className="flex-1 h-px bg-[#9B59FF]/20" />
          <span className="font-mono text-xs text-[#9B59FF]/50">MULTI-AGENT COGNITIVE ARCHITECTURE</span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* ── LEFT: Project Info ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Project Number */}
            <div className="font-mono text-8xl font-black text-[#9B59FF]/8 leading-none mb-4 select-none">
              001
            </div>

            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-4 -mt-8">
              Multi-Agent AI<br />
              <span className="gradient-text-green">Decision Debater</span>
            </h2>

            <p className="text-slate-400 leading-relaxed mb-8 max-w-md">
              Combines cognitive architecture with decision theory to eliminate costly "gut-trusting" —
              six specialized AI agents challenge, verify, and synthesize a complete analysis of
              any high-stakes decision before you commit.
            </p>

            {/* Tabs */}
            <div className="flex gap-1 mb-6 border-b border-[#0F1E35]">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`font-mono text-xs px-4 py-2.5 border-b-2 transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-[#9B59FF] text-[#9B59FF]'
                      : 'border-transparent text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'architecture' && (
                <motion.div
                  key="arch"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="space-y-3"
                >
                  {[
                    { node: 'ORCHESTRATOR', role: 'Dimension planning & graph routing', color: '#9B59FF' },
                    { node: 'PARALLEL LAYER', role: 'Optimist | Devil\'s Advocate | Risk Analyst — run concurrently', color: '#FFB800' },
                    { node: 'RESEARCHER', role: 'Live web exploration via Tavily Search API', color: '#00D4FF' },
                    { node: 'JUDGE', role: 'Verdict with 1–5 harshness tuning & confidence score', color: '#00FF88' },
                  ].map(({ node, role, color }) => (
                    <div key={node} className="flex gap-3 items-start">
                      <div
                        className="mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2"
                        style={{ background: color, boxShadow: `0 0 6px ${color}` }}
                      />
                      <div>
                        <span className="font-mono text-xs font-semibold" style={{ color }}>
                          {node}
                        </span>
                        <span className="font-mono text-xs text-slate-400 ml-2">→ {role}</span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'problem' && (
                <motion.div
                  key="prob"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="space-y-4"
                >
                  <p className="text-slate-300 text-sm leading-relaxed">
                    High-stakes decisions fail due to three systematic errors:
                  </p>
                  {[
                    { icon: '⚠', text: 'Gut-trusting without structured analysis' },
                    { icon: '⚠', text: 'Confirmation bias — only finding supporting evidence' },
                    { icon: '⚠', text: 'Shallow research that misses critical risks' },
                  ].map(({ icon, text }) => (
                    <div key={text} className="flex gap-3 items-center p-3 bg-[#FF444408] border border-[#FF4444]/15 rounded-sm">
                      <span className="text-[#FF4444]">{icon}</span>
                      <span className="text-slate-400 text-sm">{text}</span>
                    </div>
                  ))}
                  <p className="text-[#00FF88] text-sm font-medium mt-4">
                    → This system forces multi-perspective analysis before any verdict is delivered.
                  </p>
                </motion.div>
              )}

              {activeTab === 'stack' && (
                <motion.div
                  key="stack"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { tech: 'LangGraph', role: 'State machine & graph routing', color: '#9B59FF' },
                      { tech: 'Groq API', role: 'Ultra-fast LLM inference', color: '#FFB800' },
                      { tech: 'Llama 3.3-70b', role: 'Core reasoning model', color: '#00D4FF' },
                      { tech: 'Tavily API', role: 'Real-time web search', color: '#00FF88' },
                      { tech: 'Streamlit', role: 'Interactive frontend', color: '#FF4444' },
                      { tech: 'Python', role: 'Backend orchestration', color: '#3776AB' },
                    ].map(({ tech, role, color }) => (
                      <div
                        key={tech}
                        className="p-3 bg-[#060C14] border border-[#0F1E35] rounded-sm hover:border-[#00D4FF]/20 transition-colors"
                      >
                        <div className="font-mono text-xs font-bold" style={{ color }}>{tech}</div>
                        <div className="font-mono text-xs text-slate-500 mt-0.5">{role}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CTA */}
            <div className="flex gap-3 mt-8">
              <motion.a
                href="https://github.com/Danialpro2k04/multi-agent-decision-debater"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm px-5 py-2.5 bg-[#9B59FF] text-white font-bold rounded-sm hover:bg-[#8B49EF] transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.03, boxShadow: '0 0 25px rgba(155,89,255,0.4)' }}
                whileTap={{ scale: 0.97 }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                VIEW ON GITHUB
              </motion.a>
              <div className="flex flex-wrap gap-2 items-center">
                <TechBadge label="LangGraph" color="#9B59FF" />
                <TechBadge label="Groq" color="#FFB800" />
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: Architecture Graph ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="border border-[#9B59FF]/20 rounded-lg overflow-hidden bg-[#060C14]/80 border-glow-purple"
          >
            {/* Card header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#9B59FF]/15 bg-[#0A1628]/50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#9B59FF] animate-pulse" />
                <span className="font-mono text-xs text-[#9B59FF] tracking-wider">GRAPH_TOPOLOGY.json</span>
              </div>
              <span className="font-mono text-xs text-slate-600">6 NODES // 7 EDGES</span>
            </div>

            {/* Graph */}
            <div className="p-6">
              <ArchitectureGraph />
            </div>

            {/* Legend */}
            <div className="px-5 py-4 border-t border-[#9B59FF]/10 grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-px bg-[#9B59FF]" />
                <span className="font-mono text-xs text-slate-500">Parallel execution</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-px bg-[#00D4FF] border-t-dashed" style={{ borderStyle: 'dashed', borderColor: '#00D4FF', height: 0, borderWidth: '1px' }} />
                <span className="font-mono text-xs text-slate-500">Sequential hand-off</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroProject;
