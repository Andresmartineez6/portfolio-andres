"use client";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { Suspense } from "react";
import { useAppStore } from "@/state/store";
import CameraSystem from "@/components/3d/core/CameraSystem";
import SceneManager from "@/components/3d/core/SceneManager";

export default function CanvasRoot() {
  const isMobile = useAppStore((s) => s.isMobile);

  return (
    <Canvas
      camera={{ position: [0, 2, 8], fov: 50, near: 0.1, far: 100 }}
      dpr={isMobile ? 1 : Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 1.5)}
      gl={{
        antialias: !isMobile,
        alpha: false,
        powerPreference: "high-performance",
        stencil: false,
      }}
      shadows
      style={{ position: "fixed", inset: 0, zIndex: 0, background: "#0a0a0a" }}
    >
      <CameraSystem />
      <Suspense fallback={null}>
        <SceneManager />
      </Suspense>
      <EffectComposer enabled={!isMobile} multisampling={0}>
        <Bloom intensity={0.3} luminanceThreshold={0.6} luminanceSmoothing={0.9} mipmapBlur />
        <Vignette darkness={0.4} offset={0.3} />
      </EffectComposer>
      <Preload all />
    </Canvas>
  );
}
