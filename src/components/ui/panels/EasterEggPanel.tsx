"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import HoloPanel from "@/components/ui/panels/HoloPanel";

const MESSAGES = [
  "Inicializando modo energia...",
  "Cargando cafeina virtual...",
  "Optimizando sinapsis...",
  "Compilando motivacion...",
  "Deploy en produccion cerebral...",
];

export default function EasterEggPanel({ onClose }: { onClose: () => void }) {
  const [phase, setPhase] = useState(0);
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    if (phase < MESSAGES.length) {
      const timer = setTimeout(() => setPhase((p) => p + 1), 600);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setActivated(true), 400);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  return (
    <HoloPanel visible onClose={onClose} width="360px">
      <div style={{ textAlign: "center", padding: "8px 0" }}>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontSize: 40, marginBottom: 12, filter: activated ? "drop-shadow(0 0 20px rgba(34, 255, 102, 0.5))" : "none", transition: "filter 0.5s" }}
        >
          {activated ? "⚡" : "🥤"}
        </motion.div>

        <AnimatePresence mode="wait">
          {!activated ? (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>Developer Energy Mode</h2>
              <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-start", paddingLeft: "20%" }}>
                {MESSAGES.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: i < phase ? 1 : 0.15, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <span style={{ fontSize: 10, color: i < phase ? "#22ff66" : "var(--text-muted)", fontFamily: "monospace" }}>
                      {i < phase ? "✓" : "○"}
                    </span>
                    <span style={{ fontSize: 11, color: i < phase ? "var(--text-primary)" : "var(--text-muted)", fontFamily: "monospace" }}>{msg}</span>
                  </motion.div>
                ))}
              </div>
              <div style={{ marginTop: 16, width: "60%", marginInline: "auto", height: 2, background: "rgba(255,255,255,0.04)", borderRadius: 1, overflow: "hidden" }}>
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${(phase / MESSAGES.length) * 100}%` }}
                  style={{ height: "100%", background: "linear-gradient(90deg, #22ff66, #64d2ff)", borderRadius: 1 }}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, background: "linear-gradient(90deg, #22ff66, #64d2ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-0.02em" }}>
                ENERGIA ACTIVADA
              </h2>
              <p style={{ fontSize: 11, color: "var(--text-secondary)", marginTop: 8, fontFamily: "monospace" }}>Productividad +200% | Bugs -50%</p>
              <p style={{ fontSize: 9, color: "var(--text-muted)", marginTop: 12, fontFamily: "monospace" }}>Este mensaje se autodestruira... o no.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </HoloPanel>
  );
}
