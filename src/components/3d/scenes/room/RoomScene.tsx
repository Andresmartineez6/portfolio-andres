"use client";
import { useAppStore } from "@/state/store";
import RoomEnvironment from "@/components/3d/scenes/room/RoomEnvironment";
import RoomLighting from "@/components/3d/scenes/room/RoomLighting";
import DeskSetup from "@/components/3d/objects/desk/DeskSetup";
import Chair from "@/components/3d/objects/room/Chair";
import PCTower from "@/components/3d/objects/room/PCTower";
import Shelf from "@/components/3d/objects/room/Shelf";
import Posters from "@/components/3d/objects/room/Posters";

export default function RoomScene() {
  const handleBackgroundClick = () => {
    const state = useAppStore.getState();
    if (state.selectedObject) {
      state.unfocusObject();
    }
  };

  return (
    <group name="room-scene" onClick={handleBackgroundClick}>
      <fog attach="fog" args={["#0a0a0a", 4, 12]} />

      <RoomLighting />
      <RoomEnvironment />
      <DeskSetup />
      <Chair />
      <PCTower />
      <Shelf />
      <Posters />

      {/* LED strip under desk edge */}
      <mesh position={[0, 0.72, -0.73]}>
        <boxGeometry args={[1.4, 0.005, 0.005]} />
        <meshStandardMaterial color="#000000" emissive="#4466cc" emissiveIntensity={0.5} toneMapped={false} />
      </mesh>

      {/* LED strip behind monitors on wall */}
      <mesh position={[0.1, 1.5, -1.95]}>
        <boxGeometry args={[0.9, 0.005, 0.005]} />
        <meshStandardMaterial color="#000000" emissive="#3344aa" emissiveIntensity={0.4} toneMapped={false} />
      </mesh>

      {/* Avatar placeholder - subtle silhouette in chair */}
      <group name="avatar-placeholder" position={[0, 0.42, -0.4]}>
        <mesh>
          <boxGeometry args={[0.3, 0.35, 0.15]} />
          <meshStandardMaterial color="#0e0e10" roughness={0.9} metalness={0} transparent opacity={0.3} />
        </mesh>
        <mesh position={[0, 0.28, 0]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial color="#0e0e10" roughness={0.9} metalness={0} transparent opacity={0.25} />
        </mesh>
      </group>
    </group>
  );
}
