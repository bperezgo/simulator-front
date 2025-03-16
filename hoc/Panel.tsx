"use client";

import { Panel as PanelComponent } from "react-resizable-panels";

export type PanelProps = {
  Component: React.FC;
};

export function withPanel({ Component }: PanelProps): React.FC {
  return function Panel() {
    return (
      <PanelComponent
        className="h-full w-full border-solid border-[1px] rounded-md border-b-cyan-950"
        defaultSize={25}
      >
        <Component />
      </PanelComponent>
    );
  };
}
