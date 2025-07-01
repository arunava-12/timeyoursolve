import { useState, useEffect } from "react";
import CubeVisualizer from "./CubeVisualizer";

const Scramble = () => {
  const generateScramble = () => {
    const moves = ["U", "D", "L", "R", "F", "B"];
    const modifiers = ["", "'", "2"];
    let scramble = [];
    let lastMove = "";

    while (scramble.length < 20) {
      let move = moves[Math.floor(Math.random() * moves.length)];
      let modifier = modifiers[Math.floor(Math.random() * modifiers.length)];

      if (move !== lastMove) {
        scramble.push(move + modifier);
        lastMove = move;
      }
    }

    return scramble.join(" ");
  };

  const [scramble, setScramble] = useState("");

  useEffect(() => {
    setScramble(generateScramble());
  }, []);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-2">
          Scramble
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
      </div>

      {/* Scramble Display */}
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4">
        <div className="text-center space-y-3">
          <p className="text-xl md:text-2xl font-mono text-white/90 bg-white/5 rounded-lg p-3 border border-white/10">
            {scramble}
          </p>
          
          <button
            onClick={() => setScramble(generateScramble())}
            className="btn-modern px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>New Scramble</span>
            </div>
          </button>
        </div>
      </div>

      {/* Cube Visualizer */}
      <div className="flex justify-center">
        <CubeVisualizer scramble={scramble} />
      </div>
    </div>
  );
};

export default Scramble;
