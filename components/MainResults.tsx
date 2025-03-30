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

const responseFromBackend = {
  parameters: [
    {
      label: "1700",
      value: 6,
    },
    {
      label: "1600",
      value: 4,
    },
    {
      label: "1500",
      value: 3,
    },
    {
      label: "1400",
      value: 2,
    },
  ],
  results: [
    {
      label: "1700 micras",
      data: [
        {
          time: 0,
          massFraction: 0,
        },
        {
          time: 1,
          massFraction: 15,
        },
        {
          time: 2,
          massFraction: 20,
        },
        {
          time: 30,
          massFraction: 80,
        },
        {
          time: 50,
          massFraction: 90,
        },
        {
          time: 70,
          massFraction: 87,
        },
      ],
    },
    {
      label: "800 micras",
      data: [
        {
          time: 0,
          massFraction: 0,
        },
        {
          time: 1,
          massFraction: 10,
        },
        {
          time: 2,
          massFraction: 10,
        },
        {
          time: 30,
          massFraction: 40,
        },
        {
          time: 50,
          massFraction: 60,
        },
        {
          time: 70,
          massFraction: 100,
        },
      ],
    },
    {
      label: "100 micras",
      micras: 100,
      data: [
        {
          time: 0,
          massFraction: 0,
        },
        {
          time: 1,
          massFraction: 10,
        },
        {
          time: 2,
          massFraction: 40,
        },
        {
          time: 30,
          massFraction: 40,
        },
        {
          time: 50,
          massFraction: 60,
        },
        {
          time: 70,
          massFraction: 110,
        },
      ],
    },
  ],
};

type ChartDataValues = { [Key: string]: number };

export function MainResults() {
  const chartData = responseFromBackend.results.reduce((acc, curr) => {
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

  const chartConfig = Object.entries(chartData[0]).reduce(
    (acc, [currKey]) => {
      return {
        ...acc,
        [currKey]: {
          label: "time",
          color: "hsl(var(--chart-2))",
        },
      };
    },
    {} satisfies ChartConfig
  );

  const lines = Object.entries(chartConfig)
    .map((entry) => ({
      key: entry[0],
      dataKey: entry[0],
    }))
    .filter((value) => value.dataKey !== "time");

  return (
    <div className="flex justify-center w-full h-full p-8">
      {/* <Computer className="self-center" size={128} /> */}
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
