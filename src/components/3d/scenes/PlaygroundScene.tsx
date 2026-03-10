"use client";
import { Suspense } from "react";
import ParticleField from "@/components/3d/ParticleField";
import BackgroundGradient from "@/components/3d/BackgroundGradient";

export default function PlaygroundScene() {
  return (
    <Suspense fallback={null}>
      <BackgroundGradient />
      <ambientLight intensity={0.02} />
      <pointLight position={[0, 0, 5]} intensity={0.15} color="#64d2ff" />
      <fog attach="fog" args={["#000000", 5, 18]} />
      <ParticleField radius={8} />
    </Suspense>
  );
}
