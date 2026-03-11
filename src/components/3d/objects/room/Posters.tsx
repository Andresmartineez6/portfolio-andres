"use client";
import * as THREE from "three";

const frameMat = new THREE.MeshStandardMaterial({ color: "#0e0e0e", roughness: 0.3, metalness: 0.6 });

interface PosterProps {
  position: [number, number, number];
  size: [number, number];
  color: string;
  emissive?: string;
  emissiveIntensity?: number;
}

function Poster({ position, size, color, emissive, emissiveIntensity = 0 }: PosterProps) {
  return (
    <group position={position}>
      <mesh material={frameMat}><boxGeometry args={[size[0] + 0.02, size[1] + 0.02, 0.015]} /></mesh>
      <mesh position={[0, 0, 0.008]}>
        <boxGeometry args={[size[0], size[1], 0.002]} />
        <meshStandardMaterial color={color} emissive={emissive || color} emissiveIntensity={emissiveIntensity} roughness={0.9} metalness={0} />
      </mesh>
    </group>
  );
}

export default function Posters() {
  return (
    <group name="posters">
      <Poster position={[-0.5, 2.0, -1.92]} size={[0.35, 0.5]} color="#0a1225" emissive="#112244" emissiveIntensity={0.05} />
      <Poster position={[0.25, 2.1, -1.92]} size={[0.25, 0.35]} color="#1a0a15" emissive="#331122" emissiveIntensity={0.04} />
      <Poster position={[0.65, 2.05, -1.92]} size={[0.18, 0.24]} color="#0a1a0f" emissive="#113322" emissiveIntensity={0.03} />
    </group>
  );
}
