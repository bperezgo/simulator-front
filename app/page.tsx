import { CenterContainerWithPanel } from "@/components/CenterContainer";
import { LeftSideBarWithPanel } from "@/components/LeftSideBar";
import { ProjectTab } from "@/components/ProjectTab";
import { RightSideBarWithPanel } from "@/components/RightSideBar";
import { PanelScreen } from "@/containers/PanelScreen";

export default function Home() {
  return (
    <div className="flex flex-col w-screen h-screen font-[family-name:var(--font-geist-sans)]">
      <ProjectTab />
      <PanelScreen
        GraphComponent={RightSideBarWithPanel}
        MainComponent={CenterContainerWithPanel}
        SideBarComponent={LeftSideBarWithPanel}
      />
    </div>
  );
}
