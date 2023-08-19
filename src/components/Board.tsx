import { useState } from "react";
import useBoard from "../store";
import Square from "./Square";

const Board: React.FC<BoardProps> = () => {
  const board = useBoard(state => state.board);
  const placeCircle = useBoard(state => state.placeCircle);
  const board1D = board.flat();
  const placeholder = [...Array(7).keys()];
  const [currentHoveringCol, setCurrentHoveringCol] = useState<number | null>(
    null,
  );
  return (
    <div className="container mx-auto">
      <div
        onMouseLeave={() => setCurrentHoveringCol(null)}
        className="bg-blue-700 pb-0 pt-2 px-2 w-max m-auto rounded-2xl overflow-auto"
      >
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
              fill={b.player}
              onClick={() => {
                placeCircle(b.coordinate.col);
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
