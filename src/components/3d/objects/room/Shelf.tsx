"use client";
import * as THREE from "three";

const woodMat = new THREE.MeshStandardMaterial({ color: "#1a1612", roughness: 0.8, metalness: 0.05 });
const bracketMat = new THREE.MeshStandardMaterial({ color: "#111111", roughness: 0.3, metalness: 0.7 });
const bookColors = ["#2a1520", "#15202a", "#1a2515", "#25201a", "#1a1528"];

export default function Shelf() {
  return (
    <group name="shelf" position={[-2.35, 1.4, -0.3]}>
      {[0, 0.35, 0.7].map((y, i) => (
        <group key={i}>
          <mesh position={[0, y, 0]} castShadow material={woodMat}><boxGeometry args={[0.5, 0.02, 0.2]} /></mesh>
          <mesh position={[-0.2, y - 0.06, -0.08]} material={bracketMat}><boxGeometry args={[0.015, 0.1, 0.015]} /></mesh>
          <mesh position={[0.2, y - 0.06, -0.08]} material={bracketMat}><boxGeometry args={[0.015, 0.1, 0.015]} /></mesh>
        </group>
      ))}
      {bookColors.map((color, i) => (
        <mesh key={`b-${i}`} position={[-0.18 + i * 0.07, 0.07, 0]} castShadow>
          <boxGeometry args={[0.04, 0.12, 0.14]} />
          <meshStandardMaterial color={color} roughness={0.85} metalness={0} />
        </mesh>
      ))}
      <mesh position={[0.1, 0.4, 0]}><cylinderGeometry args={[0.015, 0.02, 0.06, 8]} /><meshStandardMaterial color="#888888" roughness={0.3} metalness={0.7} /></mesh>
      <mesh position={[0.1, 0.45, 0]}><sphereGeometry args={[0.02, 8, 8]} /><meshStandardMaterial color="#888888" roughness={0.3} metalness={0.7} /></mesh>
      <mesh position={[-0.12, 0.38, 0.02]}><cylinderGeometry args={[0.03, 0.025, 0.04, 8]} /><meshStandardMaterial color="#1a1a1a" roughness={0.7} metalness={0.3} /></mesh>
      <mesh position={[-0.12, 0.43, 0.02]}><sphereGeometry args={[0.04, 6, 6]} /><meshStandardMaterial color="#1a3a1a" roughness={0.9} metalness={0} /></mesh>
      <mesh position={[0, 0.76, 0.02]} rotation={[0.1, 0, 0]}><boxGeometry args={[0.12, 0.09, 0.008]} /><meshStandardMaterial color="#111111" roughness={0.3} metalness={0.6} /></mesh>
      <mesh position={[0, 0.76, 0.025]} rotation={[0.1, 0, 0]}><boxGeometry args={[0.1, 0.07, 0.002]} /><meshStandardMaterial color="#1a2030" roughness={0.9} metalness={0} /></mesh>
    </group>
  );
}
