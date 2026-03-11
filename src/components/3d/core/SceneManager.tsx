"use client";
import { Suspense, lazy, useMemo } from "react";
import { useAppStore } from "@/state/store";
import type { SceneId } from "@/types/scenes";

const sceneComponents: Record<SceneId, React.LazyExoticComponent<React.ComponentType>> = {
  hero: lazy(() => import("@/components/3d/scenes/HeroScene")),
  room: lazy(() => import("@/components/3d/scenes/RoomScene")),
  project: lazy(() => import("@/components/3d/scenes/ProjectScene")),
  lab: lazy(() => import("@/components/3d/scenes/LabScene")),
};

export default function SceneManager() {
  const currentScene = useAppStore((s) => s.currentScene);
  const SceneComponent = useMemo(() => sceneComponents[currentScene], [currentScene]);

  return (
    <Suspense fallback={null}>
      <SceneComponent />
    </Suspense>
  );
}
