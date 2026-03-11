"use client";
import { useState } from "react";
import { motion } from "motion/react";
import HoloPanel from "@/components/ui/panels/HoloPanel";

interface Project {
  id: string;
  name: string;
  description: string;
  tech: string[];
  url?: string;
}

const PROJECTS: Project[] = [
  {
    id: "p1",
    name: "Portfolio 3D Interactivo",
    description: "Experiencia WebGL inmersiva con React Three Fiber. Habitacion 3D navegable con objetos interactivos y paneles holograficos.",
    tech: ["Next.js", "React Three Fiber", "Three.js", "GLSL", "Zustand"],
    url: "#",
  },
  {
    id: "p2",
    name: "E-Commerce Platform",
    description: "Plataforma de comercio electronico con gestion de inventario en tiempo real, pasarela de pagos y dashboard analitico.",
    tech: ["Next.js", "PostgreSQL", "Stripe", "Docker", "Redis"],
    url: "#",
  },
  {
    id: "p3",
    name: "AI Chat Interface",
    description: "Interfaz conversacional con streaming de respuestas, historial persistente y sistema de plugins extensible.",
    tech: ["React", "Node.js", "WebSocket", "OpenAI API", "MongoDB"],
    url: "#",
  },
  {
    id: "p4",
    name: "Real-time Dashboard",
    description: "Panel de metricas en tiempo real con visualizaciones interactivas, alertas configurables y exportacion de datos.",
    tech: ["React", "D3.js", "GraphQL", "PostgreSQL", "Docker"],
    url: "#",
  },
];

export default function ProjectsPanel({ onClose }: { onClose: () => void }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <HoloPanel visible onClose={onClose} width="480px">
      <div className="holo-header">
        <span className="holo-label">SISTEMA // PROYECTOS</span>
        <h2 className="holo-title">Proyectos</h2>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16 }}>
        {PROJECTS.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="holo-card"
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{ cursor: "pointer" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>{project.name}</h3>
              {project.url && (
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="holo-link" onClick={(e) => e.stopPropagation()}>
                  Ver
                </a>
              )}
            </div>
            <p style={{ fontSize: 11, color: "var(--text-secondary)", lineHeight: 1.5, marginTop: 6 }}>{project.description}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 8 }}>
              {project.tech.map((t) => (
                <span key={t} className="holo-tag">{t}</span>
              ))}
            </div>
            {hoveredId === project.id && <div className="holo-card-glow" />}
          </motion.div>
        ))}
      </div>
    </HoloPanel>
  );
}
