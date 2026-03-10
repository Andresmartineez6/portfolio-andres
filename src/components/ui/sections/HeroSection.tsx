"use client";
import { motion } from "motion/react";

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[calc(100vh-66px)] px-6 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
        className="flex flex-col items-center gap-5 text-center max-w-3xl relative z-10"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight leading-[0.95]"
          style={{ fontWeight: 700, letterSpacing: "-0.04em" }}
        >
          <span className="gradient-text">Andres</span>
          <br />
          <span style={{ color: "var(--text-primary)" }}>Lorente Martinez</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="flex items-center gap-3 mt-2"
        >
          <div style={{ width: 32, height: 1, background: "var(--border-medium)" }} />
          <span style={{
            fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.2em",
            textTransform: "uppercase", color: "var(--text-muted)",
          }}>
            Software Engineer
          </span>
          <div style={{ width: 32, height: 1, background: "var(--border-medium)" }} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-base md:text-lg leading-relaxed max-w-lg mt-2"
          style={{ color: "var(--text-secondary)", fontWeight: 400, letterSpacing: "-0.01em" }}
        >
          Desarrollo software con obsesion por el detalle.
          Interfaces que se sienten, codigo que escala.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="flex items-center gap-4 mt-6"
        >
          <a
            href="https://github.com/Andresmartineez6"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: "var(--text-primary)",
              color: "var(--bg-primary)",
              letterSpacing: "-0.01em",
            }}
          >
            Ver GitHub
          </a>
          <a
            href="https://linkedin.com/in/AndresLorenteMartinez"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:-translate-y-0.5"
            style={{
              border: "1px solid var(--border-medium)",
              color: "var(--text-secondary)",
              background: "transparent",
              letterSpacing: "-0.01em",
            }}
          >
            LinkedIn
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.0 }}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
              <rect x="0.5" y="0.5" width="15" height="23" rx="7.5" stroke="rgba(255,255,255,0.12)" />
              <motion.circle
                cx="8" cy="8" r="2" fill="rgba(255,255,255,0.3)"
                animate={{ cy: [7, 14, 7] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
