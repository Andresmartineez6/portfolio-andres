"use client";
import { useAppStore } from "@/state/store";

export default function StatusBar() {
  const s = useAppStore((s) => s.activeSection);
  const p = useAppStore((s) => s.scrollProgress);
  return (
    <footer
      className="hidden md:flex items-center justify-between px-4"
      style={{
        gridColumn: "2 / -1", height: 26,
        background: "rgba(6, 6, 8, 0.92)",
        borderTop: "1px solid var(--border-subtle)",
      }}
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <div className="w-[5px] h-[5px] rounded-full" style={{ background: "var(--accent-green)" }} />
          <span className="text-[9px] font-mono" style={{ color: "var(--text-muted)" }}>Ready</span>
        </div>
        <span className="text-[9px] font-mono uppercase" style={{ color: "var(--text-muted)" }}>{s}</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-14 h-[2px] rounded-full overflow-hidden" style={{ background: "var(--border-subtle)" }}>
            <div className="h-full rounded-full" style={{ width: `${p * 100}%`, background: "var(--accent-primary)", transition: "width 0.3s" }} />
          </div>
          <span className="text-[9px] font-mono" style={{ color: "var(--text-muted)" }}>{Math.round(p * 100)}%</span>
        </div>
        <span className="text-[9px] font-mono" style={{ color: "var(--text-muted)" }}>WebGL 2.0</span>
      </div>
    </footer>
  );
}
