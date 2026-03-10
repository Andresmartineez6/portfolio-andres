"use client";
import { motion, AnimatePresence } from "motion/react";
import { useAppStore } from "@/state/store";

interface Project { id: string; title: string; description: string; tech: string[]; role: string; period: string; color: string; }

const projects: Project[] = [
  { id: "cabletea", title: "Cabletea S.L", description: "Fundacion y creacion de empresa teleoperadora de fibra y movil. Desarrollo completo de la infraestructura tecnologica, gestion del proyecto desde cero incluyendo la parte tecnica, legal y comercial.", tech: ["WordPress", "Node.js", "Gestion empresarial"], role: "Fundador y CEO", period: "Jun 2024", color: "#64d2ff" },
  { id: "impulsa", title: "ImpulsaTelecom — Web Dev", description: "Desarrollo de paginas Web profesionales con WordPress usando el Constructor Divi. Creacion de sitios web responsivos y optimizados para clientes corporativos.", tech: ["WordPress", "Divi", "CSS", "PHP"], role: "Desarrollador Web", period: "Jul 2023 — Sep 2024", color: "#ffd60a" },
  { id: "beebit", title: "Gestor de Proyectos — BeeBit", description: "Desarrollo web de un gestor de proyectos completo. Implementacion de funcionalidades de gestion, seguimiento de tareas, y colaboracion en equipo.", tech: ["JavaScript", "TypeScript", "Node.js", "PostgreSQL"], role: "Programador Jr / PM", period: "Sep — Dic 2024", color: "#34d399" },
  { id: "portfolio", title: "Portfolio 3D Interactivo", description: "Portfolio personal con graficos 3D en tiempo real, shaders GLSL personalizados, sistema de particulas reactivo, Pacman GitHub graph y UI tipo software creativo profesional.", tech: ["Next.js", "Three.js", "GLSL", "TypeScript", "Motion"], role: "Creative Developer", period: "2025", color: "#f472b6" },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const selectedProject = useAppStore((s) => s.selectedProject);
  const setSelectedProject = useAppStore((s) => s.setSelectedProject);
  const isSelected = selectedProject === project.id;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] as const, layout: { duration: 0.35 } }}
      onClick={() => setSelectedProject(isSelected ? null : project.id)}
      className="glass-panel glass-panel-hover cursor-pointer overflow-hidden"
      style={{ gridColumn: isSelected ? "1 / -1" : undefined }}
    >
      <div className="flex items-center gap-2 px-4 py-2.5" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="w-2 h-2 rounded-full" style={{ background: project.color, opacity: 0.8 }} />
        <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{project.id}.project</span>
        <span className="ml-auto text-[9px] font-mono" style={{ color: "var(--text-muted)" }}>{isSelected ? "▾" : "▸"}</span>
      </div>
      <div className="p-5 flex flex-col gap-3">
        <div className="w-8 h-[2px] rounded-full" style={{ background: project.color }} />
        <h3 className="text-lg font-semibold tracking-tight" style={{ letterSpacing: "-0.02em" }}>{project.title}</h3>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-mono" style={{ color: project.color }}>{project.role}</span>
          <span style={{ color: "var(--text-muted)", fontSize: "8px" }}>●</span>
          <span className="text-[10px] font-mono" style={{ color: "var(--text-muted)" }}>{project.period}</span>
        </div>
        <AnimatePresence>
          {isSelected && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
              className="flex flex-col gap-3 overflow-hidden"
            >
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{project.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-md text-[9px] font-mono"
                    style={{ border: "1px solid var(--border-subtle)", color: "var(--text-secondary)", background: "var(--bg-glass)" }}>{t}</span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <section className="min-h-screen px-4 md:px-6 py-20 flex flex-col gap-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
        className="flex flex-col gap-2"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: "var(--accent-primary)" }}>02 / Proyectos</span>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ letterSpacing: "-0.03em" }}>Trabajo Destacado</h2>
        <p className="text-sm max-w-md mt-1" style={{ color: "var(--text-secondary)" }}>
          Seleccion de proyectos profesionales y personales. Click para expandir detalles.
        </p>
      </motion.div>
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
      </motion.div>
    </section>
  );
}
