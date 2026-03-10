"use client";
import { motion, AnimatePresence } from "motion/react";
import { useAppStore } from "@/state/store";

interface Project { id: string; title: string; description: string; tech: string[]; role: string; period: string; color: string; }

const projects: Project[] = [
  { id: "cabletea", title: "Cabletea S.L", description: "Fundacion y creacion de empresa teleoperadora de fibra y movil. Desarrollo completo de la infraestructura tecnologica, gestion del proyecto desde cero incluyendo la parte tecnica, legal y comercial.", tech: ["WordPress", "Node.js", "Gestion empresarial"], role: "Fundador y CEO", period: "Junio 2024", color: "#7b6ff0" },
  { id: "impulsa", title: "ImpulsaTelecom - Web Development", description: "Desarrollo de paginas Web profesionales con WordPress usando el Constructor Divi. Creacion de sitios web responsivos y optimizados para clientes corporativos.", tech: ["WordPress", "Divi", "CSS", "PHP"], role: "Desarrollador Web", period: "Jul 2023 - Sep 2024", color: "#f07b6f" },
  { id: "beebit", title: "Gestor de Proyectos - BeeBit Solutions", description: "Desarrollo web de un gestor de proyectos completo. Implementacion de funcionalidades de gestion, seguimiento de tareas, y colaboracion en equipo.", tech: ["JavaScript", "TypeScript", "Node.js", "PostgreSQL"], role: "Programador Junior / Gestor de proyectos", period: "Sep 2024 - Dic 2024", color: "#6ff0c3" },
  { id: "portfolio", title: "Portfolio Creativo 3D", description: "Portfolio personal con graficos 3D en tiempo real, shaders GLSL personalizados, sistema de particulas reactivo y UI tipo software creativo profesional.", tech: ["Next.js", "Three.js", "GLSL", "TypeScript", "Motion"], role: "Creative Developer", period: "2025", color: "#f0d06f" },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const selectedProject = useAppStore((s) => s.selectedProject);
  const setSelectedProject = useAppStore((s) => s.setSelectedProject);
  const isSelected = selectedProject === project.id;

  return (
    <motion.div layout initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1], layout: { duration: 0.4 } }}
      onClick={() => setSelectedProject(isSelected ? null : project.id)}
      className="glass-panel glass-panel-hover cursor-pointer overflow-hidden"
      style={{ gridColumn: isSelected ? "1 / -1" : undefined }}>
      <div className="flex items-center gap-2 px-4 py-2.5" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full" style={{ background: project.color, opacity: 0.8 }} />
          <div className="w-2 h-2 rounded-full" style={{ background: "var(--border-medium)" }} />
          <div className="w-2 h-2 rounded-full" style={{ background: "var(--border-medium)" }} />
        </div>
        <span className="text-[10px] font-mono uppercase tracking-wider ml-1" style={{ color: "var(--text-muted)" }}>{project.id}.project</span>
        <span className="ml-auto text-[9px] font-mono" style={{ color: "var(--text-muted)" }}>{isSelected ? "[-]" : "[+]"}</span>
      </div>
      <div className="p-4 flex flex-col gap-3">
        <div className="w-8 h-0.5 rounded-full" style={{ background: project.color }} />
        <h3 className="text-lg font-semibold tracking-tight" style={{ color: "var(--text-primary)" }}>{project.title}</h3>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-mono" style={{ color: project.color }}>{project.role}</span>
          <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>/</span>
          <span className="text-[10px] font-mono" style={{ color: "var(--text-muted)" }}>{project.period}</span>
        </div>
        <AnimatePresence>
          {isSelected && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className="flex flex-col gap-3 overflow-hidden">
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{project.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded text-[9px] font-mono"
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
    <section className="min-h-screen px-4 md:px-6 py-16 flex flex-col gap-6">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="flex flex-col gap-2 mb-4">
        <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: "var(--accent-primary)" }}>02 / Proyectos</span>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>Trabajo Destacado</h2>
        <p className="text-sm max-w-md" style={{ color: "var(--text-secondary)" }}>
          Seleccion de proyectos profesionales y personales. Haz click en cualquier modulo para expandir los detalles.
        </p>
      </motion.div>
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, i) => <ProjectCard key={project.id} project={project} index={i} />)}
      </motion.div>
    </section>
  );
}
