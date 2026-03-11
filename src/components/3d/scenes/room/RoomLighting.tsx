"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function RoomLighting() {
  const monitorGlowRef = useRef<THREE.PointLight>(null);
  const rgbStripRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (monitorGlowRef.current) {
      monitorGlowRef.current.intensity = 0.6 + Math.sin(t * 0.5) * 0.05;
    }
    if (rgbStripRef.current) {
      const hue = (t * 0.02) % 1;
      rgbStripRef.current.color.setHSL(hue, 0.6, 0.5);
    }
  });

  return (
    <group name="room-lighting">
      <ambientLight intensity={0.03} color="#1a1a2e" />
      <pointLight position={[0, 2.6, 0]} intensity={0.15} color="#ffeedd" distance={6} decay={2} />
      <pointLight ref={monitorGlowRef} position={[-0.15, 1.2, -0.7]} intensity={0.6} color="#4488cc" distance={3} decay={2} castShadow shadow-mapSize-width={512} shadow-mapSize-height={512} shadow-bias={-0.001} />
      <pointLight position={[0.55, 1.2, -0.7]} intensity={0.25} color="#5599bb" distance={2.5} decay={2} />
      <pointLight ref={rgbStripRef} position={[0, 0.15, -0.8]} intensity={0.12} color="#6644aa" distance={2} decay={2} />
      <pointLight position={[0, 1.5, -1.8]} intensity={0.08} color="#4466ff" distance={2} decay={2} />
      <pointLight position={[1.1, 0.3, -1.3]} intensity={0.1} color="#ff4488" distance={1.5} decay={2} />
      <directionalLight position={[3, 2, 1]} intensity={0.06} color="#8899cc" />
      <pointLight position={[-2, 1.5, 1]} intensity={0.04} color="#334466" distance={4} decay={2} />
    </group>
  );
}
