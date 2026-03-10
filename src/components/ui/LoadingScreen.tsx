"use client";
import { useState, useEffect, useCallback } from "react";
import { useAppStore } from "@/state/store";

const messages = [
  "Inicializando WebGL...",
  "Compilando shaders...",
  "Cargando geometrias...",
  "Renderizando escena...",
  "Preparando interfaz...",
];

export default function LoadingScreen() {
  const setLoaded = useAppStore((s) => s.setLoaded);
  const [progress, setProgress] = useState(0);
  const [msgIdx, setMsgIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const [fade, setFade] = useState(false);

  const finish = useCallback(() => {
    setFade(true);
    setTimeout(() => { setVisible(false); setLoaded(true); }, 700);
  }, [setLoaded]);

  useEffect(() => {
    let frame = 0;
    const tick = () => {
      frame++;
      setProgress((p) => {
        const next = Math.min(p + (1 - p) * 0.025 + Math.random() * 0.008, 1);
        if (next >= 1) { finish(); return 1; }
        return next;
      });
      if (frame % 35 === 0) setMsgIdx((i) => Math.min(i + 1, messages.length - 1));
    };
    const id = setInterval(tick, 30);
    return () => clearInterval(id);
  }, [finish]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{
        background: "#000",
        opacity: fade ? 0 : 1,
        transition: "opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {/* Orbital rings */}
      <div className="relative w-24 h-24 mb-12">
        <div className="absolute inset-0 rounded-full animate-spin-slow" style={{ border: "1px solid rgba(100,210,255,0.08)", animationDuration: "8s" }} />
        <div className="absolute inset-2 rounded-full animate-spin-slow" style={{ border: "1px solid rgba(100,210,255,0.12)", animationDuration: "6s", animationDirection: "reverse" }} />
        <div className="absolute inset-4 rounded-full animate-spin-slow" style={{ border: "1px solid rgba(100,210,255,0.06)", animationDuration: "10s" }} />
        <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{ background: "var(--accent-primary)", boxShadow: "0 0 20px rgba(100,210,255,0.3)" }} />
      </div>
      {/* Progress */}
      <div className="flex flex-col items-center gap-5 w-48">
        <div className="w-full h-[1px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
          <div className="h-full rounded-full" style={{
            width: `${progress * 100}%`,
            background: "linear-gradient(90deg, var(--accent-primary), rgba(255,255,255,0.5))",
            transition: "width 0.1s linear",
          }} />
        </div>
        <span className="text-[10px] font-mono tracking-wider" style={{ color: "var(--text-muted)" }}>
          {messages[msgIdx]}
        </span>
      </div>
    </div>
  );
}
