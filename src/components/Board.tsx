import { useEffect, useState } from "react";
import useBoard from "../store";
import Square from "./Square";

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

  return (
    <div className="container mx-auto">
      <div
        onMouseLeave={() => setCurrentHoveringCol(null)}
        className="bg-blue-700 pb-0 pt-2 px-2 w-max m-auto rounded-2xl overflow-auto"
      >
        <h2 className="text-white text-2xl font-bold">
          Turn : {turn === "transition" ? "Computer" : "Player"}
        </h2>
        <div className="grid justify-center grid-cols-[repeat(7,80px)] grid-rows-[repeat(6,72px)] gap-0 ">
          {placeholder.map(colLabel => (
            <Square
              key={colLabel}
              coordinate={colLabel.toString()}
              isPlaceholder
              showPlaceholder={currentHoveringCol === colLabel}
            />
          ))}
          {board1D.map(b => (
            <Square
              isTransitioning={turn === "transition"}
              fill={b.player}
              onClick={() => {
                if (turn === "transition") return;
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
