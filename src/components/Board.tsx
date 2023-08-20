import { useEffect, useState } from "react";
import useBoard from "../store";
import Square from "./Square";
import { checkConnectedFour } from "../utils/checkWinner";

const Board: React.FC = () => {
  const board = useBoard(state => state.board);
  const placeCircle = useBoard(state => state.placeCircle);
  const turn = useBoard(state => state.turn);
  const restart = useBoard(state => state.restart);

  const board1D = board.flat();
  const placeholder = [...Array(7).keys()];
  const [currentHoveringCol, setCurrentHoveringCol] = useState<number | null>(
    null,
  );
  const formatBoard = board.map(n => n.map(b => b.player));
  const isPlayerWon = checkConnectedFour(formatBoard, "player");
  const isOpponentWon = checkConnectedFour(formatBoard, "computer");
  const isGameEnded = isPlayerWon || isOpponentWon;

  useEffect(() => {
    if (turn === "transition" && !isGameEnded) {
      setTimeout(() => {
        const movement = Math.floor(Math.random() * 6);
        placeCircle(movement, true);
      }, 300);
    }
  }, [isGameEnded, placeCircle, turn]);

  return (
    <div className="container mx-auto">
      <div
        onMouseLeave={() => setCurrentHoveringCol(null)}
        className="bg-blue-700 pb-0 pt-2 px-2 w-max m-auto rounded-2xl overflow-auto"
      >
        <div className="flex justify-between px-4">
          <h2 className="text-center text-white text-2xl font-bold">
            {(() => {
              if (isOpponentWon) return "Computer Won";
              if (isPlayerWon) return "Player Won";
              return `Turn : ${turn === "transition" ? "Computer" : "Player"}`;
            })()}
          </h2>
          <button
            onClick={restart}
            className="block rounded-lg text-white border p-2 hover:bg-blue-800"
          >
            Restart Game
          </button>
        </div>

        <div className="grid justify-center grid-cols-[repeat(7,80px)] grid-rows-[repeat(6,72px)] gap-0 ">
          {placeholder.map(colLabel => (
            <Square
              key={colLabel}
              isPlaceholder
              showPlaceholder={currentHoveringCol === colLabel && !isGameEnded}
            />
          ))}
          {board1D.map(b => (
            <Square
              isTransitioning={turn === "transition"}
              fill={b.player}
              onClick={() => {
                if (turn === "transition" || isGameEnded) return;
                placeCircle(b.coordinate.col);
                () => setCurrentHoveringCol(null);
              }}
              onMouseEnter={() => setCurrentHoveringCol(b.coordinate.col)}
              key={b.coordinate.row.toString() + b.coordinate.col}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Board;
