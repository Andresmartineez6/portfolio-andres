"use client";
import { useAppStore, type Section } from "@/state/store";

const navItems: { id: Section; label: string; path: string }[] = [
  { id: "hero", label: "Inicio", path: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10" },
  { id: "about", label: "Sobre Mi", path: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" },
  { id: "projects", label: "Proyectos", path: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" },
  { id: "playground", label: "Playground", path: "M4 21V14M4 10V3M12 21V12M12 8V3M20 21V16M20 12V3M1 14h6M9 8h6M17 16h6" },
  { id: "contact", label: "Contacto", path: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6" },
];

export default function Sidebar() {
  const activeSection = useAppStore((s) => s.activeSection);
  const setActiveSection = useAppStore((s) => s.setActiveSection);
  return (
    <aside
      className="hidden md:flex flex-col items-center py-3 gap-1"
      style={{
        gridRow: "2 / 4", width: 52,
        background: "rgba(10, 10, 10, 0.8)",
        backdropFilter: "blur(40px)",
        borderRight: "1px solid var(--border-subtle)",
      }}
    >
      {navItems.map((item) => {
        const isActive = activeSection === item.id;
        return (
          <button key={item.id} onClick={() => setActiveSection(item.id)} title={item.label}
            className="relative flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200"
            style={{ color: isActive ? "var(--accent-primary)" : "var(--text-muted)", background: isActive ? "var(--accent-glow)" : "transparent" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={item.path} /></svg>
            {isActive && <div className="absolute left-0 w-[2px] h-4 rounded-r" style={{ background: "var(--accent-primary)" }} />}
          </button>
        );
      })}
      <div className="mt-auto mb-2">
        <span className="text-[8px] font-mono" style={{ color: "var(--text-muted)" }}>v2.0</span>
      </div>
    </aside>
  );
}
