"use client";

import { MillingSimulationResponse } from "@/lib/dtos/milling/milling-dto";
import { createContext, useContext, useState } from "react";

interface MillContextType {
  inputDataFile: Record<string, string>[] | null;
  outputDataFile: Record<string, string>[] | null;
  millDataSimulation: MillingSimulationResponse | null;
  showInputFile: boolean;
  isLoadingData: boolean;
  setInputDataFile: (inputDataFile: Record<string, string>[] | null) => void;
  setOutputDataFile: (outputDataFile: Record<string, string>[] | null) => void;
  setMillDataSimulation: (
    millDataSimulation: MillingSimulationResponse | null
  ) => void;
  setShowInputFile: (showInputFile: boolean) => void;
  setIsLoadingData: (isLoadingData: boolean) => void;
}

const MillContext = createContext<MillContextType | null>(null);

export function MillProvider({ children }: { children: React.ReactNode }) {
  const [inputDataFile, setInputDataFile] = useState<
    Record<string, string>[] | null
  >(null);
  const [outputDataFile, setOutputDataFile] = useState<
    Record<string, string>[] | null
  >(null);
  const [millDataSimulation, setMillDataSimulation] =
    useState<MillingSimulationResponse | null>(null);
  const [showInputFile, setShowInputFile] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const value = {
    inputDataFile,
    outputDataFile,
    millDataSimulation,
    showInputFile,
    isLoadingData,
    setInputDataFile,
    setOutputDataFile,
    setMillDataSimulation,
    setShowInputFile,
    setIsLoadingData,
  };

  return <MillContext.Provider value={value}>{children}</MillContext.Provider>;
}

export function useMillContext() {
  const context = useContext(MillContext);
  if (!context) {
    throw new Error("useMillContext must be used within a MillProvider");
  }
  return context;
}
