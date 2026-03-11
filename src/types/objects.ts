export interface InteractiveObjectConfig {
  id: string;
  label: string;
  description: string;
  focusPosition: [number, number, number];
  focusTarget: [number, number, number];
  focusFov?: number;
}

export const INTERACTIVE_OBJECTS: Record<string, InteractiveObjectConfig> = {
  "main-monitor": {
    id: "main-monitor",
    label: "Monitor Principal",
    description: "Proyectos y trabajo",
    focusPosition: [-0.2, 1.35, 0.4],
    focusTarget: [-0.15, 1.05, -1.1],
    focusFov: 40,
  },
  "side-monitor": {
    id: "side-monitor",
    label: "Monitor Vertical",
    description: "Actividad GitHub",
    focusPosition: [0.8, 1.35, 0.3],
    focusTarget: [0.55, 1.05, -1.1],
    focusFov: 40,
  },
  keyboard: {
    id: "keyboard",
    label: "Teclado Mecanico",
    description: "Stack tecnologico",
    focusPosition: [0.0, 1.4, 0.2],
    focusTarget: [-0.1, 0.78, -0.6],
    focusFov: 38,
  },
  notebook: {
    id: "notebook",
    label: "Cuaderno",
    description: "Sobre mi",
    focusPosition: [-0.8, 1.3, 0.0],
    focusTarget: [-0.6, 0.78, -0.85],
    focusFov: 38,
  },
  microphone: {
    id: "microphone",
    label: "Microfono",
    description: "Laboratorio",
    focusPosition: [-0.9, 1.3, 0.3],
    focusTarget: [-0.55, 1.0, -0.5],
    focusFov: 42,
  },
  headphones: {
    id: "headphones",
    label: "Auriculares",
    description: "Contacto",
    focusPosition: [1.0, 1.2, 0.2],
    focusTarget: [0.7, 0.85, -0.75],
    focusFov: 40,
  },
  "energy-drink": {
    id: "energy-drink",
    label: "Bebida Energetica",
    description: "Easter egg",
    focusPosition: [0.6, 1.2, 0.1],
    focusTarget: [0.4, 0.8, -0.5],
    focusFov: 42,
  },
};
