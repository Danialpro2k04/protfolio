import React from 'react';
import { motion } from 'framer-motion';

const Experience = () => {
  return (
    <section id="experience" className="relative py-24 bg-[#020408]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-xs text-[#FFB800] tracking-widest">04 // BACKGROUND</span>
            <div className="flex-1 h-px bg-[#FFB800]/20" />
          </div>
          <h2 className="font-display font-extrabold text-3xl text-white">
            Career <span className="text-[#FFB800]">Timeline</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-[#FFB800]/50 via-[#00D4FF]/30 to-transparent" />

          <div className="space-y-10 ml-12">
            {/* Experience 1 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -left-[52px] top-1.5 w-4 h-4 rounded-full border-2 border-[#FFB800] bg-[#020408] node-pulse" />
              <div className="border border-[#0F1E35] rounded-lg p-6 bg-[#060C14] hover:border-[#FFB800]/20 transition-colors">
                <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">Freelance AI Engineer</h3>
                    <p className="font-mono text-sm text-[#FFB800]">Independent Contractor</p>
                  </div>
                  <span className="font-mono text-xs text-slate-500 border border-[#0F1E35] px-3 py-1 rounded-sm">
                    Jan 2024 — Present
                  </span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  Designing and deploying custom AI backends, RAG pipelines, and API integrations for
                  varied client workflows. Building production-grade agentic systems that transition
                  clients from basic chatbots to fully autonomous, revenue-generating workflows.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {['LangGraph', 'FastAPI', 'Qdrant', 'Azure AI', 'AWS Lambda', 'Docker'].map(t => (
                    <span key={t} className="font-mono text-xs px-2 py-0.5 bg-[#0A1628] border border-[#FFB800]/15 text-slate-400 rounded-sm">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative"
            >
              <div className="absolute -left-[52px] top-1.5 w-4 h-4 rounded-full border-2 border-[#9B59FF] bg-[#020408]" />
              <div className="border border-[#0F1E35] rounded-lg p-6 bg-[#060C14] hover:border-[#9B59FF]/20 transition-colors">
                <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">BS Computer Science</h3>
                    <p className="font-mono text-sm text-[#9B59FF]">NUML, Islamabad</p>
                  </div>
                  <span className="font-mono text-xs text-slate-500 border border-[#0F1E35] px-3 py-1 rounded-sm">
                    In Progress
                  </span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Building a strong foundation in computer science fundamentals, algorithms, and
                  software engineering principles. Applying academic knowledge to real-world AI
                  engineering projects and production deployments.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
