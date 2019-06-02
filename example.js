export function riddleSolver(board) {
  let arrayChanged = true;
  let tmpBoard = board.map(function(b) {
    return b.slice();
  });
  let height = board.length;
  let width = board[0].length;

  while (arrayChanged) {
    arrayChanged = false;

    // search columns
    for (let j = 0; j < width; j++) {
      for (let i = height - 1; i > 1; i--) {
        let k = 1;
        while (
          i - k >= 0 &&
          board[i][j] === board[i - k][j] &&
          board[i][j] !== 0
        ) {
          k++;
        }

        if (k > 2) {
          arrayChanged = true;
          i -= k - 1;
          while (k > 0) {
            tmpBoard[i + k - 1][j] = 0;
            k--;
          }
        }
      }
    }

    // search rows
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width - 2; j++) {
        let k = 1;
        while (
          j + k <= width &&
          board[i][j] !== 0 &&
          board[i][j] === board[i][j + k]
        ) {
          k++;
        }

        if (k > 2) {
          j += k - 1;
          while (k > 0) {
            tmpBoard[i][j - k + 1] = 0;
            k--;
          }
        }
      }
    }

    //move elements down the board by creating new board and placing elements in correct positions
    board = Array(width)
      .fill()
      .map(() => Array(height).fill(0));

    for (let i = 0; i < width; i++) {
      let col = [];
      for (let j = height - 1; j >= 0; j--) {
        col.push(tmpBoard[j][i]);
      }

      let filtered = col.filter(item => {
        return item > 0;
      });

      filtered.forEach((elem, k) => {
        board[height - 1 - k][i] = elem;
      });
    }

    tmpBoard = board.map(function(b) {
      return b.slice();
    });
  }
  return board;
}
