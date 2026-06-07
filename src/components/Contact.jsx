import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactLink = ({ href, icon, label, sublabel, color, external = false }) => (
  <motion.a
    href={href}
    target={external ? '_blank' : undefined}
    rel={external ? 'noopener noreferrer' : undefined}
    className="group flex items-center gap-4 p-5 border rounded-lg bg-[#060C14] hover-lift transition-colors"
    style={{ borderColor: '#0F1E35' }}
    whileHover={{
      borderColor: color + '40',
      boxShadow: `0 0 20px ${color}15`,
    }}
    transition={{ duration: 0.2 }}
  >
    <div
      className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0 transition-colors"
      style={{ background: color + '10', border: `1px solid ${color}25` }}
    >
      {icon}
    </div>
    <div className="flex-1">
      <div className="font-mono text-xs text-slate-500 mb-0.5">{sublabel}</div>
      <div className="font-display font-semibold text-white group-hover:text-white transition-colors">
        {label}
      </div>
    </div>
    <svg
      className="w-4 h-4 text-slate-600 group-hover:translate-x-1 group-hover:text-slate-300 transition-all"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  </motion.a>
);

const Contact = () => {
  return (
    <section id="contact" className="relative py-32 bg-[#020408] overflow-hidden">
      {/* Top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #00D4FF, transparent)' }}
      />

      {/* Background radial */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center bottom, #00D4FF08, transparent 70%)' }}
      />

      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <div className="h-px w-16 bg-[#00D4FF]/20" />
          <span className="font-mono text-xs text-[#00D4FF] tracking-widest">05 // CONTACT</span>
          <div className="h-px w-16 bg-[#00D4FF]/20" />
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white mb-4 leading-tight">
            Stop building chatbots.
            <br />
            <span className="gradient-text">Let's build systems.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-lg mx-auto mb-12">
            If you need a hands-on builder to turn messy, unstructured processes
            into clean, automated AI workflows — my inbox is open.
          </p>
        </motion.div>

        {/* Main CTA Button */}
        <motion.a
          href="mailto:mdanyalwahdat@gmail.com?subject=Technical%20Inquiry%20from%20Portfolio"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(0,212,255,0.35)' }}
          whileTap={{ scale: 0.97 }}
          className="inline-block font-mono text-base font-bold px-10 py-4 bg-[#00D4FF] text-[#020408] rounded-sm mb-16 transition-colors hover:bg-[#00D4FF]/90"
        >
          GET IN TOUCH →
        </motion.a>

        {/* Contact Cards */}
        <div className="grid sm:grid-cols-3 gap-4 text-left mb-16">
          <ContactLink
            href="mailto:mdanyalwahdat@gmail.com?subject=Reaching%20out%20from%20Portfolio"
            icon={
              <svg className="w-5 h-5 text-[#00D4FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            }
            label="Send Email"
            sublabel="EMAIL"
            color="#00D4FF"
          />
          <ContactLink
            href="https://www.linkedin.com/in/danyal-wahdat-b747a928b/"
            icon={
              <svg className="w-5 h-5 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            }
            label="Danyal Wahdat"
            sublabel="LINKEDIN"
            color="#0A66C2"
            external
          />
          <ContactLink
            href="https://github.com/Danialpro2k04"
            icon={
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            }
            label="Danialpro2k04"
            sublabel="GITHUB"
            color="#6E40C9"
            external
          />
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="border-t border-[#0A1628] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="font-mono text-xs text-slate-600">
            © 2026 <span className="text-slate-500">Danyal Wahdat</span> · Crafted with precision.
          </div>
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
            <span className="font-mono text-xs text-slate-500">Based in Islamabad, PK · Available Remote</span>
          </div>
          <div className="font-mono text-xs text-slate-600">
            React · Tailwind · Framer Motion
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
