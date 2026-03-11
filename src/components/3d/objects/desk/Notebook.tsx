"use client";
import * as THREE from "three";
import Selectable from "@/components/3d/interaction/Selectable";
import { INTERACTIVE_OBJECTS } from "@/types/objects";

const coverMat = new THREE.MeshStandardMaterial({ color: "#1a1410", roughness: 0.85, metalness: 0.0 });
const pagesMat = new THREE.MeshStandardMaterial({ color: "#d8d0c4", roughness: 0.95, metalness: 0.0 });

export default function Notebook() {
  return (
    <Selectable config={INTERACTIVE_OBJECTS.notebook}>
      {({ hovered, selected }) => (
        <group name="notebook" position={[-0.6, 0.76, -0.9]} rotation={[0, 0.2, 0]}>
          <mesh position={[0, 0.012, 0]} castShadow material={coverMat}>
            <boxGeometry args={[0.15, 0.018, 0.21]} />
          </mesh>
          <mesh position={[0, 0.005, 0]} material={pagesMat}>
            <boxGeometry args={[0.14, 0.008, 0.2]} />
          </mesh>
          <mesh position={[0.075, 0.013, 0]}>
            <boxGeometry args={[0.003, 0.02, 0.21]} />
            <meshStandardMaterial color="#cc4444" roughness={0.7} />
          </mesh>
          <mesh position={[0.09, 0.025, 0]} rotation={[0, 0, 0.05]}>
            <boxGeometry args={[0.005, 0.005, 0.14]} />
            <meshStandardMaterial color="#222222" roughness={0.3} metalness={0.6} />
          </mesh>
          {(hovered || selected) && (
            <pointLight position={[0, 0.15, 0]} intensity={selected ? 0.2 : 0.08} color="#ffaa44" distance={0.5} decay={2} />
          )}
        </group>
      )}
    </Selectable>
  );
}
