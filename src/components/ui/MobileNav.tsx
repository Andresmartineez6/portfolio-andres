"use client";
import { useAppStore, type Section } from "@/state/store";

const items: { id: Section; label: string; d: string }[] = [
  { id: "hero", label: "Inicio", d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10" },
  { id: "about", label: "Sobre Mi", d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" },
  { id: "projects", label: "Proyectos", d: "M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z" },
  { id: "playground", label: "Play", d: "M4 21V14 M4 10V3 M12 21V12 M12 8V3 M20 21V16 M20 12V3 M1 14h6 M9 8h6 M17 16h6" },
  { id: "contact", label: "Contacto", d: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6" },
];

export default function MobileNav() {
  const active = useAppStore((s) => s.activeSection);
  const set = useAppStore((s) => s.setActiveSection);
  return (
    <nav
      className="md:hidden flex items-center justify-around"
      style={{
        gridColumn: "1 / -1", height: 48,
        background: "rgba(6, 6, 8, 0.95)",
        backdropFilter: "blur(40px)",
        borderTop: "1px solid var(--border-subtle)",
      }}
    >
      {items.map((item) => {
        const on = active === item.id;
        return (
          <button key={item.id} onClick={() => set(item.id)}
            className="flex flex-col items-center gap-[2px] px-3 py-1 rounded-lg transition-colors"
            style={{ color: on ? "var(--accent-primary)" : "var(--text-muted)" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={item.d} /></svg>
            <span className="text-[8px] font-medium">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
