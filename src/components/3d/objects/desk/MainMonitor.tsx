"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Selectable from "@/components/3d/interaction/Selectable";
import { INTERACTIVE_OBJECTS } from "@/types/objects";

const bezelMat = new THREE.MeshStandardMaterial({ color: "#0a0a0a", roughness: 0.3, metalness: 0.8 });
const standMat = new THREE.MeshStandardMaterial({ color: "#111111", roughness: 0.35, metalness: 0.7 });

export default function MainMonitor() {
  const screenRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (screenRef.current) {
      const mat = screenRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.8 + Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });
  const SW = 0.58, SH = 0.34, bezel = 0.015, y = 1.08;
  return (
    <Selectable config={INTERACTIVE_OBJECTS["main-monitor"]}>
      {({ hovered, selected }) => (
        <group name="main-monitor" position={[-0.15, 0, -1.1]}>
          <mesh ref={screenRef} position={[0, y + SH / 2, 0]}>
            <boxGeometry args={[SW, SH, 0.01]} />
            <meshStandardMaterial color="#0a1628" emissive="#2266aa" emissiveIntensity={0.8} roughness={0.1} metalness={0.0} />
          </mesh>
          <mesh position={[0, y + SH + bezel / 2, 0]} material={bezelMat}><boxGeometry args={[SW + bezel * 2, bezel, 0.025]} /></mesh>
          <mesh position={[0, y - bezel / 2, 0]} material={bezelMat}><boxGeometry args={[SW + bezel * 2, bezel, 0.025]} /></mesh>
          <mesh position={[-SW / 2 - bezel / 2, y + SH / 2, 0]} material={bezelMat}><boxGeometry args={[bezel, SH + bezel * 2, 0.025]} /></mesh>
          <mesh position={[SW / 2 + bezel / 2, y + SH / 2, 0]} material={bezelMat}><boxGeometry args={[bezel, SH + bezel * 2, 0.025]} /></mesh>
          <mesh position={[0, y - 0.08, 0.05]} material={standMat}><boxGeometry args={[0.04, 0.16, 0.04]} /></mesh>
          <mesh position={[0, 0.76, 0.08]} material={standMat}><boxGeometry args={[0.2, 0.01, 0.12]} /></mesh>
          <mesh position={[0, y + SH + bezel + 0.015, 0.005]} castShadow>
            <boxGeometry args={[0.04, 0.025, 0.025]} />
            <meshStandardMaterial color="#0a0a0a" roughness={0.3} metalness={0.6} />
          </mesh>
          {(hovered || selected) && (
            <pointLight position={[0, y + SH / 2, 0.2]} intensity={selected ? 0.4 : 0.15} color="#4488ff" distance={1} decay={2} />
          )}
        </group>
      )}
    </Selectable>
  );
}
