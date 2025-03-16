"use client";

import { withPanel } from "@/hoc/Panel";

export function RightSideBar() {
  return (
    <div className="min-w-[800px] h-full bg-[var(--gray-1)] resize">
      RightSideBar
    </div>
  );
}

export const RightSideBarWithPanel = withPanel({ Component: RightSideBar });
