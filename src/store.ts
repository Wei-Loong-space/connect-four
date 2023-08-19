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
  (): Store => ({
    board: INIT_BOARD,
  }),
);

export default useBoard;
