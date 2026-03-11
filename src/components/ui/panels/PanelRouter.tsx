"use client";
import { useAppStore } from "@/state/store";
import ProjectsPanel from "@/components/ui/panels/ProjectsPanel";
import GithubPanel from "@/components/ui/panels/GithubPanel";
import SkillsPanel from "@/components/ui/panels/SkillsPanel";
import AboutPanel from "@/components/ui/panels/AboutPanel";
import LabPanel from "@/components/ui/panels/LabPanel";
import ContactPanel from "@/components/ui/panels/ContactPanel";
import EasterEggPanel from "@/components/ui/panels/EasterEggPanel";

const PANEL_MAP: Record<string, React.ComponentType<{ onClose: () => void }>> = {
  "main-monitor": ProjectsPanel,
  "side-monitor": GithubPanel,
  keyboard: SkillsPanel,
  notebook: AboutPanel,
  microphone: LabPanel,
  headphones: ContactPanel,
  "energy-drink": EasterEggPanel,
};

export default function PanelRouter() {
  const selectedObject = useAppStore((s) => s.selectedObject);
  const focusMode = useAppStore((s) => s.focusMode);

  const handleClose = () => {
    useAppStore.getState().unfocusObject();
  };

  const PanelComponent = selectedObject ? PANEL_MAP[selectedObject] : null;

  if (!focusMode || !PanelComponent) return null;

  return <PanelComponent onClose={handleClose} />;
}
