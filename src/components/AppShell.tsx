"use client";
import { useState, useEffect } from "react";
import { useAppStore } from "@/state/store";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useMobileDetect } from "@/hooks/useMobileDetect";
import SceneCanvas from "@/components/3d/SceneCanvas";
import LoadingScreen from "@/components/ui/LoadingScreen";
import TopBar from "@/components/ui/TopBar";
import Sidebar from "@/components/ui/Sidebar";
import InspectorPanel from "@/components/ui/InspectorPanel";
import StatusBar from "@/components/ui/StatusBar";
import MobileNav from "@/components/ui/MobileNav";
import Workspace from "@/components/ui/Workspace";

export default function AppShell() {
  useMousePosition();
  useMobileDetect();
  const loaded = useAppStore((s) => s.loaded);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (loaded) {
      const t = setTimeout(() => setReady(true), 300);
      return () => clearTimeout(t);
    }
  }, [loaded]);

  return (
    <>
      <LoadingScreen />
      {ready && (
        <>
          <SceneCanvas />
          <div className="app-layout">
            <TopBar />
            <Sidebar />
            <Workspace />
            <InspectorPanel />
            <StatusBar />
            <MobileNav />
          </div>
        </>
      )}
    </>
  );
}
