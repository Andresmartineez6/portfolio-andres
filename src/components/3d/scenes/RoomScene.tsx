"use client";
import { useAppStore } from "@/state/store";

function PlaceholderRoom() {
  const setScene = useAppStore((s) => s.setScene);
  const setHovered = useAppStore((s) => s.setHoveredObject);

  return (
    <group>
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow
        onClick={() => setScene("hero")}
        onPointerEnter={() => { setHovered("room-back"); document.body.style.cursor = "pointer"; }}
        onPointerLeave={() => { setHovered(null); document.body.style.cursor = "default"; }}
      >
        <boxGeometry args={[1.5, 1, 2.5]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.6} metalness={0.4} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.95} />
      </mesh>
      <gridHelper args={[20, 20, "#1a1a2e", "#0d0d15"]} position={[0, -0.005, 0]} />
    </group>
  );
}

export default function RoomScene() {
  return (
    <group>
      <fog attach="fog" args={["#0a0a0a", 8, 30]} />
      <ambientLight intensity={0.06} />
      <directionalLight position={[3, 6, 4]} intensity={0.35} color="#e8e8ff" castShadow />
      <pointLight position={[0, 2, 0]} intensity={0.2} color="#64d2ff" />
      <PlaceholderRoom />
    </group>
  );
}
