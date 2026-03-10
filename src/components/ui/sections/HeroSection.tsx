"use client";
import { motion } from "motion/react";

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[calc(100vh-72px)] px-6 md:px-8">
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        className="flex flex-col items-center gap-6 text-center max-w-2xl">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.5 }}
          className="px-4 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-widest"
          style={{ border: "1px solid var(--border-accent)", color: "var(--accent-primary)", background: "var(--accent-glow)" }}>
          Software Engineer
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-none">
          <span className="gradient-text">Andres</span><br />
          <span style={{ color: "var(--text-primary)" }}>Lorente Martinez</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.9 }}
          className="text-sm md:text-base leading-relaxed max-w-md" style={{ color: "var(--text-secondary)" }}>
          Programador especializado en desarrollo de software. Capaz de trabajar tanto en el lado del cliente como del servidor, entregando proyectos de alta calidad dentro de los plazos establecidos.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.1 }}
          className="flex items-center gap-3 mt-4">
          <a href="https://github.com/Andresmartineez6" target="_blank" rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-lg text-xs font-medium transition-all duration-300 hover:shadow-[0_0_30px_var(--accent-glow-strong)] hover:-translate-y-0.5"
            style={{ background: "var(--accent-primary)", color: "white" }}>Ver GitHub</a>
          <a href="https://linkedin.com/in/AndresLorenteMartinez" target="_blank" rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-lg text-xs font-medium transition-all duration-300 hover:-translate-y-0.5"
            style={{ border: "1px solid var(--border-medium)", color: "var(--text-secondary)", background: "var(--bg-glass)" }}>LinkedIn</a>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.5 }}
          className="mt-12 flex flex-col items-center gap-2">
          <span className="text-[9px] font-mono uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-4 h-7 rounded-full flex justify-center pt-1.5" style={{ border: "1px solid var(--border-medium)" }}>
            <div className="w-1 h-1.5 rounded-full" style={{ background: "var(--accent-primary)" }} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
