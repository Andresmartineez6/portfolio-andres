"use client";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { Suspense, lazy } from "react";
import { useAppStore } from "@/state/store";

const HeroScene = lazy(() => import("@/components/3d/scenes/HeroScene"));
const PlaygroundScene = lazy(() => import("@/components/3d/scenes/PlaygroundScene"));

export default function SceneCanvas() {
  const activeSection = useAppStore((s) => s.activeSection);
  const isMobile = useAppStore((s) => s.isMobile);

  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5)}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "#000000" }}
      >
        <Suspense fallback={null}>
          {activeSection !== "playground" && <HeroScene />}
          {activeSection === "playground" && <PlaygroundScene />}
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
}
