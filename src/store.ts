import { create } from "zustand";

// Standard interface and functions
export interface Board {
  coordinate: {
    row: number;
    col: number;
  };
  player: "player" | "computer" | "none";
}

// Zustand implementation

type Store = {
  board: Board[][];
  placeCircle: (selectedCol: number) => void;
};

const INIT_BOARD: Board[][] = [...Array(6).keys()].map((_, i) => {
  return [...Array(7).keys()].map((_, j) => ({
    coordinate: {
      row: i,
      col: j,
    },
    player: "none",
  }));
});

const useBoard = create<Store>(
  (set): Store => ({
    board: INIT_BOARD,
    placeCircle: selectedCol =>
      set(state => {
        return {
          ...state,
          board: state.board.map(row => {
            return row.map(col => {
              if (col.coordinate.col === selectedCol) {
                const colStatus = state.board
                  .flat()
                  .filter(b => b.coordinate.col === selectedCol)
                  .map(b => b.player);
                const currentPosition =
                  colStatus.filter(p => p === "none").length - 1;
                if (col.coordinate.row === currentPosition) {
                  return {
                    ...col,
                    player: "player",
                  };
                }
                return col;
              }
              return col;
            });
          }),
        };
      }),
  }),
);

export default useBoard;
