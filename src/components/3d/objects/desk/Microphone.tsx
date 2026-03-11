"use client";
import * as THREE from "three";
import Selectable from "@/components/3d/interaction/Selectable";
import { INTERACTIVE_OBJECTS } from "@/types/objects";

const metalMat = new THREE.MeshStandardMaterial({ color: "#1a1a1a", roughness: 0.25, metalness: 0.85 });
const grilleMat = new THREE.MeshStandardMaterial({ color: "#222222", roughness: 0.4, metalness: 0.7 });

export default function Microphone() {
  return (
    <Selectable config={INTERACTIVE_OBJECTS.microphone}>
      {({ hovered, selected }) => (
        <group name="microphone" position={[-0.55, 0.76, -0.55]}>
          <mesh position={[0, 0.02, 0]} material={metalMat}>
            <boxGeometry args={[0.04, 0.04, 0.04]} />
          </mesh>
          <mesh position={[-0.08, 0.18, 0]} material={metalMat}>
            <cylinderGeometry args={[0.008, 0.008, 0.35, 8]} />
          </mesh>
          <mesh position={[-0.08, 0.35, 0]} material={metalMat}>
            <sphereGeometry args={[0.015, 8, 8]} />
          </mesh>
          <mesh position={[-0.04, 0.32, 0.05]} rotation={[0.3, 0, 0.5]} material={metalMat}>
            <cylinderGeometry args={[0.008, 0.008, 0.15, 8]} />
          </mesh>
          <group position={[-0.02, 0.28, 0.1]}>
            <mesh material={metalMat} castShadow>
              <cylinderGeometry args={[0.028, 0.032, 0.1, 12]} />
            </mesh>
            <mesh position={[0, 0.055, 0]} material={grilleMat}>
              <cylinderGeometry args={[0.03, 0.028, 0.03, 12]} />
            </mesh>
            <mesh position={[0, 0.075, 0]} material={metalMat}>
              <cylinderGeometry args={[0.015, 0.03, 0.01, 12]} />
            </mesh>
            <mesh position={[0.03, 0, 0]}>
              <sphereGeometry args={[0.004, 6, 6]} />
              <meshStandardMaterial color="#ff0000" emissive="#ff2222" emissiveIntensity={0.8} />
            </mesh>
            <mesh position={[0.035, 0, 0]} material={metalMat}>
              <boxGeometry args={[0.005, 0.12, 0.01]} />
            </mesh>
            <mesh position={[-0.035, 0, 0]} material={metalMat}>
              <boxGeometry args={[0.005, 0.12, 0.01]} />
            </mesh>
          </group>
          {(hovered || selected) && (
            <pointLight position={[-0.02, 0.35, 0.1]} intensity={selected ? 0.25 : 0.1} color="#ff4466" distance={0.6} decay={2} />
          )}
        </group>
      )}
    </Selectable>
  );
}
