"use client";
import { motion } from "motion/react";
import HoloPanel from "@/components/ui/panels/HoloPanel";

interface Skill {
  name: string;
  level: number;
  category: string;
  color: string;
}

const SKILLS: Skill[] = [
  { name: "React", level: 95, category: "Frontend", color: "#61dafb" },
  { name: "Next.js", level: 92, category: "Frontend", color: "#ffffff" },
  { name: "TypeScript", level: 90, category: "Language", color: "#3178c6" },
  { name: "Three.js", level: 85, category: "3D/WebGL", color: "#049ef4" },
  { name: "React Three Fiber", level: 83, category: "3D/WebGL", color: "#64d2ff" },
  { name: "GLSL", level: 70, category: "3D/WebGL", color: "#5ac8fa" },
  { name: "Node.js", level: 88, category: "Backend", color: "#339933" },
  { name: "PostgreSQL", level: 80, category: "Backend", color: "#4169e1" },
  { name: "Docker", level: 78, category: "DevOps", color: "#2496ed" },
  { name: "Git", level: 90, category: "DevOps", color: "#f05032" },
  { name: "Tailwind CSS", level: 92, category: "Frontend", color: "#06b6d4" },
  { name: "GraphQL", level: 75, category: "Backend", color: "#e10098" },
];

const CATEGORIES = [...new Set(SKILLS.map((s) => s.category))];

export default function SkillsPanel({ onClose }: { onClose: () => void }) {
  return (
    <HoloPanel visible onClose={onClose} width="440px">
      <div className="holo-header">
        <span className="holo-label">SISTEMA // STACK</span>
        <h2 className="holo-title">Skills</h2>
      </div>
      <div style={{ marginTop: 16 }}>
        {CATEGORIES.map((cat, ci) => (
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + ci * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginBottom: 18 }}
          >
            <span style={{ fontSize: 9, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text-muted)" }}>{cat}</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
              {SKILLS.filter((s) => s.category === cat).map((skill, si) => (
                <div key={skill.name}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <span style={{ fontSize: 12, fontWeight: 500, color: "var(--text-primary)" }}>{skill.name}</span>
                    <span style={{ fontSize: 10, fontFamily: "monospace", color: skill.color }}>{skill.level}%</span>
                  </div>
                  <div style={{ width: "100%", height: 3, background: "rgba(255,255,255,0.04)", borderRadius: 2, overflow: "hidden" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ delay: 0.2 + ci * 0.1 + si * 0.05, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      style={{ height: "100%", background: `linear-gradient(90deg, ${skill.color}66, ${skill.color})`, borderRadius: 2, boxShadow: `0 0 8px ${skill.color}44` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </HoloPanel>
  );
}
