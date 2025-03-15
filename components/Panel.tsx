"use client";

import { Panel as PanelComponent, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

export function Panel() {
  return (
    <PanelGroup autoSaveId="example" direction="horizontal">
      <PanelComponent defaultSize={25}>
        <div>
          <span>Sidebar</span>
        </div>
      </PanelComponent>
      <PanelResizeHandle />
      <PanelComponent defaultSize={25}>
        <div>
          <span>Content</span>
        </div>
      </PanelComponent>
    </PanelGroup>
  );
}
