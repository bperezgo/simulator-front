"use client";

import { withPanel } from "@/hoc/Panel";

export function CenterContainer() {
  return <div className="w-full resize">CenterContainer</div>;
}

export const CenterContainerWithPanel = withPanel({ Component: CenterContainer });
