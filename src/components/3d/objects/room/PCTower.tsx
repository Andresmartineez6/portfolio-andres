"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const caseMat = new THREE.MeshStandardMaterial({ color: "#0e0e0e", roughness: 0.3, metalness: 0.7 });
const glassMat = new THREE.MeshStandardMaterial({ color: "#0a0a14", roughness: 0.1, metalness: 0.3, transparent: true, opacity: 0.4 });
const ventMat = new THREE.MeshStandardMaterial({ color: "#080808", roughness: 0.5, metalness: 0.6 });

export default function PCTower() {
  const rgbRef = useRef<THREE.PointLight>(null);
  useFrame((state) => {
    if (rgbRef.current) {
      const hue = (state.clock.elapsedTime * 0.05) % 1;
      rgbRef.current.color.setHSL(hue, 0.7, 0.5);
    }
  });
  return (
    <group name="pc-tower" position={[1.05, 0, -1.35]}>
      <mesh position={[0, 0.24, 0]} castShadow material={caseMat}><boxGeometry args={[0.22, 0.48, 0.45]} /></mesh>
      <mesh position={[-0.112, 0.24, 0]} material={glassMat}><boxGeometry args={[0.003, 0.44, 0.41]} /></mesh>
      <mesh position={[0, 0.24, 0.226]}>
        <boxGeometry args={[0.22, 0.48, 0.003]} />
        <meshStandardMaterial color="#0c0c0c" roughness={0.4} metalness={0.6} />
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, 0.12 + i * 0.12, 0.228]} material={ventMat}><boxGeometry args={[0.14, 0.06, 0.002]} /></mesh>
      ))}
      <mesh position={[0.06, 0.46, 0.228]}>
        <cylinderGeometry args={[0.008, 0.008, 0.003, 8]} />
        <meshStandardMaterial color="#222222" emissive="#ffffff" emissiveIntensity={0.3} />
      </mesh>
      <pointLight ref={rgbRef} position={[-0.05, 0.2, 0]} intensity={0.15} color="#ff4488" distance={0.8} decay={2} />
      {[[-0.08, 0, 0.18], [0.08, 0, 0.18], [-0.08, 0, -0.18], [0.08, 0, -0.18]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} material={caseMat}><boxGeometry args={[0.03, 0.01, 0.03]} /></mesh>
      ))}
    </group>
  );
}
