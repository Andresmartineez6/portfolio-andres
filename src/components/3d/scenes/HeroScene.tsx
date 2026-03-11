"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useAppStore } from "@/state/store";

function GridFloor() {
  return (
    <group>
      <gridHelper args={[40, 40, "#1a1a2e", "#0d0d15"]} position={[0, -0.01, 0]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.95} metalness={0} />
      </mesh>
    </group>
  );
}

function FloatingMarker() {
  const ref = useRef<THREE.Mesh>(null);
  const setScene = useAppStore((s) => s.setScene);
  const setHovered = useAppStore((s) => s.setHoveredObject);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = 1.2 + Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
    ref.current.rotation.y = state.clock.elapsedTime * 0.3;
  });

  return (
    <mesh
      ref={ref}
      position={[0, 1.2, 0]}
      castShadow
      onClick={() => setScene("room")}
      onPointerEnter={() => { setHovered("enter-marker"); document.body.style.cursor = "pointer"; }}
      onPointerLeave={() => { setHovered(null); document.body.style.cursor = "default"; }}
    >
      <octahedronGeometry args={[0.4, 0]} />
      <meshStandardMaterial color="#1a1a2e" emissive="#64d2ff" emissiveIntensity={0.15} roughness={0.3} metalness={0.8} />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <group>
      <fog attach="fog" args={["#0a0a0a", 10, 50]} />
      <ambientLight intensity={0.08} />
      <directionalLight position={[5, 8, 5]} intensity={0.4} color="#e8e8ff" castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} shadow-camera-near={0.5} shadow-camera-far={30} />
      <pointLight position={[-3, 3, -2]} intensity={0.15} color="#64d2ff" />
      <pointLight position={[3, 2, 3]} intensity={0.08} color="#ffd60a" />
      <GridFloor />
      <FloatingMarker />
    </group>
  );
}
