import useBoard from "../store";
import Square from "./Square";

interface BoardProps {
  // List your props here
}

const Board: React.FC<BoardProps> = props => {
  const board = useBoard(state => state.board);

  const board1D = board.flat();
  const placeholder = [...Array(7).keys()];
  console.log(placeholder);
  return (
    <div className="container mx-auto">
      <div className="bg-blue-700 pb-0 pt-10 px-2 w-max m-auto rounded-2xl">
        <div className="mt-20 grid justify-center grid-cols-[repeat(7,80px)] grid-rows-[repeat(6,72px)] gap-0 ">
          {placeholder.map((b, i) => (
            <Square key={i} coordinate={b.toString()} isPlaceholder />
          ))}
          {board1D.map(b => (
            <Square
              onMouseEnter={() => console.log("hi")}
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
