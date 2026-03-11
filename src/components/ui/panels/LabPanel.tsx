"use client";
import { useState } from "react";
import { motion } from "motion/react";
import HoloPanel from "@/components/ui/panels/HoloPanel";

interface Experiment {
  id: string;
  name: string;
  description: string;
  status: "active" | "wip" | "planned";
  icon: string;
}

const EXPERIMENTS: Experiment[] = [
  { id: "e1", name: "Particle Simulation", description: "Sistema de particulas GPU con interaccion de cursor y campos de fuerza dinamicos.", status: "active", icon: "◉" },
  { id: "e2", name: "Shader Playground", description: "Editor visual de shaders GLSL con preview en tiempo real y exportacion.", status: "active", icon: "◈" },
  { id: "e3", name: "Noise Field", description: "Visualizacion interactiva de campos de ruido Perlin, Simplex y Worley.", status: "wip", icon: "◇" },
  { id: "e4", name: "Fluid Simulation", description: "Simulacion de fluidos 2D basada en Navier-Stokes con rendering artistico.", status: "planned", icon: "◆" },
  { id: "e5", name: "Audio Visualizer", description: "Visualizador de audio reactivo con geometria generativa y FFT analysis.", status: "planned", icon: "◎" },
];

const STATUS_COLORS = { active: "#30d158", wip: "#ffd60a", planned: "rgba(255,255,255,0.2)" };
const STATUS_LABELS = { active: "ACTIVO", wip: "EN PROGRESO", planned: "PLANIFICADO" };

export default function LabPanel({ onClose }: { onClose: () => void }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <HoloPanel visible onClose={onClose} width="440px">
      <div className="holo-header">
        <span className="holo-label">SISTEMA // LABORATORIO</span>
        <h2 className="holo-title">Lab</h2>
      </div>

      <p style={{ fontSize: 11, color: "var(--text-secondary)", marginTop: 8, lineHeight: 1.6 }}>
        Espacio de experimentacion creativa. Proyectos exploratorios de WebGL, shaders y simulaciones interactivas.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
        {EXPERIMENTS.map((exp, i) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="holo-card"
            style={{ cursor: exp.status === "active" ? "pointer" : "default", opacity: exp.status === "planned" ? 0.5 : 1 }}
            onMouseEnter={() => setHoveredId(exp.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 16, color: STATUS_COLORS[exp.status], lineHeight: 1 }}>{exp.icon}</span>
                <h3 style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{exp.name}</h3>
              </div>
              <span style={{ fontSize: 8, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.1em", padding: "2px 6px", borderRadius: 4, background: `${STATUS_COLORS[exp.status]}15`, color: STATUS_COLORS[exp.status], border: `1px solid ${STATUS_COLORS[exp.status]}22` }}>
                {STATUS_LABELS[exp.status]}
              </span>
            </div>
            <p style={{ fontSize: 10, color: "var(--text-secondary)", lineHeight: 1.5, marginTop: 6 }}>{exp.description}</p>
            {hoveredId === exp.id && exp.status === "active" && <div className="holo-card-glow" />}
          </motion.div>
        ))}
      </div>
    </HoloPanel>
  );
}
