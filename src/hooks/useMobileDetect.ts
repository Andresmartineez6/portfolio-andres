"use client";
import { useEffect } from "react";
import { useAppStore } from "@/state/store";

export function useMobileDetect() {
  const setIsMobile = useAppStore((s) => s.setIsMobile);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [setIsMobile]);
}
