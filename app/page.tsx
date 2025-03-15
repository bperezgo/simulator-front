import { CenterContainer } from "@/components/CenterContainer";
import { LeftSideBar } from "@/components/LeftSideBar";
import { RightSideBar } from "@/components/RightSideBar";
import { PanelScreen } from "@/containers/PanelScreen";

export default function Home() {
  return (
    <div className="flex w-screen h-screen font-[family-name:var(--font-geist-sans)]">
      <PanelScreen
        GraphComponent={RightSideBar}
        MainComponent={CenterContainer}
        SideBarComponent={LeftSideBar}
      />
    </div>
  );
}
