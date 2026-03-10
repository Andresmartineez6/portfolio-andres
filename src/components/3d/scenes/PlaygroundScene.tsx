"use client";
import { Suspense } from "react";
import { Environment } from "@react-three/drei";
import ParticleField from "@/components/3d/ParticleField";

export default function PlaygroundScene() {
  return (
    <Suspense fallback={null}>
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 0, 5]} intensity={0.5} color="#7b6ff0" />
      <pointLight position={[-4, 3, 2]} intensity={0.3} color="#f07b6f" />
      <pointLight position={[4, -2, 3]} intensity={0.3} color="#6ff0c3" />
      <ParticleField radius={5} />
      <Environment preset="night" environmentIntensity={0.05} />
    </Suspense>
  );
}
