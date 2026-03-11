"use client";
import * as THREE from "three";
import Selectable from "@/components/3d/interaction/Selectable";
import { INTERACTIVE_OBJECTS } from "@/types/objects";

const bodyMat = new THREE.MeshStandardMaterial({ color: "#0e0e0e", roughness: 0.4, metalness: 0.6 });
const keyMat = new THREE.MeshStandardMaterial({ color: "#1a1a1a", roughness: 0.6, metalness: 0.3 });
const accentMat = new THREE.MeshStandardMaterial({ color: "#0a0a0a", emissive: "#334466", emissiveIntensity: 0.15, roughness: 0.5, metalness: 0.4 });

function KeyRow({ y, z, count, width }: { y: number; z: number; count: number; width: number }) {
  const keys = [];
  const keyW = (width - (count - 1) * 0.003) / count;
  const startX = -width / 2 + keyW / 2;
  for (let i = 0; i < count; i++) {
    keys.push(
      <mesh key={i} position={[startX + i * (keyW + 0.003), y, z]} material={keyMat}>
        <boxGeometry args={[keyW * 0.9, 0.005, 0.012]} />
      </mesh>
    );
  }
  return <>{keys}</>;
}

export default function Keyboard() {
  return (
    <Selectable config={INTERACTIVE_OBJECTS.keyboard}>
      {({ hovered, selected }) => (
        <group name="keyboard" position={[-0.1, 0.76, -0.72]}>
          <mesh position={[0, 0.008, 0]} castShadow material={bodyMat}>
            <boxGeometry args={[0.36, 0.016, 0.13]} />
          </mesh>
          <KeyRow y={0.019} z={-0.04} count={14} width={0.34} />
          <KeyRow y={0.019} z={-0.02} count={13} width={0.34} />
          <KeyRow y={0.019} z={0.0} count={12} width={0.32} />
          <KeyRow y={0.019} z={0.02} count={11} width={0.30} />
          <mesh position={[0, 0.019, 0.04]} material={accentMat}>
            <boxGeometry args={[0.14, 0.005, 0.013]} />
          </mesh>
          <pointLight position={[0, -0.01, 0]} intensity={hovered || selected ? 0.12 : 0.03} color="#4466cc" distance={0.4} decay={2} />
        </group>
      )}
    </Selectable>
  );
}
