"use client";

export default function ProjectScene() {
  return (
    <group>
      <fog attach="fog" args={["#0a0a0a", 5, 20]} />
      <ambientLight intensity={0.08} />
      <directionalLight position={[3, 5, 3]} intensity={0.3} color="#e8e8ff" />
      <mesh position={[0, 1, 0]}>
        <torusKnotGeometry args={[0.5, 0.15, 128, 32]} />
        <meshStandardMaterial color="#1a1a2e" emissive="#64d2ff" emissiveIntensity={0.1} wireframe />
      </mesh>
      <gridHelper args={[20, 20, "#1a1a2e", "#0d0d15"]} />
    </group>
  );
}
