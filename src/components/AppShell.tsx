"use client";
import { lazy, Suspense } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useMobileDetect } from "@/hooks/useMobileDetect";
import TopBar from "@/components/ui/TopBar";
import Sidebar from "@/components/ui/Sidebar";
import InspectorPanel from "@/components/ui/InspectorPanel";
import StatusBar from "@/components/ui/StatusBar";
import Workspace from "@/components/ui/Workspace";
import LoadingScreen from "@/components/ui/LoadingScreen";
import MobileNav from "@/components/ui/MobileNav";

const SceneCanvas = lazy(() => import("@/components/3d/SceneCanvas"));

export default function AppShell() {
  useMousePosition();
  useMobileDetect();
  return (
    <>
      <LoadingScreen />
      <Suspense fallback={null}><SceneCanvas /></Suspense>
      <div className="noise-overlay" />
      <div className="app-layout">
        <TopBar />
        <Sidebar />
        <Workspace />
        <InspectorPanel />
        <StatusBar />
        <MobileNav />
      </div>
    </>
  );
}
