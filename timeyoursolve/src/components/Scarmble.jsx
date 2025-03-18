import { useState, useEffect } from "react";

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
    <div className="text-center mt-6">
      <h2 className="text-2xl font-semibold">Scramble:</h2>
      <p className="text-xl bg-gray-200 p-2 rounded mt-2">{scramble}</p>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={() => setScramble(generateScramble())}
      >
        New Scramble
      </button>
    </div>
  );
};

export default Scramble;
