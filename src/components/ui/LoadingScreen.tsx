"use client";
import { useState, useEffect, useCallback } from "react";
import { useAppStore } from "@/state/store";

const messages = [
  "Inicializando motor 3D...",
  "Compilando shaders...",
  "Cargando geometrias...",
  "Preparando escena...",
  "Listo.",
];

export default function LoadingScreen() {
  const setLoaded = useAppStore((s) => s.setLoaded);
  const setLoading = useAppStore((s) => s.setLoading);
  const [progress, setProgress] = useState(0);
  const [msgIdx, setMsgIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const [fade, setFade] = useState(false);

  const finish = useCallback(() => {
    setFade(true);
    setTimeout(() => {
      setVisible(false);
      setLoaded(true);
      setLoading(false);
    }, 700);
  }, [setLoaded, setLoading]);

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
    <div style={{
      position: "fixed", inset: 0, zIndex: 100,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      background: "#0a0a0a",
      opacity: fade ? 0 : 1,
      transition: "opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
      fontFamily: "var(--font-inter), system-ui, sans-serif",
    }}>
      <div style={{ position: "relative", width: 96, height: 96, marginBottom: 48 }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid rgba(100,210,255,0.08)", animation: "spin 8s linear infinite" }} />
        <div style={{ position: "absolute", inset: 8, borderRadius: "50%", border: "1px solid rgba(100,210,255,0.12)", animation: "spin 6s linear infinite reverse" }} />
        <div style={{ position: "absolute", inset: 16, borderRadius: "50%", border: "1px solid rgba(100,210,255,0.06)", animation: "spin 10s linear infinite" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", width: 6, height: 6, borderRadius: "50%", transform: "translate(-50%, -50%)", background: "#64d2ff", boxShadow: "0 0 20px rgba(100,210,255,0.3)" }} />
      </div>
      <div style={{ width: 192, display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        <div style={{ width: "100%", height: 1, borderRadius: 1, background: "rgba(255,255,255,0.04)", overflow: "hidden" }}>
          <div style={{ height: "100%", borderRadius: 1, width: (progress * 100) + "%", background: "linear-gradient(90deg, #64d2ff, rgba(255,255,255,0.5))", transition: "width 0.1s linear" }} />
        </div>
        <span style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: "0.1em", color: "rgba(255,255,255,0.2)" }}>
          {messages[msgIdx]}
        </span>
      </div>
    </div>
  );
}
