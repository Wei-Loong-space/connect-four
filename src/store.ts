import { create } from "zustand";

// Standard interface and functions
export interface Board {
  coordinate: {
    row: number;
    col: number;
  };
  player: "player" | "computer" | "none";
}

type Store = {
  board: Board[][];
  placeCircle: (selectedCol: number, isOpponent?: boolean) => void;
  turn: "player" | "computer" | "transition";
  lastSelection?: number;
  restart: () => void;
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
    turn: "player",
    restart: () =>
      set(state => ({
        ...state,
        board: INIT_BOARD,
        lastSelection: undefined,
        turn: "player",
      })),
    placeCircle: (selectedCol, isOpponent) =>
      set(state => {
        const colStatus = state.board
          .flat()
          .filter(b => b.coordinate.col === selectedCol)
          .map(b => b.player);
        const currentPosition = colStatus.filter(p => p === "none").length - 1;
        return {
          ...state,
          lastSelection: selectedCol,
          turn: isOpponent ? "player" : "transition",
          board: state.board.map(row => {
            return row.map(col => {
              if (col.coordinate.col === selectedCol) {
                if (col.coordinate.row === currentPosition) {
                  return {
                    ...col,
                    player: isOpponent ? "computer" : "player",
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
