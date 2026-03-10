"use client";
import { Suspense } from "react";
import ParticleField from "@/components/3d/ParticleField";

export default function PlaygroundScene() {
  return (
    <Suspense fallback={null}>
      <ambientLight intensity={0.03} />
      <pointLight position={[0, 0, 5]} intensity={0.2} color="#64d2ff" />
      <pointLight position={[-4, 3, 2]} intensity={0.1} color="#5ac8fa" />
      <fog attach="fog" args={["#000000", 5, 16]} />
      <ParticleField radius={7} />
    </Suspense>
  );
}
