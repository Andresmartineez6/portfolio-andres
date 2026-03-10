"use client";
import { useAppStore } from "@/state/store";

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between px-3 py-2" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
      <span className="text-[10px] font-medium uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>{title}</span>
    </div>
  );
}

function PropertyRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-3 py-1.5">
      <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>{label}</span>
      <span className="text-[11px] font-mono" style={{ color: "var(--text-secondary)" }}>{value}</span>
    </div>
  );
}

function PlaygroundControls() {
  const params = useAppStore((s) => s.playgroundParams);
  const setParam = useAppStore((s) => s.setPlaygroundParam);
  const resetParams = useAppStore((s) => s.resetPlaygroundParams);

  const sliders: { key: keyof typeof params; label: string; min: number; max: number; step: number }[] = [
    { key: "particleCount", label: "Particulas", min: 500, max: 10000, step: 500 },
    { key: "particleSize", label: "Tamano", min: 0.5, max: 5, step: 0.1 },
    { key: "noiseScale", label: "Escala Ruido", min: 0.1, max: 5, step: 0.1 },
    { key: "noiseSpeed", label: "Velocidad", min: 0.01, max: 1, step: 0.01 },
    { key: "distortion", label: "Distorsion", min: 0, max: 2, step: 0.05 },
    { key: "bloomIntensity", label: "Bloom", min: 0, max: 2, step: 0.1 },
  ];

  return (
    <div className="flex flex-col">
      <SectionHeader title="Parametros" />
      <div className="flex flex-col gap-2 p-3">
        {sliders.map((s) => (
          <div key={s.key} className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>{s.label}</span>
              <span className="text-[10px] font-mono" style={{ color: "var(--text-accent)" }}>
                {typeof params[s.key] === "number" ? (params[s.key] as number).toFixed(s.step < 1 ? 2 : 0) : params[s.key]}
              </span>
            </div>
            <input type="range" min={s.min} max={s.max} step={s.step} value={params[s.key] as number}
              onChange={(e) => setParam(s.key, parseFloat(e.target.value))}
              className="w-full h-1 rounded-full appearance-none cursor-pointer"
              style={{ background: `linear-gradient(to right, var(--accent-primary) ${((params[s.key] as number - s.min) / (s.max - s.min)) * 100}%, var(--border-subtle) ${((params[s.key] as number - s.min) / (s.max - s.min)) * 100}%)` }}
            />
          </div>
        ))}
        <div className="flex items-center gap-2 mt-2">
          <label className="flex items-center gap-2 flex-1">
            <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>Color A</span>
            <input type="color" value={params.colorA} onChange={(e) => setParam("colorA", e.target.value)} className="w-6 h-6 rounded cursor-pointer border-0" style={{ background: "transparent" }} />
          </label>
          <label className="flex items-center gap-2 flex-1">
            <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>Color B</span>
            <input type="color" value={params.colorB} onChange={(e) => setParam("colorB", e.target.value)} className="w-6 h-6 rounded cursor-pointer border-0" style={{ background: "transparent" }} />
          </label>
        </div>
        <button onClick={resetParams}
          className="mt-2 px-3 py-1.5 rounded-md text-[10px] font-medium transition-all"
          style={{ border: "1px solid var(--border-subtle)", color: "var(--text-secondary)", background: "var(--bg-glass)" }}>
          Restaurar valores
        </button>
      </div>
    </div>
  );
}

export default function InspectorPanel() {
  const activeSection = useAppStore((s) => s.activeSection);
  const inspectorOpen = useAppStore((s) => s.inspectorOpen);
  if (!inspectorOpen) return null;
  const technologies = ["TypeScript", "React", "Three.js", "GLSL", "TailwindCSS", "Zustand", "Motion", "Lenis"];

  return (
    <aside className="glass-panel hidden md:flex flex-col overflow-y-auto"
      style={{ gridRow: "2 / 4", borderRadius: 0, borderBottom: "none", borderRight: "none", width: "280px" }}>
      <div className="flex items-center px-3 py-2" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
        <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>Inspector</span>
      </div>
      <SectionHeader title="Informacion" />
      <div className="flex flex-col gap-0.5 py-1">
        <PropertyRow label="Seccion" value={activeSection} />
        <PropertyRow label="Framework" value="Next.js 16" />
        <PropertyRow label="3D Engine" value="Three.js" />
        <PropertyRow label="Estado" value="Activo" />
      </div>
      <SectionHeader title="Stack Tecnologico" />
      <div className="flex flex-wrap gap-1 p-3">
        {technologies.map((tech) => (
          <span key={tech} className="px-2 py-0.5 rounded text-[9px] font-mono"
            style={{ background: "var(--bg-glass)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}>{tech}</span>
        ))}
      </div>
      <SectionHeader title="Contacto" />
      <div className="flex flex-col gap-0.5 py-1">
        <PropertyRow label="Email" value="andres@cabletea.com" />
        <PropertyRow label="Tel" value="+34 636 60 85 69" />
        <PropertyRow label="GitHub" value="Andresmartineez6" />
        <PropertyRow label="LinkedIn" value="AndresLorente" />
      </div>
      {activeSection === "playground" && <PlaygroundControls />}
    </aside>
  );
}
