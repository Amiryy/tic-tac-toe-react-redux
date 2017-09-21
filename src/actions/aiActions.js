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
const possibleStreak = (grid, board, movePos, player) => {
    // returns whether a move can make a winning streak
    // by distinguishing the rows that contain the move location
    // and indicating whether these rows are free of enemy marks.
    // returns true/false
    const possibleStreaks = (grid === 9) ? streaks.nine : streaks.sixteen;
    const candidateRows = possibleStreaks.filter((candidate) => {
        const candidates = candidate.filter(cell =>
            cell === movePos ).length > 0;
        if (candidates) {
            const opponent = player === 'X' ? 'O' : 'X';
            const rowContent = getRowContent(board, candidate).join('');
            return !(rowContent.indexOf(opponent) > -1);
        }
        return candidates;
    });
    return candidateRows.length > 0
};
const minMax = (board, xTurn, maxDepth, depth = 0) => {
    let gameState = {
        board: board,
        xTurn: xTurn
    };
    const victory = indicateVictory(board, maxDepth).winner;
    let bestScore;
    if(victory || depth >= maxDepth) {
        return getGameScore(victory, depth);
    }
    if (!xTurn) {
        bestScore = -9999;
        let moves = getAvailableMoves(board);
        moves.forEach (move => {
            let newScore;
            if(possibleStreak(maxDepth, board, move, 'O')){
                board[move] = 'O';
                gameState = {
                    board: board,
                    xTurn: xTurn
                };
                newScore = minMax(
                    gameState.board,
                    gameState.xTurn,
                    maxDepth,
                    ++depth);
            } else {
                newScore = 0;
            }
            if (newScore > bestScore) {
                bestScore = newScore
            }
        })
    }
    if (xTurn) {
        bestScore = 9999;
        let moves = getAvailableMoves(board);
        moves.forEach (move => {
            let newScore;
            if(possibleStreak(maxDepth, board, move, 'X')){
                board[move] = 'X';
                gameState = {
                    board: board,
                    xTurn: xTurn
                };
                newScore = minMax(
                    gameState.board,
                    gameState.xTurn,
                    maxDepth,
                    ++depth);
            } else {
                newScore = 0;
            }
            if (newScore < bestScore) {
                bestScore = newScore
            }
        })
    }
    return bestScore;
};
export const getBestMove = (board, grid, xTurn) => {
  let bestScore = -9999;
  let bestMove = null;
  const openingMoves = grid === 9 ? [0, 2, 3, 4, 5] : [0, 3, 6, 12, 15];
  let gameState = {
      board: board,
      xTurn: xTurn
  };
  let moves = getAvailableMoves(gameState.board);
  if(moves.length === grid){
      const randomOpener = Math.floor(Math.random() * 5);
      console.log('opener: ' + openingMoves[randomOpener]);
     return openingMoves[randomOpener]
  }
  console.log('available moves: ' + moves.length);
  console.log(moves);
  moves.forEach(move => {
      board[move] = xTurn ? 'X' : 'O';
      gameState = {
          board: board,
          xTurn: xTurn
      };
      let newScore = minMax(gameState.board, gameState.xTurn, grid);
      if (newScore > bestScore) {
          bestScore = newScore;
          bestMove = move
      }
  });
  console.log('best move: ' + bestMove);
  return bestMove
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
/*export const aiComputations = (board, grid, xTurn) => {
    //minMax(board, xTurn, grid);
    //possibleStreak(grid, board, 0, 'O');
    //getBestMove(board, grid, xTurn)
};*/
