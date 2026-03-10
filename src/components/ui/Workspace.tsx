"use client";
import { useRef, useCallback, lazy, Suspense } from "react";
import { useAppStore } from "@/state/store";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const HeroSection = lazy(() => import("@/components/ui/sections/HeroSection"));
const AboutSection = lazy(() => import("@/components/ui/sections/AboutSection"));
const ProjectsSection = lazy(() => import("@/components/ui/sections/ProjectsSection"));
const PlaygroundSection = lazy(() => import("@/components/ui/sections/PlaygroundSection"));
const ContactSection = lazy(() => import("@/components/ui/sections/ContactSection"));

export default function Workspace() {
  const containerRef = useRef<HTMLDivElement>(null);
  const setScrollProgress = useAppStore((s) => s.setScrollProgress);
  const setActiveSection = useAppStore((s) => s.setActiveSection);
  const activeSection = useAppStore((s) => s.activeSection);
  useSmoothScroll(containerRef);

  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const scrollTop = el.scrollTop;
    const scrollHeight = el.scrollHeight - el.clientHeight;
    const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
    setScrollProgress(progress);
    const sections = el.querySelectorAll("[data-section]");
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const containerRect = el.getBoundingClientRect();
      const relativeTop = rect.top - containerRect.top;
      if (relativeTop < el.clientHeight * 0.5 && relativeTop + rect.height > 0) {
        const sectionId = section.getAttribute("data-section");
        if (sectionId && sectionId !== activeSection) {
          setActiveSection(sectionId as typeof activeSection);
        }
      }
    });
  }, [setScrollProgress, setActiveSection, activeSection]);

  return (
    <div ref={containerRef} className="workspace" onScroll={handleScroll} style={{ gridColumn: "2", gridRow: "2" }}>
      <div className="flex flex-col">
        <Suspense fallback={null}>
          <div data-section="hero"><HeroSection /></div>
          <div data-section="about"><AboutSection /></div>
          <div data-section="projects"><ProjectsSection /></div>
          <div data-section="playground"><PlaygroundSection /></div>
          <div data-section="contact"><ContactSection /></div>
        </Suspense>
      </div>
    </div>
  );
}
