"use client";

import { PanelGroup, PanelResizeHandle } from "react-resizable-panels";

export type PanelScreenProps = {
  SideBarComponent: React.FC;
  MainComponent: React.FC;
};

export function PanelScreen({
  MainComponent,
  SideBarComponent,
}: PanelScreenProps) {
  return (
    <PanelGroup autoSaveId="example" direction="horizontal">
      <SideBarComponent />
      <PanelResizeHandle />
      <MainComponent />
    </PanelGroup>
  );
}
