"use client";
import { motion } from "motion/react";
import { useAppStore } from "@/state/store";

function Slider({ label, value, min, max, step, onChange }: {
  label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{label}</span>
        <span className="text-xs font-mono" style={{ color: "var(--accent-primary)" }}>{value.toFixed(step < 1 ? 2 : 0)}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1 rounded-full appearance-none cursor-pointer"
        style={{ background: `linear-gradient(to right, var(--accent-primary) ${pct}%, var(--border-subtle) ${pct}%)` }} />
    </div>
  );
}

export default function PlaygroundSection() {
  const params = useAppStore((s) => s.playgroundParams);
  const setParam = useAppStore((s) => s.setPlaygroundParam);
  const resetParams = useAppStore((s) => s.resetPlaygroundParams);

  return (
    <section className="min-h-screen px-4 md:px-6 py-20 flex flex-col gap-8">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }} className="flex flex-col gap-2">
        <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: "var(--accent-primary)" }}>03 / Playground</span>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ letterSpacing: "-0.03em" }}>Laboratorio Visual</h2>
        <p className="text-sm max-w-md mt-1" style={{ color: "var(--text-secondary)" }}>
          Experimenta con el sistema de particulas en tiempo real. En desktop, usa el panel Inspector.
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }} className="glass-panel p-5 flex flex-col gap-4 md:hidden">
        <div className="flex items-center gap-2 pb-3" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
          <div className="w-2 h-2 rounded-full" style={{ background: "var(--accent-primary)", opacity: 0.7 }} />
          <span className="text-[10px] font-mono uppercase tracking-wider ml-1" style={{ color: "var(--text-muted)" }}>controles.panel</span>
        </div>
        <Slider label="Particulas" value={params.particleCount} min={500} max={10000} step={500} onChange={(v) => setParam("particleCount", v)} />
        <Slider label="Tamano" value={params.particleSize} min={0.5} max={5} step={0.1} onChange={(v) => setParam("particleSize", v)} />
        <Slider label="Escala Ruido" value={params.noiseScale} min={0.1} max={5} step={0.1} onChange={(v) => setParam("noiseScale", v)} />
        <Slider label="Velocidad" value={params.noiseSpeed} min={0.01} max={1} step={0.01} onChange={(v) => setParam("noiseSpeed", v)} />
        <Slider label="Distorsion" value={params.distortion} min={0} max={2} step={0.05} onChange={(v) => setParam("distortion", v)} />
        <div className="flex items-center gap-4 mt-1">
          <label className="flex items-center gap-2">
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>Color A</span>
            <input type="color" value={params.colorA} onChange={(e) => setParam("colorA", e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0" />
          </label>
          <label className="flex items-center gap-2">
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>Color B</span>
            <input type="color" value={params.colorB} onChange={(e) => setParam("colorB", e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0" />
          </label>
        </div>
        <button onClick={resetParams} className="mt-2 px-4 py-2 rounded-lg text-xs font-medium transition-all hover:-translate-y-0.5"
          style={{ border: "1px solid var(--border-subtle)", color: "var(--text-secondary)", background: "var(--bg-glass)" }}>
          Restaurar valores
        </button>
      </motion.div>
    </section>
  );
}
