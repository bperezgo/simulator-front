"use client";

import {
  Panel as PanelComponent,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";

export type PanelScreenProps = {
  SideBarComponent: React.FC;
  MainComponent: React.FC;
  GraphComponent: React.FC;
};

export function PanelScreen({
  GraphComponent,
  MainComponent,
  SideBarComponent,
}: PanelScreenProps) {
  return (
    <PanelGroup autoSaveId="example" direction="horizontal">
      <PanelComponent defaultSize={25}>
        <SideBarComponent />
      </PanelComponent>
      <PanelResizeHandle />
      <PanelComponent defaultSize={25}>
        <MainComponent />
      </PanelComponent>
      <PanelResizeHandle />
      <PanelComponent defaultSize={25}>
        <GraphComponent />
      </PanelComponent>
    </PanelGroup>
  );
}
