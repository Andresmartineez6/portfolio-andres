"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "motion/react";

const CELL = 10;
const GAP = 3;
const COLS = 52;
const ROWS = 7;
const MONTHS = ["Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar"];

const COLORS = [
  "rgba(255,255,255,0.02)",
  "rgba(100,210,255,0.12)",
  "rgba(100,210,255,0.25)",
  "rgba(100,210,255,0.42)",
  "rgba(100,210,255,0.65)",
];

function generateContributions(): number[][] {
  const grid: number[][] = [];
  for (let c = 0; c < COLS; c++) {
    const col: number[] = [];
    const w = Math.random();
    for (let r = 0; r < ROWS; r++) {
      if (w < 0.2) col.push(Math.random() < 0.12 ? 1 : 0);
      else if (w < 0.5) col.push(Math.random() < 0.35 ? Math.ceil(Math.random() * 2) : 0);
      else if (w < 0.8) col.push(Math.random() < 0.55 ? Math.ceil(Math.random() * 3) : 0);
      else col.push(Math.random() < 0.7 ? Math.ceil(Math.random() * 4) : 0);
      if (r === 0 || r === 6) col[r] = Math.min(col[r], Math.random() < 0.3 ? 1 : 0);
    }
    grid.push(col);
  }
  return grid;
}

interface PacState { col: number; row: number; mouth: number; }
interface Ghost { col: number; row: number; color: string; eyeDir: number; }

export default function GithubPacman() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [grid] = useState(generateContributions);
  const pac = useRef<PacState>({ col: -2, row: 3, mouth: 0 });
  const ghosts = useRef<Ghost[]>([
    { col: 18, row: 2, color: "#ff5555", eyeDir: 0 },
    { col: 33, row: 4, color: "#ffb8ff", eyeDir: 0.5 },
    { col: 46, row: 1, color: "#55ffff", eyeDir: -0.3 },
  ]);
  const frame = useRef(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const ox = 28, oy = 22;
    const step = CELL + GAP;

    // Months
    ctx.font = "500 9px -apple-system, 'Inter', system-ui, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.2)";
    for (let i = 0; i < MONTHS.length; i++) {
      ctx.fillText(MONTHS[i], ox + i * (COLS / MONTHS.length) * step, oy - 6);
    }

    // Grid
    for (let c = 0; c < COLS; c++) {
      for (let r = 0; r < ROWS; r++) {
        const x = ox + c * step, y = oy + r * step;
        ctx.fillStyle = COLORS[grid[c][r]];
        ctx.beginPath();
        ctx.roundRect(x, y, CELL, CELL, 2.5);
        ctx.fill();
      }
    }

    // Dots for pac to eat
    for (let c = 0; c < COLS; c += 2) {
      if (c < pac.current.col + 0.5) continue;
      const x = ox + c * step + CELL / 2;
      const y = oy + pac.current.row * step + CELL / 2;
      ctx.fillStyle = "rgba(255,255,255,0.15)";
      ctx.beginPath();
      ctx.arc(x, y, 1.2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Pacman
    const p = pac.current;
    p.col += 0.035;
    p.mouth = (Math.sin(frame.current * 0.18) + 1) * 0.25;
    if (p.col > COLS + 3) p.col = -3;
    const px = ox + p.col * step + CELL / 2;
    const py = oy + p.row * step + CELL / 2;
    const pr = CELL * 0.65;
    ctx.fillStyle = "#ffd60a";
    ctx.shadowColor = "#ffd60a";
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(px, py, pr, p.mouth * Math.PI, (2 - p.mouth) * Math.PI);
    ctx.lineTo(px, py);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#111";
    ctx.beginPath();
    ctx.arc(px + 1.5, py - pr * 0.38, 1.3, 0, Math.PI * 2);
    ctx.fill();

    // Ghosts
    for (const g of ghosts.current) {
      g.row += Math.sin(frame.current * 0.025 + g.col) * 0.008;
      g.eyeDir = Math.sin(frame.current * 0.02 + g.col * 0.5) * 0.5;
      const gx = ox + g.col * step + CELL / 2;
      const gy = oy + g.row * step + CELL / 2;
      const gr = CELL * 0.6;
      ctx.fillStyle = g.color;
      ctx.shadowColor = g.color;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(gx, gy - gr * 0.15, gr, Math.PI, 0);
      ctx.lineTo(gx + gr, gy + gr * 0.45);
      for (let i = 0; i < 3; i++) {
        const sx = gx + gr - (i + 0.5) * (gr * 2 / 3);
        ctx.quadraticCurveTo(sx + gr / 3, gy + gr * 0.15, sx, gy + gr * 0.45);
      }
      ctx.closePath();
      ctx.fill();
      ctx.shadowBlur = 0;
      // Eyes
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(gx - gr * 0.22, gy - gr * 0.2, gr * 0.2, 0, Math.PI * 2);
      ctx.arc(gx + gr * 0.22, gy - gr * 0.2, gr * 0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#1a1a4e";
      ctx.beginPath();
      ctx.arc(gx - gr * 0.22 + g.eyeDir * 1.5, gy - gr * 0.2, gr * 0.1, 0, Math.PI * 2);
      ctx.arc(gx + gr * 0.22 + g.eyeDir * 1.5, gy - gr * 0.2, gr * 0.1, 0, Math.PI * 2);
      ctx.fill();
    }

    frame.current++;
  }, [grid]);

  useEffect(() => {
    let raf: number;
    const loop = () => { draw(); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [draw]);

  const W = 28 + COLS * (CELL + GAP) + 10;
  const H = 22 + ROWS * (CELL + GAP) + 12;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
      className="glass-panel overflow-hidden"
    >
      <div className="flex items-center gap-3 px-5 py-3" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
        <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>github-contributions</span>
        <a href="https://github.com/Andresmartineez6" target="_blank" rel="noopener noreferrer"
          className="ml-auto text-[10px] font-mono transition-colors hover:underline" style={{ color: "var(--accent-primary)" }}>
          @Andresmartineez6
        </a>
      </div>
      <div className="overflow-x-auto p-4" style={{ scrollbarWidth: "thin" }}>
        <canvas ref={canvasRef} width={W} height={H} style={{ display: "block", width: W, height: H }} />
      </div>
    </motion.div>
  );
}
