"use client";
import { useState, useEffect, useCallback } from "react";
import { useAppStore } from "@/state/store";
import CanvasRoot from "@/components/3d/core/CanvasRoot";
import LoadingScreen from "@/components/ui/LoadingScreen";
import HUD from "@/components/ui/HUD";

function useMousePosition() {
  const setCursor = useAppStore((s) => s.setCursorPosition);
  const handler = useCallback(
    (e: MouseEvent) => {
      setCursor(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
      );
    },
    [setCursor]
  );
  useEffect(() => {
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [handler]);
}

function useMobileDetect() {
  const setMobile = useAppStore((s) => s.setIsMobile);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [setMobile]);
}

export default function Experience() {
  useMousePosition();
  useMobileDetect();

  const loaded = useAppStore((s) => s.loaded);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (loaded) {
      const t = setTimeout(() => setReady(true), 100);
      return () => clearTimeout(t);
    }
  }, [loaded]);

  return (
    <>
      <LoadingScreen />
      {ready && (
        <>
          <CanvasRoot />
          <HUD />
        </>
      )}
    </>
  );
}
