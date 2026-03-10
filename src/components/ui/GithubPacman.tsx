"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "motion/react";

const CELL = 11;
const GAP = 2;
const COLS = 52;
const ROWS = 7;
const MONTHS = ["Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar"];

const COLORS = [
  "rgba(255,255,255,0.03)",
  "rgba(100,210,255,0.15)",
  "rgba(100,210,255,0.3)",
  "rgba(100,210,255,0.5)",
  "rgba(100,210,255,0.75)",
];

function generateContributions(): number[][] {
  const grid: number[][] = [];
  for (let c = 0; c < COLS; c++) {
    const col: number[] = [];
    const weekActivity = Math.random();
    for (let r = 0; r < ROWS; r++) {
      if (weekActivity < 0.2) { col.push(Math.random() < 0.15 ? 1 : 0); }
      else if (weekActivity < 0.5) { col.push(Math.random() < 0.4 ? Math.ceil(Math.random() * 2) : 0); }
      else if (weekActivity < 0.8) { col.push(Math.random() < 0.6 ? Math.ceil(Math.random() * 3) : 0); }
      else { col.push(Math.random() < 0.75 ? Math.ceil(Math.random() * 4) : 0); }
      if (r === 0 || r === 6) col[r] = Math.min(col[r], Math.random() < 0.3 ? 1 : 0);
    }
    grid.push(col);
  }
  return grid;
}

// Maze walls - simplified pattern
const WALLS: [number, number, number, number][] = [
  [0,0,8,0],[0,0,0,3],[8,0,8,2],[5,2,8,2],
  [10,0,10,4],[12,1,16,1],[12,1,12,3],[16,1,16,3],[12,3,14,3],
  [18,0,22,0],[18,0,18,2],[22,0,22,3],[19,3,22,3],
  [24,0,24,5],[26,1,30,1],[26,3,28,3],[30,1,30,4],
  [32,0,36,0],[32,0,32,2],[36,0,36,2],[33,2,35,2],
  [38,0,38,6],[40,1,44,1],[40,3,42,3],[44,1,44,5],
  [46,0,50,0],[46,0,46,3],[50,0,50,3],[47,3,50,3],
  [0,5,4,5],[4,5,4,6],[6,4,8,4],[8,4,8,6],
  [10,5,14,5],[14,5,14,6],[16,5,18,5],[18,4,20,4],
  [22,5,26,5],[28,5,30,5],[30,5,30,6],
  [32,5,36,5],[34,4,36,4],[38,5,42,5],
  [44,5,48,5],[48,5,48,6],[50,5,51,5],
];

interface PacmanState { col: number; row: number; dir: number; mouthOpen: number; }
interface Ghost { col: number; row: number; color: string; }

export default function GithubPacman() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [grid] = useState(generateContributions);
  const pacmanRef = useRef<PacmanState>({ col: 8, row: 3.5, dir: 0, mouthOpen: 0 });
  const ghostsRef = useRef<Ghost[]>([
    { col: 20, row: 2, color: "#ff5555" },
    { col: 35, row: 4, color: "#ffb8ff" },
    { col: 48, row: 1, color: "#55ffff" },
  ]);
  const frameRef = useRef(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const ox = 30;
    const oy = 20;

    // Month labels
    ctx.font = "9px -apple-system, system-ui, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.25)";
    for (let i = 0; i < MONTHS.length; i++) {
      ctx.fillText(MONTHS[i], ox + i * (COLS / MONTHS.length) * (CELL + GAP), oy - 6);
    }

    // Grid cells
    for (let c = 0; c < COLS; c++) {
      for (let r = 0; r < ROWS; r++) {
        const x = ox + c * (CELL + GAP);
        const y = oy + r * (CELL + GAP);
        ctx.fillStyle = COLORS[grid[c][r]];
        ctx.beginPath();
        ctx.roundRect(x, y, CELL, CELL, 2);
        ctx.fill();
      }
    }

    // Maze walls
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = 1.5;
    ctx.lineCap = "round";
    for (const [c1, r1, c2, r2] of WALLS) {
      const x1 = ox + c1 * (CELL + GAP) + CELL / 2;
      const y1 = oy + r1 * (CELL + GAP) + CELL / 2;
      const x2 = ox + c2 * (CELL + GAP) + CELL / 2;
      const y2 = oy + r2 * (CELL + GAP) + CELL / 2;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    // Dots along path
    for (let c = 0; c < COLS; c += 3) {
      const r = 3;
      const x = ox + c * (CELL + GAP) + CELL / 2;
      const y = oy + r * (CELL + GAP) + CELL / 2;
      if (c < pacmanRef.current.col - 1) continue;
      ctx.fillStyle = "rgba(255,255,255,0.2)";
      ctx.beginPath();
      ctx.arc(x, y, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Animate pacman
    const pac = pacmanRef.current;
    pac.col += 0.04;
    pac.mouthOpen = (Math.sin(frameRef.current * 0.15) + 1) * 0.3;
    if (pac.col > COLS + 2) pac.col = -2;

    const px = ox + pac.col * (CELL + GAP) + CELL / 2;
    const py = oy + pac.row * (CELL + GAP) + CELL / 2;
    const radius = CELL * 0.7;
    const mouth = pac.mouthOpen;

    ctx.fillStyle = "#ffd60a";
    ctx.beginPath();
    ctx.arc(px, py, radius, mouth * Math.PI, (2 - mouth) * Math.PI);
    ctx.lineTo(px, py);
    ctx.fill();
    // Eye
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(px + 2, py - radius * 0.35, 1.5, 0, Math.PI * 2);
    ctx.fill();

    // Ghosts
    for (const ghost of ghostsRef.current) {
      ghost.row += Math.sin(frameRef.current * 0.03 + ghost.col) * 0.01;
      const gx = ox + ghost.col * (CELL + GAP) + CELL / 2;
      const gy = oy + ghost.row * (CELL + GAP) + CELL / 2;
      const gr = CELL * 0.65;
      ctx.fillStyle = ghost.color;
      ctx.beginPath();
      ctx.arc(gx, gy - gr * 0.2, gr, Math.PI, 0);
      ctx.lineTo(gx + gr, gy + gr * 0.5);
      for (let i = 0; i < 3; i++) {
        const sx = gx + gr - (i + 0.5) * (gr * 2 / 3);
        ctx.quadraticCurveTo(sx + gr / 3, gy + gr * 0.2, sx, gy + gr * 0.5);
      }
      ctx.closePath();
      ctx.fill();
      // Eyes
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(gx - gr * 0.25, gy - gr * 0.25, gr * 0.22, 0, Math.PI * 2);
      ctx.arc(gx + gr * 0.25, gy - gr * 0.25, gr * 0.22, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#22f";
      ctx.beginPath();
      ctx.arc(gx - gr * 0.2, gy - gr * 0.25, gr * 0.1, 0, Math.PI * 2);
      ctx.arc(gx + gr * 0.3, gy - gr * 0.25, gr * 0.1, 0, Math.PI * 2);
      ctx.fill();
    }

    frameRef.current++;
  }, [grid]);

  useEffect(() => {
    let raf: number;
    function loop() { draw(); raf = requestAnimationFrame(loop); }
    loop();
    return () => cancelAnimationFrame(raf);
  }, [draw]);

  const totalWidth = 30 + COLS * (CELL + GAP) + 10;
  const totalHeight = 20 + ROWS * (CELL + GAP) + 15;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
      className="glass-panel overflow-hidden"
    >
      <div className="flex items-center gap-2 px-4 py-2.5" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full" style={{ background: "#ffd60a", opacity: 0.7 }} />
          <div className="w-2 h-2 rounded-full" style={{ background: "var(--border-medium)" }} />
          <div className="w-2 h-2 rounded-full" style={{ background: "var(--border-medium)" }} />
        </div>
        <span className="text-[10px] font-mono uppercase tracking-wider ml-1" style={{ color: "var(--text-muted)" }}>
          github-contributions.pacman
        </span>
        <a
          href="https://github.com/Andresmartineez6"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-[9px] font-mono transition-colors"
          style={{ color: "var(--accent-primary)" }}
        >
          @Andresmartineez6
        </a>
      </div>
      <div className="overflow-x-auto p-3" style={{ scrollbarWidth: "thin" }}>
        <canvas
          ref={canvasRef}
          width={totalWidth}
          height={totalHeight}
          style={{ display: "block", width: totalWidth, height: totalHeight }}
        />
      </div>
    </motion.div>
  );
}
