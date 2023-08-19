import useBoard from "../store";
import Square from "./Square";

interface BoardProps {
  // List your props here
}

const Board: React.FC<BoardProps> = props => {
  const board = useBoard(state => state.board);

  const board1D = board.flat();
  return (
    <div className="container mx-auto">
      <div className="mt-20 grid justify-center grid-cols-[repeat(7,70px)] grid-rows-[repeat(6,70px)] gap-0 ">
        {board1D.map(b => (
          <Square key={b.coordinate.col + b.coordinate.row} />
        ))}
      </div>
    </div>
  );
};

export default Board;
