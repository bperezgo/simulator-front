import { useEffect, useState } from "react";
import { Progress } from "./ui/progress";

export function DataResultsLoader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => prevProgress + 10);
    }, 1000);

    if (progress === 100) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center content-center w-full h-full p-8">
      <Progress className="self-center" value={progress} />
    </div>
  );
}
