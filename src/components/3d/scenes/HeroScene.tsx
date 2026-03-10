"use client";
import { Suspense } from "react";
import HeroMesh from "@/components/3d/HeroMesh";
import BackgroundGradient from "@/components/3d/BackgroundGradient";

export default function HeroScene() {
  return (
    <Suspense fallback={null}>
      <BackgroundGradient />
      <ambientLight intensity={0.03} />
      <directionalLight position={[5, 5, 5]} intensity={0.1} color="#64d2ff" />
      <pointLight position={[-3, 2, 3]} intensity={0.06} color="#5ac8fa" />
      <HeroMesh />
    </Suspense>
  );
}
