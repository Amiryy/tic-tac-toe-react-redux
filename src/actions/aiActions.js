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
    if (winner === 'X') {
        score = -20 + movesCount;
    } else if (winner === 'O') {
        score = 20 - movesCount;
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
const getRowContent = (board, row) => {
    return row.reduce((contents, cell) => {
        contents.push(board[cell]);
        return contents
    }, [])
};
const minMax = (board, xTurn, maxDepth, depth = 0) => {
    const winner = indicateVictory(board, maxDepth).winner;
    let score = 0;
    if(winner || depth === maxDepth) {
        return getGameScore(winner, depth);
    }
    let moves = getAvailableMoves(board);
    moves.forEach (move => {
            board[move] = xTurn ? 'X' : 'O';
            score += minMax(
                board,
                !xTurn,
                maxDepth,
                ++depth);
    })
    return score;
};
export const getBestMove = (board, grid, xTurn) => {
  let bestScore = null;
  let bestMove = null;
  let moves = getAvailableMoves(board);
  console.log('available moves: ' + moves.length);
  console.log(moves);
  moves.forEach(move => {
      board[move] = xTurn ? 'X' : 'O';
      let newScore = minMax(board, xTurn, grid);
      if (bestScore === null || newScore > bestScore) {
          bestScore = newScore;
          bestMove = move;
          console.log(move+"'s best score: "+bestScore);
      }
  });
  console.log('best move: ' + bestMove + ' score: ' + bestScore);
  return bestMove
};

/*export const aiComputations = (board, grid, xTurn) => {
    //minMax(board, xTurn, grid);
    //possibleStreak(grid, board, 0, 'O');
    //getBestMove(board, grid, xTurn)
};*/
