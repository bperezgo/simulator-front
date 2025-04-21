import { withPanel } from "@/hoc/Panel";
import { TrendingUp } from "lucide-react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMillContext } from "@/lib/platform/context/millContext";
import { DataResultsLoader } from "./DataResultsLoader";
import { LinearChart } from "./LinearChart";
import { NoData } from "./NoData";

export function MainResults() {
  const { millDataSimulation, isLoadingData } = useMillContext();

  if (isLoadingData) {
    return <DataResultsLoader />;
  }

  if (!millDataSimulation) {
    return <NoData />;
  }

  return (
    <div className="flex justify-center w-full h-full p-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Simulation Results</CardTitle>
          <CardDescription>Run simulation</CardDescription>
        </CardHeader>
        <LinearChart millDataSimulation={millDataSimulation} />
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Trending up by 5.2% <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Could be suggestions of what to do??
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export const MainResultsWithPanel = withPanel({
  Component: MainResults,
});
