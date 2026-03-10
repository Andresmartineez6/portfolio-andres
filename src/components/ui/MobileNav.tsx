"use client";
import { useAppStore, type Section } from "@/state/store";

const navItems: { id: Section; label: string; path: string }[] = [
  { id: "hero", label: "Inicio", path: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10" },
  { id: "about", label: "Sobre Mi", path: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" },
  { id: "projects", label: "Proyectos", path: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" },
  { id: "playground", label: "Play", path: "M4 21V14M4 10V3M12 21V12M12 8V3M20 21V16M20 12V3M1 14h6M9 8h6M17 16h6" },
  { id: "contact", label: "Contacto", path: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6" },
];

export default function MobileNav() {
  const activeSection = useAppStore((s) => s.activeSection);
  const setActiveSection = useAppStore((s) => s.setActiveSection);
  return (
    <nav
      className="md:hidden flex items-center justify-around"
      style={{
        gridColumn: "1 / -1", height: 48,
        background: "rgba(10, 10, 10, 0.95)",
        backdropFilter: "blur(40px)",
        borderTop: "1px solid var(--border-subtle)",
      }}
    >
      {navItems.map((item) => {
        const isActive = activeSection === item.id;
        return (
          <button key={item.id} onClick={() => setActiveSection(item.id)}
            className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-all"
            style={{ color: isActive ? "var(--accent-primary)" : "var(--text-muted)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={item.path} /></svg>
            <span className="text-[8px] font-medium">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
