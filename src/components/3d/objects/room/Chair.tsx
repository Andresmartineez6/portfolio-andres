"use client";
import * as THREE from "three";

const frameMat = new THREE.MeshStandardMaterial({ color: "#0e0e0e", roughness: 0.3, metalness: 0.7 });
const seatMat = new THREE.MeshStandardMaterial({ color: "#141414", roughness: 0.85, metalness: 0.0 });
const accentMat = new THREE.MeshStandardMaterial({ color: "#0a0a0a", emissive: "#223355", emissiveIntensity: 0.08, roughness: 0.5, metalness: 0.3 });

export default function Chair() {
  return (
    <group name="chair" position={[0, 0, -0.45]}>
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i / 5) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.sin(angle) * 0.22, 0.03, Math.cos(angle) * 0.22]} rotation={[0, angle, 0]} material={frameMat}>
            <boxGeometry args={[0.03, 0.02, 0.22]} />
          </mesh>
        );
      })}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i / 5) * Math.PI * 2;
        return (
          <mesh key={`c-${i}`} position={[Math.sin(angle) * 0.28, 0.015, Math.cos(angle) * 0.28]} material={frameMat}>
            <sphereGeometry args={[0.015, 6, 6]} />
          </mesh>
        );
      })}
      <mesh position={[0, 0.18, 0]} material={frameMat}><cylinderGeometry args={[0.025, 0.03, 0.3, 8]} /></mesh>
      <mesh position={[0, 0.28, 0]} material={frameMat}><cylinderGeometry args={[0.02, 0.02, 0.1, 8]} /></mesh>
      <mesh position={[0, 0.35, 0]} material={frameMat}><boxGeometry args={[0.2, 0.015, 0.2]} /></mesh>
      <mesh position={[0, 0.39, 0.01]} castShadow material={seatMat}><boxGeometry args={[0.42, 0.06, 0.42]} /></mesh>
      <mesh position={[0, 0.65, -0.2]} rotation={[0.08, 0, 0]} castShadow material={seatMat}><boxGeometry args={[0.40, 0.48, 0.05]} /></mesh>
      <mesh position={[0, 0.92, -0.22]} rotation={[0.1, 0, 0]} material={seatMat}><boxGeometry args={[0.25, 0.12, 0.04]} /></mesh>
      <group position={[-0.22, 0.48, 0.02]}>
        <mesh material={frameMat}><boxGeometry args={[0.03, 0.18, 0.03]} /></mesh>
        <mesh position={[0, 0.09, 0.04]} material={accentMat}><boxGeometry args={[0.05, 0.02, 0.12]} /></mesh>
      </group>
      <group position={[0.22, 0.48, 0.02]}>
        <mesh material={frameMat}><boxGeometry args={[0.03, 0.18, 0.03]} /></mesh>
        <mesh position={[0, 0.09, 0.04]} material={accentMat}><boxGeometry args={[0.05, 0.02, 0.12]} /></mesh>
      </group>
      <mesh position={[-0.19, 0.65, -0.175]} rotation={[0.08, 0, 0]} material={accentMat}><boxGeometry args={[0.01, 0.4, 0.005]} /></mesh>
      <mesh position={[0.19, 0.65, -0.175]} rotation={[0.08, 0, 0]} material={accentMat}><boxGeometry args={[0.01, 0.4, 0.005]} /></mesh>
    </group>
  );
}
