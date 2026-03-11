"use client";
import * as THREE from "three";

const mouseMat = new THREE.MeshStandardMaterial({ color: "#111111", roughness: 0.3, metalness: 0.7 });

export default function MousePad() {
  return (
    <group name="mouse" position={[0.22, 0.765, -0.72]}>
      <mesh castShadow material={mouseMat}>
        <boxGeometry args={[0.055, 0.025, 0.095]} />
      </mesh>
      <mesh position={[0, 0.013, -0.015]}>
        <boxGeometry args={[0.008, 0.004, 0.02]} />
        <meshStandardMaterial color="#222222" roughness={0.5} metalness={0.5} />
      </mesh>
      <mesh position={[0, 0.005, 0]}>
        <boxGeometry args={[0.058, 0.002, 0.06]} />
        <meshStandardMaterial color="#000000" emissive="#4466cc" emissiveIntensity={0.2} transparent opacity={0.6} />
      </mesh>
    </group>
  );
}
