# Clearcode intern summer 2019 task

### riddleSolver(board)

> takes exactly 1 argument (board)
> returns array with solution

- Function takes a two-dimensional array of integers in range [1, 1000].
- The numbers of columns and rows in array should be in range [3, 50].
- If there are three or more of the same integers adjacent vertically or
  horizontally, they are "removed" them from the board.
- Removed integers are represented by the value 0. If an empty space has
  integers on top of itself, integers "drop" until they hit a non-zero value on the
  very bottom of the board.
- The function compares adjacent integers, until there are no integers left to be removed.
  After that, a solved board is returned.

# Solution

- Function first measures dimensions of the array, creates a copy of the board: `tmpBoard`
- When we enter the `while` loop, `arrayChanged` is set to false, so that if no changes are made during iteration, program will exit the loop
- Next we search columns for the same integers adjacent vertically:
  - we compare adjacent integers, if they're the same and different than 0, we compare next integer, until it's different or board ends
  - if 3 or more adjacent integers of the same value are found, those integers are replaced with 0, but only in the `tmpBoard` array. `arrayChanged` is set to `true`, in order to search for new possibilities in next while loop iteration. Program then skips "tiles", that were set to 0.
  - else program moves onto the next tile, until it gets to less than 3 tiles away from border, as it can no longer find sequence long enough to remove
- In the next step the same algorithm is performed on rows of the `board`.
- Subsequently the changes from `tmpBoard` are reflected onto the `board`. First `board` gets filled with 0, then `tmpArray` is vertically "split" into n one-dimentional arrays called `col`. From those arrays all the zeroes are filtered away and the remaining integers are put onto the bottom of `board`.
- As iteration of the loop is about to end the contents of `board` are copied into `tmpBoard`. If any changes were made (as indicated by `arrayChanged`), the `while` loop will continue and the board will be searched again.
- After the `while` loop ends a stable `board` is returned.
