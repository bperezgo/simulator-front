import { MainPanel } from "@/components/Panel/Main";
import { SideBarWithPanel } from "@/components/SideBar";
import { ProjectTab } from "@/components/ProjectTab";
import { PanelScreen } from "@/containers/PanelScreen";

export default function Home() {
  return (
    <div className="flex flex-col w-screen h-screen font-[family-name:var(--font-geist-sans)]">
      <ProjectTab />
      <PanelScreen
        MainComponent={MainPanel}
        SideBarComponent={SideBarWithPanel}
      />
    </div>
  );
}
