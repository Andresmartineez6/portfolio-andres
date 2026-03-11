"use client";
import { type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";

interface HoloPanelProps {
  visible: boolean;
  children: ReactNode;
  onClose?: () => void;
  position?: "center" | "left" | "right";
  width?: string;
}

export default function HoloPanel({ visible, children, onClose, position = "center", width = "420px" }: HoloPanelProps) {
  const align =
    position === "left" ? { left: "5%" } :
    position === "right" ? { right: "5%" } :
    { left: "50%", transform: "translateX(-50%)" };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="holo-panel"
          style={{
            position: "fixed",
            top: "50%",
            transform: position === "center" ? "translate(-50%, -50%)" : "translateY(-50%)",
            zIndex: 50,
            width,
            maxWidth: "90vw",
            maxHeight: "75vh",
            pointerEvents: "auto",
            ...align,
          }}
        >
          <div className="holo-panel-inner">
            {onClose && (
              <button onClick={onClose} className="holo-close" aria-label="Cerrar">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            )}
            <div className="holo-content">
              {children}
            </div>
          </div>
          <div className="holo-scanline" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
