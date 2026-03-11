"use client";
import { motion } from "motion/react";
import HoloPanel from "@/components/ui/panels/HoloPanel";

interface ContactLink {
  label: string;
  value: string;
  url: string;
  icon: string;
}

const LINKS: ContactLink[] = [
  { label: "Email", value: "andres@example.dev", url: "mailto:andres@example.dev", icon: "M" },
  { label: "GitHub", value: "github.com/Andresmartineez6", url: "https://github.com/Andresmartineez6", icon: "G" },
  { label: "LinkedIn", value: "linkedin.com/in/andres", url: "https://linkedin.com", icon: "L" },
  { label: "Portfolio", value: "andres.dev", url: "#", icon: "P" },
];

export default function ContactPanel({ onClose }: { onClose: () => void }) {
  return (
    <HoloPanel visible onClose={onClose} width="380px">
      <div className="holo-header">
        <span className="holo-label">SISTEMA // CONTACTO</span>
        <h2 className="holo-title">Contacto</h2>
      </div>

      <p style={{ fontSize: 11, color: "var(--text-secondary)", marginTop: 8, lineHeight: 1.6 }}>
        Abierto a colaboraciones, proyectos freelance y oportunidades interesantes.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 20 }}>
        {LINKS.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 + i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="holo-card"
            style={{ textDecoration: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}
          >
            <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(100, 210, 255, 0.06)", border: "1px solid rgba(100, 210, 255, 0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "var(--accent-primary)", flexShrink: 0 }}>
              {link.icon}
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 9, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)" }}>{link.label}</span>
              <span style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text-primary)", marginTop: 1 }}>{link.value}</span>
            </div>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ opacity: 0.3, flexShrink: 0 }}>
              <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        style={{ marginTop: 24, textAlign: "center", padding: "14px 0", borderTop: "1px solid rgba(255,255,255,0.04)" }}
      >
        <span style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "monospace" }}>Respuesta media: &lt; 24h</span>
      </motion.div>
    </HoloPanel>
  );
}
