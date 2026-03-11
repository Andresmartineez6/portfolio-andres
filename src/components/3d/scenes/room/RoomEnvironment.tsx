"use client";
import * as THREE from "three";

const wallMaterial = new THREE.MeshStandardMaterial({ color: "#1a1a1f", roughness: 0.92, metalness: 0.0 });
const floorMaterial = new THREE.MeshStandardMaterial({ color: "#12100e", roughness: 0.85, metalness: 0.05 });
const ceilingMaterial = new THREE.MeshStandardMaterial({ color: "#111115", roughness: 0.95, metalness: 0.0 });
const trimMaterial = new THREE.MeshStandardMaterial({ color: "#0d0d10", roughness: 0.7, metalness: 0.1 });

const ROOM = { width: 5.0, depth: 4.0, height: 2.8, wallThickness: 0.08 };

export default function RoomEnvironment() {
  const hw = ROOM.width / 2;
  const hd = ROOM.depth / 2;
  const h = ROOM.height;
  const t = ROOM.wallThickness;

  return (
    <group name="room-environment">
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow material={floorMaterial}>
        <planeGeometry args={[ROOM.width, ROOM.depth]} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, h, 0]} material={ceilingMaterial}>
        <planeGeometry args={[ROOM.width, ROOM.depth]} />
      </mesh>
      <mesh position={[0, h / 2, -hd]} receiveShadow material={wallMaterial}>
        <boxGeometry args={[ROOM.width, h, t]} />
      </mesh>
      <mesh position={[-hw, h / 2, 0]} receiveShadow material={wallMaterial}>
        <boxGeometry args={[t, h, ROOM.depth]} />
      </mesh>
      <mesh position={[hw, h / 2, 0]} receiveShadow material={wallMaterial}>
        <boxGeometry args={[t, h, ROOM.depth]} />
      </mesh>
      <mesh position={[0, 0.04, -hd + t / 2 + 0.01]} material={trimMaterial}>
        <boxGeometry args={[ROOM.width - t * 2, 0.08, 0.02]} />
      </mesh>
      <mesh position={[-hw + t / 2 + 0.01, 0.04, 0]} material={trimMaterial}>
        <boxGeometry args={[0.02, 0.08, ROOM.depth]} />
      </mesh>
      <mesh position={[hw - t / 2 - 0.01, 0.04, 0]} material={trimMaterial}>
        <boxGeometry args={[0.02, 0.08, ROOM.depth]} />
      </mesh>
    </group>
  );
}
