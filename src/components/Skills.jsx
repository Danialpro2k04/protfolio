import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// ─── Skill Bar ────────────────────────────────────────────────────
const SkillBar = ({ name, level, color, delay = 0 }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setWidth(level), delay * 1000 + 500);
    return () => clearTimeout(t);
  }, [level, delay]);

  return (
    <div className="group">
      <div className="flex justify-between items-center mb-1.5">
        <span className="font-mono text-xs text-slate-300 group-hover:text-white transition-colors">{name}</span>
        <span className="font-mono text-xs text-slate-600" style={{ color: color + '80' }}>{level}%</span>
      </div>
      <div className="h-1 bg-[#0A1628] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            boxShadow: `0 0 8px ${color}60`,
          }}
        />
      </div>
    </div>
  );
};

// ─── Skill Cluster Card ───────────────────────────────────────────
const SkillCluster = ({ category, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative border rounded-lg bg-[#060C14] overflow-hidden hover-lift group"
      style={{ borderColor: category.accent + '20' }}
    >
      {/* Top glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${category.accent}, transparent)` }}
      />

      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-[#0F1E35]">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-xs tracking-wider" style={{ color: category.accent + 'AA' }}>
            {category.domain}
          </span>
          <span
            className="font-mono text-xs px-2 py-0.5 rounded-sm border"
            style={{ borderColor: category.accent + '25', color: category.accent, background: category.accent + '08' }}
          >
            {category.level}
          </span>
        </div>
        <h3 className="font-display font-bold text-xl text-white">{category.title}</h3>
        <p className="text-slate-500 text-sm mt-1">{category.description}</p>
      </div>

      {/* Skills */}
      <div className="px-6 py-5 space-y-4">
        {category.skills.map((skill, i) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            color={category.accent}
            delay={index * 0.1 + i * 0.08}
          />
        ))}
      </div>

      {/* Tags */}
      <div className="px-6 pb-5 flex flex-wrap gap-1.5">
        {category.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-xs px-2 py-0.5 rounded-sm"
            style={{ background: category.accent + '0A', color: category.accent + 'BB' }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

// ─── Floating Tool Badge ──────────────────────────────────────────
const ToolBadge = ({ name, icon, accent, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ scale: 1.05, y: -2 }}
    className="flex items-center gap-2 px-3 py-2 border rounded-sm bg-[#060C14] cursor-default"
    style={{ borderColor: accent + '25' }}
  >
    <span>{icon}</span>
    <span className="font-mono text-xs text-slate-300">{name}</span>
  </motion.div>
);

const skillClusters = [
  {
    domain: 'CLUSTER_01 // AGENT ENGINEERING',
    title: 'Agentic AI',
    description: 'Multi-agent orchestration, state machines, and LLM graph architectures.',
    level: 'CORE EXPERTISE',
    accent: '#9B59FF',
    skills: [
      { name: 'LangGraph — State Graph Architecture', level: 92 },
      { name: 'LangChain — Chain & Agent Composition', level: 88 },
      { name: 'Multi-Agent State Management', level: 90 },
      { name: 'Parallel Execution & Graph Routing', level: 85 },
      { name: 'Human-in-the-Loop Design', level: 82 },
    ],
    tags: ['LangGraph', 'LangChain', 'StateGraph', 'Agent Logic', 'Orchestration'],
  },
  {
    domain: 'CLUSTER_02 // LLMOPS & INFRA',
    title: 'LLMOps & Cloud Infra',
    description: 'Production deployment, CI/CD pipelines, serverless compute, and cost monitoring.',
    level: 'PRODUCTION READY',
    accent: '#00D4FF',
    skills: [
      { name: 'Docker — Containerization', level: 88 },
      { name: 'GitHub Actions — CI/CD Pipelines', level: 85 },
      { name: 'AWS Lambda — Serverless Backend', level: 80 },
      { name: 'Azure Container Apps', level: 78 },
      { name: 'DynamoDB — NoSQL at Scale', level: 76 },
    ],
    tags: ['Docker', 'GitHub Actions', 'AWS Lambda', 'DynamoDB', 'Azure Container Apps'],
  },
  {
    domain: 'CLUSTER_03 // BACKENDS & VECTORS',
    title: 'Backends & Vector DB',
    description: 'High-performance APIs, semantic search infrastructure, and RAG pipelines.',
    level: 'EXPERT',
    accent: '#00FF88',
    skills: [
      { name: 'FastAPI — Async Backend Development', level: 93 },
      { name: 'Qdrant — Vector Store Architecture', level: 87 },
      { name: 'Semantic Routing & Embeddings', level: 85 },
      { name: 'Azure AI Search — Hybrid Retrieval', level: 82 },
      { name: 'RAG Pipeline Design', level: 90 },
    ],
    tags: ['FastAPI', 'Qdrant', 'Azure AI Search', 'RAG', 'Embeddings', 'REST APIs'],
  },
];

const tools = [
  { name: 'Python', icon: '🐍', accent: '#3776AB', delay: 0.0 },
  { name: 'AWS', icon: '☁', accent: '#FF9900', delay: 0.05 },
  { name: 'Azure AI', icon: '🔷', accent: '#0078D4', delay: 0.1 },
  { name: 'Apache Airflow', icon: '🌊', accent: '#017CEE', delay: 0.15 },
  { name: 'Groq API', icon: '⚡', accent: '#FFB800', delay: 0.2 },
  { name: 'Streamlit', icon: '🎈', accent: '#FF4B4B', delay: 0.25 },
  { name: 'Llama 3.3', icon: '🦙', accent: '#9B59FF', delay: 0.3 },
  { name: 'Tavily API', icon: '🔎', accent: '#00D4FF', delay: 0.35 },
  { name: 'PostgreSQL', icon: '🐘', accent: '#336791', delay: 0.4 },
  { name: 'Git', icon: '🌿', accent: '#F05032', delay: 0.45 },
];

// ─── Main Skills Section ──────────────────────────────────────────
const Skills = () => {
  return (
    <section id="skills" className="relative py-32 bg-[#020408]">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #00FF88, #00D4FF, transparent)' }}
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
            <span className="font-mono text-xs text-[#00FF88] tracking-widest">03 // ENGINEERING DNA</span>
            <div className="flex-1 h-px bg-[#00FF88]/20" />
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-4">
            Core <span className="gradient-text-green">Competency Stack</span>
          </h2>
          <p className="text-slate-400 max-w-xl">
            Three functional clusters — each representing production-proven skills
            that map directly to deliverables.
          </p>
        </motion.div>

        {/* Three Clusters */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {skillClusters.map((cluster, index) => (
            <SkillCluster key={cluster.domain} category={cluster} index={index} />
          ))}
        </div>

        {/* Additional Tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-xs text-slate-600 tracking-wider">ADDITIONAL TOOLS</span>
            <div className="flex-1 h-px bg-[#0F1E35]" />
          </div>
          <div className="flex flex-wrap gap-2">
            {tools.map((tool) => (
              <ToolBadge key={tool.name} {...tool} />
            ))}
          </div>
        </motion.div>

        {/* Philosophy Pills */}
        <div className="mt-16 grid md:grid-cols-3 gap-4">
          {[
            {
              icon: '🔬',
              title: 'Beyond the Wrapper',
              body: 'Robust orchestration layers with strict human-in-the-loop guardrails for deterministic outcomes.',
              color: '#9B59FF',
            },
            {
              icon: '💰',
              title: 'Cost-Obsessed Engineering',
              body: 'Semantic routing and intent detection intercept routine queries locally — cutting LLM costs by up to 80%.',
              color: '#00FF88',
            },
            {
              icon: '🚀',
              title: 'Production-Ready Deployment',
              body: 'Everything designed for scale — from local scripts to revenue-ready products via FastAPI + cloud.',
              color: '#00D4FF',
            },
          ].map(({ icon, title, body, color }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="p-5 border rounded-lg bg-[#060C14] border-[#0F1E35] hover:border-[#00D4FF]/20 transition-colors"
            >
              <div className="text-2xl mb-3">{icon}</div>
              <h4 className="font-display font-bold text-white mb-2">{title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
