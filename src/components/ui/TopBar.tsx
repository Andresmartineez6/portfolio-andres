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
      className="flex items-center justify-between px-4"
      style={{
        gridColumn: "1 / -1", height: 38,
        background: "rgba(10, 10, 10, 0.9)",
        backdropFilter: "blur(40px) saturate(180%)",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center rounded-md" style={{ width: 20, height: 20, background: "var(--text-primary)" }}>
          <span className="text-[10px] font-bold" style={{ color: "var(--bg-primary)" }}>A</span>
        </div>
        <span className="text-[11px] font-semibold tracking-wide" style={{ color: "var(--text-secondary)", letterSpacing: "-0.01em" }}>Andres Lorente</span>
        <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>/</span>
        <span className="text-[11px] font-medium" style={{ color: "var(--text-primary)" }}>{sectionLabels[activeSection]}</span>
      </div>
      <nav className="hidden md:flex items-center gap-0.5">
        {["Archivo", "Editar", "Ver", "Ayuda"].map((item) => (
          <button key={item} className="px-2.5 py-1 text-[11px] rounded-md transition-colors hover:bg-white/5" style={{ color: "var(--text-muted)" }}>{item}</button>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full transition-opacity hover:opacity-80" style={{ background: "#ff5f57" }} />
        <div className="w-3 h-3 rounded-full transition-opacity hover:opacity-80" style={{ background: "#febc2e" }} />
        <div className="w-3 h-3 rounded-full transition-opacity hover:opacity-80" style={{ background: "#28c840" }} />
      </div>
    </header>
  );
}
