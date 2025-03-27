"use client";

import { withPanel } from "@/hoc/Panel";

export function SideBar() {
  return <div>Layers</div>
}

export const SideBarWithPanel = withPanel({ Component: SideBar });
