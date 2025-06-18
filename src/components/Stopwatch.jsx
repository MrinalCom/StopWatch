import { React, useRef, useState, useEffect } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 10); // Add 10ms every tick
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current); // Cleanup
  }, [isRunning]);

  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const handleStop = () => {
    if (isRunning) {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}:${String(milliseconds).padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 max-w-md w-full">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2 tracking-wide">
            Stopwatch
          </h1>
          <div className="text-sm text-white/70 mb-8">Precision Timer</div>

          {/* Creator Credit */}
          <div className="text-xs text-white/50 mb-6 font-medium">
            Created by Mrinal
          </div>

          {/* Time Display */}
          <div className="bg-black/30 rounded-2xl p-6 mb-8 border border-white/10">
            <div className="font-mono text-5xl font-bold text-white tracking-wider">
              {formatTime(time)}
            </div>
            <div className="text-white/60 text-sm mt-2 font-medium">
              MM:SS:MS
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex justify-center gap-4">
            <button
              onClick={isRunning ? handleStop : handleStart}
              className={`
                flex items-center justify-center w-16 h-16 rounded-full text-white font-semibold
                transition-all duration-200 transform hover:scale-105 active:scale-95
                ${
                  isRunning
                    ? "bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/25"
                    : "bg-green-500 hover:bg-green-600 shadow-lg shadow-green-500/25"
                }
              `}
            >
              {isRunning ? <Pause size={24} /> : <Play size={24} />}
            </button>

            <button
              onClick={handleReset}
              className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-600 hover:bg-gray-700 text-white font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg shadow-gray-600/25"
            >
              <RotateCcw size={24} />
            </button>
          </div>

          {/* Status Indicator */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                isRunning ? "bg-green-400 animate-pulse" : "bg-gray-400"
              }`}
            ></div>
            <span className="text-white/70 text-sm font-medium">
              {isRunning ? "Running" : "Stopped"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stopwatch;
