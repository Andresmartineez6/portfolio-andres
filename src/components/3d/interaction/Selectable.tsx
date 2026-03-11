"use client";
import { type ReactNode } from "react";
import { useAppStore } from "@/state/store";
import type { InteractiveObjectConfig } from "@/types/objects";

interface SelectableProps {
  config: InteractiveObjectConfig;
  children: ReactNode | ((state: { hovered: boolean; selected: boolean }) => ReactNode);
}

export default function Selectable({ config, children }: SelectableProps) {
  const setHovered = useAppStore((s) => s.setHoveredObject);
  const hoveredObject = useAppStore((s) => s.hoveredObject);
  const selectedObject = useAppStore((s) => s.selectedObject);

  const hovered = hoveredObject === config.id;
  const selected = selectedObject === config.id;

  const handlePointerEnter = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setHovered(config.id);
    document.body.style.cursor = "pointer";
  };

  const handlePointerLeave = () => {
    setHovered(null);
    document.body.style.cursor = "default";
  };

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    if (selected) {
      useAppStore.getState().unfocusObject();
    } else {
      useAppStore.getState().focusObject(
        config.id,
        config.focusPosition,
        config.focusTarget,
        config.focusFov
      );
    }
  };

  return (
    <group
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
    >
      {typeof children === "function" ? children({ hovered, selected }) : children}
    </group>
  );
}
