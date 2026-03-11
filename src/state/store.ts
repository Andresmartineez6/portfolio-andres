import { create } from "zustand";
import { type SceneId, SCENE_CONFIGS } from "@/types/scenes";

interface AppState {
  currentScene: SceneId;
  previousScene: SceneId | null;
  isTransitioning: boolean;
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  cameraFov: number;
  hoveredObject: string | null;
  selectedObject: string | null;
  focusMode: boolean;
  overlayVisible: boolean;
  overlayContent: string | null;
  isLoading: boolean;
  loadingProgress: number;
  loaded: boolean;
  isMobile: boolean;
  cursorPosition: { x: number; y: number };
  setScene: (scene: SceneId) => void;
  setHoveredObject: (id: string | null) => void;
  setSelectedObject: (id: string | null) => void;
  focusObject: (id: string, position: [number, number, number], target: [number, number, number], fov?: number) => void;
  unfocusObject: () => void;
  setOverlay: (visible: boolean, content?: string | null) => void;
  setLoading: (loading: boolean) => void;
  setLoadingProgress: (progress: number) => void;
  setLoaded: (loaded: boolean) => void;
  setIsMobile: (mobile: boolean) => void;
  setCursorPosition: (x: number, y: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentScene: "room",
  previousScene: null,
  isTransitioning: false,
  cameraPosition: SCENE_CONFIGS.room.cameraPosition,
  cameraTarget: SCENE_CONFIGS.room.cameraTarget,
  cameraFov: SCENE_CONFIGS.room.cameraFov,
  hoveredObject: null,
  selectedObject: null,
  focusMode: false,
  overlayVisible: false,
  overlayContent: null,
  isLoading: true,
  loadingProgress: 0,
  loaded: false,
  isMobile: false,
  cursorPosition: { x: 0, y: 0 },
  setScene: (scene) => {
    const config = SCENE_CONFIGS[scene];
    set((s) => ({
      previousScene: s.currentScene,
      currentScene: scene,
      isTransitioning: true,
      cameraPosition: config.cameraPosition,
      cameraTarget: config.cameraTarget,
      cameraFov: config.cameraFov,
      hoveredObject: null,
      selectedObject: null,
      focusMode: false,
    }));
    setTimeout(() => set({ isTransitioning: false }), 1200);
  },
  setHoveredObject: (id) => set({ hoveredObject: id }),
  setSelectedObject: (id) => set({ selectedObject: id }),
  focusObject: (id, position, target, fov) => set({
    selectedObject: id,
    focusMode: true,
    cameraPosition: position,
    cameraTarget: target,
    cameraFov: fov ?? 40,
  }),
  unfocusObject: () => {
    const scene = useAppStore.getState().currentScene;
    const config = SCENE_CONFIGS[scene];
    set({
      selectedObject: null,
      focusMode: false,
      cameraPosition: config.cameraPosition,
      cameraTarget: config.cameraTarget,
      cameraFov: config.cameraFov,
    });
  },
  setOverlay: (visible, content = null) => set({ overlayVisible: visible, overlayContent: content }),
  setLoading: (loading) => set({ isLoading: loading }),
  setLoadingProgress: (progress) => set({ loadingProgress: progress }),
  setLoaded: (loaded) => set({ loaded }),
  setIsMobile: (mobile) => set({ isMobile: mobile }),
  setCursorPosition: (x, y) => set({ cursorPosition: { x, y } }),
}));
