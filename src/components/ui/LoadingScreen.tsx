"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAppStore } from "@/state/store";

export default function LoadingScreen() {
  const isLoading = useAppStore((s) => s.isLoading);
  const setLoading = useAppStore((s) => s.setLoading);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2800;
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setProgress(eased);
      if (p >= 1) { clearInterval(interval); setTimeout(() => setLoading(false), 300); }
    }, 16);
    return () => clearInterval(interval);
  }, [setLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: "#000000" }}
        >
          {/* 3D Orbital rings */}
          <div style={{
            width: 120, height: 120, position: "relative",
            perspective: "600px", transformStyle: "preserve-3d",
          }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{
                position: "absolute", inset: 0,
                border: `1px solid rgba(${i === 0 ? "100,210,255" : i === 1 ? "245,245,247" : "90,200,250"}, ${0.15 + i * 0.05})`,
                borderRadius: "50%",
                animation: `spin-slow ${8 + i * 4}s linear infinite ${i === 1 ? "reverse" : "normal"}`,
                transform: `rotateX(${60 + i * 20}deg) rotateY(${i * 30}deg)`,
              }} />
            ))}
            {/* Center dot */}
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              width: 6, height: 6, borderRadius: "50%",
              background: "var(--accent-primary)",
              transform: "translate(-50%, -50%)",
              boxShadow: "0 0 20px rgba(100, 210, 255, 0.4), 0 0 40px rgba(100, 210, 255, 0.1)",
            }} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col items-center gap-3 mt-10"
          >
            <h1 style={{
              fontSize: "1.1rem", fontWeight: 600, letterSpacing: "-0.02em",
              color: "var(--text-primary)",
            }}>
              Andres Lorente Martinez
            </h1>
            <span style={{
              fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.15em",
              textTransform: "uppercase", color: "var(--text-muted)",
            }}>
              Software Engineer
            </span>
          </motion.div>

          {/* Progress bar */}
          <div style={{
            width: 160, height: 1, borderRadius: 1, marginTop: 32,
            background: "rgba(255,255,255,0.06)", overflow: "hidden",
          }}>
            <motion.div
              style={{
                height: "100%", borderRadius: 1,
                background: "linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))",
                width: `${progress * 100}%`,
              }}
            />
          </div>
          <span style={{
            fontSize: "0.6rem", fontFamily: "var(--font-mono)", marginTop: 10,
            color: "var(--text-muted)",
          }}>
            {Math.round(progress * 100)}%
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
