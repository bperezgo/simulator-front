import { CenterContainer } from "@/components/CenterContainer"
import { LeftSideBar } from "@/components/LeftSideBar"
import { RightSideBar } from "@/components/RightSideBar";

export default function Home() {
  return (
    <div className="flex w-screen h-screen font-[family-name:var(--font-geist-sans)]">
      <LeftSideBar />
      <CenterContainer />
      <RightSideBar />
    </div>
  );
}
