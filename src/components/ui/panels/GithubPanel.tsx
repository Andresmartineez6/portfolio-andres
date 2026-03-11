"use client";
import { motion } from "motion/react";
import HoloPanel from "@/components/ui/panels/HoloPanel";

const MONTHS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

function generateHeatmap(): number[][] {
  const weeks = 20;
  const days = 7;
  const data: number[][] = [];
  for (let w = 0; w < weeks; w++) {
    const week: number[] = [];
    for (let d = 0; d < days; d++) {
      const r = Math.random();
      week.push(r < 0.3 ? 0 : r < 0.5 ? 1 : r < 0.7 ? 2 : r < 0.85 ? 3 : 4);
    }
    data.push(week);
  }
  return data;
}

const HEATMAP = generateHeatmap();
const HEAT_COLORS = ["rgba(255,255,255,0.03)", "#0e4429", "#006d32", "#26a641", "#39d353"];

const REPOS = [
  { name: "portfolio-andres", lang: "TypeScript", stars: 12, desc: "Portfolio 3D interactivo" },
  { name: "api-gateway", lang: "Go", stars: 34, desc: "API Gateway con rate limiting" },
  { name: "shader-lab", lang: "GLSL", stars: 8, desc: "Coleccion de shaders experimentales" },
  { name: "cli-toolkit", lang: "Rust", stars: 21, desc: "Herramientas CLI de productividad" },
];

const COMMITS = [
  { msg: "feat: paneles holograficos portfolio", time: "hace 2h", repo: "portfolio-andres" },
  { msg: "fix: rate limiter race condition", time: "hace 5h", repo: "api-gateway" },
  { msg: "refactor: noise function optimization", time: "hace 1d", repo: "shader-lab" },
  { msg: "docs: actualizar README", time: "hace 2d", repo: "portfolio-andres" },
];

export default function GithubPanel({ onClose }: { onClose: () => void }) {
  return (
    <HoloPanel visible onClose={onClose} width="460px">
      <div className="holo-header">
        <span className="holo-label">SISTEMA // ACTIVIDAD</span>
        <h2 className="holo-title">GitHub</h2>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15, duration: 0.5 }} style={{ marginTop: 16 }}>
        <span style={{ fontSize: 10, fontFamily: "monospace", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Contribuciones</span>
        <div style={{ display: "flex", gap: 2, marginTop: 8, overflowX: "auto" }}>
          {HEATMAP.map((week, wi) => (
            <div key={wi} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {week.map((level, di) => (
                <div key={di} style={{ width: 10, height: 10, borderRadius: 2, background: HEAT_COLORS[level], transition: "background 0.2s" }} title={`Nivel ${level}`} />
              ))}
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.4 }} style={{ marginTop: 20 }}>
        <span style={{ fontSize: 10, fontFamily: "monospace", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Repositorios</span>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
          {REPOS.map((repo) => (
            <div key={repo.name} className="holo-card" style={{ padding: "8px 12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "var(--accent-primary)" }}>{repo.name}</span>
                <span style={{ fontSize: 10, color: "var(--text-muted)" }}>{repo.stars} stars</span>
              </div>
              <p style={{ fontSize: 10, color: "var(--text-secondary)", marginTop: 2 }}>{repo.desc}</p>
              <span className="holo-tag" style={{ marginTop: 4 }}>{repo.lang}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.4 }} style={{ marginTop: 20 }}>
        <span style={{ fontSize: 10, fontFamily: "monospace", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Commits recientes</span>
        <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 8 }}>
          {COMMITS.map((c, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 11, color: "var(--text-primary)" }}>{c.msg}</span>
                <span style={{ fontSize: 9, color: "var(--text-muted)", marginLeft: 8 }}>{c.repo}</span>
              </div>
              <span style={{ fontSize: 9, color: "var(--text-muted)", whiteSpace: "nowrap" }}>{c.time}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </HoloPanel>
  );
}
