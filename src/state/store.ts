import { create } from "zustand";

export type Section = "hero" | "about" | "projects" | "playground" | "contact";

export interface PlaygroundParams {
  particleCount: number;
  particleSize: number;
  noiseScale: number;
  noiseSpeed: number;
  colorA: string;
  colorB: string;
  distortion: number;
  bloomIntensity: number;
}

interface AppState {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
  inspectorOpen: boolean;
  toggleInspector: () => void;
  selectedProject: string | null;
  setSelectedProject: (id: string | null) => void;
  scrollProgress: number;
  setScrollProgress: (progress: number) => void;
  cursorPosition: { x: number; y: number };
  setCursorPosition: (x: number, y: number) => void;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  playgroundParams: PlaygroundParams;
  setPlaygroundParam: <K extends keyof PlaygroundParams>(key: K, value: PlaygroundParams[K]) => void;
  resetPlaygroundParams: () => void;
  isMobile: boolean;
  setIsMobile: (mobile: boolean) => void;
}

const defaultPlaygroundParams: PlaygroundParams = {
  particleCount: 5000,
  particleSize: 2.0,
  noiseScale: 1.5,
  noiseSpeed: 0.3,
  colorA: "#7b6ff0",
  colorB: "#f07b6f",
  distortion: 0.5,
  bloomIntensity: 0.8,
};

export const useAppStore = create<AppState>((set) => ({
  activeSection: "hero",
  setActiveSection: (section) => set({ activeSection: section }),
  inspectorOpen: true,
  toggleInspector: () => set((s) => ({ inspectorOpen: !s.inspectorOpen })),
  selectedProject: null,
  setSelectedProject: (id) => set({ selectedProject: id }),
  scrollProgress: 0,
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  cursorPosition: { x: 0, y: 0 },
  setCursorPosition: (x, y) => set({ cursorPosition: { x, y } }),
  isLoading: true,
  setLoading: (loading) => set({ isLoading: loading }),
  playgroundParams: { ...defaultPlaygroundParams },
  setPlaygroundParam: (key, value) =>
    set((s) => ({ playgroundParams: { ...s.playgroundParams, [key]: value } })),
  resetPlaygroundParams: () => set({ playgroundParams: { ...defaultPlaygroundParams } }),
  isMobile: false,
  setIsMobile: (mobile) => set({ isMobile: mobile }),
}));
