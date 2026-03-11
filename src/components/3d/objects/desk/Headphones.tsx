"use client";
import * as THREE from "three";
import Selectable from "@/components/3d/interaction/Selectable";
import { INTERACTIVE_OBJECTS } from "@/types/objects";

const metalMat = new THREE.MeshStandardMaterial({ color: "#111111", roughness: 0.25, metalness: 0.8 });
const cushionMat = new THREE.MeshStandardMaterial({ color: "#1a1a1a", roughness: 0.9, metalness: 0.0 });
const accentMat = new THREE.MeshStandardMaterial({ color: "#0a0a0a", emissive: "#4466aa", emissiveIntensity: 0.15, roughness: 0.4, metalness: 0.5 });

export default function Headphones() {
  return (
    <Selectable config={INTERACTIVE_OBJECTS.headphones}>
      {({ hovered, selected }) => (
        <group name="headphones" position={[0.68, 0.76, -0.8]} rotation={[0.1, -0.3, 0.15]}>
          <group position={[-0.07, 0.06, 0]}>
            <mesh material={metalMat} castShadow><cylinderGeometry args={[0.04, 0.04, 0.025, 12]} /></mesh>
            <mesh position={[0.013, 0, 0]} material={cushionMat}><cylinderGeometry args={[0.035, 0.035, 0.01, 12]} /></mesh>
            <mesh position={[-0.015, 0, 0]} material={accentMat}><cylinderGeometry args={[0.025, 0.025, 0.003, 12]} /></mesh>
          </group>
          <group position={[0.07, 0.06, 0]}>
            <mesh material={metalMat} castShadow><cylinderGeometry args={[0.04, 0.04, 0.025, 12]} /></mesh>
            <mesh position={[-0.013, 0, 0]} material={cushionMat}><cylinderGeometry args={[0.035, 0.035, 0.01, 12]} /></mesh>
            <mesh position={[0.015, 0, 0]} material={accentMat}><cylinderGeometry args={[0.025, 0.025, 0.003, 12]} /></mesh>
          </group>
          <mesh position={[0, 0.1, 0]} material={metalMat}><boxGeometry args={[0.12, 0.008, 0.025]} /></mesh>
          <mesh position={[0, 0.098, 0]}><boxGeometry args={[0.06, 0.005, 0.02]} /><meshStandardMaterial color="#1a1a1a" roughness={0.9} /></mesh>
          <mesh position={[-0.065, 0.08, 0]} material={metalMat}><boxGeometry args={[0.006, 0.05, 0.012]} /></mesh>
          <mesh position={[0.065, 0.08, 0]} material={metalMat}><boxGeometry args={[0.006, 0.05, 0.012]} /></mesh>
          {(hovered || selected) && (
            <pointLight position={[0, 0.15, 0.05]} intensity={selected ? 0.2 : 0.08} color="#4488ff" distance={0.4} decay={2} />
          )}
        </group>
      )}
    </Selectable>
  );
}
