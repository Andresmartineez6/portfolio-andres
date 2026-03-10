"use client";
import { useAppStore } from "@/state/store";

export default function StatusBar() {
  const activeSection = useAppStore((s) => s.activeSection);
  const scrollProgress = useAppStore((s) => s.scrollProgress);
  return (
    <footer
      className="flex items-center justify-between px-4"
      style={{
        gridColumn: "2 / -1", height: 28,
        background: "rgba(10, 10, 10, 0.9)",
        borderTop: "1px solid var(--border-subtle)",
      }}
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#34d399" }} />
          <span className="text-[9px] font-mono" style={{ color: "var(--text-muted)" }}>Ready</span>
        </div>
        <span className="text-[9px] font-mono" style={{ color: "var(--text-muted)" }}>{activeSection.toUpperCase()}</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-16 h-[2px] rounded-full overflow-hidden" style={{ background: "var(--border-subtle)" }}>
            <div className="h-full rounded-full transition-all duration-300" style={{ width: `${scrollProgress * 100}%`, background: "var(--accent-primary)" }} />
          </div>
          <span className="text-[9px] font-mono" style={{ color: "var(--text-muted)" }}>{Math.round(scrollProgress * 100)}%</span>
        </div>
        <span className="text-[9px] font-mono hidden sm:inline" style={{ color: "var(--text-muted)" }}>WebGL 2.0</span>
      </div>
    </footer>
  );
}
