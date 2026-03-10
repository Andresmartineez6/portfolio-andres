"use client";
import { useAppStore } from "@/state/store";

const labels: Record<string, string> = {
  hero: "Inicio", about: "Sobre Mi", projects: "Proyectos",
  playground: "Playground", contact: "Contacto",
};

export default function TopBar() {
  const s = useAppStore((s) => s.activeSection);
  return (
    <header
      className="flex items-center justify-between px-4"
      style={{
        gridColumn: "1 / -1", height: 36,
        background: "rgba(6, 6, 8, 0.92)",
        backdropFilter: "blur(40px) saturate(180%)",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      <div className="flex items-center gap-2.5">
        <div className="flex items-center justify-center w-[18px] h-[18px] rounded-[5px]"
          style={{ background: "var(--text-primary)" }}>
          <span className="text-[9px] font-bold" style={{ color: "var(--bg-primary)" }}>A</span>
        </div>
        <span className="text-[11px] font-medium" style={{ color: "var(--text-secondary)", letterSpacing: "-0.01em" }}>Andres Lorente</span>
        <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>/</span>
        <span className="text-[11px] font-medium" style={{ color: "var(--text-primary)", letterSpacing: "-0.01em" }}>{labels[s]}</span>
      </div>
      <nav className="hidden md:flex items-center gap-0">
        {["Archivo", "Editar", "Ver", "Ayuda"].map((item) => (
          <button key={item} className="px-2.5 py-1 text-[11px] rounded-md transition-colors duration-200 hover:bg-white/[0.04]"
            style={{ color: "var(--text-muted)" }}>{item}</button>
        ))}
      </nav>
      <div className="flex items-center gap-[6px]">
        <div className="w-[10px] h-[10px] rounded-full cursor-pointer transition-opacity hover:opacity-80" style={{ background: "#ff5f57" }} />
        <div className="w-[10px] h-[10px] rounded-full cursor-pointer transition-opacity hover:opacity-80" style={{ background: "#febc2e" }} />
        <div className="w-[10px] h-[10px] rounded-full cursor-pointer transition-opacity hover:opacity-80" style={{ background: "#28c840" }} />
      </div>
    </header>
  );
}
