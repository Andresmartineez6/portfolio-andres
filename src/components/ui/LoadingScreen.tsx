"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAppStore } from "@/state/store";

const loadingMessages = [
  "Inicializando motor 3D...", "Compilando shaders...", "Generando particulas...",
  "Cargando texturas...", "Preparando escenas...", "Optimizando GPU...", "Listo.",
];

export default function LoadingScreen() {
  const isLoading = useAppStore((s) => s.isLoading);
  const setLoading = useAppStore((s) => s.setLoading);
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const duration = 2500;
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(eased);
      setMessageIndex(Math.min(Math.floor(eased * loadingMessages.length), loadingMessages.length - 1));
      if (p >= 1) { clearInterval(interval); setTimeout(() => setLoading(false), 400); }
    }, 30);
    return () => clearInterval(interval);
  }, [setLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center" style={{ background: "var(--bg-primary)" }}>
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center gap-8">
            <div className="flex items-center justify-center rounded-2xl animate-pulse-glow"
              style={{ width: 64, height: 64, background: "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))" }}>
              <span className="text-2xl font-bold text-white">A</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <h1 className="text-lg font-medium tracking-wider" style={{ color: "var(--text-primary)" }}>Andres Lorente Martinez</h1>
              <p className="text-xs tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>Software Engineer</p>
            </div>
            <div className="flex flex-col items-center gap-3 w-64">
              <div className="w-full h-0.5 rounded-full overflow-hidden" style={{ background: "var(--border-subtle)" }}>
                <motion.div className="h-full rounded-full" style={{ background: "var(--accent-primary)", width: `${progress * 100}%` }} />
              </div>
              <p className="text-[10px] font-mono" style={{ color: "var(--text-muted)" }}>{loadingMessages[messageIndex]}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
