"use client";
import { motion } from "motion/react";
import { useAppStore } from "@/state/store";

function InlineSlider({ label, value, min, max, step, onChange }: {
  label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>{label}</span>
        <span className="text-[11px] font-mono" style={{ color: "var(--accent-primary)" }}>{value.toFixed(step < 1 ? 2 : 0)}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        style={{ background: `linear-gradient(to right, var(--accent-primary) ${pct}%, var(--border-subtle) ${pct}%)` }} />
    </div>
  );
}

export default function PlaygroundSection() {
  const params = useAppStore((s) => s.playgroundParams);
  const setParam = useAppStore((s) => s.setPlaygroundParam);
  const resetParams = useAppStore((s) => s.resetPlaygroundParams);

  return (
    <section className="min-h-screen px-4 md:px-6 py-16 flex flex-col gap-6">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="flex flex-col gap-2 mb-4">
        <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: "var(--accent-primary)" }}>03 / Playground</span>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>Laboratorio Visual</h2>
        <p className="text-sm max-w-md" style={{ color: "var(--text-secondary)" }}>
          Experimenta con los parametros del sistema de particulas en tiempo real. En escritorio usa el panel Inspector de la derecha.
        </p>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }} className="glass-panel p-5 flex flex-col gap-4 md:hidden">
        <div className="flex items-center gap-2 pb-3" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full" style={{ background: "#ff5f57" }} />
            <div className="w-2 h-2 rounded-full" style={{ background: "#febc2e" }} />
            <div className="w-2 h-2 rounded-full" style={{ background: "#28c840" }} />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-wider ml-2" style={{ color: "var(--text-muted)" }}>controles.panel</span>
        </div>
        <InlineSlider label="Particulas" value={params.particleCount} min={500} max={10000} step={500} onChange={(v) => setParam("particleCount", v)} />
        <InlineSlider label="Tamano" value={params.particleSize} min={0.5} max={5} step={0.1} onChange={(v) => setParam("particleSize", v)} />
        <InlineSlider label="Escala Ruido" value={params.noiseScale} min={0.1} max={5} step={0.1} onChange={(v) => setParam("noiseScale", v)} />
        <InlineSlider label="Velocidad" value={params.noiseSpeed} min={0.01} max={1} step={0.01} onChange={(v) => setParam("noiseSpeed", v)} />
        <InlineSlider label="Distorsion" value={params.distortion} min={0} max={2} step={0.05} onChange={(v) => setParam("distortion", v)} />
        <div className="flex items-center gap-4 mt-1">
          <label className="flex items-center gap-2">
            <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>Color A</span>
            <input type="color" value={params.colorA} onChange={(e) => setParam("colorA", e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0" style={{ background: "transparent" }} />
          </label>
          <label className="flex items-center gap-2">
            <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>Color B</span>
            <input type="color" value={params.colorB} onChange={(e) => setParam("colorB", e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0" style={{ background: "transparent" }} />
          </label>
        </div>
        <button onClick={resetParams} className="mt-2 px-4 py-2 rounded-md text-xs font-medium transition-all"
          style={{ border: "1px solid var(--border-subtle)", color: "var(--text-secondary)", background: "var(--bg-glass)" }}>
          Restaurar valores por defecto
        </button>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }} className="hidden md:flex items-center gap-2 mt-8">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: "var(--text-muted)" }}><path d="M15 15l-2 5L9 9l11 4-5 2z" /></svg>
        <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>Usa el panel Inspector de la derecha para modificar los parametros del sistema de particulas en tiempo real.</span>
      </motion.div>
    </section>
  );
}
