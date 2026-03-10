"use client";
import { useEffect, useCallback } from "react";
import { useAppStore } from "@/state/store";

export function useMousePosition() {
  const setCursorPosition = useAppStore((s) => s.setCursorPosition);
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setCursorPosition(x, y);
    },
    [setCursorPosition]
  );
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);
}
