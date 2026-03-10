"use client";
import { useRef, useEffect } from "react";
import { useAppStore, type Section } from "@/state/store";
import HeroSection from "@/components/ui/sections/HeroSection";
import AboutSection from "@/components/ui/sections/AboutSection";
import ProjectsSection from "@/components/ui/sections/ProjectsSection";
import PlaygroundSection from "@/components/ui/sections/PlaygroundSection";
import ContactSection from "@/components/ui/sections/ContactSection";

const sections: { id: Section; Component: React.FC }[] = [
  { id: "hero", Component: HeroSection },
  { id: "about", Component: AboutSection },
  { id: "projects", Component: ProjectsSection },
  { id: "playground", Component: PlaygroundSection },
  { id: "contact", Component: ContactSection },
];

export default function Workspace() {
  const ref = useRef<HTMLDivElement>(null);
  const setActive = useAppStore((s) => s.setActiveSection);
  const setScroll = useAppStore((s) => s.setScrollProgress);
  const activeSection = useAppStore((s) => s.activeSection);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      setScroll(scrollTop / (scrollHeight - clientHeight || 1));
      const mid = scrollTop + clientHeight * 0.4;
      for (let i = el.children.length - 1; i >= 0; i--) {
        const child = el.children[i] as HTMLElement;
        if (child.offsetTop <= mid) {
          const id = child.dataset.section as Section;
          if (id) { setActive(id); break; }
        }
      }
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [setActive, setScroll]);

  // Auto-scroll to section when sidebar/nav clicked
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const target = el.querySelector(`[data-section="${activeSection}"]`) as HTMLElement;
    if (target) {
      const top = target.offsetTop;
      const { scrollTop, clientHeight } = el;
      const vis = scrollTop + clientHeight;
      if (top < scrollTop || top > vis - 100) {
        el.scrollTo({ top, behavior: "smooth" });
      }
    }
  }, [activeSection]);

  return (
    <div ref={ref} className="workspace" style={{ gridColumn: "2 / 3", gridRow: "2 / 3" }}>
      {sections.map(({ id, Component }) => (
        <div key={id} data-section={id}>
          <Component />
        </div>
      ))}
    </div>
  );
}
