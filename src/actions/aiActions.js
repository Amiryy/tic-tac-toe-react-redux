const streaks = {
    nine: [ // all the possible line streaks that could make a winner.
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ],
    sixteen: [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15],
        [0, 4, 8, 12],
        [1, 5, 9, 13],
        [2, 6, 10, 14],
        [3, 7, 11, 15],
        [0, 5, 10, 15],
        [3, 6, 9, 12]
    ]
};

const indicateVictory = (cells, grid) => {
    if(grid === 9) {
        const possibleStreaks = streaks.nine;
        for (let i = 0; i < possibleStreaks.length; i++) {
            const [a, b, c] = possibleStreaks[i];
            if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
                return {
                    winner: cells[a], winningRow: [a, b, c]
                }
            }
        }
    } else if (grid === 16) {
        const possibleStreaks = streaks.sixteen;
        for (let i = 0; i < possibleStreaks.length; i++) {
            const [a, b, c, d] = possibleStreaks[i];
            if (cells[a] && cells[a] === cells[b] && cells[a]
                === cells[c] && cells[a] === cells[d]) {
                return {
                    winner: cells[a], winningRow: [a, b, c, d]
                }
            }
        }
    }
    return {
        winner: null, winningRow: [null, null, null] };
};
const getGameScore = (winner, movesCount) => {
    let score;
    let urgency = movesCount === 0 ? -80 : movesCount;
    // if its an immediate win return highest score always.
    if (winner === 'X') {
        score = -20 + urgency;
    } else if (winner === 'O') {
        score = 20 - urgency;
    } else {
        score = 0
    }
    return score
};
const getAvailableMoves = (board) => {
    // returns an array of available cells
    let available = [];
    board.forEach((cell, cellIndex) => {
        if (cell === null) {
            available.push(cellIndex)
        }
    });
    return available
};
const minMax = (board, xTurn, grid, depth = 0) => {
    const winner = indicateVictory(board, grid).winner;
    let score = null;
    let moves = getAvailableMoves(board);
    if(winner || moves.length === 0) {
        return getGameScore(winner, depth);
    }
    moves.forEach (move => {
        let newBoard = board.slice();
        newBoard[move] = xTurn ? 'X' : 'O';
        let moveScore = minMax(
            newBoard,
            !xTurn,
            grid,
            ++depth);
        if(xTurn){
            if (moveScore < score || score === null) {
                score = moveScore;
            }
        } else {
            if (moveScore > score || score === null) {
               score = moveScore;
            }
        }
    });
    return score;
};

export const getBestMove = (board, grid, xTurn) => {
  let bestScore = null;
  let bestMove = null;
  const moves = getAvailableMoves(board);
  console.log('available moves: ' + moves.length);
  console.log(moves);
  //on 4x4 grid recursive analysis is applied for 8 or less options.
  if (grid === 9 || moves.length <= 8) {
      if (moves.length === 8 && !board[4]){
          return bestMove = 4
      }
      moves.forEach(move => {
          let newBoard = board.slice();
          newBoard[move] = xTurn ? 'X' : 'O';
          let newScore = minMax(newBoard, !xTurn, grid);
          console.log(move + "'s score: " + newScore);
          if (xTurn) {
              if (newScore < bestScore || bestScore === null) {
                  bestScore = newScore;
                  bestMove = move;
              }

          } else {
              if (newScore > bestScore || bestScore === null) {
                  bestScore = newScore;
                  bestMove = move;
              }
          }
      });
  } else {
      /* for 4x4 grids I implemented simple logic for the first few moves to reduce system overload.
        Recursive analysis of 9 or more available moves will decrease performance and might even cause the game to crash.

        This logic calculates threat and advantage of current board's state, compares the two and prioritises the highest.
        Then the AI makes his move based on his current priority, if it is to block a threat or create an advantage.
        */
      const enemy = xTurn ? 'O' : 'X';
      const self = xTurn ? 'X' : 'O';
      let priority = -1;
      if (moves.length === 16) {
          const openers = [0, 3, 12, 15];
          openers.forEach (opener => {
              if(!board[opener]){
                bestMove = opener;
              }
          });
      }
      streaks.sixteen.forEach ((streak) => {
          let threat = streak.filter( cell => {
             return board[cell] === enemy;
          }).length;
          let advantage = streak.filter ( cell => {
             return board[cell] === self
          }).length;
          if (threat > advantage && threat > priority) {
               streak.forEach (cell => {
                   if (!board[cell]){
                       bestMove = cell;
                   }
                   priority = threat;
               })
          } else if (advantage > threat  && advantage > priority) {
              streak.forEach (cell => {
                  if (!board[cell]){
                      bestMove = cell;
                  }
                  priority = advantage;
              });
          }

      });
  }
  console.log('best move: ' + bestMove + ' score: ' + bestScore);
  return bestMove
};

export const aiMove = (bestMove, board, difficulty) => { // AI will make his move based on the difficulty level.
    const moves = getAvailableMoves(board);
    const randomChoice = moves[Math.floor(Math.random() * moves.length)];
    let choice;
    if (difficulty === 'novice') {
        if (Math.random() * 100 <= 60) {
            choice = bestMove;
        } else {
            choice = randomChoice;
        }
        console.log('Novice Move: ' + choice);
    } else if (difficulty === 'easy') {
        if (Math.random() * 100 <= 20) {
            choice = bestMove;
        } else {
            choice = randomChoice;
        }
        console.log('Easy Move: ' + choice);
    } else if (difficulty === 'expert') {
        choice = bestMove;
        console.log('expert Move: ' + choice);
    }
    return choice;
};