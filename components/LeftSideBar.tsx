"use client";

import { withPanel } from "@/hoc/Panel";

export function LeftSideBar() {
  return (
    <div className="min-w-[300px] min-h-full bg-[var(--gray-1)] resize">
      LeftSideBar
    </div>
  );
}

export const LeftSideBarWithPanel = withPanel({ Component: LeftSideBar });
