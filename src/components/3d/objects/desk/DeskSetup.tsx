"use client";
import Desk from "@/components/3d/objects/desk/Desk";
import MainMonitor from "@/components/3d/objects/desk/MainMonitor";
import SideMonitor from "@/components/3d/objects/desk/SideMonitor";
import Keyboard from "@/components/3d/objects/desk/Keyboard";
import MousePad from "@/components/3d/objects/desk/MousePad";
import Notebook from "@/components/3d/objects/desk/Notebook";
import Microphone from "@/components/3d/objects/desk/Microphone";
import Headphones from "@/components/3d/objects/desk/Headphones";
import EnergyDrink from "@/components/3d/objects/desk/EnergyDrink";

export default function DeskSetup() {
  return (
    <group name="desk-setup">
      <Desk />
      <MainMonitor />
      <SideMonitor />
      <Keyboard />
      <MousePad />
      <Notebook />
      <Microphone />
      <Headphones />
      <EnergyDrink />
    </group>
  );
}
