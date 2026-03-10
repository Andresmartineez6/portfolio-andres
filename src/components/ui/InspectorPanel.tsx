"use client";
import { useAppStore } from "@/state/store";

function Header({ title }: { title: string }) {
  return (
    <div className="px-4 py-2" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
      <span className="text-[9px] font-semibold uppercase tracking-[0.12em]" style={{ color: "var(--text-muted)" }}>{title}</span>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-4 py-[5px]">
      <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>{label}</span>
      <span className="text-[10px] font-mono truncate ml-3 text-right" style={{ color: "var(--text-secondary)", maxWidth: 120 }}>{value}</span>
    </div>
  );
}

function PlaygroundControls() {
  const p = useAppStore((s) => s.playgroundParams);
  const set = useAppStore((s) => s.setPlaygroundParam);
  const reset = useAppStore((s) => s.resetPlaygroundParams);
  const sliders: { k: keyof typeof p; l: string; min: number; max: number; step: number }[] = [
    { k: "particleCount", l: "Particles", min: 500, max: 10000, step: 500 },
    { k: "particleSize", l: "Size", min: 0.5, max: 5, step: 0.1 },
    { k: "noiseScale", l: "Noise Scale", min: 0.1, max: 5, step: 0.1 },
    { k: "noiseSpeed", l: "Speed", min: 0.01, max: 1, step: 0.01 },
    { k: "distortion", l: "Distortion", min: 0, max: 2, step: 0.05 },
  ];
  return (
    <div className="flex flex-col">
      <Header title="Parametros" />
      <div className="flex flex-col gap-3 p-4">
        {sliders.map((s) => {
          const v = p[s.k] as number;
          const pct = ((v - s.min) / (s.max - s.min)) * 100;
          return (
            <div key={s.k} className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>{s.l}</span>
                <span className="text-[10px] font-mono" style={{ color: "var(--accent-primary)" }}>{v.toFixed(s.step < 1 ? 2 : 0)}</span>
              </div>
              <input type="range" min={s.min} max={s.max} step={s.step} value={v}
                onChange={(e) => set(s.k, parseFloat(e.target.value))} className="w-full"
                style={{ background: `linear-gradient(to right, var(--accent-primary) ${pct}%, var(--border-subtle) ${pct}%)` }} />
            </div>
          );
        })}
        <div className="flex items-center gap-4 mt-1">
          <label className="flex items-center gap-1.5">
            <span className="text-[9px]" style={{ color: "var(--text-muted)" }}>A</span>
            <input type="color" value={p.colorA} onChange={(e) => set("colorA", e.target.value)} className="w-6 h-6 rounded" />
          </label>
          <label className="flex items-center gap-1.5">
            <span className="text-[9px]" style={{ color: "var(--text-muted)" }}>B</span>
            <input type="color" value={p.colorB} onChange={(e) => set("colorB", e.target.value)} className="w-6 h-6 rounded" />
          </label>
        </div>
        <button onClick={reset}
          className="mt-1 px-3 py-1.5 rounded-lg text-[10px] font-medium transition-all duration-300 hover:-translate-y-0.5"
          style={{ border: "1px solid var(--border-subtle)", color: "var(--text-secondary)", background: "var(--bg-glass)" }}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default function InspectorPanel() {
  const active = useAppStore((s) => s.activeSection);
  const open = useAppStore((s) => s.inspectorOpen);
  if (!open) return null;
  return (
    <aside
      className="hidden md:flex flex-col overflow-y-auto"
      style={{
        gridRow: "2 / 4", width: 240,
        background: "rgba(6, 6, 8, 0.85)",
        backdropFilter: "blur(40px)",
        borderLeft: "1px solid var(--border-subtle)",
      }}
    >
      <div className="px-4 py-2.5" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
        <span className="text-[10px] font-semibold uppercase tracking-[0.12em]" style={{ color: "var(--text-secondary)" }}>Inspector</span>
      </div>
      <Header title="Info" />
      <div className="py-0.5">
        <Row label="Seccion" value={active} />
        <Row label="Framework" value="Next.js 16" />
        <Row label="3D Engine" value="Three.js r171" />
        <Row label="Estado" value="Activo" />
      </div>
      <Header title="Contacto" />
      <div className="py-0.5">
        <Row label="Email" value="andres@cabletea.com" />
        <Row label="Tel" value="+34 636 60 85 69" />
        <Row label="GitHub" value="Andresmartineez6" />
        <Row label="LinkedIn" value="AndresLorente" />
      </div>
      {active === "playground" && <PlaygroundControls />}
    </aside>
  );
}
