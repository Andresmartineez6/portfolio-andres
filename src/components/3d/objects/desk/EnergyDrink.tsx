"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Selectable from "@/components/3d/interaction/Selectable";
import { INTERACTIVE_OBJECTS } from "@/types/objects";

export default function EnergyDrink() {
  const glowRef = useRef<THREE.PointLight>(null);
  useFrame((state) => {
    if (glowRef.current) {
      glowRef.current.intensity = 0.05 + Math.sin(state.clock.elapsedTime * 2) * 0.02;
    }
  });
  return (
    <Selectable config={INTERACTIVE_OBJECTS["energy-drink"]}>
      {({ hovered, selected }) => (
        <group name="energy-drink" position={[0.4, 0.76, -0.55]}>
          <mesh position={[0, 0.055, 0]} castShadow>
            <cylinderGeometry args={[0.028, 0.028, 0.11, 16]} />
            <meshStandardMaterial color="#0a0a12" roughness={0.2} metalness={0.9} />
          </mesh>
          <mesh position={[0, 0.112, 0]}>
            <cylinderGeometry args={[0.025, 0.028, 0.005, 16]} />
            <meshStandardMaterial color="#cccccc" roughness={0.15} metalness={0.95} />
          </mesh>
          <mesh position={[0, 0.115, 0]}>
            <cylinderGeometry args={[0.024, 0.024, 0.002, 16]} />
            <meshStandardMaterial color="#aaaaaa" roughness={0.2} metalness={0.9} />
          </mesh>
          <mesh position={[0.005, 0.117, 0]} rotation={[0, 0.3, 0]}>
            <boxGeometry args={[0.015, 0.001, 0.006]} />
            <meshStandardMaterial color="#cccccc" roughness={0.15} metalness={0.95} />
          </mesh>
          <mesh position={[0, 0.05, 0.029]}>
            <boxGeometry args={[0.03, 0.04, 0.001]} />
            <meshStandardMaterial color="#000000" emissive="#22ff66" emissiveIntensity={0.3} />
          </mesh>
          <pointLight ref={glowRef} position={[0, 0.06, 0.04]} intensity={0.05} color="#22ff66" distance={0.3} decay={2} />
          {(hovered || selected) && (
            <pointLight position={[0, 0.15, 0.05]} intensity={selected ? 0.25 : 0.1} color="#22ff66" distance={0.5} decay={2} />
          )}
        </group>
      )}
    </Selectable>
  );
}
