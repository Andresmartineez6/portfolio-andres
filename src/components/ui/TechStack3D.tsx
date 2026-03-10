"use client";
import { useRef, useCallback } from "react";
import { motion } from "motion/react";

interface TechItem { name: string; icon: string; color: string; category: string; }

const techs: TechItem[] = [
  { name: "TypeScript", icon: "TS", color: "#3178c6", category: "lang" },
  { name: "JavaScript", icon: "JS", color: "#f7df1e", category: "lang" },
  { name: "React", icon: "Re", color: "#61dafb", category: "front" },
  { name: "Next.js", icon: "Nx", color: "#ffffff", category: "front" },
  { name: "Three.js", icon: "3D", color: "#049ef4", category: "front" },
  { name: "TailwindCSS", icon: "Tw", color: "#38bdf8", category: "front" },
  { name: "Node.js", icon: "No", color: "#68a063", category: "back" },
  { name: "PostgreSQL", icon: "Pg", color: "#336791", category: "back" },
  { name: "Prisma", icon: "Pr", color: "#5a67d8", category: "back" },
  { name: "Docker", icon: "Dk", color: "#2496ed", category: "tool" },
  { name: "Git", icon: "Gt", color: "#f05032", category: "tool" },
  { name: "GLSL", icon: "GL", color: "#5586a4", category: "front" },
  { name: "Zustand", icon: "Zs", color: "#443e38", category: "front" },
  { name: "Motion", icon: "Mo", color: "#ff0055", category: "front" },
  { name: "Figma", icon: "Fi", color: "#f24e1e", category: "tool" },
  { name: "Vitest", icon: "Vi", color: "#6e9f18", category: "tool" },
  { name: "PHP", icon: "Ph", color: "#777bb4", category: "back" },
  { name: "SQL", icon: "SQ", color: "#e48e00", category: "lang" },
  { name: "ESLint", icon: "Es", color: "#4b32c3", category: "tool" },
  { name: "Postman", icon: "Pm", color: "#ff6c37", category: "tool" },
];

function TechCard({ tech, index }: { tech: TechItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = cardRef.current;
    const glow = glowRef.current;
    if (!el || !glow) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    el.style.transform = `perspective(600px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateZ(8px) scale(1.04)`;
    glow.style.opacity = "1";
    glow.style.background = `radial-gradient(circle at ${(x + 1) * 50}% ${(y + 1) * 50}%, ${tech.color}20 0%, transparent 60%)`;
  }, [tech.color]);

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current;
    const glow = glowRef.current;
    if (el) el.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg) translateZ(0px) scale(1)";
    if (glow) glow.style.opacity = "0";
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.03, ease: [0.22, 1, 0.36, 1] as const }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="tilt-card relative flex flex-col items-center justify-center gap-2.5 p-4 rounded-xl cursor-default overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.015)",
          border: "1px solid rgba(255,255,255,0.04)",
          minHeight: 90,
        }}
      >
        <div ref={glowRef} className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none" />
        <div
          className="relative flex items-center justify-center w-9 h-9 rounded-lg font-bold text-[11px] tracking-wider"
          style={{
            color: tech.color,
            background: `${tech.color}10`,
            border: `1px solid ${tech.color}18`,
            textShadow: `0 0 12px ${tech.color}30`,
            fontFamily: "var(--font-mono), monospace",
          }}
        >
          {tech.icon}
        </div>
        <span className="text-[10px] font-medium" style={{ color: "var(--text-secondary)" }}>{tech.name}</span>
      </div>
    </motion.div>
  );
}

export default function TechStack3D() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
      className="glass-panel overflow-hidden"
    >
      <div className="flex items-center gap-2 px-5 py-3" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
        <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>stack.config</span>
        <div className="ml-auto flex gap-3">
          {["Languages", "Frontend", "Backend", "Tools"].map((c) => (
            <span key={c} className="text-[9px] font-mono" style={{ color: "var(--text-muted)" }}>{c}</span>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-10 gap-2 p-4">
        {techs.map((tech, i) => (
          <TechCard key={tech.name} tech={tech} index={i} />
        ))}
      </div>
    </motion.div>
  );
}
