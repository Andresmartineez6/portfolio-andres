"use client";
import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useAppStore } from "@/state/store";

const lerpFactor = 0.035;

export default function CameraSystem() {
  const controlsRef = useRef<React.ComponentRef<typeof OrbitControls>>(null);
  const { camera } = useThree();

  const targetPos = useAppStore((s) => s.cameraPosition);
  const targetLookAt = useAppStore((s) => s.cameraTarget);
  const targetFov = useAppStore((s) => s.cameraFov);

  const posVec = useRef(new THREE.Vector3(...targetPos));
  const lookVec = useRef(new THREE.Vector3(...targetLookAt));

  useFrame(() => {
    const goalPos = new THREE.Vector3(...targetPos);
    const goalLook = new THREE.Vector3(...targetLookAt);

    posVec.current.lerp(goalPos, lerpFactor);
    lookVec.current.lerp(goalLook, lerpFactor);

    camera.position.copy(posVec.current);

    if (controlsRef.current) {
      controlsRef.current.target.copy(lookVec.current);
      controlsRef.current.update();
    }

    const perspCam = camera as THREE.PerspectiveCamera;
    perspCam.fov += (targetFov - perspCam.fov) * lerpFactor;
    perspCam.updateProjectionMatrix();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={false}
      enableRotate={true}
      rotateSpeed={0.3}
      maxPolarAngle={Math.PI * 0.65}
      minPolarAngle={Math.PI * 0.2}
      maxAzimuthAngle={Math.PI * 0.3}
      minAzimuthAngle={-Math.PI * 0.3}
      makeDefault
    />
  );
}
