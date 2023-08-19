import { useEffect, useState } from "react";
import useBoard from "../store";
import Square from "./Square";
import { checkConnectedFour } from "../utils/checkWinner";

const Board: React.FC = () => {
  const board = useBoard(state => state.board);
  const placeCircle = useBoard(state => state.placeCircle);
  const turn = useBoard(state => state.turn);

  const board1D = board.flat();
  const placeholder = [...Array(7).keys()];
  const [currentHoveringCol, setCurrentHoveringCol] = useState<number | null>(
    null,
  );

  useEffect(() => {
    if (turn === "transition") {
      setTimeout(() => {
        const movement = Math.floor(Math.random() * 6);
        placeCircle(movement, true);
      }, 50);
    }
  }, [placeCircle, turn]);

  const formatBoard = board.map(n => n.map(b => b.player));
  const isPlayerWon = checkConnectedFour(formatBoard, "player");
  const isOpponentWon = checkConnectedFour(formatBoard, "computer");
  const isGameEnded = isPlayerWon || isOpponentWon;

  return (
    <div className="container mx-auto">
      <div
        onMouseLeave={() => setCurrentHoveringCol(null)}
        className="bg-blue-700 pb-0 pt-2 px-2 w-max m-auto rounded-2xl overflow-auto"
      >
        {!isGameEnded && (
          <h2 className="text-white text-2xl text-center font-bold">
            Turn : {turn === "transition" ? "Computer" : "Player"}
          </h2>
        )}
        {isPlayerWon && (
          <h2 className="text-white text-center text-2xl font-bold">
            Player Won
          </h2>
        )}
        {isOpponentWon && (
          <h2 className="text-center text-white text-2xl font-bold">
            Computer Won
          </h2>
        )}
        <div className="grid justify-center grid-cols-[repeat(7,80px)] grid-rows-[repeat(6,72px)] gap-0 ">
          {placeholder.map(colLabel => (
            <Square
              key={colLabel}
              coordinate={colLabel.toString()}
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
              coordinate={b.coordinate.row.toString() + b.coordinate.col}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Board;
