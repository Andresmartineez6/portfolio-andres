"use client";
import { useAppStore } from "@/state/store";

const sectionLabels: Record<string, string> = {
  hero: "Inicio", about: "Sobre Mi", projects: "Proyectos",
  playground: "Playground", contact: "Contacto",
};

export default function TopBar() {
  const activeSection = useAppStore((s) => s.activeSection);
  return (
    <header
      className="glass-panel flex items-center justify-between px-4"
      style={{ gridColumn: "1 / -1", borderRadius: 0, borderTop: "none", borderLeft: "none", borderRight: "none", height: "40px" }}
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center rounded-md" style={{ width: 22, height: 22, background: "var(--accent-primary)" }}>
          <span className="text-xs font-bold text-white">A</span>
        </div>
        <span className="text-xs font-medium tracking-wider uppercase" style={{ color: "var(--text-secondary)" }}>Andres Lorente</span>
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>/</span>
        <span className="text-xs font-medium" style={{ color: "var(--text-accent)" }}>{sectionLabels[activeSection]}</span>
      </div>
      <nav className="hidden md:flex items-center gap-1">
        {["Archivo", "Editar", "Ver", "Ayuda"].map((item) => (
          <button key={item} className="px-3 py-1 text-xs rounded transition-colors hover:bg-white/5" style={{ color: "var(--text-muted)" }}>{item}</button>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
        <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
        <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
      </div>
    </header>
  );
}
