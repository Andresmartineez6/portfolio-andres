"use client";
import { Suspense } from "react";
import { Environment } from "@react-three/drei";
import HeroMesh from "@/components/3d/HeroMesh";
import ParticleField from "@/components/3d/ParticleField";

export default function HeroScene() {
  return (
    <Suspense fallback={null}>
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 5, 5]} intensity={0.4} color="#7b6ff0" />
      <pointLight position={[-3, -3, 2]} intensity={0.3} color="#f07b6f" />
      <pointLight position={[3, 2, -3]} intensity={0.2} color="#6ff0c3" />
      <HeroMesh />
      <ParticleField count={5000} radius={6} />
      <Environment preset="night" environmentIntensity={0.1} />
    </Suspense>
  );
}
