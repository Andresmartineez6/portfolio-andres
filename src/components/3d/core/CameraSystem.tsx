"use client";
import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useAppStore } from "@/state/store";

export default function CameraSystem() {
  const controlsRef = useRef<React.ComponentRef<typeof OrbitControls>>(null);
  const { camera } = useThree();

  const targetPos = useAppStore((s) => s.cameraPosition);
  const targetLookAt = useAppStore((s) => s.cameraTarget);
  const targetFov = useAppStore((s) => s.cameraFov);
  const focusMode = useAppStore((s) => s.focusMode);

  const posVec = useRef(new THREE.Vector3(...targetPos));
  const lookVec = useRef(new THREE.Vector3(...targetLookAt));

  useFrame(() => {
    const speed = focusMode ? 0.045 : 0.03;
    const goalPos = new THREE.Vector3(...targetPos);
    const goalLook = new THREE.Vector3(...targetLookAt);

    posVec.current.lerp(goalPos, speed);
    lookVec.current.lerp(goalLook, speed);

    camera.position.copy(posVec.current);

    if (controlsRef.current) {
      controlsRef.current.target.copy(lookVec.current);
      controlsRef.current.update();
    }

    const perspCam = camera as THREE.PerspectiveCamera;
    perspCam.fov += (targetFov - perspCam.fov) * speed;
    perspCam.updateProjectionMatrix();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={focusMode}
      minDistance={focusMode ? 0.3 : 1.5}
      maxDistance={focusMode ? 2.0 : 5.0}
      enableRotate={true}
      rotateSpeed={focusMode ? 0.2 : 0.35}
      maxPolarAngle={Math.PI * 0.7}
      minPolarAngle={Math.PI * 0.15}
      maxAzimuthAngle={focusMode ? Math.PI * 0.5 : Math.PI * 0.4}
      minAzimuthAngle={focusMode ? -Math.PI * 0.5 : -Math.PI * 0.15}
      makeDefault
    />
  );
}
