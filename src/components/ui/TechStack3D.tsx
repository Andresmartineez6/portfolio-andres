"use client";
import { motion } from "motion/react";

interface TechItem { name: string; icon: string; color: string; }

const techs: TechItem[] = [
  { name: "TypeScript", icon: "TS", color: "#3178c6" },
  { name: "React", icon: "⚛", color: "#61dafb" },
  { name: "Next.js", icon: "N", color: "#ffffff" },
  { name: "Node.js", icon: "⬢", color: "#68a063" },
  { name: "Three.js", icon: "▲", color: "#ffffff" },
  { name: "TailwindCSS", icon: "◇", color: "#38bdf8" },
  { name: "PostgreSQL", icon: "🐘", color: "#336791" },
  { name: "Docker", icon: "🐋", color: "#2496ed" },
  { name: "Git", icon: "⎇", color: "#f05032" },
  { name: "Prisma", icon: "◈", color: "#2d3748" },
  { name: "JavaScript", icon: "JS", color: "#f7df1e" },
  { name: "SQL", icon: "⊞", color: "#e48e00" },
  { name: "PHP", icon: "⟨⟩", color: "#777bb4" },
  { name: "Figma", icon: "◉", color: "#f24e1e" },
  { name: "Postman", icon: "▶", color: "#ff6c37" },
  { name: "GLSL", icon: "◆", color: "#5586a4" },
  { name: "Vitest", icon: "⚡", color: "#6e9f18" },
  { name: "ESLint", icon: "⬡", color: "#4b32c3" },
  { name: "Zustand", icon: "🐻", color: "#764abc" },
  { name: "Motion", icon: "◎", color: "#ff0055" },
];

function TechCard({ tech, index }: { tech: TechItem; index: number }) {
  const row = Math.floor(index / 5);
  const delay = index * 0.04;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const }}
      whileHover={{
        y: -4,
        rotateY: 8,
        rotateX: -5,
        transition: { duration: 0.3 },
      }}
      className="flex flex-col items-center gap-2 p-3 rounded-xl cursor-default group"
      style={{
        perspective: "600px",
        transformStyle: "preserve-3d",
        background: "var(--bg-glass)",
        border: "1px solid var(--border-subtle)",
        transition: "border-color 0.3s, box-shadow 0.3s",
        animation: `float ${3 + (row % 3) * 0.5}s ease-in-out ${delay * 2}s infinite`,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = `${tech.color}33`;
        el.style.boxShadow = `0 0 20px ${tech.color}15, 0 4px 12px rgba(0,0,0,0.3)`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--border-subtle)";
        el.style.boxShadow = "none";
      }}
    >
      <div
        className="flex items-center justify-center w-10 h-10 rounded-lg text-base font-bold"
        style={{
          background: `${tech.color}12`,
          color: tech.color,
          border: `1px solid ${tech.color}20`,
          transform: "translateZ(10px)",
          textShadow: `0 0 10px ${tech.color}40`,
        }}
      >
        {tech.icon}
      </div>
      <span className="text-[9px] font-medium tracking-wide" style={{ color: "var(--text-secondary)" }}>
        {tech.name}
      </span>
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
      <div className="flex items-center gap-2 px-4 py-2.5" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full" style={{ background: "#64d2ff", opacity: 0.7 }} />
          <div className="w-2 h-2 rounded-full" style={{ background: "var(--border-medium)" }} />
          <div className="w-2 h-2 rounded-full" style={{ background: "var(--border-medium)" }} />
        </div>
        <span className="text-[10px] font-mono uppercase tracking-wider ml-1" style={{ color: "var(--text-muted)" }}>
          stack.config
        </span>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-5 gap-2 p-4" style={{ perspective: "800px" }}>
        {techs.map((tech, i) => (
          <TechCard key={tech.name} tech={tech} index={i} />
        ))}
      </div>
    </motion.div>
  );
}
