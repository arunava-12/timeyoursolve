import { useState, useEffect } from "react";

const CubeVisualizer = ({ scramble }) => {
  const [cubeState, setCubeState] = useState(null);

  // Colors for each face
  const colors = {
    U: '#FFFFFF', // White
    D: '#FFFF00', // Yellow
    L: '#FF8C00', // Orange
    R: '#FF0000', // Red
    F: '#00FF00', // Green
    B: '#0000FF'  // Blue
  };

  // Initialize solved cube state
  const initializeSolvedCube = () => {
    return {
      U: Array(9).fill('U'), // White face
      D: Array(9).fill('D'), // Yellow face
      L: Array(9).fill('L'), // Orange face
      R: Array(9).fill('R'), // Red face
      F: Array(9).fill('F'), // Green face
      B: Array(9).fill('B')  // Blue face
    };
  };

  // Rotate a face clockwise
  const rotateFace = (face, rotations) => {
    const newFace = [...face];
    for (let i = 0; i < rotations; i++) {
      const temp = [...newFace];
      newFace[0] = temp[6];
      newFace[1] = temp[3];
      newFace[2] = temp[0];
      newFace[3] = temp[7];
      newFace[5] = temp[1];
      newFace[6] = temp[8];
      newFace[7] = temp[5];
      newFace[8] = temp[2];
    }
    return newFace;
  };

  // Apply a move to the cube state
  const applyMove = (cube, move) => {
    const newCube = JSON.parse(JSON.stringify(cube));
    const face = move[0];
    const modifier = move.slice(1);
    const rotations = modifier === "'" ? 3 : modifier === "2" ? 2 : 1;

    // Rotate the face itself
    newCube[face] = rotateFace(newCube[face], rotations);

    // Handle adjacent face updates
    switch (face) {
      case 'U':
        // Rotate top layer of adjacent faces
        for (let i = 0; i < rotations; i++) {
          const temp = [...newCube.F.slice(0, 3)];
          newCube.F[0] = newCube.L[0];
          newCube.F[1] = newCube.L[1];
          newCube.F[2] = newCube.L[2];
          newCube.L[0] = newCube.B[0];
          newCube.L[1] = newCube.B[1];
          newCube.L[2] = newCube.B[2];
          newCube.B[0] = newCube.R[0];
          newCube.B[1] = newCube.R[1];
          newCube.B[2] = newCube.R[2];
          newCube.R[0] = temp[0];
          newCube.R[1] = temp[1];
          newCube.R[2] = temp[2];
        }
        break;

      case 'D':
        // Rotate bottom layer of adjacent faces
        for (let i = 0; i < rotations; i++) {
          const temp = [...newCube.F.slice(6, 9)];
          newCube.F[6] = newCube.R[6];
          newCube.F[7] = newCube.R[7];
          newCube.F[8] = newCube.R[8];
          newCube.R[6] = newCube.B[6];
          newCube.R[7] = newCube.B[7];
          newCube.R[8] = newCube.B[8];
          newCube.B[6] = newCube.L[6];
          newCube.B[7] = newCube.L[7];
          newCube.B[8] = newCube.L[8];
          newCube.L[6] = temp[0];
          newCube.L[7] = temp[1];
          newCube.L[8] = temp[2];
        }
        break;

      case 'F':
        // Rotate front layer
        for (let i = 0; i < rotations; i++) {
          const temp = [...newCube.U.slice(6, 9)];
          newCube.U[6] = newCube.L[8];
          newCube.U[7] = newCube.L[5];
          newCube.U[8] = newCube.L[2];
          newCube.L[2] = newCube.D[0];
          newCube.L[5] = newCube.D[1];
          newCube.L[8] = newCube.D[2];
          newCube.D[0] = newCube.R[6];
          newCube.D[1] = newCube.R[3];
          newCube.D[2] = newCube.R[0];
          newCube.R[0] = temp[0];
          newCube.R[3] = temp[1];
          newCube.R[6] = temp[2];
        }
        break;

      case 'B':
        // Rotate back layer
        for (let i = 0; i < rotations; i++) {
          const temp = [...newCube.U.slice(0, 3)];
          newCube.U[0] = newCube.R[2];
          newCube.U[1] = newCube.R[5];
          newCube.U[2] = newCube.R[8];
          newCube.R[2] = newCube.D[8];
          newCube.R[5] = newCube.D[7];
          newCube.R[8] = newCube.D[6];
          newCube.D[6] = newCube.L[0];
          newCube.D[7] = newCube.L[3];
          newCube.D[8] = newCube.L[6];
          newCube.L[0] = temp[2];
          newCube.L[3] = temp[1];
          newCube.L[6] = temp[0];
        }
        break;

      case 'L':
        // Rotate left layer
        for (let i = 0; i < rotations; i++) {
          const temp = [newCube.U[0], newCube.U[3], newCube.U[6]];
          newCube.U[0] = newCube.B[8];
          newCube.U[3] = newCube.B[5];
          newCube.U[6] = newCube.B[2];
          newCube.B[2] = newCube.D[6];
          newCube.B[5] = newCube.D[3];
          newCube.B[8] = newCube.D[0];
          newCube.D[0] = newCube.F[0];
          newCube.D[3] = newCube.F[3];
          newCube.D[6] = newCube.F[6];
          newCube.F[0] = temp[0];
          newCube.F[3] = temp[1];
          newCube.F[6] = temp[2];
        }
        break;

      case 'R':
        // Rotate right layer
        for (let i = 0; i < rotations; i++) {
          const temp = [newCube.U[2], newCube.U[5], newCube.U[8]];
          newCube.U[2] = newCube.F[2];
          newCube.U[5] = newCube.F[5];
          newCube.U[8] = newCube.F[8];
          newCube.F[2] = newCube.D[2];
          newCube.F[5] = newCube.D[5];
          newCube.F[8] = newCube.D[8];
          newCube.D[2] = newCube.B[6];
          newCube.D[5] = newCube.B[3];
          newCube.D[8] = newCube.B[0];
          newCube.B[0] = temp[2];
          newCube.B[3] = temp[1];
          newCube.B[6] = temp[0];
        }
        break;
    }

    return newCube;
  };

  // Parse scramble and apply moves
  const applyScramble = (scrambleString) => {
    if (!scrambleString) return initializeSolvedCube();
    
    const moves = scrambleString.split(' ').filter(move => move.length > 0);
    let cube = initializeSolvedCube();
    
    moves.forEach(move => {
      cube = applyMove(cube, move);
    });
    
    return cube;
  };

  useEffect(() => {
    const newCubeState = applyScramble(scramble);
    setCubeState(newCubeState);
  }, [scramble]);

  if (!cubeState) return <div>Loading cube...</div>;

  // Render a single face
  const renderFace = (face, faceName) => (
    <div className="grid grid-cols-3 gap-0.5 w-20 h-20 border border-white/30 bg-white/5 p-1 rounded-sm shadow-lg">
      {face.map((color, index) => (
        <div
          key={index}
          className="w-5 h-5 border border-white/20 rounded-sm shadow-inner"
          style={{ backgroundColor: colors[color] }}
        />
      ))}
    </div>
  );

  return (
    <div className="flex items-start space-x-6">
      {/* Cube Display */}
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-4">
        <div className="grid grid-cols-4 gap-2 items-center" style={{ gridTemplateAreas: `
          ". up . . ."
          ". up . . ."
          ". up . . ."
          "left front right back ."
          "left front right back ."
          "left front right back ."
          ". down . . ."
          ". down . . ."
          ". down . . ."
        ` }}>
          {/* Up face */}
          <div style={{ gridArea: 'up' }} className="flex justify-center">
            {renderFace(cubeState.U, 'U')}
          </div>
          
          {/* Left face */}
          <div style={{ gridArea: 'left' }} className="flex justify-center">
            {renderFace(cubeState.L, 'L')}
          </div>
          
          {/* Front face */}
          <div style={{ gridArea: 'front' }} className="flex justify-center">
            {renderFace(cubeState.F, 'F')}
          </div>
          
          {/* Right face */}
          <div style={{ gridArea: 'right' }} className="flex justify-center">
            {renderFace(cubeState.R, 'R')}
          </div>
          
          {/* Back face */}
          <div style={{ gridArea: 'back' }} className="flex justify-center">
            {renderFace(cubeState.B, 'B')}
          </div>
          
          {/* Down face */}
          <div style={{ gridArea: 'down' }} className="flex justify-center">
            {renderFace(cubeState.D, 'D')}
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 min-w-[200px]">
        <h3 className="text-white/80 font-medium text-lg mb-3 text-center">Face Colors</h3>
        <div className="grid grid-cols-1 gap-2.5 text-lg">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-white border border-white/30 rounded-sm shadow-sm"></div>
            <span className="text-white/70">U (White)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-400 border border-white/30 rounded-sm shadow-sm"></div>
            <span className="text-white/70">D (Yellow)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-orange-500 border border-white/30 rounded-sm shadow-sm"></div>
            <span className="text-white/70">L (Orange)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 border border-white/30 rounded-sm shadow-sm"></div>
            <span className="text-white/70">R (Red)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 border border-white/30 rounded-sm shadow-sm"></div>
            <span className="text-white/70">F (Green)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 border border-white/30 rounded-sm shadow-sm"></div>
            <span className="text-white/70">B (Blue)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CubeVisualizer; 