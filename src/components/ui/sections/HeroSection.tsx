"use client";
import { motion } from "motion/react";

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[calc(100vh-62px)] px-6 md:px-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center gap-6 text-center max-w-3xl relative z-10"
      >
        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-0"
        >
          <h1
            className="text-5xl sm:text-6xl md:text-[5.5rem] leading-[0.92] tracking-[-0.045em]"
            style={{ fontWeight: 300, color: "var(--text-secondary)" }}
          >
            Andres
          </h1>
          <h1
            className="text-5xl sm:text-6xl md:text-[5.5rem] leading-[0.92] tracking-[-0.045em]"
            style={{ fontWeight: 700, color: "var(--text-primary)" }}
          >
            Lorente Martinez
          </h1>
        </motion.div>

        {/* Divider + role */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex items-center gap-4"
        >
          <div style={{ width: 40, height: 1, background: "var(--border-medium)" }} />
          <span className="section-label" style={{ letterSpacing: "0.2em" }}>Software Engineer</span>
          <div style={{ width: 40, height: 1, background: "var(--border-medium)" }} />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-[15px] md:text-[17px] leading-[1.6] max-w-md"
          style={{ color: "var(--text-secondary)", fontWeight: 400 }}
        >
          Desarrollo software con obsesion por el detalle.
          <br />
          Interfaces que se sienten, codigo que escala.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.4 }}
          className="flex items-center gap-3 mt-2"
        >
          <a
            href="https://github.com/Andresmartineez6"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-6 py-2.5 rounded-full text-[13px] font-medium overflow-hidden transition-all duration-500"
            style={{ background: "var(--text-primary)", color: "var(--bg-primary)" }}
          >
            <span className="relative z-10">Ver GitHub</span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: "linear-gradient(135deg, var(--accent-primary), #fff)" }} />
          </a>
          <a
            href="https://linkedin.com/in/AndresLorenteMartinez"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-full text-[13px] font-medium transition-all duration-300 hover:border-[rgba(255,255,255,0.15)]"
            style={{ border: "1px solid var(--border-medium)", color: "var(--text-secondary)" }}
          >
            LinkedIn
          </a>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
              <rect x="0.5" y="0.5" width="13" height="21" rx="6.5" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              <motion.circle
                cx="7" r="1.5" fill="rgba(255,255,255,0.35)"
                animate={{ cy: [7, 13, 7] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
