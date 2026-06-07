import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const certifications = [
  {
    title: 'Large Language Model Operations (LLMOps)',
    issuer: 'Duke University',
    accent: '#00D4FF',
    icon: '🎓',
    category: 'LLMOps',
    skills: [
      'LLM deployment pipelines',
      'Model versioning & lifecycle management',
      'Inference cost optimization',
      'Monitoring & observability for LLMs',
      'CI/CD for ML systems',
    ],
  },
  {
    title: 'Operationalizing LLMs on Azure',
    issuer: 'Duke University',
    accent: '#00D4FF',
    icon: '☁️',
    category: 'Cloud AI',
    skills: [
      'Azure OpenAI Service integration',
      'Azure Container Apps deployment',
      'Prompt flow orchestration',
      'Scalable cloud AI infrastructure',
      'Azure AI Search configuration',
    ],
  },
  {
    title: 'Advanced Data Engineering',
    issuer: 'Duke University',
    accent: '#00D4FF',
    icon: '⚙️',
    category: 'Engineering',
    skills: [
      'Data pipeline architecture',
      'Apache Airflow orchestration',
      'ETL/ELT design patterns',
      'Cloud data warehousing',
      'Batch & streaming processing',
    ],
  },
  {
    title: 'GenAI and LLMs on AWS',
    issuer: 'Duke University',
    accent: '#00D4FF',
    icon: '🚀',
    category: 'Cloud AI',
    skills: [
      'AWS Bedrock & SageMaker',
      'Serverless AI with AWS Lambda',
      'DynamoDB for AI state storage',
      'AWS IAM for AI security',
      'Cost-efficient cloud LLM inference',
    ],
  },
  {
    title: 'Introduction to Generative AI',
    issuer: 'Duke University',
    accent: '#00D4FF',
    icon: '🧬',
    category: 'GenAI',
    skills: [
      'Generative model fundamentals',
      'Transformer architecture concepts',
      'Prompt design principles',
      'GenAI use-case evaluation',
      'Responsible AI practices',
    ],
  },
  {
    title: 'Fundamentals of AI Agents Using RAG and LangChain',
    issuer: 'IBM',
    accent: '#9B59FF',
    icon: '🤖',
    category: 'Agentic AI',
    skills: [
      'LangChain agent construction',
      'RAG pipeline design',
      'Tool-use & function calling',
      'Agent memory management',
      'Retrieval-augmented generation',
    ],
  },
  {
    title: 'Vector Databases for RAG: An Introduction',
    issuer: 'IBM',
    accent: '#9B59FF',
    icon: '🗄️',
    category: 'Vector DB',
    skills: [
      'Vector embedding strategies',
      'Semantic similarity search',
      'Qdrant / Pinecone / Weaviate usage',
      'Chunking & indexing techniques',
      'Hybrid dense + sparse retrieval',
    ],
  },
  {
    title: 'Generative AI Engineering and Fine-Tuning Transformers',
    issuer: 'IBM',
    accent: '#9B59FF',
    icon: '🔬',
    category: 'GenAI',
    skills: [
      'Transformer fine-tuning (LoRA / QLoRA)',
      'Hugging Face ecosystem',
      'Instruction tuning & RLHF concepts',
      'Model evaluation & benchmarking',
      'Dataset preparation for fine-tuning',
    ],
  },
  {
    title: 'Use AI as a Creative or Expert Partner',
    issuer: 'Google',
    accent: '#00FF88',
    icon: '🌐',
    category: 'Applied AI',
    skills: [
      'AI-augmented workflows',
      'Effective human-AI collaboration',
      'Prompt chaining strategies',
      'AI for research & synthesis',
      'Productivity with AI tools',
    ],
  },
  {
    title: 'Google Prompting Essentials Specialization',
    issuer: 'Google',
    accent: '#00FF88',
    icon: '💡',
    category: 'Prompting',
    skills: [
      'Advanced prompt engineering',
      'Chain-of-thought prompting',
      'Few-shot & zero-shot techniques',
      'Role & context framing',
      'Output formatting & control',
    ],
  },
  {
    title: 'Automation AI Accelerator: From Co-pilot to Autonomous Agent',
    issuer: 'Forage / Datacom',
    accent: '#FFB800',
    icon: '⚡',
    category: 'Agentic AI',
    skills: [
      'Agentic workflow design',
      'Task decomposition & planning',
      'Tool-calling autonomous agents',
      'Human-in-the-loop integration',
      'Enterprise AI automation strategy',
    ],
  },
  {
    title: 'Neural Networks & Deep Learning',
    issuer: 'DeepLearning.AI',
    accent: '#FF6B6B',
    icon: '🧠',
    category: 'Deep Learning',
    skills: [
      'Feedforward neural network design',
      'Backpropagation & gradient descent',
      'Activation functions & regularization',
      'Hyperparameter tuning',
      'NumPy-level implementation from scratch',
    ],
  },
];

const issuerMeta = {
  'Duke University':    { color: '#00D4FF', short: 'Duke' },
  'IBM':                { color: '#9B59FF', short: 'IBM'  },
  'Google':             { color: '#00FF88', short: 'Google' },
  'Forage / Datacom':   { color: '#FFB800', short: 'Forage' },
  'DeepLearning.AI':    { color: '#FF6B6B', short: 'DL.AI' },
};

const issuers = ['All', ...Object.keys(issuerMeta)];

// ─── Single Card ──────────────────────────────────────────────────
const CertCard = ({ cert, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group relative border rounded-lg bg-[#060C14] overflow-hidden cursor-pointer"
      style={{ borderColor: open ? cert.accent + '40' : '#0F1E35' }}
      onClick={() => setOpen(!open)}
      whileHover={{ borderColor: cert.accent + '30' }}
    >
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-0.5 transition-opacity duration-300"
        style={{
          background: cert.accent,
          boxShadow: open ? `0 0 10px ${cert.accent}` : 'none',
          opacity: open ? 1 : 0.35,
        }}
      />

      {/* Header row */}
      <div className="pl-5 pr-4 py-4 flex items-start gap-4">
        {/* Icon */}
        <div
          className="flex-shrink-0 w-9 h-9 rounded-sm flex items-center justify-center text-base mt-0.5"
          style={{ background: cert.accent + '10', border: `1px solid ${cert.accent}25` }}
        >
          {cert.icon}
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span
              className="font-mono text-xs px-1.5 py-0.5 rounded-sm border"
              style={{ borderColor: cert.accent + '30', color: cert.accent, background: cert.accent + '08' }}
            >
              {cert.issuer}
            </span>
            <span className="font-mono text-xs text-slate-600">{cert.category}</span>
          </div>
          <p className="font-display font-semibold text-sm text-white leading-snug">
            {cert.title}
          </p>
        </div>

        {/* Expand chevron + verified dot */}
        <div className="flex-shrink-0 flex flex-col items-center gap-2 mt-1">
          <div
            className="w-4 h-4 rounded-full flex items-center justify-center"
            style={{ background: cert.accent + '15' }}
          >
            <svg className="w-2.5 h-2.5" viewBox="0 0 10 10" fill="none">
              <path d="M1.5 4l3 3 4-4" stroke={cert.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="text-slate-600"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <path d="M6 8.5L1.5 4h9L6 8.5z" />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Expanded skills panel */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div
              className="mx-4 mb-4 rounded-sm p-4 border"
              style={{ background: cert.accent + '06', borderColor: cert.accent + '18' }}
            >
              <p className="font-mono text-xs mb-3" style={{ color: cert.accent + 'AA' }}>
                SKILLS GAINED
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                {cert.skills.map((skill, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div
                      className="w-1 h-1 rounded-full flex-shrink-0"
                      style={{ background: cert.accent }}
                    />
                    <span className="font-mono text-xs text-slate-300">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─── Main Section ─────────────────────────────────────────────────
const Certifications = () => {
  const [activeIssuer, setActiveIssuer] = useState('All');

  const filtered = activeIssuer === 'All'
    ? certifications
    : certifications.filter(c => c.issuer === activeIssuer);

  const counts = issuers.reduce((acc, issuer) => {
    acc[issuer] = issuer === 'All'
      ? certifications.length
      : certifications.filter(c => c.issuer === issuer).length;
    return acc;
  }, {});

  return (
    <section id="certifications" className="relative py-32 bg-[#020408]">
      {/* Top border line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #FFB800, #00D4FF, transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-xs text-[#FFB800] tracking-widest">05 // CERTIFICATIONS</span>
            <div className="flex-1 h-px bg-[#FFB800]/20" />
            <span className="font-mono text-xs text-slate-600">{certifications.length} CREDENTIALS</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-4">
            Verified <span style={{ color: '#FFB800' }}>Credentials</span>
          </h2>
          <p className="text-slate-400 max-w-xl">
            Structured learning from top-tier institutions — each mapped to concrete engineering skills.
            Click any certificate to expand the skills acquired.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {issuers.map((issuer) => {
            const active = activeIssuer === issuer;
            const color = issuerMeta[issuer]?.color || '#FFB800';
            return (
              <button
                key={issuer}
                onClick={() => setActiveIssuer(issuer)}
                className="font-mono text-xs px-3 py-2 rounded-sm border transition-all duration-200 flex items-center gap-2"
                style={{
                  borderColor: active ? color + '55' : '#0F1E35',
                  color: active ? color : '#64748b',
                  background: active ? color + '10' : 'transparent',
                  boxShadow: active ? `0 0 12px ${color}18` : 'none',
                }}
              >
                {issuer}
                <span
                  className="font-mono text-xs px-1 rounded-sm"
                  style={{
                    background: active ? color + '20' : '#0F1E35',
                    color: active ? color : '#475569',
                  }}
                >
                  {counts[issuer]}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Hint */}
        <div className="flex items-center gap-2 mb-5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#FFB800]/40" />
          <span className="font-mono text-xs text-slate-600">Click any card to reveal skills gained</span>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 gap-3">
          {filtered.map((cert, index) => (
            <CertCard key={cert.title} cert={cert} index={index} />
          ))}
        </div>

        {/* Issuer summary strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 pt-8 border-t border-[#0A1628] grid grid-cols-2 sm:grid-cols-5 gap-3"
        >
          {Object.entries(issuerMeta).map(([issuer, { color, short }]) => {
            const count = certifications.filter(c => c.issuer === issuer).length;
            return (
              <div
                key={issuer}
                className="text-center p-4 border border-[#0A1628] rounded-sm bg-[#060C14] cursor-pointer hover:border-opacity-40 transition-colors"
                style={{ '--hover-color': color }}
                onClick={() => setActiveIssuer(issuer === activeIssuer ? 'All' : issuer)}
              >
                <div className="font-mono text-2xl font-bold mb-1" style={{ color }}>{count}</div>
                <div className="font-mono text-xs text-slate-500 leading-tight">{short}</div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
