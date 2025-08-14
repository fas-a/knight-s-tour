import { useState } from "react";
import { Button } from "./ui/button";

function ChessBoard() {
  const size = 8;
  const [score, setScore] = useState(0);
  const [knightPos, setKnightPos] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [steps, setSteps] = useState<{ row: number; col: number }[]>([]);
  const [win, setWin] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const knightMoves = [
    { row: -2, col: -1 },
    { row: -2, col: 1 },
    { row: -1, col: -2 },
    { row: -1, col: 2 },
    { row: 1, col: -2 },
    { row: 1, col: 2 },
    { row: 2, col: -1 },
    { row: 2, col: 1 },
  ];

  function isStepped(row: number, col: number) {
    return steps.some((step) => step.row === row && step.col === col);
  }

  function getValidMoves(pos: { row: number; col: number }) {
    return knightMoves
      .map((move) => ({
        row: pos.row + move.row,
        col: pos.col + move.col,
      }))
      .filter(
        (move) =>
          move.row >= 0 &&
          move.row < size &&
          move.col >= 0 &&
          move.col < size &&
          !isStepped(move.row, move.col)
      );
  }

  function handleSquareClick(row: number, col: number) {
    if (!knightPos) {
      setKnightPos({ row, col });
      setSteps([{ row, col }]);
      setScore(1);
    } else if (
      getValidMoves(knightPos).some(
        (move) => move.row === row && move.col === col
      )
    ) {
      setKnightPos({ row, col });
      setSteps((prev) => [...prev, { row, col }]);
      setScore((prev) => prev + 1);

      const nextMoves = getValidMoves({ row, col });
      if (nextMoves.length === 0) {
        if (steps.length + 1 === size * size) {
          setWin(true); // Menang
        } else {
          setGameOver(true); // Kalah
        }
      }
    }
  }

  function handleReset() {
    setScore(0);
    setKnightPos(null);
    setSteps([]);
    setWin(false);
    setGameOver(false);
  }

  return (
    <div>
      <div
        style={{
          position: "relative",
          width: 400,
          height: 400,
          margin: "24px auto",
        }}
      >
        <div
          className="grid grid-cols-8 gap-0 border-4 border-gray-700 rounded-lg overflow-hidden mx-auto my-6"
          style={{ width: 400, height: 400, position: "relative" }}
        >
          {Array.from({ length: size * size }).map((_, idx) => {
            const row = Math.floor(idx / size);
            const col = idx % size;
            const isDark = (row + col) % 2 === 1;
            const stepped = isStepped(row, col);
            const isValidMove =
              knightPos &&
              getValidMoves(knightPos).some(
                (move) => move.row === row && move.col === col
              );

            return (
              <div
                key={idx}
                onClick={() => handleSquareClick(row, col)}
                style={{
                  background: stepped
                    ? "#ffb347"
                    : isValidMove
                    ? "#fff"
                    : isDark
                    ? "#4e54c8"
                    : "#8f94fb",
                  width: "100%",
                  height: "100%",
                  aspectRatio: "1 / 1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: knightPos && !isValidMove ? "default" : "pointer",
                  position: "relative",
                  transition: "background 0.2s",
                }}
              />
            );
          })}
          {knightPos && (
            <svg
              width="32"
              height="32"
              viewBox="0 0 31.537 31.537"
              fill="#fff"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                position: "absolute",
                top: `calc(${(knightPos.row * 100) / size}% + 8px)`,
                left: `calc(${(knightPos.col * 100) / size}% + 8px)`,
                transition:
                  "top 1s cubic-bezier(.5,1.5,.5,1), left 1s cubic-bezier(.5,1.5,.5,1)",
                zIndex: 2,
                pointerEvents: "none",
              }}
            >
              <g>
                <path
                  d="M24.36,27.178h-0.093v-0.335c0-0.43-0.348-0.778-0.777-0.778h-0.363c-0.046-0.457-0.065-0.912,0.029-1.338
            c0.42-1.89,0.935-3.764,1.521-5.607c0.965-3.032,1.547-6.064,0.587-9.211c-1.072-3.518-3.198-6.014-6.813-7.097
            c-0.251-0.075-0.507-0.308-0.65-0.537C17.287,1.448,16.715,0.689,15.789,0c-0.043,0.409-0.091,0.67-0.093,0.932
            c-0.003,0.388,0.012,0.778,0.046,1.165c0.047,0.537-0.118,0.861-0.714,0.909c-0.333,0.026-0.658,0.151-0.97,0.227
            c0,1.208,0,1.208-1.095,1.653c-0.36,0.146-0.741,0.256-1.073,0.45c-0.268,0.156-0.501,0.391-0.708,0.628
            c-0.48,0.55-0.88,1.18-1.41,1.672c-1.06,0.984-2.168,1.918-3.291,2.831c-0.484,0.394-0.852,0.75-0.611,1.443
            c0.07,0.201-0.026,0.466-0.07,0.698c-0.135,0.714,0.478,1.944,1.137,2.263c1.561,0.756,2.79,0.548,4.026-0.704
            c0.583-0.59,1.222-0.823,2.047-0.538c1.134,0.392,2.293,0.683,3.648,0.365c-0.267,0.281-0.424,0.452-0.587,0.617
            c-1.549,1.575-3.045,3.194-4.179,5.105c-0.901,1.519-1.637,3.115-1.607,4.923c0.008,0.473,0.061,0.946,0.127,1.424h-0.155
            c-0.43,0-0.778,0.349-0.778,0.778v0.335H9.387c-0.486,0-0.881,0.395-0.881,0.881v3.48l16.735-0.003v-3.478
            C25.241,27.572,24.847,27.178,24.36,27.178z"
                />
              </g>
            </svg>
          )}
        </div>
        {(win || gameOver) && (
          <div
            className="rounded-lg"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 400,
              height: 400,
              background: "rgba(255,255,255,0.85)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
              animation: "winAnim 1s ease",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <h1
                style={{
                  fontSize: 40,
                  color: "#4e54c8",
                  fontWeight: "bold",
                  animation: "popAnim 0.7s",
                }}
              >
                {win ? "YOU WIN!" : "GAME OVER"}
              </h1>
              <p style={{ fontSize: 24, color: "#333" }}>Score: {score}</p>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center mt-4">
        <Button onClick={handleReset}>Play Again</Button>
      </div>
    </div>
  );
}

export default ChessBoard;
