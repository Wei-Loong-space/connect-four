export const checkConnectedFour = (
  board: string[][],
  target: "player" | "computer",
): boolean => {
  const numRows = board.length;
  const numCols = board[0].length;

  const directions: number[][] = [
    [1, 0], // Horizontal
    [0, 1], // Vertical
    [1, 1], // Diagonal (top-left to bottom-right)
    [1, -1], // Diagonal (bottom-left to top-right)
  ];

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      if (board[row][col] === target) {
        for (const [dx, dy] of directions) {
          let count = 1;

          for (let step = 1; step < 4; step++) {
            const newRow = row + step * dx;
            const newCol = col + step * dy;

            if (
              newRow >= 0 &&
              newRow < numRows &&
              newCol >= 0 &&
              newCol < numCols &&
              board[newRow][newCol] === target
            ) {
              count++;
            } else {
              break;
            }
          }

          if (count === 4) {
            return true; // Found a connected four
          }
        }
      }
    }
  }

  return false; // No connected four found
};
