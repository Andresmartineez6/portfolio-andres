"use client";
import { Suspense } from "react";
import HeroMesh from "@/components/3d/HeroMesh";
import ParticleField from "@/components/3d/ParticleField";

export default function HeroScene() {
  return (
    <Suspense fallback={null}>
      <ambientLight intensity={0.05} />
      <directionalLight position={[5, 5, 5]} intensity={0.15} color="#64d2ff" />
      <pointLight position={[-3, -3, 2]} intensity={0.08} color="#5ac8fa" />
      <pointLight position={[3, 2, -3]} intensity={0.05} color="#ffffff" />
      <fog attach="fog" args={["#000000", 6, 18]} />
      <HeroMesh />
      <ParticleField count={1200} radius={10} />
    </Suspense>
  );
}
