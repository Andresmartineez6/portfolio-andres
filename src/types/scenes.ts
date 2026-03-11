export type SceneId = "hero" | "room" | "project" | "lab";

export interface SceneConfig {
  id: SceneId;
  label: string;
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  cameraFov: number;
  fogColor: string;
  fogNear: number;
  fogFar: number;
}

export const SCENE_CONFIGS: Record<SceneId, SceneConfig> = {
  hero: {
    id: "hero",
    label: "Inicio",
    cameraPosition: [0, 2, 8],
    cameraTarget: [0, 0, 0],
    cameraFov: 50,
    fogColor: "#0a0a0a",
    fogNear: 10,
    fogFar: 50,
  },
  room: {
    id: "room",
    label: "Habitacion",
    cameraPosition: [2.8, 2.0, 2.5],
    cameraTarget: [0, 0.85, -0.5],
    cameraFov: 42,
    fogColor: "#0a0a0a",
    fogNear: 4,
    fogFar: 12,
  },
  project: {
    id: "project",
    label: "Proyectos",
    cameraPosition: [0, 1.5, 2],
    cameraTarget: [0, 1.2, 0],
    cameraFov: 40,
    fogColor: "#0a0a0a",
    fogNear: 5,
    fogFar: 20,
  },
  lab: {
    id: "lab",
    label: "Laboratorio",
    cameraPosition: [0, 2, 6],
    cameraTarget: [0, 0, 0],
    cameraFov: 55,
    fogColor: "#050510",
    fogNear: 8,
    fogFar: 40,
  },
};
