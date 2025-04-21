// Chart component based on https://github.com/shelwinsunga/zoom-chart-demo/blob/main/components/chart.tsx
import { useMemo, useState } from "react";
import { ChartConfig } from "@/components/ui/chart";
import { CartesianGrid, Legend, Line, XAxis, YAxis } from "recharts";
import { ReferenceArea } from "recharts";
import { CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { LineChart } from "recharts";
import { Button } from "@/components/ui/button";
import { MillingSimulationResponse } from "@/lib/dtos/milling/milling-dto";

type ChartDataValues = { [Key: string]: number };

const getChartData = (millDataSimulation: MillingSimulationResponse) =>
  millDataSimulation.results.reduce((acc, curr) => {
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

export function LinearChart({
  millDataSimulation,
}: {
  millDataSimulation: MillingSimulationResponse;
}) {
  const [refAreaLeft, setRefAreaLeft] = useState<number | null>(null);
  const [refAreaRight, setRefAreaRight] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);

  const zoomedData = useMemo(() => {
    if (!millDataSimulation) {
      return [];
    }

    if (!startTime || !endTime) {
      return getChartData(millDataSimulation);
    }

    const chartData = getChartData(millDataSimulation);

    const dataPointsInRange = chartData.filter(
      (dataPoint) => dataPoint.time >= startTime && dataPoint.time <= endTime
    );

    // Ensure we have at least two data points for the chart to prevent rendering a single dot
    return dataPointsInRange.length > 1
      ? dataPointsInRange
      : chartData.slice(0, 2);
  }, [startTime, endTime, millDataSimulation]);

  const handleMouseDown = (e: any) => {
    if (e.activeLabel) {
      setRefAreaLeft(e.activeLabel);
      setIsSelecting(true);
    }
  };

  const handleMouseMove = (e: any) => {
    if (isSelecting && e.activeLabel) {
      setRefAreaRight(e.activeLabel);
    }
  };

  const handleMouseUp = () => {
    if (refAreaLeft && refAreaRight) {
      const [left, right] = [refAreaLeft, refAreaRight].sort();
      setStartTime(left);
      setEndTime(right);
    }
    setRefAreaLeft(null);
    setRefAreaRight(null);
    setIsSelecting(false);
  };

  const chartData = getChartData(millDataSimulation);

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

  const handleReset = () => {
    setStartTime(chartData[0].time);
    setEndTime(chartData[chartData.length - 1].time);
  };

  return (
    <CardContent>
      <div className="flex justify-end my-2 sm:mb-4">
        <Button
          variant="outline"
          onClick={handleReset}
          disabled={!startTime && !endTime}
          className="text-xs sm:text-sm"
        >
          Reset
        </Button>
      </div>
      <ChartContainer config={chartConfig}>
        <LineChart
          accessibilityLayer
          data={zoomedData}
          margin={{
            top: 24,
            left: 24,
            right: 24,
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
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
          {refAreaLeft && refAreaRight && (
            <ReferenceArea
              x1={refAreaLeft}
              x2={refAreaRight}
              strokeOpacity={0.3}
              fill="hsl(var(--foreground))"
              fillOpacity={0.05}
            />
          )}
        </LineChart>
      </ChartContainer>
    </CardContent>
  );
}
