"use client";
import { useAppStore } from "@/state/store";
import { type SceneId, SCENE_CONFIGS } from "@/types/scenes";

const navItems: { id: SceneId; label: string }[] = [
  { id: "hero", label: "Inicio" },
  { id: "room", label: "Habitacion" },
  { id: "project", label: "Proyectos" },
  { id: "lab", label: "Laboratorio" },
];

export default function HUD() {
  const currentScene = useAppStore((s) => s.currentScene);
  const hoveredObject = useAppStore((s) => s.hoveredObject);
  const isTransitioning = useAppStore((s) => s.isTransitioning);
  const setScene = useAppStore((s) => s.setScene);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 10, pointerEvents: "none", fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
      <div style={{ position: "absolute", top: 24, left: 24, display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ fontSize: 9, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(100,210,255,0.5)" }}>Escena activa</span>
        <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.02em", color: "rgba(255,255,255,0.85)" }}>{SCENE_CONFIGS[currentScene].label}</span>
      </div>
      <nav style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 2, padding: 4, borderRadius: 12, background: "rgba(10,10,10,0.7)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.04)", pointerEvents: "auto" }}>
        {navItems.map((item) => {
          const active = currentScene === item.id;
          return (
            <button key={item.id} onClick={() => setScene(item.id)} disabled={isTransitioning}
              style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: active ? "rgba(100,210,255,0.08)" : "transparent", color: active ? "rgba(100,210,255,0.9)" : "rgba(255,255,255,0.35)", fontSize: 11, fontWeight: 500, fontFamily: "var(--font-inter), system-ui, sans-serif", letterSpacing: "-0.01em", cursor: isTransitioning ? "default" : "pointer", transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)", opacity: isTransitioning ? 0.5 : 1 }}>
              {item.label}
            </button>
          );
        })}
      </nav>
      {hoveredObject && (
        <div style={{ position: "absolute", bottom: 90, left: "50%", transform: "translateX(-50%)", padding: "6px 14px", borderRadius: 8, background: "rgba(10,10,10,0.8)", backdropFilter: "blur(10px)", border: "1px solid rgba(100,210,255,0.1)" }}>
          <span style={{ fontSize: 10, fontFamily: "monospace", color: "rgba(100,210,255,0.7)", letterSpacing: "0.05em" }}>{hoveredObject}</span>
        </div>
      )}
      <div style={{ position: "absolute", bottom: 24, right: 24, display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#30d158" }} />
        <span style={{ fontSize: 9, fontFamily: "monospace", color: "rgba(255,255,255,0.15)" }}>v3.0 — WebGL</span>
      </div>
    </div>
  );
}
