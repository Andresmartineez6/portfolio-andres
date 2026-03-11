"use client";
import { motion } from "motion/react";
import HoloPanel from "@/components/ui/panels/HoloPanel";

const SECTIONS = [
  {
    label: "PERFIL",
    content: "Creative Developer con enfoque en experiencias web inmersivas. Combino ingenieria de software con diseno interactivo para crear productos digitales que destacan por su calidad tecnica y su atencion al detalle visual.",
  },
  {
    label: "EXPERIENCIA",
    content: "Mas de 5 anos desarrollando aplicaciones web complejas. Experiencia en startups, agencias digitales y proyectos propios. Especializado en arquitecturas frontend modernas, WebGL y sistemas de diseno.",
  },
  {
    label: "ENFOQUE",
    content: "Creo en el desarrollo como forma de expresion creativa. Cada proyecto es una oportunidad para explorar nuevas tecnologias y empujar los limites de lo que es posible en el navegador.",
  },
  {
    label: "FILOSOFIA",
    content: "Codigo limpio, rendimiento obsesivo, interfaces que se sienten bien. Menos es mas, pero cada detalle importa. La mejor tecnologia es la que desaparece y deja brillar la experiencia.",
  },
];

export default function AboutPanel({ onClose }: { onClose: () => void }) {
  return (
    <HoloPanel visible onClose={onClose} width="440px">
      <div className="holo-header">
        <span className="holo-label">SISTEMA // PERFIL</span>
        <h2 className="holo-title">Sobre mi</h2>
      </div>

      <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 18 }}>
        {SECTIONS.map((section, i) => (
          <motion.div
            key={section.label}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.12 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <div style={{ width: 3, height: 14, borderRadius: 1, background: "var(--accent-primary)", opacity: 0.6 }} />
              <span style={{ fontSize: 9, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--accent-primary)", opacity: 0.7 }}>{section.label}</span>
            </div>
            <p style={{ fontSize: 12, lineHeight: 1.7, color: "var(--text-secondary)", paddingLeft: 11 }}>{section.content}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        style={{ marginTop: 24, padding: "12px 14px", borderRadius: 10, background: "rgba(100, 210, 255, 0.03)", border: "1px solid rgba(100, 210, 255, 0.06)" }}
      >
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, rgba(100,210,255,0.15), rgba(100,210,255,0.05))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>A</div>
          <div>
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>Andres Martinez</span>
            <span style={{ display: "block", fontSize: 10, color: "var(--text-muted)", marginTop: 1 }}>Creative Developer</span>
          </div>
        </div>
      </motion.div>
    </HoloPanel>
  );
}
