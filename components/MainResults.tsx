"use client";

import { withPanel } from "@/hoc/Panel";
// import { Computer } from "lucide-react";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMillContext } from "@/lib/platform/context/millContext";

type ChartDataValues = { [Key: string]: number };

export function MainResults() {
  const { millDataSimulation } = useMillContext();
  if (!millDataSimulation) {
    return <div>No data</div>;
  }

  const chartData = millDataSimulation.results.reduce((acc, curr) => {
    if (acc.length === 0) {
      return curr.data.map((value) => ({
        time: value.time,
        [curr.label]: value.massFraction,
      }));
    }

    const newAcc = acc.map((value, idx) => ({
      ...value,
      [curr.label]: curr.data[idx].massFraction,
    }));

    return newAcc;
  }, [] as ChartDataValues[]);

  const chartConfig = Object.entries(chartData[0]).reduce((acc, [currKey]) => {
    return {
      ...acc,
      [currKey]: {
        label: "time",
        color: "hsl(var(--chart-2))",
      },
    };
  }, {} satisfies ChartConfig);

  const lines = Object.entries(chartConfig)
    .map((entry) => ({
      key: entry[0],
      dataKey: entry[0],
    }))
    .filter((value) => value.dataKey !== "time");

  return (
    <div className="flex justify-center w-full h-full p-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Simulation Results</CardTitle>
          <CardDescription>Run simulation</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 24,
                left: 24,
                right: 24,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis dataKey="time" />
              <YAxis />
              <Legend />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    indicator="line"
                    nameKey="visitors"
                    hideLabel
                  />
                }
              />
              {lines.map((line) => (
                <Line
                  key={line.key}
                  type="monotone"
                  dataKey={line.dataKey}
                  stroke="#8884d8"
                />
              ))}
            </LineChart>
          </ChartContainer>
        </CardContent>
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
