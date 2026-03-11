"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Selectable from "@/components/3d/interaction/Selectable";
import { INTERACTIVE_OBJECTS } from "@/types/objects";

const bezelMat = new THREE.MeshStandardMaterial({ color: "#0a0a0a", roughness: 0.3, metalness: 0.8 });
const standMat = new THREE.MeshStandardMaterial({ color: "#111111", roughness: 0.35, metalness: 0.7 });

export default function SideMonitor() {
  const screenRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (screenRef.current) {
      const mat = screenRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.6 + Math.sin(state.clock.elapsedTime * 0.4 + 1) * 0.04;
    }
  });
  const SW = 0.22, SH = 0.38, bezel = 0.012, y = 1.0;
  return (
    <Selectable config={INTERACTIVE_OBJECTS["side-monitor"]}>
      {({ hovered, selected }) => (
        <group name="side-monitor" position={[0.55, 0, -1.1]} rotation={[0, -0.15, 0]}>
          <mesh ref={screenRef} position={[0, y + SH / 2, 0]}>
            <boxGeometry args={[SW, SH, 0.01]} />
            <meshStandardMaterial color="#0a1420" emissive="#228866" emissiveIntensity={0.6} roughness={0.1} metalness={0.0} />
          </mesh>
          <mesh position={[0, y + SH + bezel / 2, 0]} material={bezelMat}><boxGeometry args={[SW + bezel * 2, bezel, 0.02]} /></mesh>
          <mesh position={[0, y - bezel / 2, 0]} material={bezelMat}><boxGeometry args={[SW + bezel * 2, bezel, 0.02]} /></mesh>
          <mesh position={[-SW / 2 - bezel / 2, y + SH / 2, 0]} material={bezelMat}><boxGeometry args={[bezel, SH + bezel * 2, 0.02]} /></mesh>
          <mesh position={[SW / 2 + bezel / 2, y + SH / 2, 0]} material={bezelMat}><boxGeometry args={[bezel, SH + bezel * 2, 0.02]} /></mesh>
          <mesh position={[0, y - 0.06, 0.04]} material={standMat}><boxGeometry args={[0.03, 0.12, 0.03]} /></mesh>
          <mesh position={[0, 0.76, 0.06]} material={standMat}><boxGeometry args={[0.14, 0.01, 0.1]} /></mesh>
          {(hovered || selected) && (
            <pointLight position={[0, y + SH / 2, 0.15]} intensity={selected ? 0.3 : 0.1} color="#44ff88" distance={0.8} decay={2} />
          )}
        </group>
      )}
    </Selectable>
  );
}
