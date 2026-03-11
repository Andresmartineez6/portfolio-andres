"use client";
import * as THREE from "three";

const surfaceMat = new THREE.MeshStandardMaterial({ color: "#1c1916", roughness: 0.75, metalness: 0.05 });
const legMat = new THREE.MeshStandardMaterial({ color: "#111111", roughness: 0.4, metalness: 0.6 });
const frameMat = new THREE.MeshStandardMaterial({ color: "#0f0f0f", roughness: 0.35, metalness: 0.7 });

export default function Desk() {
  const W = 1.6, D = 0.7, T = 0.035, H = 0.74, legW = 0.04;
  return (
    <group name="desk" position={[0, 0, -1.1]}>
      <mesh position={[0, H, 0]} castShadow receiveShadow material={surfaceMat}>
        <boxGeometry args={[W, T, D]} />
      </mesh>
      <mesh position={[0, H - 0.06, D / 2 - 0.02]} material={frameMat}>
        <boxGeometry args={[W - 0.08, 0.03, 0.03]} />
      </mesh>
      <mesh position={[0, H - 0.06, -D / 2 + 0.02]} material={frameMat}>
        <boxGeometry args={[W - 0.08, 0.03, 0.03]} />
      </mesh>
      <mesh position={[-W / 2 + 0.05, H / 2, D / 2 - 0.05]} material={legMat}>
        <boxGeometry args={[legW, H, legW]} />
      </mesh>
      <mesh position={[-W / 2 + 0.05, H / 2, -D / 2 + 0.05]} material={legMat}>
        <boxGeometry args={[legW, H, legW]} />
      </mesh>
      <mesh position={[W / 2 - 0.05, H / 2, D / 2 - 0.05]} material={legMat}>
        <boxGeometry args={[legW, H, legW]} />
      </mesh>
      <mesh position={[W / 2 - 0.05, H / 2, -D / 2 + 0.05]} material={legMat}>
        <boxGeometry args={[legW, H, legW]} />
      </mesh>
      <mesh position={[-W / 2 + 0.05, H * 0.3, 0]} material={frameMat}>
        <boxGeometry args={[legW, 0.02, D - 0.12]} />
      </mesh>
      <mesh position={[W / 2 - 0.05, H * 0.3, 0]} material={frameMat}>
        <boxGeometry args={[legW, 0.02, D - 0.12]} />
      </mesh>
      <mesh position={[0, H - 0.12, -0.1]} material={frameMat}>
        <boxGeometry args={[0.5, 0.02, 0.15]} />
      </mesh>
      <mesh position={[0.05, H + T / 2 + 0.001, 0.08]} receiveShadow>
        <boxGeometry args={[0.7, 0.002, 0.3]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.9} metalness={0} />
      </mesh>
    </group>
  );
}
