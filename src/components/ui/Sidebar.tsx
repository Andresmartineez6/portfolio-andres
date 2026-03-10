"use client";
import { useAppStore, type Section } from "@/state/store";

const items: { id: Section; label: string; d: string }[] = [
  { id: "hero", label: "Inicio", d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10" },
  { id: "about", label: "Sobre Mi", d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" },
  { id: "projects", label: "Proyectos", d: "M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z" },
  { id: "playground", label: "Playground", d: "M4 21V14 M4 10V3 M12 21V12 M12 8V3 M20 21V16 M20 12V3 M1 14h6 M9 8h6 M17 16h6" },
  { id: "contact", label: "Contacto", d: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6" },
];

export default function Sidebar() {
  const active = useAppStore((s) => s.activeSection);
  const set = useAppStore((s) => s.setActiveSection);
  return (
    <aside
      className="hidden md:flex flex-col items-center py-3 gap-0.5"
      style={{
        gridRow: "2 / 4", width: 48,
        background: "rgba(6, 6, 8, 0.85)",
        backdropFilter: "blur(40px)",
        borderRight: "1px solid var(--border-subtle)",
      }}
    >
      {items.map((item) => {
        const on = active === item.id;
        return (
          <button key={item.id} onClick={() => set(item.id)} title={item.label}
            className="relative flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-250"
            style={{
              color: on ? "var(--accent-primary)" : "var(--text-muted)",
              background: on ? "var(--accent-glow)" : "transparent",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={item.d} /></svg>
            {on && <div className="absolute left-0 w-[2px] h-3.5 rounded-r-full" style={{ background: "var(--accent-primary)" }} />}
          </button>
        );
      })}
      <div className="mt-auto mb-1">
        <span className="text-[7px] font-mono" style={{ color: "var(--text-muted)" }}>v2.0</span>
      </div>
    </aside>
  );
}
