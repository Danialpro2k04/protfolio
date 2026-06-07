import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  {
    id: 'azure-rag',
    number: '002',
    title: 'Enterprise Azure RAG Pipeline',
    tagline: 'Production-grade document intelligence for zero hallucinations',
    type: 'ENTERPRISE SYSTEM',
    status: 'PRODUCTION',
    problem: 'Enterprise data is locked in documents. Generic chatbots hallucinate. Business-critical queries need deterministic, grounded answers from internal knowledge bases.',
    solution: 'A fully-managed RAG pipeline on Azure: hybrid search (keyword + semantic) via Azure AI Search, strict prompt grounding with source attribution, and document chunking strategies tuned for factual accuracy.',
    architecture: [
      'Azure AI Search (hybrid retrieval)',
      'LLM inference with grounded prompting',
      'Document ingestion & intelligent chunking',
      'Source attribution & hallucination detection',
    ],
    metrics: [
      { label: 'HALLUC. RATE', value: '~0%', unit: 'GROUNDED' },
      { label: 'RETRIEVAL', value: 'Hybrid', unit: 'SEARCH' },
    ],
    stack: [
      { label: 'Azure AI Search', color: '#00D4FF' },
      { label: 'LLMs', color: '#9B59FF' },
      { label: 'Python', color: '#3776AB' },
    ],
    accent: '#00D4FF',
    github: 'https://github.com/Danialpro2k04',
    icon: '🔍',
  },
  {
    id: 'semantic-router',
    number: '003',
    title: 'Semantic Router Microservice',
    tagline: 'Vector-based intent detection that cuts LLM API costs by ~80%',
    type: 'COST OPTIMIZATION INFRA',
    status: 'PRODUCTION',
    problem: 'Every user query getting forwarded to an expensive LLM — even simple FAQ lookups — is a cost and latency disaster at scale. Companies waste thousands monthly on unnecessary inference.',
    solution: 'A FastAPI microservice that intercepts queries via 512-dim vector embeddings, classifies intent locally in milliseconds, routes routine queries to cached responses, and only escalates complex reasoning to the LLM.',
    architecture: [
      'FastAPI async endpoint layer',
      'Qdrant vector store (local/self-hosted)',
      'Embedding model for semantic encoding',
      'Intent classification with threshold routing',
    ],
    metrics: [
      { label: 'COST REDUCTION', value: '80%', unit: 'SAVINGS' },
      { label: 'LATENCY', value: '<50', unit: 'MS LOCAL' },
    ],
    stack: [
      { label: 'FastAPI', color: '#00FF88' },
      { label: 'Qdrant', color: '#00D4FF' },
      { label: 'Microservices', color: '#FFB800' },
    ],
    accent: '#00FF88',
    github: 'https://github.com/Danialpro2k04',
    icon: '⚡',
  },
  {
    id: 'llmops-telemetry',
    number: '004',
    title: 'LLMOps Telemetry API',
    tagline: 'Observability infrastructure for production LLM workloads',
    type: 'OBSERVABILITY BACKEND',
    status: 'PRODUCTION',
    problem: 'Deploying LLMs without visibility is flying blind. Token budgets balloon, inference latency spikes go undetected, and model degradation happens silently — until customers complain.',
    solution: 'A FastAPI telemetry backend that instruments LLM calls in real-time: token tracking, latency histograms, error rate monitoring, and dashboardable metrics — the Datadog equivalent for LLM infrastructure.',
    architecture: [
      'FastAPI async telemetry collectors',
      'Token usage & cost attribution tracking',
      'Latency percentile measurement (p50/p95/p99)',
      'Alert thresholds & error rate monitoring',
    ],
    metrics: [
      { label: 'INSTRUMENTED', value: 'Real-time', unit: 'METRICS' },
      { label: 'LATENCY', value: 'p95/p99', unit: 'TRACKED' },
    ],
    stack: [
      { label: 'LLMOps', color: '#9B59FF' },
      { label: 'Observability', color: '#FFB800' },
      { label: 'FastAPI', color: '#00FF88' },
    ],
    accent: '#9B59FF',
    github: 'https://github.com/Danialpro2k04',
    icon: '📊',
  },
  {
    id: 'core-rag',
    number: '005',
    title: 'Core RAG Architecture',
    tagline: 'Research-grade RAG with advanced chunking & embedding strategies',
    type: 'FOUNDATIONAL SYSTEM',
    status: 'RESEARCH',
    problem: 'Off-the-shelf RAG implementations produce poor retrieval quality. Context windows get polluted with irrelevant chunks, degrading answer quality.',
    solution: 'A custom RAG implementation focused on chunking science: recursive character splitting, semantic chunking, parent-child retrieval, and embedding strategy benchmarking across vector stores.',
    architecture: [
      'Multi-strategy text chunking comparison',
      'Dense + sparse vector retrieval',
      'Parent-child document retrieval',
      'Embedding model benchmarking suite',
    ],
    metrics: [
      { label: 'CHUNKING', value: 'Multi-strat', unit: 'TESTED' },
      { label: 'VECTORS', value: 'Dense+Sparse', unit: 'HYBRID' },
    ],
    stack: [
      { label: 'Vector DBs', color: '#00D4FF' },
      { label: 'Semantic Search', color: '#9B59FF' },
      { label: 'Chunking', color: '#00FF88' },
    ],
    accent: '#00D4FF',
    github: 'https://github.com/Danialpro2k04',
    icon: '🧠',
  },
  {
    id: 'lstm-predictive',
    number: '006',
    title: 'Predictive Maintenance LSTM',
    tagline: 'Deep learning model for turbofan RUL prediction on NASA dataset',
    type: 'DEEP LEARNING RESEARCH',
    status: 'RESEARCH',
    problem: 'Unplanned equipment failures cost industrial operators billions annually. Predicting remaining useful life of machinery enables just-in-time maintenance and prevents catastrophic failure.',
    solution: 'A PyTorch LSTM model trained on the NASA CMAPSS turbofan dataset to predict Remaining Useful Life (RUL). Multi-variate time-series sensor data processed through a sequence-aware recurrent architecture.',
    architecture: [
      'NASA C-MAPSS dataset preprocessing',
      'LSTM sequence modeling for time-series',
      'RUL regression with bounded prediction',
      'Training curves & RMSE evaluation',
    ],
    metrics: [
      { label: 'DATASET', value: 'NASA', unit: 'CMAPSS' },
      { label: 'MODEL', value: 'LSTM', unit: 'RNN' },
    ],
    stack: [
      { label: 'PyTorch', color: '#EE4C2C' },
      { label: 'Time-Series', color: '#FFB800' },
      { label: 'Deep Learning', color: '#9B59FF' },
    ],
    accent: '#FFB800',
    github: 'https://github.com/Danialpro2k04',
    icon: '🔧',
  },
];

// ─── Case Study Card ──────────────────────────────────────────────
const CaseStudyCard = ({ project, index }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative border rounded-lg overflow-hidden bg-[#060C14] hover-lift cursor-pointer"
      style={{
        borderColor: expanded ? project.accent + '40' : '#0F1E35',
        boxShadow: expanded ? `0 0 30px ${project.accent}15` : 'none',
      }}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-0.5 transition-all duration-300"
        style={{
          background: project.accent,
          boxShadow: expanded ? `0 0 12px ${project.accent}` : 'none',
          opacity: expanded ? 1 : 0.3,
        }}
      />

      {/* Card Header */}
      <div className="pl-6 pr-5 py-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            {/* Number */}
            <span
              className="font-mono text-xs font-bold opacity-30 mt-0.5 flex-shrink-0"
              style={{ color: project.accent }}
            >
              {project.number}
            </span>

            <div className="flex-1">
              {/* Type + Status */}
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs" style={{ color: project.accent + 'AA' }}>
                  {project.type}
                </span>
                <span
                  className="font-mono text-xs px-1.5 py-0.5 rounded-sm border"
                  style={{
                    borderColor: project.status === 'PRODUCTION' ? '#00FF88' + '30' : '#FFB800' + '30',
                    color: project.status === 'PRODUCTION' ? '#00FF88' : '#FFB800',
                    background: project.status === 'PRODUCTION' ? '#00FF8808' : '#FFB80008',
                  }}
                >
                  {project.status}
                </span>
              </div>

              <h3 className="font-display font-bold text-lg text-white group-hover:text-[#00D4FF] transition-colors mb-1">
                {project.title}
              </h3>
              <p className="text-slate-500 text-sm">{project.tagline}</p>
            </div>
          </div>

          {/* Expand Arrow */}
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-slate-600 group-hover:text-slate-400 flex-shrink-0 mt-1"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 11L3 6h10l-5 5z" />
            </svg>
          </motion.div>
        </div>

        {/* Stack badges — always visible */}
        <div className="flex flex-wrap gap-1.5 mt-4 ml-8">
          {project.stack.map(({ label, color }) => (
            <span
              key={label}
              className="font-mono text-xs px-2 py-0.5 rounded-sm border"
              style={{ borderColor: color + '30', color, background: color + '08' }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div
              className="mx-4 mb-4 rounded-sm border p-5 space-y-5"
              style={{ borderColor: project.accent + '15', background: '#020408' }}
            >
              {/* Metrics */}
              <div className="grid grid-cols-2 gap-3">
                {project.metrics.map(({ label, value, unit }) => (
                  <div
                    key={label}
                    className="p-3 rounded-sm border text-center"
                    style={{ borderColor: project.accent + '20', background: project.accent + '05' }}
                  >
                    <div className="font-mono text-base font-bold" style={{ color: project.accent }}>
                      {value}
                    </div>
                    <div className="font-mono text-xs text-slate-500">{unit}</div>
                    <div className="font-mono text-xs text-slate-600 mt-0.5">{label}</div>
                  </div>
                ))}
              </div>

              {/* Problem */}
              <div>
                <div className="font-mono text-xs text-[#FF4444] mb-2 flex items-center gap-2">
                  <span>THE PROBLEM</span>
                  <div className="flex-1 h-px bg-[#FF4444]/15" />
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{project.problem}</p>
              </div>

              {/* Solution */}
              <div>
                <div className="font-mono text-xs mb-2 flex items-center gap-2" style={{ color: project.accent }}>
                  <span>THE SOLUTION</span>
                  <div className="flex-1 h-px" style={{ background: project.accent + '20' }} />
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{project.solution}</p>
              </div>

              {/* Architecture */}
              <div>
                <div className="font-mono text-xs text-slate-500 mb-2">ARCHITECTURE COMPONENTS</div>
                <div className="space-y-1.5">
                  {project.architecture.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: project.accent }}
                      />
                      <span className="font-mono text-xs text-slate-400">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* GitHub Link */}
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs py-2 px-4 border rounded-sm transition-all"
                style={{
                  borderColor: project.accent + '40',
                  color: project.accent,
                }}
                whileHover={{ scale: 1.02, background: project.accent + '10' }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => e.stopPropagation()}
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                VIEW SOURCE CODE →
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─── Main Projects Section ────────────────────────────────────────
const Projects = () => {
  return (
    <section id="projects" className="relative py-32 bg-[#020408] overflow-hidden">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #00D4FF, #9B59FF, transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-xs text-[#00D4FF] tracking-widest">02 // TECHNICAL ARCHITECTURES</span>
            <div className="flex-1 h-px bg-[#00D4FF]/20" />
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-4">
            Engineering <span className="gradient-text">Case Studies</span>
          </h2>
          <p className="text-slate-400 max-w-xl">
            Not project cards. These are system-level implementations with defined problems,
            measured outcomes, and documented architecture decisions.
          </p>
        </motion.div>

        {/* Click to expand hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2 mb-6"
        >
          <div className="w-2 h-2 rounded-full bg-[#00D4FF]/40" />
          <span className="font-mono text-xs text-slate-600">Click any case study to expand the architecture</span>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-3">
          {projects.map((project, index) => (
            <CaseStudyCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
