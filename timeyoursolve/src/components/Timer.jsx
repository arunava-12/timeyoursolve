import { useState, useEffect, useRef } from "react";

const Timer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        event.preventDefault();
        if (!isRunning) {
          // Start the timer
          setIsRunning(true);
        } else {
          // Stop the timer
          setIsRunning(false);
        }
      } else if (event.code === "Enter") {
        event.preventDefault();
        // Reset the timer
        resetTimer();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRunning]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const centiseconds = Math.floor((milliseconds % 1000) / 10);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(centiseconds).padStart(2, "0")}`;
  };

  const resetTimer = () => {
    setTime(0);
    setIsRunning(false);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Timer Display */}
      <div className="relative">
        <div className={`backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 transition-all duration-300 ${
          isRunning ? 'bg-red-500/20 border-red-400/50' : 
          'hover:bg-white/15'
        }`}>
          <div className={`text-5xl md:text-7xl font-mono font-bold text-center transition-all duration-200 ${
            isRunning ? 'text-red-400' : 
            'text-white'
          }`}>
            {formatTime(time)}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center space-y-3">
        <div className="flex space-x-4">
          <button
            onClick={resetTimer}
            className="btn-modern px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white font-medium transition-all duration-200 hover:scale-105"
          >
            Reset
          </button>
        </div>
        
        <div className="text-center space-y-2">
          <p className="text-white/60 text-sm">
            {isRunning ? "Press spacebar to stop" : 
             "Press spacebar to start"}
          </p>
          <p className="text-white/60 text-sm">
            Press Enter to reset
          </p>
          <div className="flex items-center justify-center space-x-2 text-white/40 text-xs">
            <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-red-400' : 'bg-white/20'}`}></div>
            <span>Running</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
