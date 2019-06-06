export function riddleSolver(board) {
  var height = 0;
  var width = 0;

  try {
    //test if board is an array
    if (!Array.isArray(board)) {
      throw new Error("board is not an array");
    }

    //set dimentions
    height = board.length;
    width = board[0].length;

    //check if dimentions are ok
    if (height < 3 || height > 50 || width < 3 || width > 50) {
      throw new Error("board dimentions dont meet the conditions");
    }
    if (!board.every(a => a.length === width)) {
      throw new Error("board is not rectangular");
    }

    //check if all elements are integers
    if (
      !board.every(a => {
        return a.every(b => Number.isInteger(b));
      })
    ) {
      throw new Error("not all numbers in the board are integers");
    }

    //check if all integers are in range
    if (
      !board.every(a => {
        return a.every(b => {
          return b >= 1 && b <= 1000;
        });
      })
    ) {
      throw new Error("not all numbers fall into range of [1,1000]");
    }
  } catch (error) {
    return error;
  }

  //initialize variables
  var arrayChanged = true;
  var tmpBoard = board.map(function(b) {
    return b.slice();
  });

  //find solution
  while (arrayChanged) {
    //if no changes are made, theres no need to keep going
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
