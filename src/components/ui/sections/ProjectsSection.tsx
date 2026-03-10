"use client";
import { useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAppStore } from "@/state/store";

interface Project { id: string; title: string; description: string; tech: string[]; role: string; period: string; color: string; }

const projects: Project[] = [
  { id: "cabletea", title: "Cabletea S.L", description: "Fundacion y creacion de empresa teleoperadora de fibra y movil. Desarrollo completo de la infraestructura tecnologica, gestion del proyecto desde cero incluyendo la parte tecnica, legal y comercial.", tech: ["WordPress", "Node.js", "Gestion"], role: "Fundador y CEO", period: "Jun 2024", color: "#64d2ff" },
  { id: "impulsa", title: "ImpulsaTelecom — Web Dev", description: "Desarrollo de paginas Web profesionales con WordPress usando el Constructor Divi. Creacion de sitios web responsivos y optimizados para clientes corporativos.", tech: ["WordPress", "Divi", "CSS", "PHP"], role: "Desarrollador Web", period: "Jul 2023 — Sep 2024", color: "#ffd60a" },
  { id: "beebit", title: "Gestor de Proyectos — BeeBit", description: "Desarrollo web de un gestor de proyectos completo. Implementacion de funcionalidades de gestion, seguimiento de tareas, y colaboracion en equipo.", tech: ["JavaScript", "TypeScript", "Node.js", "PostgreSQL"], role: "Programador Jr / PM", period: "Sep — Dic 2024", color: "#30d158" },
  { id: "portfolio", title: "Portfolio 3D Interactivo", description: "Portfolio personal con graficos 3D en tiempo real, shaders GLSL personalizados, sistema de particulas reactivo, Pacman GitHub graph y UI tipo software creativo profesional.", tech: ["Next.js", "Three.js", "GLSL", "TypeScript", "Motion"], role: "Creative Developer", period: "2025", color: "#ff6b9d" },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const selectedProject = useAppStore((s) => s.selectedProject);
  const setSelectedProject = useAppStore((s) => s.setSelectedProject);
  const isSelected = selectedProject === project.id;
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isSelected) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    el.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-2px)`;
  }, [isSelected]);

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) cardRef.current.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0px)";
  }, []);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] as const, layout: { duration: 0.3 } }}
      style={{ gridColumn: isSelected ? "1 / -1" : undefined }}
    >
      <div
        ref={cardRef}
        onClick={() => setSelectedProject(isSelected ? null : project.id)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="tilt-card glass-panel cursor-pointer overflow-hidden"
        style={{ borderColor: isSelected ? `${project.color}20` : undefined }}
      >
        <div className="flex items-center gap-2 px-5 py-3" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: project.color }} />
          <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{project.id}.project</span>
          <svg width="8" height="8" viewBox="0 0 8 8" className="ml-auto transition-transform" style={{ transform: isSelected ? "rotate(90deg)" : "", color: "var(--text-muted)" }}>
            <path d="M2 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          </svg>
        </div>
        <div className="p-5 flex flex-col gap-3">
          <h3 className="text-[17px] font-semibold tracking-[-0.02em]">{project.title}</h3>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-mono font-medium" style={{ color: project.color }}>{project.role}</span>
            <span className="text-[8px]" style={{ color: "var(--text-muted)" }}>●</span>
            <span className="text-[10px] font-mono" style={{ color: "var(--text-muted)" }}>{project.period}</span>
          </div>
          <AnimatePresence>
            {isSelected && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
                className="flex flex-col gap-4 overflow-hidden"
              >
                <p className="text-[13px] leading-[1.7]" style={{ color: "var(--text-secondary)" }}>{project.description}</p>
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
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <section className="min-h-screen px-4 md:px-6 py-24 flex flex-col gap-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
        className="flex flex-col gap-3"
      >
        <span className="section-label">02 / Proyectos</span>
        <h2 className="section-title">Trabajo Destacado</h2>
        <p className="text-[13px] max-w-md mt-1" style={{ color: "var(--text-secondary)" }}>
          Seleccion de proyectos profesionales y personales. Click para expandir.
        </p>
      </motion.div>
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
      </motion.div>
    </section>
  );
}
