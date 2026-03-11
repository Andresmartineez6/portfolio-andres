"use client";

export default function LabScene() {
  return (
    <group>
      <fog attach="fog" args={["#050510", 8, 40]} />
      <ambientLight intensity={0.05} />
      <pointLight position={[0, 4, 0]} intensity={0.3} color="#64d2ff" />
      <mesh position={[0, 1, 0]}>
        <icosahedronGeometry args={[0.6, 1]} />
        <meshStandardMaterial color="#0d0d15" emissive="#ffd60a" emissiveIntensity={0.08} wireframe />
      </mesh>
      <gridHelper args={[30, 30, "#1a1a2e", "#0d0d15"]} />
    </group>
  );
}
